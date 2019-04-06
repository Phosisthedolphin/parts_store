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
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css">


    </head>
    <body>
      <header>
           <img src='./img/logo.jpg' style="width: 140px;">
      </header>
      <div class="sub-header">
        <ul>
          <!-- <button onclick="dropdown()">Click me</button> -->
          <li><button onclick="dropdown()">Lights</button></li>
          <li>Parts 2</li>
          <li>Parts 3</li>
          <li>Parts 4</li>
          <li>Parts 5</li>
        </ul>
      </div>
      <div id="subdrop" class="sub-header-dropdown">
        <ul>
          <li><a href="./index.php">Trucklite</a></li>
          <li>Subpart 2</li>
          <li>Subpart 3</li>
          <li>Subpart 4</li>
        </ul>
      </div>
      <div class="catalogue-wrapper">


            <?php
            $servername = "ip-172-31-3-44";
            $username = "ubuntu";
            $password = "";
            $dbname = "dolphin";

            $conn = new mysqli($servername, $username, $password, $dbname);
            $keyword = "Trucklite";

            if ($conn->connect_error) {
              die("Connection failed: " . $conn->connect_error);
            }

            $sql="SELECT part_number, item_description FROM test WHERE item_description LIKE '%{$keyword}%'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                echo "<div class='catalogue-card'>".
                $row["item_description"].
                "<br /><br />".
                "<a id='image-link' href='/img/".
                $row['part_number'].
                " A.jpeg'".
                " data-fancybox='gallery'><img class='full' id='".
                // $row["part_number"].
                "full-image".
                "'".
                "style='height:200px;' src='/img/".
                $row["part_number"].
                " A.jpeg'></a>".

                "<br /><br />".

                "<img class='thumb' style='height: 50px;' src='/img/".
                $row['part_number'].
                " A.jpeg'>".


                "<img class='thumb' style='height: 50px;' src='/img/".
                $row["part_number"].
                " B.jpeg'>".

                "<img class='thumb' style='height: 50px;' src='/img/".
                $row["part_number"].
                " C.jpeg'>".

                "<img class='thumb' style='height: 50px;' src='/img/".
                $row["part_number"].
                " D.jpeg'>".
                "<br /><br />".

                "<span>Part #: </span>".
                $row["part_number"].
                "<br/><br />".


                "</div>";
              }
            } else {
              echo "0 results";
            }
            // }
            //   {
            //     while ($row=mysqli_fetch_row($result))
            //     {
            //       // print("\n" . $row[0]);
            //       echo $row;
            //       echo "item_description: " . $row["supplier"] . "<br>";
            //     }
            //     mysqli_free_result($result);
            //   }




            //CREATE SQL TABLE FOR DATABASE

            // $sql = "CREATE TABLE test (
            //   -- id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            //   bin_desc VARCHAR(255),
            //   bin_location VARCHAR(255),
            //   part_number VARCHAR(255),
            //   item_description VARCHAR(255),
            //   item_category VARCHAR(255),
            //   supplier VARCHAR(255),
            //   item_status VARCHAR(255),
            //   one_time VARCHAR(255),
            //   bin_location_2 VARCHAR(255),
            //   bin_desc_2 VARCHAR(255),
            //   bin_location_3 VARCHAR(255),
            //   bin_desc_3 VARCHAR(255),
            //   item_count INTEGER,
            //   on_order INTEGER,
            //   in_stock INTEGER,
            //   spord_in_stock INTEGER,
            //   core INTEGER,
            //   item_cos FLOAT,
            //   oem_rt VARCHAR(255),
            //   count_2 INTEGER

            //   )";

            // if ($conn->query($sql) === TRUE) {
            //   echo "Table testShopCSV5 created successfully";
            // } else {
            //   echo "Error creating table: " . $conn->error . " ";
            // }

            //CREATE ACTUAL DATABASE

            // $sql = "CREATE DATABASE dolphin";
            // if ($conn->query($sql) === TRUE) {
            //   echo "Database created successfully";
            // } else {
            //   echo "Error creating database: " . $conn->error;
            // }

            $conn->close();
            ?>

              </div>
      </div>
      <div class="opt">

        <script src="./jquery-3.3.1.min.js"></script>
        <script src="./js/script.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.js"></script>
    </body>
</html>
