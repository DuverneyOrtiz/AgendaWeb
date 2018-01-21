const 	http=require('http'),
		path=require('path'),
		session=require('express-session'),
		Routing=require('./rutas.js'),
		express=require('express'),
		bodyParser=require('body-parser'),
		mongoose=require('mongoose'),
		usuarios=require('./modeloUsuarios.js');

mongoose.connect('mongodb://localhost/FullCallendario')
const PORT=8082;
const app=express();

const server=http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('../client'))

app.use(session({
	secret:"123ufjflrfmmr87653c",
	resave:false,
	saveUninitialized:false
}))

app.use('/users', Routing)

server.listen(PORT, function(){
	console.log('Server is listening on port: '+PORT);

	usuario=new usuarios({
		usuario:'Duverney',
		password:'123456'
	})

	usuario.save(function(error){
		if(error)console.log(error)
	})

	usuario=new usuarios({
		usuario:'Pedro',
		password:'123456'
	})

	usuario.save(function(error){
		if(error)console.log(error)
	})

	usuario=new usuarios({
		usuario:'Maria',
		password:'123456'
	})

	usuario.save(function(error){
		if(error)console.log(error)
	})


})