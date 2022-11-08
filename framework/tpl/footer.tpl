</div>

{if $display_footer}
<div id="footer">Webguy Portal Framework - version {$version}</div>
{/if}

{* Custom Footers *}
{if file_exists("templates/footer.tpl")}
  {include file="templates/footer.tpl"}
{/if}

</body>
</html>
