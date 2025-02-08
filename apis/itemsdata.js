const exp=require("express")
const itemsApi=exp.Router();
const mc=require("mongodb").MongoClient;
const expressErrorHandler=require("express-async-handler")
//core one no need to import


itemsApi.use(exp.json())

const databaseUrl="mongodb+srv://maria:maria@cluster0.xote1.mongodb.net/"

let databaseObj;
let userCollectionsObj;

mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection",err)
    }
    else{
        databaseObj=client.db("delish");
        userCollectionsObj=databaseObj.collection("delishusersdata")
        console.log("Database connection is success")
         
    }
})


    
//getting users cart data from mongodb database 
itemsApi.get('/addtocart/:username',expressErrorHandler(async(req,res,next)=>{
  console.log("attendence from get ")
    let myusername=req.params.username;
    let userList=await userCollectionsObj.findOne({username:myusername})   
    res.send({message:userList.cart})
}))


//Cart Operations
//Inserting into cart from components

itemsApi.post("/addToCartFromComponent/:username",expressErrorHandler(async(req,res,next)=>{
    let myusername=req.params.username;
    let itemToAdd=req.body;
    console.log("attendence from post")
await userCollectionsObj.findOneAndUpdate(
    {
      username: myusername,
    },
    {
      $addToSet: {
        cart: itemToAdd,
      },
    }
  )
}))

//Removing Items from Cart from Cart or Components
itemsApi.post("/removeFromCartFromComponent/:username",expressErrorHandler(async(req,res,next)=>{
    let myusername=req.params.username;
    let itemToAdd=req.body;
    console.log("attendence from remove ")
await userCollectionsObj.findOneAndUpdate(
    {
      username: myusername,
    },
    {
      $pull: {
        cart: itemToAdd,
      },
    }
  )
}))


//export module
module.exports=itemsApi