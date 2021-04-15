const db = require('./dbCreate');

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Corp = require('../models/Corp.js');
const Coment = require('../models/Coment.js');

module.exports = {
    getCorpExe: async function () {
        let conn;
        try {
            conn=db.connection();

            let results;

            results = await Corp.find({});
            console.log('getCorpExe executed');
            return results;
        }
        catch (err) {
            console.log("getCorpExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },
    getUserExe: async function () {
        try {
            const queryString = "select * from users";
            let results;

            results = await db.exe(queryString);
            console.log('getUserExe executed');
            return results;
        }
        catch (err) {
            console.log("getUserExe Error : " + err);
            throw err;
        }
    },
    getPostExe: async function () {
        try {
            const queryString = "select * from posts";
            let results;

            results = await db.exe(queryString);
            console.log('getPostExe executed');
            return results;
        }
        catch (err) {
            console.log("getPostExe Error : " + err);
            throw err;
        }
    },
    getPostsListExe: async function(Company,num){
        let conn;
        try {
            conn=db.connection();
            let results = await Post.find({'Company':Company}).sort({"_id":-1}).skip(num).limit(10).populate('Writer').exec();

            console.log('getPostsListExe executed');
            return results;
        }
        catch (err) {
            console.log("getPostsListExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },
    readPostExe: async function(_id){
        let conn;
        try {
            conn=db.connection();

            let results = await Post.find({'_id':_id}).populate(['Writer','Coments.Writer']).exec();

            console.log('getPostExe executed');
            return results;
        }
        catch (err) {
            console.log("getPostExe Error : " + err);
            throw err;
        }
    },
    getUserByIdExe: async function (no = null) {
        try {
            let queryString =
                "select * " +
                "from users ";

            if (no) {
                queryString +=
                    "where No = " + no;
            }


            let result;
            console.log('getUserByIdExe executed');
            result = await db.exe(queryString);
            console.log("db result : " + JSON.stringify(result));
            return result;
        }
        catch (err) {
            console.error("getUserByIdExe Error: " + err);
            throw err;
        }
    },
    idChkExe: async function (userId) {
        let conn;
        try {
            conn=db.connection();

            var result;
            let results;


            results = await User.find({UserId:userId});
            if(results.length){
                result=true;
            }else{
                result=false;
            }
            return result;
        }
        catch (err) {
            console.log("idChkExe Error : " + err);
            throw err;
        }
    },
    createCorpExe: async function (data) {
        let conn;
        try {
            conn = await db.getPoolConnection();
            let queryString =
                "insert into corps (CorpId,CorpName,CorpRegNo) " +
                "values (" +
                conn.escape(data['CorpId'])+","+
                conn.escape(data['CorpName'])+","+
                conn.escape(data['CorpRegNo'])+
                ")";
            //console.log(queryString);
            console.log("d1");
            const result = await conn.query(queryString);
            console.log("d2");
            console.log("query statement : " + queryString);
            console.log("db result"+ JSON.stringify(result));
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.endPoolConnection(conn);
        }
    },
    createUserExe: async function (data) {
        let conn;
        try {
            conn = await db.connection();
            
            const result = await User.create(data);
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.disconnection();
        }
    },
    updateUserExe: async function (data) {
        let conn;
        try {
            conn=db.connection();

            console.log(data);

            let results = await User.find({'_id':data._id}).update({
                UserId:data.UserId,
                UserPW:data.UserPW,
                UserName:data.UserName,
                UserEmail:data.UserEmail,
                UserMobile:data.UserMobile,
            });

            console.log(results);

            console.log('updateUserExe executed');
            return results;
        }
        catch (err) {
            console.log("updateUserExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },
    createPostExe: async function (data) {
        let conn;
        try {
            conn = await db.connection();
            
            const result = await Post.create(data);
            return result;
        } catch (error) {
            console.log("createUserExe error :" + error);
            throw error;
        }
        finally {
            if (conn) await db.disconnection();
        }
    },
    updatePostExe: async function (data) {
        let conn;
        try {
            conn=db.connection();

            console.log(data);

            let results = await Post.find({'_id':data._id}).update({Title:data.Title,Contents:data.Contents});

            console.log(results);

            console.log('updatePostExe executed');
            return results;
        }
        catch (err) {
            console.log("updatePostExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },
    deletePostExe:async function (_id) {
        let conn;
        try {
            conn=db.connection();

            console.log(_id);

            let results = await Post.remove({'_id':_id});

            console.log(results);

            console.log('deletePostExe executed');
            return results;
        }
        catch (err) {
            console.log("deletePostExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },
    createComentExe: async function (data) {
        let conn;
        try {
            conn=db.connection();
            var coment = new Coment();
            coment.Contents = data.Contents;
            coment.Writer = data.Writer; 

            let results = await Post.update({_id:data.ParentPost},{$push:{Coments:coment}}).populate(['Writer','Coments.Writer']).exec();

            console.log(results);

            console.log('createComentExe executed');
            return results;
        }
        catch (err) {
            console.log("createComentExe Error : " + err);
            throw err;
        }finally{
            if(conn) db.disconnection();
        }
    },

    getComentsExe: async function(p_id){
        let conn;
        try {
            conn=db.connection();

            let results = await Post.find({ParentPost:p_id}).populate(['Writer','Coments.Writer']).exec();

            console.log(results);

            console.log('getComentExe executed');
            return results;
        }
        catch (err) {
            console.log("getComentExe Error : " + err);
            throw err;
        }
    }

}