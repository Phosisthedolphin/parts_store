@extends('master')

@section('title', 'Homepage')

@section('content')

    Recent messages:

    <ul>


        @foreach($parts as $part)
        <li>{{$part->bin_desc}} - {{$part->bin_location}}</li>
        @endforeach
    </ul>
@endsection
