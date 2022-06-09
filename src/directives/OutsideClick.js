
const directive = {
    inserted(el, node) {
        el.ClickOutsideEvent = event => {
            const path = event.path || (event.composedPath && event.composedPath())
            if (path) {
                const result = node.value.except ?
                    path.find(x => x.id === node.value.except) :
                    path.find(x => x === el)
                if (!result) {
                    node.value.callback()
                }
            }
        }
        document.body.addEventListener('click', el.ClickOutsideEvent)
    },
    unbind(el) {
        document.body.removeEventListener('click', el.ClickOutsideEvent)
    }
}

export default directive