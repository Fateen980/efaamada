function DrowCalender(t) {
    var a = "none",
        e = "none",
        n = DictionaryUtils.getMessage("date");

    function i() {
        var t = $.calendars.instance("ummalqura").parseDate("yyyy/mm/dd", $(".HijriDate input").val()),
            a = $.calendars.instance("gregorian"),
            e = a.fromJD(t.toJD());
        $(".GregorianDate input").val(a.formatDate("yyyy/mm/dd", e)), $(".CalenderBoxInput").val(t.year() + "/" + String(t.month()).padStart(2, "0") + "/" + String(t.day()).padStart(2, "0"));
        var n = a.formatDate("yyyy/mm/dd", e);
        $(".CalenderBoxInputG").val(n.split("/")[0] + "/" + n.split("/")[1] + "/" + n.split("/")[2])
    }

    function r() {
        var t = $.calendars.instance("gregorian").parseDate("yyyy/mm/dd", $(".GregorianDate input").val()),
            a = $.calendars.instance("ummalqura"),
            e = a.fromJD(t.toJD());
        $(".HijriDate input").val(a.formatDate("yyyy/mm/dd", e)), $(".CalenderBoxInput").val(t.year() + "/" + String(t.month()).padStart(2, "0") + "/" + String(t.day()).padStart(2, "0")), $(".CalenderBoxInputG").val(t.year() + "/" + String(t.month()).padStart(2, "0") + "/" + String(t.day()).padStart(2, "0"))
    }
    "ar" == t ? a = "block" : "en" == t && (e = "block"), $(".DrowDatePicker").append('\n<div class="CovertBox">\n\t<div class="DateConverterBox">\n\t\t<div class="HijriDate"  style="display:' + a + '">\n\t\t\t<input style="text-align:center;border: 1px solid rgba(0,0,0,.125);" type="text" placeholder="' + n + '" readOnly="true" disabled  />\n\t\t</div>\n\t\t<div class="GregorianDate"  style="display:' + e + '">\n\t\t\t\t\t<input style="text-align:center" type="text" placeholder="' + n + '" readOnly="true" disabled />\n\t\t</div>\n\t\t<div class="ConvertIcon">\n\t\t\t<i class="BtnToH css-icon" style="display:' + e + '"><span>' + DictionaryUtils.getMessage("cal_icon_g") + '</span></i>\n\t\t\t<i class="BtnToG css-icon" style="display:' + a + '"><span>' + DictionaryUtils.getMessage("cal_icon_h") + '</span></i>\n\t\t</div>\n\t\t\n\t</div>\n</div>\n<div class="HiddenDiv" style="display:none">\n\t<input type="text" class="HDate" />\n\t<input type="text" class="GDate" />\n</div>\n'), $("body").append('<span class="HijriDateToGetYear" style="display:none"></span>'), $(".HomeMainBoxSearchBox .GregorianDate input, .HomeMainBoxSearchBox .HijriDate input").attr("placeholder", DictionaryUtils.getMessage("dob")), $.when($(".HijriDateToGetYear").hijriDate()).done(function () {        var t;
        t = $(".hijri-year").html(), $(function () {
            $(".HijriDate input").calendarsPicker({
                calendar: $.calendars.instance("ummalqura"),
                onSelect: i,
                selectDefaultDate: !1,
                pickerClass: "CustomCalenderClass",
                defaultDate: "w",
                showAnim: "fadeIn",
                popupContainer: ".DateConverterBox",
                prevText: "السابق",
                showOtherMonths: !1,
                firstDay: 0,
                yearRange: t + ":1356",
                clearText: "",
                closeText: "",
                maxDate: 0,
                dateFormat: 'yyyy/mm/dd'
            }), $(".GregorianDate input").calendarsPicker({
                calendar: $.calendars.instance("gregorian", "ar"),
                onSelect: r,
                selectDefaultDate: !1,
                pickerClass: "CustomCalenderClass",
                defaultDate: "w",
                showAnim: "fadeIn",
                popupContainer: ".DateConverterBox",
                prevText: "السابق",
                yearRange: (new Date).getFullYear() + ":1937",
                clearText: "",
                closeText: "",
                maxDate: 0,
                dateFormat: 'yyyy/mm/dd'
            })
        })
    }), $(".ConvertIcon i").click(function () {
        $(this).hasClass("BtnToH") && ($(".HijriDate").css("display", "block"), $(".GregorianDate").css("display", "none"), $(".BtnToH").css("display", "none"), $(".BtnToG").css("display", "block"), "" != $(this).val() && i()), $(this).hasClass("BtnToG") && ($(".HijriDate").css("display", "none"), $(".GregorianDate").css("display", "block"), $(".BtnToG").css("display", "none"), $(".BtnToH").css("display", "block"), "" != $(this).val() && r())
    })
}
$(document).ready(function () {
    $(".ResetBtn").click(function () {
        $(".DateConverterBox input").val("")
    });
    var t = "en";
    "rtl" == $("html").attr("dir") && (t = "ar"), DrowCalender(t)
});


function LoadSVG(ElmClass, Action, MainSVGDivClass = 'LoadSVG', SVGWidth='40px') {
    if (Action == 'Add') {
        $('.' + ElmClass + '').html('<div class="' + MainSVGDivClass + '"><img style="width:' + SVGWidth+'" src="../img/Progress2.svg" /></div>')
    }
    else {
        $('.' + ElmClass + '').html('')
    }
    
}