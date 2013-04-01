$(window).load(function(){

    // $('#ParentPage').bind('pageSelected',function(e){
    //     var parentID = $(this).val();
    //     if(parentID != 0) {
    //         $('#wrap_ImagesUpload').slideDown();
    //     } else {
    //         $('#wrap_ImagesUpload').slideUp();
    //     }
    // });


    $(".imagesmanager_fancybox").each(function(){
        var href = $(this).closest('a').attr('href');
        var $link = $(this).closest('a');
        $link.addClass("fancybox iframe").attr("href",href+"?modal=1");
        $(this).unbind("click");

    });

    var imagesManagerFancybox = function($link){
        var h = $(window).height()-65;
        var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;

        $link.fancybox({
            hideOnContentClick: true,
            centerOnScroll: false,
            frameWidth: w,
            frameHeight: h
        }).trigger("click");
    };

    $('a.fancybox').on("mousedown", function(e){

        e.preventDefault();
        e.stopPropagation();
        imagesManagerFancybox($(this));

    });


    $('.dataTable').on("mousedown","a.iframe", function(e){

        e.preventDefault();
        imagesManagerFancybox($(this));

    });



});