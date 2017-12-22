angular.module('starter.controllers', ['ionic'])

.controller('UserLoginCtrl', function($scope, $ionicPopup, PetService, $http) {
    $scope.users = '';
    
    // 登入
    $scope.userlogin = function() {
      $scope.data = {}
      // 登入彈出式視窗
      var myPopup = $ionicPopup.show({
        template: 'username:<input type="string" ng-model="data.username">password:<input type="password" ng-model="data.password">',
        title: '登入網頁',
        subTitle: 'Please use correct user info',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<b>登入</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data) {
                // 不允许用户关闭，除非输入 wifi 密码
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          },
        ]
      });
      myPopup.then(function(users) {
        console.log('Tapped!', users.username);
        // $scope.users = PetService.login(res);
        $http.post(' https://yuxian-photosharing.herokuapp.com/api/signin',users)
        .then(function (res){
          console.log(res);
          console.log(users.username);
          $scope.users = users.username;
        },function (error){
          console.log('wrong');
        });
      });
    };
  }
)


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
