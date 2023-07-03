const mongoose = require('mongoose');
const validator = require('validator');

const uri = "mongodb+srv://admin:kellner01@kellner01.cbxnkwq.mongodb.net/"
async function connect(){
    try{
        await mongoose.connect(uri)
        //console.log("Connected to DB")
    }catch(error){
        console.error(error)
    }
}
connect(); 

const restaurantSchema = new mongoose.Schema({

    resId: {
        type: String,
        unique: true

    },

    rName: { 
        type: String, 
        required: [true, 'Restaurant requires a name!'] 
    },

    rLocation: { 

        type: String, 
        required: [true, 'Restaurant requires a location!'] 
    },

    rDescription: { 

        type: String, 
        required: [true, 'Restaurant requires a description!'] 
    
    },
    
    restaurantImage: { 

        type: Buffer, 

    },
    
    rContact: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
              const pattern = /^(04|\+614)[- \.]?\d{2}[- \.]?\d{2}[- \.]?\d{2}$/;
              return pattern.test(value);
            },
            message: 'Invalid phone number format',
          },
        maxlength: [12, 'Phone number can be at most 12 digits long'],
    },

    rTableCount: { 

        type: Number, 
        required: true, 
        min: [1, 'Too few tables']

    }
});

const restaurantData = mongoose.model('restaurantData', restaurantSchema)
module.exports = restaurantData