// Naming the methods of the controller after CRUD.

const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemSchema')
require('dotenv').config({ path: './config/.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

/* ROUTES */

/*================================================================================================================================== 
    REGISTER
  ================================================================================================================================== */

const registerManager = async(req, res) => {
    try{
        const managerCount = await Manager.countDocuments({});
        const mId = `Mgr${managerCount + 1}`;
        const hashedPassword = await bcrypt.hash(req.body.mPassword, 10);
        const newManager = new Manager({
            mId : mId,
            mName : req.body.mName,
            mEmail : req.body.mEmail,
            mContact : req.body.mContact,
            mPassword : hashedPassword
        })

        const savedManager = await newManager.save()
        if (!savedManager){
            res.status(400).send('Failed to Register Manager') // Message from the backend
        }
        const token = jwt.sign({ mEmail:savedManager.mEmail }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({token})


    }catch(error){
        res.status(400).send({
            errorMessage: error.message
        })
    }
} 

/*================================================================================================================================== 
    LOGIN
  ================================================================================================================================== */
 
  // ...
  
  const loginManager = async (req, res) => {
    try {
      const manager = await Manager.findOne({ mEmail: req.body.mEmail });
      if (manager) {
        // Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(req.body.mPassword, manager.mPassword);
  
        if (passwordMatch) {
          // Generate a JWT token with the manager's email as the payload
          const token = jwt.sign({ mEmail: manager.mEmail }, process.env.ACCESS_TOKEN_SECRET);
  
          res.status(200).send({token});
        } else {
          res.status(401).send({
            errorMessage: "Incorrect username or password, please try again.",
          });
        }
      } else {
        res.status(401).send({
          errorMessage: "Incorrect username or password, please try again.",
        });
      }
    } catch (error) {
      res.status(400).send({
        errorMessage: error.message,
      });
    }
  };
  

/*================================================================================================================================== 
    CREATE NEW RESTAURANT
  ================================================================================================================================== */

const createRestaurant = async(req, res) => {
    const newRestaurant = new Restaurant(req.body)
    tempId = newRestaurant._id.valueOf()
    newRestaurant.restaurantID = tempId.substr(1, 4)
    //4 digits 
    console.log(newRestaurant)
    try {
        await newRestaurant.save()
        if (!newRestaurant){
            res.status(400).send(message)
        }
        res.status(200).send(newRestaurant)
    } catch (e) {
        res.status(400).send({
            errorMessage: e.message
        })
    }
}

/*================================================================================================================================== 
    FETCH RESTAURANTS
  ================================================================================================================================== */

const getRestaurant = async(req, res) => {
    try {
        const restaurant = await Restaurant.find({ managerToken: req.header('Authorization')})
        if (!restaurant){
            return res.status(404).json({error : 'No such restaurant exists!'})
        } res.status(200).send({
            restaurant
        })
    } catch (e) {
        res.status(400).send({
            errorMessage: e.message
        })
    }
}

const editRestaurant = async(req,res)=>{

}


module.exports = {
    registerManager,
    loginManager,
    createRestaurant,
    getRestaurant 
}

