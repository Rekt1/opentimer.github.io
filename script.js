angular.module('timer', [])
  .controller('TimerController', function($scope, $interval) {
    $scope.start = function() {
      if (!$scope.intervalPromise) {
        $scope.intervalPromise = $interval(function() {
          $scope.count++;
        }, 1000);
      }
    };
    
    $scope.stop = function() {
      $interval.cancel($scope.intervalPromise);
      $scope.intervalPromise = null;
    };
    
    $scope.addLap = function() {
      $scope.laps.unshift({
        count: $scope.count,
        interval: $scope.laps[0] ? $scope.count - $scope.laps[0].count : $scope.count
      });
    };
    
    $scope.reset = function() {
      $scope.count = 0
      $scope.laps = [];
    };
    
    $scope.reset();
  })
  .directive('timerDisplay', function() {
    return {
      templateUrl: 'timer.display.html',
      scope: {
        timerDisplay: '='
      }
    };
  })
  .filter('leftPad', function() {
    return function(value, padAmount) {
      return (new Array(padAmount).join('0') + value).slice(-padAmount);
    };
  })
  .filter('timerSeconds', function() {
    return function(value) {
      return value % 60;
    };
  })
  .filter('timerMinutes', function() {
    return function(value) {
      return Math.floor(value / 60) % 60;
    };
  })
  .filter('timerHours', function() {
    return function(value) {
      return Math.floor(value / 3600);
    };
  });