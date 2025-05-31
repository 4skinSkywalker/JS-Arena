function solution({timestamp, instrument, side, price, size}) {
    var ohlc_data = {};
    
    for (var index=0; index<timestamp.length; index++) {
        var date = new Date(timestamp[index] * 1000);
        var year = date.getUTCFullYear();
        var month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        var day = date.getUTCDate().toString().padStart(2, '0');
        var dateString = "" + year + "-" + month + "-" + day;

        if (!ohlc_data.hasOwnProperty(dateString)) {
                ohlc_data[dateString] = {};
        } 

        if (!ohlc_data[dateString].hasOwnProperty(instrument[index])) {
            ohlc_data[dateString][instrument[index]] = [null, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, null];
        }

        if (ohlc_data[dateString][instrument[index]][0] == null) {
            ohlc_data[dateString][instrument[index]][0] = price[index].toFixed(2);
        }

        ohlc_data[dateString][instrument[index]][1] = Math.max(ohlc_data[dateString][instrument[index]][1], price[index]).toFixed(2);
        ohlc_data[dateString][instrument[index]][2] = Math.min(ohlc_data[dateString][instrument[index]][2], price[index]).toFixed(2);
        ohlc_data[dateString][instrument[index]][3] = price[index].toFixed(2);
    }

    var output = [];
    for (var date in ohlc_data) {
        for (var inst in ohlc_data[date]) {
            output.push([date, inst].concat(ohlc_data[date][inst]));
        }
    }

    output.sort(function(a, b) {
        return a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : (a[0] < b[0] ? -1 : 1);
    });

    return output;
}

module.exports = solution;