
let fares = {};
let faresLoaded = false;
let helperTexts = {};


//function to set helper text
const setHelperText = (txt) => {
	document.getElementById("helperText").innerHTML = txt;
}

const setRideTotal = (total) => {
	document.getElementById("rideTotal").innerHTML = '$ ' +total.toFixed(2);
}


//function to build select options based on json response
const buildSelect1Options = (fares) => {
	let temp = '';
	fares.zones.map((zone) => {
		temp += `<option value='${zone.zone}'>${zone.name}</option>`;
	});
	document.getElementById("fromZone").innerHTML = temp;
}

const handleChange = () => {
	
	let fromZone = document.getElementById("fromZone").value;
	let whenRiding = document.getElementById("whenRiding").value;
	let wherePurchased = document.querySelector('input[name="wherePurchased"]:checked').value;
	let ridesNeeded = parseInt(document.getElementById("ridesNeeded").value);
	
	//if ridesNeeded is zero, default to one
	if(!parseInt(ridesNeeded)){
		document.getElementById("ridesNeeded").value = 1;
		ridesNeeded = 1;
	}
	
	//update helper text
	setHelperText(helperTexts[whenRiding]);
	
	//update cost
	let zone = (fares.zones.filter((zone) => zone.zone == fromZone))[0];
	let fare = (zone.fares.filter((fare) => fare.type == whenRiding && fare.purchase == wherePurchased))[0];
	let totalFare = 0.00;
	
	if(fare && typeof fare !== 'undefined'){
		//determine cost for combination
		if(fare.type == "anytime" && fare.purchase == "advance_purchase" && ridesNeeded != 10){
			alert("This type of fare is discounted and requires a bulk purchase of 10 rides");
			document.getElementById("ridesNeeded").value = 10;
			totalFare = fare.price;
		}else{
			totalFare = ridesNeeded * fare.price;
		}
		
		//update cost to layout
		setRideTotal(totalFare);
		
	}else{
		alert("Fare not available for this ride, please try again");
		setRideTotal(0);
	}
}


window.onload = () => {
	
	//load fetch from origin with cors headers
	//(I had some issues with cors so i created a php file to serve the json data, the url is an old website I intend to take down soon)
	fetch('http://www.applabsllc.com/fares.php')
    .then((response) => response.json())
    .then((jsonData) => {
		//save retrieved data
		fares = jsonData;
		//set helper texts
		helperTexts = fares.info;
		setHelperText(helperTexts[document.getElementById("whenRiding").value]);
		//set loaded
		faresLoaded = true;
		buildSelect1Options(fares);
    })
    .catch((error) => console.error(error));
}