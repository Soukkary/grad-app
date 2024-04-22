@extends('admin.layout.layout')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{$title}}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">{{$title}}</li>
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
            <h3 class="card-title">{{$title}}</h3>

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
                @if(count($errors) > 0)
                    <div class="p-1">
                        @foreach($errors->all() as $error)
                            <div class="alert alert-warning alert-danger fade show" role="alert">{{$error}} <button type="button" class="close"
                                data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span></button></div>
                        @endforeach
                    </div>
                @endif
                  <form name="noteForm" id="noteForm" @if(empty($note['id'])) action="{{url('admin/add-edit-note')}}" @else action="{{url('admin/add-edit-note/'.$note['id'])}}" @endif method="post">
                      @csrf
                      <div class="card-body">
                        <div class="form-group">
                          <label for="title">Title*</label>
                          <input type="text" class="form-control" id="title" name="title" placeholder="Enter Note Title" @if(!empty($note['title'])) value="{{$note['title']}}" @endif @if($title=="View Note Only") readonly @endif>
                        </div>
                        <div class="form-group">
                          <label for="note">Description*</label>
                          <textarea class="form-control" rows="3" @if($title!="View Note Only") id="summernote" @else id="note" @endif name="note" placeholder="Enter Description" @if($title=="View Note Only") readonly @endif>@if(!empty($note['note'])) {!! Blade::compileString($note['note']) !!}@endif</textarea>
                        </div>
                      </div>
                      <!-- /.card-body -->
                      @if($title!="View Note Only")
                      <div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                      @endif

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
