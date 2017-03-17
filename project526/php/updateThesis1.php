<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>修改论文</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/updateThesis1.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING); 
		$content = $_POST['thesisContent'];
		$thesisNum = $_GET['thesisNum'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="update thesis set content = '$content' where number = '$thesisNum'";
		$query=$mysql->query($sql);	 
		if ($query) {
		 	echo "<div class='notice'>";
			echo "<div>修改成功</div>";
			echo "<div><a href='./myThesis.php'>进入我的论文查看</a></div>";
			echo "</div>";
		}
		else {
			echo "<div class='notice'>";
			echo "<div>发布失败</div>";
			echo "<div><a href='./updateThesis.php'>返回重新修改</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>