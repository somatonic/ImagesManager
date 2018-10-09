$(window).load(function(){



    $('a.lightbox').on("click", function(e){

        var h = $(window).height()-65;
        var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;

        e.preventDefault();
        e.stopPropagation();

        $('body').css("overflow","hidden");

        var modal_content = $("<div><iframe src='"+$(this).attr("href")+"' width='100%' height='98%' frameborder='0'></iframe></div>")
        var im_dialog = modal_content.dialog({
            autoOpen: true,
            height: h,
            width: w,
            modal: true,
            buttons: {
                "Images Manager": function() {
                    var $iframe_url = config.images_manager.url + "?modal=1";
                    $(this).find("iframe").attr('src', $iframe_url);
                },
                "Upload images": function() {
                    var $iframe_url = config.images_manager.url + "upload/?modal=1";
                    $(this).find("iframe").attr('src', $iframe_url);
                },
                "New category": function() {
                    var $iframe_url = config.images_manager.url + "addcategory/?modal=1";
                    $(this).find("iframe").attr('src', $iframe_url);
                }//,
                // Ok: function() {
                //     im_dialog.dialog( "close" );
                // }
            },
            close: function() {
                $('body').css("overflow","auto");
            }
        });

        return false;
    });



});