<?php
#==============================================================================
# Webguy Portal Framework v2.0
#
#==============================================================================

#==============================================================================
# PLEASE DO NOT MODIFY VALUES IN THIS FILE
# Default values are kept in this file. Please create a file called
# "config.inc.local.php" and place your override values there.
#==============================================================================

# Language
$lang ="en";
$date_specifiers = "%Y-%m-%d %H:%M:%S (%Z)";

# Default page
$default_page = "examplepage";// First page to show upon authentication

# Graphics
$logo = "framework/images/logo.png";
$background_image = "framework/images/unsplash-space.jpeg";
$custom_css = "";
$display_footer = true;
#$logout_link = "http://auth.example.com/logout";
$page_bg_color_class = 'bg-light';// See https://getbootstrap.com/docs/5.0/utilities/background/ for examples of valid classes

# Debug mode
$debug = false;
$smarty_debug = false;

# Cache directory
$smarty_compile_dir = "cache";
$smarty_cache_dir = "cache/smarty";

# Authentication
// Specify whether you'd like to secure the portal with authentication.
$auth_type = 'none';//Chose from 'none', 'ldap' or 'sql';


# SQL Configuration
$db_servername = "example.com";
$db_username = "username";
$db_password = "password";
$db_name = "database";


# LDAP Configuration
$ldap_url = "ldap://localhost";
$ldap_starttls = false;
$ldap_binddn = "cn=manager,dc=example,dc=com";
$ldap_bindpw = "secret";
$ldap_base = "dc=example,dc=com";
$ldap_user_base = "ou=users,".$ldap_base;
$ldap_user_filter = "(objectClass=inetOrgPerson)";
$ldap_size_limit = 100;
#$ldap_default_ppolicy = "cn=default,ou=ppolicy,dc=example,dc=com";
$ldap_user_attributes = array('uid', 'cn', 'mail', 'samaccountname');

# LDAP Authentication Configuration. These are pre-filled with examples, please modify to suit your needs.
$ldap_allowed_admin_users = array("Administrator");// UID's or SamAccountName(s) of users who are allowed to login and edit all accounts.
$ldap_allowed_admin_ous = array("OU=Managers,DC=example,DC=com");// Organizational Unit(s) of users who are allowed to login and edit all accounts.
$ldap_allowed_admin_groups = array("CN=Administrators,OU=Groups,DC=example,DC=com");// Security Group(s) of users who are allowed to login and edit all accounts.
$ldap_disallowed_ous = array("OU=Guests,DC=example,DC=com");// Organizational Units of users who are NOT allowed to log in at all.

# Allow to override by including *.local.php files
$files = glob('*.local.php');
foreach($files as $file) {
    include $file;
}

# Smarty
if (!defined("SMARTY")) {
    define("SMARTY", "framework/vendor/smarty4/libs/Smarty.class.php");
}

?>