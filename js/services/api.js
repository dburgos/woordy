(function(){
  'use strict';
    angular
      .module('woordyApp')
      .factory('API',['$http','CREDENTIALS',function($http,CREDENTIALS){
      return {
        Words: {
          getAll:function(){
            return $http.get('https://api.parse.com/1/classes/Word',{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              }
            });
          },
          get:function(id){
            return $http.get('https://api.parse.com/1/classes/Word/'+id,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              }
            });
          },
          create:function(data){
            return $http.post('https://api.parse.com/1/classes/Word',data,{
              headers:{
                  'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                  'Content-Type':'application/json'
                }
            });
          },
          edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Word/'+id,data,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
              }
            });
          },
          delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Word/'+id,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
              }
            });
          }
        },
        Scores: {
          getAll:function(){
            return $http.get('https://api.parse.com/1/classes/Score',{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              }
            });
          },
          get:function(id){
            return $http.get('https://api.parse.com/1/classes/Score/'+id,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              }
            });
          },
          query:function(params){
            return $http.get('https://api.parse.com/1/classes/Score', {
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
              },
              params: params
            });
          },
          create:function(data){
            return $http.post('https://api.parse.com/1/classes/Score',data,{
              headers:{
                  'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                  'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                  'Content-Type':'application/json'
                }
            });
          },
          edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Score/'+id,data,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
              }
            });
          },
          delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Score/'+id,{
              headers:{
                'X-Parse-Application-Id': CREDENTIALS.APP_ID,
                'X-Parse-REST-API-Key': CREDENTIALS.REST_API_KEY,
                'Content-Type':'application/json'
              }
            });
          }
        }
      }
  }]).value('CREDENTIALS',{
    APP_ID: CONFIG.api.appId,
    REST_API_KEY: CONFIG.api.key
  });
})();