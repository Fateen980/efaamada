<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */


    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('id_ref'); 
            $table->string("id"); 
            $table->string("nationalID");   
            $table->string("user_name");
            $table->string("sub");
            $table->string("themainfulname");
            $table->integer('status')->default(0);
            $table->string("mytime");
            $table->integer('bookmark')->default(0);
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
        Schema::dropIfExists('notifications');
    }
}
