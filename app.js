// https://codepen.io/guardian/pen/EjeXOZ
// error if no vowels
// fix data-number. it continues to count upward so longer time on the page there's no scramble
// set past few phrases to local storage to display underneath
var myApp = angular.module('pigLatinApp', [])

myApp.controller('mainController', [
    '$scope',
    function($scope) {
        // used for ng-if to replace
        $scope.regText = true

        $scope.clicked = function() {
            // clear .random element each time button clicked
            $('.random').empty()

            // grab text from user
            var text = $scope.userText

            //check if text does not contain numbers
            var alpha = /^[^0-9]+$/
            // if no numbers in text
            if (text.match(alpha)) {
                $scope.pigText = ''
                var textArr = text.split(' ')
                var pigArr = []
                // loop through textArr to work on individual word
                for (var i = 0; i < textArr.length; i++) {
                    var word = textArr[i]
                    var strip = /[^\?\.!,;:]+/
                    var punctuation = word.replace(strip, '')
                    word = word.replace(/[\?\.!,;:]+/, '')

                    // regex to rework the order to match pig Latin
                    var begin = word.split(/([aeiouyAEIOUY].*)/)[0]
                    var end = word.split(/([aeiouyAEIOUY].*)/)[1]
                    // check if first letter is a 'y'. if yes, include 'y' with begin var
                    if (word.indexOf('y') === 0) {
                        begin = word.split(/([aeiouAEIOU].*)/)[0]
                        end = word.split(/([aeiouAEIOU].*)/)[1]
                    }
                    var pigWord = end + begin + 'ay' + punctuation
                    pigArr.push(pigWord)
                }
                $scope.regText = false
                //set to scope
                $scope.pigText = pigArr.join(' ')
                $scope.errorMsg = ''
            } else {
                // if numbers found in text
                $scope.pigText = ''
                // $scope.errorMsg = 'Enter letters only'
                $scope.errorMsg = 'Sorry, Numbers Won\'t Work Here'
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

        } // end of click function

    } // end of controller
])
