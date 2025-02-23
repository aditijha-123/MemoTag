require('dotenv').config()
const mongoose = require('mongoose')

async function ConnectMongo(){
    try{
     await mongoose.connect("mongodb+srv://surbhi:Surbhi%402025@cluster1.ni75u.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster1", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
     console.log("MongoDB URI:", process.env.MONGO_URI);

     console.log("connected_mongo");
    }
    catch(err){
      console.log(err);
      process.exit(1);
    }
}


  


module.exports = ConnectMongo