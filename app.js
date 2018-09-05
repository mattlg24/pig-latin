// maybe connect to a dictionary to get word meanings
var myApp = angular.module('pigLatinApp', [])

myApp.controller('mainController', ['$scope', function($scope) {

    // grab text from user
    $scope.userText = ''
    var vowel = ['a', 'e', 'i', 'o', 'u']
    $scope.clicked = function() {
        var text = $scope.userText

        // regex to rework the order to match pig Latin
        for (var i = 0; i < text.length; i++) {
            // console.log(text[i])
            if (text[i] != 'a' || text[i] != 'e' || text[i] != 'i' || text[i] != 'o' || text[i] != 'u') {
                console.log(text.slice(1) + '-' + text[i])
            }
        }



        //set as scope variable

    }


}])
