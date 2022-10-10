//Redux
import { useSelector, useDispatch } from 'react-redux'
import store from '../redux/store';

//For React Hooks
import { useState, useEffect } from "react";


//CharRNN
import {useCharRNN} from "./charRNN"; //my bespoke charRNN hooks.
import ml5 from 'ml5';


//TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style'
import { CustomParagraph } from './customparagraph.ts';


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
  //Keep a record of whose line it is
  //Use this in the class name
  // const [whoseLine, setWhoseLine] = useState('human')

  // Redux globals
  const model = useSelector( state => state.model);
  const seed = useSelector( state => state.seed);
  const lineLength = useSelector( state => state.lineLength);
  const temperature = useSelector( state => state.temperature);
  const whoseLineIsItAnyway = useSelector( state => state.whoseLine);
  const fullText = useSelector( state => state.fullText);
  
  const dispatch = useDispatch();

  //charRNN
  //TODO: this is firing every time the editor renders\
  //USEstaTE?
  const rnn = new ml5.charRNN(`./models/${model}`, modelLoaded);

 function getCurrentUser(){
    return whoseLineIsItAnyway
 }

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
          class: `lines ${whoseLineIsItAnyway}` //class should change depending on author
        }
        
      }),
      Document,
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
    injectCSS: false,
    
       
    onUpdate({editor}){ //detects the update
      editor.commands.focus()
      // const storeCheck = store.getState();
      // console.log(storeCheck.whoseLine);
          
     }
  }); //end useEditor

  

  function removeLines() {
    
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
      
      //set the author to AI
      dispatch({type: 'whoseLine/updated', payload:'computer'})
     

      //TODO: Loading here

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
                type: 'paragraph',
                
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
           
        }

       
         
        } //callBack
      ) //charRNN GENERATE

      //return the author to human
      dispatch({type: 'whoseLine/updated', payload:'human'})
  };//end addComputerLine
  
  function handleChange(e, seed) {
    //grabs all the <p> tags
    const text = document.getElementsByClassName("lines") 
    console.log(e.keyCode);
    if (e.code === 'Enter'){
       
        //TODO: We can put the below in a function, so both tab and enter will call it
        console.log('This should show seed', seed)
        const newSeed = (text[text.length-2].innerText);
        dispatch({type: 'seed/updated', payload: newSeed}) 
        addComputerLine()
                   
            
    }

    if (e.keyCode === 40){ //Use the down arrow function removes previous suggestion and replaces it with a new one
      
      removeLines()
           
      const newSeed = (text[text.length-1].innerText);    
      dispatch({type: 'seed/updated', payload: newSeed}) 
      // setTimeout(() => addComputerLine(), 2000)
        
       
        
    } //end TAB
  } //end HandleChange
 
 
  // useEffect(()=>{
  //   console.log('Hey, the seed has been changed');
  //   if(seed.length === 0){
  //     console.log("But I'm not doing anything yet because the seed is blank");
  //   } else {
  //     console.log('Okay, now we have a seed');
      
  //   }
    
  // }, [seed])

  return (
    <div className="max-w-[50vw] mx-4 mt-8 mb-4">
        <EditorContent editor={editor} onKeyDown={(e)=> handleChange(e, editor, seed)}/>
        
    </div>
        
  )
}

export default Canvas