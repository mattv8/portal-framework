<?php
    
    echo "This text is being injected from index.local.php<br>";
    $test = "testing123";
    $smarty->assign('test',$test);// Just testing that Smarty is loading as well

?>