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
        Schema::table('maps', function (Blueprint $table) {
            $table->string('phone')->change();
        });
    }

    public function down()
    {
        Schema::table('maps', function (Blueprint $table) {
            $table->bigInteger('phone')->change();
        });
    }
};
