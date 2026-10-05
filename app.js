const express = require("express");
let app = express();
let port = 8080;
const mongoose = require('mongoose');
const path = require("path")
const Chat = require ("./models/chat")

app.set("view engine" , "ejs");
app.set("views",  path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "/public")))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("mongoose is connected..")
}).catch((err)=>{
    console.log(err)
});

async function main() {
    await mongoose.connect("mongodb+srv://sagarsrivastava5201_db_user:srivastava0225@cluster0.j1nulhv.mongodb.net/taking?appName=Cluster0");
}
// show data

app.get("/chats", async(req, res)=>{
  let Chats = await Chat.find()
 
  res.render("index.ejs", {Chats})
})
//  new form
 app.get("/chats/new" , (req, res)=>{
    res.render("new.ejs")
 })

 app.post("/chats" , (req, res)=>{
    let {from , msg , to } = req.body
      let newVal = new Chat ({
        from : from , 
        msg : msg , 
        to : to , 
        created_at : new Date(), 
      });

      newVal.save().then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })

      res.redirect("/chats")
 });

 app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs" , {chat})

 })

app.put("/chats/:id" ,async (req, res)=>{
   let {id} = req.params;
   let {msg : newMsg} = req.body;
   let updateChat=  await Chat.findByIdAndUpdate(id , {msg: newMsg})
res.redirect("/chats");
 });

 app.delete("/chats/:id", async (req, res)=>{
     console.log("DELETE ROUTE HIT");
    let {id}= req.params;
   let dillu= await Chat.findByIdAndDelete(id)
   res.redirect("/chats")
   

})

app.listen(port , ()=>{
    console.log("server is running..")
})