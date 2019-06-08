var express = require('express');
var router = express.Router();
var moment=require('moment');
var nodemailer=require('nodemailer');
var randomstring=require('randomstring');                                     
var monk = require('monk');
var db = monk('localhost:27017/megha'); 
var collection = db.get('signup'); 
var collection1 = db.get('regform'); 
var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'uploads/' })        
console.log("connected");                                                    
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session && req.session.user){
      res.locals.user=req.session.user
      res.render('/homef');  		
	}
	else{
		req.session.reset();
		res.render('index');
	}
});

router.get('/changepwd', function(req, res, next) {
  res.render('changepwd');
});
router.post('/cp',function(req,res){
	console.log(req.body);
	collection.update({"pwd":req.body.oldPassword},{$set:{"pwd":req.body.newPassword}});
	res.redirect('/homef')
});
router.get('/forget', function(req, res, next) {
  res.render('forget');
});
router.get('/logout',function(req,res){
	req.session.reset();
	res.redirect('/')
});
router.post('/forpass',function(req,res){
    var email=req.body.email;
    console.log(email);
    collection.findOne({"email":req.body.email},function(err,docs){
    	if(docs){
    		console.log(docs);
        var otp=randomstring.generate(5);
    
    var msg="<html><head></head><body><b>"+otp+"</b></body></html>"
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
    port: 587,
    ssl: true,
  auth: {
    user: 'msssm0808@gmail.com',
    pass: '123meghana'
  }
});

var mailOptions = {
  from: 'msssm0808@gmail.com',
  to: req.body.email,
  subject: 'Successfully signed in',
  html:msg
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
collection.update({"email":email},{$set:{"pwd":otp}});
res.redirect("/");
}
 else{
    	console.log("email not found");
    	res.redirect("/forget");
    }
});
});
 // getting data from db to frontpage
router.get('/homef', function(req, res, next) {
	if(req.session && req.session.user){
      res.locals.user=req.session.user
	collection1.find({},function(err,docs){
		console.log(docs);
		res.locals.data=docs;        
		res.render('homef');    
	});
    }
    else{
    	res.redirect('/')
    }
});
//sending data to backend
router.post('/signup',function(req,res){
	  var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
    port: 587,
    ssl: true,
  auth: {
    user: 'msssm0808@gmail.com',
    pass: '123meghana'
  }
});

var mailOptions = {
  from: 'msssm0808@gmail.com',
  to: req.body.email,
  subject: 'Successfully signed in',
  text: 'Thanks for signing into our app'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
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
// to remove a documment
router.post('/remove',function(req,res){
	var id=req.body.no;
	console.log(id);
	collection1.remove({"rollno":id},function(err,docs){
		res.send(docs);
    });
});
// to edit a document
router.post('/edit',function(req,res){
	var id=req.body.no;
	console.log(id);
	collection1.find({"rollno":id},function(err,docs){
		res.send(docs);
    });

});
//to update a document
router.post('/update',function(req,res){
	// console.log(req.body.name);
 //    console.log(req.body.email);
 //    console.log(req.body.mobileno);
 //    console.log(req.body.gender);
 //    console.log(req.body.addres);
 //    console.log(req.body.college);
 //    console.log(req.body.rollno);
 //    console.log(req.body.branch);
	var data={
	 name:req.body.name,
	 email:req.body.email,
	 mobileno:req.body.mobileno,
	 gender:req.body.gender,
	 address:req.body.address,
	 college:req.body.college,
	 rollno:req.body.rollno,
	 branch:req.body.branch 
	}

	collection1.update({"rollno":req.body.rollno},{$set:data},function(err,docs){
     res.redirect("/homef");
});
});

//login functionality
router.post('/login',function(req,res){
	var name=req.body.name;
	console.log(name);
	var password=req.body.password;
	console.log(password);
    var logintime=moment().format('hh:mm:ss a');
    console.log(logintime);
    collection.update({"name":name},{$set:{"lastlogin":logintime}});
    collection.findOne({"name":name,"pwd":req.body.password },function(err,docs){
    	if(!docs){
    		console.log("mismatch");
    		res.render('index',{err:"invalid username or password"});
    	}
    	else if(docs){
    		console.log("success");
    		delete docs.password;
    		req.session.user=docs
    		res.redirect('/homef');
    	}
    	else{
    		console.log("error");
    	}
    });
});
//registrationform
router.post('/regform', upload.single('image'),function(req,res){
	console.log(req.file);
	var fname=req.body.name;
	console.log(fname);
	var email=req.body.email;
	console.log(email);
	var mobileno=req.body.mobileno;
	console.log(mobileno);
	var gender=req.body.gender;
	console.log(gender);
	var address=req.body.address;
	console.log(address);
    var college=req.body.college;
	console.log(college);
	var rollno=req.body.rollno;
	console.log(rollno);
	var branch=req.body.branch;
	console.log(branch);
	var image=req.file.originalname;
	collection1.insert({"image":image,"branch":branch,"rollno":rollno,"college":college,"name":fname,"email":email,"mobileno":mobileno,"gender":gender,"address":address
	
});
 res.redirect("/homef");
});

 module.exports = router;




