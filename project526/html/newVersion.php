<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>会议在线公告</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/newVersion.less" type="text/less">
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
						<li class="active">教育部科技发展中心门户网站新版上线公告</li>
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
					<div id="title">教育部科技发展中心门户网站新版上线公告</div>
					<hr>
					<div id="date">日期：2016-3-27</div>
					<div id="texts">
						<p>
							  中国学术会议在线新版终于与大家见面了。在新版中，我们实现了一些优化和改进，尽力为广大用户提供更优秀的学术信息服务平台。相比旧版，新版的改进有：
						</p>
						<h4>分类学科信息</h4>
						<p>
							会议信息以学科分类，设置学科单页，便于各专业用户查询本专业内相关学术会议。
						</p>
						<h4>改观页面设计</h4>
						<p>
							  新的页面采用宽页面、小模块化，方便用户浏览。
						</p>
						<h4>简化视频点播</h4>
						<p>
						    视频点播无需另下载插件，直接点击播放。并针对单位用户特别推出“中国学术会议在线校园速递服务”，提高视频点播流畅性。       
						</p>
						<h4>推出讲座资源</h4>
						<p>
						    倾力推出高校学术讲座交流平台，促进高校间学术资源共享。     
						</p>
						<h4>引入用户评价</h4>
						<p>
						    参会用户可对学术会议进行评价，如办会方诚信、会议学术水平，为后来参会者提供参考，舆论监督促进提高办会水平。     
						</p>
						<h4>注意事项： </h4>
						<p>
						    1、由于教育网和公网之间存在带宽瓶颈，非教育网用户可能无法流畅观看视频，我们将努力改善并解决此问题。教育网集体用户（高校）如遇到视频观看不流畅的问题，可以学校为单位申请“中国学术会议在线校园速递服务”，以改善观看体验。参见《关于开展中国学术会议在线视频校园速递服务试点的通知》。。       
						</p>
						<p>
							2、新版测试期一个月，网站还有大量需要完善之处，在此期间可能因为优化系统出现短暂的服务中断，请大家谅解。如您在新版使用过程中遇到任何问题，欢迎提出意见与建议，联系邮箱meeting@cutech.edu.cn或scimeet@yahoo.com。
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