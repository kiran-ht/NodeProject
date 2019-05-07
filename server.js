console.log("hello");
var alert = require('alert-node');
var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var sessions = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbname = "example";
const url = "mongodb://localhost:27017/example";
const mongoOptions = {useNewUrlParser : true};

var sessionvaribale;
var session,flag=0,arr=[];

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine','html');

app.use('/js',express.static(__dirname+'/js'));
app.use('/js',express.static(__dirname+'/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/jquery/dist'));
app.use('/css',express.static(__dirname+'/css'));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const db = require("./mongodbconnect.js");

const collection="firstcollection";
const collection2="messages";

db.connect((err)=>{
    if(err){
        console.log("Unable to Connect");
        process.exit(1);
    }
    else{
        console.log("Connected")
    }
});

app.use(sessions({
    secret:'*****',
    resave: false,
    saveUninitialized: true
}))

app.get('/',function(req,res){
    if(flag==1){
       alert("Wrong Password");
        res.sendFile(__dirname+'/views/pages/open.html');
    }
    else{
    res.sendFile(__dirname+'/views/pages/open.html');
    }
    flag=0;
});

app.post('/login',function(req,res){

        db.getDB().collection(collection).find({username: req.body.username}).toArray((err,user)=> {
            session = req.session;
                var len  = user.length;
                if(len>0)
                {
                var str = Object.values(user[0]);
                session.uniqueId = req.body.username;
                   if (str[1] == req.body.username && str[2] == req.body.password){
                
                res.redirect('/redirects');
               }
               else{
                    flag=1;
                   res.redirect('/');
               }
             } else {
                alert("Who are you?????");
                //  res.end("Login invalid");
             
               }
        });
      });

app.get('/redirects', function(req,res){
    session = req.session;
    if(session.uniqueId){
        res.redirect('/nextpage');
    }
    else{
         res.end('who are you??????');
       
    }
});

app.get('/nextpage',(req,res)=>{
    res.sendFile(__dirname+'/views/pages/index1.html');
});

// app.get('/mainpage', function(req,res){
//     app.set('view engine','ejs');
//     session = req.session;
//      sessionvaribale=session.uniqueId;
//     db.getDB().collection(collection2).find({username: sessionvaribale},{msg:1}).toArray((err,result)=> {
        
//         res.render('pages/index',{
//              items:result
//         });
//     });
    
// });

app.get('/getmessages',(req,res)=>{
    app.set('view engine','ejs');
    session = req.session;
     sessionvaribale=session.uniqueId;
    db.getDB().collection(collection2).find({username: sessionvaribale},{msg:1}).toArray((err,documents)=> {
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
})


app.delete('/:id',(req,res)=>{
    const delid=req.params.id;

    db.getDB().collection(collection2).deleteOne({_id:db.getPrimaryKey(delid)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});



module.exports = sessionvaribale;
var server = app.listen(3000,function(){
    console.log("Server started on 3000....!");
})