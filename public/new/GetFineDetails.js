var isPaymentDisabled = $('#hfDisablePayment').val();
/*----------------------------- Payment Parameters --------------------------------------------------------*/
/*This function is to set the payerType for the case:
 *  Payment is through IAM so, any single payment on (unfiltered violations page) the payerType is undefined
 */
function checkPayerType(violatorId, payerId) {
    var payerTypePayment = '';
    if (violatorId == payerId)
        payerTypePayment = 3;
    else if (violatorId.startsWith(2))
        payerTypePayment = 1;
    else if (violatorId.startsWith(7))
        payerTypePayment = 2;
    return payerTypePayment;
}
/*----------------------------------------------------------------------------------------------------------*/
function GetFineDetails(fineNumber, ViolatorID, PayerID, PayerType, LoginType, DrowToClass, ShowCheckbox = true, ShowbackBtn = false, FromHome = false) {
    $('body').attr('fineNumber', fineNumber).attr('ViolatorID', ViolatorID).attr('PayerID', PayerID).attr('PayerType', PayerType).attr('LoginType', LoginType).attr('DrowToClass', DrowToClass).attr('ShowCheckbox', ShowCheckbox).attr('ShowbackBtn', ShowbackBtn).attr('FromHome', FromHome)
    if (ShowbackBtn == true) {
        $('.ViolationsList').fadeOut("fast")
        $('.ViolationDetails').fadeIn()
    }
    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    if (ShowbackBtn == false) {
        $('.CustomModalBodyCard').html('<span class="LoadingBeforeSendSpan "><img src="../new/Progress2.svg" class="InlineProgress" /></span>')
    }
    else {
        $('.' + DrowToClass + '').html('<span class="LoadingBeforeSendSpan "><img src="../new/Progress2.svg" class="InlineProgress" /></span>')
    }
    if ($('.LoadedAfterPopupOpen').length == 0) {
        LoadDetailsScript()
    } else {
        onloadCallbackIndividualDetails()
    }

    function LoadDetailsScript() {
        $('body').append('<script src="https://recaptcha.net/recaptcha/api.js?onload=onloadCallbackIndividualDetails&render=' + $('#hdnReCaptchaKey').val() + '"></script>')
        DictionaryUtils.LoadExtraScripts()
    }
}

var onloadCallbackIndividualDetails = function () {
    fineNumber = $('body').attr('fineNumber')
    ViolatorID = $('body').attr('ViolatorID')
    PayerID = $('body').attr('PayerID')
    PayerType = $('body').attr('PayerType')
    LoginType = $('body').attr('LoginType')
    DrowToClass = $('body').attr('DrowToClass')
    ShowCheckbox = JSON.parse($('body').attr('ShowCheckbox'))
    ShowbackBtn = JSON.parse($('body').attr('ShowbackBtn'))
    FromHome = JSON.parse($('body').attr('FromHome'))

    if (FromHome == false) {
        LoginType = 1;
        PayerType = checkPayerType(ViolatorID, PayerID);
    }
    var fineAmount;

    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            var HeaderTitle = $('.CustomModalTitle span').html()

            if (fineNumber.length < 14) {
                NetworkUtils.TrafficFines.extGetTrafficViolationInfo(fineNumber, ViolatorID, token, FromHome)
                    .done(function (data) {
                   
                    if (FromHome)
                            data = data.violationlInfo


                        fineAmount = data.violationlInfo.totalFineItemsAmount;

                        $('.CustomModalBodyCard .LoadingBeforeSendSpan').remove()


                        if (ShowbackBtn == true) {
                            $('.ViolationDetails').append('<div class="popupDetails DivDetailsToPrint"><div class="row"></div></div>')
                        }
                        else {
                            $('.CustomModalBodyCard').append('<div class="popupDetails DivDetailsToPrint"><div class="row"></div></div>')
                        }


                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsHeader"><div class="row PopupTrafficHeader"></div></div>')
                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsBTns"></div>')
                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsBody"></div>')


                        $('.PopupTrafficHeader').append('<div class="col-12  col-lg-9 PopupTrafficHeaderDetails"><div class="row"></div></div><div class="col-12  col-lg-3 PopupTrafficHeaderMap SmartPhoneMTop"></div>')




                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-id-card-alt"></i> <span>' + DictionaryUtils.getMessage('violator_id') + '</span></label><div class="detailsValue">' + data.violationlInfo.violatorID + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-hashtag"></i> <span>' + DictionaryUtils.getMessage('fine_number') + '</span></label><div class="detailsValue">' + data.violationlInfo.violationNumber + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-archway"></i> <span>' + DictionaryUtils.getMessage('violation_issuer') + '</span></label><div class="detailsValue"> <img class="PopupLogo" src="../new/44.svg" />' + data.violationlInfo.structureName + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-betamax"></i> <span>' + DictionaryUtils.getMessage('fine_type') + '</span></label><div class="detailsValue">' + data.violationlInfo.fineGroupDescription + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-calendar-alt"></i> <span>' + DictionaryUtils.getMessage('fine_date') + '</span></label><div class="detailsValue">' + DictionaryUtils.GetDateByLanguage(data.violationlInfo.violationDateG.toString().substr(6, 2), data.violationlInfo.violationDateG.toString().substr(4, 2), data.violationlInfo.violationDateG.toString().substr(0, 4)) + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-clock"></i> <span>' + DictionaryUtils.getMessage('fine_time') + '</span></label><div class="detailsValue">' + DictionaryUtils.GETTIME(data.violationlInfo.violationTime.toString()).substr(0, 2) + ":" + DictionaryUtils.GETTIME(data.violationlInfo.violationTime.toString()).substr(2, 2) + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-tasks-alt"></i> <span>' + DictionaryUtils.getMessage('location') + '</span></label><div class="detailsValue">' + data.violationlInfo.violationCity + '</div></div></div>')

                        ////// Map

                        $('.PopupTrafficHeaderMap').append('<div class="map-responsive" id="map"></div>')
                        if (data.violationlInfo.giS_LATITUDE !== undefined && data.violationlInfo.giS_LONGITUDE !== undefined) {
                            if (data.violationlInfo.giS_LATITUDE != '' && data.violationlInfo.giS_LONGITUDE != '' && data.violationlInfo.giS_LATITUDE != '0.0' && data.violationlInfo.giS_LONGITUDE != '0.0' && data.violationlInfo.giS_LATITUDE != null && data.violationlInfo.giS_LONGITUDE != null) {

                                //$('.map-responsive').html('')

                                var _location = " <a href='https://maps.google.com.sa/?q=" + data.violationlInfo.giS_LATITUDE + "," + data.violationlInfo.giS_LONGITUDE + "&hl=" + DictionaryUtils.getLanguage() + "&region=sa' target='_blank' class='w-100 fineloc btn btn-success btn-block' data-npvmdict='fine_location'><i class='fas fa-map-marker-alt'></i> "
                                    + DictionaryUtils.getMessage("fine_location") + "</a ></p > ";
                                $('.map-responsive').html(_location)





                                //if ($.isNumeric(data.giS_LATITUDE) == false) {
                                //    var MapCord = ReturnCord(data.giS_LATITUDE, data.giS_LONGITUDE)
                                //}
                                //else {
                                //    var MapCord = [data.giS_LATITUDE, data.giS_LONGITUDE]
                                //}
                                //function initMap() {
                                //    const location = { lat: parseFloat(MapCord[0]), lng: parseFloat(MapCord[1]) };
                                //    const map = new google.maps.Map(document.getElementById("map"), {
                                //        zoom: 14,
                                //        center: location,
                                //    });
                                //    const marker = new google.maps.Marker({
                                //        position: location,
                                //        map: map,
                                //    });
                                //}
                                //initMap()
                            }
                            else {
                                $('.map-responsive').html('<div class="alert alert-warning mb-1 text-center d-flex justify-content-center"><i class="fad fa-thumbtack p-1"></i><div>' + DictionaryUtils.getMessage('fine_location') + ' ' + DictionaryUtils.getMessage('not_specified') + ' </div>')
                            }
                        }
                        ///// End Map
                        var platenumber = "",
                            platenumbers = DictionaryUtils.GetPlateNumber(data.violationlInfo.vehiclePlate).split(' ');
                        if (DictionaryUtils.getLanguage() == 'ar') {
                            for (var count = platenumbers.length; count > 0; count--)
                                platenumber += (platenumbers[count - 1] == "" ? "" : "<span>" + platenumbers[count - 1] + " </span>");

                        }
                        else {
                            for (var count = 0; count < platenumbers.length; count++)
                                platenumber += (platenumbers[count] == "" ? "" : "<span style='float:left !important; padding-right:5px;'>" + platenumbers[count] + " </span>");

                        }
                        if (platenumbers == "") {
                            platenumber += DictionaryUtils.getMessage("not_specified");
                        }

                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-road"></i> <span>' + DictionaryUtils.getMessage('street') + '</span></label><div class="detailsValue">' + data.violationlInfo.streetName + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-tachometer-fastest"></i>  <span>' + DictionaryUtils.getMessage('street_speed') + '</span></label><div class="detailsValue">' + data.violationlInfo.streetSpeed + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-tachometer-alt-fast"></i>  <span>' + DictionaryUtils.getMessage('vehicle_speed') + '</span></label><div class="detailsValue">' + data.violationlInfo.vehicleSpeed + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-grip-lines-vertical"></i> <span> ' + DictionaryUtils.getMessage('lane_number') + '</span></label><div class="detailsValue">' + data.violationlInfo.laneNumber + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-brackets"></i>  <span>' + DictionaryUtils.getMessage('foreign_vehicle_number') + '</span></label><div class="detailsValue">' + data.violationlInfo.foreignVehicleNumber + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-compass"></i>  <span>' + DictionaryUtils.getMessage('vehicle_direction') + '</span></label><div class="detailsValue">' + data.violationlInfo.vehicleDirection + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-barcode-read"></i>  <span>' + DictionaryUtils.getMessage('vehicle_serial') + '</span></label><div class="detailsValue">' + data.violationlInfo.vehicleSeriallNumber + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-window-restore"></i>  <span>' + DictionaryUtils.getMessage('vehicle_type') + '</span></label><div class="detailsValue">' + DictionaryUtils.chooseWord(data.violationlInfo.vehicleTypeDescAr, data.violationlInfo.vehicleTypeDescEn) + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-car"></i>  <span>' + DictionaryUtils.getMessage('vehicle_make') + '</span></label><div class="detailsValue">' + data.violationlInfo.vehicleMake + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-cars"></i>  <span>' + DictionaryUtils.getMessage('vehicle_model') + '</span></label><div class="detailsValue">' + data.violationlInfo.vehicleModel + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-barcode-scan"></i>  <span>' + DictionaryUtils.getMessage('vehicle_plate') + '</span></label><div class="detailsValue">' + platenumber + '</div></div></div>')
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-receipt"></i>  <span>' + DictionaryUtils.getMessage('fine_status') + '</span></label><div class="detailsValue">' + DictionaryUtils.chooseWord(data.violationlInfo.violationStatusDescAr, data.violationlInfo.violationStatusDescEn) + '</div></div></div>')
                        if (data.violationlInfo.paymentDateG !== undefined && data.violationlInfo.paymentDateG !== '' && data.violationlInfo.paymentDateG !== null) {
                            $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-calendar-alt"></i>  <span>' + DictionaryUtils.getMessage('payment_date') + '</span></label><div class="detailsValue">' + DictionaryUtils.GetDateByLanguage(data.violationlInfo.paymentDateG.toString().substr(6, 2), data.violationlInfo.paymentDateG.toString().substr(4, 2), data.paymentDateG.toString().substr(0, 4)) + '</div></div></div>')
                        }
                        else {
                            $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-calendar-alt"></i>  <span>' + DictionaryUtils.getMessage('payment_date') + '</span></label><div class="detailsValue">' + '-' + '</div></div></div>')
                        }
                        $('.PopupTrafficHeaderDetails .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-money-bill-wave"></i>  <span>' + DictionaryUtils.getMessage('total_violation_amount') + '</span></label><div class="detailsValue">' + data.violationlInfo.totalFineItemsAmount + ' <span>' + DictionaryUtils.getMessage('saudi_riyal') + '</span></div></div></div>')


                        var strFineNumber = fineNumber + '';
                        // Images ///
                        if (FromHome == false || LoginType == "2") {
                            $('.PopupTrafficHeaderMap').append('<div class="TrafficViolationImages alert alert-warning mb-1 mt-3"><div class="alert  text-center CheckImages PopupLoading"><div class="se-pre-con se-pre-con-small Small"></div><span class="CheckPaymentTXT">' + DictionaryUtils.getMessage('image_loading') + '</span></div></div>')
                            if (!((strFineNumber.startsWith("3") || strFineNumber.startsWith("4") || strFineNumber.startsWith("6")) && strFineNumber.length == 10)) {
                                $('.TrafficViolationImages').html('<div class="VImagesCount mb-3">' + DictionaryUtils.getMessage('no_violation_imgs') + ' <span></div>')
                            }
                            else {
                                var compareDate = new Date();
                                var compareYear = compareDate.getFullYear() - 1;
                                compareDate = new Date(compareYear, compareDate.getMonth(), compareDate.getDay());
                                var violationDate = data.violationlInfo.violationDateG;
                                violationDate = new Date(violationDate.substr(0, 4) + '-' + violationDate.substr(4, 2) + '-' + violationDate.substr(6, 2));

                                if (compareDate < violationDate) {
                                    NetworkUtils.PDSFines.GetTrafficViolationImages(fineNumber, ViolatorID, FromHome)
                                        .done(function (data) {
                                            if (data != undefined && data.violationlInfo.images.length > 0) {
                                                $('.TrafficViolationImages').html('<div class="VImagesCount mb-3"><span>' + data.images.length + '</span> ' + DictionaryUtils.getMessage('images_available') + ' </div><div class="ImagesThmbs text-center mt-2"><div class="row d-flex justify-content-center"></div></div>')

                                                //append ImagesThmbs
                                                for (var i = 0; i < data.violationlInfo.images.length; i++) {
                                                    $('.TrafficViolationImages .ImagesThmbs .row').append('<img class="image-link" id="' + i + '" target="' + i + '" src="data:image/png;base64,' + data.violationlInfo.images[i] + '" />')
                                                }
                                                //Click event for ImagesThmbs
                                                $('.ImagesThmbs').click(function (e) {
                                                    e.stopPropagation();
                                                    //Clear Modal
                                                    $('#CustomModalBodyCardImages').empty();
                                                    setTimeout(function () { $('.ImagesCustomModal').fadeIn() });

                                                    //Append carousel to Custom Images Modal
                                                    $('#CustomModalBodyCardImages').html(`
                                                            <div id="carouselIndicatorsImages" class="carousel slide" data-ride="carousel">
                                                                <ol class="carousel-indicators">
                                                                    <!-- data-slide-to here -->
                                                                </ol>
                                                                <div class="carousel-inner">
                                                                    <!-- carousel-item here -->
                                                                </div>
                                                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide="prev">
                                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                    <span class="sr-only">Previous</span>
                                                                 </button>
                                                                 <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide="next">
                                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                    <span class="sr-only">Next</span>
                                                                 </button>
                                                            </div>
                                                         `);
                                                    /*-------------------- append Traffic Violation images to carousel --------------------*/
                                                    var isActive = '';
                                                    thumbId = $(e.target).attr('id');
                                                    for (var i = 0; i < data.violationlInfo.images.length; i++) {
                                                        isActive = i == thumbId ? 'active' : '';
                                                        $('.carousel-indicators').append('<button type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide-to="' + i + '" class="' + isActive + '"></button>');
                                                        $('.carousel-inner').append('<div class="carousel-item ' + isActive + ' carousel-item-' + i + '"><img class="d-block mx-auto align-items-center" src="data:image/png;base64,' + data.violationlInfo.images[i] + '" alt="violation image"></div>');
                                                    }
                                                    /*------------------------------------------------------------------------*/
                                                    //Images Modal close event
                                                    $('.CustomModalCloseImages').click(function (event) {
                                                        $('.ImagesCustomModal').fadeOut();
                                                        setTimeout(function () { $('.CustomModal').modal('show') });
                                                    });
                                                });
                                            }
                                            else {
                                                $('.TrafficViolationImages').html('<div class="VImagesCount mb-3">' + DictionaryUtils.getMessage('no_violation_imgs') + ' <span></div>')
                                            }
                                        }).always(function (data) {

                                        })
                                        .fail(function () {
                                            $('.TrafficViolationImages').html('<div class="VImagesCount mb-3">' + DictionaryUtils.getMessage('no_violation_imgs') + ' <span></div>')

                                        })
                                } else {
                                    //handle show message that date is old
                                    $('.TrafficViolationImages').html('<div class="VImagesCount mb-3">' + DictionaryUtils.getMessage('no_violation_imgs_by_date') + ' <span></div>')
                                }

                            }


                        }
                        else {
                            var NoImgNote = ''
                            if (!((strFineNumber.startsWith("3") || strFineNumber.startsWith("4") || strFineNumber.startsWith("6")) && strFineNumber.length == 10)) {
                                NoImgNote = DictionaryUtils.getMessage('no_violation_imgs')
                            }
                            else {
                                NoImgNote = DictionaryUtils.getMessage('view_violation_imgs')
                            }
                            //$('.PopupTrafficHeaderMap').append('<div class="TrafficViolationImages alert alert-warning mb-1 mt-3"><div class="alert  text-center CheckImages PopupLoading NoImgsOutside"><span class="CheckPaymentTXT">' + NoImgNote + '</span></div></div>')
                        }

                        // End Images ///





                        if (data.violationlInfo.listOfViolationItems.length > 0) {
                            $('.popupDetailsBody').append('<div class="note "></div>')
                            for (var i = 0; i < data.violationlInfo.listOfViolationItems.length; i++) {
                                $('.popupDetailsBody .note').append('<div class="row row-' + i + '"><div class="col-12"><div class="alert alert-warning mb-1"><div class="row"></div></div></div></div>')
                                $('.popupDetailsBody .note .row-' + i + ' .alert .row').append('<div class="col-12 col-md-9"><div class="detailsGroup" showInShare="No" ><label><span>' + DictionaryUtils.getMessage('fine_desc') + '</span></label><div class="detailsValue">' + (data.violationlInfo.listOfViolationItems.length > 0 ? DictionaryUtils.chooseWord(data.violationlInfo.listOfViolationItems[i].violationTypeDescAr, data.violationlInfo.listOfViolationItems[i].violationTypeDescEn) : '--') + '</div></div></div>')
                                $('.popupDetailsBody .note .row-' + i + ' .alert .row').append('<div class="col-12 col-md-3"> <div class="detailsGroup" showInShare="No" > <label><span>' + DictionaryUtils.getMessage('bill_amount') + '</span></label> <div class="detailsValue">' + data.violationlInfo.listOfViolationItems[i].violationAmount + ' ' + DictionaryUtils.getMessage('saudi_riyal') + ' </div> </div> </div>')

                            }
                        }
                        else {

                        }
                        $('.popupDetails .popupDetailsBTns').append('<div class="BtnToolbar BtnSmallDiv"></div>')
                        if (data.violationlInfo.violationStatusCode == 1) {
                            if (isPaymentDisabled) {
                                $('.popupDetails .BtnToolbar ').before('<div class="alert alert-info mb-1"><center class="alert-info-i"><i class="fad fa-exclamation-triangle"></i><br /><span><h3>' + DictionaryUtils.getMessage('payment_stopped') + '</h3></span></center></div>')
                            }
                            else if (data.violationlInfo.lkResolutionType == 55) {
                                $('.popupDetails .BtnToolbar ').before('<div class="alert alert-info mb-1"><center class="alert-info-i"><i class="fad fa-exclamation-triangle"></i><br /><span>' + DictionaryUtils.getMessage('cannot_pay_on_efaa') + '</span></center></div>')
                            }
                            else {
                                $('.popupDetails .popupDetailsBTns .BtnToolbar').append('<a href="/addto" class="btn btn-info DetailsPayBtn" FineNumber="' + fineNumber + '"FineAmount="' + fineAmount+'"ViolatorId="' + ViolatorID + '"PayerID="' + PayerID + '"PayerType="' + PayerType + '"LoginType="' + LoginType +'"><i class="fad fa-credit-card"></i> ' + DictionaryUtils.getMessage('pay_now') + '</a>')
                            }
                        }
                        if (ShowbackBtn == true) {
                            $('.popupDetails .popupDetailsBTns .BtnToolbar').append('<a href="#" class="btn btn-success BackToList"><i class="fad fa-redo"></i> ' + DictionaryUtils.getMessage('back') + '</a>')
                            $('.BackToList').click(function () {
                                $('.TDClicksCounter').val(0)
                                //console.log($('.TDClicksCounter').val())
                                $('.TableDetailsCounter').html(0);
                                $('.ViolationDetails').fadeOut("fast", function () {
                                    $('.ViolationsList').fadeIn()
                                    $('.ViolationDetails').html('')
                                    $('.BootstrapCarousel').remove()
                                });
                            })
                        }
                        $('.DetailsPayBtn').click(function () {
                            $(this).css('display', 'none')
                            function showpanel() {
                                $('.DetailsPayBtn').css('display', 'inline-block')
                            }
                            setTimeout(showpanel, 1000)
                            var finenumber = $(this).attr('finenumber')
                            var fineAmount = $(this).attr('FineAmount')
                            var violatorid = $(this).attr('violatorid')
                            var PayerID = $(this).attr('PayerID')
                            var PayerType = $(this).attr('PayerType')
                            var LoginType = $(this).attr('LoginType')

                            $('.popupDetails').fadeOut(function () {
                                $('.CheckPayment').fadeIn(function () {
                                    var orderInfo = {
                                        PayerID: PayerID,
                                        ViolatorID: ViolatorID,
                                        OrderType: 2,
                                        PayerType: PayerType,
                                        LoginType: LoginType,
                                        FiensInfoDTOs: [{
                                            "FineNumber": finenumber,
                                            "FineAmount": fineAmount
                                        }]
                                    };
                                    NetworkUtils.Payments.CreateOrder(orderInfo).done(function (data) {
                                        var form = document.getElementById("payment_confirmation");
                                        for (var key in data) {
                                            //console.log(key + ": " + data[key]);
                                            var input = document.createElement("input");
                                            input.setAttribute("type", "hidden");
                                            input.setAttribute("id", key);
                                            input.setAttribute("name", key);
                                            input.setAttribute("value", data[key]);
                                            form.appendChild(input);
                                        }
                                        form.submit();
                                    }).fail(function (data) {
                                        var errorText = data.responseText != null ? data.responseText : DictionaryUtils.getMessage('error-occured')
                                        bootbox.dialog({
                                            message: errorText,
                                            className: DictionaryUtils.getLanguage() === "ar" ? "RTL" : "",
                                            buttons: {
                                                close: {
                                                    label: DictionaryUtils.getMessage("close"),
                                                    className: 'pay-btn'
                                                }
                                            }
                                        });
                                        $('.popupDetails').fadeIn()
                                        $('.CheckPayment').fadeOut(function () {
                                            $('.CheckPaymentFieldDiv').fadeIn()
                                        });
                                    });
                                });
                            });


                        })

                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success PrintDetailsBtn" divtoprint="DivDetailsToPrint" header="' + DictionaryUtils.getMessage('violation_details') + '"><i class="fad fa-print"></i> <span>' + DictionaryUtils.getMessage('print') + '</span></button>')
                        PrintDetails()

                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success ShareDetailsBtn BtnSmall" ShareType="Email" divtoprint="DivDetailsToPrint" header="' + HeaderTitle + '"><i class="fad fa-envelope-open"></i></span></button>')
                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success ShareDetailsBtn BtnSmall" ShareType="WhatsApp" divtoprint="DivDetailsToPrint" header="' + HeaderTitle + '"><i class="fab fa-whatsapp"></i></span></button>')
                        Share()

                        $('.popupDetails').after('<div class="alert  text-center CheckPayment PopupLoading"><div class="se-pre-con Small"></div><span class="CheckPaymentTXT">يرجى الانتظار ...</span></div>')
                        //$('.popupDetails').after('<div class="alert alert-danger text-center CheckPaymentFieldDiv"><span class="CheckPaymentFaild">لا يمكنك دفع هذه المخالفة</span></div>')




                    }).always(function (data) {

                    })
                    .fail(function () {
                        $('.CustomModalBodyCard .LoadingBeforeSendSpan').remove()
                        if (FromHome == true) {
                            $('.CustomModalBodyCard').html('<div class="alert alert-warning text-center" role="alert">' + DictionaryUtils.getMessage("violation_notfound") + '</div >')
                        }
                        $('.ViolationDetails').html('<div class="alert alert-warning text-center" role="alert">' + DictionaryUtils.getMessage("violation_notfound") + '</div >')

                         // Send AJAX request
              
                    })
            }
            else {
                NetworkUtils.PDSFines.extGetViolationsByFineNumAndViolaterId(fineNumber, ViolatorID, token, FromHome)
                    .done(function (data) {

            
                         data = data.violationlInfo.violationlInfo;

                       
                        fineAmount = data.fineAmount;

                        $('.CustomModalBodyCard .LoadingBeforeSendSpan').remove()

                        //console.log(data)
                        if (ShowbackBtn == true) {
                            $('.ViolationDetails').append('<div class="popupDetails DivDetailsToPrint"><div class="row"></div></div>')
                        }
                        else {
                            $('.CustomModalBodyCard').append('<div class="popupDetails DivDetailsToPrint"><div class="row"></div></div>')
                        }

                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsHeader"><div class="row"></div></div>')
                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsBTns"></div>')
                        $('.popupDetails > .row').append('<div class="col-12 popupDetailsBody"></div>')


                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-id-card-alt"></i> <span>' + DictionaryUtils.getMessage('violator_id') + '</span></label><div class="detailsValue">' + data[0].violatorId + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-hashtag"></i> <span>' + DictionaryUtils.getMessage('fine_number') + '</span></label><div class="detailsValue">' + data[0].fineNumber + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-archway"></i> <span>' + DictionaryUtils.getMessage('violation_issuer') + '</span></label><div class="detailsValue"> <img class="PopupLogo" src="../img/' + data[0].structure.code + '.svg" />' + data[0].structureDescription + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-betamax"></i> <span>' + DictionaryUtils.getMessage('fine_type') + '</span></label><div class="detailsValue">' + data[0].fineGroupDescription + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-calendar-alt"></i> <span>' + DictionaryUtils.getMessage('fine_date') + '</span></label><div class="detailsValue">' + DictionaryUtils.formatDate(data[0].dateTimeHappened) + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-clock"></i> <span>' + DictionaryUtils.getMessage('fine_time') + '</span></label><div class="detailsValue">' + data[0].timeHappened + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-window"></i> <span>' + DictionaryUtils.getMessage('fine_booking_type') + '</span></label><div class="detailsValue">' + DictionaryUtils.chooseWord(data[0].fineBookingType, data[0].fineBookingTypeEn) + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-tasks-alt"></i> <span>' + DictionaryUtils.getMessage('fine_status') + '</span></label><div class="detailsValue">' + DictionaryUtils.chooseWord(data[0].fineStatus.description, data[0].fineStatus.latinDescription) + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-calendar-exclamation"></i> <span>' + DictionaryUtils.getMessage('fine_duedate') + '</span></label><div class="detailsValue">' + DictionaryUtils.formatDate(data[0].dueDate) + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-hashtag"></i> <span>' + DictionaryUtils.getMessage('fine_ref_num') + '</span></label><div class="detailsValue">' + data[0].fineBusinessRef + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-map-marked-alt"></i> <span>' + DictionaryUtils.getMessage('location') + '</span></label><div class="detailsValue">' + data[0].cityName + '</div></div></div>')
                        $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-coins"></i> <span>' + DictionaryUtils.getMessage('total_violation_amount') + '</span></label><div class="detailsValue">' + data[0].fineAmount + ' ' + DictionaryUtils.getMessage('saudi_riyal') + ' </div></div></div>')
                        if (data[0].resolutionDate == undefined || data[0].resolutionDate == null || data[0].resolutionDate == "0001-01-01T00:00:00")
                            $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-calendar-alt"></i> <span>' + DictionaryUtils.getMessage('resolution_date') + '</span></label><div class="detailsValue">' + "-" + ' </div></div></div>')
                        else
                            $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-calendar-alt"></i> <span>' + DictionaryUtils.getMessage('resolution_date') + '</span></label><div class="detailsValue">' + DictionaryUtils.formatDate(data[0].resolutionDate) + ' </div></div></div>')

                        //// Plate number : Display Plate info if exists only
                        if (data[0].vehiclePlate !== undefined) {
                            if (data[0].vehiclePlate != "" && data[0].vehiclePlate != null) {

                                plate = data[0].vehiclePlate;

                                var platenumber = "",
                                    platenumbers = DictionaryUtils.GetPlateNumber(plate).split(' ');
                                if (DictionaryUtils.getLanguage() == 'ar') {
                                    for (var count = platenumbers.length; count > 0; count--)
                                        platenumber += (platenumbers[count - 1] == "" ? "" : "<span>" + platenumbers[count - 1] + " </span>");

                                }
                                else {
                                    for (var count = 0; count < platenumbers.length; count++)
                                        platenumber += (platenumbers[count] == "" ? "" : "<span style='float:left !important; padding-right:5px;'>" + platenumbers[count] + " </span>");

                                }
                                if (platenumbers == "") {
                                    platenumber += DictionaryUtils.getMessage("not_specified");
                                }

                                platenumber == null || platenumber == ""
                                    ? $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-barcode-scan"></i>  <span>' + DictionaryUtils.getMessage('vehicle_plate') + '</span></label><div class="detailsValue">' + '-' + '</div></div></div>')
                                    : $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-barcode-scan"></i>  <span>' + DictionaryUtils.getMessage('vehicle_plate') + '</span></label><div class="detailsValue">' + platenumber + '</div></div></div>')

                                data[0].vehicleRegistrationType == undefined || data[0].vehicleRegistrationType == "" || data[0].vehicleRegistrationType == null
                                    ? $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-window-restore"></i>  <span>' + DictionaryUtils.getMessage('vehicle_type') + '</span></label><div class="detailsValue">' + '-' + '</div></div></div>')
                                    : $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-window-restore"></i>  <span>' + DictionaryUtils.getMessage('vehicle_type') + '</span></label><div class="detailsValue">' + data[0].vehicleRegistrationType + '</div></div></div>')


                                data[0].vehicleMake == undefined || data[0].vehicleMake == "" || data[0].vehicleMake == null
                                    ? $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-car"></i>  <span>' + DictionaryUtils.getMessage('vehicle_make') + '</span></label><div class="detailsValue">' + '-' + '</div></div></div>')
                                    : $('.popupDetailsHeader .row').append('<div class="col-md-6 col-lg-4 col-xl-3 col-print-6"><div class="detailsGroup" showInShare="No" ><label><i class="fad fa-car"></i>  <span>' + DictionaryUtils.getMessage('vehicle_make') + '</span></label><div class="detailsValue">' + data[0].vehicleMake + '</div></div></div>')
                            }
                        }
                        ////// Map
                        var locationExists = false;
                        if (data[0].giS_LATITUDE !== undefined && data[0].giS_LONGITUDE !== undefined) {
                            if (data[0].giS_LATITUDE !== "0.0" && data[0].giS_LONGITUDE !== "0.0" && data[0].giS_LATITUDE !== '' && data[0].giS_LONGITUDE !== '' && data[0].giS_LATITUDE !== null && data[0].giS_LONGITUDE !== null) {
                                /*set layout first then append location*/
                                $('.CustomModalBodyCard .popupDetailsHeader').addClass('col-lg-9')
                                $('<div class="col-12  col-lg-3 PopupPublicHeaderMap SmartPhoneMTop"><div class="publicFineMap" id="map"></div></div>').insertAfter('.CustomModalBodyCard .row .popupDetailsHeader');
                                locationExists = true;

                                var _location = " <a href='https://maps.google.com.sa/?q=" + data[0].giS_LATITUDE + "," + data[0].giS_LONGITUDE + "&hl=" + DictionaryUtils.getLanguage() + "&region=sa' target='_blank' class='w-100 fineloc btn btn-success btn-block' data-npvmdict='fine_location'><i class='fas fa-map-marker-alt'></i> "
                                    + DictionaryUtils.getMessage("fine_location") + "</a ></p > ";
                                $('.publicFineMap').html(_location)
                            }
                            //else {
                            //    /*if this condition used, you have to set layout before*/
                            //    $('.publicFineMap').html('<div class="alert alert-warning mt-3"><i class="fad fa-thumbtack"></i><div>' + DictionaryUtils.getMessage('fine_location') + ' ' + DictionaryUtils.getMessage('not_specified') + ' </div>')
                            //}
                        }
                        ///// End Map
                        /******************************************************************************/
                        /** TGA Images **/
                        if (FromHome == false || LoginType == "2") {
                            //check if its a TGA violation to view the violation images
                            if (data[0].structure.code == 32 && data[0].fineGroup.fineGroupCode !== 184) {

                                if (locationExists) {
                                    //insert TGA image tag if location exists
                                    $('<div class="popupTGAHeaderImage"></div>').insertAfter('.PopupPublicHeaderMap .publicFineMap');
                                }
                                else {
                                    //change card layout then insert TGA image tag
                                    $('.CustomModalBodyCard .popupDetailsHeader').addClass('col-lg-9');
                                    $('<div class="col-12 col-lg-3 popupTGAHeaderImage"></div>').insertAfter('.CustomModalBodyCard .row .popupDetailsHeader');
                                }
                                
                                //while checking append loading icon
                                $('.popupTGAHeaderImage').append('<div class="TGAViolationImages alert alert-warning mb-1 mt-3"><div class="alert  text-center CheckImages PopupLoading"><div class="se-pre-con se-pre-con-small Small"></div><span class="CheckPaymentTXT">' + DictionaryUtils.getMessage('image_loading') + '</span></div></div>')

                                var compareDate = new Date();
                                var compareYear = compareDate.getFullYear() - 1; 
                                compareDate = new Date(compareYear, compareDate.getMonth(), compareDate.getDay());
                                var violationDate = new Date(data[0].dateTimeHappened);
                                if (compareDate < violationDate) {
                                    var billNo = data[0].resolutionRef;
                                    NetworkUtils.PDSFines.GetPublicTransportAuthorityImages(billNo, ViolatorID, FromHome)
                                        .done(function (data) {
                                            if (data !== undefined) {
                                                if (data !== null && data.length > 0) {
                                                    $('.TGAViolationImages').html('<div class="VImagesCount mb-3"><span>' + data.length + '</span> ' + DictionaryUtils.getMessage('images_available') + ' </div><div class="ImagesThmbs text-center mt-2"><div class="row d-flex justify-content-center"></div></div>')
                                                    //append ImagesThmbs
                                                    for (var i = 0; i < data.length; i++) {
                                                        $('.TGAViolationImages .ImagesThmbs .row').append('<img class="image-link" id="' + i + '" target="' + i + '" src="data:image/png;base64,' + data[i] + '" />')
                                                    }
                                                    //Click event for ImagesThmbs
                                                    $('.ImagesThmbs').click(function (e) {
                                                        e.stopPropagation();
                                                        //Clear Modal
                                                        $('#CustomModalBodyCardImages').empty();
                                                        setTimeout(function () { $('.ImagesCustomModal').fadeIn() });

                                                        //Append carousel to Custom Images Modal
                                                        $('#CustomModalBodyCardImages').html(`
                                                            <div id="carouselIndicatorsImages" class="carousel slide" data-ride="carousel">
                                                                <ol class="carousel-indicators">
                                                                    <!-- data-slide-to here -->
                                                                </ol>
                                                                <div class="carousel-inner">
                                                                    <!-- carousel-item here -->
                                                                </div>
                                                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide="prev">
                                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                    <span class="sr-only">Previous</span>
                                                                 </button>
                                                                 <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide="next">
                                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                    <span class="sr-only">Next</span>
                                                                 </button>
                                                            </div>
                                                         `);
                                                        /*-------------------- append TGA images to carousel --------------------*/
                                                        var isActive = '';
                                                        thumbId = $(e.target).attr('id');
                                                        for (var i = 0; i < data.length; i++) {
                                                            isActive = i == thumbId ? 'active' : '';
                                                            $('.carousel-indicators').append('<button type="button" data-bs-target="#carouselIndicatorsImages" data-bs-slide-to="' + i + '" class="' + isActive + '"></button>');
                                                            $('.carousel-inner').append('<div class="carousel-item ' + isActive + ' carousel-item-' + i + '"><img class="d-block mx-auto align-items-center" src="data:image/png;base64,' + data[i] + '" alt="violation image"></div>');
                                                        }
                                                        /*------------------------------------------------------------------------*/
                                                        //Images Modal close event
                                                        $('.CustomModalCloseImages').click(function (event) {
                                                            $('.ImagesCustomModal').fadeOut();
                                                            setTimeout(function () { $('.CustomModal').modal('show') });
                                                        });
                                                    });
                                                }
                                                else {
                                                    $('.TGAViolationImages').html('<div class="alert alert-warning mt-3 p-4"><span class="text-center">' + DictionaryUtils.getMessage('no_violation_imgs') + ' </span></div>');
                                                }
                                            }
                                            //show message if undefined
                                            else {
                                            $('.TGAViolationImages').html('<div class="alert alert-warning mt-3 p-4"><span class="text-center">' + DictionaryUtils.getMessage('no_violation_imgs') + ' </span></div>');
                                        }
                                        }).always(function (data) {

                                        })
                                        .fail(function () {
                                            $('.TGAViolationImages').html('<div class="alert alert-warning mt-3 p-4"><span class="text-center">' + DictionaryUtils.getMessage('no_violation_imgs') + ' </span></div>');
                                        });
                                }
                                else {
                                    //handle show message that date is old
                                    $('.TGAViolationImages').html('<div class="VImagesCount mb-3">' + DictionaryUtils.getMessage('no_violation_imgs_by_date') + ' <span></div>')
                                }
                            }
                        }
                        else {
                            //
                        }
                        /** End TGA Images **/
                        /******************************************************************************/
                        if (data[0].structure.code == 4) {
                            $('.popupDetailsHeader .row').append('<div class="col-12 col-print-12"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-paperclip"></i><span>' + DictionaryUtils.getMessage("view_attachment") + '</span></label><div class="detailsValue py-3">' + DictionaryUtils.getMessage("attachment_link") + ' <br /><a href="https://online.mt.gov.sa/PenaltiesInquiry" target="_blank">https://online.mt.gov.sa/PenaltiesInquiry</a></div></div></div>')
                        } else if (data[0].structure.code == 38) {//MOT
                            $('.popupDetailsHeader .row').append('<div class="col-12 col-print-12"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa-paperclip"></i><span>' + DictionaryUtils.getMessage("view_attachment") + '</span></label><div class="detailsValue py-3">' + DictionaryUtils.getMessage("attachment_link_mot") + ' <br /><a href="https://mot.gov.sa/ar/Eservices/InquiryServices/Pages/TicketsInfoPage.aspx" target="_blank">https://mot.gov.sa/ar/Eservices/InquiryServices/Pages/TicketsInfoPage.aspx</a></div></div></div>')
                        } else if (data[0].structure.code == 12) {
                            if (data[0].fineGroupDescription == "مخالفات أحكام نظام الشركات")
                                $('.popupDetailsHeader .row').append('<div class="col-12 col-print-12"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa"></i><span> </span></label><div class="detailsValue py-3">' + DictionaryUtils.getMessage("attachment2_link") + ' <br /><a href="https://mc.gov.sa/ar/pages/efaa.aspx" target="_blank">https://mc.gov.sa/ar/pages/efaa.aspx</a></div></div></div>')
                            else if (data[0].fineGroupDescription == "VIOLATIONS OF THE PROVISIONS OF THE COMPANIES LAW")
                                $('.popupDetailsHeader .row').append('<div class="col-12 col-print-12"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa"></i><span> </span></label><div class="detailsValue py-3">' + DictionaryUtils.getMessage("attachment2_link") + ' <br /><a href="https://mc.gov.sa/ar/pages/efaa.aspx" target="_blank">https://mc.gov.sa/ar/pages/efaa.aspx</a></div></div></div>')

                            else if (data[0].fineGroupDescription == "VIOLATIONS OF THE PROVISIONS OF THE COMPANIES LAW")
                                $('.popupDetailsHeader .row').append('<div class="col-12 col-print-12"><div class="detailsGroup" showInShare="Yes" ><label><i class="fad fa"></i><span> </span></label><div class="detailsValue py-3">' + DictionaryUtils.getMessage("attachment2_link") + ' <br /><a href="https://mc.gov.sa/ar/pages/efaa.aspx" target="_blank">https://mc.gov.sa/ar/pages/efaa.aspx</a></div></div></div>')

                        }
                        if (data[0].groupFineDetails.length > 0) {
                            $('.popupDetailsBody').append('<div class="note "></div>')
                            for (var i = 0; i < data[0].groupFineDetails.length; i++) {
                                $('.popupDetailsBody .note').append('<div class="row row-' + i + '"><div class="col-12"><div class="alert alert-warning mb-1"><div class="row"></div></div></div></div>')
                                $('.popupDetailsBody .note .row-' + i + ' .alert .row').append('<div class="col-12 col-md-4 col-print-4"><div class="detailsGroup" showInShare="No" ><label><span>' + DictionaryUtils.getMessage('fine_desc') + '</span></label><div class="detailsValue">' + data[0].groupFineDetails[i].description + '</div></div></div>')
                                $('.popupDetailsBody .note .row-' + i + ' .alert .row').append('<div class="col-12 col-md-4 col-print-4"> <div class="detailsGroup" showInShare="No" > <label><span>' + DictionaryUtils.getMessage('fine_count') + ' </span></label> <div class="detailsValue">' + data[0].groupFineDetails[i].fineCount + ' </div> </div> </div>')
                                $('.popupDetailsBody .note .row-' + i + ' .alert .row').append('<div class="col-12 col-md-4 col-print-4"> <div class="detailsGroup" showInShare="No" > <label><span>' + DictionaryUtils.getMessage('bill_amount') + ' </span></label> <div class="detailsValue">' + data[0].groupFineDetails[i].amount + ' ' + DictionaryUtils.getMessage('saudi_riyal') + ' </div> </div> </div>')

                            }
                        }
                        else {

                        }

                        $('.popupDetails .popupDetailsBTns').append('<div class="BtnToolbar BtnSmallDiv"></div>')

                        if (data[0].fineStatus.code == 1) {
                            if (isPaymentDisabled) {
                                $('.popupDetails .BtnToolbar ').before('<div class="alert alert-info my-1"><center class="alert-info-i"><i class="fad fa-exclamation-triangle "></i><span class="PaymentIssueMessage"></span></center></div>')
                                $('.PaymentIssueMessage').append('<h3>' + DictionaryUtils.getMessage('payment_stopped') + '</h3>')


                            }
                            else if (data[0].lkResolutionType == 55) {
                                $('.popupDetails .BtnToolbar ').before('<div class="alert alert-info my-1"><center class="alert-info-i"><i class="fad fa-exclamation-triangle "></i><span class="PaymentIssueMessage"></span></center></div>')
                                $('.PaymentIssueMessage').append('<h3>' + DictionaryUtils.getMessage('cannot_pay_on_efaa') + '</h3>')
                                if (data[0].resolutionSource == 60) {
                                    $('.PaymentIssueMessage').append('<p>' + DictionaryUtils.getMessage('sadad_modal_title') + '</p>')
                                    $('.PaymentIssueMessage').append('<p>' + DictionaryUtils.getMessage('sadad_social_sec3') + '</p>')
                                }
                                else {
                                    $('.PaymentIssueMessage').append('<p>' + DictionaryUtils.getMessage('sadad_modal_steps') + '</p><ol></ol>')
                                    $('.PaymentIssueMessage ol').append('<li>' + DictionaryUtils.getMessage('sadad_modal_step1') + data[0].resolSourceDescription + '</li>')
                                    $('.PaymentIssueMessage ol').append('<li>' + DictionaryUtils.getMessage('sadad_modal_step2') + data[0].resolutionRef + '</li>')
                                    $('.PaymentIssueMessage ol').append('<li>' + DictionaryUtils.getMessage('sadad_modal_step3') + '</li>')
                                }
                            }
                            else {
                                $('.popupDetails .popupDetailsBTns .BtnToolbar').append('<a href="/addto" class="btn btn-info DetailsPayBtn" FineNumber="' + fineNumber + '"FineAmount="' + fineAmount + '" ViolatorId="' + ViolatorID + '"PayerID="' + PayerID + '"PayerType="' + PayerType + '"LoginType="' + LoginType + '"><i class="fad fa-credit-card"></i> ' + DictionaryUtils.getMessage('pay_now') + '</a>')
                            }
                        }

                        if (ShowbackBtn == true) {
                            $('.popupDetails .popupDetailsBTns .BtnToolbar').append('<a href="#" class="btn btn-success BackToList"><i class="fad fa-redo"></i> ' + DictionaryUtils.getMessage('back') + '</a>')
                            $('.BackToList').click(function () {
                                $('.TDClicksCounter').val(0)
                                console.log($('.TDClicksCounter').val())
                                $('.TableDetailsCounter').html(0);
                                $('.ViolationDetails').fadeOut("fast", function () {
                                    $('.ViolationsList').fadeIn()
                                    $('.ViolationDetails').html('')
                                });
                            })
                        }



                        $('.DetailsPayBtn').click(function () {

                            $(this).css('display', 'none')
                            function showpanel() {
                                $('.DetailsPayBtn').css('display', 'inline-block')
                            }
                            setTimeout(showpanel, 1000)

                            var finenumber = $(this).attr('finenumber')
                            var fineAmount = $(this).attr('FineAmount')
                            var violatorid = $(this).attr('violatorid')
                            var PayerID = $(this).attr('PayerID')
                            var PayerType = $(this).attr('PayerType')
                            var LoginType = $(this).attr('LoginType')

                            $('.popupDetails').fadeOut(function () {
                                $('.CheckPayment').fadeIn(function () {
                                    var orderInfo = {
                                        PayerID: PayerID,
                                        ViolatorID: ViolatorID,
                                        OrderType: 1,
                                        PayerType: PayerType,
                                        LoginType: LoginType,
                                        FiensInfoDTOs: [{
                                            "FineNumber": finenumber,
                                            "FineAmount": fineAmount
                                        }]
                                    };
                                    NetworkUtils.Payments.CreateOrder(orderInfo).done(function (data) {
                                        var form = document.getElementById("payment_confirmation");
                                        for (var key in data) {
                                            //console.log(key + ": " + data[key]);
                                            var input = document.createElement("input");
                                            input.setAttribute("type", "hidden");
                                            input.setAttribute("id", key);
                                            input.setAttribute("name", key);
                                            input.setAttribute("value", data[key]);
                                            form.appendChild(input);
                                        }
                                        form.submit();
                                    }).fail(function (data) {
                                        var errorText = data.responseText != null ? data.responseText : DictionaryUtils.getMessage('error-occured')
                                        bootbox.dialog({
                                            message: errorText,
                                            className: DictionaryUtils.getLanguage() === "ar" ? "RTL" : "",
                                            buttons: {
                                                close: {
                                                    label: DictionaryUtils.getMessage("close"),
                                                    className: 'pay-btn'
                                                }
                                            }
                                        });
                                        $('.popupDetails').fadeIn()
                                        $('.CheckPayment').fadeOut(function () {
                                            $('.CheckPaymentFieldDiv').fadeIn()
                                        });
                                    });
                                });
                            });


                        })

                        //Rejection/Objection Section
                        /* finding if rejectionStatements is not empty or null to show the button */
                        if (!jQuery.isEmptyObject(data[0].rejectionStatements) && data[0].rejectionStatements !== null) {
                            $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success ObjectionDetailsBtn" header="' + HeaderTitle + '"><i class="fad fa-exclamation-circle"></i><span> ' + DictionaryUtils.getMessage('objection') + '</span></button>');

                            //finding urls and emails by regex
                            var emailExpression = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
                            var urlExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                            var urlRegex = new RegExp(urlExpression);
                            var emailRegex = new RegExp(emailExpression);

                            var searchText = DictionaryUtils.getLanguage() === "ar" ? data[0].rejectionStatements.descriptionAr : data[0].rejectionStatements.descriptionEn;
                            var urlResult = searchText.match(urlRegex);
                            var emailResult = searchText.match(emailRegex);
                            var descriptionWithLinks = searchText;

                            if (urlResult) {
                                for (var i = 0; i < urlResult.length; i++) {
                                    descriptionWithLinks = descriptionWithLinks.replace(urlResult[i], `<a href=` + urlResult[i] + ` target='_blank'>` + urlResult[i] + `</a>`);
                                }
                            }
                            if (emailResult) {
                                for (var i = 0; i < emailResult.length; i++) {
                                    descriptionWithLinks = descriptionWithLinks.replace(emailResult[i], `<a href=mailto:` + emailResult[i] + ` target='_blank'>` + emailResult[i] + `</a>`);
                                }
                            }
                            //end of finding urls and emails by regex

                        }
                        /* append rejectionStatement box onClick */
                        $('.ObjectionDetailsBtn').click(function () {
                            this.disabled = true;
                            $('.popupDetailsBody').append('<div class="objection"></div>');
                            $('.objection').append('<div class="row"><div class="col-12"><div class="alert alert-danger mb-1"><div class="row"></div></div></div></div>');
                            $('.popupDetailsBody .objection .alert .row').append('<div class="col-12 col-print-4"><div class="detailsGroup" showInShare="No" ><label><span class="font-weight-bold">' + DictionaryUtils.getMessage('objection_process') + '</span></label><div class="detailsValueObjection">' + descriptionWithLinks + '</div></div></div>')
                        });
                        //End of Rejection/Objection Section

                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success PrintDetailsBtn" divtoprint="DivDetailsToPrint" header="' + DictionaryUtils.getMessage('violation_details') + '"><i class="fad fa-print"></i> <span>' + DictionaryUtils.getMessage('print') + '</span></button>')
                        PrintDetails()

                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success ShareDetailsBtn BtnSmall" ShareType="Email" divtoprint="DivDetailsToPrint" header="' + HeaderTitle + '"><i class="fad fa-envelope-open"></i></span></button>')
                        $('.popupDetails .BtnToolbar').append('<button type="button" class="btn btn-success ShareDetailsBtn BtnSmall" ShareType="WhatsApp" divtoprint="DivDetailsToPrint" header="' + HeaderTitle + '"><i class="fab fa-whatsapp"></i></span></button>')
                        Share()


                        $('.popupDetails').after('<div class="alert  text-center CheckPayment PopupLoading"><div class="se-pre-con Small"></div><span class="CheckPaymentTXT">' + DictionaryUtils.getMessage('please_wait') + '</span></div>')
                        //$('.popupDetails').after('<div class="alert alert-danger text-center CheckPaymentFieldDiv"><span class="CheckPaymentFaild">لا يمكنك دفع هذه المخالفة</span></div>')




                    }).always(function (data) {


                    })
                    .fail(function () {
                       
                        $('.CustomModalBodyCard .LoadingBeforeSendSpan').remove()
                        if (FromHome == true) {
                            $('.CustomModalBodyCard').html('<div class="alert alert-warning text-center" role="alert">' + DictionaryUtils.getMessage("violation_notfound") + '</div >')
                        }

                        $('.ViolationDetails').html('<div class="alert alert-warning text-center" role="alert">' + DictionaryUtils.getMessage("violation_notfound") + '</div >')

                // Send AJAX request
                $.ajax({
                    headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: "POST",
                    url: "add-efaa",
                    data: formData,
                    success: function(response) {
                        // var resp = response.split("SPLIT");
                        console.log(response);
                       
                        // if (parseInt(resp[0]) != "") {
                        //     callToCheck();
                        // } else {
                        //     return false;
                        // }
                    },
                    error: function(xhr, status, error) {
                        // Handle error
                        console.error(xhr.responseText);
                    }
                     });

                  })
            }

        });
    });
}

/* Print Details */
function PrintDetails() {
    if ($('body').hasClass('rtlDesign')) {
        var PrintCSS = "PrintAr.css"
    }
    else {
        var PrintCSS = "PrintEn.css"
    }
    $('.PrintDetailsBtn').click(function () {
        var PrintDir = ''
        if ($('body').hasClass('ltrDesign') == true) {
            PrintDir = 'ltrDesign'
        }
        else {
            PrintDir = 'rtlDesign'
        }
        var DivToPrint = $(this).attr('DivToPrint')
        var HeaderTXT1 = DictionaryUtils.getMessage('nationalviolationsplatform') + '(' + DictionaryUtils.getMessage('efaa') + ')'
        var HeaderTXT = $(this).attr('header')
        $('.' + DivToPrint + '').printThis({
            importCSS: true,
            pageTitle: '',
            loadCSS: ['/Custom/css/Print.css', '/Custom/css/' + PrintCSS + ''],
            header: '<div class="row Header mb-3 ' + PrintDir +'"><div class="col-8 HeaderTxt"><h2 class="pt-1 pb-0 mb-0">' + HeaderTXT1 + '</h2><h4 class="pt-0 pb-0 mb-0">' + HeaderTXT + '</h4><h6 class="pt-0">' + DictionaryUtils.GetDate() + '</h6></div><div class="col-4 HeaderImg pt-2"><img src="../new/EFAA.svg" /></div><hr></div>',
            footer: '<div class="row Header mb-3 ' + PrintDir +'"><div class="col-8 HeaderTxt"></div><div class="col-4 HeaderImg pt-2"><img src="../new/NICB.svg" /></div><hr></div>'
        });
    })
}
/* Share Details */
function Share() {
    $('.ShareDetailsBtn').click(function () {
        var DivToPrint = $(this).attr('DivToPrint')
        var ShareType = $(this).attr('ShareType')
        var EmailBody = ''

        if (ShareType == "Email") {
            EmailBody += DictionaryUtils.getMessage('nationalviolationsplatform') + ' (' + DictionaryUtils.getMessage('efaa') + ')' + '\n'
            EmailBody += DictionaryUtils.getMessage('violation_details') + '\n\n'
        }
        else if (ShareType == "WhatsApp") {
            EmailBody += '*' + DictionaryUtils.getMessage('nationalviolationsplatform') + ' (' + DictionaryUtils.getMessage('efaa') + ')' + '*' + '\n'
            EmailBody += '*' + DictionaryUtils.getMessage('violation_details') + '*' + '\n'
        }
        $('.' + DivToPrint + ' .popupDetailsHeader').find('.detailsGroup').each(function () {
            if ($(this).attr('showInShare') == 'Yes') {
                var Title = $(this).find('label span').html()
                var Value = $(this).find('.detailsValue').text()
                //console.log(Value)
                EmailBody += (Title + ': ' + Value + '\n')
            }
        });
        EmailBody += '\n' + DictionaryUtils.getMessage('more_info') + ' https://efaa.sa'

        var subject = DictionaryUtils.getMessage('nationalviolationsplatform')

        if (ShareType == "Email") {
            window.location = 'mailto:?Content-type=text/html&subject=' + subject + '&body=' + encodeURIComponent(EmailBody);
        }
        else if (ShareType == "WhatsApp") {
            window.location = 'https://wa.me/?text=' + encodeURIComponent(EmailBody) + ''
        }


    })

}