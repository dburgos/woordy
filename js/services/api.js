(function(){
  'use strict';
    angular
      .module('woordyApp',[])
      .factory('API',['$http','CREDENTIALS',function($http,CREDENTIALS){
      return {
        getAll:function(){
          return $http.get('https://api.parse.com/1/classes/Words',{
            headers:{
              'X-Parse-Application-Id': CREDENTIALS.APP_ID,
              'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
            }
          });
        },
        get:function(id){
          return $http.get('https://api.parse.com/1/classes/Words/'+id,{
            headers:{
              'X-Parse-Application-Id': CREDENTIALS.APP_ID,
              'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
            }
          });
        },
        create:function(data){
          return $http.post('https://api.parse.com/1/classes/Words',data,{
            headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
              }
          });
        },
        edit:function(id,data){
          return $http.put('https://api.parse.com/1/classes/Words/'+id,data,{
            headers:{
              'X-Parse-Application-Id': CREDENTIALS.APP_ID,
              'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              'Content-Type':'application/json'
            }
          });
        },
        delete:function(id){
          return $http.delete('https://api.parse.com/1/classes/Words/'+id,{
            headers:{
              'X-Parse-Application-Id': CREDENTIALS.APP_ID,
              'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              'Content-Type':'application/json'
            }
          });
        }
      }
  }]).value('CREDENTIALS',{
    APP_ID: CONFIG.api.appId,
    REST_API_KEY: CONFIG.api.key
  });
})();