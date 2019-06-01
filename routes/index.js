var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/megha'); 
var collection = db.get('signup'); 
var collection1 = db.get('regform');          
console.log("connected");                                                    
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/homef', function(req, res, next) {
	collection1.find({},function(err,docs){
		console.log(docs);
		res.locals.data=docs;        
		res.render('homef');    
	});
  
});
router.post('/remove',function(req,res){
	var id=req.body.no;
	console.log(id);
	collection1.remove({"rollno":id},function(err,docs){
		res.send(docs);
    });
});

router.post('/signup',function(req,res){
	var data={
	name:req.body.name,
    email:req.body.email,
	mobileno:req.body.mobileno,
    gender:req.body.gender,
	address:req.body.address,
	pwd:req.body.password
    }
	collection.insert(data,function(err,data){
		if(err){
			console.log("error");
		}
		else{
			console.log(data);
		}
	});
	res.redirect("/");
});
router.post('/login',function(req,res){
	var name=req.body.name;
	console.log(name);
	var password=req.body.password;
	console.log(password);
    collection.findOne({"name":name,"pwd":req.body.password },function(err,docs){
    	if(!docs){
    		console.log("mismatch");
    		res.render('index',{err:"invalid username or password"});
    	}
    	else if(docs){
    		console.log("success");
    		res.redirect('/homef');
    	}
    	else{
    		console.log("error");
    	}
    });
});

router.post('/regform',function(req,res){
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
	var clz=req.body.college;
	console.log(clz);
	var roll=req.body.rollno;
	console.log(roll);
	var bran=req.body.branch;
	console.log(bran);
	collection1.insert({"branch":bran,"rollno":roll,"college":clz,"name":fname,"email":femail,"mobileno":num,"gender":gen,"address":add});
	res.redirect("/homef");
	
});


module.exports = router;
