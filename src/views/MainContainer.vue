<template>
    <div class="MainContainer">
        <h1>Ad Targeting</h1>
        <RuleAdding />
        <SavedRules class="MainContainer_rules"/>
        <base-button class="MainContainer_saveButton">
            Save changes
        </base-button>
    </div>
</template>

<script>
import RuleAdding from './RuleAdding/RuleAdding.vue'
import SavedRules from './SavedRules/SavedRules.vue'

export default {
    name: 'MainContainer',
    components: {
        RuleAdding,
        SavedRules
    },
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: min(90%, 800px);
    min-height: 500px;
    padding: 24px;
    border: 2px dashed orange;
    &_rules {
        margin-top: 32px;
    }
    &_saveButton {
        margin-top: 24px;
        margin-left: auto;
    }
}

</style>