<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>经验交流</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../../css/expDetails/prepareMeeting.less" 
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
						<li class="active">如何准备学术会议墙报</li>
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
					<div id="title">如何准备学术会议墙报</div>
					<hr>
					<div id="texts">
						<p>
							学术会议展板尺寸通常为90cm宽×120cm长。

   一般情况下，可用下面2种方法制作论文展板。一是用photoshop等专业软件制作：优点是质量高，缺点是太麻烦。此外便是一般常采用的 POWERPOINT制作，简单快速，质量完全可以接受(毕竟学术会议主要是学术与信息的交流，不是做广告搞宣传)。简要制作过程如下

1）打开POWERPOINT后新建一个文件；
2）进入页面设置，将文件高度设置为120CM，宽度设置为90CM；点击OK！
3）根据自己喜好设置背景颜色。
4）编辑正文和图片。标题文字最好选择80号字左右，正文选48号字左右，图注选40号字左右。注意四周要留出足够的空来才好看。
5）在自己的电脑上，选择100％ 比例观看效果即可！
6）存盘！（ 此时可送图片社打印和加膜，建议打印制作时选用1200dpi。可能会贵一点。整个制作费用在80元左右。别忘了购一个专用圆筒20元，可以携带您的Poster！）

大图片的分割打印

如果你的打印机有海报打印功能，在打印属性里设置一下，就可以直接打印出任意大小的图片，并自动会给你留下一定的拼贴余量（可参考 [url]http://dzh1.mop.com/topic/main/readSubMain_6585976_0.html[/url]）。如手头只有A4幅面又不具海报打印功能的打印机，就需要将大图片进行分割打印。

（1）将前面用POWERPOINT制作的ppt文件另存为图片（如JPG格式）文件，

（2）参考[url]http://www.itshantou.com/application/other/06/06/22394.html[/url]用Poster-Printery软件进行分割打印。

Poster-Printery软件可去华军软件园之类的地方获取。先安装eposter45.exe（此时为试用版），后用CAD-KAS Poster-Printery 4.5.rar解压后的文件覆盖安装目录下的文件即可正常使用。
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