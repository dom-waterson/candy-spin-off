(function () {
    'use strict';
    angular.module('Waterson.CandySpin.Cookie')
        .service('cookieToggle',['cookieArray', function(cookieArray){
            var me = this;
            me.count = 0;

            var randomCookie = function () {
              return Math.floor((Math.random() * cookieArray.length));
            };

            me.createCookie = function (){
                var cookieNumber = randomCookie();
               me.count += 1;
                me.cookie = cookieArray[cookieNumber];
                return me.cookie;
            };
        }]);
})();