const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { error } = require("console");
const { removeAllListeners } = require("process");
const path = require("path");
//const cors = require("cors");
const port = 3000

const app = express();
  
app.use(bodyParser.json());
//app.use(cors());

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});


function findIndex(arr, id) {
    for(let i = 0; i< arr.length; i++) {
        if(arr[i].id === id) return i;
    }
    return -1;
}

function removeAtIndex(arr,index) {
    let newArray = [];
    for(let i=0; i<arr.length; i++) {
        if(i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get("/getTodos",(req,res) => {
   fs.readFile("todo.json","utf-8",(error,data) => {
       if(error) throw error;
       res.json(JSON.parse(data));
   });
});

app.post("/createTodo",(req,res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };

    fs.readFile("todo.json","utf-8", (error,data) => {
        if(error) throw error;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todo.json", JSON.stringify(todos), (error,data) => {
            if(error) throw error;
            res.status(200).json(newTodo);
        });

    })
})

app.delete("/deleteTodos/:id",(req,res)=>{
   fs.readFile("todo.json","utf-8",(error,data) => {
        if(error) throw error;
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos,parseInt(req.params.id));
        if(todoIndex === -1) {
            rreseq.status(404).send();
        } else {
            var newTodos = removeAtIndex(todos,todoIndex);
            fs.writeFile("todo.json",JSON.stringify(newTodos), (error) => {
                if(error) throw error;
                res.status(200).send();
            })
        }
   });
});

function onAppStart() {
    console.log("Sever is running on port 3000");
}
app.listen(port,onAppStart);


