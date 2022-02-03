import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';

interface Education {
  primaryDescription?: string, 
  secondaryDescription?: string,
  year?: string
}

interface Skill {
  level: number
  skill: string
}

interface Experience {
  accomplishments?: string[],
  exp_id?: number,
  location?: string,
  name?: string,
  title?: string,
  years?: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  experiences: Experience[] = [];
  skills: Skill[] = [];
  education: Education[] = [];
  proficientSkills: string = "";
  exposureSkills: string = "";
  
  constructor(private crud: CrudService) { 

  }

  ngOnInit(): void {
    Promise.all([
      this.crud.getProfileExperience(), 
      this.crud.getProfileSkills(), 
      this.crud.getProfileEducation()
    ]).then((responses)=>{
      return Promise.all(responses.map((response)=>{
        return response.json();
      }))
    }).then((data)=>{
      this.experiences = data[0];
      this.skills = data[1];
      this.education = data[2];
      console.log(this.education);
      this.proficientSkills = this.setupProficientSkills(this.skills);
      this.exposureSkills = this.setupExposureSkills(this.skills);

    }).catch((err)=>{
      console.log(err);
    })
  }

  private setupProficientSkills(skillsArr: Skill[]): string {
    let skillsString = skillsArr.filter((item: Skill) => {
      return item.level > 2;
    }).reduce((acc, item, idx, arr)=>{
      let separator = ", ";
      if (idx === arr.length-1) {
        separator = "";
      }
      return acc + item.skill + separator;
    }, "")

    return skillsString;
  }

  private setupExposureSkills(skillsArr: Skill[]): string {
    let skillString = skillsArr.filter(item => item.level <= 2)
      .reduce((acc, item, idx, arr)=>{
        let separator = ", ";
        if (idx === arr.length-1) {
          separator = "";
        }
        return acc + item.skill + separator;
      }, "")

    return skillString;
  }


  ngOnDestroy(): void {
    // this.profileInfoSubscription.unsubscribe()
  }

}
