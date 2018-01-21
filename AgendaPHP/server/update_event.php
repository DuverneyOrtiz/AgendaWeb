<?php
 
  require('lib.php');

  $con = new ConectorBD();

  if ($con->initConexion()=='OK') {
  	
    $datos['F_Inicio'] = "'".$_POST['start_date']."'";
   
    

    if($_POST['end_date']!='NULL'){
      //$datos['H_Inicio'] = "'".$_POST['start_hour']."'";
      $datos['F_Final'] = "'".$_POST['end_date']."'";    
      //$datos['H_Final'] = "'".$_POST['end_hour']."'";

    }

    $condicion="id_evento='".$_POST['id']."'";

    if ($con->actualizarRegistro('evento', $datos, $condicion)) {
      	$resp['msg']='OK';
		echo json_encode($resp);
    }else echo mysqli_error($con->getConexion());


    $con->cerrarConexion();

  }else {
    echo "Se presentó un error en la conexión";
  }


 ?>
