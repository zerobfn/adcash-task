<template>
    <div class="MainContainer">
        <h1>Ad Targeting</h1>
        <RuleAdding />
        <SavedRules class="MainContainer_rules"/>
        <div class="MainContainer_footer">
            <base-button class="cancel_button" @click="cancelChanges()">
                Cancel
            </base-button>
            <base-button class="save_button" @click="saveChanges()">
                Save changes
            </base-button>
        </div>
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
        cancelChanges() {
            this.$confirm('Are you sure you want to cancel changes?', 'Confirmation', 'warning')
            .then(() => {
                this.$store.commit('cancelChanges')
            }).catch(() => {})
        },
        saveChanges() {
            this.$confirm('Are you sure you want to save changes?', 'Confirmation', 'warning')
            .then(() => {
                const rules = this.$store.getters.getSavedRules
                const deletedRules = rules.filter(x => x.deleted).reduce((group, rule) => {
                    const { targetingTypeId } = rule;
                    group[targetingTypeId] = group[targetingTypeId] ?? []
                    group[targetingTypeId].push(rule)
                    return group
                }, {})
                const newRules = rules.filter(x => x.id === null).reduce((group, rule) => {
                    const { targetingTypeId } = rule;
                    group[targetingTypeId] = group[targetingTypeId] ?? []
                    group[targetingTypeId].push(rule)
                    return group
                }, {})
                for (const [type, rules] of Object.entries(deletedRules)) {
                    this.$store.dispatch('deleteTargetingRules', {
                        targeting_type_id: type,
                        rules: rules.map(x => x.id)
                    })
                }
                for (const [type, rules] of Object.entries(newRules)) {
                    this.$store.dispatch('addNewTargetingRules', {
                        targeting_type_id: type,
                        rules: rules.map(x => x.ruleId)
                    })
                }
                this.$store.dispatch('logSavedRules')
            }).catch(() => {})

        }
    },
    mounted() {
        this.$store.dispatch('fetchListAllTargetingTypes')
    }
}
</script>

<style lang="scss" scoped>
.MainContainer {
    flex-grow: 1;
    max-width: min(90%, 800px);
    min-height: 500px;
    padding: 24px;
    border: 2px dashed orange;
    &_rules {
        margin-top: 32px;
    }
    &_footer {
        display: flex;
        margin-top: 24px;
        .cancel_button {
            margin-left: auto;
        }
        .save_button {
            margin-left: 16px;
        }
    }
}

</style>