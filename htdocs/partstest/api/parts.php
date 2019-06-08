<?php
$con = mysqli_connect('97.74.149.76', 'GBMTrailerAccess@72.167.233.37', 'cr@zyMonster32', 'GBMTrailerAccess');
mysqli_select_db($con, 'GBMTrailerAccess');

if (isset($_GET["category"]))
{
  $category = $_GET["category"];
} else {
  $category = null;
}

if (isset($_GET["sub_category"]))
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
$second_sql = "SELECT DISTINCT part_number, item_description, bin_description_2, bin_description_3, bin_description_4 FROM parts";

$sql_where_statements = array();

if ($category != NULL)
{
  array_push($sql_where_statements, "bin_description_2={$category}");
}
if ($manufacturer != NULL)
{
  array_push($sql_where_statements, "bin_description_4={$manufacturer}");
}

if ($sub_category != NULL)
{
  array_push($sql_where_statements, "bin_description_3={$sub_category}");
}

if (count($sql_where_statements) > 0)
{
  $first_sql = $first_sql . " WHERE ";
  $second_sql = $second_sql . " WHERE ";

  $sql_where = join(" AND ", $sql_where_statements);

  $first_sql = $first_sql . $sql_where;
  $second_sql = $second_sql . $sql_where;
}

if ($limit != NULL)
{
  $second_sql = $second_sql . " LIMIT " . $limit;
}

if ($offset != NULL)
{
  $second_sql = $second_sql . " OFFSET " . $offset;
}

$first_result = mysqli_query($con, $first_sql);
$second_result = mysqli_query($con, $second_sql);

$totalResults = mysqli_fetch_all($first_result);
$results = mysqli_fetch_all($second_result);

$return = array(
  "totalResults" => $totalResults[0][0],
  "data" => $results
);

echo json_encode($return);

?>

