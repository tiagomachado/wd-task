@extends('...layouts.mainpage')

@section('content')
    <div class="container">

        <div class="input-group">
            <input id="text-tags" type="text" class="form-control" placeholder="Search for tags...">
          <span class="input-group-btn">
            <button id="btn-tags" class="btn btn-primary" type="button">Search!</button>
          </span>
        </div>

        <div id="images" class="row"></div>

    </div>

@endsection