<template>
    <div class="track">
        <figure class="skeleton"></figure>
        <div class="info skeleton ">

        </div>
    </div>
</template>
  
<script setup lang="ts">

</script>
  
<style lang="scss" scoped>
.track {
    display: flex;
    align-items: center;
    background-color: var(--soft);
    border-radius: .25rem;
    padding: .375rem;
    gap: 1rem;
    margin-right: 1rem;
    position: relative;
    font-size: 1.05rem;

    figure {
        height: 64px;
        width: 64px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: .25rem;
        height: 44px;
        width: 100px;
    }
}
</style>
  