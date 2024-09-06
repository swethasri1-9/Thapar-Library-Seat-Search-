<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the rollNumber is set in the POST data
    if (isset($_POST['rollNumber'])) {
        // Get the rollNumber from the POST data
        $rollNumber = $_POST['rollNumber'];

        // Read valid roll numbers from the text file
        $validRollNumbers = file('rollnum.txt', FILE_IGNORE_NEW_LINES);

        // Check if the submitted rollNumber is valid
        if (in_array($rollNumber, $validRollNumbers)) {
            // Roll number is valid, respond with JSON indicating validity
            echo json_encode(array("valid" => true));
            exit(); // Stop script execution after sending the response
        } else {
            // Roll number is invalid, respond with JSON indicating invalidity
            echo json_encode(array("valid" => false));
            exit(); // Stop script execution after sending the response
        }
    } else {
        // Roll number is not provided in the POST data
        echo json_encode(array("error" => "Roll number is not provided"));
        exit(); // Stop script execution after sending the response
    }
} else {
    // Invalid request method, respond with JSON indicating error
    echo json_encode(array("error" => "Invalid request method"));
    exit(); // Stop script execution after sending the response
}
?>
