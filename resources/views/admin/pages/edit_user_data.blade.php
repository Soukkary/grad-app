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
                                <form name="userForm" id="userForm"
                                    action="{{ url('admin/add-edit-user-data/' . $user['id']) }}" method="post">
                                    @csrf
                                    <div class="card-body">
                                        <div class="form-group col-md-6">
                                            <label for="email">Email*</label>
                                            <input type="text" class="form-control" id="email" name="email" readonly
                                                placeholder="Enter User Email"
                                                @if (!empty($user['email'])) value="{{ $user['email'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="name">Name*</label>
                                            <input type="text" class="form-control" id="name" name="name"
                                                placeholder="Enter User Name"
                                                @if (!empty($user['name'])) value="{{ $user['name'] }}" @endif>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="phone">Phone Number</label>
                                            <input type="text" class="form-control" id="phone" name="phone"
                                                placeholder="Enter User Phone Number"
                                                @if (!empty($user['phone'])) value="{{ $user['phone'] }}" @endif>
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
