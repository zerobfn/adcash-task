<template>
    <div class="SavedRules">
        <h4>Saved targeting rules</h4>
        <table>
            <tr>
                <th class="types">Types</th>
                <th class="rules">Rules</th>
                <th class="actions">Actions</th>
            </tr>
            <tr v-for="type of getTableData" :key="`type-${type.type.id}`">
                <td class="types">
                    {{type.type.name}}
                </td>
                <td class="rules">
                    <BaseRule
                        v-for="rule of type.rules"
                        :text="rule.name"
                        @removeItem="deleteRule(rule)"
                        :key="`type-${type.type.id}-rule-${rule.ruleId}`"
                    />
                </td>
                <td class="actions">
                    <div class="delete" @click="deleteType(type)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 5.34783H5.77778M20 5.34783H18.2222M5.77778 5.34783L6.46111 19.0993C6.51401 20.1639 7.39265 21 8.45864 21H15.5414C16.6073 21 17.486 20.1639 17.5389 19.0993L18.2222 5.34783M5.77778 5.34783H9.33333M18.2222 5.34783H14.6667M9.33333 5.34783V4C9.33333 3.44772 9.78105 3 10.3333 3H13.6667C14.219 3 14.6667 3.44772 14.6667 4V5.34783M9.33333 5.34783H14.6667M8.44444 7.69565L9 18.6522M12 7.69565V18.6522M15.5556 7.69565L15 18.6522" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import BaseRule from '@/components/BaseRule.vue'

export default {
    name: 'SavedRules',
    components: {
        BaseRule
    },
    computed: {
        getTableData() {
            const targetingTypes = this.$store.getters.getTargetingTypes
            const rules = this.$store.getters.getSavedRules
            console.log('getableData')
            return targetingTypes.map(x => {
                return {
                    type: x,
                    rules: rules.filter(y => y.targetingTypeId == x.id && !y.deleted)
                }
            }).filter(x => x.rules.length > 0)
        }
    },
    methods: {
        deleteType(type) {
            this.$confirm(`Are you sure you want to delete targeting type "${type.type.name}"?`, 'Confirmation', 'warning')
            .then(() => {
                type.rules.forEach(x => {
                    this.$store.commit('deleteTargetingRule', x)
                })
            }).catch(() => {})
        },
        deleteRule(rule) {
            this.$confirm(`Are you sure you want to delete rule "${rule.name}"?`, 'Confirmation', 'warning')
            .then(() => {
                this.$store.commit('deleteTargetingRule', rule)
            }).catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.SavedRules {
    padding: 0 16px 16px 16px;
    border: 1px solid #1C1C1C;
    border-radius: 2px;
}
table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #1c1c1c;
    tr { 
        border: solid;
        border-width: 1px 0;
    }
    th.types {
        width: 20%;
    }
    th.actions {
        width: 15%;
    }
    th.rules {
        width: 65%;
        text-align: start;
    }
    td.rules {
        display: flex;
        flex-wrap: wrap;
    }
    td.actions {
        .delete {
            margin: auto;
            width: 24px;
            height: 24px;
            &:hover {
                cursor: pointer;
            }
        }
    }
    th, td {
        padding: 4px;
    }
    tr:first-child {
        border-top: none;
    }
    tr:last-child {
        border-bottom: none;
    }
}


</style>