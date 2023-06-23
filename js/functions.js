onload=inicio;
var system=new System();
function inicio(){

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
  
  //Eventos del Pagina principal
  document.getElementById("claimAdd").addEventListener("click", goToAddClaim_btn);


  //Eventos de form agregar empresa
  document.getElementById("addCompany_btn").addEventListener("click", addCompany_fn);
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
	companyComb();
}

//------------------------------------ Stats function declaration
function getQtyMaxCategory(){
	let categories = getCategories();
	let qtty =  0
	
	
	for(let i=0;i<categories.length;i++){
		let qttyAux = 0
		for(let j=0;j<system.systemClaims.length;j++){
			let catFromCompany = getComanyCategory();
			if(categories[i]===catFromCompany){
				qttyAux+=system.systemClaims[j].claimSubscribers;
			}
		}
		if(qttyAux>qtty){
			qtty=qttyAux;
		}
	} 
	return qtty;
}

function getCategoryMaxCategory(qty){
	let maxCategories = [];
	let categories = getCategories();

	for(let i=0;i<categories.length;i++){
		let qttyAux = 0
		for(let j=0;j<system.systemClaims.length;j++){
			let catFromCompany = getComanyCategory();
			if(categories[i]===catFromCompany){
				qttyAux+=system.systemClaims[j].claimSubscribers;
			}
		}
		if(qttyAux===qty){
			maxCategories.puush(categories[i]);
		}	
	} 
	return maxCategories;
}

function getComanyCategory(companyParm){
	let isCompany = false;
	let category = ''
	for(let i=0;i<system.systemCompanies.length && !isCompany ;i++){
		if(system.systemCompanies[i].companyName===companyParm){
			isCompany = true;
			category = system.systemCompanies[i].comanyName;
		}
	}
	return category;
}

	
function getCompaniesWOClaims(){
	let companies = system.systemCompanies
	for(let i=0;i<system.systemCompanies.length;i++){
		for(let j=0;j<system.systemClaims.length;j++){
			if(system.systemCompanies[i].comanyName===system.systemClaims[j].comanyName){
				companies.splice(i,1);
			}
		}
	}

	return companies;
}	

function areTextOrGrid(){
	if(areClaims()){
		hide('')
		show('')
	}else{
		hide('')
		show('')
	}
}

function areClaims(){
	res = false;
	if(system.systemClaims.length > 0){
		res = true;
	}
	return res;
}

function getQtyFromCompany(companyId){
	let qtty =0;
	for (let i=0;system.systemClaims.length;i++){
		if(system.systemClaims[i].claimCompany.companyId=companyId){
			qtty+=system.systemClaims[i].claimSubscribers;
		}
	}
	console.log('la cantidad es:'+qtty);
	return qtty;
}

function setRowsFromCompanies(companies){
	let tableConteiner = document.getElementById('tableOne');
	
	for(let i=0;i<companies.length;i++){

		let row = document.createElement('tr');

		let itemToAdd_name = document.createElement('td');
		itemToAdd_name.classList.add('celdaOne');
		itemToAdd_name.textContent = companies[i].companyName;
		row.appendChild(itemToAdd_name);

		let itemToAdd_adddress = document.createElement('td');
		itemToAdd_adddress.classList.add('celdaOne');
		itemToAdd_adddress.textContent = companies[i].companyAddress;
		row.appendChild(itemToAdd_adddress);


		let itemToAdd_category = document.createElement('td');
		itemToAdd_category.classList.add('celdaTwo');
		itemToAdd_category.textContent = companies[i].companyCategory;
		row.appendChild(itemToAdd_category);

		let itemToAdd_qtty = document.createElement('td');
		itemToAdd_qtty.classList.add('celdaTwo');
		itemToAdd_qtty.textContent = getQtyFromCompany(companies[i].companyId);
		row.appendChild(itemToAdd_qtty);

		tableConteiner.appendChild(row);
	}

}




function setButtonsFromCompaniesFistLeter(){
	let divConteiner = document.getElementById('buttonRadio_div');
	let buttonall = document.getElementById('allLetterSelected');
	getCompaniesFistLeter();
	for(let i =0;i<system.systemfirstLetterCompanies.length;i++){
		let button = document.createElement('button');
		button.textContent = system.systemfirstLetterCompanies[i];
		button.classList.add('buttonTable');	
		button.addEventListener('click', function(){system.systemLetter=syste.systemfirstLetterCompanies[i];})
		divconteiner.inertBefore(button,buttonall);
	}
		

}

function getCompaniesFistLeter(){
	system.systemfirstLetterCompanies=[];
	for(let i=0;i<system.systemCompanies.length;i++){
		console.log('Esto es:'+system.systemCompanies[i].companyName.charAt(0));
		let resAux=letterInCompaniesFirstLEtter(system.systemCompanies[i].companyName.charAt(0));
		console.log('Esto2 es:'+resAux);
		if(!resAux){
			console.log('la letra es :'+letter);
			let letter = system.systemCompanies[i].comanyName.charAt(0);
			console.log('la letra es :'+letter);
			system.systemfirstLetterCompanies.push();
		}
	}
}

function letterInCompaniesFirstLEtter(letter){
	let res = false;
	for(let i =0;i<system.systemfirstLetterCompanies.length;i++){
		if(system.systemfirstLetterCompanies[i].toUpperCase()===letter.toUpperCase()){
			res = true;
		}
	}
	return res;
}


//----------------------------------- AddComapny function declaration
function addCompany_fn(){
	form = document.getElementById('addCompany_fm');
	let nameValid = validateCompanyName();

	if(form.reportValidity()&& !nameValid){
		let companyId = system.systemCompanies.length+1;
		let companyName = document.getElementById("Nombre").value;
		let companyAddress = document.getElementById("Direccion").value;
		let companyCategory = document.getElementById("idSelect").value; 

		let company = new Company(companyId, companyName, companyAddress, companyCategory);
		system.addCompany(company);
		form.reset();

		console.log(system);
	}else {
		alert('Revise el nombre de la empresa, y recuerde que todos los campos son obligatorios');
	}
}

function validateCompanyName(comanyName){
	let res = false;
	
	for(let i=0;i<system.systemClaims.length && !res;i++){
		if (system.systemClaims[i]===comanyName) {
			res=true;
		}
	}
	return res;
}
//--------------------------------------------------------------------General funtions

/* from a class hide their elements*/


function hide(className){

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

	for(let i=0;i<sections.length;i++){
		if(sections[i]==secClass){
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
	newClaim.claimCompany = system.systemCompanies[document.getElementById('company').selectedIndex];
	system.addClaim(newClaim);
    let formClaim = document.getElementById('addClaimForm');
	formClaim.reset();
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

/* function companiesGridClaims(){

	for (let i = 0; i < system.systemCompanies; i++){
		let companyNameOption = system.systemCompanies[i].companyName;
	}
}
*/
function claimsGeneretor() {
	let divCont = document.getElementById("claimsConteiner");
	divCont.innerHTML = "";
	for (let i = system.systemClaims.length-1; i>=0; i--) {
		let articleTitle = system.systemClaims[i].claimTitle;
		let articleDescription = system.systemClaims[i].claimDescription;
		let articlePerson = system.systemClaims[i].claimPerson;
		let articleId = "RECLAMO No."+parseInt(i+1);
		let articleSubscribers = system.systemClaims[i].claimSubscribers;
		let articleCompany = system.systemClaims[i].claimCompany;

		
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
		paragraph2.textContent = "Empresa: ";
		divClaim.appendChild(paragraph2);

		//let selectElement = document.getElementById('company');
		let span2 = document.createElement('span');
		span2.classList.add('company_style');
		span2.textContent = articleCompany.companyName;
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

function companyComb(){
	
	let selectConteiner = document.getElementById('company');
	selectConteiner.innerHTML = "";
	for (let i = 0; i< system.systemCompanies.length; i++){
	
		let companyOption = system.systemCompanies[i].companyName;
		let optionComp = document.createElement('option');
		optionComp.textContent = companyOption;
		optionComp.id = 'option' + i; ;
		selectConteiner.appendChild(optionComp);


	}
}
function getCategories(){
	return categories = ["Viajes","Restaurantes","Muebles","Autos","Servicios","General"]
}

