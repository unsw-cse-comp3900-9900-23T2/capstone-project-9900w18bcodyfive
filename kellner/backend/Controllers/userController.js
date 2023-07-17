// This includes the routes for the user.
// Make the schema as well.
require('dotenv').config({ path: './config/.env' });

// this customer can only be at one restaurant, and the restaurant's resID is passed as a parameter

const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Items = require('../Schemas/itemSchema')

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

module.exports = {
    getAllRestaurants,
    getAllCategories,
    getTenItems,
    getRandomItems,
    getUserDashboard,
}
