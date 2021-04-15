
var mongoose =require('mongoose');

const config = require("./dbConfig");

mongoose.Promise = global.Promise;


module.exports={
    connection: async function () {
        try {
            mongoose.connect('mongodb://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/admin',{dbName:'ojt', useNewUrlParser: true,useUnifiedTopology: true},function(err){
                if(err){
                    console.error('mongodb connection err',err);
                }else {
                    console.log('mongodb connected');
                };
            });
        } catch (err) {
            console.log("Connection error : " + err);
            throw err;
        }
    },

    disconnection: async function (conn) {
        try {
            mongoose.disconnect(function(err){
                if(err){
                    console.error('mongodb disconnection err',err);
                }else {
                    console.log('mongodb disconnected');
                };
            });
        } catch (err) {
            console.log("Connection error : " + err);
            throw err;
        }
    }
}