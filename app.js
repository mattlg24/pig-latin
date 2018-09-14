// strip out and capture punctuation and append to end of text
// https://codepen.io/guardian/pen/EjeXOZ
// error if no vowels
var myApp = angular.module('pigLatinApp', [])

myApp.controller('mainController', [
    '$scope',
    function($scope) {

        $scope.regText = true

        // grab text from user
        $scope.userText = ''
        $scope.clicked = function() {
$scope.test = false
            // clear .random element each time button clicked
            $('.random').empty()

            var text = $scope.userText
            // check for punctuation and strip out
            // var strip = /[\?.\!]+/
            // var punc = /[^\?]*/
            //
            // var text = text.replace(strip, '')
            // console.log('STRIP ', text);
            // var punctuation = text.replace(punc, '')
            // console.log('PUNCTUATION ', punctuation);

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
                $scope.regText = false
                //set to scope
                $scope.pigText = pigArr.join(' ') + '.'
                $scope.errorMsg = ''
                //append '?' to end of text if question
                var question = [
                    'who',
                    'what',
                    'when',
                    'where',
                    'why',
                    'how'
                ]
                if (question.indexOf(textArr[0].toLowerCase()) !== -1) {
                    $scope.pigText = pigArr.join(' ') + '?'
                }
                // if numbers found in text
            } else {
                $scope.pigText = ''
                $scope.errorMsg = 'Enter letters only'
            }

            // split pig latin text into an array of individual letters
            var letters = $scope.pigText.split('')
            var timer = 10
            var data = 0

            // loop through and create <span> for each letter and add data-change attribute
            for (var i = 0; i < letters.length; i++) {
                var change = Math.round(Math.random() * 100)
                var el = `<span class="nbr ltr" data-change="${change}">${letters[i]}</span>`
                $('.random').append(el)
            }

            var randomnbr = $('.nbr')

            function random() {
                return Math.round(Math.random() * 9)
            }

            function select() {
                return Math.round(Math.random() * randomnbr.length + 1)
            }

            // add data-change attribute to each <span>
            function value() {
                $(`.nbr:nth-child(${select()})`).html(random())
                $(`.nbr:nth-child(${select()})`).attr('data-number', data)
                data++

                // if data-number is > data-change then append the letter at it's corresponding index <span>
                for (var i = 0; i < randomnbr.length; i++) {
                    if (parseInt($(randomnbr[i]).attr('data-number')) > parseInt($(randomnbr[i]).attr('data-change'))) {
                        var index = $('.ltr').index(randomnbr[i])
                        $(randomnbr[i]).html(letters[index])
                        // remove .nbr to stop data from running
                        $(randomnbr[i]).removeClass('nbr')
                    }
                }
            }

            setInterval(value, timer)

$scope.test = true

        } // end of click function

    } // end of controller
])
