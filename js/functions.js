onload=inicio;

var system=new System();
var i =0;	
var contenidoOriginal;
var tablaVacia;


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

  //Eventos de estadisticas

 
  
  
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
	if(i==0){contenidoOriginal = document.getElementById('statisticsSite').innerHTML;tablaVacia =  document.getElementById('tableOne').innerHTML; i=1;}
	system.systemLetter='*';
	initialChargeStats();
	goTo("statisticsSite");
}

function goToAddCompany_nav() {
	goTo("addCompany");
}


//----------------------------------- MainPage function declaration

function goToAddClaim_btn() {
	if(system.systemCompanies.length>0){
		goTo("ticket-box-decoration");
		companyComb();
	}else{
	alert('Debe ingresar una empresa, antes de ingresar un reclamo.');	
	}
	
}

//------------------------------------ Stats function declaration
function resetApp(){
	document.getElementById('statisticsSite').innerHTML = contenidoOriginal;
	let button = document.getElementById('allLetterSelected');
	button.addEventListener('click', setLetterAll);
	
	button.classList = [];
	if(system.systemLetter==='*'){
			button.classList.add('.buttonTable.green');
	}else{
		button.classList.add('buttonTable');
	}	

	let radios = document.getElementsByName("orden");
	radios.forEach(function(radioButton) {
	  		 radioButton.addEventListener('change',order); 
	});

}

function resetTable(){
	document.getElementById('tableOne').innerHTML = tablaVacia;
}

function order(){
	let radioAsc = document.getElementById('idRadio');
	if(radioAsc.checked){
		reOrdenarCrec();
	}else{
		reOrdenarDec();
	}
	resetTable();
	setRowsFromCompanies(system.systemClaimsSorted);
}

function reOrdenarCrec(){
	system.systemClaimsSorted.sort(function(a, b) {
		var nameA = a.companyName.toUpperCase();
		var nameB = b.companyName.toUpperCase();
		if (nameA < nameB) {
		  return -1;
		}
		if (nameA > nameB) {
		  return 1;
		}
		return 0;
		}
	);	
}

function reOrdenarDec(){
	system.systemClaimsSorted.sort(function(a, b) {
		var nameA = a.companyName.toUpperCase();
	  	var nameB = b.companyName.toUpperCase();
	  	if (nameA > nameB) {
	    	return -1;
	  	}
	  	if (nameA < nameB) {
	    	return 1;
	  	}
	  	return 0;
		}
	);
}

function initialChargeStats(){
	resetApp();
	setArrayData();

	setRowsFromCompanies(system.systemClaimsSorted);	
	setButtonsFromCompaniesFistLeter();
	setButtonsColor();
	let text = 'Empresas que empiezan con '
	if(system.systemLetter==='*'){
		text+='todas las letras';
	}else{
		text+=system.systemLetter;
	}

	document.getElementById('companyT').textContent = text;

	let companiesWOClaimsQtty = getCompaniesWOClaims()
	let companiesCount = system.systemCompanies.length - companiesWOClaimsQtty.length ;
	console.log('counWO:'+companiesWOClaimsQtty.length);
	let avg = (getQtyFromCompany(0) / companiesCount );
	console.log('el avg es '+companiesCount);
	avg = avg.toFixed(2);
	text = 'El promedio de las cantidades considerando todos los reclamos de todas las empresas es: ';

	if(avg>0){
		text += avg;
	}else{
		text = 'El promedio de las cantidades considerando todos los reclamos de todas las empresas es: No se puede calularel promedio. No hay reclamos';
	}
	
	
	let textoEtiquete = document.getElementById('generalInfo_allAvg');
	textoEtiquete.textContent = text;

	text = 'Total de empresas registradas: ';
	if(system.systemCompanies.length>0){
		text += system.systemCompanies.length;	
	}else{
		text+= ' No hay empresas registradas'
	}
	
	textoEtiquete = document.getElementById('generalInfo_qttyCompany');
	textoEtiquete.textContent = text;


	let companiesWOClaims = getCompaniesWOClaims()
	let companiesWOClaimsLIST = document.getElementById('generalInfo_listWOClaim');
	if(companiesWOClaims.length>0){
		for(let i =0;i<companiesWOClaims.length;i++){
			let li = document.createElement('li');
			let description =companiesWOClaims[i].companyName + ' ('+companiesWOClaims[i].companyAddress+') Rubro: '+ companiesWOClaims[i].companyCategory  
			li.textContent = description;
			companiesWOClaimsLIST.appendChild(li);
		}
	}else{
		let li = document.createElement('li');
		let description = 'No hay empresas sin reclamos'  
		li.textContent = description;
		companiesWOClaimsLIST.appendChild(li);
	}

	

	let maxQttyCategories = getQtyMaxCategory();
	let maxCategoriesList = document.getElementById('generalInfo_maxCategory');

	if(maxQttyCategories>0){
		let listMaxQttyCategories = getCategoryMaxCategory(maxQttyCategories);
		
		for(let i=0;i<listMaxQttyCategories.length;i++){
			
			let description = listMaxQttyCategories[i] + ': cantidad '+maxQttyCategories;

			let li = document.createElement('li');
			li.textContent = description;

			maxCategoriesList.appendChild(li);
		}
	}else{
		let description = 'No hay informacion para ninguna categoria'
		let li = document.createElement('li');
		li.textContent = description;

		maxCategoriesList.appendChild(li);
	}
}

function setButtonsColor(){
let botones = document.getElementsByName('buttonNames');
for(let i=0;i<botones.length;i++)
	if(botones[i].textContent===system.systemLetter){
		botones[i].classList.remove('buttonTable');
		botones[i].classList.add('button_background_green');
	}else{
		botones[i].classList.remove('button_background_green');
		botones[i].classList.add('buttonTable');
	}
}

function setArrayData(){
	let systemClaimsSorted = [];
	if (system.systemLetter === '*'){
		systemClaimsSorted = system.systemCompanies.slice();
	}else{
		for(let i=0; i<system.systemCompanies.length;i++){
			if(system.systemCompanies[i].companyName.charAt(0).toUpperCase()==system.systemLetter && !companyInCol(system.systemCompanies[i].companyId)){
				systemClaimsSorted.push(system.systemCompanies[i]);
			}
		}		 
	}
	system.systemClaimsSorted= systemClaimsSorted;
}

function companyInCol(companyId){
	let res = false;
	for(let i=0;i<system.systemClaimsSorted.length;i++){
		if(companyId===system.systemClaimsSorted[i].companyId){
			res = true;
		}
	}
}


function getQtyMaxCategory(){
	let categories = getCategories();
	let qtty =  0
	
	
	for(let i=0;i<categories.length;i++){
		let qttyAux = 0
		for(let j=0;j<system.systemClaims.length;j++){
			let catFromCompany = getComanyCategory();
			if(categories[i]===system.systemClaims[j].claimCompany.companyCategory){
				qttyAux+=system.systemClaims[j].claimSubscribers;
			}
		}
		if(qttyAux>qtty){
			qtty=qttyAux;
		}
	} 
	return qtty;
}

function setLetterAll(){
	system.systemLetter='*';
	initialChargeStats();
}


function getCategoryMaxCategory(qty){
	let maxCategories = [];
	let categories = getCategories();

	for(let i=0;i<categories.length;i++){
		let qttyAux = 0
		for(let j=0;j<system.systemClaims.length;j++){
			if(categories[i]===system.systemClaims[j].claimCompany.companyCategory){
				qttyAux+=system.systemClaims[j].claimSubscribers;
			}
		}
		if(qttyAux===qty){
			maxCategories.push(categories[i]);
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
	let companies = [];

	for(let i=0;i<system.systemCompanies.length;i++){
		let isIn = false;
		for(let j=0;j<system.systemClaims.length;j++){
			if(system.systemCompanies[i].companyId===system.systemClaims[j].claimCompany.companyId){
				isIn =true;
			}
		}
		if (!isIn){
			companies.push(system.systemCompanies[i]);
		}
	}
	return companies;
}	

function getQtyFromCompany(companyId){
	let qtty =0;
	for (let i=0;i<system.systemClaims.length;i++){
		if(system.systemClaims[i].claimCompany.companyId==companyId || companyId==0){
			qtty+=system.systemClaims[i].claimSubscribers;
		}
	}
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



//generate the necessary buttons from the different letters
function setButtonsFromCompaniesFistLeter(){
	let divConteiner = document.getElementById('buttonRadio_div');
	let buttonall = document.getElementById('allLetterSelected');
	getCompaniesFistLeter();
	for(let i =0;i<system.systemfirstLetterCompanies.length;i++){
		let button = document.createElement('button');
		button.textContent = system.systemfirstLetterCompanies[i];
		button.name = 'buttonNames'
		//button.classList.add('buttonTable');
		button.addEventListener('click', function(){system.systemLetter=system.systemfirstLetterCompanies[i];initialChargeStats();})
		divConteiner.insertBefore(button,buttonall);
	}
}

//set the letters array
function getCompaniesFistLeter(){
	system.systemfirstLetterCompanies = [];
	for(let i=0;i<system.systemCompanies.length;i++){
		let resAux=letterInCompaniesFirstLEtter(system.systemCompanies[i].companyName.charAt(0));
		if(!resAux){
			let letter = system.systemCompanies[i].companyName.charAt(0);
			system.systemfirstLetterCompanies.push(letter.toUpperCase());
		}
	}
}

//return true if the letter is in letter Array
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
	let nameInValid = validateCompanyName(document.getElementById("Nombre").value);

	if(form.reportValidity() && nameInValid){
		let companyId = system.systemCompanies.length+1;
		let companyName = document.getElementById("Nombre").value;
		let companyAddress = document.getElementById("Direccion").value;
		let companyCategory = document.getElementById("idSelect").value; 

		let company = new Company(companyId, companyName, companyAddress, companyCategory);
		system.addCompany(company);
		form.reset();

	}else {
		alert('Revise el nombre de la empresa, y recuerde que todos los campos son obligatorios');
	}
}

//return true if the companyName is available
function validateCompanyName(companyName){
	let res = true;
	
	for(let i=0;i<system.systemCompanies.length && res;i++){
		if (system.systemCompanies[i].companyName===companyName) {
			res=false;
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
