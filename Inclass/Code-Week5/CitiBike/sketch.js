const date = "2023-11-06";
let currentTime;
let data;
let maxLat, maxLng, minLat, minLng;
let stations = [];
let trips = [];

function preload() {
    data = loadJSON('./data/2023-11-06.json')
}

function setup() {
    createCanvas(600, 600);
    
    const lats = data.stations.map(station => station.lat);
    maxLat = Math.max(...lats);
    maxLng = Math.max(...data.stations.map ( station => station.lng ));
    minLat = Math.min(...lats);
    minLng = Math.min(...data.stations.map ( station => station.lng ));

    data.stations.forEach( s => {
        const station = new Station(s);
        stations.push(station);
    })

    currentTime = data.trips[0].st;
    maxTime = data.trips[data.trips.length-1].et;

    console.log('stations:', data.stations.length);
    console.log(maxLat, maxLng, minLat, minLng);

    data.trips.forEach( t => {
        const trip = new Trip(t);
        trips.push(trip);
    })
}

function draw() {
    background(200);

    currentTime += 60000;
    const time = new Date(currentTime);
    const timeStr = formatAMPM(time);
    fill(0);
    text(timeStr, 25, 25);

    stations.forEach( s => {
        s.display();
    })
  trips.forEach( t => {
        t.display(currentTime);
    })
} 

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }