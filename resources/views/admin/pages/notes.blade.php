@extends('admin.layout.layout')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Notes Page</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Notes</li>
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
                                <h3 class="card-title">Notes</h3>
                                    <a style="max-width: 150px;float:right;display:inline-block;"
                                        href="{{ url('admin/add-edit-note') }}" class="btn btn-block btn-primary">Add Note
                                    </a>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="notepages" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Created on</th>
                                            <th>Updated on</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($Notes as $page)
                                            <tr>
                                                <td>{{ $page['id'] }}</td>
                                                <td>{{ $page['title'] }}</td>
                                                <td>{{ date("F j, Y, g:i a", strtotime($page['created_at'])) }}</td>
                                                @if($page['updated_at']=='')
                                                <td></td>
                                                @else
                                                <td>{{ date("F j, Y, g:i a", strtotime($page['updated_at'])) }}</td> @endif
                                                <td>
                                                    <a href="{{url('admin/view-note/'.$page['id'])}}"><i class="fas fa-eye"></i></a>
                                                    &nbsp;&nbsp;
                                                    <a href="{{url('admin/add-edit-note/'.$page['id'])}}"><i class="fas fa-edit"></i></a>
                                                    &nbsp;&nbsp;
                                                    <a href="{{url('admin/delete-note/'.$page['id'].'/'.$page['title'])}}" class="confirmDelete" name="Note" title="Delete Note"><i class="fas fa-trash"></i></a>
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
