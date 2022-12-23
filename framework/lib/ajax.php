<?php
/*
 * Handle AJAX Requests
 * AJAX data must contain variable 'request'. See example below for best practices:
        $.ajax({
        type: 'GET',
        url: 'ajax.php',
        data: {request: 'org_units'},
        success: function(data){
            console.log(data);
        },
        error: function(xhr, status, error){
            console.error(xhr);
        }
        })
 */

require_once($_SERVER['DOCUMENT_ROOT'].'/framework/conf/config.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/framework/lib/functions.php');


# Store GET request as variable to control which PHP is executed in this script.
if (isset($_GET["request"]) and $_GET["request"]) {

    $request = $_GET["request"];

}


# Handle AJAX requests to query form submissions
if ( strcmp('getSites',$request) == 0 ) {
    // Test database connection
    if (isset($db_servername) and isset($db_username) and isset($db_password) and isset($db_name)) {// DB configuration check

        $db_conn = mysqli_connect($db_servername, $db_username, $db_password, $db_name);// Establish connection

        if ($db_conn) {// DB connection check
        
            $sites = getSites($db_conn);

            if (sizeof($sites) > 0) {
                echo json_encode( array('success' => true, 'msg' => null, 'data' => $sites) );
            } else {
                echo json_encode( array('sucesss' => false, 'msg' => "Error fetching site data.") );
            }

        }
    }
}


# Handle AJAX requests to query form submissions
if ( strcmp('site-memberships',$request) == 0 ) {

    // Test database connection
    if (isset($db_servername) and isset($db_username) and isset($db_password) and isset($db_name)) {// DB configuration check

        $db_conn = mysqli_connect($db_servername, $db_username, $db_password, $db_name);// Establish connection
        $username = $_GET["user"];

        if ($db_conn) {// DB connection check
            $siteMemberships = getSiteMemberships($username, $db_conn);
                
            # Create return variable in Select2 JSON data format (https://select2.org/data-sources/formats)
            $sub_options = array();
            for ($i=0; $i < sizeof($siteMemberships); $i++) {// For each site membership
                $sub_options[$i]['id'] = $siteMemberships[$i];
                $sub_options[$i]['text'] = $siteMemberships[$i];
            }
            $results = array_values($sub_options);
            echo json_encode($results);// Pass the results to javascript
        }
    }

}


# Handle AJAX requests to query form submissions
if ( strcmp('submitEdits',$request) == 0 ) {

    // Test database connection
    if (isset($db_servername) and isset($db_username) and isset($db_password) and isset($db_name)) {// DB configuration check

        $db_conn = mysqli_connect($db_servername, $db_username, $db_password, $db_name);// Establish connection
        $username = $_GET["user"];
        $key = $_GET["key"];
        $edits = $_GET["edits"];

        if (strcmp($key,'password')==0) { $edits = password_hash($edits, PASSWORD_DEFAULT); }// Hash password

        if ($db_conn) {// DB connection check
           
            $editQuery = "UPDATE users SET ".$key." = '".$edits."' WHERE username = '".$username."';";
            if ($db_conn->query($editQuery) === TRUE) {
                echo json_encode( array('success' => true, 'msg' => null) );
            } else {
                echo json_encode( array('sucesss' => false, 'msg' => "Error updating record: " . $db_conn->error) );
            }

        } else {
            echo json_encode( array('sucesss' => false, 'msg' => "Error updating record: " .mysqli_connect_error($db_conn)) );
        }
    }

}


# Handle AJAX requests to query form submissions
if ( strcmp('deleteUser',$request) == 0 ) {

    // INSERT INTO `users` (`username`, `password`, `isadmin`, `active`, `siteMemberships`, `email`) VALUES
    // ('test', '$2y$10$TfU.F8XzWbvMGbiHMaiKz.MMbtALcQFRIYXlRmyJjoDO8IFl.YXEm', 1, 0, '[\"Alta Summer Camp\"]', 'test@example.com');

    // Test database connection
    if (isset($db_servername) and isset($db_username) and isset($db_password) and isset($db_name)) {// DB configuration check

        $db_conn = mysqli_connect($db_servername, $db_username, $db_password, $db_name);// Establish connection
        $username = $_GET["user"];

        if ($db_conn) {// DB connection check
           
            $deleteQuery = "DELETE FROM users WHERE username = '".$username."';";
            if ($db_conn->query($deleteQuery) === TRUE) {
                echo json_encode( array('success' => true, 'msg' => null) );
            } else {
                echo json_encode( array('sucesss' => false, 'msg' => "Error updating record: " . $conn->error) );
            }

        }
    }

}


# Handle AJAX requests to query form submissions
if ( strcmp('createUser',$request) == 0 ) {

    // INSERT INTO `users` (`username`, `password`, `isadmin`, `active`, `siteMemberships`, `email`) VALUES
    // ('test', '$2y$10$TfU.F8XzWbvMGbiHMaiKz.MMbtALcQFRIYXlRmyJjoDO8IFl.YXEm', 1, 0, '[\"Alta Summer Camp\"]', 'test@example.com');

    // Test database connection
    if (isset($db_servername) and isset($db_username) and isset($db_password) and isset($db_name)) {// DB configuration check

        $db_conn = mysqli_connect($db_servername, $db_username, $db_password, $db_name);// Establish connection
        $submission = json_decode($_GET["values"],true);
        $submission['password'] = password_hash($submission['password'], PASSWORD_DEFAULT);// Hash password

        if ($db_conn) {// DB connection check
           
            $createQuery = "INSERT INTO users (".implode(', ',array_keys($submission)).") VALUES ('".implode('\', \'',array_values($submission))."');";

            if ($db_conn->query($createQuery) === TRUE) {
                echo json_encode( array('success' => true, 'msg' => 'success') );
            } else {
                echo json_encode( array('sucesss' => false, 'msg' => "Error updating record: " . $db_conn->error) );
            }

        }
    }

}
