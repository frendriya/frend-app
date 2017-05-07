var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Setup View Engines
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Serve files from your "bower_components" directory
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));

// Serve files from your "public" directory
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.sendFile('./views/index.html', {"root": __dirname});
})

app.post('/authenticate', function(req, res) {
var result = validateCredentials(req.body.username,req.body.password);
if(result == 1){
return res.status(400).send({
   message: 'User doesnt exist!!',
   code:false
});
}
else if(result == 2){
	return res.status(200).send({
   message: 'Successfully logged in!',
   code:true
});
}
else{
return res.status(400).send({
   message: 'Wrong Password!',
   code:false
});
}
});


app.post('/createUser', function(req, res) {
	if(req.body.username == null){
	return res.status(400).send({
   message: 'Username, Password, Email are mandatory to create an user!',
   code:false
});
}
else if(validateUsernamecreateUser(req.body.username,req.body.password,req.body.email)){
	return res.status(200).send({
   message: 'User Successfully Created.. Please log in to Continue..',
   code:true
});
}else{
return res.status(400).send({
   message: 'User already exists!! Please choose another username!!',
   code:false
});
}
});

app.post('/save', function(req, res) {
	if(req.body.data == null){
	return res.status(400).send({
   message: 'Username, Password, Email are mandatory to create an user!',
   code:false
});
}
else{
	save(req.body.data);
return res.status(200).send({
   message: 'User already exists!! Please choose another username!!',
   code:false
});
}
});

// Start our server and start to listen
app.listen(process.env.PORT || 3000, function() {
  console.log('listening');
});


function validateCredentials(username,password) {
var fileName = './user.json';
var content = fs.readFileSync("user.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
	if(!keysArray.includes(username) ){
	return 1;
	}
	else if (keysArray.includes(username)){
	var pos = (keysArray.indexOf(username));
	if(jsonContent[keysArray[pos]][0].username == username && jsonContent[keysArray[pos]][0].password == password){
		jsonContent[keysArray[pos]][0].lastLoginTime = Math.round(new Date().getTime()/1000);
		fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
	 	 });
		return 2;
	} else { 
		return 3; 
	}

}
}

function validateUsernamecreateUser(username,password,email) {
var fileName = './user.json';
var content = fs.readFileSync("user.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
	if(!keysArray.includes(username) ){
	jsonContent[username]  = [{
      "username": username,
      "password": password,
      "email": email,
      "lastLoginTime": ""
    }];
	fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
		 });
	return true;
	}
	else{
		return false;
	}
}

function save(data) {
var fileName = './data.json';
var content = fs.readFileSync("data.json");
var jsonContent = JSON.parse(content);
var keysArray = Object.keys(jsonContent);
	console.log([keysArray[0]][0].CountdownTimer);
		jsonContent[keysArray[0]][0].CountdownTimer = data;
		fs.writeFile(fileName, JSON.stringify(jsonContent,null,2), function (err) {
		if (err) return console.log(err);
	 	 });
}