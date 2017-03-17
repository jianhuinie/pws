<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>会议特邀报告</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/specialReports.less" type="text/less">
	<link rel="stylesheet" type="text/css" href="../lib/bootstrap.css">
	<script type="text/javascript" src="../lib/jquery-1.12.2.min.js"></script>
	<script type="text/javascript" src="../common/showPics.js"></script>
	<script type="text/javascript" src="../lib/less.js"></script>
	<script type="text/javascript" src="../lib/bootstrap.js"></script>
	
</head>
<body>
	<div id="container">
		<div id="box">
			<div id="logo">
				
			</div>
			<div id="nav">
					 <a href="index.php">首页</a>
					 <a href="news.php">会议新闻</a> 
					 <a href="notifiers.php">会议通知</a> 
					 <a href="meetings.php">会议预告</a> 
				 	 <a href="videos.php">会议视频</a> 
					 <a href="articles.php">会议论文</a>
					 <a href="comments.php">会议评述</a>
					 <a href="experience.php">经验交流</a>
					 <a href="specialReports.php" class="active">特邀报告</a>
			</div>
			<div id="content">
				<div id="content-left">
					<?php
						if (!isset($_SESSION['username'])) {
							echo "<div id='login-form'>
							<div id='title'> 用户登录 </div>
							<form method='post' action='./login.php'>
								<input type='text' id='username' name='username' placeholder='用户名''>
								<input type='password' id='password' name='password' placeholder='密码''>
								<input type='submit' id='login' value='登录'>
								<a href='../html/register.html' id='setup'>注册</a>
							</form>
							</div>";	 
						}
						elseif ($_SESSION['userType'] == 'commonUser'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../html/sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='./myThesis.php'>我的论文</a></div>
							 <div class='item'><a href='./logout.php'>注销登录</a></div>
							</div>";
						}
						elseif ($_SESSION['userType'] == 'voter'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../html/sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='./myThesis.php'>我的论文</a></div>
							  <div class='item'><a href='./voteThesis.php'>需要我审核的论文</a></div>
							 <div class='item'><a href='./logout.php'>注销登录</a></div>
							</div>";
						}
						else {
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../html/sendNews.html'>发布新闻</a></div>
							 <div class='item'><a href='../html/sendNotifier.html'>发布通知</a></div>
							 <div class='item'><a href='../html/sendMeeting.html'>发布会议</a></div>
							 <div class='item'><a href='./logout.php'>注销登录</a></div>
							</div>";
						}	
					?>
					<div id="notices">
						<p id="title">学术会议在线公告</p>
						<div id="rules">
							<a href="../html/rules.php">1.国际学术会议信息发布规则</a>
						</div>
						<div id="job-invited">
							<a href="../html/jobInvited.php">2.国际学术会议兼职信息员招聘启事</a>
						</div>
						<div id="lectures">
							<a href="../html/lectures.php">
								3.高校学术讲座交流平台开通,欢迎使用！
							</a>
						</div>
						<div id="new-version">
							<a href="../html/newVersion.php">
								4.教育部科技发展中心门户网站新版上线公告 
							</a>
						</div>
					</div>
					<div id="tips">
						<div id="online-intro">
							<a href="../html/onlineIntro.php">在线介绍</a>
						</div>
						<div id="users-guide"><a href="../html/usersGuide.php">用户指南</a></div>
						<div id="friend-links">
							<a href="../html/friendLinks.php">友情链接</a>
						</div>
						<div id="school-lectures">
							<a href="http://58.205.208.119/" target="_blank">高校讲座</a>
						</div>
						<div id="map-navigation">
							<a href="http://map.baidu.com/mobile/webapp/index/index" 
							target="_blank">
								地图导航
							</a>
						</div>
						<div id="book-hotel">
							<a href="http://hotel.qunar.com/" target="_blank">酒店预订</a>
						</div>
					</div>
				</div>
				<div id="content-right"> 
					<ul class="breadcrumb">
						<li>
							<a href="../php/index.php">首页</a> <span class="divider">/</span>
						</li>
						<li class="active">会议特邀报告</li>
					</ul>
					<div id="myCarousel" class="carousel slide">
						<div class="carousel-inner">
						    <?php
								$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from meetings ORDER BY beginTime DESC LIMIT 0,1";
								$sql1="select * from meetings ORDER BY beginTime DESC LIMIT 1,1";
								$sql2="select * from meetings ORDER BY beginTime DESC LIMIT 2,1";
								$query=$mysql->query($sql);
								$query1=$mysql->query($sql1);
								$query2=$mysql->query($sql2);
								$row=mysqli_fetch_array($query);
								$num = $row['number'];
								$row1=mysqli_fetch_array($query1);
								$num1 = $row1['number'];
								$row2=mysqli_fetch_array($query2); 
								$num2 = $row2['number'];
								echo "<div class='active item'>
						    		 <a href='meetingDetail.php?meetingNum=$num' target='_blank'><img src='../pics/pic1.jpg'></a></div>";
					    		echo "<div class='item'>
						    		 <a href='meetingDetail.php?meetingNum=$num1' target='_blank'><img src='../pics/pic1.jpg'></a></div>";
					    		echo "<div class='item'>
						    		 <a href='meetingDetail.php?meetingNum=$num2' target='_blank'><img src='../pics/pic1.jpg'></a></div>";
							?>
						</div>
					</div>
					<div id="texts">
						<div id="left">
							 <table class="table table-striped">
							<thead>
								<td>报告题目</td>
								<td>报告人</td>
								<td>报告时长</td>
								<td>所属学科</td>
								<td>报告时间</td>
							</thead>
							<tbody>
								<?php
							 	 	error_reporting(E_ALL^E_NOTICE^E_WARNING);
							 	 	$reportPage = $_GET['reportPage'];
								    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
									$mysql->query("set names utf8");
									if ($reportPage > 0) {
										$rangeDown = $reportPage*8;
										//$rangeUp = $rangeDown+8;
										$sql="select * from specialreports ORDER BY time DESC LIMIT $rangeDown,8";
									}
									else {
										$sql="select * from specialreports ORDER BY time DESC LIMIT 0,8";
									}
									$query=$mysql->query($sql);
									while($row=mysqli_fetch_array($query)) {
										$num = $row['number'];
										echo  "<tr><td><a href='reportDetail.php?reportNum=$num'>".$row['title']."</a></td><td>".$row['speaker']."</td><td>".$row['totalTime']."</td><td>".$row['subject']."</td><td>".$row['time']."</td></tr>";
									}		 
								?>
							</tbody>
						</table>
							<ul class="pager">
								<?php
									error_reporting(E_ALL^E_NOTICE^E_WARNING);
									$reportPage = $_GET['reportPage'];
									 $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
									$mysql->query("set names utf8");
									$sql="select * from specialreports ORDER BY time DESC";
									$query=$mysql->query($sql);
									$nums=mysqli_num_rows($query);
									$maxPage = $nums/8-1;
									if ($reportPage && $maxPage > 0) {
										if ($reportPage < $maxPage) {
											$prePage = $reportPage-1;
											$nextPage = $reportPage+1;
											$nextUrl = 'specialReports.php?reportPage='.$nextPage;
											$preUrl = 'specialReports.php?reportPage='.$prePage;
											echo "<li ><a href='$preUrl'>Previous</a></li>";
											echo "<li id='page'>第".(++$reportPage)."页</li>";
											echo "<li><a href='$nextUrl'>Next</a></li>";
										}
										else {
											$prePage = $reportPage-1;
											$preUrl = 'specialReports.php?reportPage='.$prePage;
											echo "<li><a href='$preUrl'>Previous</a></li>";
											echo "<li id='page'>第".(++$reportPage)."页</li>";
											echo "<li class='disabled'><a href='#'>Next
												 </a></li>";
											echo "<li>已是最后一页</li>";
										}
									}
									elseif (!$reportPage && $maxPage > 0) {
										$nextUrl = 'specialReports.php?reportPage=1';
										echo "<li class='disabled'><a href='#'>Previous</a></li>";
										echo "<li id='page'>第1页</li>";
										echo "<li><a href='$nextUrl'>Next</a></li>";
									 } 
									elseif (!$reportPage && $maxPage <= 0) {
								  		echo "<li class='disabled'><a href='#'>Previous</a></li>";
										echo "<li id='page'>第1页</li>";
										echo "<li class='disabled'><a href='#'>Next</a></li>";
										echo "<li>已是最后一页</li>";
									} 
									
								?>
							</ul>
						</div>
						<div id="right">
							<p id="title">特邀报告排行榜</p>
							<?php
								$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from specialreports ORDER BY time DESC LIMIT 15";
								$query=$mysql->query($sql);
								$count = 0;
								while($row=mysqli_fetch_array($query)) {
									$num = $row['number'];
									echo "<div class='listItem'><a href='reportDetail.php?reportNum=$num'>".(++$count).".".$row['title']."</a></div>";
								}
							?>
						</div>
						<div id="clearfix"></div>
					</div>
				</div>
				<div id="clear"></div>
			</div>
			<div id="footer">
				<p>
					主管：哈尔滨工程大学 主办：哈尔滨工程大学计算机学院 版权所有：哈尔滨工程大学聂建辉| 黑ICP备032310310号| 文保网安备案号：0472932882
				</p>
				<p>
					联系电话: 18746069058 | 15350185020 电子邮件: jianhuinie@hrbeu.edu.cn
				</p>
			</div>
		</div>
	</div>
</body>
</html>