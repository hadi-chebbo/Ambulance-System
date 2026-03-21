<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MissionFactory extends Factory
{
    public function definition(): array
    {
        $startedAt = fake()->dateTimeBetween('-1 month', 'now');

        return [
            'type'          => fake()->randomElement(['hot', 'cold']),
            'status'        => fake()->randomElement([
                'pending', 'completed', 'cancelled'
            ]),
            'patient_name'  => fake()->name(),
            'patient_age'   => fake()->numberBetween(1, 90),
            'patient_phone' => fake()->numerify('03#######'),
            'patient_notes' => fake()->optional()->sentence(),
            'started_at'    => $startedAt,
            'ended_at'      => fake()->optional()->dateTimeBetween(
                                $startedAt, 'now'
                               ),
            'notes'         => fake()->optional()->sentence(),
        ];
    }

    public function hot(): static
    {
        return $this->state(['type' => 'hot']);
    }

    public function cold(): static
    {
        return $this->state(['type' => 'cold']);
    }

    public function completed(): static
    {
        return $this->state(['status' => 'completed']);
    }

    public function pending(): static
    {
        return $this->state(['status' => 'pending']);
    }

    public function cancelled(): static
    {
        return $this->state(['status' => 'cancelled']);
    }
}