<?php
session_start();
  require('lib.php');

$id_evento=$_POST['id'];
$id_usuario=$_SESSION['id_user'];

  $con = new ConectorBD();


  if ($con->initConexion()=='OK') {

   

    if ($con->eliminarEvento($id_evento,$id_usuario)) {
       $resp['msg']='OK';
		echo json_encode($resp);
    }else echo mysqli_error($con->getConexion());

    $con->cerrarConexion();

  }else {
    echo "Se presentó un error en la conexión";
  }



 ?>
