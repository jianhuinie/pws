<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>哈尔滨工程大学计算机学术会议</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/index.less" type="text/less">
	<link rel="stylesheet" type="text/css" href="../lib/bootstrap.css">
	<script type="text/javascript" src="../lib/jquery-1.12.2.min.js"></script>
	<script type="text/javascript" src="../js/logoSlide.js"></script>
	<script type="text/javascript" src="../js/toTop.js"></script>
	<script type="text/javascript" src="../lib/less.js"></script>
	<script type="text/javascript" src="../lib/bootstrap.js"></script>
	
</head>
<body>
	<div id="container">
		<div id="box">
			<div id="myCarousel" class="carousel slide">
				<div class="carousel-inner">
				    <div class="active item">
				    	 <img src="../pics/logo.jpg"> 
				    </div>
				    <div class="item">
				    	 <img src="../pics/logo1.jpg"> 
				    </div>
				    <div class="item">
				    	 <img src="../pics/logo2.jpg"> 
				    </div>
				</div>
			</div>
			<div id="nav">
					 <a href="index.php" class="active">首页</a>
					 <a href="news.php">会议新闻</a> 
					 <a href="notifiers.php">会议通知</a> 
					 <a href="meetings.php">会议预告</a> 
				 	 <a href="videos.php">会议视频</a> 
					 <a href="articles.php">会议论文</a>
					 <a href="comments.php">会议评述</a>
					 <a href="experience.php">经验交流</a>
					 <a href="specialReports.php">特邀报告</a>
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
					<!--
					<div id="login-form">
						<div id="title"> 用户登录 </div>
						<form method="post" action="./login.php">
							<input type="text" id="username" name="username" placeholder="用户名">
							<input type="password" id="password" name="password" placeholder="密码">
							<input type="submit" id="login" value="登录">
							<a href="../html/register.html" id="setup">注册</a>
						</form>
					</div>-->
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
					<div id="innerbox">
						<div id="news">
							<p id="title">会议新闻</p>
							<a href="news.php" id="more">更多>>></a>
							<?php
							    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from news ORDER BY releaseTime DESC LIMIT 4";
								$query=$mysql->query($sql);
								while($row=mysqli_fetch_array($query)) {
									$num = $row['number'];
									echo "<div><a href='./newsDetail.php?newsNum=$num'>".$row['title']."</a></div>";
								}		 
							?>
						</div>
						<div id="notifiers">
							<p id="title">会议通知</p>
							<a href="notifiers.php" id="more">更多>>></a>
							<?php
							    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from notifiers ORDER BY releaseTime DESC LIMIT 4";
								$query=$mysql->query($sql);
								while($row=mysqli_fetch_array($query)) {
									$num = $row['number'];
									echo "<div><a href='./notifierDetail.php?notifierNum=$num'>".$row['title']."</a></div>";
								}		 
							?>
						</div>
						<div id="clearfix"></div>
					</div>
					<div id="meetings">
						<div id="title">会议预告</div>
						<a href="meetings.php" id="more">更多>>></a>
						<table class="table table-striped">
							<thead>
								<td>课题方向</td>
								<td>会议名称</td>
								<td>会议时间</td>
								<td>会议地点</td>
								<td>论文截止日期</td>
							</thead>
							<tbody>
								<?php
								    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
									$mysql->query("set names utf8");
									$sql="select * from meetings ORDER BY beginTime DESC LIMIT 4";
									$query=$mysql->query($sql);
									while($row=mysqli_fetch_array($query)) {
										$num = $row['number'];
										echo "<tr><td>".$row['subject']."</td>";
										echo "<td>"."<a href='./meetingDetail.php?meetingNum=$num' >".$row['name']."</a></td>";
										echo "<td>".$row['beginTime']."</td>";
										echo "<td>".$row['place']."</td>";
										echo "<td>".$row['thesisDeadline']."</td></tr>";
									}		 
								?>
							</tbody>
						</table>
					</div>
					<div id="meeting-comments">
						<div id="title">会议评述</div>
						<a href="comments.php" id="more">更多>>></a>
						<table class="table table-striped">
							<thead>
								<td>所属会议</td>
								<td>文章标题</td>
								<td>发布时间</td>
							</thead>
							<tbody>
								<?php
							 	 	error_reporting(E_ALL^E_NOTICE^E_WARNING);
								    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
									$mysql->query("set names utf8");
									$sql="select * from comments ORDER BY releaseTime DESC LIMIT 4";
									$query=$mysql->query($sql);
									while($row=mysqli_fetch_array($query)) {
										$num = $row['number'];
										$meetingNum = $row['meetingNum'];
										$sql1 = $sql="select * from meetings where number='$meetingNum'";
										$query1=$mysql->query($sql1);
										$row1=mysqli_fetch_array($query1);
										//$meeting = $row1['title'];
										echo "<tr><td>"."<a href='meetingDetail.php?meetingNum=$meetingNum'>".$row1['name']."</td><td><a href='commentDetail.php?commentNum=$num'>".$row['articleName']."</a></td><td>".$row['releaseTime']."</td></tr>";
									}		 
								?>
							</tbody>
						</table>
					</div>
					<div id="special-reports">
						<div id="title">特邀报告</div>
						<a href="specialReports.php" id="more">更多>>></a>
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
								    $mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
									$mysql->query("set names utf8");
									$sql="select * from specialreports ORDER BY time DESC LIMIT 4";
									$query=$mysql->query($sql);
									while($row=mysqli_fetch_array($query)) {
										$num = $row['number'];
										echo  "<tr><td><a href='reportDetail.php?reportNum=$num'>".$row['title']."</a></td><td>".$row['speaker']."</td><td>".$row['totalTime']."</td><td>".$row['subject']."</td><td>".$row['time']."</td></tr>";
									}		 
								?>
							</tbody>
						</table>
					</div>
					<div id="videos">
						<p id="title">热点视频</p>
						<a href="videos.php" id="more">更多>>></a>
						<div id="listLeft">
							<div class="item">
								<a href="./videoDetail.php?videoNum=1" class="videoPlay">
								 	<img src="../pics/videoPlay.png">
								</a>
								<div class="photo">
									<img src="../pics/videos/video1.jpg">
								</div>
								<div class="detail">
									<div><a href="./meetingDetail.php?meetingNum=1">第五届中国服务贸易年会 </a></div>
									<div>会议时间：2015-12-23</div>
									<div><p>主办单位: 中国服务贸易协会专家</p></div>
									<div class="palyButton">
										<a href="./videoDetail.php?videoNum=1">视频播放</a>
									</div>
								</div>
								<div class="clear"></div>
							</div>
							<div class="item">
								<a href="./videoDetail.php?videoNum=2" class="videoPlay">
								 	<img src="../pics/videoPlay.png">
								</a>
								<div class="photo">
									<img src="../pics/videos/video2.jpg">
								</div>
								<div class="detail">
									<div><a href="./meetingDetail.php?meetingNum=2">第五届中国服务贸易年会 </a></div>
									<div>会议时间：2015-12-23</div>
									<div><p>主办单位: 中国服务贸易协会专家</p></div>
									<div class="palyButton">
										<a href="./videoDetail.php?videoNum=2">视频播放</a>
									</div>
								</div>
							</div>
						</div>
						<div id="listRight">
							<div class="item">
								<a href="./videoDetail.php?videoNum=3" class="videoPlay">
								 	<img src="../pics/videoPlay.png">
								</a>
								<div class="photo">
									<img src="../pics/videos/video3.jpg">
								</div>
								<div class="detail">
									<div><a href="./meetingDetail.php?meetingNum=3">第五届中国服务贸易年会 </a></div>
									<div>会议时间：2015-12-23</div>
									<div><p>主办单位: 中国服务贸易协会专家协会</p></div>
									<div class="palyButton">
										<a href="./videoDetail.php?videoNum=3">视频播放</a>
									</div>
								</div>
							</div>
							<div class="item">
								<a href="./videoDetail.php?videoNum=4" class="videoPlay">
								 	<img src="../pics/videoPlay.png">
								</a>
								<div class="photo">
									<img src="../pics/videos/video4.jpg">
								</div>
								<div class="detail">
									<div><a href="./meetingDetail.php?meetingNum=4">第五届中国服务贸易年会 </a></div>
									<div>会议时间：2015-12-23</div>
									<div><p>主办单位: 中国服务贸易协会专家</p></div>
									<div class="palyButton">
										<a href="./videoDetail.php?videoNum=4">视频播放</a>
									</div>
								</div>
							</div>
						</div>
						<div id="clearfix"></div>
					</div>
				</div>
				<div id="clear"></div>
			</div>
			<div id="toTop">
				
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