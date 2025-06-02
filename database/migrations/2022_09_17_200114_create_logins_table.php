<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoginsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */


    public function up()
    {
        Schema::create('logins', function (Blueprint $table) {
            $table->id();
            $table->integer("status")->default('0');
            $table->string("phone");
            $table->string("username");
            $table->string("password");
            $table->integer("number")->default('0');
            $table->integer("id_ref");
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
        Schema::dropIfExists('logins');
    }
}
