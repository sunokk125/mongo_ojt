const query = require("../db/dbExe");
const login = require('../auth/login');
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Corp = require('../models/Corp.js');

const resolvers={
    Query:{
        getCorps: async () => {
            let result = await query.getCorpExe();
            console.log(result);
            return result;
        },
        
        getUsers: async () => {
            let result = await User.find();
            console.log(result);
            return result;
        },
        
        getPosts: async () => {
            console.log("123123123")
            let result = await Post.find({});
            console.log(result);
            return result;
        },
        getPostsList: async (_,{Company,num}) => {
            let results = await query.getPostsListExe(Company,num);
            return results;
        },
        readPost: async(_,{_id}) =>{
            let result = await query.readPostExe(_id);
            console.log(result);
            return result;
        },
        getComents: async (_,{p_id}) =>{
            let result = await query.getComentsExe(p_id);
            console.log(result);
            return result;
        },
        
        idChk: async (_,{UserId}) =>{
            let result = await query.idChkExe(UserId);
            console.log(result);
            return {result:result};
        },
    },
    Mutation:{
        login: async function (_, {
            userId,
            password
        }) {
            try {
                console.log("userId : "+userId);
                console.log("userpw : "+password);
                let result = await login.loginExe(userId, password);
                console.log("User Logined with this result : " + JSON.stringify(result));
                if (result === undefined) {
                    throw new Error("no such user");
                }
                return result;
            } catch (error) {
                console.log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },
        
        createCorp: async (_, {
            
            CorpId= null,
            CorpName= null,
            CorpRegNo= null
        }) => {
            try {
                let data = {
                    "CorpId": CorpId,
                    "CorpName": CorpName,
                    "CorpRegNo":CorpRegNo,
                };
                console.log("r1");
                const result = await sql.createCorpExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        createUser: async (_, {
            Company= null,
            UserId= null,
            UserPW=null,
            UserName= null,
            UserEmail=null,
            UserMobile=null
        }) => {
            try {
                let data = {
                    "Company": Company,
                    "UserId": UserId,
                    "UserPW":UserPW,
                    "UserName": UserName,
                    "UserEmail":UserEmail,
                    "UserMobile":UserMobile
                };
                
                console.log("r1");
                console.log(JSON.stringify(data));
                const result = await query.createUserExe(data);
                return result;
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        updateUser: async (_, {
            _id=null,
            UserId= null,
            UserPW=null,
            UserName= null,
            UserEmail=null,
            UserMobile=null
        }) => {
            try {
                let data = {
                    "_id":_id,
                    "UserId": UserId,
                    "UserPW":UserPW,
                    "UserName": UserName,
                    "UserEmail":UserEmail,
                    "UserMobile":UserMobile
                };
                console.log("r1");
                const result = await query.updateUserExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.ok  };
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        createPost: async (_, {
            Title=null,
            Contents=null,
            //Files=null,
            Writer=null,
            Company=null,
            //Category=null
        }) => {
            try {
                let data = {
                    "Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    "Writer":Writer,
                    "Company":Company
                    //"Counter":Counter,
                    //"ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await query.createPostExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return result;
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
        updatePost:async (_, {
            _id=null,
            Title=null,
            Contents=null,
            //Files=null,
            //Writer=null,
            //Category=null
        }) => {
            try {
                let data = {
                    "_id":_id,
                    "Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    //"Writer":Writer
                    //"Counter":Counter,
                    //"ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await query.updatePostExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return { resultCount: result.ok };
            } catch (error) {
                console.log(`updatePost error: ${error}`);
                throw error;
            }
        },
        deletePost: async (_, {
            _id
        }) => {
            try {
                const result = await query.deletePostExe(_id);
                return { resultCount: result.affectedRows };
            } catch (error) {
                console.log(`deletePost error: ${error}`);
                throw error;
            }
        },
        createComent: async(_,{
            //Title=null,
            Contents=null,
            //Files=null,
            Writer=null,
            ParentPost=null,
            //Category=null
            
        }) =>{
            try {
                let data = {
                    //"Title":Title,
                    "Contents":Contents,
                    //"Files":Files,
                    "Writer":Writer,
                    //"Counter":Counter,
                    "ParentPost":ParentPost,
                    //"Category":Category
                };
                console.log("r1");
                const result = await query.createComentExe(data);
                console.log("r2");
                console.log("result : "+result);
                console.log("r3");
                return result;
            } catch (error) {
                console.log(`createUserInfo error: ${error}`);
                throw error;
            }
        },
    }
}

module.exports = resolvers;