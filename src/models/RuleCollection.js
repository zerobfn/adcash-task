export class RuleCollection {
    constructor(targetingTypeId, list, freeEntry) {
        this.targetingTypeId = targetingTypeId
        this.list = list
        this.freeEntry = freeEntry
    }
}

export class TargetingRule {
    constructor(id, ruleId, targetingTypeId, saved) {
        this.id = id
        this.ruleId = ruleId
        this.targetingTypeId = targetingTypeId
        this.saved = saved
    }
}