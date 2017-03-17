<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>修改密码</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/changepswPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$originpsw = $_POST['originPassword'];
		$newPassword = $_POST['newPassword'];
		//$newPassword1 = $_POST['newPassword1'];
		$username=$_SESSION['username'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
	  	$mysql->query("set names utf8"); 
		$sql="select * from users where username='$username' and password='$originpsw'";
		$query=$mysql->query($sql);
		$num=mysqli_num_rows($query);
		if ($num == 1) {
			$sql1="update users set password='$newPassword' where username='$username'";
			$query1=$mysql->query($sql1);
			if ($query1) {
				session_destroy();
				echo "<div class='notice'>";
				echo "<div>修改密码成功</div>";
				echo "<div><a href='./index.php'>返回重新登录</a></div>";
				echo "</div>";
			}
			else {
				echo "<div class='notice'>";
				echo "<div>修改密码失败</div>";
				echo "<div><a href='../html/changepsw.html'>返回重新修改</a></div>";
				echo "</div>";
			}
	    }
		else {
			 
			echo "<div class='notice'>";
			echo "<div>原始密码不正确</div>";
			echo "<div><a href='../html/changepsw.html'>返回重新修改</a></div>";
			echo "</div>";
		}
	?>
</body>
</html>