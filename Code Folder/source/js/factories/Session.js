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
        },
        //creamos una sesión //setter
        set: function (user) {
            $rootScope.user = user;
            $rootScope.$broadcast('HeaderController:update', user);
            setCookie('user_id', user.id, 1);
        },
        //limpiamos una sesión
        unset: function () {
            $rootScope.user = undefined;
            setCookie('user_id', 'val', 0);
        },
        setLang: function (lang) {
            setCookie('lang', lang, 20);
        }
    };
}]);