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

     function lightsOut(){
        console.log('Lights switched');
        const toggleSwitch = document.querySelector('#toggleA')
        toggleSwitch.checked ? 
            localStorage.theme = 'dark'
                :
            localStorage.theme = 'light'

            
            
                if (localStorage.theme === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                }
          
                // if NOT set via local storage previously
            
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                }
            
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
                fill= {localStorage.theme === 'light' ? "gray-300" : 'white' }
                opacity="0.2"
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
                                        <img src='../shift-mac.png'className="w-8"></img> 
                                        +      
                                        <img src='../enter-key.png'className="w-8"></img>
                                    </div>  
                                    <figcaption className="text-sm w-20">Create blank line</figcaption>
                                </figure>
                                                           
                            </div>

                    </div>

                    
        
        

    
        


                 <div className="option">
                    <h3 className="text-lg pb-8">Options</h3>

                             

                    <div className="selections flex-col p-2">
                        
                            <label>
                                <div className="innerDial"> 
                               
                                    <span data-bs-toggle="tooltip" title="The number of characters that will be suggested in an AI line"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" fill="rgba(196,196,196,1)"/></svg></span><p className="pl-3" > Line length: {lineLength}</p>            
                                </div>
                                    <input type="range" name="lineLength" min="1" max="100" value={lineLength} onChange= {()=>{handleChange()}}  className="lineLength slider"/>
                            </label>
                            

                                              

                            <label>
                                <div className="innerDial"> 
                                    <span data-bs-toggle="tooltip" title="The randomness of the model: 
                                    Lower numbers are repetitive but close to the original text; Higher numbers are more chaotic."><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" fill="rgba(196,196,196,1)"/></svg></span><p className="pl-3">Temperature: {temperature} </p>
                                </div>           
                                <input type="range" name="temperature" min="0.0" max="1.0"  value={temperature} className="temperature slider" onChange= {()=>{handleChange()}}  step="0.1" />
                        </label>
                      

                    </div>

                
                        <div class="flex items-center justify-center w-full mb-12 p-3">
                            {/* Sun */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-4"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="rgba(196,196,196,1)"/></svg>
                            
                            <label 
                                for="toggleA"
                                class="flex items-center cursor-pointer"
                            >
                                
                                <div class="relative">
                            
                                <input id="toggleA" type="checkbox" class="sr-only" onClick={()=>lightsOut()}/>
                            
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
                        <h3 className="text-lg pb-8">About this project</h3>
                        <p className="text-sm  mb-4">This project uses the <a href="https://ml5js.org/" className="text-blue-400" target="_blank" >Ml5.js</a> machine learning library to generate lines in the style of famous poets, based on the lines supplied by the user.</p>
                        <p  className="text-sm mb-4">Inspired by <a href="https://cvalenzuela.github.io/Selected_Stories/" className="text-blue-400" target="_blank">Selected Stories.</a></p>
                        
                        
                        <p  className="text-sm">This project tries to abide by the <a href="https://github.com/ml5js/Code-of-Conduct"className="text-blue-400" target="_blank"> ML5.js Code of Conduct</a> </p>
                        </div>
                    </div>
                    <div className="github w-full ml-20">
                        <a href="https://github.com/MrMaverick79/you-autocomplete-me" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(196,196,196,1)"/></svg>
                        </a>
                    </div>
                </div>
        </>
        
    )};//return,
    






export { SideBar }
