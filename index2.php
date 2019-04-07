<?php
  if (!empty($_GET['q'])) {
    switch ($_GET['q']) {
      case 'info':
        phpinfo();
        exit;
      break;
    }
  }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>G.B.M. Parts</title>

        <link href="https://fonts.googleapis.com/css?family=Karla:400" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="/style.css">


    </head>
    <body>
      <header>
           <img src='./img/logo.jpeg' style="width: 140px;">
      </header>
      <div class="sub-header">
        <ul>
          <!-- <button onclick="dropdown()">Click me</button> -->
          <li><button onclick="dropdown()">Lights</button></li>
          <li><button onclick="dropdown()">Valves</button></li>
          <li><button onclick="dropdown()">Hoses</button></li>
          <li><button onclick="dropdown()">Brakes</button></li>
          <li><button onclick="dropdown()">Cam & Groove</button></li>
        </ul>
      </div>
      <div id="subdrop" class="sub-header-dropdown">
        <ul>
          <li><a href="./index.php">Trucklite</a></li>
          <li>Light 2</li>
          <li>Light 3</li>
          <li>Light 4</li>
        </ul>
      </div>
      <div class="catalogue-wrapper">
        <!-- <a href="index.php"> -->
        <div class="catalogue-card part-card">
          <img src="./img/PARTSCARD.jpeg" style="width:300px;">
        </div>
        <div class="catalogue-card part-card">
          <img src="./img/PAGE HEADER VALVES VALVES.jpeg" style="width:300px;">
        </div>
        <div class="catalogue-card part-card">
          <img src="./img/PAGE HEADER ALL HOSES.jpeg" style="width:300px;">
        </div>
        <div class="catalogue-card part-card">
          <img src="./img/PAGE HEADER ALL BRAKES.jpeg" style="width:300px;">
        </div>
        <div class="catalogue-card part-card">
          <img src="./img/PAGE HEADER ALL CAM & GROOVE.jpeg" style="width:300px;">
        </div>
      <!-- </a> -->



              </div>
      </div>
      <div class="opt">

        <script src="./jquery-3.3.1.min.js"></script>
        <script src="./js/script.js"></script>
    </body>
</html>
