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
          class: "lines" //class should change depending on author
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
    
       
    onUpdate({editor}){ //detects any update and focuses the cursor
      editor.chain().focus().run()
          
     }
  }); //end useEditor
 


  function removeLines() {
    //Deletes the previous computer line so that a new addition can be made.
    
    //get all of the paragraphs in the editor
    const text = document.getElementsByClassName("lines") 

    //grab the second-to last one (the last computer line)
    const lastLine = text[text.length-2]
    //grab the parent Element
    const parent = lastLine.parentNode
    
    //TODO: deal with the case where trhe lastline has no text
    //Remove the blank line, the writing, and then fire add ComputerLine again
    parent.removeChild(parent.lastChild);
    parent.removeChild(parent.lastChild);
    addComputerLine()
      
    };
    

  async function addComputerLine(){
      editor.setEditable(false); //switch of typing
      //first we generate a new line.  
      await rnn.generate({ 
        //options
        seed: seed,
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
  
  function handleChange(e) {
    //grabs all the <p> tags
    const text = document.getElementsByClassName("lines") 
    if (e.code === 'Enter'  && e.shiftKey){ //insert a new blank line using shift + enter
        editor.commands.insertContent('<p> <p>') //TODO: make this the proper human paragraph to avoid issues
        return
    }
    if (e.code === 'Enter'){
        setIsLoading(true)
        const newSeed = (text[text.length-2].innerText);
        dispatch({type: 'seed/updated', payload: newSeed}) 
        addComputerLine()
    }

    if (e.key === 'Tab'){ //Use the down arrow function removes previous suggestion and replaces it with a new one
      e.preventDefault() //prevent tabbing out
      setIsLoading(true)
      removeLines() //remove lines then calls addComputerLine
      //bump the seed
      const newSeed = (text[text.length-1].innerText + ' ');    
      dispatch({type: 'seed/updated', payload: newSeed})      
        
    } //end TAB
  } //end HandleChange
    
   return (
    <div className="max-w-[50vw] mx-4 mt-8 mb-4 dark:text-white">
    {
        isLoading ? (<div className="Loading absolute w-[100vw] h-[100vh] bg-white dark:bg-slate-800 z-60"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>) 
        :
        null
      }
    
        <CustomMenu editor ={editor}/>  
        <EditorContent  editor={editor} onKeyDown={(e)=> handleChange(e, editor, seed)}/>
    </div>
        
  )
}
export default Canvas