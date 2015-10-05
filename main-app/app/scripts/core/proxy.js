(function () {
    angular.module('Waterson.CandySpin.Proxy')
        .service ('Proxy', ['$http', '$q', 'levelToggle', function ($http, $q, levelToggle){

        var callApi = function (endpoint){
            var deferred = $q.defer();
            $http.get('levels/' + endpoint)
                .then(function(response) {
                    deferred.resolve(response.data);
                }).catch( function(response) {
                    deferred.reject(response.data);
                    console.log('Error coming from proxy:' + response);
                });

            return deferred.promise;
        };

        this.getLevel = function () {
            var endpoint = levelToggle.level;
            return callApi(endpoint);
        };

    }]);
})();