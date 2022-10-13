<?php

#==============================================================================
# Version
#==============================================================================
$version = 0.0;
$error = "";// Clear any error messages

#==============================================================================
# Configuration
#==============================================================================
require_once("framework/conf/config.php");

#==============================================================================
# Language
#==============================================================================
require_once("framework/lib/detectbrowserlanguage.php");
# Available languages
$files = glob("framework/lang/*.php");
$languages = str_replace(".php", "", $files);
$lang = detectLanguage($lang, $languages);
require_once("$lang.php");
if (file_exists("framework/conf/$lang.php")) {
    require_once("framework/conf/$lang.php");
}

#==============================================================================
# Smarty
#==============================================================================
require_once(SMARTY);

$compile_dir = $smarty_compile_dir ? $smarty_compile_dir : "cache";
$cache_dir = $smarty_cache_dir ? $smarty_cache_dir : "cache/smarty";

$smarty = new Smarty();
$smarty->escape_html = true;
$smarty->setTemplateDir('/');
$smarty->setCompileDir($compile_dir);
$smarty->setCacheDir($cache_dir);
$smarty->debugging = $smarty_debug;

error_reporting(0);
if ($debug) {
    error_reporting(E_ALL);
    # Set debug for LDAP
    ldap_set_option(NULL, LDAP_OPT_DEBUG_LEVEL, 7);
}

# Assign configuration variables
$smarty->assign('ldap_params',array('ldap_url' => $ldap_url, 'ldap_starttls' => $ldap_starttls, 'ldap_binddn' => $ldap_binddn, 'ldap_bindpw' => $ldap_bindpw, 'ldap_user_base' => $ldap_user_base, 'ldap_user_filter' => $ldap_user_filter));
$smarty->assign('logo',$logo);
$smarty->assign('background_image',$background_image);
$smarty->assign('custom_css',$custom_css);
$smarty->assign('date_specifiers',$date_specifiers);
if (is_array($datatables_page_length_choices)) $datatables_page_length_choices = implode(', ', $datatables_page_length_choices);
$smarty->assign('datatables_page_length_choices', $datatables_page_length_choices);
$smarty->assign('datatables_page_length_default', $datatables_page_length_default);
$smarty->assign('datatables_auto_print', $datatables_auto_print);
$smarty->assign('version',$version);

$smarty->assign('display_footer',$display_footer);
$smarty->assign('logout_link',$logout_link);
$smarty->assign('default_page',$default_page);

# Assign messages
$smarty->assign('lang',$lang);
foreach ($messages as $key => $message) {
    $smarty->assign('msg_'.$key,$message);
}

#==============================================================================
# Authentication
#==============================================================================

switch ($auth_type) {
    case 'none':
        $isadmin = true;
        $authenticated = true;
        break;
    default:
        file_exists("framework/auth/auth_$auth_type.php") ? require_once("framework/auth/auth_$auth_type.php") : $error = 'specifyauth'; // Loads auth driver functions
        require_once("framework/auth/login.php");// Maintains session variables
        $isadmin = $_SESSION["isadmin"];
        $authenticated = $_SESSION["authenticated"];
}

$smarty->assign('authenticated',$authenticated);
$smarty->assign('isadmin',$isadmin);
$smarty->assign('displayname',$_SESSION["displayname"]);

#==============================================================================
# Route to page
#==============================================================================
$page = "login";// Default route to login page

if ( $authenticated ) { $page = isset($default_page)?$default_page:'error'; }// If authenticated, route to default page
if ( isset($_GET["page"]) and $_GET["page"] and !$authenticated) { $page = "login"; }// If not authenticated, route to login
if ( isset($_GET["page"])  and $_GET["page"] and $_GET["page"] != "login" and $authenticated) { $page = $_GET["page"]; }
if ( file_exists($page.".php") ) { require_once($page.".php"); }
else if ( file_exists("framework/".$page.".php") ) { require_once("framework/".$page.".php"); }
$smarty->assign('page',$page);

if ($page === "error") {
    $smarty->assign('error',$messages['pagenotfound']);
}
else if ($error) {
    $smarty->assign('error',$messages[$error]);
} 
else {
    $smarty->assign('error',"");
}

# Display
if ( file_exists("index.tpl") ) {// Allow override with local index.tpl
    $smarty->display('index.tpl');
} else {
    $smarty->display('framework/tpl/index.tpl');
}

?>
