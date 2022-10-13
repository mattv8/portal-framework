<div class="navbar-wrapper">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">

    <div class="container-fluid">
      {if $logo}
        <a class="navbar-brand" href="#"><img src="{$logo}" alt="Logo" class="menu-logo img-responsive" /></a>
      {else}
        <a class="navbar-brand" href="#">{$msg_title}</a>
      {/if}
      
      {* Navbar Collapse Button *}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      {* Collapsable Menu Items *}
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success me-2" type="submit">Search</button>
        </form>

        {* Logout/Login Button*}
        {if $auth_type neq "none" and isset($authenticated)}
          <form class="d-flex" action="index.php?page=login" method="post">
              <button class="btn btn-outline-success me-2" type="submit" name="logoff" value="yes">
                <i class="fa fa-fw fa-sign-out"></i> {$msg_logout}
              </button>
          </form>
        {/if}
        
      </div>{* END Collapsable Menu Items *}

    </div>{* END container-fluid *}

  </nav>{* END nav *}
</div>{* END navbar-wrapper *}

{* Welcome Banner *}
{if ($auth_type neq "none" or $authenticated) and $page eq $default_page}
  <div class="alert alert-success"><i class="fa fa-fw fa-info-circle"></i> Welcome, {$displayname}.
  {if $isadmin}<span style="float: right;"> You have admin privileges.</span>{/if}
  </div>
{/if}