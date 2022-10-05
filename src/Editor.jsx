// CSS
import './css/main.css'
import './css/tailwind.css'

// Lexical
import {$createParagraphNode, $createTextNode, $getRoot, $getSelection, COMMAND_PRIORITY_HIGH, FOCUS_COMMAND, KEY_ENTER_COMMAND, LexicalEditor} from 'lexical';
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

// Ml5 Library
import ml5 from 'ml5';



//Lexical setting 
const theme = {
  //these need to be defined in css  / tailwind
  //also should be used in variables below in case of changes
  ltr: "ltr",
  rtl: "rtl",
  border: "border-0", //tailwind
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
  //But look inot lexicals own key events
  escape: 27,
  enter: 13,
  tab: 9
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

//Append a p to the root using this plugin
function UpdatePlugin(){
  //TODO: export/ import. Place key handlers
  const [editor]  = useLexicalComposerContext(); //this is key to the plugins- it allows us to acces the 'state' of the editor

  //TODO: Autofocus node on the last one?
  //TODO: Delete the new line that appears
  function  update() {
      editor.update(()=> {
        const root = $getRoot();
        const p = $createParagraphNode()
        p.append($createTextNode("Computer Line"))
        root.append(p)
        const q = $createParagraphNode()
        q.append($createTextNode()) 
        root.append(q)
        console.log('Tryig to get the last element:', editor.getRootElement())
        q.select()
      }); 



  }

  useEffect(()=>{
    //TODO: we probablw ont need this version due to the editor.resiterCommand
    const element = document.getElementById("detect_change");
    element.addEventListener('keydown', detectKeyPress, false);
     //this prevents a new line from being created on enter
     //you should be able to use this for a model AND fire off the 
     //events through this without using detect key press
    editor.registerCommand (
      KEY_ENTER_COMMAND,
      (event) => {
        console.log('Here is the register command', event);
        return true
      }, COMMAND_PRIORITY_HIGH
    )

    // Focus the editor when the effect fires!
    
    
  }, [editor]);

  


 

  const detectKeyPress = (e) => {
    
    console.log('Update editor is now registering the key press', e.which)
    switch (e.which){
      case keyCodes.enter:
        e.preventDefault() //was hoping this would prevent new line
        update(); //testing
    }
  } //end detectKeyPress
        

 
    
}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

//Editor -- main component
export default function Editor(props) {
  
 
  
  const initialConfig = {
    namespace: 'MyEditor', 
    theme: theme, //above
    onError(error){
      throw error
    },
    editorState: () =>{
      const root = $getRoot();
      root.clear();
      const p = $createParagraphNode()
      p.append($createTextNode())
      root.append(p)
    },

    nodes: [
     
      //you can define nodes here
    ]
  };

  

  //event listeners and handlers
  // ** Moved to UpdateEditor
  // useEffect(()=>{
    
  //   const element = document.getElementById("detect_change");
    
  //   element.addEventListener('keydown', detectKeyPress, false);

    

  // }, []);

  // const detectKeyPress = (e) => {
    
   
        
  //   //detects which key has been pressed and looks out for the action keys - enter, tab, esc
  //   // console.log('This key has been pressed', e.key);
  //   switch (e.which){
  //     case keyCodes.enter:
  //       getSeed()
  //   }  

  // }

  //sets the 'seed' as the last line written.
  // Fires when enter is pressed
  const getSeed = () => {
      console.log('SetSeed');
    
      //All of the text on the page is stored in within <p>tagged as 'editor-paragraph', which is set from within theme (and so should point there in case you change it.)
     const allLines =  document.getElementsByClassName(`${theme.paragraph} ${theme.ltr}`)
     const seed = allLines[allLines.length-1].innerText //get the last line that is written --the class "ltr" avoids any blanks
     
     //TODO might have to grab the dat gui variables if you want to be able to use these as arguments in createNewLine
      
     createNewLine(seed);  
      
    }; //getSeed
  
    //using the seed (the last line typed, create a new line from the charRNN model)

    const createNewLine = async(seed) => {
      
      console.log('This.props.model', props.model);
      const rnn = new ml5.charRNN(`./models/${props.model}`, modelLoaded);

      function modelLoaded() {
        console.log('Model Loaded!');
        }

      const generate = await rnn.generate({ 
        //options
        seed: seed,
        length: 50, //TODO variable (dat gui)
        temperature: 0.1 //TODO: Variable (dat gui)

      //callback function
      }, (err, results) => {
      console.log('Results or error',results, err);
       return results
       //todo: err message
      });

            
      addPoetLine(generate.sample) //this is the text for the next line


    }; //end createNewLine 

    //Add the new line to the editor
    const addPoetLine = (line) => {
      const root = $getRoot();
      console.log('Root', root)
    }; 

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        {/* <ToolbarPlugin /> */}
        <div className="editor-inner" id="detect_change">
          <RichTextPlugin 
            contentEditable={<ContentEditable />}
            placeholder={<div className='editor-placeholder'>Write the first line and press enter...</div>}
            
          />
         
         
          <OnChangePlugin onChange={onChange}  />
          <HistoryPlugin />
          <UpdatePlugin />
          <MyCustomAutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}