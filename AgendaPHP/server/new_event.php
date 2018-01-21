<?php
session_start();
$id_usuario=$_SESSION['id_user'];

require('../server/lib.php');

$con 	=	new ConectorBD();


$datos['titulo']="'".$_POST['titulo']."'";
$datos['F_Inicio']="'".$_POST['start_date']."'";
$datos['H_Inicio']="'".$_POST['start_hour']."'";
$datos['F_Final']="NULL";

if($_POST['allDay']!='true'){
	$datos['H_Inicio']="'".$_POST['start_hour']."'";
	$datos['F_Final']="'".$_POST['end_date']."'";
	$datos['H_Final']="'".$_POST['end_hour']."'";
	
}
$datos['EventoCompleto']="'".$_POST['allDay']."'";
$datos['id']=$id_usuario;


//echo $datos['titulo'].', '.$datos['F_Inicio'].', '.$datos['F_Final'].', '.$datos['H_Final'].', '.$H_Final.', '.$datos['EventoCompleto'];


if($con->initConexion()=='OK'){
	
	if($con->insertData('evento',$datos)){
		 $resp['msg']='OK';
		echo json_encode($resp);
	}else{
		echo 'Error: '.mysqli_error($con->getConexion());
	}	

	$con->cerrarConexion();
}else{
	echo "Se presentó un error en la conexión";
}
  


 ?>
