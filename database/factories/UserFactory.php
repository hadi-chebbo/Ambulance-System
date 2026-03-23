<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email'     => fake()->unique()->safeEmail(),
            'phone' => fake()->unique()->numerify('03#######'),
            'role' => fake()->randomElement(['EMT', 'EMT-assistant', 'driver']),
            'password' => static::$password ??= Hash::make('password'),
            'photo' => null,
            'blood_type' => fake()->randomElement(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']),
            'join_year' => fake()->year(),
            'birthdate' => fake()->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'remember_token' => Str::random(10),
        ];
    }

    public function admin(): static
    {
        return $this->state(['role' => 'admin']);
    }

    public function emt(): static
    {
        return $this->state(['role' => 'EMT']);
    }
    
    public function emtAssistant(): static
    {
        return $this->state(['role' => 'EMT-assistant']);
    }

    public function driver(): static
    {
        return $this->state(['role' => 'driver']);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
