import { Component, Input, OnInit } from '@angular/core';
import { GsapService } from '../services/gsap.service';

@Component({
    selector: 'app-section-button',
    templateUrl: './section-button.component.html',
    styleUrls: ['./section-button.component.scss']
})

export class SectionButtonComponent implements OnInit {

    @Input() section: string | undefined;
    @Input() sectionText: string | undefined;
    @Input() sectionUrl: string | undefined;

    constructor(private gsap: GsapService) { 

    }

    ngOnInit(): void {
    
    }

    getBtnClasses() {
        let classObj: any = {
            "section-btn": true
        };

        if (this.section === "profile") {
            classObj["profile-btn"] = true;
        } else if (this.section === "projects") {
            classObj["projects-btn"] = true;
        } else {
            console.log("error, section not correct");
        }

        return classObj;
    }

    getIndicatorClasses() {
        let classObj: any = {};
        if (this.section === "profile") {
            classObj["profile-btn-indicator"] = true;
        } else if (this.section === "projects") {
            classObj["projects-btn-indicator"] = true;
        } else {
            console.log("error, section not correct");
        }

        return classObj;
    }

}
