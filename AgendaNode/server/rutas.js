const Router=require('express').Router();
const Users	=	require('./modeloUsuarios.js')
const Eventos=	require('./modeloEventos.js')

Router.post('/login', function(req, rest){
	let usuario=req.body.user;
	let pass=req.body.pass;

	Users.findOne({usuario:usuario, password:pass}, function(err, user){
		if(err){
			rest.status(500)
			rest.json(err)
		}
		else{
				if(user){
					req.session.user_id=user._id;
					rest.send('Validado')

				}else{rest.send('invalidado')}
		}
	})

})

Router.get('/events/all', function(req, rest){

		
        Eventos.find({id_user:req.session.user_id},{'id':1, "title":1,"start":1, "end":1}).exec(function(error,docs){
        	rest.send(docs)
        })


       
})

Router.post('/events/new', function(req, rest){
		
	let Evento=new Eventos({
		id:'NULL',
		title  :req.body.title,
		start  :req.body.start,
		end    :req.body.end,
		start_hour:req.body.start_hour,
		end_hour:req.body.end_hour,
		allDay  :req.body.allDay,
		id_user:req.session.user_id
	})

	Evento.save(function(erro){
		if(erro){
			rest.send("Error al guardar: "+erro)
		}else{
			let idE=Evento._id;
			

			Eventos.update({_id:Evento._id},{$set:{id:idE}},function(error, obj){
				if(error){
					console.log(error)
				}else{
					 Eventos.find({_id:Evento._id},{'id':1, "title":1,"start":1, "end":1, "_id":0}).exec(function(error,docs){
					 	console.log(docs)
			        	rest.send(docs)
			        })
				}
			})
			//rest.send("Los Datos se han Guardado con éxito.");
		}
	})

})

Router.post('/events/delete/:id', function(req, rest){

	Eventos.remove({id:req.body.id}, function(error){
		if(error){
			console.log(error)
		}else{
			rest.send('El evento se ha eliminado')
		}
	})
})

Router.post('/events/update', function(req, rest){
	
	let idEvento=req.body.id
	let startE=req.body.start
	let endE=req.body.end
	
	Eventos.findOne({id:idEvento}, function(error, evento){
		if(error){
			console.log(error)
		}else{
			if(evento.start_hour=='' && evento.end_hour==''){
				hour_startE=startE
				updateEve={$set:{start:hour_startE}}
				

			}
			else{
					hour_startE=startE+'T'+evento.start_hour+'Z'
					hour_end=endE+'T'+evento.end_hour+'Z'
					updateEve={$set:{
							start:hour_startE,
							end:hour_end
						}}

						
			}	
			
			Eventos.update({id:idEvento},updateEve,function(){
				if(error){
					rest.send(error)
				}else{
					rest.send('Se ha Actualizado el Evento')
				}
			})
		}
	})
})

Router.post('/events/logout', function(req, rest){
	req.session.destroy();

	rest.send('saliendo')
})

module.exports	=	Router;