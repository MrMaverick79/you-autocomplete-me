import "./css/main.css";
import "./css/tailwind.css";

//React
import React from 'react';
import { StrictMode, useEffect } from "react";

//Components
import { SideBar  } from "./components/SideBar";
import Canvas from "./components/Canvas";

//Redux
import { useSelector, useDispatch } from 'react-redux'

//Ml5
//CharRNN
import ml5 from 'ml5';

//Main template page
export default function App() {

  //Redux--store the current model as selected by the radio buttons
  const model = useSelector( state => state.model);
  const rnn = useSelector( state => state.rnn )
  const dispatch = useDispatch();

  //update the model when a new selection is made
  function onChange( event){
    // console.log(event.target)
    dispatch({type: 'model/updated', payload: event.target.value})
  }

  useEffect(() => {
    const rnn = new ml5.charRNN(`./models/${model}`, modelLoaded);
    dispatch({type: 'rnn/updated', payload: rnn})
  
  }, [model]); //useEffect whenever the model is chnaged
  
  function modelLoaded(){
    console.log('Model ready from App? ', rnn.ready)
    if (rnn.ready){
     console.log('Model is now ready');
    }
  } //modelLoaded

  return (
    <div>
      <header className="bg-white dark:bg-slate-800">
        <h1 className="text-gray-900  font-bold text-center mt-5 text-2xl italic mb-4 dark:text-white">
            you (auto)complete me
        </h1>

        <form onChange = {onChange} className="text-center flex justify-center ">
            <div>
              <input type="radio" value="clean_shakes_sonnets" name="model"className="radio m-1" checked={model==="clean_shakes_sonnets"?  'yes' : ""}/> 
              <label className="text-gray-400 font-light p-2 dark:text-white">Shakespeare
              </label>
            </div>

            <div>
              <input type="radio" value="clean_dickinson" name="model"
              className="radio m-1" checked={model==="clean_dickinson"?  'yes' : ""}/> 
              <label className="text-gray-400 font-light p-2 dark:text-white">Emily Dickinson
              </label>
            </div>

            <div>
              <input type="radio" value= "clean_poe" name="model" className="radio m-1" checked={model==="clean_poe"?  'yes' : ""}/> 
              <label className="text-gray-400 font-light p-2 dark:text-white">Edgar Allan Poe
              </label>
            </div>
           

        </form>  
      </header>

      <div className="flex container main">

        <div className="items-center justify-center min-h-screen py-2 m">
          <SideBar />
        </div>
        
        <div className="flex min-w-[100vw] mx-4 mt-8 mb-4 justify-center ">
          <StrictMode>
              <Canvas />
          </StrictMode>
        </div>

      </div>
    </div>
  );
}  //App.js