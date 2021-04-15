const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corp',
        default:null
    },
    UserId:{type:String,unique:true},
    UserPW:{type:String},
    UserName:{type:String},
    UserEmail:{type:String},
    UserMobile:{type:String},
    UserLevel:{type:String,default:0},
    CreatedDate:{type:Date, default:Date.now},
    ModifiedDate:{type:Date, default:Date.now}
});

module.exports= mongoose.model('User', UserSchema);