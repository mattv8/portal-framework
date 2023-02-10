{* Framework Footer Scripts *}
{literal} 
  <script type="text/javascript">
  
    // Back button functionality
    $(window).on('popstate', function(event) {
      var page = event.originalEvent.state;// get the page from the state of the event
      goToPage(page);// make an AJAX request to update the page
    });
  
  </script>
{/literal}

{* Custom Footers *}
{if file_exists("templates/footer.tpl")}
  {include file="templates/footer.tpl"}
{/if}

{* Load Universal Modals *}
{if $auth_type neq "none" and isset($authenticated) and $authenticated}
  {include file="framework/tpl/modals/modal.navbuttons.tpl"}{* Load Nav Button Modals *}
  {include file="framework/tpl/modals/modal.errors.tpl"}{* Load Error Handling Modals *}
{/if}

{* Load Page-specific Modals *}
{if file_exists("templates/modals/modal.$page.tpl")}
  {include file="templates/modals/modal.$page.tpl"}
{else if file_exists("framework/tpl/modals/modal.$page.tpl")}
  {include file="framework/tpl/modals/modal.$page.tpl"}
{/if}

</html>
