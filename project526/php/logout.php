<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>注销登录</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/logout.less" type="text/less">
	<script type="text/javascript" src="../lib/less.js"></script>
</head>
<body>
	<?php
		session_destroy();
		echo "<div class='notice'>";
		echo "<div>您已注销登录</div>";
		echo "<div><a href='./index.php'>返回主页</a></div>";
		echo "</div>";
	?>
</body>
</html>