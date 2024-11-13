//const express = require("express"); //CommonJS require = import library
import express from 'express'; // only one express for one library
import HelloRoutes from "./Hello";
const app = express();
{/*app.get("/hello", (req, res)=>{
    res.send("Hello World!");
}); // tell server what should happend when comes in
                //(req, res)=>{}: lambda syntax, [object res:generate response]

app.get('/', (req, res)=>{
        res.send("Welcome to Full Stack Development!");})*/}

// handling incoming request
app.listen(4000); //3000 is used for react application, so use 4000 here
// run node App.js, http://127.0.0.1:4000/hello
HelloRoutes(app);






