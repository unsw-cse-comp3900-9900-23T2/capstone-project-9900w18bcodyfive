// Naming the methods of the controller after CRUD.

const Manager = require('../Schemas/managerSchema')
const Restaurant = require('../Schemas/restaurantSchema')
const Category = require('../Schemas/categorySchema')
const Item = require('../Schemas/itemSchema')

/* Register a new manager */

const createManager = async(req, res) => {
    const newManager = new Manager(req.body) // Request body should follow the schema
    try {
        await newManager.save()
        if (!newManager){
            res.status(400).send(message) // Message from the backend
        } 
        res.status(201).send({
            token: newManager._id.valueOf()
        }) // Send only the new manager's ID back to the front-end
    } catch (e) {
        res.status(400).send(e)
    }
} // 201 - Status code for created

/* Login an existing manager */

const readManager = async(req, res) => {
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
            errorMessage: "Incorrect username or password, please try again."
        })
        }
    }catch(e){
        res.status(400).send({
            errorMessage: e.message
        })
    }
}

/* Create a new restaurant. */
const createRestaurant = async(req, res) => {
    const newRestaurant = new Restaurant(req.body)
    tempId = newRestaurant._id.valueOf()
    newRestaurant.restaurantID = tempId.substr(1, 4)
    //4 digits 
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
}

/* Get a list of all restaurants of this manager. */

const readAllRestaurants = async(req, res) => {
    try {
        const restaurant = await Restaurant.find({ managerToken: req.header('Authorization')})
        if (!restaurant){
            return res.status(404).json({error : 'No such restaurant exists!'})
        } res.status(200).send({
            restaurant
        })
    } catch (e) {
        res.status(400).send({
            errorMessage: e.message
        })
    }
}

/* Get one restaurant by ID. */

const readRestaurant = async(req, res) => {
    try {
        const restaurant = await Restaurant.find({ id: req.body.id, managerToken: req.header('Authorization')})
        if (!restaurant){
            return res.status(404).json({error : 'No such restaurant exists!'})
        } res.status(200).send({
            restaurant
        })
    } catch (e) {
        res.status(400).send({
            errorMessage: e.message
        })
    }
}


/* Create a category under a restaurant. */
/*
const createCategory = async(req, res) => {
    try {
        const newCategory = 
    }
}

Get all categories for the menus of a restaurant.

const readAllCategories = async(req, res) => {
    try{

    } catch (e) {

    }
}
*/

module.exports = {
    createManager,
    readManager,
    createRestaurant,
    readRestaurant,
    readAllRestaurants 
}