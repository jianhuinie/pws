<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>经验交流</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../../css/expDetails/experiences2.less" 
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
						<li class="active">参加国际学术会议经验总结</li>
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
					<div id="title">参加国际学术会议经验总结</div>
					<hr>
					<div id="texts">
						<p>
							第一届世界青年地球科学家大会(官方网站：http://www.yescongress2009.org)的筹办工作正在紧张的进行中，再过两个月我们就将迎来来自57个国家的600名与会者和若干国家的国土或者地质部长以及其他教育界和学术界的政要。做为一个技术员，我主要负责会议的官方网站和一些电脑技术以及办公方面的问题，但是在人员紧缺的假期，我就算是一个勤杂工，那么缺少劳动力我就在那里工作。虽然相比研二的SuperWill我的工作要轻松很多，但是这半年在中方会议组的工作让我积累了一些经验，微不足道，但是个人感觉还是很有用的。

							合理使用互联网和计算机以节省人力和物力
 							既然是国际会议，那就不像大学里面某个班购买火车票那样，当面报名当面缴费即可，使用电话和Email都会造成很多的麻烦和疏漏，那么使用互联网是很不错的选择，尤其到了后期，各种各样的报名资料、审核资料、论文、参会付费、酒店预定、接机等事情会显示出互联网带来的办公自动化的优势。而且我们完全不用担心网络的问题，能万里迢迢来中国参加会议的，互联网基础设施都不会差的很多的。

							即便不能利用互联网达到办公的自动化，使用互联网做为宣传和发布新闻动态也是一个很不错的媒介。

							增加一个Team Blog
							很多的时候我们总会忽略团队内部人员的交流，就算是我们拥有很好的在一起工作的环境和条件，对于一个国际性会议来说，Team Blog还是必不可少的，而博客的RSS结合Email也是一个很不错的增加举办方和与会者互动的途径。就像很多正式的网站都会有自己博客，只是叫法有所不同，“官方博客”或者“团队博客”等。注意在我们SEO中也经常使用博客来增加网站的权重和流量。

							安排合理的工作计算和对应的时间表
							这样做的好处就是为了避免很多徒劳而没有意义的工作，对于这个工作计划的执行者来说，必须要在规定的时间内完成自己的任务，否则就会给整个团队带来不便。而Leader在制作工作计算和时间表的时候，一定要给自己留足可能发生意外和误工而耽误的时间。

							一个伟大的Leader
							俗话说将熊熊一个，兵熊熊一窝，一个好的Leader不仅仅有很强的业务能力，更要有勇于承担责任的精神和阔达的胸襟，这样才能赢得手下的信任。就像我们做软件一样，如果小组内大家的思想各异，那么做出来的软件就是四不像。所以领导人的的魅力和决定性思维是必不可少的。
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