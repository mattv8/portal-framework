<div class="card {$page_bg_color_class}">

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col col-lg-6 inset-1">
                {if $autherror neq '' and isset($msg_{$autherror})}
                    <div class="alert alert-warning"><i class="fa fa-fw fa-exclamation-triangle"></i> {$msg_{$autherror}}</div>
                {elseif $autherror neq ''}
                    <div class="alert alert-danger"><i class="fa fa-fw fa-exclamation-triangle"></i> Error: {$autherror}</div>
                {/if}
                <form action="index.php?page=login" class="card" name="login" method="post">
                    <div class="card-header text-center">
                        <i class="fa me-2 fa-user-lock"></i>{$msg_login}
                    </div>
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa fa-fw fa-user"></i></span>
                            <input type="username" name="username" id="username" class="form-control" placeholder="{$msg_username}" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa fa-fw fa-lock"></i></span>
                            <input type="password" name="password" id="password" class="form-control" placeholder="{$msg_password}" />
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-primary col-sm-4"><i class="fa me-2 fa-check-circle"></i>{$msg_submit}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>