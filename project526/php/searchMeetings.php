<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>会议搜索页</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../css/searchMeetings.less" type="text/less">
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
							<a href="./index.php">首页</a> <span class="divider">/</span>
						</li>
						<li>
							<a href="./meetings.php">会议预告</a> <span class="divider">/</span>
						</li>
						<li class="active">会议搜索</li>
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
							<?php
								error_reporting(E_ALL^E_NOTICE^E_WARNING);
								$searchMeeting = $_POST['searchMeeting'];
								//echo "$searchMeeting";
								$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from meetings where name like '%$searchMeeting%' ORDER BY beginTime DESC";
								$query=$mysql->query($sql);
								$nums=mysqli_num_rows($query);
								if ($nums > 0) {
									echo "<table class='table'><thead><td>课题方向</td><td>会议名称</td><td>会议时间</td><td>会议地点</td><td>论文截止日期</td></thead><tbody>"; 
									$searchMeetingPage = $_GET['searchMeetingPage'];
									if ($searchMeetingPage > 0) {
										$rangeDown = $searchMeetingPage*8;
										//$rangeUp = $rangeDown+8;
										$sql1="select * from meetings where name like '%$searchMeeting%' ORDER BY beginTime DESC LIMIT $rangeDown,8";
									}
									else {
										$sql1="select * from meetings where name like '%$searchMeeting%' ORDER BY beginTime DESC LIMIT 0,8";
									}
									$query1=$mysql->query($sql1);
									while($row1=mysqli_fetch_array($query1)) {
										$num = $row1['number'];
										echo "<tr><td>".$row1['subject']."</td><td><a href='meetingDetail.php?meetingNum=$num'>".$row1['name']."</a></td><td>".$row1['beginTime']."</td><td>".$row1['place']."</td><td>".$row1['thesisDeadline']."</td></tr>";
									}
									echo "</tbody></table>";
									echo "<ul class='pager'>";
									$searchMeetingPage = $_GET['searchMeetingPage'];
									$maxPage = $nums/8-1;
									if ($searchMeetingPage && $maxPage > 0) {
										if ($searchMeetingPage < $maxPage) {
											$prePage = $searchMeetingPage-1;
											$nextPage = $searchMeetingPage+1;
											$nextUrl = 'searchMeetings.php?searchMeetingPage='.$nextPage;
											$preUrl = 'searchMeetings.php?searchMeetingPage='.$prePage;
											echo "<li ><a href='$preUrl'>Previous</a></li>";
											echo "<li id='page'>第".(++$searchMeetingPage)."页</li>";
											echo "<li><a href='$nextUrl'>Next</a></li>";
										}
										else {
											$prePage = $searchMeetingPage-1;
											$preUrl = 'searchMeetings.php?searchMeetingPage='.$prePage;
											echo "<li><a href='$preUrl'>Previous</a></li>";
											echo "<li id='page'>第".(++$searchMeetingPage)."页</li>";
											echo "<li class='disabled'><a href='#'>Next
												 </a></li>";
											echo "<li>已是最后一页</li>";
										}
									}
									elseif (!$searchMeetingPage && $maxPage > 0) {
										$nextUrl = 'searchMeetings.php?searchMeetingPage=1';
										echo "<li class='disabled'><a href='#'>Previous</a></li>";
										echo "<li id='page'>第1页</li>";
										echo "<li><a href='$nextUrl'>Next</a></li>";
									 } 
									elseif (!$searchMeetingPage && $maxPage <= 0) {
								  		echo "<li class='disabled'><a href='#'>Previous</a></li>";
										echo "<li id='page'>第1页</li>";
										echo "<li class='disabled'><a href='#'>Next</a></li>";
										echo "<li>已是最后一页</li>";
									} 
									echo "</ul>";
								}
								else {
									echo "<div id='noResults'>没有搜索结果</div>";
								}
							?>
						</div>
						<div id="right">
							<p id="title">相关会议新闻</p>
							<?php
								$mysql=mysqli_connect("localhost","2012061516","940710","project") or die("数据库连接失败".mysql_error());
								$mysql->query("set names utf8");
								$sql="select * from news ORDER BY releaseTime DESC LIMIT 10";
								$query=$mysql->query($sql);
								$count = 0;
								while($row=mysqli_fetch_array($query)) {
									$num = $row['number'];
									echo "<div class='listItem'><a href='newsDetail.php?newsNum=$num'>".(++$count).".".$row['title']."</a></div>";
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