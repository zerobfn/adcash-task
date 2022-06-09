<template>
    <div class="BaseRule">
        {{ text }}
        <div class="close" @click="removeItem()"></div>
    </div>
</template>

<script>
export default {
    name: 'BaseRule',
    props: {
        text: {
            type: String,
            default: ''
        }
    },
    methods: {
        removeItem() {
            this.$emit('removeItem')
        }
    }
}
</script>

<style lang="scss" scoped>
.BaseRule {
    display: flex;
    flex-wrap: nowrap;
    padding: 2px 4px;
    border-radius: 8px;
    margin: 2px 4px 2px 0;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1C1C1C;
    background: #E0E2D8;
    .close {
        position: relative;
        margin: 4px 2px;
        width: 12px;
        height: 12px;
        &::before, &::after {
            content: '';
            position: absolute;
            left: 7px;
            height: 12px;
            width: 2px;
            background: #1c1c1c;
            border-radius: 5px;
        }
        &::after {
            transform: rotate(45deg);
        }
        &::before {
            transform: rotate(-45deg);
        }
        &:hover {
            cursor: pointer;
        }
    }
}
</style>