// Naming the methods of the controller after CRUD.

const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemSchema')
require('dotenv').config({ path: './config/.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require('../services/cloudinary')

/* ROUTES */

/*================================================================================================================================== 
    REGISTER
  ================================================================================================================================== */

const registerManager = async(req, res) => {

    try{

        const existingManager = await Manager.findOne({ mEmail: req.body.mEmail }).exec();
        if (existingManager) {
          return res.status(400).send('Email already exists');
        }
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
        const registerResponse = (({mId, mName, mEmail}) => ({mId, mName, mEmail}))(savedManager);
        registerResponse.token = token;
        res.status(200).send(registerResponse)


    }catch(error){
      console.log(error)
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
        //console.log(manager)
        const passwordMatch = await bcrypt.compare(req.body.mPassword, manager.mPassword);
  
        if (passwordMatch) {
          const token = jwt.sign({ mEmail: manager.mEmail }, process.env.ACCESS_TOKEN_SECRET);
          const loginResponse = (({mId, mName, mEmail}) => ({mId, mName, mEmail}))(manager);
          loginResponse.token = token;
          res.status(200).send(loginResponse)
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

const createRestaurant = async (req, res) => {
  try {
    const restCount = await Restaurant.countDocuments({});
    const rId = `Res${restCount + 1}`;
    const tableIds = {};
    const tableCount = req.body.rTableCount;
    for (let i = 0; i < tableCount; i++) {
      const rTableId = `Table ${i + 1}`;
      tableIds[i] = rTableId;
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);

    const manager = await Manager.findOne({ mEmail: decodedToken.mEmail }).exec();
    if (!manager) {
      return res.status(404).send('Manager Not Found');
    }

    const imageUrl = req.body.rImage;
    const rImage = await uploadImageToCloudinary(imageUrl);

    const newRestaurant = new Restaurant({
      resId: rId,
      rName: req.body.rName,
      rLocation: req.body.rLocation,
      rDescription: req.body.rDescription,
      rContact: req.body.rContact,
      rTableCount: req.body.rTableCount,
      rTableIds: tableIds,
      rImage : rImage,
      managerId: manager.mId,
      rImage: rImage
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
          restaurant: restaurants
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

    const imageUrl = req.body.rImage;
    const rImage = await uploadImageToCloudinary(imageUrl);
    req.body.rImage = rImage;

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { resId: req.body.resId },
      req.body,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).send('Restaurant not found');
    }


    if (req.body.rTableCount !== updatedRestaurant.rTableCount) {
    const tableIds = {};
    const tableCount = req.body.rTableCount;
    for (let i = 0; i < tableCount; i++) {
      const rTableId = `Table ${i + 1}`;
      tableIds[i]= (rTableId);
    }

      updatedRestaurant.rTableIds = tableIds;
      await updatedRestaurant.save();
    }

    res.status(200).send({successMessage: 'Restaurant Updated'});
    console.log(updatedRestaurant)

  }catch(e){
    res.status(400).send({
      errorMessage:e.message
    });
  }

}

/*================================================================================================================================== 
    CREATE CATEGORIES
  ================================================================================================================================== */
  const addCategory = async(req,res) => {

    try{

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const decodedToken = jwt.decode(token);

      const manager = await Manager.findOne({ mEmail: decodedToken.mEmail }).exec();
      if (!manager) {
        return res.status(404).send('Manager Not Found');
      }

      const resId = req.params.rId;
      const imageUrl = req.body.cImage;
      const cImage = await uploadImageToCloudinary(imageUrl);

      const categoryCount = await Category.countDocuments({ rId: resId });
      const cId = `Cat${categoryCount + 1}`;

      const newCategory = new Category({
        rId: resId,
        cId: cId,
        cName: req.body.cName,
        cDescription: req.body.cDescription,
        cType: req.body.cType,
        cImage: cImage

      });

      const savedCategory = await newCategory.save();
      if (!savedCategory) {
        return res.status(400).send('Failed to Add Category');
      }

      res.status(200).send('Added Cat');
    }catch(e){
      res.status(400).send({
        errorMessage:e.message
      });
    }
  }

/*================================================================================================================================== 
    FETCH CATEGORIES
  ================================================================================================================================== */
  const getCategory = async (req, res) => {

    try{

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
        const categories = await Category.find({resId: restaurants.rId}).exec();
        
        res.status(200).send({
          category: categories
        });
      });

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
    editRestaurant,
    addCategory,
    getCategory
}

