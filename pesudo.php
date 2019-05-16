<?php 

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


$sql = "SELECT bin_description_2, bin_description_3, bin_description_4 FROM parts WHERE ";

$category_arr
(
	"bin_description_2 LIKE '%{$category}%' AND ",
	"bin_description_2 LIKE '%{$category}%' "
	"null"
);

$sub_category_arr
(
	"bin_description_3 LIKE '%{$sub_category}%' AND ",
	"bin_description_3 LIKE '%{$sub_category}%' ",
	"null"
);

$manufacturer_arr
(
	"bin_description_4 LIKE '%{$manufacturer}%' AND ",
	"bin_description_4 LIKE '%{$manufacturer}%' ",
	"null"
);

if (isset($_GET["category"]))
{
	$sql = $sql . $category_arr[0];
}
else
{
	$sql = $sql . $category_arr[2];
}
	

// if ($category != NULL) {
//	 $sql = $sql . "bin_description_2 LIKE '%{$category}%' AND ";
// }
// if ($sub_category != NULL) {
//	 $sql = $sql . "bin_description_3 LIKE '%{$sub_category}%' AND ";
// }
// if ($manufacturer != NULL) {
//	 $sql = $sql . "bin_description_4 LIKE '%{$manufacturer}%'";
// }

?>
