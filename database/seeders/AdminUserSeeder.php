<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Change these credentials as needed
        $email = env('ADMIN_EMAIL', 'admin@example.com');
        $password = env('ADMIN_PASSWORD', 'password123');

        $user = User::where('email', $email)->first();
        if ($user) {
            $user->role = 'admin';
            $user->password = Hash::make($password);
            $user->save();
            $this->command->info("Updated existing user {$email} to admin");
            return;
        }

        User::create([
            'name' => 'Administrator',
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'admin',
        ]);

        $this->command->info("Created admin user: {$email}");
    }
}
