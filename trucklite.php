<?php


        $con = mysqli_connect('localhost', 'root', '');
        mysqli_select_db($con, 'dolphin2');

        $results_per_page = 40;

        //DEPRECATED
        // $keyword = 'trucklite';
        // $keyword =  $_GET["key"];

        if (isset($_GET["category"]))
        {
        $category = $_GET["category"];
        } else {
        $category = null;
        }

        if (isset($_GET['sub_category']))
        {
        $sub_category = $_GET["sub_category"];
        } else {
        $sub_category = null;
        }

        if (isset($_GET["manufacturer"]))
        {
        $manufacturer = $_GET["manufacturer"];
        } else {
        $manufacturer = null;
        }

        //DEPRECATED CODE, LEAVING FOR REFERENCE
        // $sql = "SELECT * FROM parts";
        // $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%'";

        $sql = "SELECT bin_description_2, bin_description_3, bin_description_4 FROM parts WHERE ";

        //DEPRECATED CODE, LEAVING FOR REFERENCE
        // if ($category != NULL) {
        //     $sql = $sql . "bin_description_2 LIKE '%{$category}%' AND ";
        // }
        // if ($sub_category != NULL) {
        //     $sql = $sql . "bin_description_3 LIKE '%{$sub_category}%' AND ";
        // }
        // if ($manufacturer != NULL) {
        //     $sql = $sql . "bin_description_4 LIKE '%{$manufacturer}%'";
        // }

        $sql_where_statements = array();

        if ($category != NULL) 
        {
        array_push($sql_where_statements, "bin_description_2 LIKE '%{$category}%'");
        }
        if ($sub_category != NULL) 
        {
        array_push($sql_where_statements, "bin_description_3 LIKE '%{$sub_category}%'");
        }
        if ($manufacturer != NULL) 
        {
        array_push($sql_where_statements, "bin_description_4 LIKE '%{$manufacturer}%'");
        }

        $sql_where = join(" AND ", $sql_where_statements);
        $sql = $sql . $sql_where;
        
        $result = mysqli_query($con, $sql);
        $number_of_results = mysqli_num_rows($result);

        $number_of_pages = ceil($number_of_results/$results_per_page);

        if(!isset($_GET['page'])) {
            $page = 1;
        } else {
            $page = $_GET['page'];
        }

        $this_page_first_result = ($page-1)*$results_per_page;

        // DEPRECATED CODE, LEAVING FOR REFERENCE
        // $sql = "SELECT * FROM parts LIMIT " . $this_page_first_result . ',' . $results_per_page;
        // $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%' LIMIT " . $this_page_first_result . ',' . $results_per_page;

        $sql = "SELECT part_number, item_description, bin_description_2, bin_description_3, bin_description_4 FROM parts WHERE ";

        // DEPRECATED CODE, LEAVING FOR REFERENCE
        // if ($category != NULL) {
        //     $sql = $sql . "bin_description_2 LIKE '%{$category}%' AND ";
        // }
        // if ($sub_category != NULL) {
        //     $sql = $sql . "bin_description_3 LIKE '%{$sub_category}%' AND ";
        // }
        // if ($manufacturer != NULL) {
        //     $sql = $sql . "bin_description_4 LIKE '%{$manufacturer}%' ";
        // }

        $sql_where_statements = array();

        if ($category != NULL) 
        {
        array_push($sql_where_statements, "bin_description_2 LIKE '%{$category}%'");
        }
        if ($sub_category != NULL) 
        {
        array_push($sql_where_statements, "bin_description_3 LIKE '%{$sub_category}%'");
        }
        if ($manufacturer != NULL) 
        {
        array_push($sql_where_statements, "bin_description_4 LIKE '%{$manufacturer}%'");
        }

        $sql_where = join(" AND ", $sql_where_statements);
        $sql = $sql . $sql_where . "LIMIT " . $this_page_first_result . ',' . $results_per_page;

        // DEPRECATED CODE, LEAVING FOR REFERENCE
        // $sql = $sql . "LIMIT " . $this_page_first_result . ',' . $results_per_page;

        $result = mysqli_query($con, $sql);
        echo("Error description: " . mysqli_error($con));
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
        
        // DEPRECATED
        // for($page = 1; $page<=$number_of_pages; $page++) {
        //     echo
        //     '<div class="pagination">'. 
        //     '<a href="index.php?page=' . $page . '&key=' . $keyword .'">' . $page . '</a> '.
        //     '</div>';
        // }


    ?>

