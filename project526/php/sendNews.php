<!DOCTYPE html>
<html>
<head>
	<title>发布新闻</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/sendNewsPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$title = $_POST['newsTitle'];
		$subject = $_POST['newsSubject'];
		$content=$_POST['newsContent'];
		$date = date("Y-m-d");
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="select * from news ORDER BY number DESC limit 1";
		$query=$mysql->query($sql);
		$row = mysqli_fetch_array($query);
		$number = $row['number'];
		$newNum = $number + 1;
		$sql1="insert into news(number,subject,title,content,releaseTime) values('$newNum','$subject','$title','$content','$date')";
		$query1=$mysql->query($sql1);	 
		if ($query1) {
		 	echo "<div class='notice'>";
			echo "<div>发布成功</div>";
			echo "<div><a href='./news.php'>进入新闻列表页查看</a></div>";
			echo "</div>";
		}
		else {
			echo "<div class='notice'>";
			echo "<div>发布失败</div>";
			echo "<div><a href='../html/sendNews.html'>返回重新发布</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>