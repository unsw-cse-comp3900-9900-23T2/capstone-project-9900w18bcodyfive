const inProgress = require('../Schemas/inProgressSchema')
const readyToServe = require('../Schemas/readyToServeSchema')
const finishedOrders = require('../Schemas/finishedOrdersSchema')
require('dotenv').config({ path: './config/.env' });

/* ROUTES */

/*================================================================================================================================== 
    FETCH ALL ORDERS INPROGRESS
================================================================================================================================== */



const getKitchenOrders = async (req, res) => {
    try {
      const { rId } = req.params;
  
      // Find all the orders in the InProgress collection that have the given rId
      const orders = await inProgress.find({ rId }).exec();
  
      res.status(200).send(orders);
    } catch (e) {
      res.status(400).send({ errorMessage: e.message });
    }
  };

/*================================================================================================================================== 
    DELETE THE ORDERS ONCE KITCHEN STAFF PRESSES FINISHED
================================================================================================================================== */

const deleteKitchenOrder = async(req,res) =>{
    
    try {
        const { rId, orderNo } = req.params;
    
        // Find the order in the InProgress collection based on rId and orderNo
       
        const order = await inProgress.findOne({ rId, orderNo }).exec();
        
        //console.log('HAHAH WTFFFFF')
        //console.log(order)
        
        // If the order exists in the InProgress collection
        
        if (order) {
         
           // Delete the order from the InProgress collection
          await inProgress.findOneAndDelete({ rId, orderNo }).exec();
    
          // Add the same order to the readyToServe collection
          const readyOrder = new readyToServe({
            rId : order.rId,
            tId : order.tId,
            orderNo : order.orderNo,
            itemsOrdered : order.itemsOrdered,
            totalPrice : order.totalPrice

          }
          );
          //console.log(readyOrder)
          await readyOrder.save();
    
          res.status(200).send({ successMessage: 'Order deleted from InProgress and added to ReadyToServe' });
        } else {
          res.status(404).send({ errorMessage: 'Order not found in InProgress' });
        }
      } catch (e) {
        res.status(400).send({ errorMessage: e.message });
      }
}
  
module.exports = {
    getKitchenOrders,
    deleteKitchenOrder,

}
  