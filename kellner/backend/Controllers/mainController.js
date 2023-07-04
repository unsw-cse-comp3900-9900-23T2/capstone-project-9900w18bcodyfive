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
   
  const loginManager = async (req, res) => {
    try {
      const manager = await Manager.findOne({ mEmail: req.body.mEmail });
      if (manager) {
        const passwordMatch = await bcrypt.compare(req.body.mPassword, manager.mPassword);
  
        if (passwordMatch) {
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
function authToken(req,res,next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.status(400).send('Token is Null')

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,manager)=>{
    if (err) return res.status(400).send('error with verify')
    req.user = manager //this req.user means the token has a field called user
    console.log(manager)
    next();
  })
}

const createRestaurant = async (req, res) => {
  try {
    const restCount = await Restaurant.countDocuments({});
    const rId = `Res${restCount + 1}`;

    const tableIds = {};
    const tableCount = req.body.rTableCount;
    for (let i = 0; i < tableCount; i++) {
      const rTableId = `Table ${i + 1}`;
      tableIds[i]= (rTableId);
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);

    const manager = await Manager.findOne({ mEmail: decodedToken.mEmail }).exec();
    if (!manager) {
      return res.status(404).send('Manager Not Found');
    }
    //console.log(manager.mId)
    const newRestaurant = new Restaurant({
      resId: rId,
      rName: req.body.rName,
      rLocation: req.body.rLocation,
      rDescription: req.body.rDescription,
      rContact: req.body.rContact,
      rTableCount: req.body.rTableCount,
      rTableIds: tableIds,
      managerId: manager.mId,
    });

    const savedRestaurant = await newRestaurant.save();
    if (!savedRestaurant) {
      return res.status(400).send('Failed to Add Restaurant');
    }

    res.status(200).send(savedRestaurant);
  } catch (e) {
    res.status(400).send({
      errorMessage: e.message,
    });
  }
};

/*================================================================================================================================== 
    FETCH RESTAURANTS
  ================================================================================================================================== */

  const getRestaurant = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(400).send('Invalid token');
        }
        
        const managerEmail = decodedToken.mEmail;
        const manager = await Manager.findOne({ mEmail: managerEmail }).exec();
        
        if (!manager) {
          return res.status(404).send('Manager not found');
        }
        
        const restaurants = await Restaurant.find({ managerId: manager.mId }).exec();
        
        res.status(200).send({
          restaurants
        });
      });
    } catch (e) {
      res.status(400).send({
        errorMessage: e.message
      });
    }
  };

/*================================================================================================================================== 
    EDIT RESTAURANTS
  ================================================================================================================================== */
  
const editRestaurant = async(req,res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try{
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const manager = await Manager.findOne({ mEmail: decodedToken.mEmail });
    if (!manager) {
      return res.status(404).send('Manager not found');
    }

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { resId: req.body.resId },
      req.body,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).send('Restaurant not found');
    }

    res.status(200).send('Restaurant Updated');
    //console.log(updatedRestaurant)

  }catch(e){
    res.status(400).send({
      errorMessage:e.message
    });
  }



}


module.exports = {
    registerManager,
    loginManager,
    createRestaurant,
    getRestaurant,
    editRestaurant
}

