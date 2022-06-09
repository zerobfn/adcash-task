<template>
    <div class="SavedRules">
        <h4>Saved targeting rules</h4>
        <table>
            <tr>
                <th>Types</th>
                <th>Rules</th>
                <th>Actions</th>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'SavedRules'
}
</script>

<style lang="scss" scoped>
.SavedRules {
    padding: 0 16px 16px 16px;
    border: 1px solid #1C1C1C;
    border-radius: 2px;
}
table, tr {
    border: 1px solid #1c1c1c;
}
</style>