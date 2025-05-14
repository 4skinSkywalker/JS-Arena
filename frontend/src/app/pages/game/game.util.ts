export function getFakeClient() {
    return { id: "-1", name: "", rooms: [] };
}

export function getFakeRoom() {
    return { id: "-1", name: "", started: false, host: getFakeClient(), clients: [] };
}