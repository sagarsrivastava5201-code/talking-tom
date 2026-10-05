const mongoose = require("mongoose"); 
const Chat = require ("./models/chat");

main().then(()=>{
    console.log("mongoose is connected..")
}).catch((err)=>{
    console.log(err)
});

 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/taking');
}  


const allData = [
    {
        from: "Rahul",
        to: "Sagar",
        msg: "Hello Sagar!",
        created_at: new Date()
    },
    {
        from: "Aman",
        to: "Rahul",
        msg: "How are you?",
        created_at: new Date()
    },
    {
        from: "Priya",
        to: "Aman",
        msg: "Good morning!",
        created_at: new Date()
    },
    {
        from: "Sagar",
        to: "Priya",
        msg: "How is your project going?",
        created_at: new Date()
    },
    {
        from: "Neha",
        to: "Sagar",
        msg: "Let's meet tomorrow.",
        created_at: new Date()
    }, 
     {
        from: "piyush",
        to: "Sagar",
        msg: "Let's go sgar to another city to visite the new advanture .",
        created_at: new Date()
    }
];


Chat.insertMany(allData);
