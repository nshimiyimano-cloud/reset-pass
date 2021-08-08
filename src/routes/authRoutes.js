const express=require('express');
const router=express.Router();

const AuthCtrl=require("../controllers/auth");


/*
router.post('/register',AuthCtrl.createUser)
router.post('/req-reset-password',AuthCtrl.resetPassword);
router.post('/new-password',AuthCtrl.NewPassword);
router.post('/valid-password-token',AuthCtrl.ValidPasswordToken);
*/

router.post('/register', function(req, res){
  AuthCtrl.createUser
});


router.post('/req-reset-password', function(req, res){
  AuthCtrl.resetPassword
});



router.post('/new-password', function(req, res){
  AuthCtrl.NewPassword
});


router.post('/valid-password-token', function(req, res){
  AuthCtrl.ValidPasswordToken
});







module.exports=router;
