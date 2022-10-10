{if file_exists("templates/header.tpl")}
    {include file="templates/header.tpl"}
{else}
    {include file="framework/tpl/header.tpl"}
{/if}

<div class="panel panel-success">
<div class="panel-body">

{if file_exists("templates/menu.tpl")}
    {include file="templates/menu.tpl"}
{else}
    {include file="framework/tpl/menu.tpl"}
{/if}

{if $page_title}
<div class="alert alert-info">
    <p class="lead text-center">{$msg_{$page_title}}</p>
</div>
{/if}

{if $error}
<div class="alert alert-danger">
    <i class="fa fa-fw fa-exclamation-circle"></i> {$error}
</div>
{else}
    {if file_exists("templates/$page.tpl")}
        {include file="templates/$page.tpl"}
    {else}
        {include file="framework/tpl/$page.tpl"}
    {/if}
{/if}

</div>
</div>

{if file_exists("templates/footer.tpl")}
    {include file="templates/footer.tpl"}
{else}
    {include file="framework/tpl/footer.tpl"}
{/if}