import "./css/main.css";
import "./css/tailwind.css";
import "./js/main"  //custom js

import React from 'react';
import Editor from './Editor';


export default function App() {
  return (
    <div>
      <header>
          <h1 className="text-gray-900 font-bold text-center mt-5 text-xl italic">
            you (auto)complete me
          </h1>

        <ul>
          <li className="list-none">Shakespeare</li>
          <li className="list-none">Dickinson</li>
          <li className="list-none">TS Eliot</li>
        </ul>

      </header>
      
      <div className="max-w-[100vw] mx-4 mt-8 mb-4">
        <Editor />
      </div>
    </div>
  );
}