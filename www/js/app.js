// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'LocalStorageModule'])

.config(function (localStorageServiceProvider, $stateProvider, $urlRouterProvider) {
  localStorageServiceProvider
    .setPrefix('todo')
    .setStorageType('localStorage')
    .setNotify(true, true)

  $stateProvider.state('tab', {
    url: 'new-task.html',
    templateUrl: 'templates/new-task.html'
  })
})

.controller('TodoCtrl', function($scope, localStorageService, $ionicModal, $ionicPopup){
  var key = 'todoKeyList';
  localStorageService.set(key, localStorageService.get(key) || new Array());
  $scope.tasks = localStorageService.get(key);

  $ionicModal.fromTemplateUrl('templates/new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.createTask = function(taskName) {
    if(taskName == '') return
    task = localStorageService.get(key);
    task.push(taskName);
    localStorageService.set(key, task);
    $scope.tasks = localStorageService.get(key);
    $scope.hideModal(taskName);
  }

  $scope.newTask = function() {
    $scope.taskModal.show();
  }

  $scope.closeNewTask = function(task) {
    if(task.$dirty === true) {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Cancel creation of task',
       template: 'Are you sure you want to Cancel the creation?'
     });
     confirmPopup.then(function(res) {
        if(res) {
          $scope.hideModal(task);
        }
     });
    }
    else{
      $scope.hideModal(task);
    }
  }

  $scope.hideModal = function(task) {
    task.title = ''
    $scope.taskModal.hide()
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
