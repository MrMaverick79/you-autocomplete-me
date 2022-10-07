// CSS
import './css/main.css'
import './css/tailwind.css'

// Lexical
import {$createParagraphNode, $createTextNode, $getRoot, $getSelection, COMMAND_PRIORITY_HIGH, FOCUS_COMMAND, KEY_ENTER_COMMAND, LexicalEditor} from 'lexical';
import {useRef, useEffect, useState } from 'react';
import {ElementFormatType, LexicalCommand, TextFormatType} from 'lexical';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {useCharRNN} from "./plugins/charRNN"; //my bespoke charRNN hooks.

import ml5 from 'ml5'; // Ml5 Library



//Lexical settings --> the full version
//TODO: edit and trim these 
const theme = {
  //these need to be defined in css  / tailwind
  //also should be used in variables below in case of changes
  ltr: "ltr",
  rtl: "rtl",
  border: "border-0", //tailwind
  focus: "focus:border-transparent", //??
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

//TODO: Are these needed?
const keyCodes= {
  //THESE CAN BE USED IN EVENT HANDLERS
  //But look into lexicals own key events
  escape: 27,
  enter: 13,
  tab: 9
}


// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
// Supplied by Lexical Boilerplate
function onChange(editorState) {
  

  editorState.read(() => {
    
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });

  
} //end onChange

function GetLine(seed, model){
  return useCharRNN(seed, model)
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


//Append a <p> to the root using this plugin
//This custom 'plugin' is responsible for storing the 
//seed entered by the user and the generated line.
// The core of it is update(), which places a two nodes onto the 
// exisiting ones--one from the machine learning model,
// and a blank one to allow the user to continue typing.
function UpdatePlugin(props){
  //TODO: export/ import to seperate?. Place key handlers
  const [editor]  = useLexicalComposerContext(); //this is key to the Lexical plugins- it allows us to acces the 'state' of the editor.
  
  const [seed, setSeed] = useState("")
  const[computerLine, setComputerLine] = useState(null) 
   //Also note the syntax to 'read' the editor in the OnChange component.
  
  // setComputerLine(await useCharRNN(seed, props.model)); 
  //  console.log('The line I get back is', computerLine)
  //need to grab the seed here and send it to useCharRNN

  //This places a new node. 
  function  update() {

      editor.update(()=> {
        const root = $getRoot();
        
        //TODO: "Computer line"--> function chain to fetch words
        // TODO including animation: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        //TODO: DRY this so p and q are added together

        //Create and append a computer line
        const p = $createParagraphNode()
        p.append($createTextNode(computerLine))
        root.append(p)

        //Create and append a blank user line and focus on it.
        const q = $createParagraphNode()
        q.append($createTextNode()) 
        root.append(q)
        // console.log('Trying to get the last element:', editor.getRootElement())
        q.select() //this focuses the cursor on the last element (i.e. the blank line)
      }); 



  }

  useEffect(()=>{
    // async function  fetchData() {
    //   const res = await GetLine(seed, props.model)
    //   console.log('Finally get a response', res);
      
    //   return res;
    // }
    // setComputerLine(fetchData()) //set the response as computerLine in 'state'


    
     //you should be able to use this for a model AND fire off the 
     //events through this without using detect key press
    editor.registerCommand (
      KEY_ENTER_COMMAND,
      (event) => {
        event.preventDefault()  //this is preventing a new line
        getSeed();
        console.log('Here is the register command', event);
        return true
      }, COMMAND_PRIORITY_HIGH
    )

    // Focus the editor when the effect fires!
    
    
  }, []); //end use Effect (ENTER)

  // useEffect(()=>{
  //   if(computerLine){
  //     update(computerLine)
  //   }
  useEffect(()=>{
    let newLine = fetchData()

    async function  fetchData() {
      const res = await GetLine(seed, props.model)
      console.log('Finally get a response', res);
      setComputerLine(res)
    }
     //set the response as computerLine in 'state'
  
    

 }, [seed]); //for when seed is changed

 useEffect(()=>{
  console.log('Letting you know that CL has changed');
  if(computerLine != null && seed != ""){
    update()
  }
  
  

}, [computerLine]); //for when computerLine is changed

  const getSeed = () => {
  console.log('getSeed');
  
  //All of the text on the page is stored in within <p>tagged as 'editor-paragraph', which is set from within theme (and so should point there in case you change it.)
   const allLines =  document.getElementsByClassName(`${theme.paragraph} ${theme.ltr}`)
   const seed = allLines[allLines.length-1].innerText //get the last line that is written --the class "ltr" avoids any blanks
   
   //TODO might have to grab the dat gui variables if you want to be able to use these as arguments in createNewLine
    console.log('Seed', seed)
    setSeed(seed) //sets the 'state' as seed
    
  //  createNewLine(seed);  
    
  }; //getSeed
 
  //Because of the inbuilt ENTER_KEY_PRESS, we don't need a traditional event listenr:

  // const detectKeyPress = (e) => {
    
  //   console.log('Update editor is now registering the key press', e.which)
  //   switch (e.which){
  //     case keyCodes.enter:
  //       e.preventDefault() //was hoping this would prevent new line
  //       update(); //testing
  //   }
  // } //end detectKeyPress
        

 
    
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
            placeholder={<div className='editor-placeholder'>Write your first line and press enter...</div>}
            
          />
         
         
          <OnChangePlugin onChange={onChange}  />
          <HistoryPlugin />
          <UpdatePlugin model={props.model} />
          <MyCustomAutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}