
{if $display_footer}
<div id="footer">Webguy Portal Framework - version {$version}</div>
{/if}

{* Custom Footers *}
{if file_exists("templates/footer.tpl")}
  {include file="templates/footer.tpl"}
{/if}

{* Load Nav Button Modals *}
{if $auth_type neq "none" and isset($authenticated) and $authenticated}
  {include file="framework/tpl/modals/modal.navbuttons.tpl"}
{/if}

{* Load Page-specific Modals *}
{if file_exists("templates/modals/modal.$page.tpl")}
  {include file="templates/modals/modal.$page.tpl"}
{else if file_exists("framework/tpl/modals/modal.$page.tpl")}
  {include file="framework/tpl/modals/modal.$page.tpl"}
{/if}

</html>
