<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>审核论文</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/evaluate.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
	 
</head>
<body>
	<?php
		error_reporting(E_ALL^E_NOTICE^E_WARNING); 
		//$content = $_POST['thesisContent'];
		$thesisNum = $_GET['thesisNum'];
		$username = $_SESSION['username'];
		$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
		$mysql->query("set names utf8");
		$sql="update thesis set voteCount = voteCount+1 where number = '$thesisNum'";
		$sql1="update thesis set agreeVotes = agreeVotes+1 where number = '$thesisNum'";
		$sql2="update $username set status = 'voted' where thesisNum = '$thesisNum'";
		$query=$mysql->query($sql);
		$query1=$mysql->query($sql1);
		$query2=$mysql->query($sql2);	 
		if ($query && $query1 && $query2) {
		 	echo "<div class='notice'>";
			echo "<div>审核成功</div>";
			echo "<div><a href='./voteThesis.php'>返回需要我审核的论文页</a></div>";
			echo "</div>";
		}
		else {
			echo "<div class='notice'>";
			echo "<div>审核失败</div>";
			echo "<div><a href='./voteThesis.php'>返回重新审核</a></div>";
			echo "</div>";
		}	 
			
	?>
</body>
</html>