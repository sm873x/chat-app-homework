(function(ns) {
    'use strict';
    window.chat = ns = ( ns || {} );

    var token;
    var $chatBox = $('.messages');
    var $login = $('.login');
    var $sendMsg = $('.send-message');
    var $msg = $('.message');

    /**
     * Takes messages and displays in html
     * @param  {fn}  messageHandler() displays new messages
     * @return {void}
     */
    ns.listenForMessages(function messageHandler(data) {
        console.log(data);
        $chatBox
            .append('<article>' + data.message + '</article>');
        console.log($chatBox);
    });

    $login.on( 'submit', function login(e) {
        e.preventDefault();
        var username = $('.username').val();
        ns.login(username)
            .done(formDisplay)
            .fail(function loginFail(xhr) {
                ns.error(xhr, $chatBox);
            });
    });

    /**
     * After submission of username, the login form is hidden and the message form is displayed.
     * The authorization token is kept for later use.
     * @param  {JSON} data XHR object that is returned
     * @return {void}
     */
    function formDisplay(data) {
        $login.hide();
        $sendMsg
            .css('display', 'block');
        token = data.token;
        console.log(data.token);
    }

    /**
     * Login ajax request
     * @param  {string} username Your chat id
     * @return {JSON}   xhr      Data object
     */
    ns.login = function loginUsername(username) {
        return $.ajax({
            url: '/login',
            method: 'post',
            headers: {'Content-Type':'application/json'},
            data: JSON.stringify({ 'username': username }),
            dataType: 'json'
        });
    };

    /**
     * Handles error responses
     * @param  {JSON} xhr  Response data from ajax call
     * @param  {html} elem Where to place error message
     * @return {void}
     */
    ns.error = function handleError(xhr, elem) {
        if (xhr.status === 404) {
            elem.text('Ruh roh, what did you do?');
        } else {
            elem.text('Hmm...not sure what\'s happening here');
        }
    };

    $sendMsg.on( 'submit', function sendMsg(e) {
        e.preventDefault();

        var message = $msg.val();

        ns.sendMessage(message)
            .done(clearChat)
            .fail(function loginFail(xhr) {
                var $msgTxt = $('.msgTxt').val();
                ns.error(xhr, $msgTxt);
            });
        console.log(message);
    });

    /**
     * Clear text from message input field
     * @return {void}
     */
    function clearChat() {
        $msg.val('');
    }

    /**
     * Send message to chat server
     * @param  {string} message Message that was typed
     * @return {JSON}   xhr     Response data
     */
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
        });
    };

})(window.chat);
