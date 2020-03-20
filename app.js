const express = require('express');
const bodyparser = require('body-parser');
const app = express();


//middleware
app.use(bodyparser.json());

//const path = require('path');
const db = require('./db');
const collection = "todo";



app.put('/:id',(req,res)=>{
    const todoID = req.params.id;
    const userInput = req.body;
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set:{todo:userInput.todo}},{returnOriginal :false},(err,result)=>{
        if(err)
            console.log(err);
        else    
            res.json(result);
    });
});

// adding data to databse
app.post('/',(req,res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json({result : result,document:result.ops[0]});
    });
});

app.delete('/:id',(req,res)=>{
    const todoId = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(todoId)},(err,result)=>{
        if(err)
            console.log(err);
        else    
            res.json(result);
    })
})






db.connect((err)=>{
    if(err){
        console.log('unable to connect');
        process.exit(1);
    }
    else{
        app.listen(process.env.PORT || 5000,(req,res)=>{
            console.log('connected to database, app listening to port 5050');
        });
        
    }
})


// rendering HTML file 
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

// displaying data on the browser
app.get('/getTodos',(req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    })
})


