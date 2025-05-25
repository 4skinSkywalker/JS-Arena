function solution({intervals, fees, deliveries}) {
    let deliveries_in_interval = new Array(intervals.length).fill(0);

    for (let delivery of deliveries) {
        for (let i = 0; i < intervals.length - 1; i++) {
            if (intervals[i] <= delivery[0] && delivery[0] < intervals[i + 1]) {
                deliveries_in_interval[i]++;
                break;
            }
        }
        if(delivery[0] >= intervals[intervals.length - 1]){
            deliveries_in_interval[deliveries_in_interval.length - 1]++;
        }
    }

    let fee_per_delivery = deliveries_in_interval[0] != 0 ? fees[0] / deliveries_in_interval[0] : 0

    for (let i = 1; i < intervals.length; i++) {
        if (deliveries_in_interval[i] != 0 && fees[i] / deliveries_in_interval[i] != fee_per_delivery) {
            return false;
        }
    }

    return true;
}

module.exports = solution;