const bcrypt=require("bcrypt");
const crypto=require("crypto");



const nodemailer=require("nodemailer");
const user = require("../modals/user");




module.exports={

async createUser(req,res){
const userEmail=await user.findOne({
  email:req.body.email
});



if(userEmail){
  return res.status(409).json({message:'Email already exist'});
}
else{
     const userName=await user.findOne({
     username:req.body.username

      });



   if(userName){
    return res.status(409).json({message:'Username already exist'});
   }
  else{
  return bcrypt.hash(req.body.password,10,(err,hash)=>{


     if(error){
     return res.status(400).json({message:'Error hashing password'});
     }
     else{
            const body={
            username:req.body.email,
            email:req.body.email,
            password:hash
           };


          user.create(body)

           .then(user=>{
             res.status(201).json({message:'User created successfully',user});
            })

          .catch(()=>{
            res.status(500).json({message:'Error Occured'})
           });

         }
      });

    }
  }
 }
}


