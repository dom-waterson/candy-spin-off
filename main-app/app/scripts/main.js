(function () {
    'use strict';
    angular.module('Waterson.CandySpin.Cookie', []);
    angular.module('Waterson.CandySpin.Levels', []);
    angular.module('Waterson.CandySpin.Proxy', ['Waterson.CandySpin.Levels']);
    angular.module('Waterson.CandySpin.Gameboard', ['Waterson.CandySpin.Cookie', 'Waterson.CandySpin.Proxy', 'Waterson.CandySpin.Levels']);
    angular.module('Waterson.CandySpin', ['Waterson.CandySpin.Gameboard']);
})();