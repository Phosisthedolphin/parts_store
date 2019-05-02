<?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "dolphin";

            $conn = new mysqli($servername, $username, $password, $dbname);
            $keyword = "hose";

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
          

            $conn->close();
            ?>