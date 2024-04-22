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
                            <li class="breadcrumb-item active">Update Admin Password</li>
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
                                <h3 class="card-title">Update Admin Password</h3>
                            </div>
                            <!-- /.card-header -->
                            @if (session('error_message'))
                                <div class="alert alert-danger" role="alert">
                                    {{ session('error_message') }}
                                </div>
                            @endif
                            
                            @if (session('success_message'))
                                <div class="alert alert-success" role="alert">
                                    {{ session('error_message') }}
                                </div>
                            @endif
                            <!-- form start -->
                            <form action="{{ url('admin/update-password') }}" method="post">
                                @csrf
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="admin_email">Email address</label>
                                        <input class="form-control" id="admin_email"
                                            value="{{ Auth::guard('admin')->user()->email }}" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="current_pass">Current Password</label>
                                        <input type="password" class="form-control" id="current_pass" name="current_pass"
                                            placeholder="Current Password"><span id="verifyCurrentPass"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="new_pass">New Password</label>
                                        <input type="password" class="form-control" id="new_pass" name="new_pass"
                                            placeholder="New Password">
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm_pass">Confirm Password</label>
                                        <input type="password" class="form-control" id="confirm_pass" name="confirm_pass"
                                            placeholder="Confirm Password">
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
