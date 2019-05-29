var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/signup',function(req,res){
	var fname=req.body.name;
	console.log(fname);
	var femail=req.body.email;
	console.log(femail);
	var num=req.body.mobileno;
	console.log(num);
	var gen=req.body.gender;
	console.log(gen);
	var add=req.body.address;
	console.log(add);
	res.redirect("/");
	
});


module.exports = router;
