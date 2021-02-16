let mouseInSketch = false;

function inSketch(){
    return mouseInSketch;
}

document.body.addEventListener("mousemove", (event) => {  
    if(event.x < width && event.y < height){
        mouseInSketch = true;
    }
    else {
        mouseInSketch = false;
    }
    console.log("mouseInSketch", mouseInSketch);
});

function inAddMode(){
    if(mode == "add"){
        return true;
    }
}

function inSubdivideMode(){
    if(mode == "subdivide"){
        return true;
    }
}

function inFillMode(){
    if(mode == "fill"){
        return true;
    }
}

function inAutoMode(){
    if(mode == "auto"){
        return true;
    }
    else {
        return false;
    }
}

function inAutoAdd(){
    if(document.getElementById("automateAdd").checked == true){
        return true;
    }
}

function getAutoAddProbability() {
    return document.getElementById("automateAddProbability").valueAsNumber/100;
}

function inAutoSubdivide(){
    if(document.getElementById("automateSubdivide").checked == true){
        return true;
    }
}

function getAutoSubdivideProbability() {
    return document.getElementById("automateSubdivideProbability").valueAsNumber/100;
}

function inAutoFill(){
    if(document.getElementById("automateFill").checked == true){
        return true;
    }
}

function getAutoFillProbability() {
    return document.getElementById("automateFillProbability").valueAsNumber/100;
}

function getAutoSpeed(){
    return  document.getElementById("automateSpeed").valueAsNumber;
}


function getFill(){
    return document.getElementById("fillColor").value;
}

function hasStroke(){
    if(document.getElementById("stroke").checked){
        return true;
    }
    else {
        false;
    }
}

function getStrokeWidth(){
    return document.getElementById("strokeWidth").valueAsNumber;
}

function getStrokeColor(){
    return document.getElementById("strokeColor").value;
}

function getBackgroundColor(){
    return document.getElementById("backgroundColor").value;
}
