let data;
let tempData = [];
let rainData = [];
let maxYearT = -Infinity;
let minYearT = Infinity;
let maxYearR = -Infinity;
let minYearR = Infinity;
let tempColor = [];

function preload(){
    data = loadTable("Data/ZhengzhouWeather.csv", "header");
}

function setup() {
    createCanvas(600, 600)
    getTemp();
    getRain()
    getTempColor();
}

function getRain(){
    for(let i = 1; i <= 12; i++){
        let month = i < 10? "0" + i: "" + i;
        for(let j = 1; j <= 31; j ++){
            let day = j < 10? "0" + j: "" + j;
            let date = day + "." + month;

            let maxR = -Infinity;
            let minR = Infinity;
            let sumR = 0;
            let count = 0;
            let canPush = false;
    
            for(let row of data.rows){
                if(row.get("TIME").startsWith(day + "." + month)){
                    let rain = Number(row.get("RRR"));
                    canPush = true;
                    if(!isNaN(rain)){
                        sumR += rain;
                        count ++;
                        if(rain > maxR){
                        maxR = rain;
                        }
                        if(rain < minR){
                        minR = rain;
                        }
                    }
                }
            }

            let meanR = sumR/count;
            if(canPush){
                rainData.push({date, maxR, minR, meanR})
            }

            if(maxR > maxYearR){
                maxYearR = maxR;
            }
            if(minR < minYearR){
                minYearR = minR;
            }
        }
    }
}

function getTemp(){
    for(let i = 1; i <= 12; i++){
        let month = i < 10? "0" + i: "" + i;
        for(let j = 1; j <= 31; j ++){
            let day = j < 10? "0" + j: "" + j;
            let date = day + "." + month;

            let maxT = -Infinity;
            let minT = Infinity;
            let sumT = 0;
            let count = 0;
            let canPush = false;
    
            for(let row of data.rows){
                if(row.get("TIME").startsWith(day + "." + month)){
                    let temp = Number(row.get("T"));
                    canPush = true;
                    sumT += temp;
                    count ++;

                    if(temp > maxT){
                        maxT = temp;
                    }
                    if(temp < minT){
                        minT = temp;
                    }
                }
            }

            let meanT = sumT/count;
            if(canPush){
                tempData.push({date, maxT, minT, meanT})
            }

            if(maxT > maxYearT){
                maxYearT = maxT;
            }
            if(minT < minYearT){
                minYearT = minT;
            }
        }
    }
}

function getTempColor(){
    colorMode(HSB, 360, 100, 100, 100);
    for(let i = -20; i < 250;){
        tempColor.push((i + 360) % 360);
        if(i > 20 && i < 180){
            i += 3;
        }
        i++;
    }
}

function displayT(){
    for(let i = 0; i < tempData.length; i++){
        let temp = tempData[i];

        push();
        translate(width/2, height/2);

        let angle = map(i, 0, tempData.length, 0, TWO_PI);
        rotate(angle);

        let colorIndex = int(map(temp["meanT"], -8, 41, tempColor.length, 0));
        let color = tempColor[colorIndex];
        stroke(color, 50, 90);
        strokeWeight(2);
        noFill();
        
        let lowY = map(temp["minT"], -8, 41, 50, 300);
        let highY = map(temp["maxT"], -8, 41, 50, 300);
        line(0, lowY, 0, highY);

        pop();
    }
}

function displayR(){
    for(let i = 0; i < rainData.length; i++){
        let rain = rainData[i];
        let r = map(Number(rain["meanR"]), 0, 65, 0, 50);

        if(r>2){
            let temp = tempData[i];
            let angle = map(i, 0, tempData.length, 0, TWO_PI);
            let locY = map(temp["meanT"], -8, 41, 100, 300)

            push();
            translate(width/2, height/2);
            rotate(angle);
            noStroke();
            fill(220, 80, 80, 30);
            circle(0, locY, r*2);
            pop();
        }
    }
}

function draw() {
    displayT();
    displayR();
    noLoop();
}