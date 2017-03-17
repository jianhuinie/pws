<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>小贴士</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/usersGuide.less" type="text/less">
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
						<li><a href="../php/index.php">首页</a> <span class="divider">/</span></li>
						<li class="active">用户指南</li>
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
					<div id="guidance">
						<div id="title">常见问题</div>
						<hr>
						<div class="qaa">
							<p>问：会议预告的发布收费吗？ </p>
							<p>答：我网站是公益性学术会议信息发布平台，单纯发布会议信息是不收费的。</p>
						</div>
						<div class="qaa">
							<p>问：怎样发布会议预告？ </p>
							<p>
								答：未在我网站注册的用户，可依照“注册成为办会用户”、“发布会议预告信息”（同时阅读信息发布规则）、“等待审核”的程序发布会议。已成为我网站会员的用户，可依照“会员升级”、“发布会议预告信息”（同时阅读信息发布规则）、“等待审核”的程序发布会议。详细方法请参考各部分详细说明。
							</p>
						</div>
						<div class="qaa">
							<p>问：会议视频为什么观看起来这么慢 </p>
							<p>
								答：由于中国学术会议在线的视频点播服务器设在教育网内，教育网与公网在物理网络上存在瓶 颈问题，因此非教育网用户观看中国学术会议在线的视频点播会比较慢，甚至会看不了。我 们也在努力增加公网带宽来便于非教育网用户观看视频。
							</p>
						</div>
						<div class="qaa">
							<p>问：本网站的视频可以下载吗？ </p>
							<p>
								答：对不起，由于视频报告的版权问题，本网站的视频不提供下载。
							</p>
						</div>
						<div class="qaa">
							<p>问：观看本网站的视频收费吗？ </p>
							<p>
								答：本网站观看视频是无需费用的。您只要注册会员用户。注册也是免费的。
							</p>
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