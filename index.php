<?php include('header.php')?>
<?php include('nav.php')?>
<div id="catalogue-wrapper">
<?php include('trucklite.php') ?>
</div>
<?php for($page = 1; $page<=$number_of_pages; $page++) {
            echo
            '<div class="pagination">'. 
            '<a href="index.php?page=' . $page . '&key=' . $keyword .'">' . $page . '</a> '.
            '</div>';
        }
?>
<?php include('footer.php') ?>
