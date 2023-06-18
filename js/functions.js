onload=inicio;

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
}

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
	console.log(sections)
	for(let i=0;i<sections.length;i++){
		console.log(sections[i] +'---'+secClass);
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
