onload = inicio;
var system = new System();

function inicio() {


	//inicilizo los sections que si debo observar y los que no 

	manageDefaultTabs();
	


	//Eventos de NavBar
	document.getElementById("goToMainPage").addEventListener("click", goToMain_nav);
	document.getElementById("goToViewTicket").addEventListener("click", goToViewTickets_nav);
	document.getElementById("goToStats").addEventListener("click", goToStats_nav);
	document.getElementById("goToAddCompany").addEventListener("click", goToAddCompany_nav);
	// Evento de "Agregar formulario de reclamo"
	document.getElementById("addClaim_Form").addEventListener("click", sendClaim);

	//Eventos del Pagina principal
	document.getElementById("claimAdd").addEventListener("click", goToAddClaim_btn);
	//Evento "A mí también me pasó" 
	document.getElementById("addClaim_Form").addEventListener("click", sendClaim);

}

//------------------------------------NavBar funtion declaration
function goToMain_nav() {
	goTo("claimsManagement");
}

function goToViewTickets_nav() {
	goTo("ticketIn-box-decoration");
	claimsGeneretor();
}

function goToStats_nav() {
	goTo("statisticsSite");
}

function goToAddCompany_nav() {
	goTo("addCompany");
}



//----------------------------------- MainPage function declaration

function goToAddClaim_btn() {
	goTo("ticket-box-decoration");
}




//--------------------------------------------------------------------General funtions
/* from a class hide their elements*/

function hide(className) {
	var elemnt = document.getElementsByClassName(className);
	for (let i = 0; i < elemnt.length; i++) {
		elemnt[i].style.display = "none";
	}
}

/* from a class show their elements*/
function show(className) {
	var elemnt = document.getElementsByClassName(className);
	for (let i = 0; i < elemnt.length; i++) {
		elemnt[i].style.display = "block";
	}
}

/* from  a class(by parm) show if it match whith one from array else, hide it*/
function goTo(secClass) {
	sections = getSectionClases();
	console.log(sections)
	for (let i = 0; i < sections.length; i++) {
		console.log(sections[i] + '---' + secClass);
		if (sections[i] == secClass) {
			show(sections[i]);
		}
		else {
			hide(sections[i]);
		}
	}
}

/* Show/hide the required sections at star page */
function manageDefaultTabs() {
	show("claimsManagement");
	hide("ticket-box-decoration");
	hide("ticketIn-box-decoration");
	hide("statisticsSite");
	hide("addCompany");
};


/* Provides the class of all sections */
function getSectionClases() {
	return sectionClasess = ["claimsManagement", "ticket-box-decoration", "ticketIn-box-decoration", "statisticsSite", "addCompany"];
}

// Functions for add people to the experience

/*function meTooOne() {
	let counter = parseInt(document.getElementById("counterOne").innerHTML);
	counter = counter + 1;
	document.getElementById("counterOne").innerHTML = counter;

}*/

/*function meTooTwo() {
	let counter = parseInt(document.getElementById("counterTwo").innerHTML);
	counter = counter + 1;
	document.getElementById("counterTwo").innerHTML = counter;
}*/
// Agregar formulario de reclamo 

function sendClaim() {
	let newClaim = new Claim();
	newClaim.claimId = system.systemClaims.length + 1;
	newClaim.claimPerson = document.getElementById("claimantName").value;
	newClaim.claimTitle = document.getElementById("ticket_name").value;
	newClaim.claimDescription = document.getElementById("ticket_dsc").value;
	newClaim.claimCompany = document.getElementById('')
	system.addClaim(newClaim);
}

/*function sortUpward() {
	system.systemCompanies.sort(function (a, b)
	return a - b;
	)
}
*/
/*function sortFalling() {
	system.systemCompanies.sort(function (a, b)
	return b - a;
	)
}*/

function claimsGeneretor() {

	for (let i = 0; i < system.systemClaims.length; i++) {
		let articleTitle = system.systemClaims[i].claimTitle;
		let articleDescription = system.systemClaims[i].claimDescription;
		let articlePerson = system.systemClaims[i].claimPerson;
		let articleId = "RECLAMO No." + parseInt(i)+1;
		let articleSubscribers = system.systemClaims[i].claimSubscribers;

		let divCont = document.getElementById("claimsConteiner");

		let articlePag = document.createElement('article');
		articlePag.classList.add('ticketIn-boxItem-decoration');
		divCont.appendChild(articlePag);

		let titlePag = document.createElement('h3');
		titlePag.textContent = articleId;
		articlePag.appendChild(titlePag);
	
		let divClaim = document.createElement('div');
		divClaim.classList.add('ticketIn-boxItemInfo-decoration');
		articlePag.appendChild(divClaim);

		let paragraph = document.createElement('p');
		paragraph.textContent = articlePerson+": ";
		divClaim.appendChild(paragraph);

		let span = document.createElement('span');
		span.classList.add('name_style');
		span.textContent = articleTitle;
		paragraph.appendChild(span);

		let paragraph2 = document.createElement('p');
		paragraph2.textContent = "Empresa";
		divClaim.appendChild(paragraph2);

		let span2 = document.createElement('span');
		span2.classList.add('company_style');
		span2.textContent = "";
		paragraph2.appendChild(span2);

		let paragraph3 = document.createElement('p');
		paragraph3.textContent = articleDescription;
		divClaim.appendChild(paragraph3);

		let span3 = document.createElement('span');
		divClaim.appendChild(span3);

		let buttonOne = document.createElement('button');
		buttonOne.setAttribute('type', 'button');
		buttonOne.textContent = "A mí también me pasó!";
		span3.appendChild(buttonOne);


		let counter = document.createElement('a');
		counter.textContent = "Contador";
		

		let span4 = document.createElement('span');
		span4.textContent = articleSubscribers;
		counter.appendChild(span4);
	}
}

function displayClaims() {

}