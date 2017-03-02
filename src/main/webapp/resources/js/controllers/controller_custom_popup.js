/**
 * Created by Кира on 28.02.2017.
 */

angular.module('testApp.controllers').controller('mdCtrl', function ($scope, $log, $modalInstance) {


    $scope.userForm = [
        {
            key: 'name',
            $validators: {
                validName: function (value) {
                    if (!angular.isString(value)) {
                        return false;
                    }
                    return value.length >= 2;
                }
            },
            validationMessage: {
                'validName': "Не должно быть короче 2-х символов"
            }
        },
        {
            key: 'age',
            $validators: {
                validAge: function (value) {
                    if (!angular.isNumber(value)) {
                        return false;
                    }
                    return !((value < 0) || (value > 120));
                }
            },
            validationMessage: {
                'validAge': "Некорректное значение!"
            }
        },
        {
            "key": "isAdmin"
        }
    ];

    $scope.userSchema = {
        type: 'object',
        properties: {
            name: { type: 'string', title: 'Имя(ФИО)' },
            age: { type: 'integer', title: 'Возраст' },
            isAdmin: { type: 'boolean', title: 'Администратор?' }
        },
        required: [
            "name",
            "age"
        ]
    };

    $scope.userModel = {};



    $scope.save = function(){
        $modalInstance.close($scope.userModel);
    };

    $scope.ok = function () {
        $modalInstance.close($scope.userModel);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
});