(function(ns) {
    'use strict';
    window.chat = ns = ( ns || {} );

    //TODO - messageHandler function here
    window.chat.listenForMessages(function messageHandler(data) {
        console.log(data);
    });


    //LOGIN
    $('.login').on( 'submit', function login(e) {
        e.preventDefault();

        var username = $('.username').val();
        ns.login(username)
            .done(formDisplay);
    });

    function formDisplay() {
        $('.login').hide();
        $('.chat').show();
    }

    ns.login = function loginUsername(username) {
        return $.ajax({
            url: '/login',
            method: 'post',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({ 'username': username }),
            dataType: 'json'
        })
        .fail(function loginFail(xhr) {
            var $msgTxt = $('.msgTxt').val();
            ns.error(xhr, $msgTxt);
        });
    }


    ns.error = function handleError(xhr, elem) {
        if (xhr.status === 404) {
            $(elem).text('Ruh roh, what did you do?');
        } else {
            $(elem).text('Hmm...not sure what\'s happening here');
        }
    }

    //TODO - submits chat form with post Ajax request
})(window.chat);
