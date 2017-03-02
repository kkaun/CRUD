/**
 * Created by Кира on 28.02.2017.
 */

(function () {
    angular.module('testApp.services')
        .factory('userFactory', ['$http', '$log', function ($http, $log) {

            var urlBasic = './crud';
            var userFactory = {};

            userFactory.getAllUsers = function () {
                return $http.get(urlBasic + '/all');
            };

            userFactory.getUser = function (id) {
                return $http.get(urlBasic + '/getById/' + id);
            };

            userFactory.getPage = function (pageNumber, itemsPerPage, sortType, sortField, nameFilter,
                                            ageMoreThanFilter, ageLessThanFilter, isAdminFilter) {

                var fullUrl = urlBasic + '/getPage/' + itemsPerPage + '/' + pageNumber;
                var restParams =  {};
                var data = {};
                if ((sortType != null) && (sortField != null)) {
                    restParams['sortType'] = sortType;
                    restParams['sortField'] = sortField;
                }

                if (nameFilter != null) {
                    restParams['nameFilter'] = nameFilter;
                }
                if (isAdminFilter != null) {
                    restParams['isAdminFilter'] = isAdminFilter;
                }
                if (ageMoreThanFilter != null) {
                    restParams['ageMoreThanFilter'] = ageMoreThanFilter;
                }
                if (ageLessThanFilter != null) {
                    restParams['ageLessThanFilter'] = ageLessThanFilter;
                }

                data['params'] = restParams;


                return $http.get(fullUrl, data);
            };

            userFactory.deleteUser = function (id) {
                return $http.delete(urlBasic + '/delete/' + id);
            };

            userFactory.postUser = function (user) {
                return $http.post(urlBasic + '/post', user);
            };


            return userFactory;
        }]);
}());
