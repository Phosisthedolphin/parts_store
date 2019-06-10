<?php
$con = mysqli_connect('localhost', 'root', '');
mysqli_select_db($con, 'dolphin2');

if (isset($_GET["category"]))
{
    $category = $_GET["category"];
} else {
    $category = null;
}

if(isset($_GET["sub_category"]))
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

if (isset($_GET["limit"]))
{
    $limit = $_GET["limit"];
} else {
    $limit = null;
}

if (isset($_GET["offset"]))
{
    $offset = $_GET["offset"];
} else {
    $offset = null;
}

$first_sql = "SELECT COUNT(*) FROM parts";
$second_sql = "SELECT DISTINCT part_number, item_description,"
