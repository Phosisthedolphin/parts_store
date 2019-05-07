<?php include('header.php')?>
<?php include('nav.php')?>
<div id="catalogue-wrapper">
<?php include('trucklite.php') ?>
</div>
<div class="pagination-wrapper">
<?php for($page = 1; $page<=$number_of_pages; $page++) {
            echo
            // '<div class="pagination">'. 
            // '<a href="index.php?page=' . $page . '&key=' . $keyword .'">' . $page . '</a> '.
            // '</div>';
            '<a href="index.php?page=' . $page . '&key=' . $keyword .'">'.
            '<div class="pagination">'. 
             $page.
            '</div>'.
            '</a>';
        }
?>
</div>
<?php include('footer.php') ?>
