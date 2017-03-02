

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>

<html ng-app="testApp">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">


    <title>CRUD</title>

    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P|Ubuntu" rel="stylesheet">

    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/bower_res/bootstrap-css-only/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/bower_res/angular-ui-grid/ui-grid.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="${pageContext.request.contextPath}/resources/css/custom.css"/>

    <script type="text/javascript">
        var addUserTemplate = '${pageContext.request.contextPath}/resources/html/addtemp.html';
        var helpTemplate = '${pageContext.request.contextPath}/resources/html/helptemp.html';
    </script>

    <script src="${pageContext.request.contextPath}/resources/bower_res/tv4/tv4.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular/angular.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-resource/angular-resource.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-animate/angular-animate.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-ui-grid/ui-grid.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/objectpath/lib/ObjectPath.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-schema-form/dist/schema-form.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/bower_res/jquery/dist/core.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/coordination/coordinator_app.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/controllers/controller_user_manager.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/controllers/controller_custom_popup.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/services/service_front.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/util/footer.js"></script>
</head>


<body>

<div class="navbar navbar-fixed-top">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div class="motoHolder">
                    <h1 id="headLogo">CRUD for JavaRush</h1>
                </div>
            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
</div>

<div class="container opContainer" ng-controller="uCtrl" ng-init="getPage(currentPage, itemsPerPage)">
    <div class="row">

        <div class="col-md-4 col-sm-4 userFormHolder">
            <div class="userFormBox">

                <ul class="userFormList">

                    <li id="userFormFixH"><h3 class="panelsH">Меню администратора</h3></li>

                    <hr class="hline">

                    <li class="userForm">
                        <button type="button" class="btn btn-info" ng-disabled="isAddDisabled"
                                ng-click="addUser()">
                            Добавить пользователя&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-plus"></span>
                        </button>
                    </li>

                    <hr class="hline">

                    <li class="userForm">
                        <button type="button" class="btn btn-danger" ng-disabled="isRemoveByFilterDisabled"
                                ng-click="deleteUsers()">
                            Удалить выделенных
                            &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-minus"></span></button>
                    </li>

                    <li><hr class="hline"></li>

                    <li class="userForm">
                        <label for="sizeSelector" class="col-sm-8 control-label"><h5 class="panelsH">Количество отображаемых
                            строк на одной странице:</h5></label>

                        <div class="col-sm-4">
                            <select id="sizeSelector" class="form-control input-sm" ng-change="pageChanged()"
                                    ng-model="itemsPerPage" ng-options="opt for opt in options.pageSizes"></select>
                        </div>
                    </li>

                </ul>

            </div>
        </div>


        <div class="col-md-8 col-sm-8 paginationBlockHolder">

            <div><h3 class="panelsH">Список пользователей</h3></div>

            <hr>

            <button type="button" class="btn btn-default" ng-click="getHelp()">
                Помощь в работе со списком&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-info-sign"></span>
            </button>

            <hr>

            <div class="pagination-div">

                <pagination boundary-links="true" total-items="totalItems" ng-model="currentPage"
                            items-per-page="itemsPerPage" ng-change="pageChanged()" max-size="26" class="pagination-sm"
                            previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;"
                            last-text="&raquo;"></pagination>
            </div>

            <div ui-grid="dataGrid" ui-grid-pagination ui-grid-edit ui-grid-selection class="grid" ui-grid-auto-resize
                 ng-style="getTableHeight()">
            </div>

            <div class="pagination-div">

                <pagination boundary-links="true" total-items="totalItems" ng-model="currentPage"
                            items-per-page="itemsPerPage" ng-change="pageChanged()" max-size="26" class="pagination-sm"
                            previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;"
                            last-text="&raquo;"></pagination>

                <div class="dataAccessibilityIndicator" ng-show="!dataGrid.data.length">
                    <span class="glyphicon glyphicon-exclamation-sign"></span>
                    &nbsp;&nbsp;База данных пуста или результат по Вашему запросу отсутствует
                </div>

            </div>
        </div>

    </div>

</div>


<div class="navbar-fixed-bottom footer">
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-2 backToTopHolder">
                <a href="#" class="cd-top">
                    <button class="btn-default toTopBtn">
                        <span class="glyphicon glyphicon-chevron-up"></span>
                    </button>
                </a>
            </div>
        </div>
    </div>
</div>

</body>
</html>