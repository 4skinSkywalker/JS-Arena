export async function delay(s: number) {
    return new Promise(res => setTimeout(res, s * 1000));
}

export function debounce(callback: () => void, wait: number) {
    let timeoutId: any = null;
    return (...args: any[]) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            // @ts-ignore
            callback(...args);
        }, wait);
    };
}

export function saveIntoLS(key: string, val: string) {
    window.localStorage.setItem(key, val);
}

export function loadFromLS(key: string) {
    return window.localStorage.getItem(key);
}

export function copyToClipboard(text: string) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
