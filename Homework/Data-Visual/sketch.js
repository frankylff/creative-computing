let data;
let tempData = [];
let maxYearT = -Infinity;
let minYearT = Infinity;
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


function getTemp(){
    for(let i = 1; i <= 12; i++){
        let month = i < 10? "0" + i: "" + i;
        for(let j = 1; j <= 31; j ++){
            let day = j < 10? "0" + j: "" + j;
            let date = day + "." + month;

            let max = -Infinity;
            let min = Infinity;
            let sum = 0;
            let count = 0;
            let canPush = false;
    
            for(let row of data.rows){
                if(row.get("TIME").startsWith(day + "." + month)){
                    let temp = Number(row.get("T"));
                    canPush = true;
                    sum += temp;
                    count ++;

                    if(temp > max){
                        max = temp;
                    }
                    if(temp < min){
                        min = temp;
                    }
                }
            }

            let mean = sum/count;
            if(canPush){
                tempData.push({date, max, min, mean})
            }

            if(max > maxYearT){
                maxYearT = max;
            }
            if(min < minYearT){
                minYearT = min;
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

        let colorIndex = int(map(temp["mean"], -8, 41, tempColor.length, 0));
        let color = tempColor[colorIndex];
        stroke(color, 50, 90);
        strokeWeight(2);
        noFill();
        
        let lowY = map(temp["min"], -8, 41, 50, 300);
        let highY = map(temp["max"], -8, 41, 50, 300);
        line(0, lowY, 0, highY);

        pop();
    }
}

function draw() {
    displayT();
    noLoop();
}