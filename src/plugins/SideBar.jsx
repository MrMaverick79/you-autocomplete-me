import { useState } from "react";
import "../css/tailwind.css";
import "../css/main.css"

function SideBar() {



    return(
    
        <div className="innerSideBar">
            <h3>Options</h3>

            <p>Authors can be changed using the radio buttons under the main title</p>


        

            <div className="selections flex flex-col">
                <label > Length             
                    <input type="range" />
                </label>
                <p> Length refers to the number of characters that will be suggested in a line. Sometimes the model will include a few blank spaces, so it's not always exact.</p>

                <label > Temperature             
                    <input type="range" />
                </label>
                <p> Temperature </p>

            </div>

            {/* Toggle  */}
            <label for="purple-toggle" class="inline-flex relative items-center mr-5 cursor-pointer">
                <input type="checkbox" value="" id="purple-toggle" class="sr-only peer" checked />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Night Mode</span>
            </label>
            
            <h4>About this project</h4>
            <p>This project uses the <a href="">ML5.js</a></p>
            <p>Inspired by <a href="">Selected Stories</a>by</p>
            


        </div>
        
    )



}


export { SideBar }
