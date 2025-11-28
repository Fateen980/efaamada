
jQuery(window).on('load', function () {
    jQuery(".se-pre-con").fadeOut("slow");
});
//jQuery(".se-pre-con").fadeOut("slow");





jQuery(function ($) {
    droopmenu()
    $('.droopmenu-navbar').droopmenu({
        dmPosition:'dmtop',
					dmOffCanvas:true,
					dmFixed	:true		
    });
});

jQuery(document).ready(function ($) { 


    //debugger;
    var MotivProg = $('#hfMotivProg').val();
    var MotivProgEndDate = $('#hfMotivProgEndDate').val();
    var mot_end_date = new Date(MotivProgEndDate);
    var today_date = new Date();
    mot_end_date.setHours(0, 0, 0, 0);
    today_date.setHours(0, 0, 0, 0);
    if (today_date >= mot_end_date || MotivProg == null || MotivProg.toLowerCase() !="true") {
        $('#dashboardProgramLink').css('display', 'none');
    }
    else {
        $('#dashboardProgramLink').css('display', 'block');
    }

    /* DGA Survey */
    var Survey = $('#hfDGASurvey').val();
    var SurveyEndDate = $('#hfDGASurveyEndDate').val();
    var survey_end_date = new Date(SurveyEndDate);
    var today_date = new Date();
    survey_end_date.setHours(0, 0, 0, 0);
    today_date.setHours(0, 0, 0, 0);

    if (today_date > survey_end_date || Survey.toLowerCase() != "true") {
        $('#DGASurveyLink').css('display', 'none');
    }
    else {
        $('#DGASurveyLink').css('display', 'block');
    }
    /* End of DGA Survey */

    if ($("html").attr("dir") == "rtl") {
        $('body').removeClass('ltrDesign').addClass('rtlDesign')
        //$('body').append('<img class="BetaIcon" alt="نسخة تجريبية" src="/Custom/Imgs/Beta.svg" />')
    }
    else {
        $('body').removeClass('rtlDesign').addClass('ltrDesign')
        //$('body').append('<img class="BetaIcon" alt="Beta" src="/Custom/Imgs/BetaEn.svg" />')
    }
        

    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('#backToTop').fadeIn('slow');
        } else {
            $('#backToTop').fadeOut('slow');
        }
    });
    $('#backToTop').click(function(){
        $("html, body").scrollTop(0);
        return false;
    });
});


function LoadSVG(ElmClass, Action, MainSVGDivClass = 'LoadSVG', SVGWidth='40px') {
    if (Action == 'Add') {
        $('.' + ElmClass + '').html('<div class="' + MainSVGDivClass + '"><img style="width:' + SVGWidth+'" src="custom/imgs/Progress2.svg" /></div>')
    }
    else {
        $('.' + ElmClass + '').html('')
    }
    
}

