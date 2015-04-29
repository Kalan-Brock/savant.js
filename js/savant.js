/* global jQuery */
(function($){

    'use strict';

    $.savantForm = function(el, options){

        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("savantForm", base);
        
        base.init = function(){
            base.options = $.extend({},$.savantForm.defaultOptions, options);

            $('form.savant-form').submit(function( event ) {
                document.cookie = "savant=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "savantcheckboxes=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "savantradios=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            });

            var savant = base.getCookie("savant");
            var savantcheckboxes = base.getCookie("savantcheckboxes");
            var savantradios = base.getCookie("savantradios");

            if(savant !== "")
                base.restoreFields(savant);

            if(savantcheckboxes !== "")
                base.restoreCheckboxes(savantcheckboxes);

            if(savantradios !== "")
                base.restoreRadios(savantradios);

            $('.savant-form input, .savant-form textarea').focus(function(){
                base.persistFields();
                base.persistCheckboxes();
                base.persistRadios();
            });

            $('.savant-form input, .savant-form textarea').focusout(function(){
                base.persistFields();
                base.persistCheckboxes();
                base.persistRadios();
            });

            $('.savant-form input, .savant-form textarea, .savant-form select').change(function(){
                base.persistFields();
                base.persistCheckboxes();
                base.persistRadios();
            });

            $('.savant-form input').keyup(function(e){
                base.persistFields();
                base.persistCheckboxes();
                base.persistRadios();
            });
        };

        base.setCookie = function(name, cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (base.options.expiresin * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = name + "=" + cvalue + "; " + expires;
        };

        base.getCookie = function(name) {
            var name = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }

            return "";
        };

        base.persistFields = function()
        {
            var values = JSON.stringify($(".savant-form textarea, .savant-form input[type='text'], .savant-form input[type='email'], .savant-form input[type='password'], .savant-form select, .savant-form input[type='date'], .savant-form input[type='color'], .savant-form input[type='range'], .savant-form input[type='month'], .savant-form input[type='week'], .savant-form input[type='time'], .savant-form input[type='datetime'], .savant-form input[type='datetime-local'], .savant-form input[type='search'], .savant-form input[type='tel'], .savant-form input[type='url'], savant-form input[type='number']").map(function(){return $(this).val(); }).get());

            base.setCookie("savant", values);
        };

        base.restoreFields = function(data){
            var json = $.parseJSON(data);
            var textfields = $(".savant-form textarea, .savant-form input[type='text'], .savant-form input[type='email'], .savant-form input[type='password'], .savant-form select, .savant-form input[type='date'], .savant-form input[type='color'], .savant-form input[type='range'], .savant-form input[type='month'], .savant-form input[type='week'], .savant-form input[type='time'], .savant-form input[type='datetime'], .savant-form input[type='datetime-local'], .savant-form input[type='search'], .savant-form input[type='tel'], .savant-form input[type='url'], savant-form input[type='number']").toArray();

            for(var x = 0; x < json.length; x++){
                if(json[x] && !$(textfields[x]).hasClass('savant-skip')){
                    $(textfields[x]).val(json[x]);
                }
            }
        };

        base.persistCheckboxes = function()
        {
             var values = JSON.stringify($(".savant-form input[type='checkbox']").map(function(){return this.checked;}).get());

             base.setCookie("savantcheckboxes", values);
        };

        base.restoreCheckboxes = function(data){
            var json = $.parseJSON(data);
            var checkboxes = $('.savant-form input[type="checkbox"]').toArray();

            for(var x = 0; x < json.length; x++){
                if(json[x] && !$(checkboxes[x]).hasClass('savant-skip')){
                    $(checkboxes[x]).attr('checked', true);
                }
            }
        };

        base.persistRadios = function()
        {
             var values = JSON.stringify($(".savant-form input[type='radio']").map(function(){return this.checked;}).get());

             base.setCookie("savantradios", values);
        };

        base.restoreRadios = function(data){
            var json = $.parseJSON(data);
            var radios = $('.savant-form input[type="radio"]').toArray();

            for(var x = 0; x < json.length; x++){
                if(json[x] && !$(radios[x]).hasClass('savant-skip'))
                    $(radios[x]).attr('checked', true);
            }
        };

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
})(jQuery);
