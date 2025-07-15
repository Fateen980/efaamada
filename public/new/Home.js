var activeorder,
    DataTableLimit = 100,
    isPaymentDisabled = $("#hfDisablePayment").val(),
    loginTypePayment = "",
    payerTypePayment = "",
    payerIDPayment = "",
    isTrafficPayment = 0;
function DrowPopupBody(e, t, a, i = 0) {
    function s(e) {
        LoadSVG("LoadSVG", "Add"),
            LoadSVG("LoadSmallSVG", "Add", "LoadSmallSVGDiv", "20px"),
            $(".SpanSelectedCount,.SelectedAmountSpan").html("0"),
            $(".PayListBtn").attr("disabled", "disabled"),
            $(".NoFirmFound").remove(),
            GetTableData(e, t, i);
    }
    OpenPopup("animate__backInDown", "animate__backInDown"),
        $(".CustomModalBodyCard").html('<div class="ViolationsList"></div><div class="ViolationDetails" style="display: none;"></div>'),
        $(".ViolationsList").append(
            '<div class="mb-2 mt-1 pb-0 HomePopupDDLFilter" style="display:none"><div class="form-row"><div class="col-12 col-lg-10"><div class="row PopupFiltersDDL"></div></div><div class="form-group col-12 col-lg-2" style="display:none"><div class= "BtnSmallDiv PopupFiltersBtn" style="display:none"></div></div></div></div>'
        ),
        0 == i &&
            ($(".PopupFiltersDDL").append(
                '<div class="input-group mb-3 col-md-4" style="display:none"> <div class="input-group-prepend"> <span class="input-group-text" ><i class="fad fa-question"></i></span> </div> <select class="form-control selectpicker SelectType"> <option value="1" targetType="1">' +
                    DictionaryUtils.getMessage("my_violations") +
                    '</option><option class="firmOption" value="3" targetType="3">' +
                    DictionaryUtils.getMessage("my_firms") +
                    "</option> </select></div>"
            ),
            $(".PopupFiltersDDL").append(
                '<div class="input-group mb-3 col-md-5 TargetType TargetType3"> <div class="input-group-prepend"> <span class="input-group-text" ><i class="fad fa-landmark"></i></span> </div> <select class="form-control selectpicker DDLFirms">  </select> </div>'
            ),
            GetFirmsList(e)),
        $(".PopupFiltersDDL").append(
            '<div class="input-group mb-3 col-md-4 " style="display:none"> <div class="input-group-prepend"> <span class="input-group-text" id="basic-addon1"><i class="fad fa-landmark"></i></span> </div> <select class="form-control selectpicker IsTrafficSelect FilterB"> <option value="1" >' +
                DictionaryUtils.getMessage("general_violations") +
                '</option> <option value="2">' +
                DictionaryUtils.getMessage("traffic_violations") +
                "</option> </select> </div>"
        ),
        $(".PopupFiltersBtn").append('<span  class="form-control btn btn-primary BtnSmall SearchBtn"><i class="fad fa-search"></i></span>'),
        $(".PopupFiltersBtn").append('<span class="form-control btn btn-danger BtnSmall ResetBtn"><i class="fad fa-sync"></i></span>'),
        $(".SelectType").change(function () {
            var e = $(".SelectType option:selected").attr("targetType");
            0 == e || 1 == e
                ? ($(".DDLLabours").val($(".DDLLabours option:first").val()), $(".DDLFirms").val($(".DDLFirms option:first").val()))
                : 2 == e
                ? $(".DDLFirms").val($(".DDLFirms option:first").val())
                : 3 == e && $(".DDLLabours").val($(".DDLLabours option:first").val()),
                $(".TargetType").css("display", "none"),
                $(".TargetType" + e).css("display", "inline-flex");
        }),
        $(".DDLFirms,.SelectType").change(function () {
            $(".IsTrafficSelect").val($(".IsTrafficSelect option:first").val());
        }),
        $(".PopupFiltersDDL select").change(function () {
            $(".SearchBtn").click();
        }),
        $(".SearchBtn").click(function () {
            var t = $(".SelectType").val();
            t || (t = 3);
            var a = $(".DDLFirms").val();
            (null != a && 0 != a && 1 != t) || (a = e);
            var i = 0;
            2 == $(".IsTrafficSelect").val() && (i = 1);
            var o = { violatorId: e, ViolatorType: t, Structre: 0, Id: a, FineGroup: 0, Status: 1, FineDate: 0, FineNumber: 0, BusRef: 0, IsTraffic: i },
                n = $(".SelectType option:selected").attr("targetType");
            0 == a && 3 == n ? $(".form-row").append('<div class="col-12 NoFirmFound mb-2"><div class="alert alert-warning" role="alert">لا يوجد لديك منشآت</div></div>') : s(o);
        }),
        $(".ResetBtn").click(function () {
            $(".TargetType").css("display", "none"), $(".SelectType").val($(".SelectType option:first").val()), $(".DDLFirms").val($(".DDLFirms option:first").val()), $(".IsTrafficSelect").val($(".IsTrafficSelect option:first").val());
            var t = $(".SelectType").val(),
                a = $(".DDLFirms").val();
            (null != a && 0 != a && 1 != t) || (a = e);
            var i = 0;
            2 == $(".IsTrafficSelect").val() && (i = 1), s({ violatorId: e, ViolatorType: t, Structre: 0, Id: a, FineGroup: 0, Status: 1, FineDate: 0, FineNumber: 0, BusRef: 0, IsTraffic: i });
        }),
        $(".ViolationsList").append('<div class="PopupResults mt-3"><div class="row PopupResultsRow"></div></div>'),
        $(".PopupResultsRow").append('<div class="col-12 col-lg-9 DashboardPaymentListDetialsTableAndPrint"></div>'),
        $(".DashboardPaymentListDetialsTableAndPrint").append('<div class="mt-0  p-2 DivToPrint"><div class="table-responsive AjaxTable LoadSVG"></div></div>'),
        ShowDisplayName(a, i),
        LoadSVG("LoadSVG", "Add"),
        LoadSVG("LoadSmallSVG", "Add", "LoadSmallSVGDiv", "20px"),
        0 == i
            ? GetTableData({ violatorId: e, ViolatorType: 1, Structre: 0, Id: e, FineGroup: 0, Status: 1, FineDate: 0, FineNumber: 0, BusRef: 0 }, t, "")
            : GetTableData({ violatorId: e, ViolatorType: 1, Structre: 0, Id: e, FineGroup: 0, Status: 1, FineDate: 0, FineNumber: 0, BusRef: 0 }, "", i),
        $(".PopupResultsRow").append('<div class="col-12 col-lg-3 SmartPhoneMTop"><div class="mb-3 card DashboardPaymentListDetials p-0"></div></div>'),
        $(".DashboardPaymentListDetials").append('<i class="fad fa-receipt"></i>'),
        $(".DashboardPaymentListDetials").append(
            '<div class="TableHeader p-3 mb-2">' +
                DictionaryUtils.getMessage("countlbl") +
                '<span class="AllCount TableRowCount BlockSpan LoadSmallSVG"></span>' +
                DictionaryUtils.getMessage("unpaid_violation") +
                "<br /> " +
                DictionaryUtils.getMessage("accumulation") +
                '<span class="AllCount TotalAmount BlockSpan LoadSmallSVG"></span>' +
                DictionaryUtils.getMessage("saudi_riyal") +
                "</div>"
        ),
        $(".DashboardPaymentListDetials").append('<div class="TableSelectDetails"></div>'),
        $(".TableSelectDetails").append(
            '<div class="SowIfNotHaveFines">' +
                DictionaryUtils.getMessage("no_selected_fines") +
                '</div><div class="TableSelectDetailsCol1 SowIfHaveFines mb-2">' +
                DictionaryUtils.getMessage("number_of_violations") +
                '<span class="AllCount BlockSpan SpanSelectedCount">0</span>' +
                DictionaryUtils.getMessage("from") +
                ' <span class="AllCount TableRowCount BlockSpan LoadSmallSVG"></span></div>'
        ),
        $(".TableSelectDetails").append(
            '<div class="TableSelectDetailsCol2"><div class="SelectedAmount"><span class="SowIfHaveFines">' +
                DictionaryUtils.getMessage("violation_amount") +
                ' <span class="SelectedAmountSpan BlockSpan">0</span> ' +
                DictionaryUtils.getMessage("saudi_riyal") +
                '</span><span class="SadadMsg"> سدد الان واحصل على تخفيض المخالفات  بنسبة (50%)</span><button type="button"  class="btn btn-success PayListBtn btn-block mt-3" ><i class="fad fa-shopping-cart"></i> <span>' +
                DictionaryUtils.getMessage("pay_now") +
                "</span></button></div></div>"
        );
}
function CheckFinesAvailability(e, t, a) {
    NetworkUtils.PDSFines.HomeStatistics(e, t, a, i)
        .done(function (e) {
            if (e.length > 0) {
                for (var t = 0, a = 0; a < e.length; a++) t += e[a].unpaidCount;
                0 == t
                    ? $(".RemoveAfterAvailabilityCheck").fadeOut(function () {
                          $(".HomeStatisticsBox").after('<div class="alert alert-warning my-4 text-center">' + DictionaryUtils.getMessage("you_have_no_fines") + "</div>");
                      })
                    : $(".RemoveAfterAvailabilityCheck").fadeOut(function () {
                          $(".HomeStatisticsBox,.PopupResults").fadeIn();
                      });
            }
        })
        .always(function (e) {})
        .fail(function (e, t, a) {});
}
function HomeStatistics(e, t, a) {
    NetworkUtils.PDSFines.HomeStatistics(e, t, a, i)
        .done(function (e) {
            if (e.length > 0) {
                var a = 0,
                    i = 0,
                    s = 0,
                    o = '<span class="NoFinesSpan">' + DictionaryUtils.getMessage("no_fine") + "</span>",
                    n = 0;
                if ("" == t) {
                    for (var l = 0; l < e.length; l++)
                        1 == e[l].type
                            ? ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(o), $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral").css("display", "none"))
                                  : ($(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    $(".HomeStatisticsDetailsBoxGeneralMy").click(),
                                    (n = 1)),
                              (a += e[l].unpaidCount))
                            : 4 == e[l].type
                            ? ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(o), $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic").css("display", "none"))
                                  : ($(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    1 != n && ($(".HomeStatisticsDetailsBoxTrafficMy").click(), (n = 1))),
                              (a += e[l].unpaidCount))
                            : 3 == e[l].type
                            ? ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(o), $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral").css("display", "none"))
                                  : ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    1 != n && ($(".HomeStatisticsDetailsBoxGeneralFirms").click(), (n = 1))),
                              (i += e[l].unpaidCount))
                            : 5 == e[l].type &&
                              ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(o), $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic").css("display", "none"))
                                  : ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    1 != n && ($(".HomeStatisticsDetailsBoxTrafficFirms").click(), (n = 1))),
                              (i += e[l].unpaidCount));
                    0 == a ? $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount").html(o) : $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount").html(a / 2),
                        0 == i ? $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").html(o) : $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").html(i);
                } else {
                    for (l = 0; l < e.length; l++)
                        1 == e[l].type
                            ? ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(o), $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral").css("display", "none"))
                                  : ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral  .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    1 != n && ($(".HomeStatisticsDetailsBoxGeneralFirms").click(), (n = 1))),
                              (s += e[l].unpaidCount))
                            : 5 == e[l].type &&
                              ("0" == e[l].unpaidCount
                                  ? ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(o), $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic").css("display", "none"))
                                  : ($(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic .Count").html(e[l].unpaidCount),
                                    $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic .HomePopupSRPriceNumber").html(e[l].unpaidAmount / 2),
                                    1 != n && ($(".HomeStatisticsDetailsBoxTrafficFirms").click(), (n = 1))),
                              (s += e[l].unpaidCount));
                    0 == s ? $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").html(o) : $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").html(s);
                }
            }
        })
        .always(function (e) {})
        .fail(function (e, t, a) {});
}
function ShowDisplayName(e, t) {
    0 == t ? CheckFinesAvailability(e.personalInfo.id, "", $(".TXTBirthDate").val()) : CheckFinesAvailability(e.personalInfo.firmID, $(".TXTFirms-LaborId").val(), ""),
        $(".ViolationsList").prepend(
            '<div class="QueryName"><h5 class="QueryNameHeader"></h5></div><div class="LoadingBeforeSend RemoveAfterAvailabilityCheck"><span class="LoadingBeforeSendSpan "><img src="../img/Progress2.svg" class="InlineProgress" /></span></div><div class="HomeStatisticsBox"></div>'
        ),
        0 == t
            ? ($(".QueryName .QueryNameHeader").append(DictionaryUtils.getMessage("hello") + " "),
              $(".QueryName .QueryNameHeader").append(DictionaryUtils.chooseWord(e.personalInfo.firstName, e.personalInfo.firstNameT) + " "),
              $(".QueryName .QueryNameHeader").append(DictionaryUtils.chooseWord(e.personalInfo.fatherName, e.personalInfo.fatherNameT) + " "),
              $(".QueryName .QueryNameHeader").append(DictionaryUtils.chooseWord(e.personalInfo.familyName, e.personalInfo.familyNameT)),
              $(".QueryName .QueryNameHeader").append('<div class="HomeCountMainBoxLoad"></div>'),
              $(".HomeStatisticsBox").append('<div class="row mb-2 text-center"><div class="col-6 HomeStatisticsBoxMyViolation"></div><div class="col-6 HomeStatisticsBoxFirmsViolation" style="display:none"></div></div>'),
              $(".HomeStatisticsBoxMyViolation").append('<div class="card p-0"></div>'),
              $(".HomeStatisticsBoxMyViolation .card").append(
                  '<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderMy"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>'
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBox").append(
                  '<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralMy HomeStatisticsDetailsBoxItemActive"><i class="fas fa-sort-down" style="display:block"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem  HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficMy"><i class="fas fa-sort-down"></i></div></div>'
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeader").append(
                  '<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-user-tie PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>'
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderTXT").append(DictionaryUtils.getMessage("my_violations")),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderCount").append(""),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBoxGeneral").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>'
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubTXTGeneral").append(DictionaryUtils.getMessage("general")),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountGeneral").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceGeneral").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsDetailsBoxTraffic").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>'
              ),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubTXTTraffic").append(DictionaryUtils.getMessage("traffic")),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubCountTraffic").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxMyViolation .HomeStatisticsBoxHeaderSubPriceTraffic").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsBoxFirmsViolation").append('<div class="card p-0"></div>'),
              $(".HomeStatisticsBoxFirmsViolation .card").append(
                  '<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderFirms"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBox").append(
                  '<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralFirms"><i class="fas fa-sort-down"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficFirms"><i class="fas fa-sort-down"></i></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeader").append(
                  '<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-store PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderTXT").append(DictionaryUtils.getMessage("my_firms")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").append(""),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxGeneral").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTGeneral").append(DictionaryUtils.getMessage("general")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxTraffic").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTTraffic").append(DictionaryUtils.getMessage("traffic")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsDetailsBoxItem").click(function () {
                  $(".HomeStatisticsDetailsBoxItemActive").removeClass("HomeStatisticsDetailsBoxItemActive"),
                      $(this).addClass("HomeStatisticsDetailsBoxItemActive"),
                      $(".HomeStatisticsDetailsBoxItem .fa-sort-down").css("display", "none"),
                      $(this).find(".fa-sort-down").css("display", "block");
              }),
              $(".HomeStatisticsDetailsBoxGeneralMy").click(function () {
                  $(".SelectType").val("1"),
                      $(".IsTrafficSelect").val("1"),
                      $(".TargetType").css("display", "none"),
                      $(".HomePopupDDLFilter").css("display", "none"),
                      (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 3),
                      (isTrafficPayment = 1),
                      $(".SearchBtn").click();
              }),
              $(".HomeStatisticsDetailsBoxTrafficMy").click(function () {
                  $(".SelectType").val("1"),
                      $(".IsTrafficSelect").val("2"),
                      $(".TargetType").css("display", "none"),
                      $(".HomePopupDDLFilter").css("display", "none"),
                      (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 3),
                      (isTrafficPayment = 2),
                      $(".SearchBtn").click();
              }),
              $(".HomeStatisticsDetailsBoxGeneralFirms").click(function () {
                  $(".SelectType").val("3"),
                      $(".IsTrafficSelect").val("1"),
                      $(".TargetType3").css("display", "inline-flex"),
                      $(".HomePopupDDLFilter").css("display", "block"),
                      (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 2),
                      (isTrafficPayment = 1),
                      $(".SearchBtn").click();
              }),
              $(".HomeStatisticsDetailsBoxTrafficFirms").click(function () {
                  $(".SelectType").val("3"),
                      $(".IsTrafficSelect").val("2"),
                      $(".TargetType3").css("display", "inline-flex"),
                      $(".HomePopupDDLFilter").css("display", "block"),
                      (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 2),
                      (isTrafficPayment = 2),
                      $(".SearchBtn").click();
              }),
              HomeStatistics(e.personalInfo.id, "", $(".TXTBirthDate").val()))
            : ($(".QueryName .QueryNameHeader").append(e.personalInfo.name),
              $(".HomeStatisticsBox").append('<div class="row mb-2 text-center"><div class="col-6 HomeStatisticsBoxFirmsViolation" ></div></div>'),
              $(".HomeStatisticsBoxFirmsViolation").append('<div class="card p-0"></div>'),
              $(".HomeStatisticsBoxFirmsViolation .card").append(
                  '<div class="row row-0"><div class="col-12 col-lg-2 HomeStatisticsBoxHeader HomeStatisticsBoxHeaderFirms"></div><div class="col-12 col-lg-10 HomeStatisticsDetailsBox"></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBox").append(
                  '<div class="row"><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxGeneral HomeStatisticsDetailsBoxGeneralFirms"><i class="fas fa-sort-down"></i></div><div class="col-6 HomeStatisticsDetailsBoxItem HomeStatisticsDetailsBoxTraffic HomeStatisticsDetailsBoxTrafficFirms"><i class="fas fa-sort-down"></i></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeader").append(
                  '<div class="row"><div class="col-12 PopupHeaderIconCol" style="display:none"><i class="fad fa-store PopupHeaderIcon"></i></div><div class="col-12 colClassForIpad"><h5 class="HomeStatisticsBoxHeaderTXT"></h5><span class="HomeStatisticsBoxHeaderCount LoadingBeforeSend NumberStyle"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderTXT").append(DictionaryUtils.getMessage("fines")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderCount").append(""),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxGeneral").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-th-list PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTGeneral"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountGeneral"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceGeneral"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTGeneral").append(DictionaryUtils.getMessage("general")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountGeneral").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceGeneral").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsDetailsBoxTraffic").append(
                  '<div class="row"><div class="col-12 col-lg-5 "><i class="fad fa-car PopupHeaderIconCol"></i><h5 class="HomeStatisticsBoxHeaderSubTXT HomeStatisticsBoxHeaderSubTXTTraffic"></h5></div><div class="col-12 col-lg-6"><h5 class="HomeStatisticsBoxHeaderSubCount HomeStatisticsBoxHeaderSubCountTraffic"><h5><span class="HomeStatisticsBoxHeaderSubPrice HomeStatisticsBoxHeaderSubPriceTraffic"></span></div></div>'
              ),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubTXTTraffic").append(DictionaryUtils.getMessage("traffic")),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubCountTraffic").append('<span class="Count LoadingBeforeSend NumberStyle"></span>'),
              $(".HomeStatisticsBoxFirmsViolation .HomeStatisticsBoxHeaderSubPriceTraffic").append(
                  '<span class="HomePopupSRPriceNumber LoadingBeforeSend NumberStyle"></span> <span class="HomePopupSRPriceTXT">' + DictionaryUtils.getMessage("sr") + "</span>"
              ),
              $(".HomeStatisticsDetailsBoxGeneralFirms").click(function () {
                  $(".IsTrafficSelect").val("1"), (isTrafficPayment = 1), (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 2), $(".SearchBtn").click();
              }),
              $(".HomeStatisticsDetailsBoxTrafficFirms").click(function () {
                  $(".IsTrafficSelect").val("2"), (isTrafficPayment = 2), (payerTypePayment = "" != payerTypePayment ? payerTypePayment : 2), $(".SearchBtn").click();
              }),
              HomeStatistics(e.personalInfo.id, $(".TXTFirms-LaborId").val(), "")),
        $(".LoadingBeforeSend").html('<span class="LoadingBeforeSendSpan "><img src="../img/Progress2.svg" class="InlineProgress" /></span>');
}
function GetTableData(e, t, a) {
    var s,
        o = [];
    NetworkUtils.PDSFines.GetViolationsByViolatorHome(e, e.violatorId, a, t, !0, i).done(function (t) {
        var a,
            i,
            n = 0,
            l = 0;
        $(".TableRowCount").html(t.length);
        var r = 0;
        t.forEach(function (e) {
            (s = [
                e.violatorId,
                "",
                e.resolutionTypeCode,
                '<img src="../img/' + e.structureId + '.svg" /> ' + DictionaryUtils.chooseWord(e.structureDescriptionAr, e.structureDescription),
                e.violatorName,
                DictionaryUtils.chooseWord(e.violationGroupDescAr, e.violationGroupDesc),
                DictionaryUtils.formatDate(e.violationDate),
                e.violationNumber,
                e.totalAmount,
                DictionaryUtils.chooseWord(e.violationStatusDescAr, e.violationStatusDesc),
                '<button type="button" class="btn btn-primary btn-custom OpenPopupBoxDetails" finenumber="' + e.violationNumber + '" violatorid="' + e.violatorId + '"><i class="fad fa-eye"></i></button>',
            ]),
                (r += e.totalAmount),
                $(".TotalAmount").html(r / 2),
                44 == e.structureId ? l++ : n++,
                o.push(s);
        }),
            (a = n > 1 ? DictionaryUtils.getMessage("home_fines") : DictionaryUtils.getMessage("home_fine")),
            (i = l > 1 ? DictionaryUtils.getMessage("home_fines") : DictionaryUtils.getMessage("home_fine")),
            (n > 0 || l > 0) &&
                ($(".HomeCountMainBoxLoad").html(DictionaryUtils.getMessage("home_popup_header")),
                $(".HomeGeneralFinesCount").html(n),
                $(".HomeGeneralFinesCountTitle").html(a),
                $(".HomeTrafficFinesCount").html(l),
                $(".HomeTrafficFinesCountTitle").html(i),
                (0 != n && 0 != l) || $(".HomeFilesCountAnd").remove()),
            0 == n && 0 == l && $(".HomeCountMainBoxLoad").html(DictionaryUtils.getMessage("no_unpaid_violations")),
            0 == n && $(".HomeGeneralFinesCountBox").remove(),
            0 == l && $(".HomeTrafficFinesCountBox").remove(),
            DrowTable(o, e);
    });
}
function DrowTable(e, t) {
    $(".IsTrafficSelect").val();
    var a = 0,
        i = [];
    $(".AjaxTable").html('<table id="DashboardViolationsTable" class="table table-striped TableReceipt TableReceiptInternal"></table >');
    var s = $("#DashboardViolationsTable").DataTable({
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"p>',
            autoWidth: !1,
            responsive: !0,
            paging: !0,
            pageLength: 8,
            ordering: !1,
            serverSide: !1,
            destroy: !0,
            lengthChange: !1,
            data: e,
            columns: [
                { title: "" },
                { title: "", visible: !0 },
                { title: "" },
                { title: DictionaryUtils.getMessage("structure"), visible: 0 == t.Structre },
                { title: DictionaryUtils.getMessage("type"), visible: 0 == t.ViolatorType },
                { title: DictionaryUtils.getMessage("fine_type"), visible: 0 == t.FineGroup },
                { title: DictionaryUtils.getMessage("date"), visible: 0 == t.FineDate },
                { title: DictionaryUtils.getMessage("fine_number"), visible: 0 == t.FineNumber },
                { title: DictionaryUtils.getMessage("violation_amount") },
                { title: DictionaryUtils.getMessage("transaction_status"), visible: 0 == t.Status },
                { title: DictionaryUtils.getMessage("details") },
            ],
            language: {
                search: "<span>" + DictionaryUtils.getMessage("filter") + ":</span> INPUT",
                searchPlaceholder: DictionaryUtils.getMessage("filter_placeholder"),
                lengthMenu: "<span>" + DictionaryUtils.getMessage("show") + ":</span> MENU",
                info: DictionaryUtils.getMessage("showing") + " _START_ " + DictionaryUtils.getMessage("to") + " _END_ " + DictionaryUtils.getMessage("of") + " _TOTAL_ " + DictionaryUtils.getMessage("pagingviolations"),
                paginate: { first: DictionaryUtils.getMessage("first"), last: DictionaryUtils.getMessage("Last"), next: DictionaryUtils.getMessage("next"), previous: DictionaryUtils.getMessage("previous") },
                zeroRecords: DictionaryUtils.getMessage("no_data_available_table"),
            },
            columnDefs: [
                {
                    orderable: !1,
                    className: "select-checkbox",
                    targets: 1,
                    createdCell: function (e, t, a, i, s) {
                        55 == a[2] || 2 == a[9] || isPaymentDisabled
                            ? ($(e).click(function (e) {
                                  e.stopPropagation();
                              }),
                              $(e).html('<input type="checkbox" disabled="disabled" style="width: 19px;height: 19px; margin-top:15px; margin-right:0px;" />'),
                              $(e).removeClass("select-checkbox"))
                            : $(e).addClass("select-checkbox");
                    },
                },
                { targets: [0], visible: !1 },
                { targets: [2], visible: !1 },
                { targets: [3, 6, 7, 8], className: "HideOnMobile" },
            ],
            select: { style: "multi", selector: "td:first-child" },
            fnInitComplete: function () {},
            drawCallback: function () {
                $(this).find("tbody tr td").length <= 1 &&
                    ($("#DashboardViolationsTable_wrapper").css("display", "none"),
                    $("#DashboardViolationsTable_wrapper").after('<div class="alert alert-success NoData" role="alert">' + DictionaryUtils.getMessage("no_data") + "</div >"),
                    $(".TotalAmount ").html(0));
            },
        }),
        o = "ar" == DictionaryUtils.getLanguage() ? "right" : "left";
    $("#DashboardViolationsTable").css("text-align", o),
        s
            .on("click", "th.select-checkbox", function (e, t, a, i) {
                if ($("th.select-checkbox").hasClass("selected")) s.rows().deselect(), $("th.select-checkbox").removeClass("selected");
                else {
                    s.rows().deselect();
                    for (var o = 0; o < 100; o++) s.rows(o).select();
                    $("th.select-checkbox").addClass("selected");
                }
            })
            .on("select deselect", function (e, t, a, i) {
                s.rows({ selected: !0 }).count() === s.rows().count() ? $("th.select-checkbox").addClass("selected") : $("th.select-checkbox").removeClass("selected");
            })
            .on("click", "td", function () {
                var e = 0;
                0 == e && ($(this).hasClass("select-checkbox") || $(this).parent().find(".OpenPopupBoxDetails").get(0).click()), e++;
            }),
        s
            .on("select", function (e, t, o, n) {
                var l = s.rows(n).data().toArray();
                (n >= 0 && l.length > 0) || ((i = []), (a = 0));
                var r = t.rows({ selected: !0 });
                if ((100 == r.count() ? $("th.select-checkbox").addClass("selected") : $("th.select-checkbox").removeClass("selected"), r.count() <= 100))
                    for (var c = 0; c < l.length; c++) {
                        var d = { FineNumber: l[c][7], FineAmount: l[c][8] };
                        55 == l[c][2] || isPaymentDisabled ? s.rows(c).deselect() : (i.push(d), (a += l[c][8]));
                    }
                $(".SpanSelectedCount").html(i.length),
                    $(".SelectedAmountSpan").html(a),
                    0 == parseInt($(".SelectedAmountSpan").html())
                        ? ($(".PayListBtn").attr("disabled", "disabled"), $(".SowIfNotHaveFines").css("display", "inline-block"), $(".SowIfHaveFines").css("display", "none"))
                        : ($(".PayListBtn").removeAttr("disabled"), $(".SowIfNotHaveFines").css("display", "none"), $(".SowIfHaveFines").css("display", "inline-block")),
                    r.count() > 100 && t.rows(n).deselect();
            })
            .on("deselect", function (e, t, o, n) {
                var l = s.rows(n).data().toArray();
                100 == t.rows({ selected: !0 }).count() ? $("th.select-checkbox").addClass("selected") : $("th.select-checkbox").removeClass("selected");
                for (var r = 0; r < l.length; r++) {
                    var c = i.findIndex(function (e) {
                        return e.FineNumber === l[r][7];
                    });
                    -1 === c || 55 == l[r][2] || isPaymentDisabled || (i.splice(c, 1), (a -= l[r][8]));
                }
                $(".SpanSelectedCount").html(s.rows({ selected: !0 }).count()),
                    $(".SelectedAmountSpan").html(a),
                    0 == parseInt($(".SelectedAmountSpan").html())
                        ? ($(".PayListBtn").attr("disabled", "disabled"), $(".SowIfNotHaveFines").css("display", "inline-block"), $(".SowIfHaveFines").css("display", "none"))
                        : ($(".PayListBtn").removeAttr("disabled"), $(".SowIfNotHaveFines").css("display", "none"), $(".SowIfHaveFines").css("display", "inline-block"));
            })
            .on("click", ".OpenPopupBoxDetails", function (e) {
                e.stopPropagation();
                var t = $(this).attr("FineNumber"),
                    a = $(this).attr("violatorid"),
                    i = $(".TableDetailsCounter").html();
                0 == i && GetFineDetails(t, a, payerIDPayment, payerTypePayment, loginTypePayment, "ViolationDetails", !1, !0, !0), i++, $(".TableDetailsCounter").html(i);
            }),
        $("#DashboardViolationsTable thead").addClass("thead-light"),
        $(".PayListBtn")
            .unbind()
            .click(function () {
                $(this).attr("disabled", "disabled"),
                    setTimeout(function () {
                        $(".PayListBtn").removeAttr("disabled");
                    }, 1e3),
                    $(".ViolationsList").fadeOut(function () {
                        $(".RedirectToPaymentsDiv").remove(),
                            $(".ViolationsList").after('<div class="text-center DashboardPageLoadingTXT RedirectToPaymentsDiv" >' + DictionaryUtils.getMessage("redirect_to_payment_site") + "</div>"),
                            CreateOrder({ PayerID: payerIDPayment, ViolatorID: payerIDPayment, OrderType: isTrafficPayment, PayerType: payerTypePayment, LoginType: loginTypePayment, FiensInfoDTOs: i });
                    });
            });
}
function GetFirmsList(e) {
    NetworkUtils.PDSFines.GetFirmsList(e, 0, !0)
        .done(function (e) {
            if (e.length > 0) {
                $(".HomeStatisticsBoxFirmsViolation").css("display", "block");
                for (var t = 0; t < e.length; t++) $(".DDLFirms").append('<option value="' + e[t].firmID + '">' + e[t].name + "</option>");
            } else $(".TargetType3 select,.TargetType3 .input-group-prepend").css("display", "none"), $(".TargetType3 select").after('<div class="alert alert-info" role="alert">' + DictionaryUtils.getMessage("you_have_no_firms") + "</div >"), $(".firmOption").remove(), $(".HomeStatisticsBoxMyViolation").removeClass("col-6").addClass("col-12 col-lg-6");
        })
        .always(function (e) {});
}
function CreateOrder(e) {
    NetworkUtils.Payments.CreateOrder(e)
        .done(function (t) {
            var a = 0;
            if (e.FiensInfoDTOs.length > 0) for (l = 0; l < e.FiensInfoDTOs.length; l++) a += e.FiensInfoDTOs[l].FineAmount;
            var i = document.getElementById("payment_confirmation");
            for (var s in ((document.getElementById("totalFineItemsAmount").value = a), t)) {
                var o = document.createElement("input");
                o.setAttribute("type", "hidden"), o.setAttribute("id", s), o.setAttribute("name", s), o.setAttribute("value", t[s]), i.appendChild(o);
            }
            i.submit();
        })
        .fail(function (e) {
            $(".DashboardPageLoadingTXT").fadeOut(function () {
                $(".ViolationsList").fadeIn();
            });
            var t = null != e.responseText ? e.responseText : DictionaryUtils.getMessage("error-occured");
            bootbox.dialog({ message: t, className: "ar" === DictionaryUtils.getLanguage() ? "RTL" : "", buttons: { close: { label: DictionaryUtils.getMessage("close"), className: "pay-btn" } } });
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
                        grecaptcha.ready(function () {
                            grecaptcha.execute($('#hdnReCaptchaKey').val(), { action: 'submit' }).then(function (token) {
                                GetPersonalInfo(IDNumber, BirthDate, token);
                            });
                        });
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
$(document).ready(function (e) {
    e('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (t) {
        e(".TXTBirthDate").val(""), e(".TXTIDNumber").val(""), e(".TXTFirms-FirmID").val(""), e(".TXTFirms-FineNumber").val(""), e(".TXTFirms-LaborId").val("");
    }),
        e("#btnlogin").click(function () {
            var t = e(".TXTIDNumber").val();
            if ("" == t) {
                var a = '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("id_number_required") + "</div>";
                e(".CustomModalBodyCard").html(a), OpenPopup("animate__backInDown", "animate__backInDown");
            } else 10 != t.length || t.startsWith("7") ? ((a = '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("invalid_idnumber") + "</div>"), e(".CustomModalBodyCard").html(a), OpenPopup("animate__backInDown", "animate__backInDown")) : (window.location.href = "/callback.aspx?idx=" + t);
        }),
        e(".NumberOnly").on("input", function (e) {
            this.value = this.value.replace(/[^0-9 ٠-٩ ۰-۹]/g, "");
        }),
        e(".NumberOnly").keyup(function () {
            e(this).val(DictionaryUtils.toEnglishNumber(e(this).val()));
        }),
        e('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (t) {
            var a = e(t.target).attr("href");
            e(a).find("input").val("");
        }),
        e("body").append('<span class="TableDetailsCounter" style="display:none">0</span>'),
        e("#linkIndividualsLogin").click(function (e) {
            loginTypePayment = 1;
        }),
        e(".IndividualsEnquiry").click(function (t) {
            (loginTypePayment = ""), 
            (payerTypePayment = ""), 
            (payerIDPayment = ""), 
            (isTrafficPayment = 0);
            var a = "",
                i = e(".TXTIDNumber").val(),
                s = e(".TXTFineNumber").val(),
                o = e(".TXTBirthDate").val();
            "" == i
                ? (a = a + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("id_number_required") + "</div>")
                : 10 == i.length
                ? 10 == i.length && i.startsWith(7) && (a = a + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("invalid_idnumber") + "</div>")
                : (a = a + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("id_number_ten_10_digits") + "</div>"),
                "" == s && "" == o && (a = a + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("enterviolationnumberordob") + "</div>"),
                "" != i && "" != s ? ((loginTypePayment = 3), (payerTypePayment = 4), (payerIDPayment = i)) : "" != i && "" != o && ((loginTypePayment = 2), (payerIDPayment = i)),
                10 != i.length || i.startsWith(7) || ("" == s && "" == o)
                    ? (e(".CustomModalBodyCard").html(a), OpenPopup("animate__backInDown", "animate__backInDown", 500))
                    : "" == s
                    ? (e(".se-pre-con").fadeIn(), 0 == e(".LoadedAfterPopupOpen").length ? LoadScript("individual") : onloadCallbackIndividual())
                    : s.length <= 14
                    ? ((a += '<div class="HomePopupValidationItem"></div>'),
                      e(".CustomModalBodyCard").html('<div class="ViolationDetails"></div>'),
                      OpenPopup("animate__backInDown", "animate__backInDown"),
                      GetFineDetails(s, i, payerIDPayment, payerTypePayment, loginTypePayment, "ViolationsList", !0, !1, !0))
                    : ((a = a + '<div class="HomePopupValidationItem">' + DictionaryUtils.getMessage("please_enter_valid_fine_number") + "</div>"),
                      OpenPopup("animate__backInDown", "animate__backInDown"),
                      e(".CustomModalBodyCard").html('<div class="alert alert-warning mb-2 text-center">' + a + "</div>"));
        }),
        e(".FirmsEnquiry").click(function () {
            (loginTypePayment = ""), (payerTypePayment = ""), (payerIDPayment = ""), (isTrafficPayment = 0);
            var t = "",
                a = e(".TXTFirms-FirmID").val(),
                i = e(".TXTFirms-FineNumber").val(),
                s = e(".TXTFirms-LaborId").val();
            "" == a
                ? (t = t + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("firm_id_requierd") + "</div>")
                : 10 == a.length
                ? 10 != a.length || a.startsWith(7) || (t = t + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("pleaseenterfirmid") + "</div>")
                : (t = t + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("firm_id_ten_digits") + "</div>"),
                "" == i && "" == s
                    ? (t = t + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("enterviolationnumberorlaborid") + "</div>")
                    : "" != s && 10 != s.length && (t = t + '<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("labor_id_ten_digits") + "</div>"),
                "" != a && "" != i ? ((loginTypePayment = 4), (payerTypePayment = 4), (payerIDPayment = a)) : "" != a && "" != s && ((loginTypePayment = 5), (payerTypePayment = 4), (payerIDPayment = a)),
                10 != a.length || !a.startsWith(7) || ("" == i && "" == s)
                    ? (e(".CustomModalBodyCard").html(t), OpenPopup("animate__backInDown", "animate__backInDown", 500))
                    : "" == i
                    ? (e(".se-pre-con").fadeIn(), 0 == e(".LoadedAfterPopupOpen").length ? LoadScript("Firms") : onloadCallbackFirms())
                    : i.length <= 14
                    ? ((t += '<div class="HomePopupValidationItem"></div>'),
                      e(".CustomModalBodyCard").html('<div class="ViolationsList"></div>'),
                      OpenPopup("animate__backInDown", "animate__backInDown"),
                      GetFineDetails(i, a, payerIDPayment, payerTypePayment, loginTypePayment, "ViolationsList", !0, !1, !0))
                    : ((t = t + '<div class="HomePopupValidationItem">' + DictionaryUtils.getMessage("please_enter_valid_fine_number") + "</div>"),
                      OpenPopup("animate__backInDown", "animate__backInDown"),
                      e(".CustomModalBodyCard").html('<div class="alert alert-warning mb-2 text-center">' + t + "</div>"));
        }),
        e(".TXTFineNumber").on("input", function (t) {
            e(".TXTBirthDate").val("");
        }),
        e(".TXTBirthDate").on("input", function (t) {
            e(".TXTFineNumber").val("");
        }),
        e(".TXTFirms-FineNumber").on("input", function (t) {
            e(".TXTFirms-LaborId").val("");
        }),
        e(".TXTFirms-LaborId").on("input", function (t) {
            e(".TXTFirms-FineNumber").val("");
        });
}),
    (jQuery.fn.inputFilter = function (e) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            e(this.value)
                ? ((this.oldValue = this.value), (this.oldSelectionStart = this.selectionStart), (this.oldSelectionEnd = this.selectionEnd))
                : this.hasOwnProperty("oldValue")
                ? ((this.value = this.oldValue), this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd))
                : (this.value = "");
        });
    }),
    $(".date-default").on("dp.change", function (e) {
        $(".TXTFineNumber").val("");
    });
var onloadCallbackIndividual = function () {
        GetPersonalInfo($(".TXTIDNumber").val(), $(".TXTBirthDate").val(), 0);
    },
    onloadCallbackFirms = function () {
        var e = $(".TXTFirms-FirmID").val(),
            t = $(".TXTFirms-LaborId").val();
        NetworkUtils.PDSFines.extGetFirmInfoByIdAndSponsoreeId(e, t, 0)
            .done(function (a) {
                $(".se-pre-con").fadeOut(100, function () {
                    DrowPopupBody(e, "", a.firmlInfo, t);
                });
            })
            .always(function (e) {})
            .fail(function (e, t, a) {
                $(".se-pre-con").fadeOut(function () {
                    OpenPopup("animate__backInDown", "animate__backInDown", 500),
                        e.responseJSON.messageAr
                            ? $(".CustomModalBodyCard").html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.chooseWord(e.responseJSON.messageAr, e.responseJSON.message) + "</div>")
                            : $(".CustomModalBodyCard").html('<div class="HomePopupValidationItem alert alert-warning mb-2 text-center">' + DictionaryUtils.getMessage("errorgettingdata") + "</div>");
                });
            });
    };
function LoadScript(e) {
    "individual" == e
        ? $("body").append('<script src="https://recaptcha.net/recaptcha/api.js?onload=onloadCallbackIndividual&render=' + $("#hdnReCaptchaKey").val() + '"></script>')
        : "Firms" == e && $("body").append('<script src="https://recaptcha.net/recaptcha/api.js?onload=onloadCallbackFirms&render=' + $("#hdnReCaptchaKey").val() + '"></script>'),
        DictionaryUtils.LoadExtraScripts();
}
