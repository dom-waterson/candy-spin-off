(function () {
    'use strict';
    angular.module('Waterson.CandySpin.Gameboard')
        .controller('GameboardController',['cookieToggle', 'Proxy', 'levelToggle', function (cookieToggle, Proxy, levelToggle) {
            var me = this;

            me.level = '';
            me.target = '';
            me.moves = '';
            me.score = 0;

            me.activeCookie1 = null;
            me.activeCookie2 = null;
            me.canMove = false;

            me.tileWidth = 48;
            me.tileHeight = 48;


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
                console.log(checkMatches());
            };

            var addCookie = function () {
                var cookieToAdd = cookieToggle.createCookie();
                return cookieToAdd;
            };

            var checkMatches = function () {
                var matches = [];
                var groups = [];
                var i, j;

                //Check for horizontal matches
                for (i = 0; i < me.gameboardGrid.length; i++)
                {
                    var tempArr = me.gameboardGrid[i];
                    groups = [];
                    for ( j = 0; j < tempArr.length; j++)
                    {
                        if(j < tempArr.length - 2)
                            if (me.gameboardGrid[i][j] && me.gameboardGrid[i][j + 1] && me.gameboardGrid[i][j + 2])
                            {
                                if (me.gameboardGrid[i][j] == me.gameboardGrid[i][j+1] && me.gameboardGrid[i][j+1] == me.gameboardGrid[i][j+2])
                                {
                                    if (groups.length > 0)
                                    {
                                        if (groups.indexOf(me.gameboardGrid[i][j]) == -1)
                                        {
                                            matches.push(groups);
                                            groups = [];
                                        }
                                    }

                                    if (groups.indexOf(me.gameboardGrid[i][j]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i][j]);
                                    }
                                    if (groups.indexOf(me.gameboardGrid[i][j+1]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i][j+1]);
                                    }
                                    if (groups.indexOf(me.gameboardGrid[i][j+2]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i][j+2]);
                                    }
                                }
                            }
                    }
                    if(groups.length > 0) matches.push(groups);
                }

                //Check for vertical matches
                for (j = 0; j < me.gameboardGrid.length; j++)
                {
                    var tempArr2 = me.gameboardGrid[j];
                    groups = [];
                    for (i = 0; i < tempArr2.length; i++)
                    {
                        if(i < tempArr2.length - 2)
                            if (me.gameboardGrid[i][j] && me.gameboardGrid[i+1][j] && me.gameboardGrid[i+2][j])
                            {
                                if (me.gameboardGrid[i][j] == me.gameboardGrid[i+1][j] && me.gameboardGrid[i+1][j] == me.gameboardGrid[i+2][j])
                                {
                                    if (groups.length > 0)
                                    {
                                        if (groups.indexOf(me.gameboardGrid[i][j]) == -1)
                                        {
                                            matches.push(groups);
                                            groups = [];
                                        }
                                    }

                                    if (groups.indexOf(me.gameboardGrid[i][j]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i][j]);
                                    }
                                    if (groups.indexOf(me.gameboardGrid[i+1][j]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i+1][j]);
                                    }
                                    if (groups.indexOf(me.gameboardGrid[i+2][j]) == -1)
                                    {
                                        groups.push(me.gameboardGrid[i+2][j]);
                                    }
                                }
                            }
                    }
                    if(groups.length > 0) matches.push(groups);
                }

                return matches;
            };
        }]);
})();