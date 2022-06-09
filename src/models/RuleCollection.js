export class RuleCollection {
    constructor(targetingTypeId, list, freeEntry) {
        this.targetingTypeId = targetingTypeId
        this.list = list
        this.freeEntry = freeEntry
    }
}

export class TargetingRule {
    constructor(id, ruleId, name, targetingTypeId, saved, deleted) {
        this.id = id
        this.ruleId = ruleId
        this.name = name
        this.targetingTypeId = targetingTypeId
        this.saved = saved
        this.deleted = deleted
    }
}