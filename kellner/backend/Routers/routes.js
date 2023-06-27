const express = require('express');
const router = new express.Router()
const mongoose = require('mongoose');
const moment = require('moment')

const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemModel')


//New Registration Route
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
        console.log(user)
        console.log("User ID:", user._id.valueOf())
        if(user.password===req.body.password){
            console.log("User body:", user.body)
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

    try {
        await newRestaurant.save()
        if (!newRestaurant){
            res.status(400).send(message)
        }
        res.status(200).send(newRestaurant)
    } catch (e) {
        res.status(400).send(e)
    }

})


// Routes to get the List of Restaurants
router.get('/api/getRestaurant', async(req,res)=>{
    const restaurant = await Restaurant.find({ managerToken: req.body.managerToken})
    if (!restaurant){
        return res.status(404).json({error : 'No such restaurant exists!'})
    }res.status(200).send({
        restaurant
    })

})

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
})

module.exports = router;