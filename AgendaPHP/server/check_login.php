<?php
session_start();
$connect=mysqli_connect('localhost', 'root','');
mysqli_select_db($connect,'eventos');

$user="'".$_POST['username']."'";
$pw="'".$_POST['password']."'";

$sql=$connect->query("SELECT id, correo, pw FROM usuario WHERE correo=$user;");
if($sql->num_rows>0){
  $result=$sql->fetch_assoc();

  if(password_verify($_POST['password'], $result['pw'])){
    $_SESSION['id_user']=$result['id'];
    $response['msg']=true;

    echo json_encode($response);
  }else{
  	$response['msg']=false;
  	$response['mensaje']='Validacion incorrecta, inetentelo de Nuevo';
    echo json_encode($response);
  }
}else{
  echo "No hay registros";
}


 ?>
