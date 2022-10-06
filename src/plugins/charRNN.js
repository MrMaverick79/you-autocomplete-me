//These are custom hooks for the logic related to the charRNN library

import { useState } from "react";
import ml5 from 'ml5'; // Ml5 Library
import { text } from "@fortawesome/fontawesome-svg-core";

async function useCharRNN (seed, model) {

    console.log('We are now in the new hook with seed, model', seed, model);
   
      
    console.log('This.props.model',     model);
    const rnn = new ml5.charRNN(`./models/${model}`, modelLoaded);
  
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
    
    ///lets clean up the response.
    let text = generate["sample"]
    text = text.trim()
   

    return text


}// generateLine

export { useCharRNN }