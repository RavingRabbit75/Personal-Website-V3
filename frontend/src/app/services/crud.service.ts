import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { concat, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { 
    
  }

  getGlobalInfo() {
    return this.http.get("/api/v1/globalinfo");
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
