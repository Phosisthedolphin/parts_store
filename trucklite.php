<?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "dolphin";

            $conn = new mysqli($servername, $username, $password, $dbname);
            $keyword = "Trucklite";

            if ($conn->connect_error) {
              die("Connection failed: " . $conn->connect_error);
            }

            $sql="SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%' LIMIT 40";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                echo "<div class='catalogue-card'>".
                "<div class='catalogue-card-description'>".
                $row["item_description"].
                "</div>".
                "<div class='catalogue-card-inner'>".
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
                "</div>".


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