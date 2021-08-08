//auth contain all controller functions eg to create toresettoken ,.,


const bcrypt=require("bcrypt");
const crypto=require("crypto");



const nodemailer=require("nodemailer");
const User = require("../modals/user");
const PasswordResetToken=require("../modals/reset-token");




module.exports={

  async CreateUser(req, res) {
const userEmail=await User.findOne({
  email:req.body.email
});



if(userEmail){
  return res.status(409).json({message:'Email already exist'});
}
else{
     const userName=await User.findOne({
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


          User.create(body)

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


module.exports={
  async ResetPassword(req, res) {
     if(!req.body.email){
       return res.status(500).json({message:'Email is required'});
     }

     const user=await User.findOne({
       email:req.body.email
     });

     if(!user){
       return res.status(500)
       .json({message:'Email does not exist'})
     }

     var resettoken=new PasswordResetToken({_userId:user._id,resettoken:crypto.randomBytes(16).toString('hex')});
     resettoken.save(function(error){
       if(error){
         return res.status(500).send({msg:err.message});
       }

       else{
       PasswordResetToken.find({_userId:user._id,resettoken:{$ne:resettoken.resettoken}})//$ne==where not
       .remove().exec();
       res.status(200).json({message:'Reset password successfully'});

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
}





module.exports={
  async ValidPasswordToken(req, res) {
  if(!req.body.resettoken){
    return res.status(500)
    .json({message:'Token is required'});
  }


  const user=await PasswordResetToken.findOne({
    resettoken:req.body.resettoken
  });



  if(!user){
    return res.status(409).json({message:'Invalid URL'});
  }

User.findOneAndUpdate({
  _id:user._userId
})
.then(()=>{

res.status(200).json({message:'Token verified successfully.'});
})

.catch((err)=>{
return res.status(500).send({msg:err.message});

})

}
}






module.exports={
  async NewPassword(req, res) {

  PasswordResetToken.findOne({resettoken:req.body.resettoken},function(err,userToken,next){

    if(!userToken){
    return res.status(409).json({message:'Token has expired'});
    }


    User.findOne({
      _id:userToken._userId
    },function(error,userEmail,next){

      if(!userEmail){
        return res.status(409).json({message:'User does not exist'});

      }

      else{
        return bcrypt.hash(req.body.newpassword,10,(err,hash)=>{
          if(err){
            return res.status(400).json({message:'Error hashing password'});
          }


          userEmail.password=hash;
          userEmail.save(function(err){
            if(err){
              return res.status(400).json({message:'Password can not reset'});
            }
            else{
              userToken.remove();
              return res.status(201).json({message:'Password reset successfully'});
            }
          })
        })
      }


    });


  });



}
}
