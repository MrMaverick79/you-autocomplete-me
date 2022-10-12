//Redux
import { useSelector, useDispatch } from 'react-redux'

//For React Hooks
import { useState } from "react";
import React from 'react';

//TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style'
import { CustomParagraph } from './customparagraph.ts';
import { CustomMenu } from './CustomMenu';

//CSS
import '../css/main.css'
import '../css/tailwind.css'

//The 'canvas'-- the editor for writing on.
const Canvas = () => {
  
  //Component 
  const [isLoading, setIsLoading] = useState(false);

  // Redux globals and functions
  const rnn =useSelector( state => state.rnn)
  const seed = useSelector( state => state.seed);
  const lineLength = useSelector( state => state.lineLength);
  const temperature = useSelector( state => state.temperature);
  const dispatch = useDispatch();

  //Define options for the tiptap editor
  const editor = useEditor({
    extensions: [
      Paragraph.configure({
        HTMLAttributes:{
          class: "human lines" //class should change depending on author
        }
        
      }),
      Document,
      Heading,
      CustomParagraph, //this has a class of computer
      TextStyle,
      Text,
      Placeholder.configure({
        placeholder: "Write something beautiful and press enter..."
        
      })  
    ],
    autofocus: true,
    autocorrect: true,
    spellcheck: false,
    editable: true,
    injectCSS: true,
    
    onUpdate({editor}){ //detects any update to the editor and focuses the cursor
      editor.chain().focus().run() 
     }
  }); //end useEditor
 
  function getLastElementWithText(collection){ //a helper function to identify the last user line that has text. Returns an Element
    
    let lineArray = Array.from(collection);
    
    for (let i = lineArray.length; i > 0; i--){
      const element = lineArray.pop();
      if (element.innerText.trim() !== ""){
        return element
      }

    }
    // console.log('No element found, returning element at position 0');
    return collection[0]
  };  //end getLastElement
    

   function removeLines() {
    return new Promise((resolve, reject) => {

      //Deletes the previous computer line so that a new addition can be made.
      const computerLines = document.querySelectorAll(".computer")
      const humanLines = document.querySelectorAll(".human")
      if(computerLines.length === 0){
        return //do nothing when the computer has not generated a line
      }
      //Always has to remove the last computer line, so that it can be replaced with a new suggestion
      const lastComputerLine = computerLines[computerLines.length-1];
      lastComputerLine.parentElement.removeChild(lastComputerLine);
      
      //remove the last human line when it is blank. Does not have to remove all the blank lines, as the user may have inserted some themselves purposely. 
      
      const lastHumanLine = humanLines[humanLines.length-1];
      if(lastHumanLine.innerText.trim().length === 0){
        lastHumanLine.parentElement.removeChild(lastHumanLine);
      }

      resolve()
    })
    
      
    };

  function updateSeed(){
    return new Promise((resolve, reject) => {
      //grabs all the <p> tags
       const allHumanLines = document.getElementsByClassName("human") //all the current human
      //Grab the last line that has been written by the human and make this the seed for the generator --i.e so the computer esponds to the human input
      const newSeed = getLastElementWithText(allHumanLines);    
      resolve(newSeed.innerText)
     
     
    })
    
  };  //end updateSeed
    
  async function addComputerLine(){ //adding a computerLine
    
    setIsLoading(true) //start loading icon
    editor.setEditable(false); //switch off typing while the computer generates a line
    const updatedSeed = await updateSeed() //grab the last line with text in it
    dispatch({type: 'seed/updated', payload: updatedSeed })

    
      //generat a new line using charRNN
    await rnn.generate({ 
        //options
        seed: updatedSeed,
        length: lineLength, 
        temperature: temperature 

      //callback function
      }, (err, results) => {
        // console.log('Results or error',results, err);
        if(results){
           //insert two new lines-- the computer line and a new line for 
           //the user to type into 
          editor.commands.insertContent([
            {
                type: 'customparagraph',
                
                content: [
                    {
                    type: 'text',
                    text: results.sample 
                    },
                
                ],
               
            },
            {
                type: 'paragraph',
                    content: [
                    {
                    type: 'text',
                    text:  ' '
                    },
                ],
            },
        
          ]);  //insertContent
           setIsLoading(false); //end loading 
           editor.setEditable(true); //switch editing back on after line insertion
        } else {
          console.log('Error inserting lines', err);
          editor.setEditable(true);
        }

        } //callBack
      ) //charRNN GENERATE
    editor.chain().focus().run() //focus back on editor
    

  };//end addComputerLine
  
  async function handleChange(e) {
    const humanLines = document.querySelectorAll(".human")
    const lastHumanLine = humanLines[humanLines.length-1];
    
    //TODO: most of this could be folded into addComputerLine
    if (e.code === 'Enter'  && e.shiftKey){ //insert a new blank line using shift + enter
        editor.commands.insertContent({
          type: 'paragraph',
              content: [
              {
              type: 'text',
              text:  ' '
              },
          ],
      },) 
        return
    }
    if (e.code === 'Enter'){
               // updateSeed()//update the seed then add a new computer line
        addComputerLine()
    }
   
    if (e.key === 'Tab' && lastHumanLine.innerText.trim().length === 0 ){ //Use the  removes previous suggestion and replaces it with a new one, as long as the user hasn't sstarted to type.
      e.preventDefault() //prevent tabbing out
      await removeLines() //wait for the lines to be rmeoved then add a new one
      addComputerLine()
        
    } //end TAB
    editor.chain().focus().run() 
  } //end HandleChange
    
   return (
    <div className="max-w-[50vw] mx-4 mt-8 mb-4 dark:text-white">
    {
        isLoading ? (<div className="Loading absolute w-[100vw] h-[100vh] bg-white dark:bg-slate-800 z-60"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>) 
        :
        null
      }
    
        <CustomMenu editor ={editor}/>  
        <EditorContent  editor={editor} onKeyDown={(e)=> handleChange(e, editor, seed)}/>
    </div>
        
  )
}
export default Canvas