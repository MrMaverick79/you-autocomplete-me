# Welcome to the You (auto)coomplete Me Readem:computer: :memo:

**Author: Brendan Tuckerman**

**Overview:** 



This project is an example of a machine learning regression. It uses the ML5  library to suggest lines of poetry in the style of Emily Dickinson.

    This is my letter to the world,
       That never wrote to me, --
    The simple news that Nature told,
       With tender majesty.

    Her message is committed
       To hands I cannot see;
    For love of her, sweet countrymen,
       Judge tenderly of me!


This folder stores the Python Environment, the Models, and the original text which are used to train the models. 

## Tutorial: Training a model using CharNNN

- [x] Develop an environment.

    Training a model with the CharNNN library requires access to tensorflow, which requires some pretty simply Python scripting. The instructions for this can from accessed the [github for the CharNNN library](). Be sure to use Python 3.6 as per the instructions. 

    You can check which versions of Python you have using 

    `$ python --version`

    You might need to download Python 3.6 for your OS.

       
    Also ensure that you have installed `pip`, which is the package manager for Python.

   We are going to use `pip` and `python 3.6` to set up a virtual environment on our machine, so that it does not interfere with any local Python on our machine.

   I used [virtualenv](https://virtualenv.pypa.io/en/latest/) to set up my Python virtual environment, but `venv` should also work.

   To install virtualenv:

   `pip install virtualenv`

   Once we have virtualenv, we can create an environment using 

   `virtualenv -p python3.6 YOUR_ENV_NAME_HERE`

    The environment is now created, and you should see that your terminal is in a new Python sub terminal.
    We have to activate this new environment with

    `source YOUR_ENV_NAME_HERE/bin/activate`
    
     

- [x] Train the model using the 'Complete Poems of Emily Dickinson'

        I used [this](https://www.gutenberg.org/ebooks/12242) version of Emily Dickinson's complete poems and created a new txt file, with everything but the poems cut out.

        Check the size of your file--you want as much data as possible.

        The next set of instructions are as per the github instructions for training a model. 

            ```
            $ git clone https://github.com/ml5js/training-charRNN
            $ cd training-charRNN
            $ pip install -r requirements.txt
            $ python train.py --data_path /path/to/data/file.txt
            ```

         Depending on the size of your text file, you might like to set some [hyperparameters](https://github.com/ml5js/training-charRNN#hyperparameters). The size of your file will also impact the speed of the training -- my Dickinson and Eliot training took seconds, while Shakespeare took ~ 14 hours!

         


- [x] Generate predictions using the model
   
      NB: Using the ml5 library from localhost results in CORS errors. You might notice that if ou try to create a basic HTML template and then try to run your page, you will get an error:

      'insert error here'

      To avoid this, one solution is to run this project as a live server. I used **Live Server**, which is available as an extension with VS Code.

- [] Create a front end to allow users to enter text,  and then have the model supply the next line


## Inspiration 

[Selected Stories](https://cvalenzuela.github.io/Selected_Stories/)

[Nabil Hassein's generative DOOM](https://nabilhassein.github.io/generative-DOOM/)


## Resources and tutorials:

[Python virtualenv on ArchLinux](https://wiki.archlinux.org/title/Python/Virtual_environment)

[ML5.js Library](https://learn.ml5js.org/#/)

[Project Gutenberg](https://www.gutenberg.org/)

[Working with Lexical](https://github.com/facebook/lexical)

[CharNNN Library from ML5](https://learn.ml5js.org/#/reference/charrnn)

[Creating a VirtualEnv to run the Python needed to train a model](https://www.youtube.com/watch?v=nnhjvHYRsmM)

[Training a CharNNN using the model in ml5.js](https://github.com/ml5js/training-charRNN)

[Text Generation with LTSM and Spell](https://www.youtube.com/watch?v=xfuVcfwtEyw)