$(document).ready(function () {
    let numbers = ["0px 0px", "180px 0px", "120px 0px", "60px 0px", "0px 180px", "180px 180px", "120px 180px", "60px 180px", "0px 120px", "180px 120px", "120px 120px", "60px 120px", "0px 60px", "180px 60px", "120px 60px", "60px 60px"];
    let check = true;
    
    function randomPicture() {
        const random = [];
        for (let i = 0; i < $('.l').length; i++) {
            function randomizer(min, max) {
                let rand = Math.round(min + Math.random() * (max - min));
                if (random.includes(rand)) {
                    return randomizer(min, max)
                }
                else {
                    random.push(rand)
                    return rand
                }
            }
            randomizer(0, 15);
            $('.l').eq(i).css("background-position", numbers[random[i]]);
        }
    }

    let minutes = 01;
    let seconds = 00;
    $('.timer').html(`01:00`);
    $('.start').on('click', startTime);

    function startTime() {
        $('.new').removeClass('active');
        $('.check').removeClass('active');
        $('.start').addClass('active');
        let check2=0;
        $('.b').sortable({
            connectWith: '.b',
            containment: '#end',
            cursor: 'move',
            scroll: false,
            receive: function(event,ui){
                if($(this).attr('value')=='fill'){
                    check2 = 1;
                }
                else{
                    $(this).attr('value', 'fill');
                    check2 = 0;
                }
            },
            stop: function(event, ui){
                if(check2){
                    $(this).sortable('cancel');
                }
                else{
                    $(this).removeAttr('value');
                }
            }
        })
        $('.b').sortable('enable');
        $('.check').removeAttr('disabled');
        $('.start').attr('disabled', 'disabled');
        let intervalID = setInterval(() => {
            if (seconds == 00 && (minutes == 0)) {
                $('.timer').html(`0${minutes}:0${seconds}`);
                clearInterval(intervalID);
            }
            else if (minutes >= 0 && seconds >= 0) {

                if (seconds == 00) {
                    minutes -= 1;
                    seconds = 59;
                }

                else {
                    seconds = seconds - 1;
                }

                if (seconds < 10) {
                    $('.timer').html(`0${minutes}:0${seconds}`);
                }
                else {
                    $('.timer').html(`0${minutes}:${seconds}`);
                }
            }



        }, 1000);

        let timeoutID = setTimeout(() => {
            $('.modal').show();
            $('.modal_check').hide();
            $('.modal_close1').hide();
            $('.modal_close2').show();
            $('.modal_text').text(`It's a pity, but you lost`);
            $('.modal_close2').on('click', function () {
                $('.modal').hide();
            });
            $('.check').attr('disabled', 'disabled');
            $('.start').removeAttr('disabled');
            $('.timer').html(`01:00`);
            $('.modal_close').on('click', function () {
                minutes = 01;
                seconds = 00;
                $('.start').removeAttr('disabled');
                clearInterval(intervalID);
                clearTimeout(timeoutID);
                $('.modal').hide();
                $('.check').removeAttr('disabled');
            })
        }, 60000);

        $('.new').on('click', function () {
            $('.start').removeClass('active');
            $('.check').removeClass('active');
            $('.new').addClass('active');
            $('.b').sortable('disable');
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            minutes = 01;
            seconds = 00;
            $('.timer').html(`01:00`);
            $('.start').removeAttr('disabled');
            $('.check').attr('disabled', 'disabled');
        });

        $('.check').on('click', function () {
            $('.start').removeClass('active');
            $('.new').removeClass('active');
            $('.check').addClass('active');
            $('.modal_check').show();
            $('.modal_close2').hide();
            $('.modal_close1').show();
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            $('.check').removeAttr('disabled');
            $('.modal').show();
            if (seconds > 0) {
                $('.modal_text').text(`You still have time, you sure?  0${minutes}:${seconds}`);
                $('.modal_close1').on('click', function () {
                    $('.modal').hide();
                    $('.check').removeAttr('disabled');
                    startTime();
                })

            }
            $('.modal_check').on('click', function () {
                clearInterval(intervalID);
                clearTimeout(timeoutID);
                $('.modal_close1').hide();
                $('.modal_close2').show();
                for (let i = 0; i < $('.l').length; i++) {
                    if ($('.l').eq(i).css("background-position") != numbers[i]) {
                        check = false;
                        break;
                    }
                }
                if (check) {
                    $('.modal_check').hide();
                    $('.modal_text').text(`Woohoo, well done, you did it!`);
                    $('.modal_close2').on('click', function () {
                        clearInterval(intervalID);
                        clearTimeout(timeoutID);
                        minutes = 01;
                        seconds = 00;
                        $('.timer').html(`01:00`);
                        $('.modal').hide();
                        clearInterval(intervalID);
                        clearTimeout(timeoutID);
                    })

                }
                else {
                    $('.modal_check').hide();
                    $('.modal_text').text(`It's a pity, but you lost`);
                    clearInterval(intervalID);
                    clearTimeout(timeoutID);
                    $('.modal_close2').on('click', function () {
                        $('.modal').hide();
                        $('.check').removeAttr('disabled');
                        clearInterval(intervalID);
                        clearTimeout(timeoutID);
                    })
                }
                check = true;

            })

        });


    }
    $('.new').on('click', function () {
        randomPicture();
            $('.b').sortable('cancel');
            $('.b').sortable('refreshPositions');
            $('.b').sortable('refresh');
            $('.b').removeAttr('value');
            
    })

})
