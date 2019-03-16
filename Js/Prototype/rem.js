$(function(){
    $(window).on("resize",function(){
        var  width=$(window).width();
        var  fontSize=width/640*100;
        if(width>=640){
            fontSize=100
        }else if(width<=320){
            fontSize=50
        }
        $("html").css("font-size",fontSize)
    }).trigger("resize");
})
