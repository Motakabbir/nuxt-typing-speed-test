<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
    
    <div class="prose dark:prose-invert max-w-none">
      <p class="mb-4">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
      <p class="mb-4">
        By accessing and using this typing speed test application, you accept and agree to be bound by these
        Terms of Service. If you do not agree to these terms, please do not use our service.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">2. User Accounts</h2>
      <p class="mb-4">When creating an account, you agree to:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Accept responsibility for all activities under your account</li>
        <li>Notify us immediately of any security breaches</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">3. Fair Usage</h2>
      <p class="mb-4">Users must:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Not use automated tools or scripts</li>
        <li>Not manipulate test results</li>
        <li>Not attempt to game the leaderboard system</li>
        <li>Respect other users and their achievements</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
      <p class="mb-4">
        All content, features, and functionality of this application are owned by us and are protected
        by international copyright, trademark, and other intellectual property laws.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">5. Leaderboard Rules</h2>
      <p class="mb-4">
        We reserve the right to:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Remove suspicious scores</li>
        <li>Ban users who violate fair usage policies</li>
        <li>Modify leaderboard criteria</li>
        <li>Reset leaderboard standings periodically</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-6 mb-4">6. Service Modifications</h2>
      <p class="mb-4">
        We reserve the right to modify or discontinue any part of our service at any time without notice.
        We are not liable to you or any third party for any modifications or discontinuation.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
      <p class="mb-4">
        We provide this service "as is" without warranties of any kind. We are not responsible for any
        damages arising from your use of the service.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
      <p class="mb-4">
        We may update these terms at any time. Continued use of the service after changes constitutes
        acceptance of the new terms.
      </p>

      <h2 class="text-2xl font-semibold mt-6 mb-4">9. Contact</h2>
      <p class="mb-4">
        For questions about these terms, please contact us at: [Your Contact Information]
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Terms of Service - Typing Speed Test',
  meta: [
    {
      name: 'description',
      content: 'Terms of Service for the Typing Speed Test application. Understanding your rights and responsibilities.'
    }
  ]
})
</script>

<style scoped>
</style>