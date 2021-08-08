//auth contain all controller functions eg to create toresettoken ,.,


const bcrypt=require("bcrypt");
const crypto=require("crypto");



const nodemailer=require("nodemailer");
const { AsyncAction } = require("rxjs/internal/scheduler/AsyncAction");
const user = require("../modals/user");
const passwordResetToken=require("../modals/reset-token");




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






//creating resetPassword controller function


async function ResetPassword(req,res){
     if(!req.body.email){
       return res.status(500).json({message:'Email is required'});
     }

     const user=await user.findOne({
       email:req.body.email
     });

     if(!user){
       return res.status(500)
       .json({message:'Email does not exist'})
     }

     var resettoken=new passwordResetToken({_userId:user._id,resettoken:crypto.randomBytes(16).toString('hex')});
     resettoken.save(function(error){
       if(error){
         return res.status(500).send({msg:err.message});
       }

       else{
       passwordResetToken.find({_userId:user._id,resettoken:{$ne:resettoken.resettoken}})
       .remove().exec();
       res.status(200).json({message:'Res password successfully'});

       var transporter=nodemailer.createTransport({
         service:'Gmail',
         port:465,
         auth:{
           user:'njeanluc828@gmail.com',
           pass:'201898lc'
         }

        });



        var mailOptions={

          to:user.email,
          from:'njeanluc828@gmail.com',
          subject:'Node.js Password Reset',
          text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:3000/response-reset-password/'+resettoken.resettoken+'\n\n'+
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

           }

           transporter.sendMail(mailOptions,(error,info)=>{
             if(error){
               console.log(error.message);
             }
             else{
               console.log(info.accepted)
             }
            }

           )}

            })


}
