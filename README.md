## Section 1: Team Information

### Name : 9900W18BCodyFive
### Members:
Sevugan Chetty Kathiresan - z5375045 - Scrum master / Developer  
Bhargav Sai Manne - z5290211 -  Developer  
Vigneshwar R.K - z5252129 - Developer

## Section 2: Topic
Our Team has worked on Wait management system called KELLNER. The system comprises of four entities Restaurant Manager, Customer, Kitchen staff, and waiters. So the code is structred in a way that four different user interfaces each one corresponding to one entity and a common backend.

## Section 3: Platform information
Our team prefer to run our system in the virtual machine platform VMWAre Workstation with Lubuntu 20.04.1 LTS and do make sure that the virtual machine has internet access. (proper internet connection is mandatory for the running of the system)

## Section 4: Tech Stack used
We Used MERN stack for our system
M - Mongo DB
E - Express
R - React js
N - Node js
So in the source code submission zip you will find four react apps (each corresponding to one manager, customer, kitchen staff, waiters) and one backend Nodejs file.

For state management - Redux toolkit, react-redux and redux persist were utilized


## Section 5: Folder Structure:
The submitted file can be unizipped using "unzip" command followed by the file name or you can also use Ark utility Tool which comes pre installed in the Lubuntu 20.04.1  
The submitted zip file consist of two folders (kellner and images) and one README.md file.

The entire source code is located inside the kellner folder.
The kellner folder has four sub folders
* backend - backend source code
* manager-ui - source code for manager user interface
* user-ui - source code for customer user interface
* kitchen-ui - source code for kitchen staff user interface
* waiter-ui - source code for waiter user interface  

The images folder is provided for your convenience to use the images while testing the system instead of downloading from external source. For example when you want add a restaurant you will need to upload a picture to our system and in that case you can use the images provided inside these folders. This folder is structured in to 3 different sub folders.

* categories - contains images related to categories
* food - conatins images of food items
* restaurant - contains images of restaurants


## Section 6: Steps to follow to run the system
This section describes how to install the required dependencies and run our system in virtual machine (VMWare Work station - with Lubuntu 20.04.1 LTS).

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

You can verify the installation of Node by typing the command "node -v" in the terminal which will return the installed version of nodejs and as well as you can use the command "npm -v" to verify the npm installation. If Incase the npm is not installed please do install it using sudo apt install command and the preferred version of npm is 8.5.0

### step 5: Installing backend dependencies
Now navigate to the folder "kellner/backend" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the backend by typing  

`npm start`  

#### Note: The backend will start and run in port 5000. You need to run the backend first even before running any of the front end interfaces

### step 6: Installing dependencies for manager
Open a new Terminal, navigate to the folder "kellner/manager-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the manager-ui by typing  

`npm start`  

#### Note: The manager-ui will start and run in the port 3000 in a tab in the browser. You can test the functionalities of the manager interface(no need to close the tab after testing). It is recommended that you finish the testing of the manager first, even before start running the remaining entities (user/customer, kitcken staff, waiter) because these 3 entities fetch data from what you have configured as a manager and do note that for testing the remaining 3 entities (customer(user), kitchen staff and waiter) you need to run them parallely(simultaneously) because they all interact with each other in real time. the steps to run them are provided below.

### step 7: Installing dependencies for customer(user)
Open a new Terminal, navigate to the folder "kellner/user-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the user-ui by typing  

`npm start`  

#### Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3001

### step 8: Installing dependencies for kitchen staff
Open a new Terminal, navigate to the folder "kellner/kitchen-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the kitchen-ui by typing  

`npm start`  

#### Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3002

### step 9: Installing dependencies for  waiters
Open a new Terminal, navigate to the folder "kellner/waiter-ui" in the terminal and run the below command.

`npm install`  

This will install all the required dependencies once installation complete you can start the waiter-ui by typing  

`npm start`  

##### Note: While starting this will as you ask you that there is already an app running in port 3000 So would you like to start the app in different port? (yes | No) press y. this will start the app in a different port 3003


### Important Note: Please do follow the instructions in the same order as mentioned in the above steps

## Section 7: Additional Information
This README.md file is focussed towards installing and running of the system. The interface of the system is self explanatory but in case you need any guidance for navigating the interface of the system plase do refer to our report. Which conatains the clear user manual of how to interact with user interface components and any other details you need to understand our system in more depth.












