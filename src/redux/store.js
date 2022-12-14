import {createStore} from 'redux';

const initialState = {
    model: 'clean_shakes_sonnets',
    seed: "write with me",
    computerLine: "write with me",
    temperature: 0.5, 
    lineLength: 30, 
    rnn: {} //the current rnn object
}

function reducer( state=initialState, action) {

    switch (action.type){
        
        case "model/updated":
            return{
                ...state, 
                model: action.payload
            }
               
        case "seed/updated":
            return{
                ...state,
                seed: action.payload
            }
     
        case "computerLine/updated":
            return{
                ...state,
                computerLine: action.payload
            }
        case "temperature/updated":
            return{
                ...state,
                temperature: action.payload
            }
        case "lineLength/updated":
            return{
                ...state,
                lineLength: action.payload
            }
        case "rnn/updated":
            return{
                ...state,
                rnn: action.payload
            }
        default: 
            console.log('No match found in store.js', action);
            return state;
    } //end switch  


} //end reducer

export const store = 
    createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
    );

    store.subscribe(()=> {

        const state = store.getState();
        //save to db, or local storage etc
        // this is the place to trigger other methods.
        //this needs to be outside the reducer.
    });

    export default store