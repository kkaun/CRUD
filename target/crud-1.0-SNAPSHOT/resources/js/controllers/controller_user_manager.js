/**
 * Created by Кира on 28.02.2017.
 */

(function () {
    angular.module('testApp.controllers').controller('uCtrl', ['$scope', '$modal', '$log',
        '$interval', 'uiGridConstants', 'userFactory',
        function ($scope, $modal, $log, $interval, uiGridConstants, userFactory) {

            $scope.idFiler = null;
            $scope.nameFilter = null;
            $scope.ageMoreThanFilter = null;
            $scope.ageLessThanFilter = null;
            $scope.isAdminFilter = null;

            $scope.options = {
                pageSizes: [5, 10, 25, 50, 75, 100, 150]
            };


            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.sortType = null;
            $scope.sortField = null;

            $scope.isAddDisabled = false;
            $scope.isRemoveByFilterDisabled = true;


            $scope.dataGrid = {

                enableRowHeaderSelection: true,
                enableCellEditOnFocus: true,
                enableColumnMenu: false,
                enableExpandable: false,
                enableColumnMenus: false,
                enableSorting: true,
                enableFiltering : true,
                useExternalSorting: true,
                useExternalFiltering: true,
                enablePinning: false,
                enablePaginationControls: false,
                enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
                enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
                enableRowSelection: true,
                multiSelect: true,
                paginationPageSize: 10,
                columnDefs: [

                    {
                        field: 'id',
                        displayName: 'ID',
                        width: '10%',
                        enableFiltering: false,
                        enableSorting: false,
                        enableCellEditOnFocus: false
                    },

                    {
                        field: 'name',
                        displayName: 'Имя',
                        width: '33%',
                        enableFiltering: true
                    },

                    {
                        field: 'age',
                        displayName: 'Возраст',
                        type: 'number',
                        width: '11%',
                        enableFiltering: true,
                        filters: [
                            {
                                condition: uiGridConstants.filter.GREATER_THAN,
                                placeholder: '>'
                            },
                            {
                                condition: uiGridConstants.filter.LESS_THAN,
                                placeholder: '<'
                            }
                        ]
                    },
                    {
                        field: 'isAdmin',
                        displayName: 'Администратор?',
                        enableFiltering: true,
                        cellTemplate: '<div>{{row.entity.isAdmin === true ? "Да" : "Нет"}}</div>',
                        type: 'boolean',
                        width: '20%',
                        filter: {
                            type: uiGridConstants.filter.SELECT,
                            selectOptions: [ { value: true, label: 'Да' }, { value: false, label: 'Нет' }]
                        }
                    },
                    {
                        field: 'createdDate',
                        displayName: 'Дата регистрации',
                        type: 'date',
                        width: '26%',
                        cellFilter: 'date:"dd-MM-yyyy"',
                        enableFiltering: false
                    }
                ]
            };

            $scope.getTableHeight = function () {

                return {
                    height: ($scope.dataGrid.data.length * 30 + 90) + "px"
                };
            };


            $scope.dataGrid.onRegisterApi = function (gridApi) {

                gridApi.core.on.sortChanged($scope, $scope.sortChanged);

                $scope.sortChanged(gridApi.grid, [$scope.dataGrid.columnDefs[1]]);

                gridApi.selection.on.rowSelectionChanged($scope, function () {

                    $scope.isRemoveByFilterDisabled = gridApi.selection.getSelectedRows().length <= 0;

                });



                gridApi.edit.on.afterCellEdit($scope, function (rowEntity) {
                    userFactory.postUser({
                        'id': rowEntity.id,
                        'name': rowEntity.name,
                        'age': rowEntity.age,
                        'isAdmin': rowEntity.isAdmin,
                        'createdDate': rowEntity.createdDate.getTime()
                    }).then(function () {
                        $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                    }, function (error) {
                        $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                        if (error.status === 400) {
                            alert("Некорректная дата");
                        }
                    });
                });


                gridApi.core.on.filterChanged( $scope, function() {
                    var grid = this.grid;
                    $scope.idFilter = grid.columns[1].filters[0].term;
                    $scope.nameFilter = grid.columns[2].filters[0].term;
                    $scope.ageMoreThanFilter = grid.columns[3].filters[0].term;
                    $scope.ageLessThanFilter = grid.columns[3].filters[1].term;
                    $scope.isAdminFilter = grid.columns[4].filters[0].term;

                    $scope.getPage($scope.currentPage, $scope.itemsPerPage);

                });
                $scope.gridApi = gridApi;
            };



            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };



            $scope.sortChanged = function (grid, sortColumns) {
                if (sortColumns[0] === undefined || sortColumns[0].sort === undefined) {
                    $scope.sortType = null;
                    $scope.sortField = null;
                } else switch (sortColumns[0].sort.direction) {
                    case uiGridConstants.ASC:
                        $scope.sortType = "asc";
                        $scope.sortField = sortColumns[0].field;
                        break;
                    case uiGridConstants.DESC:
                        $scope.sortType = "desc";
                        $scope.sortField = sortColumns[0].field;
                        break;
                }
                $scope.getPage($scope.currentPage, $scope.itemsPerPage);
            };


            $scope.pageChanged = function () {
                $scope.getPage($scope.currentPage, $scope.itemsPerPage);
            };


            $scope.getPage = function (pageNumber, itemsPerPage) {
                $scope.dataGrid.paginationPageSize = itemsPerPage;
                userFactory.getPage(pageNumber, itemsPerPage, $scope.sortType,
                    $scope.sortField, $scope.nameFilter,
                    $scope.ageMoreThanFilter, $scope.ageLessThanFilter, $scope.isAdminFilter).success(function (page) {
                    angular.forEach(page.data, function (row) {
                        row.createdDate = new Date(row.createdDate);
                    });
                    $scope.users = page.data;
                    $scope.totalItems = page.totalUsersNumber;
                    $scope.dataGrid.data = $scope.users;
                });
            };




            $scope.getHelp = function () {

                var modalInstance = $modal.open({
                    templateUrl: helpTemplate,
                    controller: 'mdCtrl',
                    scope: $scope
                });
                modalInstance.result.then(function () {

                    $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                });
            }


            $scope.deleteUsers = function () {
                var len = $scope.gridApi.selection.getSelectedRows().length;
                var index = 0;
                angular.forEach($scope.gridApi.selection.getSelectedRows(), function (row) {
                    index++;
                    userFactory.deleteUser(row.id).then(function () {
                        if (index === len) {
                            $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                        }
                    }, function () {
                        if (index === len) {
                            $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                        }
                    });
                });
                $scope.isRemoveByFilterDisabled = true;
            };


            $scope.addUser = function () {

                var modalInstance = $modal.open({
                    templateUrl: addUserTemplate,
                    controller: 'mdCtrl',
                    scope: $scope
                });
                modalInstance.result.then(function(data) {
                    userFactory.postUser({
                        'name': data.name,
                        'age': data.age,
                        'isAdmin': data.isAdmin,
                        'createdDate': new Date().getTime()
                    }).then(function () {
                        $scope.getPage($scope.currentPage, $scope.itemsPerPage);
                    });
                });
            };





        }]);
}());

