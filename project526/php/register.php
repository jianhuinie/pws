<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>用户注册</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/registerPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$username = $_POST['registerUsername'];
		$password = $_POST['registerPassword'];
		$repeatPassword = $_POST['repeatPassword'];
		$name = $_POST['name'];
		$gender = $_POST['gender'];
		$birthday = $_POST['birthday'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
	  	$mysql->query("set names utf8");
		$sql="select * from users where username='$username'";
		$query=$mysql->query($sql);
		$num=mysqli_num_rows($query);
		if ($num == 1) {
			echo "<div class='notice'>";
			echo "<div>该用户名已被注册</div>";
			echo "<div><a href='../html/register.html'>返回重新注册</a></div>";
			echo "</div>";
	    }
		else {
			$sql1="insert into users(username,password,name,gender,birthday,userType) values('$username','$password','$name','$gender','$birthday','commonUser')";
  			$query1=$mysql->query($sql1);
  			if ($query1) {
  				echo "<div class='notice'>";
				echo "<div>注册成功</div>";
				echo "<div><a href='./index.php'>返回主页登录</a></div>";
				echo "</div>";
  			}
		}
	?>
</body>
</html>