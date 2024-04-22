@extends('admin.layout.layout')
@section('content')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>Sub-Admins</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">{{ $title }}</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="card card-default">
                    <div class="card-header">
                        <h3 class="card-title">{{ $title }}</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                @if (session()->has('success_message'))
                                    <div class="alert alert-success">
                                        {{ session()->get('success_message') }}
                                    </div>
                                @endif
                                @if (count($errors) > 0)
                                    <div class="p-1">
                                        @foreach ($errors->all() as $error)
                                            <div class="alert alert-warning alert-danger fade show" role="alert">
                                                {{ $error }} <button type="button" class="close"
                                                    data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span></button></div>
                                        @endforeach
                                    </div>
                                @endif
                                @if (session()->has('error_message'))
                                    <div class="alert alert-danger">
                                        {{ session()->get('error_message') }}
                                    </div>
                                @endif
                                <form name="subadminForm" id="subadminForm"
                                    action="{{ url('admin/update-role/' . $id) }}" method="post">
                                    @csrf
                                    <input type="hidden" name="subadmin_id" value="{{$id}}">
                                    @if(!empty($subadminRoles))
                                        @foreach ($subadminRoles as $role)
                                            @if($role['module']=="cms_pages")
                                                @php
                                                    $view = ($role['view_access'] == 1) ? "checked" : "";
                                                    $edit = ($role['edit_access'] == 1) ? "checked" : "";
                                                    $full = ($role['full_access'] == 1) ? "checked" : "";
                                                @endphp
                                            @elseif($role['module']=="users_info")
                                                @php
                                                    $view2 = ($role['view_access'] == 1) ? "checked" : "";
                                                    $edit2 = ($role['edit_access'] == 1) ? "checked" : "";
                                                    $full2 = ($role['full_access'] == 1) ? "checked" : "";
                                                @endphp
                                            @elseif($role['module']=="youtube")
                                                @php
                                                    $view3 = ($role['view_access'] == 1) ? "checked" : "";
                                                    $edit3 = ($role['edit_access'] == 1) ? "checked" : "";
                                                    $full3 = ($role['full_access'] == 1) ? "checked" : "";
                                                @endphp
                                            @elseif($role['module']=="payout")
                                                @php
                                                    $view4 = ($role['view_access'] == 1) ? "checked" : "";
                                                    $edit4 = ($role['edit_access'] == 1) ? "checked" : "";
                                                    $full4 = ($role['full_access'] == 1) ? "checked" : "";
                                                @endphp
                                            @endif
                                        @endforeach
                                    @endif
                                    <div class="card-body">
                                        <div class="form-group col-md-12">
                                            <label style="font-size: 15pt" for="cms_pages">CMS Pages: &nbsp;&nbsp;&nbsp;</label>
                                            <input type="checkbox" name="cmsview" value="1" @if(isset($view)) {{$view}} @endif>&nbsp;View Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="cmsedit" value="1" @if(isset($edit)) {{$edit}} @endif>&nbsp;View/Edit Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="cmsfull" value="1" @if(isset($full)) {{$full}} @endif>&nbsp;Full Access
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label style="font-size: 15pt" for="users_info">Users Information: &nbsp;&nbsp;&nbsp;</label>
                                            <input type="checkbox" name="usersinfoview" value="1" @if(isset($view2)) {{$view2}} @endif>&nbsp;View Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="usersinfoedit" value="1" @if(isset($edit2)) {{$edit2}} @endif>&nbsp;View/Edit Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="usersinfofull" value="1" @if(isset($full2)) {{$full2}} @endif>&nbsp;Full Access
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label style="font-size: 15pt" for="youtube">Youtube: &nbsp;&nbsp;&nbsp;</label>
                                            <input type="checkbox" name="youtubeview" value="1" @if(isset($view3)) {{$view3}} @endif>&nbsp;View Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="youtubeedit" value="1" @if(isset($edit3)) {{$edit3}} @endif>&nbsp;View/Edit Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="youtubefull" value="1" @if(isset($full3)) {{$full3}} @endif>&nbsp;Full Access
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label style="font-size: 15pt" for="payout">Payout Management: &nbsp;&nbsp;&nbsp;</label>
                                            <input type="checkbox" name="payoutview" value="1" @if(isset($view4)) {{$view4}} @endif>&nbsp;View Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="payoutedit" value="1" @if(isset($edit4)) {{$edit4}} @endif>&nbsp;View/Edit Access
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input type="checkbox" name="payoutfull" value="1" @if(isset($full4)) {{$full4}} @endif>&nbsp;Full Access
                                        </div>
                                    </div>
                                    <!-- /.card-body -->

                                    <div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                                <!-- /.form-group -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                    </div>
                </div>
                <!-- /.card -->
            </div>
            <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>

@endsection
