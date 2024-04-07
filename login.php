<html>
<body>
<title>央央大富翁</title>
<style>
    header{
      background-color: rgb(136, 233, 183);
    }
    h1{
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

<head>
    <header>
        <h1>央央大富翁</h1>
        <hr color="black" size="5px">
    </header>
</head>
<body>
<?php
    $account = "";
    if (isset($_POST["account"])){
       $account = $_POST["account"];
    }


    $password = "";
    if (isset($_POST["password"])){
       $password = $_POST["password"];
    }

    echo "<a href='index.html'>點擊前往遊戲</a>"; 

?>

</body>
</html>
