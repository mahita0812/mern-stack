const express=require("express")
const app=express()
const products=require("./products")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const Content=require("./schema")
console.log(Content)
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb+srv://mahita:mahita@cluster0.hmcpn9f.mongodb.net/firstdb?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Mongodb connected successfully")
})
    .catch((err)=>{
        console.log(err)
})
app.get("/",(req,res)=>{
    res.send("Server started successfully")
})
app.post("/add",(req,res)=>{
    console.log("data from frontend",req.body)
    const {name,passcode}=req.body
    const newData=new Content({
        name,passcode
    })
    newData.save()
    res.send("added")
})

app.get("/retrieve",(req,res)=>{
    Content.find()
    .then(found=>res.json(found))
})

app.get("/my-products",(req,res)=>{
    res.json(products)
})

app.get("/name",(req,res)=>{
    res.send("Mahita Kantamneni")
})

app.listen(4000,()=>console.log("Server is started"))