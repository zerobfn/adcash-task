<template>
    <button class="button" v-on="$listeners">
        <slot/>
    </button>
</template>

<script>
export default {
    name: 'BaseButton'
}
</script>

<style lang="scss" scoped>
.button {
    border-radius: 6px;
    height: 36px;
    padding: 6px 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.04em;
    background: #FFFFFF;
    color: #1c1c1c;
    border: 1px solid #ABAEA3;
    &:hover {
        cursor: pointer;
    }
}

</style>