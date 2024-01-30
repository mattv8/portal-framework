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
    <div class="container-fluid px-2 collapse navbar-collapse" id="navbarSupportedContent">

      {if ($auth_type neq "none" and $authenticated) and $isadmin  and not $page|in_array:$public_pages}
      <div class="col d-grid gap-2 d-md-flex">

        {* Nav Buttons *}
        {foreach from=$nav_buttons item=button key=btn_name}
        {if $button.btn_type == 'modal'}
        <button class="btn btn-{$button.btn_color} mb-1" id="{$btn_name}Button" onclick="openModal({$button.modalId},this,{$button.modalFunction})"><i class="fa fa-fw fa-{$button.faclass} me-1"></i>{$button.title|@ucfirst}</button>
        {else if $button.btn_type == 'pageSmooth'}
        <button class="btn btn-{$button.btn_color} mb-1" id="{$btn_name}Button" onclick="goToPage('{$btn_name}','page-content')"><i class="fa fa-fw fa-{$button.faclass} me-1"></i>{$button.title|@ucfirst}</button>
        {else if $button.btn_type == 'page'}
        <button class="btn btn-{$button.btn_color} mb-1" id="{$btn_name}Button" onclick="window.location = '?page={$btn_name}'"><i class="fa fa-fw fa-{$button.faclass} me-1"></i>{$button.title|@ucfirst}</button>
        {/if}
        {/foreach}

      </div>
      {/if}

      {* Logout/Login Button*}
      {if $auth_type neq "none" and isset($authenticated) and $authenticated  and not $page|in_array:$public_pages}
      <div class="col d-grid gap-2 d-md-flex my-2 justify-content-lg-end">
        <button type="submit" class="btn btn-success" id="logoutButton" onclick="logoff()" title="Log off"><i class="fa fa-fw fa-sign-out"></i> {$msg_logout}</button>
      </div>
      {/if}

    </div>{* END Collapsable Menu Items *}

  </div>{* END container-fluid *}

</nav>{* END nav *}

{* Welcome Banner *}
{if ($auth_type neq "none" and $authenticated) and $page eq $default_page and not $page|in_array:$public_pages}
  <div class="container-fluid inset-1" id="welcome-banner">
    <div class="row alert alert-success" role="alert">
      <div class="col-auto me-auto my-1"><i class="fa fa-fw fa-info-circle"></i> Welcome, {$displayname}.</div>
      <div class="col-auto ms-auto my-1"><p class="text-right mb-0">{if $isadmin} You have admin privileges.{/if}</p></div>
      <div class="col-auto my-1"><button class="fa fa-fw fa-remove inline-icon" id="banner-dismiss" onclick="fadeOutAfter(document.getElementById('welcome-banner'),0,false,this)"></button></div>
    </div>
  </div>
  <script>fadeOutAfter(document.getElementById('welcome-banner'),10000,false,document.getElementById('banner-dismiss'))</script>{* fade banner out after 10 seconds *}
{/if}