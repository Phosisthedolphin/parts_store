<?php include "connect.php";

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

$sql = "SELECT DISTINCT bin_description_2 FROM parts";
$sql_where_statements = array();
$order = "ORDER BY bin_description_2 ASC";

if ($sub_category != NULL)
{
  array_push($sql_where_statements, "bin_description_3={$sub_category}");
}
if ($manufacturer != NULL)
{
  array_push($sql_where_statements, "bin_description_4={$manufacturer}");
}

// array_push($sql_where_statements, "bin_description_2!=''");

// array_push($sql_where_statements, "bin_description_2!=\"\"");
array_push($sql_where_statements, "bin_description_2 != \"\"");

if (count($sql_where_statements) > 0)
{
  $sql = $sql . " WHERE ";
  $sql_where = join(" AND ", $sql_where_statements);
  $sql = $sql . $sql_where;
}

$sql = $sql . $order;
// $result = mysqli_query($con, $sql);

// echo json_encode(mysqli_fetch_all($result));
// echo $sql;

$result = mysqli_query($con, $sql);

if (!$result)
{
  echo $sql;
  echo mysqli_error($con);
}
else
{
  echo json_encode(mysqli_fetch_all($result));
}
?>
