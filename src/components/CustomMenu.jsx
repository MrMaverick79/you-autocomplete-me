//Redux
import { useSelector, useDispatch } from 'react-redux'
import store from '../redux/store';

//For React Hooks
import { useState, useEffect } from "react";


//CharRNN
import {useCharRNN} from "./charRNN"; //my bespoke charRNN hooks.
import ml5 from 'ml5';


//TipTap
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
// import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style'
import { CustomParagraph } from './customparagraph.ts';


//CSS
import '../css/main.css'
import '../css/tailwind.css'



export function CustomMenu (props){

    const[menuVisible, setMenuVisible] = useState(false) //show or hide the menu
    
    const editor = props.editor

    const insertTitle = () =>{
        editor.commands.insertContentAt(0, '<h2>Give your piece a title</h2>', {
            updateSelection: true,
            parseOptions: {
              preserveWhitespace: 'full',
            }
          })
    }

    const resetEditor = () => {
        editor.chain().clearContent().focus().run();
    }

    const exportText = () => {
        const json = editor.getJSON()
        console.log(json);
    }

    return(
        <div className="menu flex text-lg relative right-7 bottom-1 w-0 z-0 m-0">
            { menuVisible ? ( 
                <div className="menuInner absolute text-xs m-0 ">
                    
                    <button onClick={()=>setMenuVisible(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(196,196,196,1)"/></svg></button>
                    <button onClick={insertTitle} data-bs-toggle="tooltip" title="Give this work a title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" ><path fill="none" d="M0 0H24V24H0z"/><path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" fill="rgba(196,196,196,1)"/></svg></button> 
                    <button onClick={resetEditor} data-bs-toggle="tooltip" title="Clear all"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z" fill="rgba(196,196,196,1)"/></svg></button>
                    <button onClick={exportText}data-bs-toggle="tooltip" title="Export to .pdf"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 16H8V8h4a4 4 0 1 1 0 8zm-2-6v4h2a2 2 0 1 0 0-4h-2zm5-6H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992z" fill="rgba(196,196,196,1)"/></svg></button>
                </div>
               ) :  ( 
                <div className="menuInner absolute text-lg m-0 ">
                    <button onClick={()=>setMenuVisible(true)}>...</button>
                </div>
               )
            }
        </div>
    )   



}