const exp=require("express")
const app=exp();
const path = require("path")
const bodyParser = require("body-parser");
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 
 
app.use((req, res, next) => {
    console.log(`Incoming request from route: ${req.path}`);
    next();
  });

const cors = require('cors')
const corsOptions ={
    origin:["http://localhost:4200","https://delishrestuarant.netlify.app"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get("/", (req, res) => {
    res.send("Home page");
  });
  

//connecting front end to backend

const userApi=require("./apis/user-api")
const itemsApi=require("./apis/itemsdata")
//importing
app.use("/user",userApi)
app.use("/items",itemsApi)




app.use((req,res)=>{
    console.log(req.path,"invlauid")
    res.send({message:`Path ${req.path} is invalid`})
})

app.use((err,req,res,next)=>{
    res.send({message:`${err.message}`})
})

const port=5000
app.listen(port,()=>console.log(`Server can hear you on ${port}....`))



