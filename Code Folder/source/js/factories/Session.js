app.factory("Session", ['$rootScope', function ($rootScope) {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    return {
        //obtenemos una sesión //getter
        get: function (key) {
            var values = document.cookie.split('; ');
            var i = 0, temp = null;
            for (i; i < values.length; i++) {
                temp = values[i].split('=');
                if (temp[0] === key) {
                    return temp[1];
                }
            }
            return false;
        },
        //creamos una sesión //setter
        set: function (user) {
            $rootScope.user = user;
            $rootScope.$broadcast('LogIn', user);
            setCookie('username', user.username, 1);
            setCookie('user_id', user.id, 1);
        },
        //limpiamos una sesión
        unset: function () {
            $rootScope.user = undefined;
            $rootScope.$broadcast('LogOut');
            setCookie('username', 'val', 0);
            setCookie('user_id', 'val', 0);
        }
    };
}]);