<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php


        $con = mysqli_connect('localhost', 'root', '');
        mysqli_select_db($con, 'dolphin');

        $results_per_page = 40;
        $keyword = 'trucklite';

        // $sql = "SELECT * FROM parts";
        $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%'";
        $result = mysqli_query($con, $sql);
        $number_of_results = mysqli_num_rows($result);

        // while($row = mysqli_fetch_array($result)) {
        //     echo $row['bin_desc'] . '<br>';
        // }

        $number_of_pages = ceil($number_of_results/$results_per_page);

        if(!isset($_GET['page'])) {
            $page = 1;
        } else {
            $page = $_GET['page'];
        }

        $this_page_first_result = ($page-1)*$results_per_page;

        // $sql = "SELECT * FROM parts LIMIT " . $this_page_first_result . ',' . $results_per_page;
        $sql = "SELECT part_number, item_description FROM parts WHERE item_description LIKE '%{$keyword}%' LIMIT " . $this_page_first_result . ',' . $results_per_page;
        $result = mysqli_query($con, $sql);

        while($row = mysqli_fetch_array($result)) {
            // echo $row['item_description'] . '<br>';
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
        
        for($page = 1; $page<=$number_of_pages; $page++) {
            echo '<a href="lightpagination.php?page=' . $page . '">' . $page . '</a> ';
        }


    ?>
</body>
</html>