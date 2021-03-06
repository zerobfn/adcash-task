export const httpGet = ({
    url,
    onSuccess,
    onError,
    doFinally
}) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch(url, {
        method: 'GET',
        headers
    }).then(response => response.json())
    .then(json => {
        onSuccess(json)
    }).catch(error => {
        if (onError) onError(error)
    }).finally(() => {
        if (doFinally) doFinally()
    })
}

export const httpPost = ({
    url,
    body,
    onSuccess,
    onError,
    doFinally
}) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const stringifiedJson = JSON.stringify(body)
    fetch(url, {
        method: 'POST',
        headers,
        body: stringifiedJson
    }).then(response => response.json())
    .then(json => {
        onSuccess(json)
    }).catch(error => {
        if (onError) onError(error)
    }).finally(() => {
        if (doFinally) doFinally()
    })
}

export const httpDelete = ({
    url,
    body,
    onSuccess,
    onError,
    doFinally
}) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const stringifiedJson = body ? JSON.stringify(body) : null
    fetch(url, {
        method: 'DELETE',
        headers,
        body: stringifiedJson
    }).then(response => response.json())
    .then(json => {
        if (onSuccess) onSuccess(json)
    }).catch(error => {
        if (onError) onError(error)
    }).finally(() => {
        if (doFinally) doFinally()
    })
}