

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

        if($("#ImagesManagerList").length) {

            ImagesManagerList.init();

            $('#ImagesManagerList').on('click', 'a.im_magnific', function(e){
                e.preventDefault();
                $.magnificPopup.open({
                    type:'image',
                    items: {
                        src: $(this).attr("href")
                    }
                }, 0);

            });

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


    });


})(jQuery);
