<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marker_location', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->float('longitude', 10, 6);
            $table->float('latitude', 10, 6);
            $table->string('location_image')->nullable(); // Image path stored here
            $table->string('location_title');
            $table->text('location_description');
            $table->timestamps();
        });

        Schema::create('location_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('marker_location_id')->constrained('marker_location')->onDelete('cascade');
            $table->string('service_name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('location_services');
        Schema::dropIfExists('marker_location');
    }
};
