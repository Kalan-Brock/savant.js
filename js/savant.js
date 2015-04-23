jQuery(function($){

	var expiresin = 320;  //time in seconds

	function ConvertFormToJSON(form){
	    var array = $(form).serializeArray();
	    var json = {};
	    
	    $.each(array, function() {
	        json[this.name] = this.value || '';
	    });
	    
	    return JSON.stringify(json);
	}

	function setCookie(cvalue) {
	    var d = new Date();
	    d.setTime(d.getTime() + (expiresin * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = "savant" + "=" + cvalue + "; " + expires;
	}

	function getCookie() {
	    var name = "savant" + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }

	    return "";
	}

	function RestoreFields(data){
		var json = $.parseJSON(data);

		$.each(json, function(key, value){
			if(!$('[name='+key+']').hasClass('savant-skip'))
				$('[name='+key+']').val(value);
		});
	}

	function PersistFields()
	{
		var form = ConvertFormToJSON('.savant-form');

		setCookie(form);
	}

	$("form.savant-form").submit(function( event ) {
		document.cookie = "savant=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	});

	var savant = getCookie();

	if(savant != "")
		RestoreFields(savant);

	$('.savant-form input, .savant-form textarea').focus(function(){
		PersistFields();
	});

	$('.savant-form input, .savant-form textarea').focusout(function(){
		PersistFields();
	});

	$('.savant-form select').change(function(){
		PersistFields();
	});
});