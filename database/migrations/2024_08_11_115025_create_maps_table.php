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
            $table->string('image')->nullable();
            $table->string('title');
            $table->text('description');
            $table->text('address');
            $table->integer('phone');
            $table->string('usertype');
            $table->string('username');
            $table->integer('is_Verified');
            $table->json('services')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('ratings', function (Blueprint $table) {
            $table->dropForeign(['map_id']);
        });

        // Drop the ratings table
        Schema::dropIfExists('ratings');

        Schema::dropIfExists('maps');
    }
};
