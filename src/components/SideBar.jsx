import { useState } from "react";
import "../css/tailwind.css";
import "../css/main.css"
import "../css/sidebar.css"

//REDUX
import { useSelector, useDispatch } from 'react-redux'



function SideBar() {

    const model = useSelector( state => state.model);
    const temperature = useSelector( state => state.temperature);
    const lineLength = useSelector( state => state.lineLength);
    const dispatch = useDispatch();



    function handleChange(e){
        const newLength = document.querySelector(".lineLength");
        const newTemperature = document.querySelector(".temperature")
        dispatch({type: 'lineLength/updated', payload: newLength.value})
        dispatch({type: 'temperature/updated', payload: newTemperature.value})
    }


    return(
    
        <div className="innerSideBar">
            <h3>Options</h3>

            <p>Authors can be changed using the radio buttons under the main title</p>


        

            <div className="selections flex flex-col">
                <label > Length of computer line {lineLength}            
                    <input type="range" name="lineLength" min="0" max="100" onChange= {()=>{handleChange()}}  className="lineLength slider"/>
                </label>
                <p> Length refers to the number of characters that will be suggested in a line.</p>

                <label > Temperature: {temperature}             
                    <input type="range" name="temperature" min="0.0" max="1.0"  value="0.5" className="temperature slider" onChange= {()=>{handleChange()}}  step="0.05" />
                </label>
                <p> Temperature </p>

            </div>

           
                <div class="flex items-center justify-center w-full mb-12">
                
                <label 
                    for="toogleA"
                    class="flex items-center cursor-pointer"
                >
                    
                    <div class="relative">
                   
                    <input id="toogleA" type="checkbox" class="sr-only" />
                   
                    <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    
                    <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  
                    <div class="ml-3 text-gray-700 font-medium">
                    Toggle Me!
                    </div>
                </label>
                
                </div>
            
            <h4>About this project</h4>
            <p>This project uses the <a href="">ML5.js</a></p>
            <p>Inspired by <a href="">Selected Stories</a>by</p>
            
            <p>GitHub a link</p>

        </div>
        
    )



}


export { SideBar }
