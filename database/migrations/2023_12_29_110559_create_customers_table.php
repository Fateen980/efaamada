<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string("provider")->default('0');
            $table->string('national_id')->unique();
            $table->string('name');
            $table->string('gender');
            $table->string('citizen');
            $table->string('lang');
            $table->string('type_licence');
            $table->string('training_time');
            $table->string('program');
            $table->integer("id_ref");
            $table->integer("status")->default(0);
            $table->integer("phonestatus")->default(0);
            $table->rememberToken();
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
        Schema::dropIfExists('customers');
    }
}
