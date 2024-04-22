@extends('admin.layout.layout')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Settings</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Update Admin Details</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-6">
                        <!-- general form elements -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Update Admin Details</h3>
                            </div>
                            <!-- /.card-header -->
                            @if(session()->has('error_ message'))
                                <div class="alert alert-success">
                                    {{ session()->get('error_message') }}
                                </div>
                            @endif
                            @if(session()->has('success_message'))
                                <div class="alert alert-success">
                                    {{ session()->get('success_message') }}
                                </div>
                            @endif
                            @if(count($errors) > 0)
                            <div class="p-1">
                                @foreach($errors->all() as $error)
                                <div class="alert alert-warning alert-danger fade show" role="alert">{{$error}} <button type="button" class="close"
                                        data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button></div>
                                @endforeach
                            </div>
                            @endif
                            <!-- form start -->
                            <form action="{{ url('admin/update-admin') }}" method="post">
                                @csrf
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="admin_username">Username</label>
                                        <input type="text" class="form-control" id="admin_username" name="admin_username"
                                        value="{{ Auth::guard('admin')->user()->username }}" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="admin_name">Name</label>
                                        <input type="text" class="form-control" id="admin_name" name="admin_name"
                                            value="{{ Auth::guard('admin')->user()->name }}">
                                    </div>
                                    <div class="form-group">
                                        <label for="admin_email">Email address</label>
                                        <input class="form-control" id="admin_email"
                                            value="{{ Auth::guard('admin')->user()->email }}">
                                    </div>
                                    <div class="form-group">
                                        <label for="admin_phone">Phone</label>
                                        <input type="text" class="form-control" id="admin_phone" name="admin_phone"
                                        value="{{ Auth::guard('admin')->user()->phone }}">
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                        <!-- /.card -->

                    </div>
                    <!--/.col (left) -->
                    <!-- right column -->
                    <!--/.col (right) -->
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@endsection
