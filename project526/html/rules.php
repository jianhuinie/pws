<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>会议在线公告</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/rules.less" type="text/less">
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
						<li class="active">国际学术会议信息发布规则</li>
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
					<div id="title">国际学术会议信息发布规则</div>
					<hr>
					<div id="texts">
						<div class="item">
							<h4>一、总则</h4>
							<p>
								"中国学术会议在线"是经教育部批准，由教育部科技发展中心主办，面向广大科技人员的公益性学术会议信息服务平台。为规范学术会议信息发布流程，促进信息发布的准确性、可靠性、及时性，特制定本规则。
							</p>	
						</div>
						<div class="item">
							<h4>二、发布会议范围及责任</h4>
							<p>
								1、本网站为广大学术机构、科研人员提供综合性学术会议信息发布和查询平台，发布各类以学术交流为目的学术会议信息。
							</p>	
							<p>
								 2、本网站原则上不发布盈利性的培训类会议，视具体情况发布区域性、行业协会的技术研讨、会展信息。 
							</p>
							<p>
								3、信息发布方须对其在本网站上发布信息的真实性负责，如果违反真实性承诺，所产生的一切后果及责任，由信息发布方承担。
							</p>
							<p>
								4、信息发布方必须遵守中华人民共和国法律法规以及《互联网信息服务管理办法》相关规定。
							</p>
						</div>
						<div class="item">
							<h4>三、国内学术会议发布</h4>
							<p>
								1、各学会、科研院所、高校提交的国内学术会议信息，经“会议在线”审核，确定该信息已发布在学会、科研院所、高校的网站上，会议主办方、联系人等信息明确，可在1个工作日内发布。
							</p>	
							<p>
								　2、各学会、科研院所、高校主办或承办的国内学术会议，未在其主办方官方网站发布，需提交有主（承）办单位公章的证明文件，并提供相关负责人姓名及联系方式。
							</p>
						</div>
						<div class="item">
							<h4>四、国际学术会议发布</h4>
							<p>
								　1、各学会、科研院所、高校主办或承办的国际学术会议，会议信息已在该学会、科研院所、学校校级网站上发布，相关负责人姓名及联系方式，会议主办单位、联系人等信息明确，经会议在线审核后，可在1个工作日内发布。
							</p>	
							<p>
								2、各高校院系主办或承办的国际学术会议，未在校级网站发布的，需提供校级主管部门的证明文件，并提供相关负责人姓名及联系方式，方可发布。各学会、科研院所主办或承办的国际学术会议，未在其官方网站发布的，需提供本学会或科研院所的证明文件。
							</p>
							<p>
								 3、非学会、科研院所、高校主、承办的国际会议，如为首次举办（第一届或无届别会议），需办会机构提供会议举办所在省、自治区、直辖市外事部门批准文件，并提供相关负责人姓名及联系方式，后可发布会议。
							</p>
						</div>
						<div class="item">
							<h4>五、对会员投诉会议的处理</h4>
							<p>
								1、“中国学术会议在线”对于已经审核通过的会议，如接到以下投诉，一经核实，网站将撤销该会议信息。投诉内容包括但不限于：
								<ol>
									<li>会务组联系电话长时间无人接听或占线；</li>
									<li>会议内容、出席人员、规模等信息与会前通知严重不符；</li>
									<li>会议取消或未按时召开，未及时通知本网站。</li>
								</ol>
							</p>	
							<p>
								  2、对于提供虚假会议信息、虚假证明文件的办会机构，一经查实，该办会方将被列入网站黑名单，取消发布会议资格，并在网站上公示，情节严重者触犯法律者将报公安部门处理。
							</p>
						</div>
						<div class="item">
							<h4>六、免责条款</h4>
							<p>
								中国学术会议在线为非盈利性网站，我们将恪尽审核义务，对于因办会方失信给第三方造成的损失，中国学术会议在线不承担责任。    
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