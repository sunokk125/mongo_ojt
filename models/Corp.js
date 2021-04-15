const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CorpSchema = new Schema({
    CorpId:{type:String,unique:true},
    CorpName:{type:String},
    CorpRegNo:{type:String},
    CreatedDate:{type:Date, default:Date.now},
    ModifiedDate:{type:Date, default:Date.now}
});

module.exports=mongoose.model('Corp', CorpSchema);