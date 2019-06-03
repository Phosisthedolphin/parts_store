<?php
$con = mysqli_connect('localhost', 'root', 'toor');
mysqli_select_db($con, 'dolphin2');

if (isset($_GET["category"]))
{
  $category = $_GET["category"];
} else {
  $category = NULL;
}

if (isset($_GET["manufacturer"]))
{
  $manufacturer = $_GET["manufacturer"];
} else {
  $manufacturer = NULL;
}

$sql = "SELECT DISTINCT bin_description_3 FROM parts";
$sql_where_statements = array();

if ($category != NULL)
{
  array_push($sql_where_statements, "bin_description_2={$category}");
}
if ($manufacturer != NULL)
{
  array_push($sql_where_statements, "bin_description_4={$manufacturer}");
}

if (count($sql_where_statements) > 0)
{
  $sql = $sql . " WHERE ";
  $sql_where = join(" AND ", $sql_where_statements);
  $sql = $sql . $sql_where;
}

$result = mysqli_query($con, $sql);

echo json_encode(mysqli_fetch_all($result));

?>
