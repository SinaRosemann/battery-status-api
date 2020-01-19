'use strict'
let positive = document.getElementById("battery--positive");
let negative = document.getElementById("battery--negative");
let batteryStatus = document.getElementById("textarea--batterystatus");
let chargingStatus = document.getElementById("textarea--chargingstatus");
let positivepath = document.getElementById("path--positive");
let negativepath = document.getElementById("path--negative");



function loading() {
    chargingStatus.innerHTML = "loading."
    positivepath.style.animation = "loadbatterypos 3s infinite";
    positivepath.style.animationTimingFunction = "linear";
    negativepath.style.animation = "loadbatteryneg 3s infinite";
    negativepath.style.animationTimingFunction = "linear";
}
function notLoading() {
    chargingStatus.innerHTML = "not loading."
    positivepath.style.animation = "usebatterypos 3s infinite";
    positivepath.style.animationTimingFunction = "linear";
    negativepath.style.animation = "usebatteryneg 3s infinite";
    negativepath.style.animationTimingFunction = "linear";
}

// Onload Status
function displayBatteryStatus(battery){
    let charging = battery.charging;
    let startinglevel = (((battery.level) * 100) * 2);

    positive.style.height = startinglevel + "px";
    negative.style.height = ((200 - startinglevel) + "px");
    batteryStatus.innerHTML = ((battery.level) * 100) + "%.";

    if(charging === true){
        loading();

    }else {
        notLoading();
    }
}

// Status after charging Changes
function chargingChangeHandler(ev){
    if(ev.target.charging === true){
        loading();
    }else {
        notLoading();
    }
}

// Status after Charginglevel changes
function levelChangeHandler(ev){
    console.log("level changed")
    let level = (((ev.target.level) * 100) * 2);
    positive.style.height = level + "px";
    negative.style.height = ((200 - level) + "px");

    batteryStatus.innerHTML = ((ev.target.level) * 100) + "%.";
}

// Check if browser supports the API
if ('getBattery' in navigator){
    navigator.getBattery().then(function (battery){
        displayBatteryStatus(battery);
        battery.addEventListener('chargingchange', chargingChangeHandler)
        battery.addEventListener('levelchange', levelChangeHandler)
    });
}else {
    let body = document.querySelector("body").innerHTML = "<p>Your browser does not support the Battery Status API :(</p>";
}





