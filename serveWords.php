<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wp_project";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sqlQuery = "SELECT * FROM words WHERE id >= (SELECT ROUND( MAX(id) * RAND()) FROM words ) LIMIT 50";

$result = $conn->query($sqlQuery);
$wordsArray = array();
if ($result->num_rows > 0) {
 // output data of each row
 while($row = $result->fetch_assoc()) {
    
    $wordsArray[] = $row["word"];
 }
 $wordsArray = json_encode($wordsArray);
 echo($wordsArray);
} else {
 echo "0 results";
}
$conn->close();
?>