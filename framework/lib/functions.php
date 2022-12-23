<?php
/*
    Custom PHP Functions
*/
require_once($_SERVER['DOCUMENT_ROOT'].'/framework/conf/config.php');

# Fetches array from subarrays by key. Only works on uniform multidimensional arrays, i.e.
# $entries_map = array(
#   'Entry' => array( 'key' => 'FormId', 'faclass' => 'lock', 'type' => 'date'),
#   'Payment Status' => array( 'key' => 'Payment_Status', 'faclass' => 'clock-o', 'type' => 'date'),
# )
function array_from_subarray($array, $subkey) {
    $subarray = array();
    foreach ($array as $key => $value) {
        $subarray[] = $value[$subkey];
    }
    return $subarray;
}

# Fetches list of sites
function getSites($db_conn) {
    $SiteDataQuery = mysqli_query($db_conn, "SELECT * FROM `sites` ORDER BY SiteId ASC;");
    $SiteData = array();// Preallocate
    if((mysqli_num_rows($SiteDataQuery)) > 0) {
        $i = 0;
        while ($rows = $SiteDataQuery->fetch_assoc()) {
            $SiteData[$i]['siteId'] = $rows['SiteId'];// Store groups into array
            $SiteData[$i]['siteName'] = $rows['SiteName'];// Store groups into array
            $SiteData[$i]['siteHTMLName'] = strtolower(str_replace(" ", "-", $rows['SiteName']));// Store groups into array
            $i++;
        }
    }
    return $SiteData;
}

# Simple function to pretty-print out all the field names from an associative array
function getSiteMemberships(String $username, mysqli $db_conn) {
    $UserData = mysqli_query($db_conn, "SELECT * FROM users WHERE username = '" . $username . "';");
    $siteMemberships = array();// Preallocate
    if((mysqli_num_rows($UserData)) > 0) {
        $rows = mysqli_fetch_assoc($UserData);// Fetch all the rows in an array
        $siteMemberships = $_SESSION["siteMemberships"] = json_decode($rows['siteMemberships']);// Store groups into array
    }
    return $siteMemberships;
}

?>