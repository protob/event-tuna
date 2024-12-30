<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
header,
.wrapper {
  width: 100%;
  display: block;
}
</style>
