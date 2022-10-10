import { useState } from "react";
import { Fragment } from "react";

import "../css/tailwind.css";
import "../css/main.css"
import "../css/sidebar.css"

//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon  }  from "@fortawesome/react-fontawesome";

/*Acknowledgements:
* Thanks to https://blog.avneesh.tech/create-an-animated-sidebar-with-tailwindcss-in-react
* for thew basic toolbar
*/

function SideBar() {
    //show SideBar or not
    const [showSidebar, setShowSidebar] = useState(false);

    //Redux globals 
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
        
            

    

    <>
            {showSidebar ? (
                
                
                <button
                className="flex text-2xl text-white items-center cursor-pointer fixed left-10 top-6 z-50"
                onClick={() => setShowSidebar(!showSidebar)}
                >X
                
                </button>
            ) : (
                <svg
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed  z-30 flex items-center cursor-pointer left-10 top-6"
                fill="gray-300"
                opacity="0.1"
                viewBox="0 0 100 80"
                width="40"
                height="40"
                >
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
                </svg>
            )}
                <div className={`top-0 left-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${
            showSidebar ? "translate-x-0" : "translate-x-[-100%]"
                 }`}>
            

        
        

    
        



                <h3>Options</h3>

                <p>Authors can be changed using the radio buttons under the main title</p>


            

                    <div className="selections flex flex-col">
                        <label > Length of computer line {lineLength}            
                            <input type="range" name="lineLength" min="1" max="100" onChange= {()=>{handleChange()}}  className="lineLength slider"/>
                        </label>
                        <p> Length refers to the number of characters that will be suggested in a line.</p>

                        <label > Temperature: {temperature}             
                            <input type="range" name="temperature" min="0.0" max="1.0"  value={temperature} className="temperature slider" onChange= {()=>{handleChange()}}  step="0.1" />
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
                            Night mode
                            </div>
                        </label>
                        
                        </div>
                    
                    <h4>About this project</h4>
                    <p>This project uses the <a href="">ML5.js</a></p>
                    <p>Inspired by <a href="">Selected Stories</a>by</p>
                    
                    <p>GitHub a link</p>

                </div>
        </>
        
    )};//return,
    






export { SideBar }
