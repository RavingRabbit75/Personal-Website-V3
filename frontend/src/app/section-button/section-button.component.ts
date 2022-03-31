import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { GsapService } from '../services/gsap.service';

@Component({
    selector: 'app-section-button',
    templateUrl: './section-button.component.html',
    styleUrls: ['./section-button.component.scss']
})

export class SectionButtonComponent implements OnInit, OnChanges {

    @Input() active: boolean = false;
    @Input() section: string | undefined;
    @Input() sectionText: string | undefined;
    @Input() sectionUrl: string | undefined;

    sectionTextId = "";
    sectionIndicatorId = "";

    constructor(private gsap: GsapService) { 

    }

    ngOnInit(): void {
        this.sectionTextId = this.section + "_btn_text";
        this.sectionIndicatorId = this.section + "_btn_indicator";
    }

    ngOnChanges(): void {
        if (this.active === true && this.sectionIndicatorId !== "") {
            this.gsap.sectionIndicatorIn("#" + this.sectionIndicatorId);
        } else if (this.active === false && this.sectionIndicatorId !== "") {
            this.gsap.sectionIndicatorOut("#" + this.sectionIndicatorId);
        }
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

    mouseOver() {
        this.gsap.animToColor("#" + this.sectionTextId, 0.5, "#f5b730");
    }

    mouseOut() {
        this.gsap.animToColor("#" + this.sectionTextId, 0.25, "#efc978");
    }

}
