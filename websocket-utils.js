const globalRooms = {};
const globalClients = {};

function getUid() {
    return Math.random().toString(36).substring(2, 15);
}

function parseMsg(message) {
    const MAX_SIZE = 1024 * 100; // Max 100KB

    if (message.length > MAX_SIZE) {
        throw new Error("Message too big");
    }

    return JSON.parse(Buffer.from(message).toString("utf-8"));
}

function checkString(map) {
    for (const [key, val] of Object.entries(map)) {
        if (!val || typeof val !== "string") {
            throw new Error(`Invalid string value ${val} of field ${key}`);
        }
    }
}

function latinize(a) {
    const o = { Á: "A", Ă: "A", Ắ: "A", Ặ: "A", Ằ: "A", Ẳ: "A", Ẵ: "A", Ǎ: "A", Â: "A", Ấ: "A", Ậ: "A", Ầ: "A", Ẩ: "A", Ẫ: "A", Ä: "A", Ǟ: "A", Ȧ: "A", Ǡ: "A", Ạ: "A", Ȁ: "A", À: "A", Ả: "A", Ȃ: "A", Ā: "A", Ą: "A", Å: "A", Ǻ: "A", Ḁ: "A", Ⱥ: "A", Ã: "A", Ꜳ: "AA", Æ: "AE", Ǽ: "AE", Ǣ: "AE", Ꜵ: "AO", Ꜷ: "AU", Ꜹ: "AV", Ꜻ: "AV", Ꜽ: "AY", Ḃ: "B", Ḅ: "B", Ɓ: "B", Ḇ: "B", Ƀ: "B", Ƃ: "B", Ć: "C", Č: "C", Ç: "C", Ḉ: "C", Ĉ: "C", Ċ: "C", Ƈ: "C", Ȼ: "C", Ď: "D", Ḑ: "D", Ḓ: "D", Ḋ: "D", Ḍ: "D", Ɗ: "D", Ḏ: "D", ǲ: "D", ǅ: "D", Đ: "D", Ð: "D", Ƌ: "D", Ǳ: "DZ", Ǆ: "DZ", É: "E", Ĕ: "E", Ě: "E", Ȩ: "E", Ḝ: "E", Ê: "E", Ế: "E", Ệ: "E", Ề: "E", Ể: "E", Ễ: "E", Ḙ: "E", Ë: "E", Ė: "E", Ẹ: "E", Ȅ: "E", È: "E", Ẻ: "E", Ȇ: "E", Ē: "E", Ḗ: "E", Ḕ: "E", Ę: "E", Ɇ: "E", Ẽ: "E", Ḛ: "E", Ꝫ: "ET", Ḟ: "F", Ƒ: "F", Ǵ: "G", Ğ: "G", Ǧ: "G", Ģ: "G", Ĝ: "G", Ġ: "G", Ɠ: "G", Ḡ: "G", Ǥ: "G", Ḫ: "H", Ȟ: "H", Ḩ: "H", Ĥ: "H", Ⱨ: "H", Ḧ: "H", Ḣ: "H", Ḥ: "H", Ħ: "H", Í: "I", Ĭ: "I", Ǐ: "I", Î: "I", Ï: "I", Ḯ: "I", İ: "I", Ị: "I", Ȉ: "I", Ì: "I", Ỉ: "I", Ȋ: "I", Ī: "I", Į: "I", Ɨ: "I", Ĩ: "I", Ḭ: "I", І: "I", Ꝺ: "D", Ꝼ: "F", Ᵹ: "G", Ꞃ: "R", Ꞅ: "S", Ꞇ: "T", Ꝭ: "IS", Ĵ: "J", Ɉ: "J", Ḱ: "K", Ǩ: "K", Ķ: "K", Ⱪ: "K", Ꝃ: "K", Ḳ: "K", Ƙ: "K", Ḵ: "K", Ꝁ: "K", Ꝅ: "K", Ĺ: "L", Ƚ: "L", Ľ: "L", Ļ: "L", Ḽ: "L", Ḷ: "L", Ḹ: "L", Ⱡ: "L", Ꝉ: "L", Ḻ: "L", Ŀ: "L", Ɫ: "L", ǈ: "L", Ł: "L", Ǉ: "LJ", Ḿ: "M", Ṁ: "M", Ṃ: "M", Ɱ: "M", Ń: "N", Ň: "N", Ņ: "N", Ṋ: "N", Ṅ: "N", Ṇ: "N", Ǹ: "N", Ɲ: "N", Ṉ: "N", Ƞ: "N", ǋ: "N", Ñ: "N", Ǌ: "NJ", Ó: "O", Ŏ: "O", Ǒ: "O", Ô: "O", Ố: "O", Ộ: "O", Ồ: "O", Ổ: "O", Ỗ: "O", Ö: "O", Ȫ: "O", Ȯ: "O", Ȱ: "O", Ọ: "O", Ő: "O", Ȍ: "O", Ò: "O", Ỏ: "O", Ơ: "O", Ớ: "O", Ợ: "O", Ờ: "O", Ở: "O", Ỡ: "O", Ȏ: "O", Ꝋ: "O", Ꝍ: "O", Ō: "O", Ṓ: "O", Ṑ: "O", Ɵ: "O", Ǫ: "O", Ǭ: "O", Ø: "O", Ǿ: "O", Õ: "O", Ṍ: "O", Ṏ: "O", Ȭ: "O", Ƣ: "OI", Ꝏ: "OO", Ɛ: "E", Ɔ: "O", Ȣ: "OU", Ṕ: "P", Ṗ: "P", Ꝓ: "P", Ƥ: "P", Ꝕ: "P", Ᵽ: "P", Ꝑ: "P", Ꝙ: "Q", Ꝗ: "Q", Ŕ: "R", Ř: "R", Ŗ: "R", Ṙ: "R", Ṛ: "R", Ṝ: "R", Ȑ: "R", Ȓ: "R", Ṟ: "R", Ɍ: "R", Ɽ: "R", Ꜿ: "C", Ǝ: "E", Ś: "S", Ṥ: "S", Š: "S", Ṧ: "S", Ş: "S", Ŝ: "S", Ș: "S", Ṡ: "S", Ṣ: "S", Ṩ: "S", ß: "ss", Ť: "T", Ţ: "T", Ṱ: "T", Ț: "T", Ⱦ: "T", Ṫ: "T", Ṭ: "T", Ƭ: "T", Ṯ: "T", Ʈ: "T", Ŧ: "T", Ɐ: "A", Ꞁ: "L", Ɯ: "M", Ʌ: "V", Ꜩ: "TZ", Ú: "U", Ŭ: "U", Ǔ: "U", Û: "U", Ṷ: "U", Ü: "U", Ǘ: "U", Ǚ: "U", Ǜ: "U", Ǖ: "U", Ṳ: "U", Ụ: "U", Ű: "U", Ȕ: "U", Ù: "U", Ủ: "U", Ư: "U", Ứ: "U", Ự: "U", Ừ: "U", Ử: "U", Ữ: "U", Ȗ: "U", Ū: "U", Ṻ: "U", Ų: "U", Ů: "U", Ũ: "U", Ṹ: "U", Ṵ: "U", Ꝟ: "V", Ṿ: "V", Ʋ: "V", Ṽ: "V", Ꝡ: "VY", Ẃ: "W", Ŵ: "W", Ẅ: "W", Ẇ: "W", Ẉ: "W", Ẁ: "W", Ⱳ: "W", Ẍ: "X", Ẋ: "X", Ý: "Y", Ŷ: "Y", Ÿ: "Y", Ẏ: "Y", Ỵ: "Y", Ỳ: "Y", Ƴ: "Y", Ỷ: "Y", Ỿ: "Y", Ȳ: "Y", Ɏ: "Y", Ỹ: "Y", Ї: "YI", Ź: "Z", Ž: "Z", Ẑ: "Z", Ⱬ: "Z", Ż: "Z", Ẓ: "Z", Ȥ: "Z", Ẕ: "Z", Ƶ: "Z", Þ: "TH", Ĳ: "IJ", Œ: "OE", ᴀ: "A", ᴁ: "AE", ʙ: "B", ᴃ: "B", ᴄ: "C", ᴅ: "D", ᴇ: "E", ꜰ: "F", ɢ: "G", ʛ: "G", ʜ: "H", ɪ: "I", ʁ: "R", ᴊ: "J", ᴋ: "K", ʟ: "L", ᴌ: "L", ᴍ: "M", ɴ: "N", ᴏ: "O", ɶ: "OE", ᴐ: "O", ᴕ: "OU", ᴘ: "P", ʀ: "R", ᴎ: "N", ᴙ: "R", ꜱ: "S", ᴛ: "T", ⱻ: "E", ᴚ: "R", ᴜ: "U", ᴠ: "V", ᴡ: "W", ʏ: "Y", ᴢ: "Z", á: "a", ă: "a", ắ: "a", ặ: "a", ằ: "a", ẳ: "a", ẵ: "a", ǎ: "a", â: "a", ấ: "a", ậ: "a", ầ: "a", ẩ: "a", ẫ: "a", ä: "a", ǟ: "a", ȧ: "a", ǡ: "a", ạ: "a", ȁ: "a", à: "a", ả: "a", ȃ: "a", ā: "a", ą: "a", ᶏ: "a", ẚ: "a", å: "a", ǻ: "a", ḁ: "a", ⱥ: "a", ã: "a", ꜳ: "aa", æ: "ae", ǽ: "ae", ǣ: "ae", ꜵ: "ao", ꜷ: "au", ꜹ: "av", ꜻ: "av", ꜽ: "ay", ḃ: "b", ḅ: "b", ɓ: "b", ḇ: "b", ᵬ: "b", ᶀ: "b", ƀ: "b", ƃ: "b", ɵ: "o", ć: "c", č: "c", ç: "c", ḉ: "c", ĉ: "c", ɕ: "c", ċ: "c", ƈ: "c", ȼ: "c", ď: "d", ḑ: "d", ḓ: "d", ȡ: "d", ḋ: "d", ḍ: "d", ɗ: "d", ᶑ: "d", ḏ: "d", ᵭ: "d", ᶁ: "d", đ: "d", ɖ: "d", ƌ: "d", ð: "d", ı: "i", ȷ: "j", ɟ: "j", ʄ: "j", ǳ: "dz", ǆ: "dz", é: "e", ĕ: "e", ě: "e", ȩ: "e", ḝ: "e", ê: "e", ế: "e", ệ: "e", ề: "e", ể: "e", ễ: "e", ḙ: "e", ë: "e", ė: "e", ẹ: "e", ȅ: "e", è: "e", ẻ: "e", ȇ: "e", ē: "e", ḗ: "e", ḕ: "e", ⱸ: "e", ę: "e", ᶒ: "e", ɇ: "e", ẽ: "e", ḛ: "e", ꝫ: "et", ḟ: "f", ƒ: "f", ᵮ: "f", ᶂ: "f", ǵ: "g", ğ: "g", ǧ: "g", ģ: "g", ĝ: "g", ġ: "g", ɠ: "g", ḡ: "g", ᶃ: "g", ǥ: "g", ḫ: "h", ȟ: "h", ḩ: "h", ĥ: "h", ⱨ: "h", ḧ: "h", ḣ: "h", ḥ: "h", ɦ: "h", ẖ: "h", ħ: "h", ƕ: "hv", í: "i", ĭ: "i", ǐ: "i", î: "i", ï: "i", ḯ: "i", ị: "i", ȉ: "i", ì: "i", ỉ: "i", ȋ: "i", ī: "i", į: "i", ᶖ: "i", ɨ: "i", ĩ: "i", ḭ: "i", і: "i", ꝺ: "d", ꝼ: "f", ᵹ: "g", ꞃ: "r", ꞅ: "s", ꞇ: "t", ꝭ: "is", ǰ: "j", ĵ: "j", ʝ: "j", ɉ: "j", ḱ: "k", ǩ: "k", ķ: "k", ⱪ: "k", ꝃ: "k", ḳ: "k", ƙ: "k", ḵ: "k", ᶄ: "k", ꝁ: "k", ꝅ: "k", ĺ: "l", ƚ: "l", ɬ: "l", ľ: "l", ļ: "l", ḽ: "l", ȴ: "l", ḷ: "l", ḹ: "l", ⱡ: "l", ꝉ: "l", ḻ: "l", ŀ: "l", ɫ: "l", ᶅ: "l", ɭ: "l", ł: "l", ǉ: "lj", ſ: "s", ẜ: "s", ẛ: "s", ẝ: "s", ḿ: "m", ṁ: "m", ṃ: "m", ɱ: "m", ᵯ: "m", ᶆ: "m", ń: "n", ň: "n", ņ: "n", ṋ: "n", ȵ: "n", ṅ: "n", ṇ: "n", ǹ: "n", ɲ: "n", ṉ: "n", ƞ: "n", ᵰ: "n", ᶇ: "n", ɳ: "n", ñ: "n", ǌ: "nj", ó: "o", ŏ: "o", ǒ: "o", ô: "o", ố: "o", ộ: "o", ồ: "o", ổ: "o", ỗ: "o", ö: "o", ȫ: "o", ȯ: "o", ȱ: "o", ọ: "o", ő: "o", ȍ: "o", ò: "o", ỏ: "o", ơ: "o", ớ: "o", ợ: "o", ờ: "o", ở: "o", ỡ: "o", ȏ: "o", ꝋ: "o", ꝍ: "o", ⱺ: "o", ō: "o", ṓ: "o", ṑ: "o", ǫ: "o", ǭ: "o", ø: "o", ǿ: "o", õ: "o", ṍ: "o", ṏ: "o", ȭ: "o", ƣ: "oi", ꝏ: "oo", ɛ: "e", ᶓ: "e", ɔ: "o", ᶗ: "o", ȣ: "ou", ṕ: "p", ṗ: "p", ꝓ: "p", ƥ: "p", ᵱ: "p", ᶈ: "p", ꝕ: "p", ᵽ: "p", ꝑ: "p", ꝙ: "q", ʠ: "q", ɋ: "q", ꝗ: "q", ŕ: "r", ř: "r", ŗ: "r", ṙ: "r", ṛ: "r", ṝ: "r", ȑ: "r", ɾ: "r", ᵳ: "r", ȓ: "r", ṟ: "r", ɼ: "r", ᵲ: "r", ᶉ: "r", ɍ: "r", ɽ: "r", ↄ: "c", ꜿ: "c", ɘ: "e", ɿ: "r", ś: "s", ṥ: "s", š: "s", ṧ: "s", ş: "s", ŝ: "s", ș: "s", ṡ: "s", ṣ: "s", ṩ: "s", ʂ: "s", ᵴ: "s", ᶊ: "s", ȿ: "s", ɡ: "g", ᴑ: "o", ᴓ: "o", ᴝ: "u", ť: "t", ţ: "t", ṱ: "t", ț: "t", ȶ: "t", ẗ: "t", ⱦ: "t", ṫ: "t", ṭ: "t", ƭ: "t", ṯ: "t", ᵵ: "t", ƫ: "t", ʈ: "t", ŧ: "t", ᵺ: "th", ɐ: "a", ᴂ: "ae", ǝ: "e", ᵷ: "g", ɥ: "h", ʮ: "h", ʯ: "h", ᴉ: "i", ʞ: "k", ꞁ: "l", ɯ: "m", ɰ: "m", ᴔ: "oe", ɹ: "r", ɻ: "r", ɺ: "r", ⱹ: "r", ʇ: "t", ʌ: "v", ʍ: "w", ʎ: "y", ꜩ: "tz", ú: "u", ŭ: "u", ǔ: "u", û: "u", ṷ: "u", ü: "u", ǘ: "u", ǚ: "u", ǜ: "u", ǖ: "u", ṳ: "u", ụ: "u", ű: "u", ȕ: "u", ù: "u", ủ: "u", ư: "u", ứ: "u", ự: "u", ừ: "u", ử: "u", ữ: "u", ȗ: "u", ū: "u", ṻ: "u", ų: "u", ᶙ: "u", ů: "u", ũ: "u", ṹ: "u", ṵ: "u", ᵫ: "ue", ꝸ: "um", ⱴ: "v", ꝟ: "v", ṿ: "v", ʋ: "v", ᶌ: "v", ⱱ: "v", ṽ: "v", ꝡ: "vy", ẃ: "w", ŵ: "w", ẅ: "w", ẇ: "w", ẉ: "w", ẁ: "w", ⱳ: "w", ẘ: "w", ẍ: "x", ẋ: "x", ᶍ: "x", ý: "y", ŷ: "y", ÿ: "y", ẏ: "y", ỵ: "y", ỳ: "y", ƴ: "y", ỷ: "y", ỿ: "y", ȳ: "y", ẙ: "y", ɏ: "y", ỹ: "y", ї: "yi", ź: "z", ž: "z", ẑ: "z", ʑ: "z", ⱬ: "z", ż: "z", ẓ: "z", ȥ: "z", ẕ: "z", ᵶ: "z", ᶎ: "z", ʐ: "z", ƶ: "z", ɀ: "z", þ: "th", ﬀ: "ff", ﬃ: "ffi", ﬄ: "ffl", ﬁ: "fi", ﬂ: "fl", ĳ: "ij", œ: "oe", ﬆ: "st", ₐ: "a", ₑ: "e", ᵢ: "i", ⱼ: "j", ₒ: "o", ᵣ: "r", ᵤ: "u", ᵥ: "v", ₓ: "x", Ё: "YO", Й: "I", Ц: "TS", У: "U", К: "K", Е: "E", Н: "N", Г: "G", Ґ: "G", Ш: "SH", Щ: "SCH", З: "Z", Х: "H", Ъ: "'", ё: "yo", й: "i", ц: "ts", у: "u", к: "k", е: "e", н: "n", г: "g", ґ: "g", ш: "sh", щ: "sch", з: "z", х: "h", ъ: "'", Ф: "F", Ы: "I", В: "V", А: "a", П: "P", Р: "R", О: "O", Л: "L", Д: "D", Ж: "ZH", Э: "E", ф: "f", ы: "i", в: "v", а: "a", п: "p", р: "r", о: "o", л: "l", д: "d", ж: "zh", э: "e", Я: "Ya", Ч: "CH", С: "S", М: "M", И: "I", Т: "T", Ь: "'", Б: "B", Ю: "YU", я: "ya", ч: "ch", с: "s", м: "m", и: "i", т: "t", ь: "'", б: "b", ю: "yu" };
    return a.replace(/[^A-Za-z0-9_\s]/g, a => o[a] || "*");
}

class Client {
    constructor(ws) {
        this.ws = ws;
        ws.on("message", msg => this.handleMessage(ws, msg));
        ws.on("close", () => this.handleClose(ws));

        this.id = getUid();
        this.name = "Anonymous";
        this.rooms = {};
        globalClients[this.id] = this;
    }

    sendMsg(topic, message) {
        this.ws.send(JSON.stringify({ topic, message }));
    }

    handleClientInfoReceived(message) {
        const { name } = message;
        console.log("Client info received", name);

        this.name = name;

        for (client of Object.values(globalClients)) {
            client.handleListClients();
        }
    }

    handlePing(clientId) {
        console.log("Ping received from", clientId);
        this.sendMsg("pong");
    }
    
    handleChat(message) {
        const { roomId, text } = message;
        console.log(this.id, "sent chat message", text);

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        checkString({ text });
    
        for (const client of this.rooms[roomId].clients) {
            client.sendMsg(
                "chatReceived",
                {
                    client: this.toJSON(),
                    name: this.name,
                    text
                }
            );
        }
    }
    
    handleProgress(message) {
        const { roomId, clientId, numOfProblemsSolved } = message;
        console.log(this.id, "sent progress", numOfProblemsSolved);

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }
    
        checkString({ numOfProblemsSolved });

        if (clientId) {
            // The data has to be sent to a specific client
            const client = this.rooms[roomId].clients.find(c => c.clientId === clientId);
            if (client) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[roomId].toJSON(),
                    client: this.toJSON(),
                    numOfProblemsSolved
                });
            }
        } else {
            // The data has to be sent to all clients
            for (const client of Object.values(this.rooms[roomId].clients)) {
                client.sendMsg("progressReceived", {
                    room: this.rooms[roomId].toJSON(),
                    client: this.toJSON(),
                    numOfProblemsSolved
                });
            }
        }
    }

    handleListClients() {
        this.sendMsg("clientListed", {
            rooms: Object.values(globalClients).map(item => item.toJSON())
        });
    }
    
    handleListRooms() {
        this.sendMsg("roomsListed", {
            rooms: Object.values(globalRooms).map(item => item.toJSON())
        });
    }

    handleCreateRoom(message) {
        const { name } = message;
        console.log("Creating room", name);

        const room = new Room(name);
        room.host = this;
        this.sendMsg("roomCreated", {
            room: room.toJSON()
        });

        this.handleListRooms();
    }

    handleJoinRoom(message) {
        const { roomId } = message;

        if (!globalRooms[roomId]) {
            return console.error("Room not defined");
        }
        
        console.log("User joining room", roomId);

        globalRooms[roomId].addClient(this);
        for (const client of Object.values(globalRooms[roomId].clients)) {
            client.sendMsg("clientJoinedRoom", {
                room: globalRooms[roomId].toJSON(),
                client: this.toJSON()
            });
        }

        this.handleListRooms();
    }

    handleRoomStatus(message) {
        const { roomId } = message;

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        console.log("Room status of room", roomId);

        this.sendMsg("roomStatusReceived", {
            room: this.rooms[roomId].toJSON()
        });
    }

    handleStartGame(message) {
        const { roomId } = message;

        if (!this.rooms[roomId]) {
            return console.error("Room not defined");
        }

        if (!this.rooms[roomId].clients[this.id]) {
            return console.error("Client not in room");
        }

        if (this.rooms[roomId].host !== this) {
            return console.error("Only the host can start the game");
        }

        console.log("Game starting in room", roomId);

        this.rooms[roomId].started = true;
        for (const client of Object.values(this.rooms[roomId].clients)) {
            client.sendMsg("gameStarted", {
                room: this.rooms[roomId].toJSON()
            });
        }

        this.handleListRooms();
    }

    handleMessage(messageWrap) {
        const { topic, message } = parseMsg(messageWrap);
        console.log(topic, message);
    
        switch (topic) {
            case "clientInfoReceived": {
                handleClientInfoReceived(message);
                break;
            }
            case "ping": {
                handlePing(message);
                break;
            }
            case "chat": {
                handleChat(message);
                break;
            }
            case "progress": {
                handleProgress(message);
                break;
            }
            case "listClients": {
                handleListClients();
                break;
            }
            case "listRooms": {
                handleListRooms();
                break;
            }
            case "createRoom": {
                handleCreateRoom(message);
                break;
            }
            case "joinRoom": {
                handleJoinRoom(message);
                break;
            }
            case "roomStatus": {
                handleRoomStatus(message);
                break;
            }
            case "startGame": {
                handleStartGame(message);
                break;
            }
            default: {
                console.log("Unknown topic", topic);
            }
        }
    }

    handleClose() {
        for (const room of Object.values(this.rooms)) {
            console.log(this.id, "is leaving room", room.id);

            if (room.removeClient(this)) {
                for (const client of this.room.clients) {
                    client.sendMsg("clientLeftRoom", {
                        client: this.toJSON()
                    });
                }
            }
        
            this.room.deleteFromGlobal();
        }

        delete globalClients[this.id];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            rooms: Object.values(this.rooms).map(item => item.toJSON())
        };
    }
}

class Room {
    constructor(name, client) {
        this.id = getUid();
        this.name = name;
        this.started = false;
        this.host = client;
        this.clients = {
            [client.id]: client
        };
        globalRooms[this.id] = this;
    }

    addClient(client) {
        if (this.clients[client.id]) {
            return console.error("Client already in room");
        }

        this.clients[this.client.id] = client;
    }

    removeClient(client) {
        if (!this.clients[client.id]) {
            return false;
        }

        delete this.clients[client.id];
        return true;
    }

    deleteFromGlobal() {
        if (Object.keys(this.clients).length) {
            return console.error("Cannot destroy room", this.id, "with clients in it");
        }

        delete globalRooms[roomId];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            started: this.started,
            host: this.host.name,
            clients: Object.values(this.clients).map(item => item.toJSON())
        };
    }
}

function setClientInfo(client) {
    client.sendMsg("setClientInfo");
}

function handleConnection(ws) {
    const client = new Client(ws);
    console.log("Client connected", client.id);

    setClientInfo(client);
}

module.exports = {
    handleConnection
};