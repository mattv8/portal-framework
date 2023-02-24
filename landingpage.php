<?php

#==============================================================================
# Configuration
#==============================================================================
require_once($_SERVER['DOCUMENT_ROOT'].'/framework/conf/config.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/framework/lib/functions.php');

/*  Use this page to test GET requests to perform AJAX requests using Smarty. We go through
    index.php first so Smarty is configured correctly. Index.php will not display a page if
    there is a GET parameter "request" defined.

    Example: http://portal.dev.webguyinternet.com/?page=landingpage&request=testRequest
    -> This will echo out "Made it here".
*/

# Store GET request as variable to control which PHP is executed in this script.
if (isset($_GET["request"]) and $_GET["request"] and $authenticated) {

    $request = $_GET["request"];

}

if ( strcmp('testRequest',$request) == 0 ) {

    echo "Made it here";
    $smarty->display('framework/tpl/examplepage.tpl');

}

?>