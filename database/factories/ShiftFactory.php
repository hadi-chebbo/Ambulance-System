<?php

namespace Database\Factories;

use App\Models\Shift;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<shift>
 */
class ShiftFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date'  => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'type'  => fake()->randomElement(['day', 'night']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
    
    public function day(): static
    {
        return $this->state(['type' => 'day']);
    }

    public function night(): static
    {
        return $this->state(['type' => 'night']);
    }
}
