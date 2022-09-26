<?php

// Continue session variables
session_start();
$displayname = $_SESSION["displayname"];

#==============================================================================
# English
#==============================================================================

$messages['title'] = "Portal Framework 2.0";
$messages['welcome'] = "Welcome to the Webguy Internet Portal Framework v2";

$messages['example1'] = "Example item 1";
$messages['example2'] = "Example item 2";
$messages['examplelink'] = "Example Submit Button";
$messages['login'] = "Please login to continue";
$messages['logout'] = "Logout";
$messages['password'] = "Password";
$messages['passwordrefused'] = "Password is incorrect";
$messages['passwordrequired'] = "Please enter a password";
$messages['search'] = "Search";
$messages['searchrequired'] = "Please enter your search";
$messages['specifyauth'] = "Please specify a valid authentication method in config.inc.php (currently \$auth_type=".((isset($auth_type) and !empty($auth_type))?$auth_type:"null").").";
$messages['username'] = "Username";
$messages['usernamerequired'] = "Please enter a username";
$messages['usernotallowed'] = "Your account is not allowed to login. Please use an authorized account.";
$messages['usernotfound'] = "The entered username was not found. Please try again.";
$messages['welcomeuser'] = "Welcome, $displayname";

?>
