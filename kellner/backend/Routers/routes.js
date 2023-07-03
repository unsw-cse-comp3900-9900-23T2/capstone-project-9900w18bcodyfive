const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment')

/* const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemModel') */

const router = new express.Router()

const {
    createManager,
    readManager,
    createRestaurant,
    readRestaurant,
    readAllRestaurants 
    } = require('../Controllers/mainController.js')


// GET ROUTES :

// List of all restaurants
router.get('/api/getRestaurant', readAllRestaurants)

// POST ROUTES :

// New Registration Route - POST
router.post('/api/register', createManager)

// Login route
router.post('/api/login', readManager)

// New Restaurant route
router.post('/api/newRestaurant', createRestaurant)

// New category, etc. - later


/*
router.post('/api/register', async(req, res) => {
    const newManager = new Manager(req.body) // Request body should follow the schema
    try {
        await newManager.save()
        if (!newManager){
            res.status(400).send(message) // Message from the backend
        }
        res.status(200).send({
            token: newManager._id.valueOf()
        }) // Send the new manager back to the front-end
    } catch (e) {
        res.status(400).send({
            errorMessage: e.message
        })
    }

})



// Login Route
router.post('/api/login', async(req,res) => {
    //console.log(req.body)
    try{
        const user = await Manager.findOne({email: req.body.email})
        if(user.password===req.body.password){
            res.status(200).send({
                manager: user.userName,
                managerToken: user._id.valueOf()
            })
        } else {
        res.status(401).send({
            errorMessage: "Incorrect username or password"
        })
        }
    }catch(e){
        res.status(400).send({
            errorMessage: e.message
        })
    }
})



//Adding New Restaurant
router.post('/api/newRestaurant', async(req, res) => {
    const newRestaurant = new Restaurant(req.body)
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

})


// Route to get the List of Restaurants
router.get('/api/getRestaurants', async(req,res)=>{
    const restaurant = await Restaurant.find({ managerToken: req.header('Authorization')})
    if (!restaurant){
        return res.status(404).json({errorMessage : 'No restaurants exists!'})
    }else {
        res.status(200).send({
        restaurant
    })
    }

})

// Route to delete a particular restaurant
router.delete('/api/deleteRestaurant/:id', async(req,res)=>{
    const restaurantId = req.params.id.slice(1);
    const objId = new mongoose.Types.ObjectId(restaurantId);
    const restaurant = await Restaurant.find({ _id: objId});
    if (!restaurant){
        return res.status(404).send({errorMessage : 'No restaurants exists!'})
    } else {
        await Restaurant.deleteOne({ _id: objId})
        res.status(200).send({
            message: "Restaurant deleted"
        })
    }
})


// route to add categories
router.post('/api/newCategory', async(req, res) => {
    const newCategory = new Category(req.body)

    try {
        await newCategory.save()
        if (!newCategory){
            res.status(400).send(message)
        }
        res.status(200).send(newCategory)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Route to get the List of Categories
router.get('/api/getCategories/:resId', async(req,res)=>{
    const rId = req.params.resId.slice(1)
    const categories = await Category.find({ restaurantID: rId})
    if (!categories){
        return res.status(404).json({errorMessage : 'No restaurants exists!'})
    }else {
        res.status(200).send({
        categories
    })
    }
})

router.post('/api/newItem', async(req, res) => {
    const newItem = new Item(req.body)

    try {
        await newItem.save()
        if (!newItem){
            res.status(400).send(message)
        }
        res.status(201).send(newItem)
    } catch (e) {
        res.status(400).send(e)
    }
}) */

module.exports = router;