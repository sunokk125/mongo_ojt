const jwt = require('jsonwebtoken');
const db = require('../db/dbCreate');
const query = require('../db/dbExe');
const SECRET_KEY = "SeCrEtKeY1234";

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Corp = require('../models/Corp.js');

module.exports={
    loginExe: async function (userId,password){
        let conn;
        try {
            conn = db.connection();

            const result = await User.findOne({'UserId':userId,'UserPW':password});
            console.log('loginExe result : ' + JSON.stringify(result));
            
            if(result.length == 0) {
                throw new Error("No such userId");
            }
            let user = result;
            console.log("user : "+ user);
            // console.log(result.password + "     " + JSON.stringify(user));
            
            const token = jwt.sign({
                _id : user._id,
            },SECRET_KEY,{
                expiresIn: '7d'
            })

            return {
                token,
                user
            };
        } catch (error) {
            console.log(`loginExe erorr : ${error}`);
        }
        finally{
            if(conn) db.disconnection();
        }
    },

    checkAuth: async function (token) {
        try {
            //log('checkAuth data : ' + token);

            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                console.log("decoded result : " + JSON.stringify(decoded));
                return decoded;  
            } catch (error) {
                console.log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            console.log(`no token error : ${error}`);
            throw error;
        }
    }


}