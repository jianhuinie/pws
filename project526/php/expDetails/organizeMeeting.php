<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>经验交流</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../../css/expDetails/organizeMeeting.less" 
	type="text/less">
	<link rel="stylesheet" type="text/css" href="../../lib/bootstrap.css">
	<script type="text/javascript" src="../../lib/jquery-1.12.2.min.js"></script>
	<script type="text/javascript" src="../../common/showPics.js"></script>
	<script type="text/javascript" src="../../lib/less.js"></script>
	<script type="text/javascript" src="../../lib/bootstrap.js"></script>
	
</head>
<body>
	<div id="container">
		<div id="box">
			<div id="logo">
				
			</div>
			<div id="nav">
					 <a href="../index.php">首页</a>
					 <a href="../news.php">会议新闻</a> 
					 <a href="../notifiers.php">会议通知</a> 
					 <a href="../meetings.php">会议预告</a> 
				 	 <a href="../videos.php">会议视频</a> 
					 <a href="../articles.php">会议论文</a>
					 <a href="../comments.php">会议评述</a>
					 <a href="../experience.php">经验交流</a>
					 <a href="../specialReports.php">特邀报告</a>
			</div>
			<div id="content">
				<div id="content-left">
					<?php
						if (!isset($_SESSION['username'])) {
							echo "<div id='login-form'>
							<div id='title'> 用户登录 </div>
							<form method='post' action='../login.php'>
								<input type='text' id='username' name='username' placeholder='用户名''>
								<input type='password' id='password' name='password' placeholder='密码''>
								<input type='submit' id='login' value='登录'>
								<a href='../../html/register.html' id='setup'>注册</a>
							</form>
							</div>";	 
						}
						elseif ($_SESSION['userType'] == 'commonUser'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../../html/sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='../myThesis.php'>我的论文</a></div>
							 <div class='item'><a href='../logout.php'>注销登录</a></div>
							</div>";
						}
						elseif ($_SESSION['userType'] == 'voter'){
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../../html/sendThesis.html'>发布论文</a></div>
							 <div class='item'><a href='../myThesis.php'>我的论文</a></div>
							  <div class='item'><a href='../voteThesis.php'>需要我审核的论文</a></div>
							 <div class='item'><a href='../logout.php'>注销登录</a></div>
							</div>";
						}
						else {
							$username = $_SESSION['username'];
							//$userType = $_SESSION['userType'];
							 echo "<div id='hasLoged'>
							<div id='title'> 你好!&nbsp;&nbsp;&nbsp;$username</div>
							 <div class='item'><a href='../../html/changepsw.html'>修改密码</a></div>
							 <div class='item'><a href='../../html/sendNews.html'>发布新闻</a></div>
							 <div class='item'><a href='../../html/sendNotifier.html'>发布通知</a></div>
							 <div class='item'><a href='../../html/sendMeeting.html'>发布会议</a></div>
							 <div class='item'><a href='../logout.php'>注销登录</a></div>
							</div>";
						}	
					?>
					<div id="notices">
						<p id="title">学术会议在线公告</p>
						<div id="rules">
							<a href="../../html/rules.php">1.国际学术会议信息发布规则</a>
						</div>
						<div id="job-invited">
							<a href="../../html/jobInvited.php">2.国际学术会议兼职信息员招聘启事</a>
						</div>
						<div id="lectures">
							<a href="../../html/lectures.php">
								3.高校学术讲座交流平台开通,欢迎使用！
							</a>
						</div>
						<div id="new-version">
							<a href="../../html/newVersion.php">
								4.教育部科技发展中心门户网站新版上线公告 
							</a>
						</div>
					</div>
					<div id="tips">
						<div id="online-intro">
							<a href="../../html/onlineIntro.php">在线介绍</a>
						</div>
						<div id="users-guide"><a href="../../html/usersGuide.php">用户指南</a></div>
						<div id="friend-links">
							<a href="../../html/friendLinks.php">友情链接</a>
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
							<a href="../index.php">首页</a> <span class="divider">/</span>
						</li>
						<li>
							<a href="../experience.php">经验交流</a> <span class="divider">/</span>
						</li>
						<li class="active">如何组织成功的学术会议？</li>
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
						    		 <a href='../meetingDetail.php?meetingNum=$num' target='_blank'><img src='../../pics/pic1.jpg'></a></div>";
					    		echo "<div class='item'>
						    		 <a href='../meetingDetail.php?meetingNum=$num1' target='_blank'><img src='../../pics/pic1.jpg'></a></div>";
					    		echo "<div class='item'>
						    		 <a href='../meetingDetail.php?meetingNum=$num2' target='_blank'><img src='../../pics/pic1.jpg'></a></div>";
							?>
						</div>
					</div>
					<div id="title">如何组织成功的学术会议？</div>
					<hr>
					<div id="texts">
						<p>
							在本期的Nature Reviews Molecular Cell Biology中，有一篇出自Gregory A. Petsko手笔的短文，介绍的是如何组织/参加学术会议。想必这是每一个渴望获得学术上认可、成功的学者都想了解的话题，文中重点分析了以下几个问题： 1、大小会议的区别； 2、国际国内会议的区别； 3、长短会议的取舍； 4、专业或是综合性会议； 5、是否需要展示海报； 6、多而短的演讲或少而长的演讲；至于里面的具体内容这里就不详细介绍了，希望有兴趣的读者可以详细阅读英文原文（The highs and lows of scientific conferences. 2006 March Volume 231-234），相信您可以从中受到启发。这里摘译两段作者对会议举办者和参与者分别提出的十点建议：针对会议举办者： 1、任何会议最重要的部分是演讲者、参与者的互动，而成功的会议必然是那些能促进这种互动的会议； 2、绝大多数会议的理想长度是少于3天，对于一些大型的会议，可以达到4天，但不需要再长了； 3、不管听众的专业背景有多少深厚，都没必要请太多领域专家来作演讲。思路清晰对于演讲者来说是最重要的品质。会议举办者需要针对这些特点去选择合适的演讲者。 4、演讲者和听众的多种族背景、和谐的性别比例将有助于会议的成功举办； 5、在专业的会议中插入一些少量的其他内容的演讲，会使会议更加成功； 6、整个世界分成早晨的人和夜晚的人。如果会议只是针对一种类型的人，很可能会犯错； 7、一场没有休息时间的会议不仅让人疲惫，而且还无效率； 8、安排了相互矛盾的演讲会惹恼听众和演说者。这点需要特别注意，对不同领域的学者来说这点也适用。 9、没有比让听众看不清画面、听不清演说更快让演说失败的了（如果您是观众，建议您问一些问题，让您的声音被其他人听见；如果您是演说者，尽量重复问题，以便让观众听清问题，即便是再好的音响效果也需要这么做）； 10、会议的环境影响着会议的质量，食物也一样。环境的作用常被低估。 针对会议参与者的建议： 1、在发展中国家不要喝水；在发达国家不要喝啤酒； 2、不要吝啬反馈意见，因为会议的组织者期待您的反馈。也不要忘记一些积极的反馈：这是组织者们应得的荣誉； 3、不要躲避，即使您是一个害羞的人，兴许您可以从会议的参与中获得终身的朋友； 4、不要缠住海报展示者。如果您正在展示一个海报，也不要让个别观众占据您的所有时间； 5、如果您仅仅参加一些您研究领域内的会议，您将不会成长。尝试一些其他领域的会议吧！ 6、您是您所摄取的总合（鉴于这点你可能不要再摄取垃圾食物或是低质量会议了）； 7、不要低估了一个好的睡眠的重要性； 8、人生太短暂了，所以不要总是参与离家很近的会议； 9、人生太短暂了，所以不要花一个星期的时间参加一个会议； 10、享受快乐。记住，科学比工作更让人懂得如何生活。
						</p>
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