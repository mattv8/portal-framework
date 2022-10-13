<div class="card ">
    <div class="card-header text-center">
        <i class="fa fa-fw fa-check-circle"></i>{$msg_login}
    </div>

    <div  class="card-body inset-2" id="login" method="post" action="index.php?page=login" name="login">
        {if $autherror neq '' and isset($msg_{$autherror})}
        <div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-triangle"></i> {$msg_{$autherror}}</div>
        {elseif $autherror neq ''}
        <div class="alert alert-danger"><i class="fa fa-fw fa-exclamation-triangle"></i> Error: {$autherror}</div>
        {/if}
        <form action="index.php?page=login" name="login" method="post">
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-fw fa-user"></i></span>
                <input type="username" name="username" id="username" class="form-control" placeholder="{$msg_username}" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa fa-fw fa-lock"></i></span>
                <input type="password" name="password" id="password" class="form-control" placeholder="{$msg_password}" />
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary"><i class="fa fa-fw fa-check-square-o"></i> {$msg_submit}</button>
            </div>
        </form>
    </div>
    
</div>