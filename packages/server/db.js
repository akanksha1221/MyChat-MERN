
// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectToMongoDB = async () => {
//   try {
//     const uri = process.env.MONGODB_URI;
//     const dbName = process.env.MONGODB_DATABASE_NAME;

//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: dbName,
//     });

//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// };

// module.exports = connectToMongoDB;
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/chatApp",{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection: `+e);
})