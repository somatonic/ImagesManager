$(window).load(function(){

    $(".imagesmanager-button").each(function(){
        var $im_link_container = $(this);
        var href = $(this).find('a').attr('href');
        var $link = $(this).find('a');
        var $button = $(this).find('button');
        $button.unbind("click");
        $link.addClass("lightbox iframe").attr("href", href+"?modal=1");
        $im_link_container.closest(".InputfieldContent").find(".langTabs").append($im_link_container);
    });

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
                    var $iframe_url = config.urls.admin + "imagesmanager/?modal=1";
                    $(this).find("iframe").attr('src', $iframe_url);
                },
                "Upload images": function() {
                    var $iframe_url = config.urls.admin + "imagesmanager/upload/?modal=1";
                    $(this).find("iframe").attr('src', $iframe_url);
                },
                "New category": function() {
                    var $iframe_url = config.urls.admin + "imagesmanager/addcategory/?modal=1";
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