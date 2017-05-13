// var app = angular.module("myapp", ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.cellNav']);
var app = angular.module("myapp", []);

app.service("fact",["$http","$log", function ($http, $log) {

    this.refresh = function (cb) {
        $log.log("tjhsis inside");

        $http({
            url: '/persons',
            method: 'GET'
        }).
        then(function (res) {
            $log.log(res.data);
            cb(res.data);
        }, function (err) {
            $log.log("error occured");
        })

    }


}]);

app.controller("appController",["$scope", "$http","fact", function ($scope, $http, fact) {


    var refresh = function () {
        $http({
            method: 'GET',
            url: '/persons'
        }).
        then(function (res) {
            console.log("tjhsis isisdkder");
            $scope.persons = res.data;
            $scope.per = "";
        })

    }
    fact.refresh(d);
function d(rea) {
        $scope.persons = rea;
          $scope.per = "";
    }



   // refresh();
    $scope.add = function () {

        console.log($scope.per);
        $http.post('/persons', $scope.per);
        fact.refresh(d)

    }
    $scope.Deletefun = function (id) {
        console.log(id);
        $http.delete('/persons/' + id).then(function (res) {
            refresh();
        });
    }

    $scope.Edit = function (id) {
        console.log(id);
        $http.get('/persons/' + id).then(function (res) {
            console.log("this is unsucess edit");
            console.log(res);
            $scope.per = res.data;

        });
    }
    $scope.update = function () {
        console.log($scope.per._id);
        $http.put('/persons/' + $scope.per._id, $scope.per).then(function (res) {
            console.

            log("this is unsucess update");
             refresh();

        });
    }

    $scope.columnDefs = [{
            name: 'Name',
            cellEditableCondition: true
        },
        {
            name: 'email',
            cellEditableCondition: true
        },
        {
            name: 'phone',
            cellEditableCondition: true
        },
        {
            name: 'Name',
            resizable: true
        },
        {
            name: 'email',
            resizable: true
        },
        {
            name: 'phone',
            resizable: true
        },


    ];



}]);

app.directive("dire", function () {
    return {
        templateUrl: "directive1.html"
    }
})

