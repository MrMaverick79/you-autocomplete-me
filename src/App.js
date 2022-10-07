import "./css/main.css";
import "./css/tailwind.css";
import "./js/main"  //custom js

import React from 'react';
import Editor from './Editor';
import { StrictMode, useState } from "react";
import { SideBar  } from "./plugins/SideBar";





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

        <form onChange = {onChange} className="text-center">
          <label className="text-gray-300 p-8">Shakespeare
            <input type="radio" value="shakespeare" name="model"className="m-1" checked/> 
          </label>
          <label className="text-gray-300 p-8">Dickinson
            <input type="radio" value="dickinson_fulltext" name="model"
            className="m-1" /> 
          </label>
          <label className="text-gray-300 p-8">TS Eliot
            <input type="radio" value= "tseliot_fulltext" name="model" className="m-1"/> 
          </label>
        </form>
          
        

      </header>
      <div className="absolute">
        {/* <SideBar /> */}
      </div>
      {/* SIDEBAR COMPONENT */}
      <div className="max-w-[100vw] mx-4 mt-8 mb-4">
        <StrictMode>
         
          <Editor 
                model={model}
              
          /> 
        </StrictMode>
      </div>
    </div>
  );
}