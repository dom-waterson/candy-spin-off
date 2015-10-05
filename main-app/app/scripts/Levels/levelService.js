(function () {
    'use strict';
    angular.module('Waterson.CandySpin.Levels')
        .service('levelToggle',['levelArray', function(levelArray){
            var me = this;

            var rotateLevels = function () {
                var nextIndex = levelArray.indexOf(me.level) +1;
                nextIndex =  nextIndex === levelArray.length ? 0 :  nextIndex;
                return levelArray[nextIndex];
            };

            me.level = levelArray[0];

            me.nextLevel = function () {
                me.level = rotateLevels();
            };
        }]);
})();