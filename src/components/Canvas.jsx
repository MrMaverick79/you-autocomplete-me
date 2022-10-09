//Redux
import { useSelector, useDispatch } from 'react-redux'

//For React Hooks
import { useState, useEffect } from "react";




//CharRNN
import {useCharRNN} from "./charRNN"; //my bespoke charRNN hooks.
import { ml5 } from 'ml5';


//TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import '../css/main.css'
import '../css/tailwind.css'



const Computerline = Paragraph.extend({
    addAttributes() {
        // Return an object with attribute configuration
        return {
          draggable: true,
          class: {
            default: 'Test',

          },
        }
      }
});

let newSeed = "";

//this is just a hook, so lets make it one
//remember that it can also take arguments.
const Canvas = () => {
  
  //Redux globals
  const model = useSelector( state => state.model);
  const seed = useSelector( state => state.seed);
  const AILine = useSelector( state => state.computerLine);
  const fullText = useSelector( state => state.fullText);
  
  const dispatch = useDispatch();

  //charRNN
  //TODO: this is firing every time the editor renders
  useCharRNN()


  //Define options for the text editor
  const editor = useEditor({
    extensions: [
      StarterKit,
   
      Placeholder.configure({
        placeholder: "Write something beautiful and press enter"
        
      }),
      Computerline  //custom paragraphs
           .configure({
        HTMLAttributes: {
          class: 'lines ltr',
        }
        }),
        
    ],
       
    onUpdate({editor}){ //detects the update
           
          
     },
  }) //end editor
  
  function handleChange(e, editor, seed) {
    //grabs all the <p> tags
    const text = document.getElementsByClassName("lines") 
    if (e.code === 'Enter'){
        //Adds a new line when enter is fired
        e.preventDefault()
        //TODO: We can put the below in a function, so both tab and enter will call it
        console.log('This should show seed', seed)
        newSeed = (text[text.length-2].innerText);
        dispatch({type: 'seed/updated', payload: newSeed}) 
        
        editor.commands.insertContent([
            {
                type: 'paragraph',
                content: [
                    {
                    type: 'text',
                    text: AILine
                    },
                ],
            },
            {
                type: 'paragraph',
                    content: [
                    {
                    type: 'text',
                    text: ' ',
                    },
                ],
            }
        
        ]);
        
          
            
            
    }

    if (e.code === 'Tab'){ //Tab function removes previous suggestion and replaces it with a new one
        e.preventDefault()
        console.log('Now we have tab');
        
        const select = text[text.length-1].parentNode
        select.removeChild(select.lastChild);
        select.removeChild(select.lastChild);
    } 
}
 
 
  useEffect(()=>{
    console.log('Hey, the seed has been changed');
    if(seed.length === 0){
      console.log("But I'm not doing anything yet because the seed is blank");
    } else {
      console.log('Okay, now we have a seed');
      
    }
    
  }, [seed])

  return (
    <div className="max-w-[100vw] mx-4 mt-8 mb-4">
        <EditorContent editor={editor} onKeyDown={(e)=> handleChange(e, editor, seed)}/>
        
    </div>
        
  )
}

export default Canvas