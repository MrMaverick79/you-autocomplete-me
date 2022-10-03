import "./css/main.css";
import "./css/tailwind.css";
import "./js/main"  //custom js

import React from 'react';
import Editor from './Editor';
import ml5 from 'ml5';

// ? This might be better in the Editor component

//charNNN predictions
//TODO:  model should be dependend on selection
const rnn = new ml5.charRNN("./models/dickinson_fulltext", modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!');
  }

  rnn.generate({ 
    seed: 'When the sun is ' , //TODO: input
    length: 30, //TODO variable (dat gui)
    temperature: 0.5 //TODO: Variable (dat gui)


}, (err, results) => {
console.log(results, err);
});

console.log(rnn.predict(0.5))


export default function App() {
  return (
    <div>
      <header>
          <h1 className="text-gray-900 font-bold text-center mt-5 text-xl italic">
            you (auto)complete me
          </h1>

        <ul>
          <li className="list-none text-gray-300">Shakespeare</li>
          <li className="list-none text-gray-300">Dickinson</li>
          <li className="list-none text-gray-300">TS Eliot</li>
        </ul>

      </header>
      
      <div className="max-w-[100vw] mx-4 mt-8 mb-4">
        <Editor />
      </div>
    </div>
  );
}