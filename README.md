# you (auto)complete me :computer: :memo:

**Author: Brendan Tuckerman**

[See this project live](https://mrmaverick79.github.io/you-autocomplete-me/)

**Stack & Libraries**

Built with: 

- [React](https://reactjs.org/)
- [Tailwind CSS](tailwind.css)
- [ml5.js Machine Learning Library](https://learn.ml5js.org/#/) 
- [TipTap Headless Text Editor](https://tiptap.dev/)


**Poets & Works**

[Emily Dickinson](https://en.wikipedia.org/wiki/Emily_Dickinson).
Model derived from: https://www.gutenberg.org/cache/epub/12242/pg12242.txt

[William Shakespeare](https://en.wikipedia.org/wiki/William_Shakespeare)
Model derived from:  https://www.gutenberg.org/cache/epub/1041/pg1041.txt

[Edgar Allan Poe](https://en.wikipedia.org/wiki/Edgar_Allan_Poe). Model derived from:  https://www.gutenberg.org/ebooks/10031


## Overview ## 


This project is an example of a machine learning regression models in action.

From the ml5 documentation: 

```
   RNN and LSTMs (Long Short Term Memory networks) are a type of Neural Network architecture useful for working with sequential data (like characters in text or the musical notes of a song) where the order of the that sequence matters. This class allows you run a model pre-trained on a body of text to generate new text.
```

 This project uses the ML5  CharRNN library to suggest poetry in the style of Emily Dickinson, Edgar Allan Poe and William Shakespeare.

 The user input is passed into models that have been trained using Tensorflow, and then the model generates a sample that would be probable based on their learnign and the input.

    This is my letter to the world,
       That never wrote to me, --
    The simple news that Nature told,
       With tender majesty.

    Her message is committed
       To hands I cannot see;
    For love of her, sweet countrymen,
       Judge tenderly of me!



**Sample Works**



Emily Dickinson

```

The winds of spring
— Would not straight the Clover — And how not and my Floods — And we and the 
lost sought a new path where
He could I do not see — The Sun — makes — and the say — The Summer heat
It was not a firm — But when the Firmament — When the Heaven — and the Bee —
only then
The Wind abode — more there — And not for the Hills — The Summer — say — only once--
The Grave an Art of the sun To still the room.


```

Edgar Allan Poe

```
   Where do they lie?
   to be destruction of the contrary, which has
   Never seen this
   I cannot read!--the bowers of the breath and forever
   litter a star which the beautiful bed light
   lines. But the most spirit from the first thought
   Cannot reach me.

```

William Shakespeare

   **Not So Sonnet**

   My mistresses' cpu is nothing like the sun,

   where thou for this am the world by death

   freed, with little

   with their lives the prick and thee, 

   a strange machine

   Thou art thou mine false-- my heart be 

   yours.

**Some other notable lines:**

"Ha! ha! ha! ha! ha! ha! ha! ha! ha! ha! ha! ha!" - Edgar Allan Poe

##  About / Tutorial: Training a model using CharRNN

   Follow these steps to train your own model. 

1.  Develop an environment.

    Training a model with the CharRNN library requires access to tensorflow, which in turn requires some pretty simple Python scripting. The instructions for how to do this can also be found in the [github for the CharRNN library](). 
    
    Be sure to use Python 3.6 as per the instructions. 

    To prepare the environnment:

    Check which versions of Python you have using 

    `$ python --version`

    You might need to download Python 3.6 for your OS.

       
   Also ensure that you have installed `pip`, which is the package manager for Python.

   We are going to use `pip` and `python 3.6` to set up a virtual environment on our machine, so that it does not interfere with any local Python on our machine.

   I used [virtualenv](https://virtualenv.pypa.io/en/latest/) to set up my Python virtual environment, but `venv` should also work.

   To install virtualenv open the console and use

   `pip install virtualenv`

   Once we have virtualenv, we can create an environment using 

   `virtualenv -p python3.6 YOUR_ENV_NAME_HERE`

   It doesn't really matter where you create your environment, but you might like to keep it seperate from any final projects (like a front-end to dispaly the output), as you will be cloning a repo into this environment. You can copy the models produced in this environment easily. 

   The environment is now created. 

   We have to activate this new environment with

    `source YOUR_ENV_NAME_HERE/bin/activate`
    
   You should now see that your terminal is in a new Python sub terminal, and your machine is ready to learn.
     

2.  Train the model using the text files.

   I used [this](https://www.gutenberg.org/ebooks/12242) version of Emily Dickinson's complete poems and created a new txt file, with everything but the poems removed.

   To do this, you can use a script like this: 

   ```python
      # -*- coding: utf-8 -*-
      """
      Created on 8th August 2022
         Input: text file
         Outputs: text with int characters removed, as well as occurences of capital letters that occur more than once( e.g. XX, HI)
      @author: brendantuckerman
      """
      import sys
      import os
      import re
      import fileinput

      def main():
         print("Initialising...")
         file = sys.argv[1] #the source file
         new_file = sys.argv[2] #a new target file
         if not os.path.isfile(file):
            print("File path {} does not exist. Exiting...".format(file))
            sys.exit()
         
         clean_text(file, new_file)

      def clean_text(file, new_file):
         #File is the original file, the new_filename is the source: SOURCE.txt    
         print(f'Now scrubbing {file} to make {new_file}')
         remove = r'[0-9]|[{}*_@#%]|([A-Z]{2,})|[\n]|[ \n\r\t\f]' #Numbers, specific characters,  instances where capital letters appear more than once in a row, new line
         with open(file, 'r', encoding = 'UTF-8') as f: 
            for line in f.read():  
                  filtered_contents = re.sub(remove, " ", line)   #re wll replace the items in remove with a " " 
                  with open( new_file, 'a') as file_object: #write results to the new file
                     file_object.write(filtered_contents)
                     file_object.close()
                     
         f.close()


      if __name__ == '__main__':
         main()


   ```
   You can run this program by saving the above, and the using: 

   `python THIS_FILE_NAME.py SOURCE.TXT DESTINATION.TXT`

   (or just use the Regex search function inside VSCode to find the elements oyu want to remove)

   Check the size of your file--you want as much data as possible (but your training might take a while).

   The next set of instructions are as per the github instructions for training a model. 

   ```bash

   $ git clone https://github.com/ml5js/training-charRNN
   $ cd training-charRNN
   $ pip install -r requirements.txt
   $ python train.py --data_path /path/to/data/file.txt

   ```

   Depending on the size of your text file, you might like to set some [hyperparameters](https://github.com/ml5js/training-charRNN#hyperparameters). The size of your file will also impact the speed of the training -- my Dickinson and Eliot training took about a minute, while the original Shakespeare full text I tried using was scheduled to run for 14 hours.

   Once the training is complete, you can find the models you made in the `models/` folder. You'll need to copy the entire thing into your project so you can access them.

         

3. Generate predictions using the model
   
   NB: Using the ml5 library from localhost results in CORS errors. You might notice that if ou try to create a basic HTML template and then try to run your page, you will get a 404 error in the console.

   To avoid this, one solution is to run this project as a live server. I used **Live Server**, which is available as an extension with VS Code.

   In React placing the models into the `public` folder helped to overcome the same issues.

   To see your model in action, you can create a basic HTML file using this boiler plate from ml5:
      
   ``` html
         <!DOCTYPE html>
         <html lang="en">
         <head>
            <title>Getting Started with ml5.js</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
         </head>

         <body>
            <script>
               // Your code will go here
               // open up your console - if everything loaded properly you should see the correct version number
               console.log('ml5 version:', ml5.version);
            </script>
         </body>
         </html>
   ```
      
   The instructions on the [ml5](https://learn.ml5js.org/#/reference/charrnn) site are excellent and clear, and I'm simply reproducing them here.

   Once you have the basic HTML in place, you can add the following to the `<script>` tags:

   ```javascript

      // Create the character level generator with a pre trained model
      const rnn = ml5.charRNN('models/bolaño/', modelLoaded);

      // When the model is loaded
      function modelLoaded() {
         console.log('Model Loaded!');
      }

      // Generate content
      rnn.generate({ seed: 'the meaning of pizza is' }, (err, results) => {
         console.log(results);
      });

   ```

   Just be sure that you correctly point  `charRNN()` to the path where you have the models.

   And that is it! If you open the console, you should firstly see that the Ml5 library is connected. Then you will return an object with a key `sample`, which is has been generated from your model!


4.  Create a front end to allow users to enter text,  and then have the model supply the next line

   There are many rich text editors available, but this project makes use of [TipTap](https://tiptap.dev/), a headless Rich Text editor that is built on ProseMirror. The editor inserts new lines each time the user requests a suggestion, and includes the ability toadd titles and print the finished piece.



## Wishlist / Future Additions

-[ ] Translate the project to Typescript

-[ ] Further models, refining the current models

-[ ] "Rhyme mode" using API

## Known Bugs :bug:

~~Default seed needs to be set, to prevent gibberish being produced.~~

Models still produces occasional strange output, but hey--it is just a machine.

~~Editor 'disappears' if the user focuses, types, deletes, and then moves away~~



## Inspiration 

[Selected Stories](https://cvalenzuela.github.io/Selected_Stories/)

[Nabil Hassein's generative DOOM](https://nabilhassein.github.io/generative-DOOM/)


## Resources and tutorials


[ML5.js Library](https://learn.ml5js.org/#/)

[CharNNN Library from ML5](https://learn.ml5js.org/#/reference/charrnn)

[Creating a VirtualEnv to run the Python environment needed to train a model](https://www.youtube.com/watch?v=nnhjvHYRsmM)

[Training a CharNNN using the model in ml5.js](https://github.com/ml5js/training-charRNN)

[Project Gutenberg](https://www.gutenberg.org/): a collection of classic books, available in .txt

[Working with TipTap](https://tiptap.dev/)

[Text Generation with LTSM and Spell](https://www.youtube.com/watch?v=xfuVcfwtEyw)

[Excellent collection of loading icons](https://loading.io/css/)

[Other Icons](https://remixicon.com/)