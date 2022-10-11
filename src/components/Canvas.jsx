//Redux
import { useSelector, useDispatch } from 'react-redux'


//For React Hooks
import { useState } from "react";
import React from 'react';

//CharRNN

import ml5 from 'ml5';


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



// const Computerline = Paragraph.extend({
//     name: 'computerline',
    
  
//     addAttributes() {
//         // Return an object with attribute configuration
//         return {
//           draggable: true,
//           class: {
//             default: 'lines ltr computerLine',

//           },
//         }
//       }
// }); //end ComputerLine



//this is just a hook, so lets make it one
//remember that it can also take arguments.
const Canvas = () => {
  
  //Component 
  const [isEditable, setIsEditable] = useState(true) //TODO: remove?
  const [isLoading, setIsLoading] = useState(false);
 
  //Keep a record of whose line it is
  //Use this in the class name
  // const [whoseLine, setWhoseLine] = useState('human')

  // Redux globals
  const model = useSelector( state => state.model);
  const seed = useSelector( state => state.seed);
  const lineLength = useSelector( state => state.lineLength);
  const temperature = useSelector( state => state.temperature);
  // const whoseLineIsItAnyway = useSelector( state => state.whoseLine);
  const fullText = useSelector( state => state.fullText);
  
  const dispatch = useDispatch();

  //charRNN
  //TODO: this is firing every time the editor renders\
  ///This could be loaded in App and then passed here through props/ Redux
  const rnn = new ml5.charRNN(`./models/${model}`, modelLoaded);

 

  function modelLoaded(){
    console.log('Model ready? ', rnn.ready)
    if (rnn.ready){
     console.log('Model is now ready');
    }
  } //modelLoaded


  //Define options for the text editor
  const editor = useEditor({
    extensions: [
      Paragraph.configure({
        HTMLAttributes:{
          class: "lines" //class should change depending on author
        }
        
      }),
      Document,
      Heading,
      CustomParagraph,
      TextStyle,
      Text,
      Placeholder.configure({
        placeholder: "Write something beautiful and press enter"
        
      })  
    ],
    autofocus: true,
    autocorrect: true,
    spellcheck: false,
    editable: true,
    injectCSS: true,
    
       
    onUpdate({editor}){ //detects the update
      editor.chain().focus().run()
      // const storeCheck = store.getState();
      console.log(document.activeElement);
          
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
      
      //setLoading
     



      //set the author to AI
      dispatch({type: 'whoseLine/updated', payload:'computer'})
     

      //first we generate a new line.  
      const response = await rnn.generate({ 
        //options
        seed: seed,
        length: lineLength, 
        temperature: temperature 

      //callback function
      }, (err, results) => {
        console.log('Results or error',results, err);
        console.log('Results',results.sample)
        //todo: err message

        
        if(results){
          
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
           setIsLoading(false)
        }

        
       
         
        } //callBack
      ) //charRNN GENERATE
      editor.chain().focus().run()
  };//end addComputerLine
  
  function handleChange(e, seed) {
    //grabs all the <p> tags
    
    const text = document.getElementsByClassName("lines") 
    console.log('vent', e);
    if (e.code === 'Enter'  && e.shiftKey){ //insert a new blank line useng shift + enter
        editor.commands.insertContent('<p> <p>')
        return
    }
    if (e.code === 'Enter'){
    
        setIsLoading(true)
        console.log('Document is active', document.activeElement);
        //TODO: We can put the below in a function, so both tab and enter will call it
        console.log('This should show seed', seed)
        const newSeed = (text[text.length-2].innerText);
        dispatch({type: 'seed/updated', payload: newSeed}) 
        addComputerLine()
        
            
    }

    if (e.key === 'Tab'){ //Use the down arrow function removes previous suggestion and replaces it with a new one
      e.preventDefault() //prevnt tabbing
      setIsLoading(true)
      removeLines() //remove lines then calls addComputerLine
      
      //bump the seed
      const newSeed = (text[text.length-1].innerText + ' ');    
      dispatch({type: 'seed/updated', payload: newSeed}) 
            
       
        
    } //end TAB
  } //end HandleChange
    //TODO: place a div with opacity 0.1 aND A LOADING GIF
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