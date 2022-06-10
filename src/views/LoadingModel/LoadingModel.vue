<template>
    <div class="loadingModel"
        :class="{
            'hidden': isLoading
        }"
    >
        <span class="spinner"></span>
    </div>
</template>

<script>
export default {
    name: 'LoadingModel',
    computed: {
        isLoading() {
            return this.$store.getters.getLoadingCount === 0
        }
    }
}
</script>

<style lang="scss" scoped>
.loadingModel {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(255, 255, 255, 0.64);
    .spinner{
        width: 80px;
        height: 80px;
        animation: spinner 1s linear infinite;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-top-color: #4B970F;
        border-left-color: #4B970F;
        border-style: solid;
        border-width: 4px;
        border-radius: 50%;  
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
    }
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    &.hidden {
        display: none;
    }
}
</style>