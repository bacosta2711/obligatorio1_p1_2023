onload=inicio;

function inicio(){

//inicilizo los sections que si debo observar y los que no 
	show("claimsManagement");
	hide("ticket-box-decoration");
	hide("ticketIn-box-decoration");
	hide("statisticsSite");
	hide("addCompany");

//Eventos de NavBar
document.getElementById("goToMainPage").addEventListener("click", goToMain_nav);
document.getElementById("goToViewTicket").addEventListener("click", goToViewTickets_nav);
/*document.getElementById("goToStats").addEventListener("click", goToStats_nav);
document.getElementById("goToAddCompany").addEventListener("click",goToAddCompany_nav);*/

	
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

function goTo(secClass){
	
	sections = getSectionClases();
	console.log(sections)
	for(let i=0;i<sections.length;i++){
		console.log(sections[i] +'---'+secClass);
		if(sections[i]==secClass){
			show(section);
		}
		else{
			hide(section);
		}
	}
}

function getSectionClases(){
	return sectionClasess =[" claimsManagement","ticket-box-decoration","ticketIn-box-decoration","statisticsSite","addCompany"];
}


//--------------------------------------------------------------------General funtions
function hide(className){
	var elemnt = document.getElementsByClassName(className);
	for (let i = 0; i < elemnt.length; i++) {
			elemnt[i].style.display = "none";
	}
}
	
function show(className){
	var elemnt = document.getElementsByClassName(className);
	for (let i = 0; i < elemnt.length; i++) {
			elemnt[i].style.display = "block";
	}
}