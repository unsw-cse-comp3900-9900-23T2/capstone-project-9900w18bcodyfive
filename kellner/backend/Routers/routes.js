const express = require('express');
const limiter = require('../services/ratelimiting');

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
