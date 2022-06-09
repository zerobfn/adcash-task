<template>
    <div class="RuleAdding">
        <div class="RuleAdding_body">
            <div>
                <h4>Type</h4>
                <base-select-box
                    :dropdownItems="$store.getters.getTargetingTypes"
                    @selectItem="onSelectTargetingType($event)"
                    v-model="$store.getters.getSelectedTargetingTypeName"
                />
            </div>
            <div class="rules">
                <h4>Rules</h4>
                <base-combo-box
                    :dropdownItems="dropdownItems"
                    :selectedRules="selectedRules"
                    :freeEntry="$store.getters.getTargetingTypeFreeEntry()"
                    @onSelectItem="onSelectRule($event)"
                    @removeItem="removeRule($event)"
                />
            </div>
        </div>
        <div class="RuleAdding_footer">
            <base-button @click="clearSelectedRules()">
                Reset
            </base-button>
            <base-button @click="addRules()" style="margin-left: 16px;">
                Add rule
            </base-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RuleAdding',
    data: () => {
        return {
            selectedRules: []
        }
    },
    computed: {
        dropdownItems() {
            const rules = this.$store.getters.getTargetingTypeRules()
            const savedRules = this.$store.getters.getSavedRules
            return rules.filter(x => {
                const index = savedRules.findIndex(y => y.ruleId == x.id && !y.deleted)
                return index === -1
            })
        }
    },
    methods: {
        onSelectTargetingType(type) {
            this.$store.commit('setSelectedTargetingType', type)
            this.clearSelectedRules()
        },
        clearSelectedRules() {
            this.selectedRules = []
        },
        onSelectRule(rule) {
            const savedRules = this.$store.getters.getSavedRules
            const typeId = this.$store.getters.getSelectedTargetingTypeId
            if (!savedRules.find(x => x.targetingTypeId == typeId && x.ruleId == rule.id && !x.deleted)
                && !this.selectedRules.find(x => x.ruleId == rule.id)) {
                this.selectedRules.push({
                    id: null,
                    ruleId: rule.id,
                    name: rule.name,
                    targetingTypeId: typeId,
                    saved: false,
                    deleted: false
                })
            }
        },
        addRules() {
            this.selectedRules.forEach(x => {
                this.$store.commit('addTargetingRule', x)
            })
            this.clearSelectedRules()
        },
        removeRule(ruleId) {
            const index = this.selectedRules.findIndex(x => x.id == ruleId)
            if (index !== -1) {
                this.selectedRules.splice(index, 1)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.RuleAdding {
    padding: 0 16px 16px 16px;
    border: 1px solid #1C1C1C;
    border-radius: 2px;
    &_body {
        display: flex;
        .rules {
            flex-grow: 1;
            margin-left: 24px;
        }
    }
    &_footer {
        margin-top: 24px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>