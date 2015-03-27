var appID = '';
var permissions = '';
var isAdmin = false;
(function($){
	Drupal.behaviors.welinqFbConnect = {
		attach: function (context, settings) {
			$(document).ready(function(){
				if(settings.hasOwnProperty('welinq_fb_field_setup')){
					isAdmin = settings.welinq_fb_field_setup.admin_settings;
				}
				appID = settings.welinq_fb_connect.app_id;
				permissions = settings.welinq_fb_connect.permissions;
			});
		}
	};
})(jQuery);

window.fbAsyncInit = function() {
	FB.init({
		appId      : appID,
		status     : true,
		cookie     : true,
		xfbml      : true 
	});
	FB.Event.subscribe('auth.authResponseChange', function(response) {
		// if (response.status === 'connected') {
		// 	document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
		// }else if (response.status === 'not_authorized'){
		// 	document.getElementById("message").innerHTML +=  "<br>Failed to Connect";
		// } else {
		// 	document.getElementById("message").innerHTML +=  "<br>Logged Out";
		// }
	});
};

function Login(){
	FB.login(function(response){
		if (response.authResponse){
			getUserInfo();
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	},{scope: permissions});
}

function getUserInfo() {
	FB.api('/me', function(response) {
		console.log(response);
		if(isAdmin!=true){
			jQuery.ajax({
				url: "?q=welinq/fb/get_data",
				data: response,
				type: 'POST',
				success: function(result){
					console.log('?q=welinq/facebook/login/'+result);
	            	window.location.assign('?q=welinq/facebook/login/'+result);
	        	}
	        });
		}else{
			// jQuery.ajax({
			// 	url: "?q=admin/config/welinq/facebook/field_settings",
			// 	data: response,
			// 	type: 'POST',
			// 	success: function(result){
			// 		jQuery(".field_setting_form").html('asdf'+result);
	  //       	}
	  //       });
			jQuery.redirect('?q=admin/config/welinq/facebook/field_settings', response);
		}
	});
}

function getPhoto(){
	FB.api('/me/picture?type=normal', function(response) {
		console.log(response);
		var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
		//document.getElementById("status").innerHTML+=str;
	});
}

function Logout(){
	FB.logout(function(){document.location.reload();});
}

(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));


(function($){
	$(document).ready(function(){
		$.redirect = function( target, values, method ) {  
			method = (method && method.toUpperCase() == 'GET') ? 'GET' : 'POST';
			if (!values){
				var obj = $.parse_url(target);
				target = obj.url;
				values = obj.params;
			}		
			var form = $('<form>').attr({
				method: method,
				action: target
			});
			for(var i in values){
				$('<input>').attr({
					type: 'hidden',
					name: i,
					value: values[i]
				}).appendTo(form);
			}
			$('body').append(form);
			form.submit();
		};
		$.parse_url = function(url){
			if (url.indexOf('?') == -1)
				return { url: url, params: {} }
			var parts = url.split('?'),
				url = parts[0],
				query_string = parts[1],
				elems = query_string.split('&'),
				obj = {};
			for(var i in elems){
				var pair = elems[i].split('=');
				obj[pair[0]] = pair[1];
			}
			return {url: url, params: obj};		
		}
	});  	
})(jQuery);