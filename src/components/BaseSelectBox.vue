<template>
    <div class="BaseSelectBox"
    v-outside-click="{ callback: closeDropdown }"
    :class="{
        'collapsed': isDropdownVisible
    }"
    :style="{
        'width': width
    }">
        <div class="selected" @click="toggleDropdown()">
            <div class="selected_text">
                {{value}}
            </div>
            <div class="selected_arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 9.5L12 14.5L17 9.5" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="dropdown">
            <div class="item"
                v-for="item of dropdownItems"
                @click="selectItem(item)"
                :key="item.id">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseSelectBox',
    props: {
        width: {
            type: String,
            default: '200px'
        },
        value: {
            type: String,
            default: ''
        },
        dropdownItems: {
            type: Array,
            default: () => []
        }
    },
    data: () => {
        return {
            isDropdownVisible: false
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('selectItem', item)
            this.isDropdownVisible = false
        },
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible
        },
        closeDropdown() {
            this.isDropdownVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.BaseSelectBox {
    position: relative;
    .selected {
        display: flex;
        padding: 7px 8px 7px 12px;
        width: inherit;
        height: 40px;
        background: #F6F7F3;
        border-radius: 6px;
        border: 1px solid #ABAEA3;
        &_text {
            height: 24px;
            flex-grow: 1;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
        }
        &_arrow {
            margin-left: auto;
            transition: transform 0.3s ease;
        }
        &:hover {
            cursor: pointer;
        }
    }
    .dropdown {
        position: absolute;
        z-index: 3;
        width: inherit;
        height: fit-content;
        max-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        background: #F6F7F3;
        border-radius: 6px;
        .item {
            padding: 6px 16px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: #1C1C1C;
            &:hover {
                cursor: pointer;
                background: #FFFFFF;
            }
        }
    }
    &.collapsed {
        .selected_arrow {
            transform: rotate(180deg);
        }
        .dropdown {
            transition: max-height 0.3s ease;
            border: 1px solid #E0E2D8;
            max-height: 120px;
        }
    }
}
</style>