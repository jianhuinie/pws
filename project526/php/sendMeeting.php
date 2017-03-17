<!DOCTYPE html>
<html>
<head>
	<title>发布新闻</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/sendMeetingPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$meetingName = $_POST['meetingName'];
		$englishName = $_POST['englishName'];
		$meetingSubject=$_POST['meetingSubject'];
		$beginTime = $_POST['beginTime'];
		$endTime = $_POST['endTime'];
		$place=$_POST['place'];
		$holder = $_POST['holder'];
		$thesisDeadline = $_POST['thesisDeadline'];
		$chairman = $_POST['chairman'];
		$orgChairman=$_POST['orgChairman'];
		$proChairman = $_POST['proChairman'];
		$contacter = $_POST['contacter'];
		$telphone=$_POST['telphone'];
		$email = $_POST['email'];
		$address = $_POST['address'];
		$website=$_POST['website'];
		$bgIntro = $_POST['bgIntro'];
		$thesisRequest=$_POST['thesisRequest'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="select * from meetings ORDER BY number DESC limit 1";
		$query=$mysql->query($sql);
		$row = mysqli_fetch_array($query);
		$number = $row['number'];
		$newNum = $number + 1;
		$sql1="insert into meetings(number,name,englishName,subject,beginTime,endTime,place,holder,thesisDeadline,chairman,orgChairman,proChairman,contacter,telphone,email,address,website,bgIntro,thesisRequest) values('$newNum','$meetingName','$englishName','$meetingSubject','$beginTime','$endTime','$place','$holder','$thesisDeadline','$chairman','$orgChairman','$proChairman','$contacter','$telphone','$email','$address','$website','$bgIntro','$thesisRequest')";
		$query1=$mysql->query($sql1);	 
		if ($query1) {
		 	echo "<div class='notice'>";
			echo "<div>发布成功</div>";
			echo "<div><a href='./meetings.php'>进入会议列表页查看</a></div>";
			echo "</div>";
		}
		else {
			echo "<div class='notice'>";
			echo "<div>发布失败</div>";
			echo "<div><a href='../html/sendMeeting.html'>返回重新发布</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>