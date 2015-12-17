app.factory('Login', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/login?username=:username&password=:password');
}]);