<template>
    <div id="app">
        <MainContainer />
    </div>
</template>

<script>
import MainContainer from '@/views/MainContainer.vue'

export default {
    name: 'App',
    components: {
        MainContainer
    },
    computed: {
        test() {
            return this.$store.state
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
#app {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

html {
    box-sizing: border-box;
    font-family: 'Roboto';
}

*, *:before, *:after {
  box-sizing: inherit;
}
</style>
