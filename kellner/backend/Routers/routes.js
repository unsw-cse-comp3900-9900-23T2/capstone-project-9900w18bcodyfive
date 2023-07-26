const express = require('express');
const limiter = require('../services/ratelimiting');

const router = new express.Router()
const documentation = require('../services/swagger-documentation')

const {
    registerManager,
    loginManager,
    createRestaurant,
    getRestaurant,
    editRestaurant,
    addCategory,
    getCategory,
    editCategory,
    deleteCategory,
    addItem,
    getItem,
    editItem,
    deleteItem,
    } = require('../Controllers/mainController.js')

const {
    getAllRestaurants,
    getAllCategories,
    getTenItems,
    getRandomItems,
    getUserDashboard,
    placeOrder,
    getOrderStatus,
    userAddNote,
    sendAssitanceRequest,
    sendCheckOutRequest
    } = require('../Controllers/userController.js')

const {
  getKitchenOrders,
  deleteKitchenOrder,

  
} = require('../Controllers/kitchenStaffController.js')

  
/*================================================================================================================================== 
    MANAGER AND RESTAURANT CONFIG
  ================================================================================================================================== */   

// Register New Manager
router.post('/api/register',limiter, registerManager)  //POST 

// Login for Manager
router.post('/api/login',limiter, loginManager) //POST

// Create Restuarant
router.post('/api/createRestaurant', createRestaurant) //POST

// Return the Restaurants
router.get('/api/getRestaurant', getRestaurant) //GET

//Edit the Restaurant Details
router.put('/api/editRestaurant',editRestaurant ) //PUT

//Add Category
router.post('/api/addCategory/:rId', addCategory) //POST

//Return Categories
router.get('/api/getCategory/:rId', getCategory)  //GET

// Edit Categories
router.put('/api/editCategory/:rId/:cId', editCategory) //PUT

//Delete Categories 
router.delete('/api/deleteCategory/:rId/:cId', deleteCategory) //DELETE

// Add Food Items under a category
router.post('/api/addItems/:rId/:cId', addItem) //POST

// Return Food Items under a category
router.get('/api/getItems/:rId/:cId', getItem) //GET

// Edit Food Items under a category
router.put('/api/editItems/:rId/:cId/:iId', editItem) //PUT

// Delete Food Items under a category
router.delete('/api/deleteItems/:rId/:cId/:iId', deleteItem) //DELETE

/*================================================================================================================================== 
    USER Routes
  ================================================================================================================================== */  

//Get the list of restaurants
router.get('/api/getAllRestaurants', getAllRestaurants) //GET

// Get all categories
router.get('/api/getAllCategories/:rId', getAllCategories) //GET

// Get first 10 items, not using category
router.get('/api/getTenItems/:rId', getTenItems) //GET

// Get 10 RANDOM items - needs to be tested
router.get('/api/getRandomItems/:rId', getRandomItems) //GET

// Get all categories and 10 items
router.get('/api/getUserDashboard/:rId', getUserDashboard) //GET

router.post('/api/placeOrder', placeOrder) //POST

router.get('/api/getOrderStatus/:orderNo', getOrderStatus) //GET

router.put('/api/userAddNote/:orderNo', userAddNote) //PUT

router.post('/api/sendAssistanceRequest', sendAssitanceRequest) //POST

router.post('/api/sendCheckOutRequest', sendCheckOutRequest) //POST

/*================================================================================================================================== 
   KITCHEN STAFF Routes
  ================================================================================================================================== */ 

  router.get('/api/getKitchenOrders/:rId', getKitchenOrders) //GET

router.delete('/api/deleteKitchenOrder/:rId/:orderNo', deleteKitchenOrder); //DELETE

module.exports = router;
