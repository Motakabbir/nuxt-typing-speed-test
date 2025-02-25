<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
    
    <div class="prose dark:prose-invert max-w-none">
      <p class="mb-4">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
      <p class="mb-4">
        We collect the following types of information when you use our typing speed test application:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Email address (when you create an account)</li>
        <li>Typing test results and statistics</li>
        <li>Language preferences</li>
        <li>Device type and browser information</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
      <p class="mb-4">We use the collected information to:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Maintain and improve our services</li>
        <li>Track your typing progress</li>
        <li>Display your results on the leaderboard (if you opt in)</li>
        <li>Provide personalized typing experiences</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">3. Data Security</h2>
      <p class="mb-4">
        We implement security measures to protect your personal information. Your data is stored securely
        using Firebase's infrastructure, and we follow industry best practices for data protection.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">4. Cookies</h2>
      <p class="mb-4">
        We use cookies to remember your preferences and provide a better experience. This includes:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Authentication status</li>
        <li>Language preferences</li>
        <li>Theme preferences (dark/light mode)</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
      <p class="mb-4">
        We use Firebase for authentication and data storage. Please refer to Google's privacy policy
        for information about how they handle your data.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
      <p class="mb-4">You have the right to:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Access your personal data</li>
        <li>Request data deletion</li>
        <li>Opt out of the leaderboard</li>
        <li>Update your information</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">7. Contact Us</h2>
      <p class="mb-4">
        If you have any questions about this Privacy Policy, please contact us at:
        [Your Contact Information]
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Privacy Policy - Typing Speed Test',
  meta: [
    {
      name: 'description',
      content: 'Privacy policy for the Typing Speed Test application. Learn how we handle and protect your data.'
    }
  ]
})
</script>
<style scoped>
</style>