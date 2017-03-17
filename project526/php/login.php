<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>用户登录</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/login.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$username = $_POST['username'];
		$password = $_POST['password'];
	 	if ($username == '' || $password == '') {
	 		echo "<div class='notice'>";
			echo "<div>请输入用户名和密码</div>";
			echo "<div><a href='./index.php'>返回重新登录</a></div>";
			echo "</div>";
	 	}
		else {
			$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error()); 
			$sql="select * from users where username='$username' and password='$password' ";
			$query=$mysql->query($sql);
			$num=mysqli_num_rows($query);
		 	$row=mysqli_fetch_array($query);
		 	if ($num) { 
			    $_SESSION['username']=$username;
			    $_SESSION['userType']=$row['userType'];
				echo "<div class='notice'>";
				echo "<div>登录成功</div>";
				echo "<div><a href='./index.php'>返回主页</a></div>";
				echo "</div>";
				
		    }
			else {
				echo "<div class='notice'>";
				echo "<div>用户名或密码错误</div>";
				echo "<div><a href='./index.php'>返回重新登录</a></div>";
				echo "</div>";
			}
		}
	?>
</body>
</html>