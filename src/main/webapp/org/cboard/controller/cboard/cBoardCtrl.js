/**
 * Created by yfyuan on 2016/7/19.
 */
cBoard.controller('cBoardCtrl', function ($scope, $location, $http, $q, md5) {

    $http.get("/commons/getUserDetail.do").success(function (response) {
        $scope.user = response;
        var avatarUrl = '/dist/img/user-male-circle-blue-128.png';
        $scope.user.avatar = avatarUrl;
    });

    var getCategoryList = function () {
        $http.get("/dashboard/getCategoryList.do").success(function (response) {
            $scope.categoryList = response;
        });
    };

    var getBoardList = function () {
        $http.get("/dashboard/getBoardList.do").success(function (response) {
            $scope.boardList = response;
        });
    };

    $scope.$on("boardChange",function () {
        getBoardList();
    });

    $scope.$on("categoryChange",function () {
        getCategoryList();
    });

    getCategoryList();
    getBoardList();
});