const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    Title:{type:String, default:null},
    Contents:{type:String},
    Files:{type:String,default:null},
    Writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Counter:{
        type:String,
        default:0
    },
    Coments:[{
        Contents:{type:String},
        Writer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        Coments:[{
            Contents:{type:String},
            Writer:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            CreatedDate:{type:Date,default:Date.now()},
            ModifiedDate:{type:Date,default:Date.now()}
        }],
        CreatedDate:{type:Date,default:Date.now()},
        ModifiedDate:{type:Date,default:Date.now()}
    }],
    Category:{type:String,default:0},
    Company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corp'
    },
    CreatedDate:{type:Date, default:Date.now()},
    ModifiedDate:{type:Date, default:Date.now()}
});

module.exports=mongoose.model('Post', PostSchema);