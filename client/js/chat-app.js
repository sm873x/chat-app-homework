(function(ns) {
    'use strict';
    window.chat = ns = ( ns || {} );

    //TODO - messageHandler function here
    window.chat.listenForMessages(function messageHandler(data) {
        console.log(data);
    });


    //TODO - post Ajax request to /login to send username
    $('.login').on( 'submit', function login(e) {
        e.preventDefault();

        var username = $('.username').val();
        loginUsername(username);
    });

    function loginUsername(username) {
        $.ajax({
            url: '/login',
            method: 'post',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({ 'username': username }),
            dataType: 'json'
        })
        .done(function loginSuccess(data) {
            // getToken(data);
            console.log(data);
        })
        .fail(function loginFail(xhr) {
            var $msgTxt = $('.msgTxt').val();
            handleLoginError(xhr, $msgTxt);
        });
    }

    // function getToken(data) {
    //     data.
    // }

    function handleLoginError(xhr, elem) {
        if (xhr.status === 404) {
            $(elem).text('Ruh roh, what did you do?');
        } else {
            $(elem).text('Hmm...not sure what\'s happening here');
        }
    }

    //TODO - submits chat form with post Ajax request
})(window.chat);
