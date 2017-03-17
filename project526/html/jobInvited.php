<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>会议在线公告</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/jobInvited.less" type="text/less">
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
					 <a href="../php/index.php">首页</a>
					 <a href="../php/news.php">会议新闻</a> 
					 <a href="../php/notifiers">会议通知</a> 
					 <a href="../php/meetings.php">会议预告</a> 
				 	 <a href="../php/videos.php">会议视频</a> 
					 <a href="../php/articles.php">会议论文</a>
					 <a href="../php/comments.php">会议评述</a>
					 <a href="../php/experience.php">经验交流</a>
					 <a href="../php/specialReports.php">特邀报告</a>
			</div>
			<div id="content">
				<div id="content-left">
					<?php
						if (!isset($_SESSION['username'])) {
							echo "<div id='login-form'>
							<div id='title'> 用户登录 </div>
							<form method='post' action='../php/login.php'>
								<input type='text' id='username' name='username' placeholder='用户名''>
								<input type='password' id='password' name='password' placeholder='密码''>
								<input type='submit' id='login' value='登录'>
								<a href='./register.html' id='setup'>注册</a>
							</form>
							</div>";	 
						}
						elseif ($_SESSION['userType'] == 'commonUser'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='./changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='./sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='../php/myThesis.php'>我的论文</a></div>
							 <div class='item'><a href='../php/logout.php'>注销登录</a></div>
							</div>";
						}
						elseif ($_SESSION['userType'] == 'voter'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='./changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='./sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='../php/myThesis.php'>我的论文</a></div>
							  <div class='item'><a href='../php/voteThesis.php'>需要我审核的论文</a></div>
							 <div class='item'><a href='../php/logout.php'>注销登录</a></div>
							</div>";
						}
						else {
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='./changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='./sendNews.html'>发布新闻</a></div>
							 <div class='item'><a href='./sendNotifier.html'>发布通知</a></div>
							 <div class='item'><a href='./sendMeeting.html'>发布会议</a></div>
							 <div class='item'><a href='../php/logout.php'>注销登录</a></div>
							</div>";
						}	
					?>
					<div id="notices">
						<p id="title">学术会议在线公告</p>
						<div id="rules">
							<a href="rules.php">1.国际学术会议信息发布规则</a>
						</div>
						<div id="job-invited">
							<a href="jobInvited.php">2.国际学术会议兼职信息员招聘启事</a>
						</div>
						<div id="lectures">
							<a href="lectures.php">
								3.高校学术讲座交流平台开通,欢迎使用！
							</a>
						</div>
						<div id="new-version">
							<a href="newVersion.php">
								4.教育部科技发展中心门户网站新版上线公告 
							</a>
						</div>
					</div>
					<div id="tips">
						<div id="online-intro">
							<a href="onlineIntro.php">在线介绍</a>
						</div>
						<div id="users-guide"><a href="usersGuide.php">用户指南</a></div>
						<div id="friend-links">
							<a href="friendLinks.php">友情链接</a>
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
						<li>
							<a href="../php/index.php">学术会议在线公告</a> <span class="divider">/</span>
						</li>
						<li class="active">国际学术会议兼职信息员招聘启事</li>
					</ul>
					<div id="myCarousel" class="carousel slide">
						<div class="carousel-inner">
						    <div class="active item">
						    	<a href="http://www.baidu.com/" target="_blank"><img src="../pics/pic1.jpg"></a> 
						    </div>
						    <div class="item">
						    	<a href="http://www.baidu.com/" target="_blank"><img src="../pics/pic1.jpg"></a>
						    </div>
						    <div class="item">
						    	<a href="http://www.baidu.com/" target="_blank"><img src="../pics/pic1.jpg"></a> 
						    </div>
						</div>
					</div>
					<div id="title">国际学术会议兼职信息员招聘启事</div>
					<hr>
					<div id="date">日期：2016-3-27</div>
					<div id="texts">
						<p>
							“中国学术会议在线”（www.meeting.edu.cn）是经教育部批准、教育部科技发展中心主办的公益性学术网站。因业务发展需要，现面向国内高校以及中科院系统招聘兼职信息员。
						</p>
						<h4>应聘要求：</h4>
						<p>
							1、应聘人员应为高校或中科院在读硕士或博士研究生；
						</p>
						<p>
							2、专业文科最佳，有理工科背景，如科技哲学、情报学、图书馆学、信息管理、知识管理等相关领域；
						</p>
						<p>
							3、有参与学术会议交流的经验；
						</p>
						<p>
							4、关注本学科及相关研究领域的国内外学术交流动态，视野开阔，信息资源丰富；
						</p>
						<p>
							5、有一定的课余时间，责任心强，能够连续工作一年以上。
						</p>
						<div id="contact">
							请有意者将个人简历发至 scimeet@yahoo.com 或 meeting@cutech.edu.cn
						</div>
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