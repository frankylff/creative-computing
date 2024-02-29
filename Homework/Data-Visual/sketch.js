let tempData = [];
let data;
let maxYearT = -Infinity;
let minYearT = Infinity;
let tempColor;

function preload(){
    data = loadTable("Data/ZhengzhouWeather.csv", "header");
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

function setup() {
    createCanvas(800, 800)
    getTemp();
    getTempColor();
    displayT();
}

function draw() {
}