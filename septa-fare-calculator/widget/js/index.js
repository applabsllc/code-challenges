
let fares = {};
let faresLoaded = false;
let helperTexts = {};


//function to set helper text
const setHelperText = (txt) => {
	document.getElementById("helperText").innerHTML = txt;
}

const setRideTotal = (total) => {
	document.getElementById("rideTotal").innerHTML = '$ ' +total;
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
	
	console.log(fromZone, whenRiding);
	console.log(whenRiding);
	console.log(wherePurchased);
	console.log(ridesNeeded);
	
	//update helper text
	setHelperText(helperTexts[whenRiding]);
	
	//update cost
	
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