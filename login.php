<?php
	require "TestDB2.php"; 
    ForceDashboard(); // 强制跳转到仪表板如果已登录
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>央央大富翁</title>
<link rel="stylesheet" type="text/css" href="css/login.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="js/login.js" type="text/javascript"></script>
<style>
    header {
      background-color: rgb(136, 233, 183);
    }
    h1 {
      color: rgb(18, 82, 61);
      text-align: center;
      font-size: 50px;
    }
    body {
      background-blend-mode: multiply;
      background-image: url("img/0_cover.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
</style>
</head>
<body>
    <header>
        <h1>央央大富翁</h1>
        <hr color="black" size="5px">
    </header>

	<body>

<div class="container">
	  <h3 class="head_text">Sign UP / Log In System</h1>
  </div>
  <div class="container">
	  <div class="row">
		  <div class="block">
			  <form class="login_block">
				  <div class="header">
					  <h3>Log in</h3>
				  </div>
				  <div class="error" style="display: none;">
					  <h3></h3>
				  </div>
				  <div class="username">
					  <h3>Username</h3>
					  <input id="username" type="text" size="32" placeholder="username" name="username" autocomplete="username"/>
					  <h4>should be within 1 - 20 characters </h4>
				  </div>
				  <div class="password">
					  <h3>Password</h3>
					  <input id="password" type="password" size="32" placeholder="password" name="password" autocomplete="username"/>
					  <h4>should be within 8 - 21 characters </h4>
				  </div>
				  <div class="button">
					  <a onclick="toggle()">註冊?</a>
					  <button class="submit" type="button">Submit</button>
				  </div>
			  </form>
		  </div>
	  </div>
  </div>

</body>
</html>
