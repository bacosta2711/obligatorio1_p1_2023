onload=inicio;
var system=new System();
function inicio(){

//inicilizo los sections que si debo observar y los que no 
	
manageDefaultTabs();

	

//Eventos de NavBar
document.getElementById("goToMainPage").addEventListener("click", goToMain_nav);
document.getElementById("goToViewTicket").addEventListener("click", goToViewTickets_nav);
document.getElementById("goToStats").addEventListener("click", goToStats_nav);
document.getElementById("goToAddCompany").addEventListener("click",goToAddCompany_nav);

//Eventos del Pagina principal
document.getElementById("claimAdd").addEventListener("click", goToAddClaim_btn);


//Eventos de form agregar empresa
document.getElementById("addCompany_btn").addEventListener("click", addCompany_fn);

//------------------------------------NavBar funtion declaration
function goToMain_nav(){
	goTo("claimsManagement");
}

function goToViewTickets_nav(){
	goTo("ticketIn-box-decoration"); 
}

function goToStats_nav(){
	goTo("statisticsSite");

}

function goToAddCompany_nav(){
	goTo("addCompany");
}


//----------------------------------- MainPage function declaration

function goToAddClaim_btn(){
	goTo("ticket-box-decoration");
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

function setCompaniesFistLeter(){
	getCompaniesFistLeter();
	for(let i =0;i<firstLetterCompanies.length;i++){
		let button = documentCreateElement('button');
		button.textContent = firstLetterCompanies[i];
		button.classList.add('buttonTable');
		button.addEventListener('click', function(){system.systemLetter=letter;})
	}
		

}

function getCompaniesFistLeter(){
	var firstLetterCompanies=[];
	for(let i=0;i<system.systemCompanies.length;i++){
		let resAux=letterInCompaniesFirstLEtter(system.systemCompanies[i].companyName.charAt(0));
		if(!resAux){
			firstLetterCompanies.puush(system.systemCompanies[i].comanyName.charAt(0));
		}
	}
}

function letterInCompaniesFirstLEtter(letter){
	let res = false;
	for(let i =0;i<firstLetterCompanies.length;i++){
		if(firstLetterCompanies[i].toUpperCase===letter.toUpperCase){
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
function show(className){
	var elemnt = document.getElementsByClassName(className);
	for (let i = 0; i < elemnt.length; i++) {
			elemnt[i].style.display = "block";
	}
}

/* from  a class(by parm) show if it match whith one from array else, hide it*/
function goTo(secClass){
	sections = getSectionClases();
	for(let i=0;i<sections.length;i++){
		if(sections[i]==secClass){
			show(sections[i]);
		}
		else{
			hide(sections[i]);
		}
	}
}

/* Show/hide the required sections at star page */
function manageDefaultTabs(){
	show("claimsManagement");
	hide("ticket-box-decoration");
	hide("ticketIn-box-decoration");
	hide("statisticsSite");
	hide("addCompany");
};


/* Provides the class of all sections */
function getSectionClases(){
	return sectionClasess =["claimsManagement","ticket-box-decoration","ticketIn-box-decoration","statisticsSite","addCompany"];
}

function getCategories(){
	return categories = ["Viajes","Restaurantes","Muebles","Autos","Servicios","General"]
}

}
