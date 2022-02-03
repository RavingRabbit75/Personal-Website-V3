import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { 
    
  }

  getGlobalInfo() {
    return fetch("/api/v1/globalinfo", {
      method: "GET",
      headers: {
          Accept: "application/json",
      }
        
    });
  }

  getProfileExperience() { 
    return fetch("/api/v1/profile/experience")
  }

  getProfileSkills() {
    return fetch("/api/v1/profile/skills")
  }

  getProfileEducation() {
    return fetch("/api/v1/profile/education");
  }

}
