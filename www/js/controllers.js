angular.module('starter.controllers', ['ionic'])

.controller('UserLoginCtrl', function($scope, $ionicPopup, PetService, $http) {
    $scope.users =  PetService.getuser()||{};
   
    
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
          { text: '註冊' ,
            onTap: function(e) {
              window.location.assign('#/tab/signup');
            }
          },
          {
            text: '<b>登入</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.username||!$scope.data.password) {
                // 不允许用户关闭，除非输入 wifi 密码
                e.preventDefault();
              } else {
                window.location.assign('#/tab/user');
                return $scope.data;
              }
            }
          },
        ]
      });
      myPopup.then(function(users) {
        console.log('Tapped!', users.username);

        // 登入 API
        $http.post(' https://yuxian-photosharing.herokuapp.com/api/getuser',users)
        .then(function (res){
          $scope.users.id = res.data[0].id;

          // 取得userId API
          $http.post(' https://yuxian-photosharing.herokuapp.com/api/signin',users)
          .then(function (res){
            $scope.users.username = users.username;
            var nowUser = PetService.login($scope.users); //將user存成全域物件
          },function (error){
            console.log('wrong');
            alert('帳號或密碼錯誤');
            location.reload();
          });
        },function (error){
          console.log('wrong');
        });
      });
    };

    // 註冊
    $scope.usersignup = function(){
      console.log('test');
      $scope.newuser = {}
      // 登入彈出式視窗
      var myPopup = $ionicPopup.show({
        template: 'firstname:<input type="text" ng-model="newuser.firstname">'+
                  'lastname:<input type="text" ng-model="newuser.lastname">'+
                  'email:<input type="text" ng-model="newuser.email">'+
                  'username:<input type="text" ng-model="newuser.username">'+
                  'password:<input type="password" ng-model="newuser.password">',
        title: '註冊會員',
        subTitle: 'Please use correct user info',
        scope: $scope,
        buttons: [
          { text: '返回登入' ,
            onTap: function(e) {
              window.location.assign('#/tab/login');
            }
          },
          {
            text: '<b>註冊</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newuser.firstname||!$scope.newuser.lastname||
                !$scope.newuser.email||!$scope.newuser.username||
                !$scope.newuser.password) {
                e.preventDefault();
              } else {
                return $scope.newuser;
              }
            }
          },
        ]
      });
      myPopup.then(function(newuser) {
        console.log('Tapped!', newuser.username);
      });
    }
  }
)


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
