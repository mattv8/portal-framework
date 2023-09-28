<?php
/*
    Custom PHP Functions
*/
require_once($_SERVER['DOCUMENT_ROOT'] . '/framework/conf/config.php');
session_start(); // Continue session variables

# Fetches array from subarrays by key. Only works on uniform multidimensional arrays, i.e.
# $entries_map = array(
#   'Entry' => array( 'key' => 'FormId', 'faclass' => 'lock', 'type' => 'date'),
#   'Payment Status' => array( 'key' => 'Payment_Status', 'faclass' => 'clock-o', 'type' => 'date'),
# )
function array_from_subarray($array, $subkey)
{
    $subarray = array();
    foreach ($array as $key => $value) {
        $subarray[] = $value[$subkey];
    }
    return $subarray;
}

# Fetches list of sites
function getSites($db_conn)
{
    $SiteDataQuery = mysqli_query($db_conn, "SELECT * FROM `sites` ORDER BY SiteId ASC;");
    $SiteData = array(); // Preallocate
    if ((mysqli_num_rows($SiteDataQuery)) > 0) {
        $i = 0;
        while ($rows = $SiteDataQuery->fetch_assoc()) {
            $SiteData[$i]['siteId'] = $rows['SiteId']; // Store groups into array
            $SiteData[$i]['siteName'] = $rows['SiteName']; // Store groups into array
            $SiteData[$i]['siteHTMLName'] = strtolower(str_replace(" ", "-", $rows['SiteName'])); // Store groups into array
            $i++;
        }
    }
    return $SiteData;
}

# Simple function to pretty-print out all the field names from an associative array
function getSiteMemberships(mysqli $db_conn, String $currentUser)
{
    $UserData = mysqli_query($db_conn, "SELECT * FROM users WHERE username = '" . $currentUser . "';");
    $siteMemberships = array(); // Preallocate
    if ((mysqli_num_rows($UserData)) > 0) {
        $rows = mysqli_fetch_assoc($UserData); // Fetch all the rows in an array
        $siteMemberships = $_SESSION["siteMemberships"] = json_decode($rows['siteMemberships']); // Store groups into array
    }
    return $siteMemberships;
}

# Query User Table for list of users
function getAllUserData($db_conn)
{
    $AllUserDataQuery = mysqli_query($db_conn, "SELECT * FROM users;");
    $AllUserData = array(); // Preallocate
    if ((mysqli_num_rows($AllUserDataQuery)) > 0) {
        $i = 0;
        while ($row = $AllUserDataQuery->fetch_assoc()) {
            foreach ($row as $key => $value) {
                if ($key != "password") {
                    $AllUserData[$i][$key] = $value;
                }; // Store groups into array
            }
            $i++;
        }
    }
    return $AllUserData;
}

function getUserIP()
{
    // Method 1: Check for forwarded IP address
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = trim($_SERVER['HTTP_X_FORWARDED_FOR']);
        $ips = explode(',', $ip);
        $ip = array_pop($ips);
    }
    // Method 2: Check for IP address in the REMOTE_ADDR header
    elseif (isset($_SERVER['REMOTE_ADDR']) && !empty($_SERVER['REMOTE_ADDR'])) {
        $ip = trim($_SERVER['REMOTE_ADDR']);
    }
    // Method 3: Use fallback IP address
    else {
        $ip = '127.0.0.1';
    }

    // If the IP address is an IPv4 address, convert it to an IPv4-mapped IPv6 address
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        $ip = '::ffff:' . $ip;
    }

    // Remove any remaining whitespace and return the IP address
    return trim($ip);
}



/**
 * Logs an audit event in the database.
 *
 * This function inserts a new record into the `audit` table, with information about the user who performed
 * the action, the action itself, the user's IP address, and any additional information provided in the
 * $otherColumns parameter.
 *
 * @param object $db_conn A database connection object, created using the PDO class.
 * @param array|null $otherColumns An optional array of additional columns and values to insert into the `audit` table.
 *                                 If null or empty, no additional columns will be inserted.
 * @return bool Returns true if the insert was successful, false otherwise.
 */
function auditLog($db_conn, $otherColumns = null)
// function auditLog($db_conn, $currentUser, $action, $otherColumns = array('formId' => 1, 'eventId' => 2))
{
    $ip = getUserIP();
    $currentUser = $_SESSION['username'];

    // If $otherColumns is null or empty, set it to an empty array
    if ($otherColumns) {
        $columns = "`" . implode('`,`', array_keys($otherColumns)) . "`";
        $values = "'" . implode('\', \'', array_values($otherColumns)) . "'";
    } else {
        $columns = $values = "";
    }

    $insertAuditLogQuery = "
        INSERT INTO `audit` (
            `id`,
            `timestamp`,
            `currentUser`,
            `ipAddress`,
            $columns
        ) VALUES (
            NULL,
            NULL,
            '$currentUser',
            '$ip',
            $values
        );
    ";
    return $db_conn->query($insertAuditLogQuery);
}




/**
 * Retrieves all user data for managers who are members of a specific site.
 *
 * @param mysqli $db_conn The MySQL database connection.
 * @param int $siteId The ID of the site to query for managers.
 * @param bool $adminsOnly Returns only admins. If false, will return all members of the given $siteId.
 *
 * @return array|false An array of manager data for matching rows or false on failure.
 *
 * @example
 * Example Use:
 *   $siteId = $submission['siteId'];
 *   $managers = getManagers($db_conn, $siteId);
 */
function getMembers($db_conn, $siteId, $adminsOnly = false)
{
    $managers = array();

    $query = "SELECT *
              FROM users u
              JOIN sites s ON JSON_CONTAINS(u.siteMemberships, JSON_QUOTE(s.SiteName))
              WHERE s.SiteId = $siteId
              AND active = '1'
              ";

    $query .= ($adminsOnly) ? "AND isadmin = '1';" : ";";

    $result = mysqli_query($db_conn, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $managers[] = $row;
        }
        mysqli_free_result($result);
    } else {
        return false; // Return false on query execution failure
    }

    mysqli_close($db_conn); // Explicitly close the connection

    return $managers; // Return the array of managers
}
