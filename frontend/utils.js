export async function delay(s) {
    return new Promise(res => setTimeout(res, s * 1000));
}

export function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

export function saveIntoLS(key, val) {
    window.localStorage.setItem(key, val);
}

export function loadFromLS(key) {
    return window.localStorage.getItem(key);
}

export function copyToClipboard(text) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

export function getUrlAttr(name) {
    return (window.location.search.match(new RegExp(`${name}=([^&]+)`)) || [])[1];
}

export function upsertUrlAttr(name, value) {
    let url = window.location.href;
    const newParam = `${name}=` + encodeURIComponent(value);
    if (url.indexOf("?") === -1) {
        url += "?" + newParam;
    } else {
        if (url.indexOf(`${name}=`) === -1) {
            url += "&" + newParam;
        } else {
            url = url.replace(new RegExp(`(${name}=)[^&]+`), "$1" + encodeURIComponent(value));
        }
    }
    window.history.replaceState({ path: url }, "", url);
}
