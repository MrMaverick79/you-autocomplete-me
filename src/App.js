import "./css/main.css";
import "./css/tailwind.css";
import "./js/main"  //custom js

import React from 'react';
import Editor from './Editor';
import { StrictMode } from "react";






export default function App() {
  return (
    <div>
      <header>
          <h1 className="text-gray-900 font-bold text-center mt-5 text-xl italic">
            you (auto)complete me
          </h1>

        <form>
          <label className="text-gray-300">Shakespeare
            <input type="radio"/> 
          </label>
          <label className="text-gray-300">Dickinson
            <input type="radio" /> 
          </label>
          <label className="text-gray-300">TS Eliot
            <input type="radio" /> 
          </label>
        </form>
          
        

      </header>
      {/* SIDEBAR COMPONENT */}
      <div className="max-w-[80vw] mx-4 mt-8 mb-4">
        <StrictMode>
          <Editor 
                model={'shakespeare'}
          /> 
        </StrictMode>
      </div>
    </div>
  );
}