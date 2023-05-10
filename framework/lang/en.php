<?php

// Continue session variables
session_start();
$displayname = $_SESSION["displayname"];

#==============================================================================
# English
#==============================================================================

$messages['title'] = "Portal Framework 2.0";
$messages['welcome'] = "This text can be overridden by setting \$custom_messages['welcome'] in a *.local.php file";

$messages['pagenotfound'] = "The requested page was not found.";
$messages['example1'] = "Example item 1";
$messages['example2'] = "Example item 2";
$messages['examplelink'] = "Example Submit Button";
$messages['login'] = "Please login to continue";
$messages['logout'] = "Logout";
$messages['password'] = "Password";
$messages['search'] = "Search";
$messages['searchrequired'] = "Please enter your search";
$messages['specifyauth'] = "Please specify a valid authentication method in config.inc.php (currently \$auth_type=".((isset($auth_type) and !empty($auth_type))?$auth_type:"null").").";
$messages['submit'] = "Submit";
$messages['username'] = "Username";
$messages['welcomeuser'] = "Welcome, $displayname";

?>
