class Station {
    constructor(station) {
        this.id = stations.id;
        this.y = map(station.lat, minLat, maxLat, 0, width);
        this.x = map(station.lng, minLng, maxLng, height, 0);
    }

    display(){
        fill(150);
        noStroke();
        circle(this.x, this.y, 5);
    }
}