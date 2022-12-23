<nav class="navbar navbar-expand-lg bg-transparent">

  <div class="container-fluid">
    {if $logo}
      <a class="navbar-brand" href="index.php"><img src="{$logo}" alt="Logo" class="menu-logo img-responsive" /></a>
    {else}
      <a class="navbar-brand" href="index.php">{$msg_title}</a>
    {/if}
    
    {* Navbar Collapse Button *}
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    {* Collapsable Menu Items *}
    <div class="container collapse navbar-collapse" id="navbarSupportedContent">

      {if ($auth_type neq "none" and $authenticated) and $isadmin}
      <div class="col d-grid gap-2 d-md-flex">
        
        {* Nav Buttons *}
        {foreach from=$nav_buttons item=button key=btn_name}
        <button class="btn btn-{$button.btn_color} my-1" id="{$btn_name}Button" ><i class="fa fa-fw fa-{$button.faclass} me-1"></i>{$button.title|@ucfirst}</button>
        {/foreach}

      </div>
      {/if}
      
      {* Logout/Login Button*}
      {if $auth_type neq "none" and isset($authenticated)}
      <div class="col d-grid gap-2 d-md-flex justify-content-xl-end">
        <button type="button" class="btn btn-success my-1" onclick="logoff()" title="Log off"><i class="fa fa-fw fa-sign-out"></i> {$msg_logout}</button>
      </div>
      {/if}
      
    </div>{* END Collapsable Menu Items *}

  </div>{* END container-fluid *}

</nav>{* END nav *}

{* Welcome Banner *}
{if ($auth_type neq "none" and $authenticated) and $page eq $default_page}
  <div class="alert alert-success" role="alert">
    <i class="fa fa-fw fa-info-circle"></i> Welcome, {$displayname}.
    <span style="float: right;">{if $isadmin} You have admin privileges.{/if}
      <button  class="fa fad fa-remove inline-icon" onclick="this.closest('div').remove()"></button></span>
    </span>
  </div>
{/if}