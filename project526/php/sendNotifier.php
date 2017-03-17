<!DOCTYPE html>
<html>
<head>
	<title>发布通知</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/sendNotifierPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$title = $_POST['notifierTitle'];
		$meeting = $_POST['notifierMeeting'];
		$content=$_POST['notifierContent'];
		$date = date("Y-m-d");
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="select * from meetings where name = '$meeting'";
		$query=$mysql->query($sql);
		$row=mysqli_fetch_array($query);
		$meetingNumber = $row['number'];
		$sql1="select * from notifiers ORDER BY number DESC limit 1";
		$query1=$mysql->query($sql1);
		$row1=mysqli_fetch_array($query1);
		$number = $row1['number'];
		$newNum = $number + 1;
		$sql2="insert into notifiers(number,meetingNum,title,content,releaseTime) values('$newNum','$meetingNumber','$title','$content','$date')";
		$query2=$mysql->query($sql2);	 
		if ($query2) {
		 	echo "<div class='notice'>";
			echo "<div>发布成功</div>";
			echo "<div><a href='./notifiers.php'>进入通知列表页查看</a></div>";
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