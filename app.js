// maybe connect to a dictionary to get word meanings
// be able to tweet your pig latin text (maybe make it a character limit for twitter)
var myApp = angular.module('pigLatinApp', [])

myApp.controller('mainController', [
    '$scope',
    function($scope) {

        // grab text from user
        $scope.userText = ''
        $scope.clicked = function() {
            var text = $scope.userText

            // check for punctuation and strip out
            // var reg = /([\?.\!])+/
            var reg = /([\?])+/

            text = text.replace(reg, '')
            console.log('TEXT ', text);
            puncuation = text.replace(reg, reg)
            console.log('PUNCUATION ', puncuation);

            // if (text.match(reg)) {
            // }




            //check if text does not contain numbers
            var alpha = /^[^0-9]+$/
            // if no numbers in text
            if (text.match(alpha)) {
                $scope.pigText = ''
                var textArr = $scope.userText.split(' ')
                var pigArr = []
                // loop through textArr to work on individual word
                for (var i = 0; i < textArr.length; i++) {
                    // regex to rework the order to match pig Latin
                    var begin = textArr[i].split(/([aeiouyAEIOUY].*)/)[0]
                    var end = textArr[i].split(/([aeiouyAEIOUY].*)/)[1]
                    // check if first letter is a 'y'. if yes, include 'y' with begin var
                    if (textArr[i].indexOf('y') === 0) {
                        var begin = textArr[i].split(/([aeiouAEIOU].*)/)[0]
                        var end = textArr[i].split(/([aeiouAEIOU].*)/)[1]
                    }
                    var pigWord = end + begin + 'ay'
                    pigArr.push(pigWord)
                }
                //set to scope
                $scope.pigText = pigArr.join(' ') + '.'
                $scope.errorMsg = ''
                //append '?' to end of text if question
                var question = ['who', 'what', 'when', 'where', 'why', 'how']
                if (question.indexOf(textArr[0].toLowerCase()) !== -1) {
                    $scope.pigText = pigArr.join(' ') + '?'
                }
                // if numbers found in text
            } else {
                $scope.pigText = ''
                $scope.errorMsg = 'Enter letters only'
            }

        }

    }
])
