const {
    gql
} = require("apollo-server-express");

const typeDefs = gql`
    type Query{
        getCorps:[Corps]

        getUsers:[Users]

        getPosts:[Posts]

        getPostsList(
            Company:ID
            num:Int
        ):[Posts]

        readPost(_id:ID):[Posts]
        
        getComents(p_id:ID):[Posts]

        idChk(UserId:String):IdChkResult
        
    }
    type IdChkResult{
        result:Boolean
    }

    type PostsList{
        _id:ID!
        Title:String
        Contents:String
        Writer:ID!
        Counter:Int
        CreatedDate:String
    }
    type ReadPost{
        _id:ID!
        Title:String
        Writer:Users
        Contents:String
        Coments:[Coments]
    }

    type Corps {
        _id: ID!
        CorpId: String!
        CorpName: String
        CorpRegNo: String
        CreatedDate: String
        ModifiedDate: String
    }

    type Users {
        _id:ID!
        Company: ID
        UserId: String!
        UserPW:String!
        UserName: String!
        UserEmail:String!
        UserMobile:String!
        UserLevel:Int
        CreatedDate: String
        ModifiedDate: String
    }

    type Posts{
        _id:ID!
        Title:String
        Contents:String
        Files:String
        Writer:Users
        Counter:Int
        Coments:[Coments]
        Category:String
        Company:Corps
        CreatedDate: String
        ModifiedDate: String
    }

    type Coments{
        Contents:String
        Writer:Users
        CreatedDate:String
        ModifiedDate: String
    }
    type C_Coments{
        Contents:String
        Writer:String
        CreatedDate:String
        ModifiedDate: String
    }

    type Message {
        token: String
        user: Users
    }
    type CorpUpdateResult{
        resultCount: Int!
    }

    type UserUpdateResult{
        resultCount: Int!
    }

    type PostUpdateResult{
        resultCount: Int!
    }

    type Mutation{
        login(
            userId: String!
            password: String!   
        ): Message

        
        getDecodeToken(token:String!):Users

        createCorp(
            CorpId: String!
            CorpName: String
            CorpRegNo: String
        ):  CorpUpdateResult

        updateCorp(
            _id:ID!
            CorpId: String!
            CorpName: String
            CorpRegNo: String
        ): CorpUpdateResult

        deleteCorp(
            _id:ID!
        ): UserUpdateResult

        createUser(
            Company: ID!
            UserId: String!
            UserPW:String!
            UserName: String!
            UserEmail:String!
            UserMobile:String!
        ):  Users

        updateUser(
            _id:ID!
            UserId: String!
            UserPW:String!
            UserName: String!
            UserEmail:String!
            UserMobile:String!
        ): UserUpdateResult

        deleteUser(
            _id:ID!
        ): UserUpdateResult

        createPost(
            Title:String
            Contents:String
            Writer:ID
            Company:ID
        ):  Posts

        updatePost(
            _id:ID!
            Title:String
            Contents:String
        ): UserUpdateResult

        deletePost(
            _id:ID!
        ): Posts

        createComent(
            Contents:String
            Writer:ID
            ParentPost:ID
        ):Posts

    }
`
module.exports = [typeDefs];