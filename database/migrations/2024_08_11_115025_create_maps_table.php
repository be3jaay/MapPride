<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maps', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->float('longitude', 10, 6);
            $table->float('latitude', 10, 6);
            $table->string('image')->nullable(); // Image path stored here
            $table->string('title');
            $table->text('description');
            $table->text('address');
            $table->integer('phone');
            $table->json('services')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maps');
    }
};
