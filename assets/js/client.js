
(function($){

	var socket = io.connect('http://localhost:1337');
	var msgtpl = $('#msgtpl').html();
	var lastmsg= false;

	$('#msgtpl').remove();

	$(document).ready(function(){
		socket.emit('login', {
			username : document.getElementById("username").innerHTML,
			mail     : document.getElementById("mail").innerHTML,
			image     : document.getElementById("image").innerHTML,
			isadmin  : document.getElementById("isadmin").innerHTML,
            chanel   : document.getElementById("chanel").innerHTML
		});
	});

	socket.on('logged', function(){
		$('#login').fadeOut();
		$('#message').focus();
	});

	/**
	* Envois de message
	**/
	$('#form').submit(function(event){
		event.preventDefault();
        if($('#message').val() !== ''){
            socket.emit('newmsg', {message: $('#message').val() });
        }else{
            $('#message').val('Le message ne dois pas etre vide');
        }
		$('#message').val('');
		$('#message').focus();
	});

	socket.on('newmsg', function(message){
        chanel = document.getElementById("chanel").innerHTML;
        if(chanel == message.user.chanel){
        if(lastmsg != message.user.id){
			$('#messages').append('<div class="sep"></div>');
			lastmsg = message.user.id;
		}
		$('#messages').append('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
		$('#messages').animate({scrollTop : $('#messages').prop('scrollHeight') }, 500);
        }
	});


	/**
	* Gestion des connectés
	**/
	socket.on('newusr', function(user){

        chanel = document.getElementById("chanel").innerHTML;
        if(chanel == user.chanel){
            $('#users').append('<div class ="ulist"><img src="' + user.little + '" id="' + user.id + '"><div class="usertype-' + user.admin+ '"><strong>'+ user.username +'</strong></div></div>');
        }
	});

	socket.on('disusr', function(user){
        chanel = document.getElementById("chanel").innerHTML;
        if(chanel == user.chanel){
                $('#' + user.id).remove();
        }

	});

})(jQuery);
