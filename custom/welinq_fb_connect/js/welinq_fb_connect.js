function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	if (response.status === 'connected') {
		testAPI();
	} else if (response.status === 'not_authorized') {
		document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
		document.getElementById('status').innerHTML = 'Please log ' +
		'into Facebook.';
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1414661095495461',
		cookie     : true, 
		xfbml      : true, 
		version    : 'v2.2'
	});
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log(response);
		jQuery.ajax({
			url: "welinq/fb/get_data",
			data: response,
			type: POST,
			success: function(result){
            	console.log(result);
        	}
        });
		console.log('Successfsul login for: ' + response.name);
		document.getElementById('status').innerHTML =
		'Thanks for logging in, ' + response.name + '!';
	});
}