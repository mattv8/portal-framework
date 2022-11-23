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
# Smarty Environment
#==============================================================================
require_once(SMARTY);

$compile_dir = $smarty_compile_dir ? $smarty_compile_dir : "cache";
$cache_dir = $smarty_cache_dir ? $smarty_cache_dir : "cache/smarty";

$smarty = new Smarty();
$smarty->escape_html = true;
$smarty->setTemplateDir('/templates');
$smarty->setCompileDir($compile_dir);
$smarty->setCacheDir($cache_dir);

#==============================================================================
# Logging
#==============================================================================
error_reporting(0);
if ($debug) {
    error_reporting(E_ALL);
    # Set debug for LDAP
    ldap_set_option(NULL, LDAP_OPT_DEBUG_LEVEL, 7);
}
$smarty->assign('debug',$debug);
$smarty->debugging = $smarty_debug;

#==============================================================================
# Language
#==============================================================================
require_once("framework/lib/detectbrowserlanguage.php");
# Load available languages
$files = glob("framework/lang/*.php");
$languages = str_replace(".php", "", $files);
$lang = detectLanguage($lang, $languages);
require_once("$lang.php");
if (file_exists("framework/conf/$lang.php")) {
    require_once("framework/conf/$lang.php");
}

#==============================================================================
# Misc Configurations
#==============================================================================

# Assign configuration variables
$smarty->assign('ldap_params',array('ldap_url' => $ldap_url, 'ldap_starttls' => $ldap_starttls, 'ldap_binddn' => $ldap_binddn, 'ldap_bindpw' => $ldap_bindpw, 'ldap_user_base' => $ldap_user_base, 'ldap_user_filter' => $ldap_user_filter));
$smarty->assign('logo',$logo);
$smarty->assign('background_image',$background_image);
$smarty->assign('page_bg_color_class',$page_bg_color_class);
$smarty->assign('custom_css',$custom_css);
$smarty->assign('date_specifiers',$date_specifiers);
if (is_array($datatables_page_length_choices)) $datatables_page_length_choices = implode(', ', $datatables_page_length_choices);
$smarty->assign('datatables_page_length_choices', $datatables_page_length_choices);
$smarty->assign('datatables_page_length_default', $datatables_page_length_default);
$smarty->assign('datatables_auto_print', $datatables_auto_print);
$smarty->assign('version',$version);
$smarty->assign('js_config_obj',$js_config_obj);// Javascript Config Object
$smarty->assign('display_footer',$display_footer);
$smarty->assign('logout_link',$logout_link);
$smarty->assign('default_page',$default_page);

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
$smarty->assign('auth_type',$auth_type);
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

#==============================================================================
# Local PHP Overrides
#==============================================================================
$files = glob('*.local.php');
foreach($files as $file) {// Allow to override by including *.local.php files
    if ($file != 'config.local.php') { include $file; }// Ignore special case for config.local.php which is loaded above
}
# Allow to override/append language file with individual custom messages
if (isset($custom_messages)) {
    $messages = array_merge($messages, $custom_messages);
}
# Assign messages
$smarty->assign('lang',$lang);
foreach ($messages as $key => $message) {
    $smarty->assign('msg_'.$key,$message);
}

#==============================================================================
# Render Page
#==============================================================================
if ($page === "error") {
    $smarty->assign('error',$messages['pagenotfound']);
}
else if ($error) {
    $smarty->assign('error',$messages[$error]);
} 
else {
    $smarty->assign('error',"");
}

if ( file_exists("templates/index.tpl") ) {// Allow override with local index.tpl
    $smarty->display('templates/index.tpl');
} else {
    $smarty->display('framework/tpl/index.tpl');
}

?>
