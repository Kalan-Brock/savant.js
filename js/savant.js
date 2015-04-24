(function($){
    $.savantForm = function(el, options){

        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("savantForm", base);
        
        base.init = function(){
            base.options = $.extend({},$.savantForm.defaultOptions, options);

            var savant = base.getCookie();

            if(savant != "")
                base.restoreFields(savant);

            $('.savant-form input, .savant-form textarea').focus(function(){
                base.persistFields()
            });

            $('.savant-form input, .savant-form textarea').focusout(function(){
                base.persistFields();
            });

            $('.savant-form select').change(function(){
                base.persistFields()
            });
        };

        base.convertFormToJSON = function(form){
            var array = $(form).serializeArray();
            var json = {};
            
            $.each(array, function() {
                json[this.name] = this.value || '';
            });
            
            return JSON.stringify(json);
        }

        base.setCookie = function(cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (base.options.expiresin * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = "savant" + "=" + cvalue + "; " + expires;
        }

        base.getCookie = function() {
            var name = "savant" + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }

            return "";
        }

        base.persistFields = function()
        {
            var form = base.convertFormToJSON('.savant-form');

            base.setCookie(form);
        }

        base.restoreFields = function(data){
            var json = $.parseJSON(data);

            $.each(json, function(key, value){
                if(!$('[name='+key+']').hasClass('savant-skip'))
                    $('[name='+key+']').val(value);
            });
        }

        base.init();
    };
    
    $.savantForm.defaultOptions = {
        expiresin: 300
    };
    
    $.fn.savantForm = function(options){
        return this.each(function(){
            (new $.savantForm(this, options));
        });
    };

    $("form.savant-form").submit(function( event ) {
        document.cookie = "savant=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });
    
})(jQuery);