const inProgress = require('../Schemas/inProgressSchema')
const readyToServe = require('../Schemas/readyToServeSchema')
const finishedOrders = require('../Schemas/finishedOrdersSchema')
require('dotenv').config({ path: './config/.env' });

/* ROUTES */

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

  const getOrderStatus = async(req, res)=>{

  }

  const userAddNote = async(req,res)=>{

  }

  module.exports = {
    placeOrder,
    getOrderStatus,
    userAddNote

  }