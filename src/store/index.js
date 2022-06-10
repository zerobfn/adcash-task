import Vue from 'vue'
import Vuex from 'vuex'
import { httpGet, httpPost, httpDelete } from '@/utils/http'
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
        },
        loadingCount: 0 // counts active fetch number
    },
    actions: {
        // fetching All Targeting types
        fetchListAllTargetingTypes({state, commit, dispatch }) {
            state.loadingCount++
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
                    state.loadingCount--
                }
            })
        },
        // fetching list all category targeting types
        fetchCategoryCollection({ state, commit, dispatch }) {
            state.downloaded.cateogoryCollection = false
            state.loadingCount++
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
                    state.loadingCount--
                }
            })
        },
        // fetching list all country targeting types
        fetchCountryCollection({ state, commit, dispatch }) {
            state.downloaded.countryCollection = false
            state.loadingCount++
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
                    state.loadingCount--
                }
            })
        },
        // fetching list all device targeting types
        fetchDeviceCollection({ state, commit, dispatch }) {
            state.downloaded.deviceCollection = false
            state.loadingCount++
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
                    state.loadingCount--
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
                state.loadingCount++
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
                    },
                    doFinally: () => {
                        state.loadingCount--
                    }
                })
            }
        },
        // deleting targeting rules
        deleteTargetingRules({ state, dispatch }, deleteBody) {
            state.loadingCount++
            httpDelete({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/rules',
                body: deleteBody,
                onSuccess: json => {
                    if (json.success) {
                        deleteBody.rules.forEach(x => {
                            const index = state.savedRules.findIndex(y => {
                                return y.targetingTypeId == deleteBody.targeting_type_id && y.id == x
                            })
                            if (index !== -1) {
                                state.savedRules.splice(index, 1)
                            }
                        })
                    }
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    state.loadingCount--
                    dispatch('logSavedRules')
                }
            })
        },
        // adding new targeting rules
        addNewTargetingRules({ state, dispatch }, postBody) {
            state.loadingCount++
            httpPost({
                url: 'https://private-anon-34cadab3c9-adcashdsp.apiary-mock.com/rules',
                body: postBody,
                onSuccess: json => {
                    if (json.success) {
                        json.rules.forEach(x => {
                            const index = state.savedRules.findIndex(y => {
                                return y.targetingTypeId === x.targeting_type_id && y.ruleId == x.rule
                            })
                            if (index !== -1) {
                                state.savedRules[index].id = x.id
                                state.savedRules[index].saved = true
                            }
                        })
                    }
                },
                onError: error => {
                    console.error(error)
                },
                doFinally: () => {
                    state.loadingCount--
                    dispatch('logSavedRules')
                }
            })
        },
        // loging saved rules
        logSavedRules({ state }) {
            if (state.loadingCount === 0) {
                const rules = state.savedRules.map(x => {
                    return {
                        id: x.id,
                        targeting_type_id: x.targetingTypeId,
                        rule: x.ruleId
                    }
                })
                console.log('saved rules', rules)
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
                return x.ruleId == ruleId && x.targetingTypeId == targetingTypeId && x.name == name
            })
            if (index !== -1) {
                if (state.savedRules[index].deleted) {
                    state.savedRules[index].deleted = false
                }
            } else {
                state.savedRules.push(new TargetingRule(id, ruleId, name, targetingTypeId, saved, deleted))
            }
        },
        // deleting targeting rule
        // if it is not saved in the database it remove from array, else prepare for delete by API
        deleteTargetingRule(state, rule) {
            const index = state.savedRules.findIndex(x => x.ruleId == rule.ruleId)
            if (rule.id === null) {
                state.savedRules.splice(index, 1)
            } else {
                state.savedRules[index].deleted = true
            }
        },
        // canceling changes
        cancelChanges(state) {
            state.savedRules = state.savedRules.filter(x => x.id !== null).map(x => {
                x.deleted = false
                return x
            })
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
        // getting saved rules
        getSavedRules(state) {
            return state.savedRules
        },
        // getting loading count
        getLoadingCount(state) {
            return state.loadingCount
        }
    },
    modules: {
    }
})
