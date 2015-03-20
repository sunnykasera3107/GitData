function statusChangeCallback(response) {
	if (response.status === 'connected') {
		testAPI(response);
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

function testAPI(authInfo) {
	var pageAccessToken = authInfo.authResponse.accessToken;
	FB.api('/me', {
		access_token : pageAccessToken
	}, function(response) {
		//console.log(response);
		jQuery.ajax({
			url: "?q=welinq/fb/get_data",
			data: response,
			type: 'POST',
			success: function(result){
				//console.log('?q=welinq/facebook/login/'+result);
            	window.location.assign('?q=welinq/facebook/login/'+result);
        	}
        });
	});
}