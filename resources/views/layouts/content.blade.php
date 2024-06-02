@include('layouts.header')
 
<body>
    @yield('main-content')
    @include('layouts.footer')
    @stack('js')
</body>
 
</html>