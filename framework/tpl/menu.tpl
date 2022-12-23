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
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      {if ($auth_type neq "none" and $authenticated) and $isadmin}

        {foreach from=$nav_buttons item=button key=btn_name}
          <button class="btn btn-{$button.btn_color} mb-2 me-3" id="{$btn_name}Button" onclick="openModal({$button.modalId},this)"><i class="fa fa-fw fa-{$button.faclass} me-1"></i>{$button.title|@ucfirst}</button>
        {/foreach}
      
      {/if}

      {* Logout/Login Button*}
      {if $auth_type neq "none" and isset($authenticated)}
        <form class="d-flex ms-auto" action="index.php?page=login" method="post">
            <button class="btn btn-success p-2 me-2" type="submit" name="logoff" value="yes">
              <i class="fa fa-fw fa-sign-out"></i> {$msg_logout}
            </button>
        </form>
      {/if}
      
    </div>{* END Collapsable Menu Items *}

  </div>{* END container-fluid *}

</nav>{* END nav *}

{* Welcome Banner *}
{if ($auth_type neq "none" and $authenticated) and $page eq $default_page}
  <div class="alert alert-success"><i class="fa fa-fw fa-info-circle"></i> Welcome, {$displayname}.
  {if $isadmin}<span style="float: right;"> You have admin privileges.</span>{/if}
  </div>
{/if}