const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const Fruit = new Scheme ({
    name : {type:String},
    quatity : {type:Number},
    price : {type:Number},
    status : {type:Number},
    images : {type:Array},
    description : {type:String},
    id_distributor : {type: Scheme.Types.ObjectId, ref:'distributor'},

},{
    timestamps: true
})

module.exports = mongoose.model('fruit', Fruit);