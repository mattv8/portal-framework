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

  {* Javascript *}
  <script src="framework/vendor/jquery/js/jquery-3.6.1.min.js"></script>
  <script src="framework/vendor/bootstrap5/js/bootstrap.bundle.min.js"></script>
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
<body>

<div class="container">
