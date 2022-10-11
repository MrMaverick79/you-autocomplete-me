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
                className="flex text-2xl items-center cursor-pointer fixed left-10 top-6 z-50 no-print"
                onClick={() => setShowSidebar(!showSidebar)}
                ><img src='../x-solid.svg'className="w-4 opacity-10" ></img>  
                
                </button>
            ) : (
                <svg
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed  z-30 flex items-center cursor-pointer left-10 top-6 no-print"
                fill="gray-300"
                opacity="0.1"
                viewBox="0 0 100 80"
                width="40"
                height="40"
                >
                <rect width="80" height="10"></rect>
                <rect y="30" width="80" height="10"></rect>
                <rect y="60" width="80" height="10"></rect>
                </svg>
            )}
                <div className={`top-0 left-0 w-[25vw] bg-gray-500  p-10 pl-20 text-gray-200 fixed h-full z-40 ease-in-out duration-300 no-print ${
            showSidebar ? "translate-x-0" : "translate-x-[-100%]"
                 }`}>
                
                 <div className="inner container w-[80%]">
                    <div className="instructions">
                            <h3 className="text-lg">Instructions</h3>
                            <div className="instructionalImages inline-flex p-8 text-center">

                                <figure className="pr-2">
                                    <img src='../enter-key.png'className="w-8"/> 
                                    <figcaption  className="text-sm w-12 mr-6">AI line</figcaption>
                                </figure>
                                <figure className="pr-2">
                                    <img src='../tab-mac.png'className="w-8"></img>    
                                    <figcaption className="text-sm w-10 mr-6">Redo line</figcaption>
                                </figure>
                                <figure className="w-10 pr-2">
                                    <div className="inline-flex">
                                        <img src='../enter-key.png'className="w-8"></img>
                                        +      
                                        <img src='../shift-mac.png'className="w-8"></img> 
                                    </div>  
                                    <figcaption className="text-sm w-20">Create blank line</figcaption>
                                </figure>
                                                           
                            </div>

                    </div>

                    
        
        

    
        


                 <div className="option">
                    <h3 className="text-lg">Options</h3>

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
                            {/* Sun */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="rgba(196,196,196,1)"/></svg>
                            
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
                                 {/* Moon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" fill="rgba(196,196,196,1)"/></svg>
                                </div>
                            </label>
                            
                        </div>
                    </div>
                    <div className="about">
                        <h3 className="text-lg">About this project</h3>
                        <p>This project uses the <a href="">ML5.js</a></p>
                        <p>Inspired by <a href="">Selected Stories</a>by</p>
                        
                        <p>GitHub a link</p>
                        <a href="https://github.com/ml5js/Code-of-Conduct">The ML5.js Code of Conduct</a>
                        </div>
                    </div>
                </div>
        </>
        
    )};//return,
    






export { SideBar }
