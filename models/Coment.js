const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComentSchema = new Schema({
    Contents:{type:String},
    Writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    CreatedDate:{type:Date,default:Date.now()},
    ModifiedDate:{type:Date,default:Date.now()}
});


module.exports=mongoose.model('Coment', ComentSchema);