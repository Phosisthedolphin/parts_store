<?php include "connect.php";

// Steps to break down for testing.

// 1. Print only part numbers to the page.

// $sql = "SELECT part_number FROM parts WHERE part_number IS NOT NULL AND part_number <> '' ORDER BY part_number ASC";

// $result = mysqli_query($con, $sql);

// while ($row = $result->fetch_assoc()) {
//     echo $row['part_number']."<br>";
// }

// 2. Attempt to export part numbers in descending order to a CSV file output.

// $fp = fopen('../export/export.csv', 'w');
// while($row = $result-> fetch_assoc()) {
//     fputcsv($fp, $row);
// }
// fclose($fp);

$sql = "SELECT part_number FROM parts WHERE part_number IS NOT NULL AND part_number <> '' ORDER BY part_number ASC";

$result = mysqli_query($con, $sql);
$fp = fopen('../export/export.csv', 'w');
while ($row = $result-> fetch_assoc()) {
    if (!file_exists('../img/' . $row['part_number'] . ' A.jpeg')) {
        // echo $row['part_number']."<br>";
        fputcsv($fp, $row);
    }
}

?>