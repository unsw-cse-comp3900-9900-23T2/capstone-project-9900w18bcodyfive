## Section 1: Team Information

### Name : 9900W18BCodyFive
### Members:
Sevugan Chetty Kathiresan - z5375045 - Scrum master / Developer  
Bhargav Sai Manne - z5290211 -  Developer  
Vigneshwar R.K - z5252129 - Developer

## Section 2: Topic
Our Team has worked on Wait management system called KELLNER. The system comprises of four entities Restaurant Manager, Customer, Kitchen staff, and waiters. So the code is structred in a way that four different user interfaces each one corresponding to one entity and a common backend.

## Section 3: Platform information
Our team prefer to run our system in the virtual machine platform VMWAre Workstation with Lubuntu 20.4.1 LTS and do make sure that the virtual machine has internet access. (proper internet connection is mandatory for the running of the system)

## Section 4: Tech Stack used
We Used MERN stack for our system
M - Mongo DB
E - Express
R - React js
N - Node js
So in the source code submission zip you will find four react apps (each corresponding to one manager, customer, kitchen staff, waiters) and one backend Nodejs file.

For state management - Redux toolkit, react-redux and redux persist were utilized


## Section 5: Folder Structure:
The submitted zip file consist of one folder (kellner) and one README.md file.

The entire source code is located inside the kellner folder.
The kellner folder has four sub folders
* backend - backend source code
* manager-ui - source code for manager user interface
* user-ui - source code for customer user interface
* kitchen-ui - source code for kitchen staff user interface
* waiter-ui - source code for waiter user interface


## Section 6: Steps to follow to run the system
This section describes how to install the required dependencies and run our system in virtual machine (VMWare Work station - with Lubuntu 20.4.1 LTS).

Note: Please follow the steps in the exact same order

### step 1. Installing Curl
Enter the below two commands in the terminal one by one to install the curl.  

`sudo apt update`  
`sudo apt install curl` 

### step 2. Installing nvm (node version manager)
You need to install node version manager to install the desired version of node. The recommended version for this system is 16.14.2. Enter the below command in the terminal to to install nvm

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`  

### step 3: Activating the nvm
You need to activate the nvm before using it, for that enter the following command in the terminal  

`source ~/.bashrc`

### step 4: Installing Nodejs and npm
You can install the Nodejs 16.14.2 simply by running the following command nvm will by default install npm along with the Nodejs.

`nvm install v16.14.2`  

You can verify the installation of Node by typing the command "node -v" in the terminal which will return the installed version of nodejs and as well as you can use the command "npm -v" to verify the npm installation.  

### step 5: Installing backend dependencies
Now navigate to the folder "kellner/backend" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the backend by typing  

`npm start`  

Note: The backend will start and run in port 5000

### step 6: Installing dependencies for manager
Open a new Terminal, navigate to the folder "kellner/manager-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the manager-ui by typing  

`npm start`  

Note: The manager-ui will start and run in the port 3000

### step 7: Installing dependencies for customer
Open a new Terminal, navigate to the folder "kellner/user-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the user-ui by typing  

`npm start`  

Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3001

### step 8: Installing dependencies for kitchen staff
Open a new Terminal, navigate to the folder "kellner/kitchen-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the kitchen-ui by typing  

`npm start`  

Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3002

### step 9: Installing dependencies for  waiters
Open a new Terminal, navigate to the folder "kellner/waiter-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the waiter-ui by typing  

`npm start`  

Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3003


### Important Note: Please do follow the instructions in the same order as mentioned in the above steps

## Section 7: Additional Information
This README.md file is focussed towards installing and running of the system. The interface of the system is self explanatory but in case you need any guidance for navigating the interface of the system plase do refer to our report












