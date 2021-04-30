/**
 * Created by Administrator on 2017/10/31 0031.
 */
$(function(){
    $(".check").click(function(){
        var check = $(this).attr("checked");
        if(!check){
            $(".wa-country").click(function(){
                $(".wa-BulletBox").css("display","none");
                $(".wa-SpecialCountry").css("display","none");
                //alert("未选中要修改的栏目");
            });
            $(".normalDay").click(function(){
                $(".wa-BulletBox").css("display","none");
                $(".wa-NormalCircum").css("display","none");
                //alert("未选中要修改的栏目");
            });

            $(".wa-YunFei").click(function(){
                $(".wa-BulletBox").css("display","none");
                $(".wa-ResetFreight").css("display","none");
                //alert("未选中要修改的栏目");
            });
        }
        else{
            $(this).attr("checked","checked");
            $(".wa-country").click(function(){
                $(".wa-BulletBox").css("display","block");
                $(".wa-SpecialCountry").css("display","block");
                $(".wa-del").click(function(){
                    $("option").remove();
                });
                $(".wa-addCountry").click(function(){
                    var str = '<option value="wa-countyBox">巴西</option>';
                    $(".wa-sel").append(str);
                });
            });
            $(".normalDay").click(function(){
                $(".wa-BulletBox").css("display","block");
                $(".wa-NormalCircum").css("display","block");
            });

            $(".wa-YunFei").click(function(){
                $(".wa-BulletBox").css("display","block");
                $(".wa-ResetFreight").css("display","block");
            });
            $(".wa-cancel").click(function(){
                $(".wa-BulletBox").css("display","none");
                $(this).parent().parent().css("display","none");
            });
            $(".wa-true").click(function(){
                $(".wa-BulletBox").css("display","none");
                $(this).parent().parent().css("display","none");
            });
        }
    });
    check(".wa-country");
    check(".normalDay");
    check(".wa-YunFei");
    function check(obj){
        $(obj).click(function(){
            //console.log(obj);
            var checkA = $(obj).parents(".table-son-structure").parent().siblings(".checkss").children(".check").attr("checked");
            console.log(checkA);
            if(!checkA){
                alert("未选中要修改的栏目");
            }
        });
    }


//    物流查询下拉
//    function showMoreBox(){
//
//    }
});
