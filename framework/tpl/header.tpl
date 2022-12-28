<!DOCTYPE html>
<html lang="{$lang}">
<head>
  <title>{$msg_title}</title>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="author" content="LDAP Tool Box" />
  
  {* Stylesheets *}
  <link rel="stylesheet" type="text/css" href="framework/vendor/bootstrap5/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="framework/vendor/font-awesome/css/all.min.css" />
  <link rel="stylesheet" type="text/css" href="framework/css/portal.css" />
  <link rel="stylesheet" type="text/css" href="framework/vendor/datatables/dataTables.bootstrap5.min.css" />
  <link rel="stylesheet" type="text/css" href="framework/vendor/datepicker-lightpick/css/lightpick.css" />
  <link rel="stylesheet" type="text/css" href="framework/vendor/select2/css/select2.min.css" />

  {* Load Javascript Config Object *}
  <script>
    "use strict";
    window.GLOBAL = {}; // GLOBAL Object namespace
    GLOBAL.config = {$js_config|json_encode nofilter};
    GLOBAL.config.sites = {$sites|json_encode nofilter};
    GLOBAL.config.siteMemberships = {$siteMemberships|json_encode nofilter};
    GLOBAL.config.currentUser = {$currentUser|json_encode nofilter};

    {if !isset($debug) or !$debug }{literal}
      const msg = 'The console has been disabled for security purposes. Set $debug = true; in config.php to re-enable.';
      const console = {
        log : function(){ return msg; },
        warn : function(){ return msg; },
        error : function(){ return msg; },
        time : function(){ return msg; },
        timeEnd : function(){ return msg; },
      };
    {/literal}{/if}
  </script>

  {* Javascript *}
  <script src="framework/vendor/jquery/js/jquery-3.6.1.min.js"></script>
  <script src="framework/vendor/bootstrap5/js/bootstrap.bundle.min.js"></script>
  <script src="framework/vendor/datatables/datatables.min.js"></script>
  <script src="framework/vendor/datatables/dataTables.bootstrap5.min.js"></script>
  <script src="framework/vendor/moment/moment.min.js"></script>
  <script src="framework/vendor/datepicker-lightpick/js/lightpick.js"></script>
  <script src="framework/vendor/select2/js/select2.full.min.js"></script>
  <script src="framework/js/functions.js"></script>

  {* Load Custom Headers *}
  {if file_exists("templates/header.tpl")}
      {include file="templates/header.tpl"}
  {/if}
  
{if $custom_css}
  <link rel="stylesheet" type="text/css" href="{$custom_css}" />
{/if}
    <link href="framework/images/favicon.ico" rel="icon" type="image/x-icon" />
    <link href="framework/images/favicon.ico" rel="shortcut icon" />
{if $background_image}
  <style>
    html, body {
      background: url({$background_image}) no-repeat center fixed;
      background-size: cover;
    }
  </style>
{/if}

</head>