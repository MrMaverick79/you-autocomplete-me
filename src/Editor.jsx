import './css/main.css'
import './css/tailwind.css'
import {$getRoot, $getSelection, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND} from 'lexical';
import {useRef, useEffect} from 'react';
import {ElementFormatType, LexicalCommand, TextFormatType} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import ToolbarPlugin from "./plugins/ToolbarPlugin";


//lexical 
const theme = {
  //these need to be defined in css  / tailwind
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5"
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem"
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem"
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code"
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable"
  }
};

const keyCodes= {
  //THESE CAN BE USED IN EVENT HANDLERS
  'escape': 27,
  'enter': 13,
  'tab': 9
}


// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  

  editorState.read(() => {
    
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });

  
}


// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// https://github.com/facebook/lexical/blob/main/packages/lexical/src/LexicalCommands.ts
// function PressEnter(){
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     editor.registerCommand(
//       KEY_ENTER_COMMAND,
//       console.log('Enter  pressed'),
//       COMMAND_PRIORITY_HIGH
//     )}, [editor]);
   
// }



// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

//themes etc
export default function Editor() {
  
  
  const ref = useRef(null);
  
  const initialConfig = {
    namespace: 'MyEditor', 
    theme: theme, //above
    onError(error){
      throw error
    },

    nodes: [
     
      //you can define nodes here
    ]
  };

  

  //event listeners and handlers
  useEffect(()=>{
    
    const element = document.getElementById("detect_change");
    
    element.addEventListener('keydown', detectKeyPress, false);

    



  }, []);

  const detectKeyPress = (e) => {
    console.log('This key has been pressed', e.key);
  }

  //experimenting with lexical commands
 

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner" id="detect_change">
          <RichTextPlugin 
            contentEditable={<ContentEditable />}
            placeholder={<div className='editor-placeholder'>Enter some text...</div>}
            
          />
         
          {/* <OnChangePlugin onChange={onChange}  /> */}
          <OnChangePlugin onChange={onChange}  />
          <HistoryPlugin />
          
          <MyCustomAutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}