<?php include "connect.php";

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

$sql = "SELECT COUNT(*) FROM parts WHERE bin_location !='' AND (bin_description_2 !='' OR bin_description_3 !='' OR bin_description_4 !='')";
$sql_where_statements = array();
$order = "ORDER BY part_number ASC";

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
  $sql = $sql . " AND ";
  $sql_where = join(" AND ", $sql_where_statements);
  $sql = $sql . $sql_where;
}



if ($limit != NULL)
{
  $sql = $sql . " LIMIT " . $limit;
}

if ($offset != NULL)
{
  $sql = $sql . " OFFSET " . $offset;
}

$result = mysqli_query($con, $sql);

echo json_encode(mysqli_fetch_all($result));

?>
