/**
 * Created by yfyuan on 2016/10/11.
 */
cBoard.controller('datasetCtrl', function ($scope, $http, dataService, $uibModal, ModalUtils, $filter) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.curDataset = {data: {expressions: []}};
    $scope.curWidget = {};

    var getDatasetList = function () {
        $http.get("/dashboard/getDatasetList.do").success(function (response) {
            $scope.datasetList = response;
        });
    };

    var getCategoryList = function () {
        $http.get("/dashboard/getDatasetCategoryList.do").success(function (response) {
            $scope.categoryList = response;
        });
    };

    getCategoryList();
    getDatasetList();

    $http.get("/dashboard/getDatasourceList.do").success(function (response) {
        $scope.datasourceList = response;
    });

    $scope.newDs = function () {
        $scope.optFlag = 'new';
        $scope.curDataset = {data: {expressions: []}};
        $scope.curWidget = {};
    };
    $scope.editDs = function (ds) {
        $scope.optFlag = 'edit';
        $scope.curDataset = angular.copy(ds);
        if (!$scope.curDataset.data.expressions) {
            $scope.curDataset.data.expressions = [];
        }
        $scope.datasource = _.find($scope.datasourceList, function (ds) {
            return ds.id == $scope.curDataset.data.datasource;
        });
        $scope.curWidget.query = $scope.curDataset.data.query;
        $scope.loadData();
    };
    $scope.deleteDs = function (ds) {
        ModalUtils.confirm(translate("COMMON.CONFIRM_DELETE"), "modal-warning", "lg", function () {
            $http.post("/dashboard/deleteDataset.do", {id: ds.id}).success(function () {
                $scope.optFlag = 'none';
                getDatasetList();
            });
        });
    };

    $scope.save = function () {
        $scope.datasource ? $scope.curDataset.data.datasource = $scope.datasource.id : null;
        $scope.curDataset.data.query = $scope.curWidget.query;
        if(!$scope.curDataset.data.datasource && !$scope.curDataset.name) {
            ModalUtils.alert('Please fill out the complete data.', "modal-warning", "md");
        } else if ($scope.optFlag == 'new') {
            $http.post("/dashboard/saveNewDataset.do", {json: angular.toJson($scope.curDataset)}).success(function (serviceStatus) {
                if (serviceStatus.status == '1') {
                    $scope.optFlag = 'none';
                    getCategoryList();
                    getDatasetList();
                    ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
                } else {
                    ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
                }
            });
        } else {
            $http.post("/dashboard/updateDataset.do", {json: angular.toJson($scope.curDataset)}).success(function (serviceStatus) {
                if (serviceStatus.status == '1') {
                    $scope.optFlag = 'none';
                    getCategoryList();
                    getDatasetList();
                    ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
                } else {
                    ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
                }
            });
        }

    };

    $scope.editExp = function (col) {
        var selects = angular.copy($scope.widgetData[0]);
        var aggregate = [
            {name: 'sum', value: 'sum'},
            {name: 'count', value: 'count'},
            {name: 'avg', value: 'avg'},
            {name: 'max', value: 'max'},
            {name: 'min', value: 'min'}
        ];
        var ok;
        var expression;
        var alias;
        if (!col) {
            expression = '';
            alias = '';
            ok = function (exp, alias) {
                $scope.curDataset.data.expressions.push({
                    type: 'exp',
                    exp: exp,
                    alias: alias
                });
            }
        } else {
            expression = col.exp;
            alias = col.alias;
            ok = function (exp, alias) {
                col.exp = exp;
                col.alias = alias;
            }
        }

        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/exp.html',
            windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance) {
                $scope.expression = expression;
                $scope.alias = alias;
                $scope.selects = selects;
                $scope.aggregate = aggregate;
                $scope.alerts = [];
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.addToken = function (str, agg) {
                    var tc = document.getElementById("expression_area");
                    var tclen = $scope.expression.length;
                    tc.focus();
                    var selectionIdx = 0;
                    if (typeof document.selection != "undefined") {
                        document.selection.createRange().text = str;
                        selectionIdx = str.length - 1;
                    }
                    else {
                        var a = $scope.expression.substr(0, tc.selectionStart);
                        var b = $scope.expression.substring(tc.selectionStart, tclen);
                        $scope.expression = a + str;
                        selectionIdx = $scope.expression.length - 1;
                        $scope.expression += b;
                    }
                    if (!agg) {
                        selectionIdx++;
                    }
                    tc.selectionStart = selectionIdx;
                    tc.selectionEnd = selectionIdx;
                };
                $scope.verify = function () {
                    $scope.alerts = [];
                    var v = verifyAggExpRegx($scope.expression);
                    $scope.alerts = [{msg: v.isValid ? translate("COMMON.SUCCESS") : v.msg, type: v.isValid ? 'success' : 'danger'}];
                };
                $scope.ok = function () {
                    ok($scope.expression, $scope.alias);
                    $uibModalInstance.close();
                };
            }
        });
    };

    $scope.loadData = function () {
        $scope.loading = true;
        dataService.getData($scope.datasource.id, $scope.curWidget.query, null, function (widgetData) {
            $scope.loading = false;
            $scope.toChartDisabled = false;
            if (widgetData.msg == '1') {
                $scope.alerts = [];
                $scope.widgetData = widgetData.data;
                $scope.selects = angular.copy($scope.widgetData[0]);
            } else {
                $scope.alerts = [{msg: widgetData.msg, type: 'danger'}];
            }
        });
    };

});