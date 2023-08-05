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
The kellner folder has five sub folders
* backend - backend source code
* manager-ui - source code for manager user interface
* user-ui - source code for customer user interface
* kitchen-ui - source code for kitchen staff user interface
* waiter-ui - source code for waiter user interface  

The images folder is provided for your convenience to use the images while testing the system instead of downloading from external source. For example when you want add a restaurant you will need to upload a picture to our app and in that case you can use the images provided inside these folders. This folder is structured in to 3 different sub folders.

* categories - contains images related to categories
* food - conatins images of food items
* restaurant - contains images of restaurants


## Section 6: Steps to follow to install Nodejs and npm
This section describes how to install the required dependencies and run our system in virtual machine (VMWare Work station - with Lubuntu 20.04.1 LTS).

Note: Please follow the steps in the exact same order

### step 1. Installing Curl
Enter the below two commands in the terminal one by one to install the curl.  

`sudo apt update`  
`sudo apt install curl` 

### step 2. Installing nvm (node version manager)
You need to install node version manager (nvm). Because we need nvm to install our desired version of node. The recommended node version for this system is 16.14.2. Enter the below command in the terminal to to install nvm.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`  

### step 3: Activating the nvm
You need to activate the nvm before using it, for that enter the following command in the terminal  

`source ~/.bashrc`

### step 4: Installing Nodejs and npm
You can install the Nodejs 16.14.2 simply by running the following command nvm will by default install npm along with the Nodejs.

`nvm install v16.14.2`  

You can verify the installation of Node by typing the command "node -v" in the terminal which will return the installed version of nodejs and as well as you can use the command "npm -v" to verify the npm installation. If Incase the npm is not installed please do install it using sudo apt install command and the preferred version of npm is 8.5.0

### step 5: Installing dependencies
In this step we will look how to install dependencies for our backend and frontend apps. We have already discussed the folder structure in the 'section 5' please refer to that section in case you need any clarification about navigating to a certain path. But for easier reference to navigate the folder organization is represented in simple manner below  
* /Kellner
    - /backend  
    - /manager-ui
    - /user-ui
    - /kitchen-ui
    - /waiter -ui

(i) navigate to the folder path `kellner/backend`. After reaching there run the below command in the terminal

`npm install`  

This will install all the required dependencies for backend.  

(ii) Once the installation for backend is completed navigate to the folder `kellner/manager-ui` and run  

`npm install`  

This will install dependencies for manager-ui and wait till installation is complete.  

(iii) Once the installation for manager-ui is completed naviagte to `kellner/user-ui` and run the same command  

`npm install`

(iv) Once the installation for user-ui is completed naviagte to `kellner/kitchen-ui` and run the same command  

`npm install`

(v) Once the installation for kitchen-ui is completed naviagte to `kellner/waiter-ui` and run the same command  

`npm install`


### step 6: Running the Backend
Navigate to the folder `kellner/backend` and run the following command

`npm start`  

This will start the backend in the port 5000.  
#### Note: Please note that the backend should should not be turned off till the testing of all the frontend interfaces is done.

### step7: Running the manager-ui
Open a new terminal, navigate to the folder `kellner/manager-ui` and run  

`npm start`  

This will start the manager-ui(react app) in the port 3000 on a tab in browser. With that all the functionalities related to the manager can be tested. Once the testing of those functionalities is completed close the tab in the browser and come to the terminal where the manager-ui is running and stop the app by pressing "ctrl + c" (please note that only stop the manager-ui not the backend). Stopping the manager-ui once testing completed will help save some RAM in the virtual machine environment

### step8: Running the user-ui(customer), kitchen-ui(kitchen-staff) and waiter-ui  
The remaining three entities user-ui, kitchen-ui and waiter-ui needs to be run simultaneously because in order to test some of our project functionalities it is required that these 3 systems have realtime communication with one another.

(i) Make sure that the backend is till running. Open a new terminal navigate to the location `kellner/user-ui` and run the following command  

`npm start`

This will start the user-ui in port 3000 and a tab will automatically be opened in the browser hosting the user-ui

(ii) Open a new terminal navigate to the path `kellner/kitchen-ui` and run the following command  

`npm start`  

#### Note: This will promt you with a question saying that there is already an app running in port 3000 (because we already started user-ui and is running) so would you like to start this app in a diffrent port (yes | no)?  for this question please press y then the system will open the app for kitchen-ui in port 3001

(ii) Open a new terminal navigate to the path `kellner/waiter-ui` and run the following command  

`npm start`  

#### Note: Similar to when starting kitcken-ui again This will promt you with a question saying that there is already an app running in port 3000 ,so would you like to start this app in a diffrent port (yes | no)?  for this question please press y then the system will open the app for waiter-ui in port 3002

Now all the three required entities (user-ui, kitchen-ui and waiter-ui) were successfully up and running and now the functionalities of those can be tested.

## Section 7: Additional Information
This README.md file is focussed towards installing and running of the system. The interface of the system is self explanatory but in case you need any guidance for navigating the interface of the system plase do refer to our report. Which conatains the clear user manual of how to interact with user interface components and any other details you need to understand our system in more depth.












