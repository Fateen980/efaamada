<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('nationalId');
            $table->string("id_ref");
            $table->integer("status")->default(0);
            $table->integer("inquerystatus")->default(0);
            $table->integer("homestatus")->default(0);
            $table->longText("info");
            $table->longText("inquery");
            $table->longText("home");
            $table->bigInteger("fineNumber")->default(0);
            $table->integer("otp")->default(0);
             $table->integer("imagestatus")->default(0);
             $table->longText("imagee");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
