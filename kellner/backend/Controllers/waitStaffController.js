const inProgress = require('../Schemas/inProgressSchema')
const readyToServe = require('../Schemas/readyToServeSchema')
const finishedOrders = require('../Schemas/finishedOrdersSchema')
const assistance = require('../Schemas/assistanceSchema')
const checkOut = require ('../Schemas/checkOutSchema')

require('dotenv').config({ path: './config/.env' });

/* ROUTES */

/*================================================================================================================================== 
GET READY TO SERVE ORDERS
================================================================================================================================== */
const getReadyToServeOrders = async (req, res) => {
    try {
      const rId = req.params.rId;
      const readyToServeOrders = await readyToServe.find({ rId }).exec();
  
      if (!readyToServeOrders || readyToServeOrders.length === 0) {
        return res.status(404).send('No orders found for rId');
      }
  
      res.status(200).json({ readyToServeOrders });
    } catch (error) {
      res.status(400).send({ errorMessage: error.message });
    }
  };

/*================================================================================================================================== 
DELETE WAIT STAFF ORDER
================================================================================================================================== */
const deleteWaitStaffOrder = async (req, res) => {
    try {
      const { rId, orderNo } = req.params;
  
      const readyToServeOrder = await readyToServe.findOneAndDelete({ rId, orderNo }).exec();
      
      if (!readyToServeOrder) {
        return res.status(404).send('Order not found in Ready to serve collection');
      }
  
      // Move the order to the finishedOrders collection
      const finishedOrder = new finishedOrders({
        rId: readyToServeOrder.rId,
        tId: readyToServeOrder.tId,
        orderNo: readyToServeOrder.orderNo,
        itemsOrdered: readyToServeOrder.itemsOrdered,
        totalPrice: readyToServeOrder.totalPrice,
        note: readyToServeOrder.note,
        createdAt: readyToServeOrder.createdAt,
      });
  
      await finishedOrder.save();
  
      res.status(200).send('Order deleted from inProgress collection and moved to finishedOrders collection');
    } catch (error) {
      res.status(400).send({ errorMessage: error.message });
    }
  };

/*================================================================================================================================== 
GET ASSISTANCE REQUESTS
================================================================================================================================== */

const getAssistanceRequests = async (req, res) => {
    try {
      //console.log("dsfsfdsfdsf")
      const { rId } = req.params;
      const assistanceRequests = await assistance.find({ rId }).exec();
    
      res.status(200).send({ assistanceRequests });
    } catch (error) {
      res.status(400).send({ errorMessage: error.message });
    }
  };

/*================================================================================================================================== 
DELETE ASSISTANCE REQUESTS
================================================================================================================================== */
const deleteAssistanceRequest = async (req, res) => {
    try {
      const { aId } = req.params;
  
      // Find and delete the assistance request with the specified aId
      const deletedAssistance = await assistance.findOneAndDelete({ aId }).exec();
  
      if (!deletedAssistance) {
        return res.status(404).send('Assistance request not found');
      }
  
      res.status(200).send({ successMessage: 'Assistance request deleted' });
    } catch (error) {
      res.status(400).send({ errorMessage: error.message });
    }
  };

module.exports = {
    getReadyToServeOrders,
    deleteWaitStaffOrder,
    getAssistanceRequests,
    deleteAssistanceRequest
}