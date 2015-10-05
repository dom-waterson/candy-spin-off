(function () {
    'use strict';
    angular.module('Waterson.CandySpin.Gameboard')
        .controller('GameboardController',['cookieToggle', 'Proxy', 'levelToggle', function (cookieToggle, Proxy, levelToggle) {
            var me = this;

            me.level = '';
            me.target = '';
            me.moves = '';
            me.score = 0;

            me.cookieToggle = cookieToggle;

            me.gameboardGrid = [
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null]
            ];

            me.changeLevel = function () {
                levelToggle.nextLevel();
                me.createGameboard();
            };

            me.createGameboard = function () {
                Proxy.getLevel()
                    .then(function (data) {
                        me.gameboardGrid = data.tiles;
                        me.target = data.targetScore;
                        me.moves = data.moves;
                        me.level = data.level;
                        cookieTime();
                    });
            };

            var cookieTime = function () {
                for(var i = 0; i < me.gameboardGrid.length; i++){
                    for(var j = 0; j < me.gameboardGrid.length; j++){
                        if(me.gameboardGrid[i][j] === 1){
                            var tile = addCookie(i, j);
                            me.gameboardGrid[i][j] = tile;
                        }
                    }
                }
            };

            var addCookie = function () {
                var cookieToAdd = cookieToggle.createCookie();
                return cookieToAdd;
            };
        }]);
})();