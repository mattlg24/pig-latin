// maybe connect to a dictionary to get word meanings
var myApp = angular.module('pigLatinApp', [])

myApp.controller('mainController', [
    '$scope',
    function($scope) {

        // grab text from user
        $scope.userText = ''
        $scope.clicked = function() {
            //check if text does not contain numbers
            var text = $scope.userText
            var alpha = /^[^0-9]+$/
            if (text.match(alpha)) {
                $scope.pigText = ''
                var textArr = $scope.userText.split(' ')
                var pigArr = []
                // loop through textArr to work on individual word
                for (var i = 0; i < textArr.length; i++) {
                    // regex to rework the order to match pig Latin
                    var begin = textArr[i].split(/([aeiouy].*)/)[0]
                    var end = textArr[i].split(/([aeiouy].*)/)[1]
                    // check if first letter is a 'y'. if yes, include 'y' with begin var
                    if (textArr[i].indexOf('y') === 0) {
                        var begin = textArr[i].split(/([aeiou].*)/)[0]
                        var end = textArr[i].split(/([aeiou].*)/)[1]
                    }
                    var pigWord = end + '-' + begin + 'ay'
                    pigArr.push(pigWord)
                }
                //set to scope
                $scope.pigText = pigArr.join(' ')
                $scope.errorMsg = ''
            } else {
                $scope.errorMsg = 'Enter letters only.'
            }

        }

    }
])
