<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>发布评论</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/sendNotifierPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$username = $_SESSION['username'];
		$content=$_POST['commentContent'];
		$date = date("Y-m-d");
		$thesisNum = $_GET['thesisNum'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="select * from thesisComments ORDER BY number DESC limit 1";
		$query=$mysql->query($sql);
		$row=mysqli_fetch_array($query);
		$number = $row['number'];
		$newNum = $number + 1;
		$sql1="insert into thesisComments(number,commentUser,commentDate,commentContent,thesisNum) values('$newNum','$username','$date','$content','$thesisNum')";
		$query1=$mysql->query($sql1);	 
		if ($query1) {
		 	echo "<div class='notice'>";
			echo "<div>发布成功</div>";
			echo "<div><a href='./thesisDetail.php?thesisNum=$thesisNum'>进入该论文详情页查看查看</a></div>";
			echo "</div>";

		}
		else {
			echo "<div class='notice'>";
			echo "<div>发布失败</div>";
			echo "<div><a href='../html/sendNotifier.html'>返回重新发布</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>