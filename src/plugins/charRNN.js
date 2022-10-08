//These are custom hooks for the logic related to the charRNN library


import ml5 from 'ml5'; // Ml5 Library


async function useCharRNN (seed, model) {

    console.log('We are now in the new hook with seed, model', seed, model);
   
      
    console.log('This.props.model', model);
    const rnn = new ml5.charRNN(`./models/clean_dickinson`, modelLoaded);
  
    function modelLoaded() {
          console.log('Model Loaded!');
          }
  
    const generate = await rnn.generate({ 
          //options
          seed: seed,
          length: 50, //TODO variable (dat gui)
          temperature: 0.5 //TODO: Variable (dat gui)
  
        //callback function
        }, (err, results) => {
        console.log('Results or error',results, err);
         return results
         //todo: err message
        });         
    

    //TODO: function to deal with text, including removing punctuation and numbers!
    ///lets clean up the response.
    let text = generate["sample"]
    text = text.trim().replace(/(\r\n|\n|\r)/gm, " ") //remove line breaks and white space
   //TODO: conditional if the res is less than the expected length (because the model produced too much white space)
   //TODO: this will require a seperate function in here as you can't 
   //call charRNN again

    return text


}// generateLine

export { useCharRNN }