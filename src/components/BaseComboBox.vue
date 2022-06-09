<template>
    <div class="BaseComboBox"
        v-outside-click="{callback: closeDropdown}"
        :class="{
            'collapsed': isDropdownVisible
        }"
    >
        <div class="selected" @click="toggleDropdown()">
            <div class="selected_input">
                <BaseRule
                    v-for="rule in selectedRules"
                    :text="rule.name"
                    @removeItem="removeItem(rule.id)"
                    :key="`${JSON.stringify(rule)}`"
                />
                <div class="input_field_container">
                    <input type="text"
                        ref="inputField"
                        class="input_field"
                        autocomplete="off"
                        @keyup.enter="addNewItem()"
                        v-on:input="isDropdownVisible = true"
                        :placeholder="freeEntry ? 'Enter rules' : 'Select rules'"
                        v-model="inputValue"
                    />
                </div>
            </div>
            <div class="selected_arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 9.5L12 14.5L17 9.5" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="dropdown">
            <div class="item"
                v-for="item of getItems"
                @click="selectItem(item)"
                :key="item.id"
            >
                {{item.name}}
            </div>
            <p v-if="getItems.length === 0">
                There are no possible rules
            </p>
        </div>
    </div>
</template>

<script>
import BaseRule from '@/components/BaseRule.vue'

export default {
    name: 'BaseComboBox',
    components: {
        BaseRule
    },
    props: {
        dropdownItems: {
            type: Array,
            default: () => []
        },
        selectedRules: {
            type: Array,
            default: () => []
        },
        freeEntry: {
            type: Boolean,
            default: false
        }
    },
    data: () => {
        return {
            isDropdownVisible: false,
            inputValue: ''
        }
    },
    computed: {
        getItems() {
            return this.dropdownItems.filter(x => {
                if (!this.selectedRules.find(y => y.ruleId == x.id)) {
                    return x.name.toLowerCase().includes(this.inputValue.toLowerCase())
                } else return false
            })
        }
    },
    methods: {
        addNewItem() {
            if (this.inputValue && this.freeEntry) {
                this.$emit('onSelectItem', {
                    id: this.inputValue,
                    name: this.inputValue
                })
                this.inputValue = ''
            }
        },
        selectItem(item) {
            this.$emit('onSelectItem', item)
            this.inputValue = ''
        },
        removeItem(item) {
            this.$emit('removeItem', item)
        },
        toggleDropdown() {
            this.$refs.inputField.focus()
            this.isDropdownVisible = !this.isDropdownVisible
        },
        closeDropdown() {
            this.isDropdownVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
input {
    background: transparent;
    border: none;
}
input:focus {
    outline: none;
    outline-color: rgba(0, 0, 0, 0);
    outline-width: 0px;
}

.BaseComboBox {
    position: relative;
    flex-grow: 1;
    .selected {
        display: flex;
        width: inherit;
        padding: 5px 8px 5px 12px;
        background: #F6F7F3;
        border-radius: 6px;
        border: 1px solid #ABAEA3;
        &_input {
            display: flex;
            flex-wrap: wrap;
            width: calc(100% - 40px);
            .input_field_container {
                flex-grow: 1;
                .input_field {
                    min-width: 120px;
                    width: 100%;
                    padding: 2px;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }
        &_arrow {
            height: 24px;
            margin: auto 0 auto auto;
            transition: transform 0.3s ease;
        }
    }
    .dropdown {
        position: absolute;
        width: 100%;
        z-index: 3;
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