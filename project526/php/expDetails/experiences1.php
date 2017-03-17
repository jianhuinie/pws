<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>经验交流</title>
	<meta charset="utf-8">
	<link rel="stylesheet/less" href="../../common/layout.less" type="text/less">
	<link rel="stylesheet/less" href="../../css/expDetails/experiences1.less" 
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
						<li class="active">一些筹办国际性学术会议的心得和经验</li>
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
					<div id="title">一些筹办国际性学术会议的心得和经验</div>
					<hr>
					<div id="texts">
						<p>
							会议总结

一、会议前准备 

1、 一般会议在第一轮只是提交一个意向说明到指定的邮箱，而且在第一轮中会大致通知重要的时间点，提交论文时间、论文意见时间、报到时间等。 

2、 按时间安排提交abstract以及会议指定格式的注册信息。 

3、 第二轮一般比较重要，一般已经得知论文是否被接收，但此时仍有时机提交论文，此时会议的相关安排会更加具体，包括开会地点，大致日程安排以及费用住宿等。这里要特别注意会务费竟包括那些费用，包不包括住宿以及早中晚餐。 

4、 第二轮后一般会接到论文录用通知及邀请函，通常首先会得到电子版的邀请函，由大会主席签名并扫描的图片文件。但一般国际会议办签证时通常都要求纸介的邀请函，此时应立刻要求邮寄纸介邀请函，以防耽误签证时间。

5、 预定机票，一般这个时候预定能够便宜，可能会需要护照号，没关系，和他们说，他们会允许你办好后再提供。 

6、 办理护照及签证，受到邀请函就应立刻办理护照及签证（当然在收到前最好自己就有护照，以便节约）。 先说护照，比较好办，只要到公安厅的出入境管理处办理即可，办理时需要带身份证、户口簿，其他的并不需要。办理时填写申请表都是关于自身信息的一些内容很好填，这里要说的是一般最好办理因私护照，因为办理因公护照手续很繁琐，还需要单位证明什么的，而且就会议来说都是一样的，签证时不会遇到任何问题。目前护照有效期10年。办理时通常都会在当地找个护照像20-40元，没办法强买强卖：）。一般加急办理大约15天能收到护照，办理很方便，限制很少。 办签证比较费劲，会议通常办C3签证，一般需要到那个国家大使馆网站查询需要那些申请材料。一般需要准备以下东西（当然国家不同要求内容不同） 1.护照原件及护照照片页面 复印件1 份 2. 签证申请表1张（需贴照片） 3. 身份证原件和复印件 4. 个人简历 （个人的基本信息，Education，Experience， Resent Selected Publications， Research Projects等） 5. 在职证明(需含有在职期间，负责部门等内容并盖有公司公章) 6. 营业执照复印件 7. 户口本原件及复印件 （户口在外地时需要暂住证 ） 8. 邀请函原件办理时间一般为10天，费用大约为一人200元。多人签证通常只让进一个人统一办理。护照加签证加一起最少就得25天所以通常得抓紧。 7、 在参加国际会议时通常最好提前一个月预定房间，要不可能会定不上，最好当然是国际连锁的大hotel，实在不行就住motel，便宜，一般不用提前订，但就怕离会场远，或者到时候没有位置。建议还是hotel。 8、 最后一轮通知，通常有详细的会议安排，每天什么时间段谁作报告，主持人是谁，都有详细介绍，并且有机场交通图，会场交通图等。这页内容一定要打印出来，标出重点，拿个活页夹子弄好，出国放在行李的外袋，以便随时拿出翻阅。

二、 出发前准备物品 

1、 最重要的当然是PPT了，PPT一定不要用太花哨的背景，要用大量的数据及图示说明，不要有太多的文字。还有就是海报一般一页的内容把重要的图表列在上面，重点说结果，原因少写，最前面是研究内容的概要，有点像会议摘要的内容，只是加了具体数据而已，左上角要有组织标志，在国内打印，拿卷筒带去。 

2、 当地近几日的气候、当地的国徽、国旗，重要的名胜、购物街、特色食品，还有就是最重要的汇率，一般只需要知道当地的一个单位等于多少整数的人民币即可，最好忘多算不要往少算。并且查好当地的伙食、住宿标准以及可以报销的标准。 

3、 毛巾，牙膏，牙刷，这两样用酒店的不舒服，最好自己准备，方便面或者饼干一到两包，口香糖，剃须刀，西服，领带，衬衣（两天一件）。 

4、 小的笔记本电脑，相机/手机，以及相关电池存储卡，充电器，以及当地的标准电源插头（但高级酒店一般能为客户提供）

5、 护照，机票一定要放在包的外侧且安全的地方，并且时刻记得用完即放回原处。 

6、 外汇兑换，一般可以到当地的中国银行兑换。如果换成美钞也可以在当地再换成当地的钱，这里需要注意牌价分好几种，一定要看清哦，而且周六、周日不换，因为没牌价。

三、 参加会议 

1、 入住酒店，先问好退房时间，上网费用，早餐是否包括，然后拿到门卡，一定放在西服的上外口袋里以便随时拿。并且实际考察一下到会场的路线，算好时间，做到心中有数。 

2、 会议报到的次序，报到，填写报到信息，交会务费，拿发票，领会议日程表，摘要集胸卡，其他安排，一定按照这个安排来，一样不能少。

3、 会议期间尽量多参加活动这是结交朋友的好时机，特别是欢迎晚宴及欢送晚宴，而且要准备一套自我介绍的套话。

4、 发言当天的早上或中午提前20分钟到场，把PPT拷到会议电脑中。 

5、 会议过程中照相要尽量小心及隐蔽，以防找到别国专家的非议，并且尽量做到中间靠前，实在不行坐在其他的投影前也可。会议过程中也尽量和会议的字幕照张相，以便以后回忆。 

6、 在整个会议过程当中的一切花销一定要索要发票，包括各种食品，交通，住宿，只要交钱的地方就一定要发票， 一手交票一手给钱。四、 返程

1、 回来时核实所带日用品是否齐全，相机、手机、电脑、是否放好，会议所发的东西是否带齐。 

2、 各种发票统一装袋，保存好。 

3、 机票、护照、签证放在外袋。

4、 能减少包的个数就减少，尽量合并，便于管理。

5、 尽量提前2小时到机场，一来放心，二来可以买些免税的东西，有退税的到机场海关退税，海关一般让带2瓶酒，两条烟，但一般超一倍也不会说，关键是要在托运的行李里。

五、 报销对公报销通常只能报销会务费，交通费，住宿费，伙食费一般只能按国家标准每天给报多少钱，超出部分只能在自己花销，多余部分归个人，并且通常每人都有一个出差补助可以一起领。算账的时候，虽然当时是花的当地货币或美元，但最后结账时每笔都应换算人民币来算，和起来一共花了多少人民币，这样清晰，不容易乱。
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