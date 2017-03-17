<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>经验交流</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../../css/expDetails/notes.less" type="text/less">
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
						<li class="active">《在国外参加学术会议之感慨》</li>
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
					<div id="title">《在国外参加学术会议之感慨》</div>
					<hr>
					<div id="texts">
						<p>
							 在国外期间，参加过几次国际学术会议，也接触了许多赴国外开会的国内学者，不经意间也发现国外学者与国内学者的一些差异。联想起在国内参加的学术会议，也引出了一些感慨。 1、与国外学者比较，国内学者的英语水平尚须提高。现在的国际学术会议，多用英语发言、交流，国外学者一般都能用流利的英语表达，欧美的自不必说，其他如日本、韩国的学者也大多有留学欧美的背景，英语交流几无障碍。而国内学者由于各种原因，大多是那种国际语言的“失语者”，或只能说“结巴英语”，还须借助翻译来完成“对话”，这样，所谓的国际研讨会就花费了双倍时间，而且通过转译来作交流，也在很大程度上是不可靠的。 2、在国际交流的环境中，国外学者一般都比较正式、认真，会议上也能倾听各种观点，然后再提出自己的看法，显示出对学问（“学”和“问”）的虔诚；而国内学者的态度就较为随便，或在私下“开小会”，交头接耳，啧啧私语；或不屑其他学者的看法，肆意抨击别人的观点。这种论坛上的“无礼”现象，与学术会议的科学严肃性形成鲜明的反差。 3、在话语层面上，国外学者的表达一般都比较严谨、踏实，多用理性、科学的语言，在关键数据、资料来源、理论根据、研究方法上，都极为慎重、较真；而国内学者还是摆脱不了假（把假设当依据、资料来源不可靠、以假乱真等）、大（宏大、抽象、模糊的叙述等）、空（空洞、浮于表面、不求真务实、不作论证等）的陋习，尤其是在具体问题的辩论中唱高调、绕弯子、避实就虚的表现，实在是违背了“学术讨论会”的本义。 4、在提交的论文中，国外学者的论题多为“问题”性的，比较平实、具体，切入口小而内容精深，展开的方式或量化也可质化，但看得出是花力气做出来的，当然按照西方的文本要求，也比较符合规范；而国内学者的论题通常是“建构”性的，貌似玄乎，“高见”迭出，但文中多是断语、假设，隐藏着许多思维漏洞，尤其在关键论据、逻辑关系上常有缺失，而且在人文学科，许多论文还有以感性描述代替理性深究的“传统”，看上去华丽而有言辞才情，其实是违背了科学研究的本质。 5、在会场之外，国外学者多把它看作是讨论的延伸，间或也邀请对同一领域、同一问题看法相同或相左的学者喝咖啡聊天，似乎少有学术以外的功利性；而国内部分学者则把“会场”外的走廊，看作是讨论的结束和“拉关系”的开始，或攀龙（攀“名流”）附凤（附“新贵”或所谓“美女学者”），或巴结刊物编辑，不难看出其学术之外的强烈“功利心”。 上述看法，或许有失“偏颇”，也不能代表所有国内学者和所有学术讨论会。但窃以为，即便是某些学者的“个别”表现，在国际学术论坛上也是“抢眼”的，那到底会是“青眼”还是“白眼”，自然也不必由我来评说。
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