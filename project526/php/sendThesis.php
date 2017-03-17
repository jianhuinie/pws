<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>发布论文</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../css/sendThesisPhp.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING);
		$title = $_POST['thesisTitle'];
		$thesisMeeting = $_POST['thesisMeeting'];
		$content=$_POST['thesisMeeting'];
		$date = date("Y-m-d");
		$username = $_SESSION['username'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="select * from meetings where name = '$thesisMeeting'";
		$query=$mysql->query($sql);
		$row = mysqli_fetch_array($query);
		$meetingNum = $row['number'];
		$sql1="select * from thesis ORDER BY number DESC limit 1";
		$query1=$mysql->query($sql1);
		$row1 = mysqli_fetch_array($query1);
		$number = $row1['number'];
		$thesisNum = $number + 1;
		$sql2="insert into thesis(number,meetingNum,title,content,releaseTime,username,agreeVotes,voteCount) values('$thesisNum','$meetingNum','$title','$content','$date','$username','0','0')";
		$query2=$mysql->query($sql2);
		$sql3 = "select * from  voter1 ORDER BY number DESC LIMIT 1";
		$query3=$mysql->query($sql3);
		$row3 = mysqli_fetch_array($query3);
		$number = $row3['number'];
		$newNum = $number + 1;
		$sql4 = "insert into voter1(number,thesisNum,status) values('$newNum','$thesisNum','prevote')";	
		$query4=$mysql->query($sql4);
		$sql5 = "insert into voter2(number,thesisNum,status) values('$newNum','$thesisNum','prevote')";	
		$query5=$mysql->query($sql5); 
		$sql6 = "insert into voter3(number,thesisNum,status) values('$newNum','$thesisNum','prevote')";	
		$query6=$mysql->query($sql6); 
		$sql7 = "insert into voter4(number,thesisNum,status) values('$newNum','$thesisNum','prevote')";	
		$query7=$mysql->query($sql7); 
		$sql8 = "insert into voter5(number,thesisNum,status) values('$newNum','$thesisNum','prevote')";	
		$query8=$mysql->query($sql8);  
		if ($query2 && $query4 && $query5 && $query6 && $query7 &&$query8 ) {
		 	echo "<div class='notice'>";
			echo "<div>发布成功</div>";
			echo "<div><a href='./myThesis.php'>进入我的论文查看</a></div>";
			echo "</div>";
		}
		else {
			echo "<div class='notice'>";
			echo "<div>发布失败</div>";
			echo "<div><a href='../html/sendThesis.html'>返回重新发布</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>