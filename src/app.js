
 const cookieParser=require('cookie-parser');
 const express=require('express');
 const mongoose=require('mongoose');
const { json, urlencoded } = require('body-parser');
const cors=require('cors');
const { dbConfig } = require('./config/secret');
const auth= require('./routes/authRoutes');




const app=express();

mongoose.Promise=global.Promise;

mongoose.connect(dbConfig.url,{useNewUrlParser:true})
.then(()=>console.log('succesfully mongo database server connected'))

.catch(()=>console.log("mongodb server not connected yet??"))




const server=require('http').createServer(app);



app.use(cors());
app.use(express(json({limit:'500mb'})));
app.use(urlencoded({extended:true,limit:'500mb'}));
app.use(cookieParser())

app.use('/api/resetpassword',auth)

const port=process.env.Port | 8000;

server.listen(port,()=>{
  console.log('server listen on ',dbConfig.url,'with',port,' port now.')
})
