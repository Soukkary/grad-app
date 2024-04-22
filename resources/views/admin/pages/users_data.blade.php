@extends('admin.layout.layout')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Users Information</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Users</li>
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
                    <div class="col-12">
                        @if (session()->has('success_message'))
                            <div class="alert alert-success">
                                {{ session()->get('success_message') }}
                            </div>
                        @endif
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Users</h3>
                                <!--<a style="max-width: 150px;float:right;display:inline-block;"
                                    href="{{ url('admin/add-edit-subadmin') }}" class="btn btn-block btn-primary">Add User</a>-->
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="subadmins" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Email Verified on</th>
                                            <th>Created on</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($userData as $user)
                                            <tr>
                                                <td>{{$user['id']}}</td>
                                                <td>{{$user['firstName']}}</td>
                                                <td>{{$user['lastName']}}</td>
                                                <td>{{$user['email']}}</td>
                                                <td>{{$user['phone']}}</td>
                                                @if($user['email_verified_at']=='')
                                                <td></td>
                                                @else
                                                <td>{{ date("F j, Y, g:i a", strtotime($user['email_verified_at'])) }}</td> @endif
                                                <td>{{ date("F j, Y, g:i a", strtotime($user['created_at'])) }}</td>
                                                <td>
                                                    @if($pagesModule['edit_access']==1 || $pagesModule['full_access']==1)
                                                        <a href="{{url('admin/add-edit-user-data/'.$user['id'].'/'.'users_info')}}"><i class="fas fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                    @endif
                                                    @if($pagesModule['full_access']==1)
                                                        <a href="{{url('admin/delete-user/'.$user['id'].'/'.'users_info')}}" class="confirmDelete" name="User" title="Delete User"><i class="fas fa-trash"></i></a>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
@endsection
