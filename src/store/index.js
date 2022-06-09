import Vue from 'vue'
import Vuex from 'vuex'
import { httpGet } from '@/utils/http'
import { RuleCollection, TargetingRule } from '@/models/RuleCollection'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        targetingTypes: [], // static data of targeting types
        selectedTargetingType: undefined, // currect selected targeting type
        listOfRuleCollection: [], // static data of list rule collection
        rulesCollection: [] // added rules collection
    },
    actions: {
        // fetching All Targeting types
        fetchListAllTargetingTypes() {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/types',
                onSuccess: json => {
                    this.commit('setTargetingTypes', json)
                    if (json.length > 0) {
                        this.commit('setSelectedTargetingType', json[0])
                    }
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    this.dispatch('fetchCategoryCollection')
                    this.dispatch('fetchCountryCollection')
                    this.dispatch('fetchDeviceCollection')
                    this.dispatch('addUrlKeywordsCollection')
                    this.dispatch('fetchRulesCollection')
                }
            })
        },
        // fetching list all category targeting types
        fetchCategoryCollection() {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/categories',
                onSuccess: json => {
                    this.commit('addRuleCollection', new RuleCollection(1, json, false))
                },
                onError: error => {
                    console.error(error)
                }
            })
        },
        // fetching list all country targeting types
        fetchCountryCollection() {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/countries',
                onSuccess: json => {
                    this.commit('addRuleCollection', new RuleCollection(2, json, false))
                },
                onError: error => {
                    console.error(error)
                }
            })
        },
        // fetching list all device targeting types
        fetchDeviceCollection() {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/devices',
                onSuccess: json => {
                    this.commit('addRuleCollection', new RuleCollection(3, json, false))
                },
                onError: error => {
                    console.error(error)
                }
            })
        },
        // addting url keywords collection to listOfRuleCollection
        addUrlKeywordsCollection() {
            this.commit('addRuleCollection', new RuleCollection(4, [], true))
        },
        // fetching existing rules collection
        fetchRulesCollection() {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/rules',
                onSuccess: json => {
                    json.forEach(x => {
                        this.commit('addTargetingRule', {
                            id: x.id,
                            ruleId: x.rule,
                            targetingTypeId: x.targeting_type_id,
                            saved: true
                        })
                    })
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    // TODO
                }
            })
        }
    },
    mutations: {
        // setting targeting types
        setTargetingTypes(state, types) {
            state.targetingTypes = types
        },
        // setting selected targeting type
        setSelectedTargetingType(state, type) {
            state.selectedTargetingType = type
        },
        // adding targeting type rule collection
        addRuleCollection(state, collection) {
            const index = state.listOfRuleCollection.findIndex(x => x.targetingTypeId === collection.id)
            if (index === -1) {
                state.listOfRuleCollection.push(collection)
            }
        },
        // adding targeting rule
        addTargetingRule(state, {id, ruleId, targetingTypeId, saved}) {
            const index = state.rulesCollection.findIndex(x => {
                return x.ruleId == ruleId && x.targetingTypeId === targetingTypeId
            })
            if (index === -1) {
                state.rulesCollection.push(new TargetingRule(id, ruleId, targetingTypeId, saved))
            }
        }
    },
    getters: {
        // getting targeting types
        getTargetingTypes(state) {
            return state.targetingTypes
        },
        // getting selected targeting type
        getSelectedTargetingType(state) {
            return state.selectedTargetingType
        },
        // getting selected targeting type id
        getSelectedTargetingTypeId(_state, getters) {
            return getters.getSelectedTargetingType ? getters.getSelectedTargetingType.id : 0
        },
        // getting selected targeting type name
        getSelectedTargetingTypeName(_state, getters) {
            return getters.getSelectedTargetingType ? getters.getSelectedTargetingType.name : ''
        },
        // getting selected or specific targeting type rule collection
        getSelectedTargetTypeRuleCollection: (state) => (typeId) => {
            if (state.selectedTargetingType) {
                const targetType = state.listOfRuleCollection.find(x => {
                    if (typeId) {
                        return x.targetingTypeId === state.selectedTargetingType.id
                    } else {
                        return x.targetingTypeId === state.selectedTargetingType.id
                    }
                })
                return targetType
            } else return undefined
        },
        // getting selected targeting type free entry options
        getTargetTypeFreeEntry(_state, getters) {
            const targetType = getters.getSelectedTargetTypeRuleCollection
            return targetType ? targetType.freeEntry : false
        },
        // getting selected targeting type rules list
        getTargetTypeRules:(_state, getters) => (typeId) => {
            const targetType = getters.getSelectedTargetTypeRuleCollection(typeId)
            return targetType ? targetType.list : []
        },
        // getting selected target rules of specific or selectedTargetingType
        getSelectedTargetRules: (state, getters) => (typeId) => {
            const rules = getters.getTargetTypeRules(typeId)
            return state.rulesCollection.filter(x => {
                if (typeId) {
                    return x.targetingTypeId === typeId
                } else if (state.selectedTargetingType) {
                    return x.targetingTypeId === state.selectedTargetingType.id
                } else return false
            }).map(x => {
                const rule = rules.find(y => y.id == x.ruleId)
                x.name = rule ? rule.name : ''
                return x
            }).filter(x => x.name)
        }
    },
    modules: {
    }
})
