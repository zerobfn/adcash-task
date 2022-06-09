import Vue from 'vue'
import Vuex from 'vuex'
import { httpGet } from '@/utils/http'
import { RuleCollection, TargetingRule } from '@/models/RuleCollection'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        targetingTypes: [], // static data of targeting types
        selectedTargetingType: undefined, // currect selected targeting type
        ruleCollections: [], // static data of list rule collection
        savedRules: [], // saved rules collection
        downloaded: { // checker for all collections downloaded
            cateogoryCollection: false,
            countryCollection: false,
            deviceCollection: false
        }
    },
    actions: {
        // fetching All Targeting types
        fetchListAllTargetingTypes({ commit, dispatch }) {
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/types',
                onSuccess: json => {
                    commit('setTargetingTypes', json)
                    if (json.length > 0) {
                        commit('setSelectedTargetingType', json[0])
                    }
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    dispatch('fetchCategoryCollection')
                    dispatch('fetchCountryCollection')
                    dispatch('fetchDeviceCollection')
                    dispatch('addUrlKeywordsCollection')
                }
            })
        },
        // fetching list all category targeting types
        fetchCategoryCollection({ state, commit, dispatch }) {
            state.downloaded.cateogoryCollection = false
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/categories',
                onSuccess: json => {
                    commit('addRuleCollection', new RuleCollection(1, json, false))
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    state.downloaded.cateogoryCollection = true
                    dispatch('fetchRulesCollection')
                }
            })
        },
        // fetching list all country targeting types
        fetchCountryCollection({ state, commit, dispatch }) {
            state.downloaded.countryCollection = false
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/countries',
                onSuccess: json => {
                    commit('addRuleCollection', new RuleCollection(2, json, false))
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    state.downloaded.countryCollection = true
                    dispatch('fetchRulesCollection')
                }
            })
        },
        // fetching list all device targeting types
        fetchDeviceCollection({ state, commit, dispatch }) {
            state.downloaded.deviceCollection = false
            httpGet({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/devices',
                onSuccess: json => {
                    commit('addRuleCollection', new RuleCollection(3, json, false))
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    state.downloaded.deviceCollection =  true
                    dispatch('fetchRulesCollection')
                }
            })
        },
        // addting url keywords collection to ruleCollections
        addUrlKeywordsCollection({ commit }) {
            commit('addRuleCollection', new RuleCollection(4, [], true))
        },
        // fetching existing rules collection
        fetchRulesCollection({ state, getters, commit }) {
            if (state.downloaded.cateogoryCollection
                && state.downloaded.countryCollection
                && state.downloaded.deviceCollection) {
                httpGet({
                    url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/rules',
                    onSuccess: json => {
                        json.forEach(x => {
                            const rule = getters.getTargetingTypeRules(x.targeting_type_id).find(y => y.id == x.rule)
                            commit('addTargetingRule', {
                                id: x.id,
                                ruleId: x.rule,
                                name: rule ? rule.name : x.rule,
                                targetingTypeId: x.targeting_type_id,
                                saved: true,
                                deleted: false
                            })
                        })
                    },
                    onError: error => {
                        console.error(error)
                    }
                })
            }
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
            const index = state.ruleCollections.findIndex(x => x.targetingTypeId === collection.targetingTypeId)
            if (index === -1) {
                state.ruleCollections.push(collection)
            }
        },
        // adding targeting rule
        addTargetingRule(state, {id, ruleId, name, targetingTypeId, saved, deleted}) {
            const index = state.savedRules.findIndex(x => {
                return x.ruleId == ruleId && x.targetingTypeId == targetingTypeId
            })
            if (index === -1) {
                state.savedRules.push(new TargetingRule(id, ruleId, name, targetingTypeId, saved, deleted))
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
            return getters.getSelectedTargetingType ? getters.getSelectedTargetingType.id : -1
        },
        // getting selected targeting type name
        getSelectedTargetingTypeName(_state, getters) {
            return getters.getSelectedTargetingType ? getters.getSelectedTargetingType.name : ''
        },
        // getting selected or specific targeting type rule collection
        getTargetingTypeRuleCollection: (state, getters) => (typeId) => {
            return state.ruleCollections.find(x => {
                if (typeId) {
                    return x.targetingTypeId === typeId
                } else {
                    return x.targetingTypeId === getters.getSelectedTargetingTypeId
                }
            })
        },
        // getting selected or specific targeting type free entry options
        getTargetingTypeFreeEntry: (_state, getters) => (typeId) => {
            const targetType = getters.getTargetingTypeRuleCollection(typeId)
            return targetType ? targetType.freeEntry : false
        },
        // getting selected or specific targeting type rules list
        getTargetingTypeRules:(_state, getters) => (typeId) => {
            const targetType = getters.getTargetingTypeRuleCollection(typeId)
            return targetType ? targetType.list : []
        },
        // getting selected target rules of specific or selectedTargetingType
        getSelectedTargetRules: (state, getters) => (typeId) => {
            state.ruleCollections
            getters
            typeId
            return []
            // const rules = getters.getTargetTypeRules(typeId)
            // return state.rulesCollection.filter(x => {
            //     if (typeId) {
            //         return x.targetingTypeId === typeId
            //     } else if (state.selectedTargetingType) {
            //         return x.targetingTypeId === state.selectedTargetingType.id
            //     } else return false
            // }).map(x => {
            //     const rule = rules.find(y => y.id == x.ruleId)
            //     x.name = rule ? rule.name : ''
            //     return x
            // }).filter(x => x.name)
        },
        // getting saved rules
        getSavedRules(state) {
            return state.savedRules
        }
    },
    modules: {
    }
})
