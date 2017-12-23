angular.module('starter.services', [])

.factory('loginService',['$http',function($http) {

    var user={};

    return {
      getuser: function(){
        return user;
      },
      login: function(users){
        user = users;
        return user;
      }
    }
  }
]);
