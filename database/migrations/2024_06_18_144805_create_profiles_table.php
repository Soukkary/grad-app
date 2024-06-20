<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('userr')->onDelete('cascade');
            $table->string('education')->nullable();
            $table->text('experience')->nullable();
            $table->string('profile_pic')->nullable();
            $table->text('skills')->nullable();
            $table->text('fields')->nullable();
            $table->timestamps();

            
        });
    }

    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};
