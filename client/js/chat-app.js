(function(ns) {
    'use strict';
    window.chat = ns = ( ns || {} );

    var token;
    var message = $('.message').val();
    // var $chatBox = $('.messages')

    //TODO - messageHandler function here
    window.chat.listenForMessages(function messageHandler(data) {
        console.log(data);
        $('.messages')
            .append('<article>' + data.message + '</article>');
    });

    //LOGIN
    $('.login').on( 'submit', function login(e) {
        e.preventDefault();

        var username = $('.username').val();
        ns.login(username)
            .done(formDisplay);
    });

    function formDisplay(data) {
        $('.login').hide();
        $('.chat').show();
        token = data.token;
        console.log(data.token);
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
            ns.error(xhr, $chatBox);
        });
    }

    ns.error = function handleError(xhr, elem) {
        if (xhr.status === 404) {
            elem.text('Ruh roh, what did you do?');
        } else {
            elem.text('Hmm...not sure what\'s happening here');
        }
    }

    //TODO - submits chat form with post Ajax request
    $('.send-message').on( 'submit', function sendMsg(e) {
        e.preventDefault();

        var message = $('.message').val();

        ns.sendMessage(message)
            .done(clearChat);
        console.log(message);
    });

    function clearChat() {
        $('.message').val('');
    }

    ns.sendMessage = function sendMessage(message) {
        return $.ajax({
            url: '/chat',
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            },
            data: JSON.stringify({ 'message': message }),
            dataType: 'json'
        })
        .fail(function loginFail(xhr) {
            var $msgTxt = $('.msgTxt').val();
            ns.error(xhr, $msgTxt);
        });
    }

})(window.chat);
