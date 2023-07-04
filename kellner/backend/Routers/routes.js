const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment')

/* const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemModel') */

const router = new express.Router()

const {
    registerManager,
    loginManager,
    createRestaurant,
    getRestaurant,
    editRestaurant
    } = require('../Controllers/mainController.js')

/*================================================================================================================================== 
    MANAGER AND RESTAURANT CONFIG
  ================================================================================================================================== */   

  // Register New Manager
router.post('/api/register', registerManager)  //POST 

// Login for Manager
router.post('/api/login', loginManager) //POST

// Create Restuarant
router.post('/api/createRestaurant', createRestaurant) //POST

// Return the Restaurants
router.get('/api/getRestaurant', getRestaurant) //GET

//Edit the Restaurant Details
router.put('/api/editRestaurant',editRestaurant ) //PUT

//Add Category
router.post('/api/addCatergory') //POST

//Return Categories
router.get('/api/getCategories/:rId')  //GET

// Edit Categories
router.put('/api/editCategories/:rId/:cId') //PUT

//Delete Categories 
router.delete('/api/deleteCategories/:rId/:cId') //DELETE

// Add Food Items under a category
router.post('/api/addItems/:rId/:cId') //POST

// Return Food Items under a category
router.get('/api/getItems/:rId/:cId') //GET

// Edit Food Items under a category
router.put('/api/editItems/:rId/:cId/:iId') //PUT

// Delete Food Items under a category
router.delete('/api/deleteItems/:rId/:cId/:iId') //DELETE

module.exports = router;