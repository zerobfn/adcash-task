<template>
    <div class="BaseRule">
        {{ text }}
        <div class="close" @click="removeItem()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5.00014L19 19M19 5L5 18.9999" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
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
    width: fit-content;
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
        margin: 2px;
        width: 16px;
        height: 16px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>