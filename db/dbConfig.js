require("dotenv").config();

module.exports=(function(){
    return {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "ojt",
        port:process.env.DB_PORT||"27017"
    };
})();