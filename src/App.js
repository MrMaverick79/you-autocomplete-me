import "./css/main.css";
import "./css/tailwind.css";

import React from 'react';
import Editor from './Editor';
import { StrictMode, useState } from "react";
import { SideBar  } from "./components/SideBar";
import Canvas from "./components/Canvas";

//Redux
import { useSelector, useDispatch } from 'react-redux'



export default function App() {

  const model = useSelector( state => state.model);
  const dispatch = useDispatch();





  function onChange( event){
    console.log(event.target)
    dispatch({type: 'model/updated', payload: event.target.value})
  }

  function isChecked(){
      return "checked";
  }
 

  return (
    <div>
      <header className="bg-white dark:bg-slate-800">
          <h1 className="text-gray-900 font-bold text-center mt-5 text-xl italic mb-4 dark:text-white">
            you (auto)complete me
          </h1>

        <form onChange = {onChange} className="text-center">
          <label className="text-gray-400 font-light p-8">Shakespeare
            <input type="radio" value="clean_shakes_sonnets" name="model"className="radio m-1" checked={model==="clean_shakes_sonnets"?  'yes' : ""}/> 
          </label>
          <label className="text-gray-400 font-light p-8">Emily Dickinson
            <input type="radio" value="clean_dickinson" name="model"
            className="radio m-1" checked={model==="clean_dickinson"?  'yes' : ""}/> 
          </label>
          <label className="text-gray-400 font-light p-8">Edgar Alan Poe
            <input type="radio" value= "clean_poe" name="model" className="radio m-1" checked={model==="clean_poe"?  'yes' : ""}/> 
          </label>
        </form>
          
        

      </header>
      <div className="flex container">

        <div className="items-center justify-center min-h-screen py-2 m">
          <SideBar />
        </div>
        
        <div className="flex min-w-[100vw] mx-4 mt-8 mb-4 justify-center ">
          <StrictMode>
              
              <Canvas/>

          </StrictMode>
        </div>
      


      </div>
    </div>
  );
}