# Snakes And Ladders
## Steps to run the project:

### Getting your Credentials :
* Go to your firebase console.
* In project settings, go to ```General``` tab and scroll below to find your firebase configs code snippet.
* Paste this snippet in firebase object in your ```environment.ts``` file, which is present at ```src/environments```.
* Now again go to project settings in firebase console, now head to ```sevice accounts``` tab and click on ```Generate your key``` button.
* Move this key/.json file in ```Node-server``` directory.
* In ```Node-server``` directory, open ```app.js``` and on line 10, require that .json file and save this.

### For setting Angular and ionic (frontend) :
* Install Node.js for interacting with the Ionic ecosystem. [Download the LTS version here.](https://nodejs.org/en/)
* If on Windows, open Powershell and run ```npm install @ionic/cli native-run cordova-res```. This will install ionic within the scope (not globally. If you wish to do so, add ```-g``` flag in the above command and run it as ```sudo``` in Linux and in Windows use Amdin mode in Powerrshell).
* Clone the project in desired directory by running ```git clone https://github.com/SANSKRUTCORP/SnakesAndLadders.git```.
* Change directory to Project Directory using ```cd SnakesAndLadders```.
* Now run ```npm i```.

### For Node.js (backend) :
* In ```Node-server``` directory, run the command : ```npm install```. Following command will install all the dependencies from ```package.json``` file.

### Running the server : 
* Now at the parent directory, run the command : ```npm run server``` (the following command will run ```ionic serve``` and ```nodemon server.js``` concurrently).
