class Trip {
    constructor(trip){
        this.startStation = stations.find( s => s.id === trip.start_station_id );
        this.endStation = stations.find( s => s.id === trip.end_station_id);
    }

    display(time) {
        if (time > this.startTime && time < this.endTime) {
            const progress = map(time, this.startTime, this.endTime, 0, 1);
            this.x = lerp(this.startStation.x, this.endStation.x, progress);
            this.y = lerp(this.startStation.y, this.endStation.y, progress);
            noStroke();
            fill(0, 0, 255);
            circle(this.x, this.y, 5)
        }
    }
}