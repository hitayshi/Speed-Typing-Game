<?php
$name = $_POST['name'];
$email = $_POST["email"];
$score = $_POST["score"];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wp_project";
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sqlQuery = 'insert into gameScore (email,name,score) values("'.$email.'","'.$name.'",'.$score.')';
if ($conn->query($sqlQuery) === TRUE) {
    $sqlQuery='select distinct * from gameScore order by score desc limit 5';
    echo('<div class="table-responsive">
        <table class="table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th>
            </tr>
        </thead>
        <tbody>') ;
    $result = $conn->query($sqlQuery);
    while($row = $result->fetch_assoc()) {
       echo'<tr><td>'.$row['name'].'</td>';
       echo'<td>'.$row['email'].'</td>';
       echo'<td>'.$row['score'].'</td> </tr>';
     }
 
 echo ('</tbody></table></div>');

} else {
    echo "Error: ". $conn->error;
}
$conn->close();
?>
