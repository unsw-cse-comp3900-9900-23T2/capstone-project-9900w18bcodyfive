const express = require('express');
const limiter = require('../services/ratelimiting');

const router = new express.Router()

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
    getAllCategories,
    getTenItems,
    getRandomItems,
    getUserDashboard
    } = require('../Controllers/userController.js')

/*================================================================================================================================== 
    MANAGER AND RESTAURANT CONFIG
  ================================================================================================================================== */   

  // Register New Manager

/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
 *       type: object
 *       properties:
 *         mId:
 *           type: string
 *         mName:
 *           type: string
 *         mEmail:
 *           type: string
 *         mPassword:
 *           type: string
 *         mContact:
 *           type: string
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         mName:
 *           type: string
 *         mEmail:
 *           type: string
 *         mPassword:
 *           type: string
 *         mContact:
 *           type: string
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         mId:
 *           type: string
 *         mName:
 *           type: string
 *         mEmail:
 *           type: string
 *         token:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: string
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a manager
 *     tags:
 *       - Manager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Failed to register manager
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         cId:
 *           type: string
 *         rId:
 *           type: string
 *         cName:
 *           type: string
 *         cDescription:
 *           type: string
 *         cType:
 *           type: string
 *         cImage:
 *           type: string
 *     GetCategoryRequest:
 *       type: object
 *       properties:
 *         resId:
 *           type: string
 *     GetCategoryResponse:
 *       type: object
 *       properties:
 *         cId:
 *           type: string
 *         rId:
 *           type: string
 *         cName:
 *           type: string
 *         cDescription:
 *           type: string
 *         cType:
 *           type: string
 *         cImage:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: string
 */  


/**
 * @swagger
 * /api/getAllCategories/{rId}:
 *    get:
 *     summary: Get all categories
 *     parameters:
 *       - name: rId
 *         in: path
 *         required: true
 *         schema: 
 *           type: string
 *         description: Restaurant ID
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Successfully fetched category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoryResponse'
 *       400:
 *         description: Failed to fetch category details. Did you pass in a valid rId?
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
*/

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
    USER SETUP
  ================================================================================================================================== */  

// Get all categories
router.get('/api/getAllCategories/:rId', getAllCategories)

// Get first 10 items, not using category
router.get('/api/getTenItems/:rId', getTenItems)

// Get 10 RANDOM items - needs to be tested
router.get('/api/getRandomItems/:rId', getRandomItems)

// Get all categories and 10 items
router.get('/api/getUserDashboard/:rId', getUserDashboard)

module.exports = router;
