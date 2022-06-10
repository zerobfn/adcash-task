<template>
    <div id="app">
        <LoadingModel />
        <MainContainer />
    </div>
</template>

<script>
import MainContainer from '@/views/MainContainer.vue'
import LoadingModel from '@/views/LoadingModel/LoadingModel.vue'

export default {
    name: 'App',
    components: {
        MainContainer,
        LoadingModel
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
    margin: 32px 0;
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
