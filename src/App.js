import "./css/main.css";
import "./css/tailwind.css";
import "./js/main"  //custom js

import React from 'react';
import Editor from './Editor';
import { StrictMode, useState } from "react";






export default function App() {

  const [model, setModel] = useState("shakespeare") //default model

  function onChange( event){
    setModel(event.target.value) //set the model from the radio buttons
  }


  return (
    <div>
      <header>
          <h1 className="text-gray-900 font-bold text-center mt-5 text-xl italic">
            you (auto)complete me
          </h1>

        <form onChange = {onChange}>
          <label className="text-gray-300">Shakespeare
            <input type="radio" value="shakespeare" name="model" checked/> 
          </label>
          <label className="text-gray-300">Dickinson
            <input type="radio" value="dickinson_fulltext" name="model" /> 
          </label>
          <label className="text-gray-300">TS Eliot
            <input type="radio" value= "tseliot_fulltext" name="model"/> 
          </label>
        </form>
          
        

      </header>
      {/* SIDEBAR COMPONENT */}
      <div className="max-w-[80vw] mx-4 mt-8 mb-4">
        <StrictMode>
          <Editor 
                model={model}
              
          /> 
        </StrictMode>
      </div>
    </div>
  );
}