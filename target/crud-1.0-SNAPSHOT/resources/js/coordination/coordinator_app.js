/**
 * Created by Кира on 28.02.2017.
 */

(function() {

    angular.module("testApp.services", []);
    angular.module("testApp.controllers", []);
    angular.module("testApp", ['ui.grid', 'ui.grid.pagination', 'ngAnimate',
        'ui.grid.edit', 'schemaForm', 'ui.grid.autoResize', 'ui.grid.selection',
        'ngResource', 'ui.bootstrap', 'testApp.controllers', 'testApp.services']);

}());








