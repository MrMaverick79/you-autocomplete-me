import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

import '../css/main.css'
import { ParagraphNode } from 'lexical';

Placeholder.configure({
    placeholder: 'My Custom Placeholder',
    
  })

function handleChange(e, editor) {
    
    if (e.code === 'Enter'){
        //Adds a new line when enter is fired
        e.preventDefault()
        //TODO: We can put the below in a function, so both tab and enter will call it
        const textHolder = "LALLALA\n"
        console.log('handleChange has fired');
        const newLine = {
            type: 'paragraph',
            content: [
                {
                  type: 'text',
                  text: textHolder,
                },
              ],
        }
       
               
        editor.commands.insertContent(newLine)
        newLine.configure({
            HTMLAttributes: {
                class: 'a new-name',
            }
            
        }
            
            
        )
          
            
            
    }

    if (e.code === 'Tab'){ //Tab function removes previous suggestion and replaces it with a new one
        e.preventDefault()
        console.log('Now we have tab');
        const text = document.getElementsByClassName("my-custom-paragraph")
        const select = text[text.length-1].parentNode
        select.removeChild(select.lastChild);

    } 
}


const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Text,
      Placeholder,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'my-custom-paragraph',
        }
        }),
        
    ],
    
   
    onUpdate({editor}){ //detects the update
            
     },


    
    
        
    
  })
   

  return (
    <EditorContent editor={editor} onKeyDown={(e)=> handleChange(e, editor)}/>
  )
}

export default Tiptap