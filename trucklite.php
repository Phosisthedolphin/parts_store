<?php


        $con = mysqli_connect('localhost', 'root', '');
        mysqli_select_db($con, 'dolphin2');

        $results_per_page = 40;
        // $keyword = 'trucklite';
        // $keyword =  $_GET["key"];

        $category = $_GET["category"];
        $sub_category = $_GET["sub_category"];
        $manufacturer = $_GET["manufacturer"];

        // $sql = "SELECT * FROM parts";
        // $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%'";

        $sql = "SELECT bin_description_2, bin_description_3, bin_description_4 FROM parts WHERE ";

        if ($category != NULL) {
            $sql = $sql . "bin_description_2 LIKE '%{$category}%' AND ";
        }
        if ($sub_category != NULL) {
            $sql = $sql . "bin_description_3 LIKE '%{$sub_category}%' AND ";
        }
        if ($manufacturer != NULL) {
            $sql = $sql . "bin_description_4 LIKE '%{$manufacturer}%'";
        }
        
        $result = mysqli_query($con, $sql);
        echo("Error description: " . mysqli_error($con));
        $number_of_results = mysqli_num_rows($result);

        $number_of_pages = ceil($number_of_results/$results_per_page);

        if(!isset($_GET['page'])) {
            $page = 1;
        } else {
            $page = $_GET['page'];
        }

        $this_page_first_result = ($page-1)*$results_per_page;

        // $sql = "SELECT * FROM parts LIMIT " . $this_page_first_result . ',' . $results_per_page;
        // $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%' LIMIT " . $this_page_first_result . ',' . $results_per_page;

        $sql = "SELECT bin_description_2, bin_description_3, bin_description_4 FROM parts WHERE ";

        if ($category != NULL) {
            $sql = $sql . "bin_description_2 LIKE '%{$category}%' LIMIT " . $this_page_first_result . ',' . $results_per_page . " AND ";
        }
        if ($sub_category != NULL) {
            $sql = $sql . "bin_description_3 LIKE '%{$sub_category}%' LIMIT " . $this_page_first_result . ',' . $results_per_page . " AND ";
        }
        if ($manufacturer != NULL) {
            $sql = $sql . "bin_description_4 LIKE '%{$manufacturer}%' LIMIT " . $this_page_first_result . ',' . $results_per_page;
        }

        $result = mysqli_query($con, $sql);

        while($row = mysqli_fetch_array($result)) {
            // echo $row['item_description'] . '<br>';
            echo
            "<div data-aos='fade-up' class='catalogue-card'>".
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
            " A.jpeg' onerror='imgError(this);'></a>".

            "<br /><br />".

            "<img class='thumb' style='height: 50px;' src='/img/".
            $row['part_number'].
            " A.jpeg' onerror='imgError(this);'>".


            "<img class='thumb' style='height: 50px;' src='/img/".
            $row["part_number"].
            " B.jpeg' onerror='imgError(this);'>".

            "<img class='thumb' style='height: 50px;' src='/img/".
            $row["part_number"].
            " C.jpeg' onerror='imgError(this);'>".

            "<img class='thumb' style='height: 50px;' src='/img/".
            $row["part_number"].
            " D.jpeg' onerror='imgError(this);'>".
            "<br /><br />".
            "<div class='part-number'>".
            "<span># </span>".
            $row["part_number"].
            "</div>".
            "<br/><br />".
            "</div>".


            "</div>";
        }
        
        // for($page = 1; $page<=$number_of_pages; $page++) {
        //     echo
        //     '<div class="pagination">'. 
        //     '<a href="index.php?page=' . $page . '&key=' . $keyword .'">' . $page . '</a> '.
        //     '</div>';
        // }


    ?>

