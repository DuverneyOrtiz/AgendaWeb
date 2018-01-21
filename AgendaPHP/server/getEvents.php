<?php
session_start();
$id_usuario=$_SESSION['id_user'];

require('../server/lib.php');

$con 	=	new ConectorBD();

if($con->initConexion()=='OK'){
	
	$result=$con->obtenerEventos($id_usuario);
	$rows=array();

	while($r=mysqli_fetch_assoc($result)){
		$rows[]=$r;
	}

	$php_response=array("msg"=>"OK", "eventos"=>$rows);
	echo json_encode($php_response);

	$con->cerrarConexion();
}else{
	echo "Se presentó un error en la conexión";
}

	


 ?>


