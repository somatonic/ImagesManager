

;(function($){

    var ImagesManagerList = {

        init: function(){
            var that = this;

            that.spinner = $("<li class='title' id='ProcessListerSpinner'><i class='fa fa-lg fa-spin fa-spinner'></i></li>");
            $("#breadcrumbs ul.nav").append(that.spinner);

            $("#ImagesManagerList").on('click', 'th', that.columnSort);
            // $("#ProcessSEVMembersFilterForm").resizable({alsoResize: ".Inputfields",handles: "n, e, s, w"}).draggable();

            $("#ImagesManagerFilter").on("change submit", function(e){
                e.preventDefault();
                that._submit();
                // $(this).effect("bounce", {}, 500);
                return false;
            });

            $("#ImagesManagerList").on('click', '.MarkupPagerNav a', function() {
                var url = $(this).attr('href');
                that._submit(url);
                return false;
            });


            that._submit();
        },

        columnSort: function() {
            var that = this;
            $(this).find("span").remove();
            var name = $(this).find('b').text();
            var val = $("#imagesmanager_sort").val();

            if(val == name) name = '-' + name; // reverse
            if(name.length < 1) name = val;
            $("#imagesmanager_sort").val(name);

            ImagesManagerList._submit();
        },

        _submit: function(url){
            var that = this;

            url = url ? url : $("#ImagesManagerFilter").attr("action");
            $.ajax({
                url: url,
                type: "post",
                data:
                    // sort: $("#lister_sort").val(),
                    $("#ImagesManagerFilter").serialize()
                ,
                beforeSend: function(){
                    that.spinner.show();
                    $("#ImagesManagerList").animate({"opacity":"0.5"},100);
                },
                success: function(data){
                    var sort = $("#imagesmanager_sort").val();
                    $("#ImagesManagerList").html(data).find("th").each(function() {
                        var $b = $(this).find('b');
                        var txt = $b.text();
                        $b.remove();
                        $(this).find('span').remove();
                        var label = $(this).text();
                        if(txt == sort) {
                            $(this).html("<u>" + label + "</u><span>&nbsp;&darr;</span><b>" + txt + "</b>");
                        } else if(sort == '-' + txt) {
                            $(this).html("<u>" + label + "</u><span>&nbsp;&uarr;</span><b>" + txt + "</b>");
                        } else {
                            $(this).html(label + "<b>" + txt + "</b>");
                        }
                    });
                    that.spinner.hide();
                    $("#ImagesManagerList").animate({"opacity":"1"},100);
                }
            });

        }
    };



    $(function(){

        if($("#ImagesManagerUploaded").length) {

            // url = url ? url : $("#ImagesManagerFilter").attr("action");
            // var data = $("#ImagesManagerUploaded").data("images");
            // $.ajax({
            //     url: config.imagemanager.url,
            //     type: "post",
            //     data: { images: $("#ImagesManagerUploaded").data("images") },
            //     beforeSend: function(){
            //         that.spinner.show();
            //         $("#ImagesManagerList").animate({"opacity":"0.5"},100);
            //     },
            //     success: function(data){
            //         that.spinner.hide();
            //         $("#ImagesManagerList").html(data);
            //     }
            //
            $('#ImagesManagerUploaded').on('click', 'a.im_magnific', function(e){
                e.preventDefault();
                $.magnificPopup.open({
                    type:'image',
                    items: {
                        src: $(this).attr("href")
                    }
                }, 0);

            });


        }



        if($("#ImagesManagerList").length) {

            ImagesManagerList.init();

            /**
             * Bild lightbox
             */
            $('#ImagesManagerList').on('click', 'a.im_magnific', function(e){
                e.preventDefault();
                $.magnificPopup.open({
                    type:'image',
                    items: {
                        src: $(this).attr("href")
                    }
                }, 0);

            });


            /**
             * Tagfeld
             */
            $('#ImagesManagerList').on("click",".imagesmanager_tagfield", function(e){
                $(this).select();
                var tdwrapper = $(this).closest('.imagesmanager_tagfield_wrapper');
                $(this).closest('td').css('width', tdwrapper.width() + 10 + 'px');
                $(this).addClass('selected');
                $(this).css('width', $(this).closest("table").width() / 2.5 + 'px');
            });

            $('#ImagesManagerList').on("blur",".imagesmanager_tagfield", function(e){
                $(this).removeClass('selected');
                $(this).css('width', "auto");
            });
        }


        /**
         *  Edit modal jquery
         */
        // $("#content").on("click", "a.im_edit", imagesManagerEditModal);


    });




    function imagesManagerEditModal(){

        var $a = $(this);
        var isEditLink = true; //$a.hasClass('PageEdit');
        var href = $a.attr('href');
        var url = href + (isEditLink ? '&modal=1' : '');
        var closeOnSave = true;
        var $iframe = $('<iframe class="ListerDialog" frameborder="0" src="' + url + '"></iframe>');
        var windowWidth = $(window).width()-100;
        var windowHeight = isEditLink ? $(window).height()-220 : $(window).height()-160;
        var dialogPageID = 0;


        var $dialog = $iframe.dialog({
            modal: true,
            height: windowHeight,
            width: windowWidth,
            position: [50,49],
            close: function(event, ui) {

            }
        }).width(windowWidth).height(windowHeight);

        $iframe.load(function() {

            var buttons = [];
            //$dialog.dialog('option', 'buttons', {});
            var $icontents = $iframe.contents();
            var n = 0;
            var title = $icontents.find('title').text();

            dialogPageID = $icontents.find('#Inputfield_id').val(); // page ID that will get added if not already present

            // set the dialog window title
            $dialog.dialog('option', 'title', title);

            if(!isEditLink) return;

            // hide things we don't need in a modal context
            //$icontents.find('#wrap_Inputfield_template, #wrap_template, #wrap_parent_id').hide();
            $icontents.find('#breadcrumbs ul.nav, #_ProcessPageEditChildren').hide();

            closeOnSave = $icontents.find('#ProcessPageAdd').size() == 0;

            // copy buttons in iframe to dialog
            $icontents.find("#content form button.ui-button[type=submit]").each(function() {
                var $button = $(this);
                var text = $button.text();
                var skip = false;
                // avoid duplicate buttons
                for(i = 0; i < buttons.length; i++) {
                    if(buttons[i].text == text || text.length < 1) skip = true;
                }
                if(!skip) {
                    buttons[n] = {
                        'text': text,
                        'class': ($button.is('.ui-priority-secondary') ? 'ui-priority-secondary' : ''),
                        'click': function() {
                            $button.click();
                            if(closeOnSave) setTimeout(function() {
                                // ProcessListerPro.refreshLister = true;
                                $dialog.dialog('close');
                            }, 500);
                            closeOnSave = true; // only let closeOnSave happen once
                        }
                    };
                    n++;
                };
                $button.hide();
            });

            $icontents.find("#submit_delete").click(function() {

                setTimeout(function() {
                    $dialog.dialog('close');
                }, 500);
            });

            // cancel button
            /*
            buttons[n] = {
                'text': 'Cancel',
                'class': 'ui-priority-secondary',
                'click': function() {
                    $dialog.dialog('close');
                }
            };
            */

            if(buttons.length > 0) $dialog.dialog('option', 'buttons', buttons);
            $dialog.width(windowWidth).height(windowHeight);
        });

        return false;

    }


})(jQuery);
