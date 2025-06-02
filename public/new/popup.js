//popup
function ClearPopup() {
    $('body').removeAttr('fineNumber').removeAttr('ViolatorID').removeAttr('DrowToClass').removeAttr('ShowCheckbox').removeAttr('ShowbackBtn').removeAttr('FromHome')
    $('.CustomModal').fadeOut(function () {
        var TitleAnimation = $('.CustomModalTitle').attr('titleanimation')
        $('.CustomModalTitle').removeClass('animate__animated').removeClass(TitleAnimation)
        $('.CustomModalTitle').attr('titleanimation', '')

        var BodyAnimation = $('.CustomModalBody').attr('BodyAnimation')
        $('.CustomModalBody').removeClass('animate__animated').removeClass(BodyAnimation)
        $('.CustomModalBody').attr('BodyAnimation', '')

        $('.CustomModalTitle span').html('')
        $('.CustomModalBodyCard').html('')
        $('.CustomModalBody .container,.CustomModalTopBox .container').css('max-width', '')
        $('.BootstrapCarousel').remove()
    });
    $('.TDClicksCounter').val(0)
    Cookies.remove('PopupTargets')


}
function cloaseModal() {
    ClearPopup()
    

}
$('.CustomModalClose,.AddToCard').click(function () {
    cloaseModal()
});
$('.OpenPopup').click(function () {
    //OpenPopup('animate__backInDown', 'animate__backInDown')
});
function OpenPopup(TitleAnimation, BodyAnimation, PopupWidth) {
    $('.CustomModalBody .container,.CustomModalTopBox .container').css('max-width', PopupWidth+'px')
    $('.CustomModalTitle').addClass('animate__animated ' + TitleAnimation)
    $('.CustomModalTitle').attr('TitleAnimation', TitleAnimation)
    $('.CustomModalBody').addClass('animate__animated ' + BodyAnimation)
    $('.CustomModalBody').attr('BodyAnimation', BodyAnimation)
    $('.CustomModal').fadeIn()
}
//end popup

 
$(document).on('keydown', function (event) {
    if (event.key == "Escape") {
       //console.log($('.BootstrapCarousel').length)
       //console.log($('.BootstrapCarousel').is(":hidden"))
        //alert($('.BootstrapCarousel').is(":hidden"))
        if ($('.bootbox').length == 0) {
            if ($('.BootstrapCarousel').length == 0 || ($('.BootstrapCarousel').length == 1 && $('.BootstrapCarousel').is(":hidden") == true)) {
                ClearPopup()

            }
            else {
                $('.BootstrapCarousel').fadeOut()

            }
        }
        
        
    }
});
//$('.bootbox').length == 0