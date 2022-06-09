<template>
    <div class="MainContainer">
        <h1>Ad Targeting</h1>
        <div class="MainContainer_adding">
            <div>
                <h4>Type</h4>
                <base-select-box
                    :dropdownItems="$store.getters.getTargetingTypes"
                    @selectItem="$store.commit('setSelectedTargetingType', $event)"
                    v-model="$store.getters.getSelectedTargetingTypeName"
                />
            </div>
            <div class="rules">
                <h4>Rules</h4>
                <base-combo-box
                    :dropdownItems="$store.getters.getTargetTypeRules()"
                    :selectedRules="$store.getters.getSelectedTargetRules()"
                    :freeEntry="$store.getters.getTargetTypeFreeEntry"
                    @onSelectItem="onSelectRule($event)"
                />
            </div>
        </div>
        <div class="MainContainer_rules">
            <h4>Saved targeting rules</h4>
            <table>
                <tr>
                    <th>Types</th>
                    <th>Rules</th>
                    <th>Actions</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MainContainer',
    methods: {
        onSelectRule(rule) {
            this.$store.commit('addTargetingRule', {
                id: null,
                ruleId: `${rule.id}`,
                targetingTypeId: this.$store.getters.getSelectedTargetingTypeId,
                saved: false
            })
        }
    },
    mounted() {
        this.$store.dispatch('fetchListAllTargetingTypes')
    }
}
</script>

<style lang="scss" scoped>
.MainContainer {
    max-width: min(90%, 800px);
    min-height: 500px;
    padding: 24px;
    border: 2px dashed #1C1C1C;
    &_adding {
        display: flex;
        padding: 0 16px 16px 16px;
        border: 1px solid #1C1C1C;
        border-radius: 2px;
        .rules {
            flex-grow: 1;
            margin-left: 24px;
        }
    }
    &_rules {
        margin-top: 32px;
        padding: 0 16px 16px 16px;
        border: 1px solid #1C1C1C;
        border-radius: 2px;
    }
}
</style>