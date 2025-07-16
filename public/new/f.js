
var activeorder;
var DataTableLimit = 100;
var isPaymentDisabled = $('#hfDisablePayment').val();

/*----------------------------- Create Order Parameters ---------------------------------*/
var loginTypePayment = ''; //IAM = 1, OTP = 2, PersonViolation = 3, CompanyViolation = 4, CompanySponsoree = 5
var payerTypePayment = ''; //sponsor = 1, CompanyOwner = 2, himself = 3, defaultedToViolator = 4
var payerIDPayment = '';
var isTrafficPayment = 0; //GeneralFine = 1, TrafficFine = 2
/*----------------------------------------------------------------------------------------*/
$(document).ready(function ($) {
    
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.TXTBirthDate').val('');
            $('.TXTIDNumber').val('');
            $('.TXTFirms-FirmID').val('');
            $('.TXTFirms-FineNumber').val('');
            $('.TXTFirms-LaborId').val('');
    });

    $('#btnlogin').click(function () {

        var IDNumber = $('.TXTIDNumber').val();
        if (IDNumber == '' )
        {
            var Message = '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('id_number_required') + '</div>';
            $('.CustomModalBodyCard').html(Message);
            OpenPopup('animate__backInDown', 'animate__backInDown');
        }
        else if (IDNumber.length != 10 || IDNumber.startsWith('7'))
        {
            var Message = '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('invalid_idnumber') + '</div>';
            $('.CustomModalBodyCard').html(Message);
            OpenPopup('animate__backInDown', 'animate__backInDown');
        }
        else
        {
            window.location.href = '/callback.aspx?idx=' + IDNumber;
        }
    });

    $('.NumberOnly').on('input', function (event) {
        this.value = this.value.replace(/[^0-9 ٠-٩ ۰-۹]/g, '');
    });
    $(".NumberOnly").keyup(function () {
        $(this).val(DictionaryUtils.toEnglishNumber($(this).val()))
    });

    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        $(target).find('input').val('');
    });





    $('body').append('<span class="TableDetailsCounter" style="display:none">0</span>')
    //OpenPopup('animate__backInDown', 'animate__backInDown', 500)

    //linkIndividualsLogin
    $('#linkIndividualsLogin').click(function (e) {
        loginTypePayment = 1;
    });

    $('.IndividualsEnquiry').click(function (e) {
        loginTypePayment = '';
        payerTypePayment = '';
        payerIDPayment = '';
        isTrafficPayment = 0;
        var Message = ''
        var IDNumber = $('.TXTIDNumber').val()
        var FineNumber = $('.TXTFineNumber').val()
        var BirthDate = $('.TXTBirthDate').val()
        //debugger;
        if (IDNumber == '') {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('id_number_required') + '</div>'
        }
        else if (IDNumber.length != 10) {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('id_number_ten_10_digits') + '</div>'
        }
        else if (IDNumber.length == 10 && IDNumber.startsWith(7)) {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('invalid_idnumber') + '</div>'
        }
        
        if (FineNumber == '' && BirthDate == '') {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('enterviolationnumberordob')+'</div>'
        }

        if (IDNumber != '' && FineNumber != '') {
            loginTypePayment = 3;
            payerTypePayment = 4;
            payerIDPayment = IDNumber;
        }
        else if (IDNumber != '' && BirthDate != '') {
            loginTypePayment = 2;
            payerIDPayment = IDNumber;
            //set payerTypePayment not here, because there is two options "companyOwner or himself"
        }

        if (
            IDNumber.length == 10 &&
            !IDNumber.startsWith(7) &&
            (FineNumber != '' || BirthDate != '')
            ) {
            
            if (FineNumber != '') {
                ///////////////////// Individuals Search by Violation Number Success client side vaidation ///////////////////////
                if (FineNumber.length <= 14) {
                    Message = Message + '<div class="HomePopupValidationItem"></div>'
                    $('.CustomModalBodyCard').html('<div class="ViolationDetails"></div>')
                    OpenPopup('animate__backInDown', 'animate__backInDown')

                    GetFineDetails(FineNumber, IDNumber, payerIDPayment, payerTypePayment, loginTypePayment, 'ViolationsList', true, false, true)
                }
                else {
                    Message = Message + '<div class="HomePopupValidationItem">' + DictionaryUtils.getMessage('please_enter_valid_fine_number') + '</div>'
                    OpenPopup('animate__backInDown', 'animate__backInDown')
                    $('.CustomModalBodyCard').html('<div class="alert alert-warning mb-2 text-center">' + Message + '</div>')
                }

            }
            
            else {
                ///////////////////// Individuals Search by date Success client side vaidation ///////////////////////
                $('.se-pre-con').fadeIn()
                if ($('.LoadedAfterPopupOpen').length == 0) {
                    LoadScript('individual')
                } else {
                    onloadCallbackIndividual()
                }
            }
        }
        else {
            $('.CustomModalBodyCard').html(Message)
            OpenPopup('animate__backInDown', 'animate__backInDown', 500)
        }
       
    })
    $('.FirmsEnquiry').click(function () {
        loginTypePayment = '';
        payerTypePayment = '';
        payerIDPayment = '';
        isTrafficPayment = 0;
        var Message = ''
        var FirmID = $('.TXTFirms-FirmID').val()
        var FineNumber = $('.TXTFirms-FineNumber').val()
        var LaborId = $('.TXTFirms-LaborId').val()
        if (FirmID == '') {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('firm_id_requierd')+'</div>'
        }
        else if (FirmID.length != 10) {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('firm_id_ten_digits')+'</div>'
        }
        else if (FirmID.length == 10 && !FirmID.startsWith(7)) {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('pleaseenterfirmid')+'</div>'
        }

        if (FineNumber == '' && LaborId == '') {
            Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('enterviolationnumberorlaborid')+'</div>'
        }
        else {
            if (LaborId != '') {
                if (LaborId.length != 10) {
                    Message = Message + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('labor_id_ten_digits')+'</div>'
                }
            }
        }

        if (FirmID != '' && FineNumber != '') {
            loginTypePayment = 4;
            payerTypePayment = 4;
            payerIDPayment = FirmID;
        }
        else if (FirmID != '' && LaborId != '') {
            loginTypePayment = 5;
            payerTypePayment = 4;
            payerIDPayment = FirmID;
        }

        if (FirmID.length == 10 && FirmID.startsWith(7) && (FineNumber != '' || LaborId != '')) {
            
            if (FineNumber != '') {
                if (FineNumber.length <= 14) {
                    Message = Message + '<div class="HomePopupValidationItem"></div>'
                    $('.CustomModalBodyCard').html('<div class="ViolationsList"></div>')
                    OpenPopup('animate__backInDown', 'animate__backInDown')

                    GetFineDetails(FineNumber, FirmID, payerIDPayment, payerTypePayment, loginTypePayment, 'ViolationsList', true, false, true)
                }
                else {
                    Message = Message + '<div class="HomePopupValidationItem">' + DictionaryUtils.getMessage('please_enter_valid_fine_number') + '</div>'
                    OpenPopup('animate__backInDown', 'animate__backInDown')
                    $('.CustomModalBodyCard').html('<div class="alert alert-warning mb-2 text-center">' + Message + '</div>')
                }



               
            }
            else {
                //////////////////////////Firm Success client side vaidation////////////////////////////
                $('.se-pre-con').fadeIn()
                if ($('.LoadedAfterPopupOpen').length == 0) {
                    LoadScript('Firms')
                } else {
                    onloadCallbackFirms()
                }
                
            }
        }
        else {
            $('.CustomModalBodyCard').html(Message)
            OpenPopup('animate__backInDown', 'animate__backInDown', 500)
        }
    })

    
    $('.TXTFineNumber').on('input', function (e) {
        $('.TXTBirthDate').val('')
    });
    $('.TXTBirthDate').on('input', function (e) {
        $('.TXTFineNumber').val('')
    }); 
    $('.TXTFirms-FineNumber').on('input', function (e) {
        $('.TXTFirms-LaborId').val('')
    });
    $('.TXTFirms-LaborId').on('input', function (e) {
        $('.TXTFirms-FineNumber').val('')
    });



});


(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));




$(".date-default").on('dp.change', function (arg) {
    $('.TXTFineNumber').val('')
});


function DrowPopupBody(IDNumber, BirthDate, data, SponsoreeID = 0) {
    
    OpenPopup('animate__backInDown', 'animate__backInDown')

    
    ///////////// Drow Filter box ///////////
    $('.CustomModalBodyCard').html('<div class="ViolationsList"></div><div class="ViolationDetails" style="display: none;"></div>')
    $('.ViolationsList').append('<div class="mb-2 mt-1 pb-0 HomePopupDDLFilter" style="display:none"><div class="form-row"><div class="col-12 col-lg-10"><div class="row PopupFiltersDDL"></div></div><div class="form-group col-12 col-lg-2" style="display:none"><div class= "BtnSmallDiv PopupFiltersBtn" style="display:none"></div></div></div></div>')
    
    
    if (SponsoreeID == 0) {
        $('.PopupFiltersDDL').append('<div class="input-group mb-3 col-md-4" style="display:none"> <div class="input-group-prepend"> <span class="input-group-text" ><i class="fad fa-question"></i></span> </div> <select class="form-control selectpicker SelectType"> <option value="1" targetType="1">' + DictionaryUtils.getMessage('my_violations') + '</option><option class="firmOption" value="3" targetType="3">' + DictionaryUtils.getMessage('my_firms') + '</option> </select></div>')
        $('.PopupFiltersDDL').append('<div class="input-group mb-3 col-md-5 TargetType TargetType3"> <div class="input-group-prepend"> <span class="input-group-text" ><i class="fad fa-landmark"></i></span> </div> <select class="form-control selectpicker DDLFirms">  </select> </div>')
        GetFirmsList(IDNumber);
    }
    $('.PopupFiltersDDL').append('<div class="input-group mb-3 col-md-4 " style="display:none"> <div class="input-group-prepend"> <span class="input-group-text" id="basic-addon1"><i class="fad fa-landmark"></i></span> </div> <select class="form-control selectpicker IsTrafficSelect FilterB"> <option value="1" >' + DictionaryUtils.getMessage('general_violations') + '</option> <option value="2">' + DictionaryUtils.getMessage('traffic_violations') + '</option> </select> </div>')
    
    $('.PopupFiltersBtn').append('<span  class="form-control btn btn-primary BtnSmall SearchBtn"><i class="fad fa-search"></i></span>')
    $('.PopupFiltersBtn').append('<span class="form-control btn btn-danger BtnSmall ResetBtn"><i class="fad fa-sync"></i></span>')
    $('.SelectType').change(function () {
        var targetType = $(".SelectType option:selected").attr('targetType');
        if (targetType == 0 || targetType == 1) {
            $(".DDLLabours").val($(".DDLLabours option:first").val());
            $(".DDLFirms").val($(".DDLFirms option:first").val());
        }
        else if (targetType == 2) {
            $(".DDLFirms").val($(".DDLFirms option:first").val());
        }
        else if (targetType == 3) {
            $(".DDLLabours").val($(".DDLLabours option:first").val());
        }
        $('.TargetType').css('display', 'none')
        $('.TargetType' + targetType + '').css('display', 'inline-flex')
    });
    $('.DDLFirms,.SelectType').change(function () {
        $(".IsTrafficSelect").val($(".IsTrafficSelect option:first").val());
    });
    $('.PopupFiltersDDL select').change(function () {
        $('.SearchBtn').click()
    })
    $('.SearchBtn').click(function () {
        

        var ViolatorType = $('.SelectType').val()
        
        if (!ViolatorType) {
            ViolatorType = 3
        }
        var Id = $('.DDLFirms').val()
        if (Id == null || Id == 0 ||ViolatorType == 1) {
            Id = IDNumber
        }
        var IsTraffic = 0;
        var IsTrafficSelect = $('.IsTrafficSelect').val()
        if (IsTrafficSelect == 2) {
            IsTraffic = 1
        }

        var Filter = {
            "violatorId": IDNumber,
            "ViolatorType": ViolatorType,
            "Structre": 0,
            "Id": Id,
            "FineGroup": 0,
            "Status": 1,
            "FineDate": 0,
            "FineNumber": 0,
            "BusRef": 0,
            "IsTraffic": IsTraffic
        }
        var targetType = $(".SelectType option:selected").attr('targetType');
        if (Id == 0 && targetType == 3) {
            $('.form-row').append('<div class="col-12 NoFirmFound mb-2"><div class="alert alert-warning" role="alert">لا يوجد لديك منشآت</div></div>')
        }
        else {
            ResetPopupResult(Filter)
            //GetTableData(Filter, BirthDate, SponsoreeID)
        }
        

    })
    function ResetPopupResult(Filter) {
        LoadSVG('LoadSVG', 'Add')
        LoadSVG('LoadSmallSVG', 'Add', 'LoadSmallSVGDiv', '20px')
        $('.SpanSelectedCount,.SelectedAmountSpan').html('0')
        $('.PayListBtn').attr('disabled', 'disabled')
        $('.NoFirmFound').remove()
        GetTableData(Filter, BirthDate, SponsoreeID)
    }
    $('.ResetBtn').click(function () {
        $('.TargetType').css('display', 'none')
        $(".SelectType").val($(".SelectType option:first").val());
        $(".DDLFirms").val($(".DDLFirms option:first").val());
        $(".IsTrafficSelect").val($(".IsTrafficSelect option:first").val());
        var ViolatorType = $('.SelectType').val()
        var Id = $('.DDLFirms').val()
        if (Id == null || Id == 0 || ViolatorType == 1) {
            Id = IDNumber
        }
        var IsTraffic = 0;
        var IsTrafficSelect = $('.IsTrafficSelect').val()
        if (IsTrafficSelect == 2) {
            IsTraffic = 1
        }
        var Filter = {
            "violatorId": IDNumber,
            "ViolatorType": ViolatorType,
            "Structre": 0,
            "Id": Id,
            "FineGroup": 0,
            "Status": 1,
            "FineDate": 0,
            "FineNumber": 0,
            "BusRef": 0,
            "IsTraffic": IsTraffic
        }
        ResetPopupResult(Filter)
        
    })

    $('.ViolationsList').append('<div class="PopupResults mt-3"><div class="row PopupResultsRow"></div></div>')
    
    ///////////// Drow Result table box ///////////
    $('.PopupResultsRow').append('<div class="col-12 col-lg-9 DashboardPaymentListDetialsTableAndPrint"></div>')
    //$('.DashboardPaymentListDetialsTableAndPrint').append('<div class="BtnToolbar BtnSmallDiv"><button type="button" class="btn btn-success PrintBtn" DivToPrint="DivToPrint" header="' + DictionaryUtils.getMessage('"dashboardnavviolations')+'"><i class="fad fa-print"></i> <span data-npvmdict="print"></span></button></div>')
    $('.DashboardPaymentListDetialsTableAndPrint').append('<div class="mt-0  p-2 DivToPrint"><div class="table-responsive AjaxTable LoadSVG"></div></div>')
    ShowDisplayName(data, SponsoreeID)
    LoadSVG('LoadSVG', 'Add')
    LoadSVG('LoadSmallSVG', 'Add', 'LoadSmallSVGDiv', '20px')


    if (SponsoreeID == 0) {
        var Filter = {
            "violatorId": IDNumber,
            "ViolatorType": 1,
            "Structre": 0,
            "Id": IDNumber,
            "FineGroup": 0,
            "Status": 1,
            "FineDate": 0,
            "FineNumber": 0,
            "BusRef": 0

        }
        GetTableData(Filter, BirthDate, '')
    }
    else {
        var Filter = {
            "violatorId": IDNumber,
            "ViolatorType": 1,
            "Structre": 0,
            "Id": IDNumber,
            "FineGroup": 0,
            "Status": 1,
            "FineDate": 0,
            "FineNumber": 0,
            "BusRef": 0

        }
        GetTableData(Filter, '', SponsoreeID)
    }

    
    ///////////// Drow Result details box ///////////
    $('.PopupResultsRow').append('<div class="col-12 col-lg-3 SmartPhoneMTop"><div class="mb-3 card DashboardPaymentListDetials p-0"></div></div>')
    $('.DashboardPaymentListDetials').append('<i class="fad fa-receipt"></i>')
    $('.DashboardPaymentListDetials').append('<div class="TableHeader p-3 mb-2">' + DictionaryUtils.getMessage('countlbl') + '<span class="AllCount TableRowCount BlockSpan LoadSmallSVG"></span>' + DictionaryUtils.getMessage('unpaid_violation') + '<br /> ' + DictionaryUtils.getMessage('accumulation') + '<span class="AllCount TotalAmount BlockSpan LoadSmallSVG"></span>' + DictionaryUtils.getMessage('saudi_riyal') + '</div>')
    $('.DashboardPaymentListDetials').append('<div class="TableSelectDetails"></div>')
    $('.TableSelectDetails').append('<div class="SowIfNotHaveFines">' + DictionaryUtils.getMessage('no_selected_fines') +'</div><div class="TableSelectDetailsCol1 SowIfHaveFines mb-2">' + DictionaryUtils.getMessage('number_of_violations') + '<span class="AllCount BlockSpan SpanSelectedCount">0</span>' + DictionaryUtils.getMessage('from') + ' <span class="AllCount TableRowCount BlockSpan LoadSmallSVG"></span></div>')
    $('.TableSelectDetails').append('<div class="TableSelectDetailsCol2"><div class="SelectedAmount"><span class="SowIfHaveFines">' + DictionaryUtils.getMessage('violation_amount') + ' <span class="SelectedAmountSpan BlockSpan">0</span> ' + DictionaryUtils.getMessage('saudi_riyal') + '</span><button type="button" disabled class="btn btn-success PayListBtn btn-block mt-3" ><i class="fad fa-shopping-cart"></i> <span>' + DictionaryUtils.getMessage('pay_now') + '</span></button><span class="SadadMsg">' + DictionaryUtils.getMessage('sadad_pay') + '</span></div></div>')

}


function CheckFinesAvailability(violatorId, SponsoreeID, Dob) {
    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            NetworkUtils.PDSFines.HomeStatistics(violatorId, SponsoreeID, Dob, token)
                .done(function (data) {
                    if (data.length > 0) {
                        var UnpaidFinesCount = 0;
                        for (var i = 0; i < data.length; i++) {
                            UnpaidFinesCount += data[i].unpaidCount
                        }
                        
                        if (UnpaidFinesCount == 0) {
                            $('.RemoveAfterAvailabilityCheck').fadeOut(function () {
                                $('.HomeStatisticsBox').after('<div class="alert alert-warning my-4 text-center">' + DictionaryUtils.getMessage("you_have_no_fines") + '</div>')
                            })
                            
                        }
                        else {
                            $('.RemoveAfterAvailabilityCheck').fadeOut(function () {
                                $('.HomeStatisticsBox,.PopupResults').fadeIn()
                            })
                            
                        }
                    }
                    else {

                    }
                }).always(function (data) {

                }).fail(function (xhr, textStatus, errorThrown) {
                })


        });
    });
}
function HomeStatistics(violatorId, SponsoreeID, Dob) {
    
    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            NetworkUtils.PDSFines.HomeStatistics(violatorId, SponsoreeID, Dob, token)
                .done(function (data) {
                    if (data.length > 0) {
                        var MyViolationCount = 0
                        var FirmsViolationCount = 0
                        var FirmsViolationBySponsoreeCount = 0
                        var NoFines = '<span class="NoFinesSpan">' + DictionaryUtils.getMessage("no_fine") + '</span>'
                        var selected = 0;
                        if (SponsoreeID == '') {
                            for (var i = 0; i < data.length; i++) {
                                

                                if (data[i].type == 1) {
                                    if (data[i].unpaidCount == '0') {
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(NoFines)
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral').css('display','none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        $('.HomeStatisticsDetailsBoxGeneralMy').click();
                                        selected = 1;
                                    }
                                    MyViolationCount += data[i].unpaidCount
                                    
                                }
                                else if (data[i].type == 4) {
                                    if(data[i].unpaidCount == '0'){
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(NoFines)
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic').css('display', 'none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        if (selected != 1) {
                                            $('.HomeStatisticsDetailsBoxTrafficMy').click();
                                            selected = 1;
                                        }
                                    }
                                    MyViolationCount += data[i].unpaidCount
                                    
                                }
                                else if (data[i].type == 3) {
                                    if (data[i].unpaidCount == '0') {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(NoFines)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral').css('display', 'none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        if (selected != 1) {
                                            $('.HomeStatisticsDetailsBoxGeneralFirms').click();
                                            selected = 1;
                                        }
                                    }
                                    FirmsViolationCount += data[i].unpaidCount
                                    
                                }
                                else if (data[i].type == 5) {
                                    if (data[i].unpaidCount == '0') {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(NoFines)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic').css('display', 'none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        if (selected != 1) {
                                            $('.HomeStatisticsDetailsBoxTrafficFirms').click();
                                            selected = 1;
                                        }
                                    }
                                    FirmsViolationCount += data[i].unpaidCount
                                    
                                }
                            }
                            if (MyViolationCount == 0) {
                                $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount').html(NoFines)
                            }
                            else {
                                $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount').html(MyViolationCount)
                            }

                            if (FirmsViolationCount == 0) {
                                $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').html(NoFines)
                            }
                            else {
                                $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').html(FirmsViolationCount)
                            }
                            
                            
                        }
                        else {
                            for (var i = 0; i < data.length; i++) {
                                
                                if (data[i].type == 1) {
                                    if (data[i].unpaidCount == '0') {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(NoFines)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral').css('display', 'none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral  .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        if (selected != 1) {
                                            $('.HomeStatisticsDetailsBoxGeneralFirms').click();
                                            selected = 1;
                                        }
                                    }
                                    FirmsViolationBySponsoreeCount += data[i].unpaidCount

                                    
                                }
                                else if (data[i].type == 5) {
                                    if (data[i].unpaidCount == '0') {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(NoFines)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic').css('display', 'none')
                                    }
                                    else {
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count').html(data[i].unpaidCount)
                                        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber').html(data[i].unpaidAmount)
                                        if (selected != 1) {
                                            $('.HomeStatisticsDetailsBoxTrafficFirms').click();
                                            selected = 1;
                                        }
                                    }
                                    FirmsViolationBySponsoreeCount += data[i].unpaidCount
                                }
                            }

                            if (FirmsViolationBySponsoreeCount == 0) {
                                $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').html(NoFines)
                            }
                            else {
                                $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').html(FirmsViolationBySponsoreeCount)
                            }
                            
                        }
                    }
                    else {

                    }
                }).always(function (data) {

                }).fail(function (xhr, textStatus, errorThrown) {
                })


        });
    });

    
}
function ShowDisplayName(data, SponsoreeID) {

    if (SponsoreeID == 0) {
        CheckFinesAvailability(data.id, '', $('.TXTBirthDate').val())
    }
    else {
        CheckFinesAvailability(data.firmID, $('.TXTFirms-LaborId').val(), '')
    }
    
    

    $('.ViolationsList').prepend('<div class="QueryName"><h5 class="QueryNameHeader"></h5></div><div class="LoadingBeforeSend RemoveAfterAvailabilityCheck"><span class="LoadingBeforeSendSpan "><img src="Custom/imgs/Progress2.svg" class="InlineProgress" /></span></div><div class="HomeStatisticsBox"></div>')
    if (SponsoreeID == 0) {
        
        $('.QueryName .QueryNameHeader').append(DictionaryUtils.getMessage("hello") + ' ')
        $('.QueryName .QueryNameHeader').append(DictionaryUtils.chooseWord(data.firstName, data.firstNameT) + ' ')
        $('.QueryName .QueryNameHeader').append(DictionaryUtils.chooseWord(data.fatherName, data.fatherNameT) + ' ')
        $('.QueryName .QueryNameHeader').append(DictionaryUtils.chooseWord(data.familyName, data.familyNameT))
        $('.QueryName .QueryNameHeader').append('<div class="HomeCountMainBoxLoad"></div>')
        $('.HomeStatisticsBox').append('<div class="row mb-2 text-center"><div class="col-6 HomeStatisticsBoxMyViolation"></div><div class="col-6 HomeStatisticsBoxFirmsViolation" style="display:none"></div></div>')

        $('.HomeStatisticsBoxMyViolation').append('<div class="card p-0"></div>')
        $('.HomeStatisticsBoxMyViolation .card').append('<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderMy"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBox').append('<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralMy HomeStatisticsDetailsBoxItemActive"><i class="fas fa-sort-down" style="display:block"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem  HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficMy"><i class="fas fa-sort-down"></i></div></div>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeader').append('<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-user-tie PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderTXT').append(DictionaryUtils.getMessage("my_violations"))
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount').append('')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBoxGeneral').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubTXTGeneral').append(DictionaryUtils.getMessage("general"))
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") +'</span>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBoxTraffic').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubTXTTraffic').append(DictionaryUtils.getMessage("traffic"))
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + '</span>')
        
        $('.HomeStatisticsBoxFirmsViolation').append('<div class="card p-0"></div>')
        $('.HomeStatisticsBoxFirmsViolation .card').append('<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderFirms"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBox').append('<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralFirms"><i class="fas fa-sort-down"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficFirms"><i class="fas fa-sort-down"></i></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeader').append('<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-store PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderTXT').append(DictionaryUtils.getMessage("my_firms"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').append('')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxGeneral').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTGeneral').append(DictionaryUtils.getMessage("general"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + '</span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxTraffic').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTTraffic').append(DictionaryUtils.getMessage("traffic"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + '</span>')


        $('.HomeStatisticsDetailsBoxItem').click(function () {
            $('.HomeStatisticsDetailsBoxItemActive').removeClass('HomeStatisticsDetailsBoxItemActive')
            $(this).addClass('HomeStatisticsDetailsBoxItemActive')
            $('.HomeStatisticsDetailsBoxItem .fa-sort-down').css('display', 'none')
            $(this).find('.fa-sort-down').css('display', 'block')
        })
        $('.HomeStatisticsDetailsBoxGeneralMy').click(function () {
            $('.SelectType').val("1");
            $('.IsTrafficSelect').val('1')
            $('.TargetType').css('display', 'none')
            $('.HomePopupDDLFilter').css('display', 'none')
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 3
            isTrafficPayment = 1;
            $('.SearchBtn').click()
        })
        $('.HomeStatisticsDetailsBoxTrafficMy').click(function () {
            $('.SelectType').val("1");
            $('.IsTrafficSelect').val('2')
            $('.TargetType').css('display', 'none')
            $('.HomePopupDDLFilter').css('display', 'none')
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 3
            isTrafficPayment = 2;
            $('.SearchBtn').click()
        })
        $('.HomeStatisticsDetailsBoxGeneralFirms').click(function () {
            $('.SelectType').val("3");
            $('.IsTrafficSelect').val('1')
            $('.TargetType3').css('display', 'inline-flex')
            $('.HomePopupDDLFilter').css('display', 'block')
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 2
            isTrafficPayment = 1;
            $('.SearchBtn').click()
        })
        $('.HomeStatisticsDetailsBoxTrafficFirms').click(function () {
            $('.SelectType').val("3");
            $('.IsTrafficSelect').val('2')
            $('.TargetType3').css('display', 'inline-flex')
            $('.HomePopupDDLFilter').css('display', 'block')
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 2
            isTrafficPayment = 2;
            $('.SearchBtn').click()
        })
        
        HomeStatistics(data.id, '', $('.TXTBirthDate').val())

    }
    else {
        $('.QueryName .QueryNameHeader').append(data.name)
        $('.HomeStatisticsBox').append('<div class="row mb-2 text-center"><div class="col-6 HomeStatisticsBoxFirmsViolation" ></div></div>')
        $('.HomeStatisticsBoxFirmsViolation').append('<div class="card p-0"></div>')
        $('.HomeStatisticsBoxFirmsViolation .card').append('<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderFirms"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBox').append('<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralFirms"><i class="fas fa-sort-down"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficFirms"><i class="fas fa-sort-down"></i></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeader').append('<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-store PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderTXT').append(DictionaryUtils.getMessage("fines"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount').append('')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxGeneral').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTGeneral').append(DictionaryUtils.getMessage("general"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + '</span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxTraffic').append('<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTTraffic').append(DictionaryUtils.getMessage("traffic"))
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic').append('<span class="Count LoadingBeforeSend NumberStyle"></span>')
        $('.HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic').append('<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + '</span>')

        $('.HomeStatisticsDetailsBoxGeneralFirms').click(function () {
            $('.IsTrafficSelect').val('1')
            isTrafficPayment = 1;
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 2
            $('.SearchBtn').click()
        })
        $('.HomeStatisticsDetailsBoxTrafficFirms').click(function () {
            $('.IsTrafficSelect').val('2')
            isTrafficPayment = 2;
            payerTypePayment = payerTypePayment != '' ? payerTypePayment : 2
            $('.SearchBtn').click()
        })
        HomeStatistics(data.firmID, $('.TXTFirms-LaborId').val(), '')

    }
    $('.LoadingBeforeSend').html('<span class="LoadingBeforeSendSpan "><img src="Custom/imgs/Progress2.svg" class="InlineProgress" /></span>')
    
}
function GetTableData(Filter, BirthDate, SponsoreeID) {

    var ShowCheckbox = true
    
    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            //////////// Drow DataTable //////////////
            
            var rowData = [];
            var obj;
            //todo
            NetworkUtils.PDSFines.GetViolationsByViolatorHome(Filter, Filter.violatorId, SponsoreeID, BirthDate,true, token).done(function (data) {
                
                
                var GeneralFineCounter = 0;
                var TraficFineCounter = 0;
                var GeneralFinesCountTitle = ''
                var TrafficFinesCountTitle = ''
                


                $('.TableRowCount').html(data.length)

                var TotalAmount = 0;
                data.forEach(function (element) {
                    obj = [
                        element.violatorId,
                        '',
                        element.resolutionTypeCode,
                        '<img src="Custom/imgs/structure/' + element.structureId + '.svg" /> ' + DictionaryUtils.chooseWord(element.structureDescriptionAr, element.structureDescription),
                        element.violatorName,
                        DictionaryUtils.chooseWord(element.violationGroupDescAr, element.violationGroupDesc),
                        DictionaryUtils.formatDate(element.violationDate),
                        element.violationNumber,
                        //element.businessRefNumber,
                        element.totalAmount,
                        DictionaryUtils.chooseWord(element.violationStatusDescAr, element.violationStatusDesc),
                        '<button type="button" class="btn btn-primary btn-custom OpenPopupBoxDetails" finenumber="' + element.violationNumber + '" violatorid="' + element.violatorId + '"><i class="fad fa-eye"></i></button>',

                    ]
                    TotalAmount += element.totalAmount
                    $('.TotalAmount').html(TotalAmount)


                    if (element.structureId == 44) {
                        TraficFineCounter++
                    }
                    else {
                        GeneralFineCounter++
                    }





                    rowData.push(obj);
                });


                
                if (GeneralFineCounter > 1) {
                    GeneralFinesCountTitle = DictionaryUtils.getMessage('home_fines')
                }
                else {
                    GeneralFinesCountTitle = DictionaryUtils.getMessage('home_fine')
                }
                if (TraficFineCounter > 1) {
                    TrafficFinesCountTitle = DictionaryUtils.getMessage('home_fines')
                }
                else {
                    TrafficFinesCountTitle = DictionaryUtils.getMessage('home_fine')
                }

                
                if (GeneralFineCounter > 0 || TraficFineCounter > 0) {
                    $('.HomeCountMainBoxLoad').html(DictionaryUtils.getMessage('home_popup_header'))
                    $('.HomeGeneralFinesCount').html(GeneralFineCounter)
                    $('.HomeGeneralFinesCountTitle').html(GeneralFinesCountTitle)
                    $('.HomeTrafficFinesCount').html(TraficFineCounter)
                    $('.HomeTrafficFinesCountTitle').html(TrafficFinesCountTitle)
                    if (GeneralFineCounter == 0 || TraficFineCounter == 0) {
                        $('.HomeFilesCountAnd').remove()
                    }
                }
                if (GeneralFineCounter == 0 && TraficFineCounter == 0) {
                    $('.HomeCountMainBoxLoad').html(DictionaryUtils.getMessage('no_unpaid_violations'))
                }
                if (GeneralFineCounter == 0) {
                    $('.HomeGeneralFinesCountBox').remove()
                }
                if (TraficFineCounter == 0) {
                    $('.HomeTrafficFinesCountBox').remove()
                }



                //rowData.push(obj)
                DrowTable(rowData, Filter)
            })

            /////////// End Drow Data Table ///////////
        });
    });
    
    

}
function DrowTable(rowData, Filter) {
    //DeleteAllOrderDetail(Filter.violatorId);
    var temp = $('.IsTrafficSelect').val();
    var Amount = 0
    var PaymentArr = []
    $('.AjaxTable').html('<table id="DashboardViolationsTable" class="table table-striped TableReceipt TableReceiptInternal"></table >')
    var ShowCheckbox = true;
    

    var table = $('#DashboardViolationsTable').DataTable({
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"p>',
        "autoWidth": false,
        responsive: true,
        paging: true,
        pageLength: 8,
        ordering: false,
        serverSide: false,
        destroy: true,
        lengthChange: false,
        data: rowData,

        //ajax: {
        //    url: NetworkUtils.baseUrl + 'api/PDSFines/GetViolationsByViolator',
        //    type: 'POST',
        //    contentType: "application/json",
        //    data: function (d) {
        //        Filter.tableHeaders = d
        //        return JSON.stringify(Filter);
        //    }
        //},
        columns: [
            { title: '' },
            { title: '', visible: ShowCheckbox },
            { title: '' },
            { title: DictionaryUtils.getMessage("structure"), visible: ShowCheckbox ? Filter.Structre == 0 : true },
            { title: DictionaryUtils.getMessage("type"), visible: ShowCheckbox ? Filter.ViolatorType == 0 : true },
            { title: DictionaryUtils.getMessage("fine_type"), visible: ShowCheckbox ? Filter.FineGroup == 0 : true },
            { title: DictionaryUtils.getMessage("date"), visible: ShowCheckbox ? Filter.FineDate == 0 : true },
            { title: DictionaryUtils.getMessage("fine_number"), visible: ShowCheckbox ? Filter.FineNumber == 0 : true },
            //{ title: DictionaryUtils.getMessage("order_reference"), visible: ShowCheckbox ? Filter.BusRef == 0 : true },
            { title: DictionaryUtils.getMessage("violation_amount") },
            { title: DictionaryUtils.getMessage("transaction_status"), visible: ShowCheckbox ? Filter.Status == 0 : true },
            { title: DictionaryUtils.getMessage("details") },

        ],
        language: {
            search: '<span>' + DictionaryUtils.getMessage("filter") + ':</span> INPUT',
            searchPlaceholder: DictionaryUtils.getMessage("filter_placeholder"),
            lengthMenu: '<span>' + DictionaryUtils.getMessage("show") + ':</span> MENU',
            info: DictionaryUtils.getMessage("showing") + ' _START_ ' + DictionaryUtils.getMessage("to") + ' _END_ ' + DictionaryUtils.getMessage("of") + ' _TOTAL_ ' + DictionaryUtils.getMessage("pagingviolations"),
            paginate: {
                'first': DictionaryUtils.getMessage("first"), 'last': DictionaryUtils.getMessage("Last"),
                'next': DictionaryUtils.getMessage("next"), 'previous': DictionaryUtils.getMessage("previous")
            },
            zeroRecords: DictionaryUtils.getMessage("no_data_available_table"),
        },
        columnDefs: [
            {
                orderable: false,
                className: 'select-checkbox',
                targets: 1,
                createdCell: function (td, cellData, rowData, row, col) {
                    //debugger;   
                    if (rowData[2] == 55 || rowData[9] == 2 || isPaymentDisabled) {
                        $(td).click(function (event) {
                            event.stopPropagation();
                        });
                        //$(td).addClass('text-center')
                     

                        $(td).html('<input type="checkbox" disabled="disabled" style="width: 19px;height: 19px; margin-top:15px; margin-right:0px;" />');
                        $(td).removeClass('select-checkbox');
                    } else {
                        $(td).addClass('select-checkbox');
                    }
                }
            },
            {
                targets: [0],
                visible: false
            },
            {
                targets: [2],
                visible: false
            },
            //{
            //    targets: [3],
            //    className: "txtAlign HideOnMobile"
            //},
            //{
            //    targets: [5],
            //    className: "txtAlign"
            //},
            //{
            //    targets: [5,6,8],
            //    className: "HideOnMobile"
            //}



            
            {
                targets: [3,6,7,8],
                className: "HideOnMobile"
            }

        ],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        //order: [
        //    [1, 'asc']
        //],

        fnInitComplete: function () {

        },
        "drawCallback": function () {
            //$('.ViolationsListPopupLoading').remove()
            //$('.CustomModal  .ViolationsList').css('display', 'block')
            //$('.DashboardPageLoading').css('display', 'none');
            
            //if ($(this).find('tbody tr').length == 1) {
            //    $('#DashboardViolationsTable_paginate').css('display', 'none');
            //}

            if ($(this).find('tbody tr td').length <= 1) {
                $('#DashboardViolationsTable_wrapper').css('display', 'none');
                $('#DashboardViolationsTable_wrapper').after('<div class="alert alert-success NoData" role="alert">' + DictionaryUtils.getMessage("no_data") + '</div >')
                $('.TotalAmount ').html(0)
               

            }
            else {
                
            }
        }
    });

    var text_align = DictionaryUtils.getLanguage() == "ar" ? 'right' : 'left';
    $('#DashboardViolationsTable').css('text-align', text_align);

    table.on("click", "th.select-checkbox", function (e, dt, type, indexes) {
        if ($("th.select-checkbox").hasClass("selected")) {
            table.rows().deselect();
            $("th.select-checkbox").removeClass("selected");
        } else {
            table.rows().deselect();
            for (var i = 0; i < DataTableLimit; i++) {
                table.rows(i).select();
            }
            $("th.select-checkbox").addClass("selected");
        }
    }).on("select deselect", function (e, dt, type, ix) {
        ("Some selection or deselection going on")
        if (table.rows({
            selected: true
        }).count() !== table.rows().count()) {
            $("th.select-checkbox").removeClass("selected");
        } else {
            $("th.select-checkbox").addClass("selected");
        }
    }).on("click", "td", function () {
        var Counter = 0;
        if (Counter == 0) {
            if (!($(this).hasClass('select-checkbox'))) {
                $(this).parent().find('.OpenPopupBoxDetails').get(0).click();
            }
        }
        Counter++
    });

    table.on('select', function (e, dt, type, indexes) {
        var rowData = table.rows(indexes).data().toArray();
        if (!(indexes >= 0 && rowData.length > 0)) {
            PaymentArr = []
            Amount = 0
        }
        var selected = dt.rows({ selected: true });
        //console.log('Selected Count:', selected.count())
        //console.log('rowData:', rowData.length)
        if (selected.count() == DataTableLimit) {
            $("th.select-checkbox").addClass("selected");
        }
        else {
            $("th.select-checkbox").removeClass("selected");
        }
        if (selected.count() <= DataTableLimit) {
            for (var i = 0; i < rowData.length; i++) {
                var Paymentobj = {
                    "FineNumber": rowData[i][7],
                    "FineAmount": rowData[i][8]
                }
                if (rowData[i][2] != 55 && !isPaymentDisabled) {
                    PaymentArr.push(Paymentobj)
                    Amount += rowData[i][8];
                    ///////////// Here /////////////
                }
                else {
                    table.rows(i).deselect();
                }
            }
        }
        //console.log('Amount:', Amount)
        //console.log("PaymentArr:",PaymentArr)
        $('.SpanSelectedCount').html(PaymentArr.length)
        //console.log(PaymentArr.length)
        $('.SelectedAmountSpan').html(Amount)
        if (parseInt($('.SelectedAmountSpan').html()) == 0) {
            $('.PayListBtn').attr('disabled', 'disabled')
            $('.SowIfNotHaveFines').css('display', 'inline-block')
            $('.SowIfHaveFines').css('display', 'none')
        }
        else {
            $('.PayListBtn').removeAttr('disabled')
            $('.SowIfNotHaveFines').css('display', 'none')
            $('.SowIfHaveFines').css('display', 'inline-block')
        }
        //Limit selected rows
        if (selected.count() > DataTableLimit) {
            dt.rows(indexes).deselect();
        }
        //End Limit selected rows
    })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            var selected = dt.rows({ selected: true });
            if (selected.count() == DataTableLimit) {
                $("th.select-checkbox").addClass("selected");
            }
            else {
                $("th.select-checkbox").removeClass("selected");
            }


            for (var i = 0; i < rowData.length; i++) {
                var index = PaymentArr.findIndex(function (o) {
                    return o.FineNumber === rowData[i][7];
                })
                if (index !== -1 && rowData[i][2] != 55 && !isPaymentDisabled) {
                    PaymentArr.splice(index, 1)
                    Amount -= rowData[i][8]
                    ///////////// Here /////////////
                }
            }
            $('.SpanSelectedCount').html(table.rows({ selected: true }).count())
            $('.SelectedAmountSpan').html(Amount)
            if (parseInt($('.SelectedAmountSpan').html()) == 0) {
                $('.PayListBtn').attr('disabled', 'disabled')
                $('.SowIfNotHaveFines').css('display', 'inline-block')
                $('.SowIfHaveFines').css('display', 'none')
            }
            else {
                $('.PayListBtn').removeAttr('disabled')
                $('.SowIfNotHaveFines').css('display', 'none')
                $('.SowIfHaveFines').css('display', 'inline-block')
            }
        })
        .on("click", ".OpenPopupBoxDetails", function (e) {
            e.stopPropagation()
            var FineNumber = $(this).attr('FineNumber')
            var ViolatorID = $(this).attr("violatorid")
            var TableDetailsCounter = $('.TableDetailsCounter').html();
            console.log('asd',parseInt(TableDetailsCounter))
            if (TableDetailsCounter == 0) {
                GetFineDetails(FineNumber, ViolatorID, payerIDPayment, payerTypePayment, loginTypePayment, 'ViolationDetails', false, true, true)
            }
            TableDetailsCounter++
            $('.TableDetailsCounter').html(TableDetailsCounter);
        })
   


    $('#DashboardViolationsTable thead').addClass('thead-light');
    $('.PayListBtn').unbind().click(function () {
            $(this).attr('disabled', 'disabled')
            function showpanel() {
                $('.PayListBtn').removeAttr('disabled')
            }
            setTimeout(showpanel, 1000)

            $('.ViolationsList').fadeOut(function () {
                $('.RedirectToPaymentsDiv').remove()
                $('.ViolationsList').after('<div class="text-center DashboardPageLoadingTXT RedirectToPaymentsDiv" >' + DictionaryUtils.getMessage('redirect_to_payment_site') + '</div>')
                
                var orderInfo = {
                    PayerID: payerIDPayment,
                    ViolatorID: payerIDPayment,
                    OrderType: isTrafficPayment,
                    PayerType: payerTypePayment,
                    LoginType: loginTypePayment,
                    FiensInfoDTOs: PaymentArr
                };
                CreateOrder(orderInfo);
            })
    })
}
function GetFirmsList(violatorId) {
    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            NetworkUtils.PDSFines.GetFirmsList(violatorId,token,true)
                .done(function (data) {
                    if (data.length > 0) {
                        $('.HomeStatisticsBoxFirmsViolation').css('display', 'block')
                        
                        for (var i = 0; i < data.length; i++) {
                            $('.DDLFirms').append('<option value="' + data[i].firmID + '">' + data[i].name + '</option>')
                        }
                    }
                    else {
                        $('.TargetType3 select,.TargetType3 .input-group-prepend').css('display', 'none')
                        $('.TargetType3 select').after('<div class="alert alert-info" role="alert">' + DictionaryUtils.getMessage("you_have_no_firms") + '</div >')
                        $('.firmOption').remove()
                        $('.HomeStatisticsBoxMyViolation').removeClass('col-6').addClass('col-12 col-lg-6')

                    }
                }).always(function (data) {
                })
        })
    });
}

/*-------------------------- New Payment Function ------------------------------*/
function CreateOrder(orderInfo) {
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
        $('.DashboardPageLoadingTXT').fadeOut(function () {
            $('.ViolationsList').fadeIn()
        });
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
    });
}


function GetPersonalInfo(IDNumber, BirthDate, token, otp = 0) {
    //todo
    NetworkUtils.PDSFines.extGetPersonalInfoByIdAndDob(IDNumber, BirthDate, token,otp)
        .done(function (data) {
            if (otp == 0 && data.personalInfo == undefined) {
                $('.se-pre-con').fadeOut(100, function () {
                    OpenPopup('animate__backInDown', 'animate__backInDown', 500)
                    $('.CustomModalBodyCard').html(`
        <div class="text-center">
            <h4>`+ DictionaryUtils.getMessage("enter_otp") +`</h4>
            <div class="OTPInputs d-flex justify-content-center my-3 LtrDir">
                <input class="NumberOnly InputIndex-1" InputIndex="1" type="tel" autofocus maxlength="1" />
                <input class="NumberOnly InputIndex-2" InputIndex="2" type="tel" maxlength="1"/>
                <input class="NumberOnly InputIndex-3" InputIndex="3" type="tel" maxlength="1"/>
                <input class="NumberOnly InputIndex-4 LastInput" InputIndex="4" type="tel" maxlength="1"/>
            </div>

            <div class="OTPBtns">
                <button class="btn btn-primary py-1 px-3 otpSend" type="button" disabled>`+ DictionaryUtils.getMessage("confirm") +`</button>
                <button class="btn btn-danger py-1 px-3 otpCancel" type="button">`+ DictionaryUtils.getMessage("cancel") +`</button>
                <button class="btn btn-dark py-1 px-3 otpResend" type="button" disabled>`+ DictionaryUtils.getMessage("resend") +`</button>
            </div>
            <div class="CustomAlert mt-3 " role="alert">`+ DictionaryUtils.getMessage("resend_timer") +`<span class="countdown"></span></div>
        </div>
    `)
                    $('.InputIndex-1').focus();
                    $('.OTPInputs input').keyup(function () {
                       
                        this.value = this.value.replace(/[^0-9]/g, '');
                        if (!(event.keyCode == 8                                // backspace
                            || event.keyCode == 13                              //Enter
                            || event.keyCode == 46                              // delete
                            || (event.keyCode >= 35 && event.keyCode <= 40)     // arrow keys/home/end
                            || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
                            || (event.keyCode >= 96 && event.keyCode <= 105))   // number on keypad
                        ) {
                            event.preventDefault();     // Prevent character input
                        }
                        if (event.keyCode == 8 || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
                            || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode==229) {
                            var InputIndex = parseInt($(this).attr('InputIndex'))
                            if (event.keyCode == 8)
                                InputIndex--
                            else
                                InputIndex++

                            $('.InputIndex-' + InputIndex + '').focus();
                            $('.InputIndex-' + InputIndex + '').select();
                        }

                        var isValid = true;
                        $(".OTPInputs .NumberOnly").each(function () {
                            if ($.trim($(this).val()) == '') {
                                isValid = false;
                            }
                        });
                        if (isValid == false)
                            $('.otpSend').attr('disabled', 'disabled');
                        else
                            $('.otpSend').removeAttr("disabled");

                        if (event.keyCode == 13 && isValid) {
                            $('.otpSend').click()
                        }
                    });
                   

                        //if ($(".OTPInputs .NumberOnly").val() != '') {
                        //    $('.otpSend').removeAttr("disabled");
                        //}
                         
                         //else {
                         //    $('.otpSend').click()
                         //}
                   

 

                    //$('.CustomModalBodyCard').html('<div class="HomePopupValidationItem mb-2 text-center">' + DictionaryUtils.chooseWord("الرجاء ادخال الرمز", "Please Enter OTP") + '</div>')
                    //$('.HomePopupValidationItem').append('<div class="HomeOtpBody mt-2 text-center"><input type="tel" class="form-control NumberOnly TXTOtp" pattern="\d*" maxlength="10" data-npvmdict-attr="[{ "attribute": "placeholder", "keyword": "pleaseenterotp" }]"/></div>')
                    //$('.HomePopupValidationItem').append('<div class="HomeOtpCounter mt-2 text-center"><div class="countdown"></div></div>')
                    //$('.HomePopupValidationItem').append('<button type="button" id="btnSendOtp" class="btn otpSend mt-3" data-npvmdict="pay">Send</button>')
                    //$('.HomePopupValidationItem').append('<button type="button" id="otpCancel" class="btn btn mt-3 otpCancel" data-npvmdict="cancel">Cancel</button>')
                    //$('.HomePopupValidationItem').append('<button type="button" id="otpResend" class="btn btn mt-3 otpResend" data-npvmdict="resend">Resend</button>')
                    //$('.otpResend').hide();
                    var timer2 = "1:00";
                    if (data.status != undefined && data.expirationTime != undefined  && data.status == 2 ) {
                        var dt = new Date();
                        var endDt = new Date(data.expirationTime);
                        var start = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                        var end = endDt.getHours() + ":" + endDt.getMinutes() + ":" + endDt.getSeconds();

                        s = start.split(':');
                        e = end.split(':');

                        sec = e[2] - s[2];
                        min_carry = 0;
                        if (sec < 0) {
                            sec += 60;
                            min_carry += 1;
                        }
                        min = e[1] - s[1] - min_carry;
                        diff = min + ":" + sec;

                        timer2 = diff;
                    }
                    
                   
                    var interval = setInterval(function () {

                        var minutes = 0;
                        var seconds = 0;
                        var timer = timer2.split(':');
                        //by parsing integer, I avoid all extra string processing
                        minutes = parseInt(timer[0], 10);
                        seconds = parseInt(timer[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        if (minutes < 0) clearInterval(interval);
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        //minutes = (minutes < 10) ?  minutes : minutes;
                        $('.countdown').html(minutes + ':' + seconds);
                        timer2 = minutes + ':' + seconds;
                        if (minutes == 0 && seconds == 0) {
                            $('.CustomAlert').html(DictionaryUtils.getMessage("resendotp"));
                            $('.otpResend').removeAttr('disabled');
                            clearInterval(interval);
                        }
                    }, 1000);

                    $('.otpSend').on('click', function (event) {
                        //cloaseModal();
                        //DrowPopupBody(IDNumber, BirthDate, data, $('.TXTOtp').val())
                        grecaptcha.ready(function () {
                            grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
                                var optTxt = $('.InputIndex-1').val() + $('.InputIndex-2').val() + $('.InputIndex-3').val() + $('.InputIndex-4').val()
                                GetPersonalInfo(IDNumber, BirthDate, token, optTxt);
                            });
                        });
                    });
                    $('.CustomModalClose').on('click', function (event) {
                        clearInterval(interval);
                        cloaseModal();
                    });
                    $('.otpCancel').on('click', function (event) {
                        clearInterval(interval);
                        cloaseModal();
                    });
                    $('.otpResend').on('click', function (event) {
                        clearInterval(interval);
                                GetPersonalInfo(IDNumber, BirthDate, 0);
                            });
  
                })
            }
            else {
               
                cloaseModal();
                setTimeout(function () {
                    $('.se-pre-con').fadeOut(100, function () {
                        DrowPopupBody(IDNumber, BirthDate, data.personalInfo)
                    })
                }, 500);
              
            }
            


            //$('.se-pre-con').fadeOut(100, function () {
            //DrowPopupBody(IDNumber, BirthDate, data)
            //})


        }).always(function (data) {

        })
        .fail(function (xhr, textStatus, errorThrown) {
            $('.se-pre-con').fadeOut(function () {
                OpenPopup('animate__backInDown', 'animate__backInDown', 500)
                if (xhr.responseJSON.errorMessageDTO != undefined) {
                    $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.chooseWord(xhr.responseJSON.errorMessageDTO.messageAr, xhr.responseJSON.errorMessageDTO.message) + '</div>')
                    return;
                }
                if (xhr.responseJSON.messageAr) {
                    $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.chooseWord(xhr.responseJSON.messageAr, xhr.responseJSON.message) + '</div>')
                    return;
                }
                else if (xhr.responseJSON == undefined) {
                    $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('errorgettingdata') + '</div>')
                    return;
                }
                else {
                    $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('errorgettingdata') + '</div>')
                    return;
                }
            })

        })
}
var onloadCallbackIndividual = function () {
    var IDNumber = $('.TXTIDNumber').val()
    var BirthDate = $('.TXTBirthDate').val()
    grecaptcha.ready(function () {
        grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
            GetPersonalInfo(IDNumber, BirthDate, token);
           
        });




    });
};

var onloadCallbackFirms = function () {
    var FirmID = $('.TXTFirms-FirmID').val()
    var LaborId = $('.TXTFirms-LaborId').val()
        grecaptcha.ready(function () {
            grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
                //todo
                NetworkUtils.PDSFines.extGetFirmInfoByIdAndSponsoreeId(FirmID, LaborId, token)
                    .done(function (data) {
                        $('.se-pre-con').fadeOut(100, function () {
                            DrowPopupBody(FirmID, '', data.firmlInfo, LaborId)
                        })


                    }).always(function (data) {

                    })
                    .fail(function (xhr, textStatus, errorThrown) {
                        $('.se-pre-con').fadeOut(function () {
                            OpenPopup('animate__backInDown', 'animate__backInDown', 500)

                            if (xhr.responseJSON.messageAr) {
                                $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.chooseWord(xhr.responseJSON.messageAr, xhr.responseJSON.message) + '</div>')
                            }
                            else {
                                $('.CustomModalBodyCard').html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage('errorgettingdata') + '</div>')
                            }

                        })

                    })
            });
        });


};

function LoadScript(Target) {
    if (Target == 'individual') {
        $('body').append('<script src="https://recaptcha.net/recaptcha/api.js?onload=onloadCallbackIndividual&render=' + $('#hdnReCaptchaKey').val() + '"></script>')
    }
    else if (Target == 'Firms') {
        $('body').append('<script src="https://recaptcha.net/recaptcha/api.js?onload=onloadCallbackFirms&render=' + $('#hdnReCaptchaKey').val() + '"></script>')
    }

    DictionaryUtils.LoadExtraScripts()
}