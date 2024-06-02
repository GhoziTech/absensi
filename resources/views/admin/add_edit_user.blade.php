@extends('layouts.content')
@section('main-content')
<div class="container">
    <div class="col-md-12">
        <div class="form-appl">
            <h3>{{ $title }}</h3>
            <form class="form1" method="post" action="@if (isset($edit->id)) {{ route('user.update', ['id' => $edit->id]) }}@else{{ route('user.store') }} @endif" enctype="multipart/form-data">
                @csrf
                <div class="form-group col-md-12 mb-3">
                    <label for="">Your Name</label>
                    <input class="form-control" type="text" name="name" placeholder="Enter Your Name" value="@if (isset($edit->id)) {{ $edit->name }}@else {{ old('name') }} @endif">
                    @error('name')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>
 
                <div class="form-group col-md-12 mb-3">
                    <label for="">Your Email</label>
                    <input class="form-control" type="text" name="email" placeholder="Enter Your Email" value="@if (isset($edit->id)) {{ $edit->email }}@else {{ old('email') }} @endif">
                    @error('email')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>
                <div class="form-group col-md-12 mb-5">
                    <label for="">Photo</label>
                    <div class="avatar-upload">
                        <div>
                            <input type='file' id="imageUpload" name="photo" accept=".png, .jpg, .jpeg" onchange="previewImage(this)" />
                            <label for="imageUpload"></label>
                        </div>
                        <div class="avatar-preview">
                            <div id="imagePreview" style="@if (isset($edit->id) && $edit->photo != '') background-image:url('{{ url('/') }}/uploads/{{ $edit->photo }}')@else background-image: url('{{ url('/img/avatar.png') }}') @endif"></div>
                        </div>
                    </div>
                    @error('photo')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>
 
                <input type="submit" class="btn btn-primary" value="Submit">
                <a class="btn btn-danger" href="{{ route('user.index') }}">Cancel</a>
            </form>
        </div>
    </div>
</div>
@endsection
@push('js')
<script type="text/javascript">
    function previewImage(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#imagePreview").css('background-image', 'url(' + e.target.result + ')');
                $("#imagePreview").hide();
                $("#imagePreview").fadeIn(700);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>
@endpush
<style>
    .avatar-upload {
        position: relative;
        max-width: 205px;
    }
 
    .avatar-upload .avatar-preview {
        width: 67%;
        height: 147px;
        position: relative;
        border-radius: 3%;
        border: 6px solid #F8F8F8;
    }
 
    .avatar-upload .avatar-preview>div {
        width: 100%;
        height: 100%;
        border-radius: 3%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>