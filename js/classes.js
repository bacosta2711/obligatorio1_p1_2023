class Claim {
  constructor(claimId, claimPerson, claimTitle, claimDescription){
    this.claimId = claimId;
    this.claimPerson = claimPerson;
    this.claimTitle = claimTitle;
    this.claimDescription = claimDescription;
    this.claimSubscribers = 1;
  }

  
}

class Company{
  constructor(companyId, companyName, companyAddress, companyCategory){
    this.companyId = companyId;
    this.companyName = companyName;
    this.companyAddress =  companyAddress;
    this.companyCategory = companyCategory;
  }
}

class System{
  constructor(){
    this.systemStudients = [];
    this.systemClaims = [];
    this.systemCompanies = [];
    this.systemLetter='';
  }

  addclaim(claim){
    this.systemClaims.push(claim);
  }

  addCompany(company){
    this.systemCompanies.push(company);
  }

  addStudient(studient){
    this.systemStudients.push(studient);
  }


}
/*
class Studient(){
  constructor(){

  }
}*/