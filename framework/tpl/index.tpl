{if file_exists("header.tpl")}
    {include file="header.tpl"}
{else}
    {include file="framework/tpl/header.tpl"}
{/if}

<div class="panel panel-success">
<div class="panel-body">

{if file_exists("menu.tpl")}
    {include file="menu.tpl"}
{else}
    {include file="framework/tpl/menu.tpl"}
{/if}

{if $page_title}
<div class="alert alert-info">
    <p class="lead text-center">{$msg_{$page_title}}</p>
</div>
{/if}

{if $error or $page eq 'error'}
<div class="alert alert-danger">
    <i class="fa fa-fw fa-exclamation-circle"></i> {$error}
</div>
{else}
    {if file_exists("$page.tpl")}
        {include file="$page.tpl"}
    {else if file_exists("framework/tpl/$page.tpl")}
        {include file="framework/tpl/$page.tpl"}
    {else}
        <div class="alert alert-danger">
            <i class="fa fa-fw fa-exclamation-circle"></i> {$msg_{'pagenotfound'}} ($page={$page})
        </div>  
    {/if}
{/if}

</div>
</div>

{if file_exists("footer.tpl")}
    {include file="footer.tpl"}
{else}
    {include file="framework/tpl/footer.tpl"}
{/if}