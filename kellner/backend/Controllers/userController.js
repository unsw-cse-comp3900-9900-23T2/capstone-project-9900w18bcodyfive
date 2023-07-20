// This includes the routes for the user.
// Make the schema as well.


// this customer can only be at one restaurant, and the restaurant's resID is passed as a parameter

const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Items = require('../Schemas/itemSchema')
const inProgress = require('../Schemas/inProgressSchema')
const readyToServe = require('../Schemas/readyToServeSchema')
const finishedOrders = require('../Schemas/finishedOrdersSchema')
require('dotenv').config({ path: './config/.env' });

/* ROUTES */

/*================================================================================================================================== 
    FETCH ALL RESTAURANTS
================================================================================================================================== */
const getAllRestaurants = async(req, res) => {
    try{
        const restaurants = await Restaurant.find().exec();
        res.status(200).send({
            restaurants: restaurants
        });
    } catch(e){
        res.status(400).send({
            errorMessage: e.message
        });
    }
}

/*================================================================================================================================== 
    FETCH CATEGORIES
================================================================================================================================== */
// Pass in a restaurant ID as a parameter, and watch the magic happen.
const getAllCategories = async (req, res) => {
    try{

        const resId = req.params.rId    
        const categories = await Category.find({rId: resId}).exec();
        res.status(200).send({
            category: categories
        });

    }catch(e){
        res.status(400).send({
        errorMessage:e.message
        });
    }
}
/*================================================================================================================================== 
FETCH ITEMS
================================================================================================================================== */

// Fetches upto 10 items. resID requiread as parameter.
const getTenItems = async (req, res) => {
    try {
        const resId = req.params.rId    
        const items = await Items.find({ rId: resId }).limit(10);
        res.status(200).send({
            item: items
        });

    } catch(e){
        res.status(400).send({
        errorMessage:e.message
        });
    }
}

// Fetching upto 10 items is easy. I'm going to make it fetch RANDOMLY. - RKV
// Works!! Checked with itemCount < 3 on Res2 with 4 items.
const getRandomItems = async (req, res) => {
    try {
        const resId = req.params.rId
        const itemCount = await Items.countDocuments({});
        if (itemCount > 10){
            const resFilter = { rId : { $eq: resId }};
            const agg = Items.aggregate([{ $match: resFilter }]).sample(10);
            const items = await agg.exec();
            //items received, but only after response sent - even after making this agg.exec() change
            //console.log("Random item selection worked!!");
            //console.log("Items: ", items)
            res.status(200).send({
                item: items
            });  
        }
        else{
            const items = await Items.find({ rId: resId }).limit(10).exec();
            res.status(200).send({
                item: items
            });
        }
    } catch(e){
        console.log("Random item selection failed!!");      
        res.status(400).send({
        errorMessage:e.message
        });
    }
}

/*================================================================================================================================== 
FETCH USER DASHBOARD
================================================================================================================================== */
// If getRandomItems works, use that, otherwise fallback to getItems
// Including debug for getRandomItems in case it causes problems with large number of items or something.
// Checked with 4 items, random selection of 3 occurs. Read "getRandomItems" coomments for notes.
const getUserDashboard = async (req, res) => {
    try{
        const resId = req.params.rId
        const categories = await Category.find({ rId: resId }).exec();
        const itemCount = await Items.countDocuments({});
        if (itemCount > 10){
            const resFilter = { rId : { $eq: resId }};
            const agg = Items.aggregate([{ $match: resFilter }]).sample(10);
            const items = await agg.exec();
            res.status(200).send({
                category: categories,
                item: items
            });  
        }
        else{
            const items = await Items.find({ rId: resId }).limit(10).exec();
            res.status(200).send({
                category: categories,
                item: items
            });
        }
    }catch(e){
        console.log("Random item selection failed!!");      
        res.status(400).send({
        errorMessage:e.message
        });
    }
}

/*================================================================================================================================== 
   USER PLACE ORDER
  ================================================================================================================================== */

  const placeOrder = async(req,res) =>{

    try{

        const orderNo = Math.floor(100 + Math.random() * 1000).toString();

        const newInProgress = new inProgress({
            rId: req.body.rId,
            tId: req.body.tId,
            orderNo: orderNo,
            itemsOrdered: req.body.itemsOrdered,
            totalPrice: req.body.totalPrice,
            note: req.body.note,
        });

        const savedInProgress = await newInProgress.save();
        if(!savedInProgress){
            res.status(400).send({successMessage: "Failed to Add Order"})
        }

        res.status(200).json({ orderNo: orderNo });

    }catch(error){
      console.log(error)
      res.status(400).send({
        errorMessage: error.message
      })
    }
  }

 /*================================================================================================================================== 
   GET ORDER STATUS
  ================================================================================================================================== */


  const getOrderStatus = async (req, res) => {
    try {
      const { orderNo } = req.params;
  
      // Check if the order number exists in the InProgress collection
      const inProgressOrder = await inProgress.findOne({ orderNo }).exec();
  
      // Check if the order number exists in the ReadytoServe collection
      const readyServeOrder = await readyToServe.findOne({ orderNo }).exec();
        
      if (inProgressOrder) {
        return res.status(200).send({ status: 'In Progress' });
      } else if (readyServeOrder) {
        return res.status(200).send({ status: 'Ready to Serve' });
      } else {
        return res.status(404).send({ status: 'Order not found' });
      }
    } catch (e) {
      res.status(400).send({ errorMessage: e.message });
    }
  };

  /*================================================================================================================================== 
   USER ADDING NOTE
  ================================================================================================================================== */


  const userAddNote = async (req, res) => {
    try {
      const { orderNo } = req.params;
      const { note } = req.body;
  
      // Check if the order number exists in the InProgress collection
      const inProgressOrder = await inProgress.findOne({ orderNo }).exec();
  
      if (!inProgressOrder) {
        return res.status(404).send({ errorMessage: 'Order not found' });
      }
  
      // Update the note field in the inProgressOrder
      inProgressOrder.note = note;
      const updatedOrder = await inProgressOrder.save();
  
      res.status(200).send({ successMessage: 'Note updated successfully', updatedOrder });
    } catch (e) {
      res.status(400).send({ errorMessage: e.message });
    }
  };


module.exports = {
    getAllRestaurants,
    getAllCategories,
    getTenItems,
    getRandomItems,
    getUserDashboard,
    placeOrder,
    getOrderStatus,
    userAddNote
}
