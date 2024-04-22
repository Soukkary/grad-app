@extends('admin.layout.layout')
@section('content')

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>{{ $title }}</h1>
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
                                @if (count($errors) > 0)
                                    <div class="p-1">
                                        @foreach ($errors->all() as $error)
                                            <div class="alert alert-warning alert-danger fade show" role="alert">
                                                {{ $error }} <button type="button" class="close"
                                                data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>
                                            </div>
                                        @endforeach
                                    </div>
                                @endif
                                @if (session()->has('error_message'))
                                    <div class="alert alert-danger">
                                        {{ session()->get('error_message') }}
                                    </div>
                                @endif
                                <form name="subadminForm" id="subadminForm"
                                    @if (empty($subadmin['id'])) action="{{ url('admin/add-edit-subadmin') }}" @else action="{{ url('admin/add-edit-subadmin/' . $subadmin['id']) }}" @endif
                                    method="post">
                                    @csrf
                                    <div class="card-body">
                                        <div class="form-group col-md-6">
                                            <label for="username">Username*</label>
                                            <input @if ($subadmin['id'] != '') readonly @else required @endif
                                                type="text" class="form-control" id="username" name="username"
                                                placeholder="Enter Subadmin Username"
                                                @if (!empty($subadmin['username'])) value="{{ $subadmin['username'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="password">Password*</label>
                                            <input type="password" class="form-control" id="password" name="password"
                                                placeholder="Enter Subadmin Password"
                                                @if (!empty($subadmin['password'])) value="{{ $subadmin['password'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="name">Name*</label>
                                            <input type="text" class="form-control" id="name" name="name"
                                                placeholder="Enter Subadmin Name"
                                                @if (!empty($subadmin['name'])) value="{{ $subadmin['name'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="type">Type*</label>
                                            <input type="text" class="form-control" id="type" name="type"
                                                placeholder="Enter Subadmin Type"
                                                @if (!empty($subadmin['type'])) value="{{ $subadmin['type'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="email">Email*</label>
                                            <input type="email" class="form-control" id="email" name="email"
                                                placeholder="Enter Subadmin Email"
                                                @if (!empty($subadmin['email'])) value="{{ $subadmin['email'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="phone">Phone Number</label>
                                            <input type="text" class="form-control" id="phone" name="phone"
                                                placeholder="Enter Subadmin Phone Number"
                                                @if (!empty($subadmin['phone'])) value="{{ $subadmin['phone'] }}" @endif>
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
