import { Component, Input, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})

export class HeaderComponent implements OnInit {

    @Input() globalData: any;
    @Input() globalIcons: any;

    currentRoute: string = "";

    sectionBtnsArr = [
        {
            section: "profile", 
            sectionText: "PROFILE", 
            sectionUrl: "/profile"
        },
        {
            section: "projects", 
            sectionText: "PROJECTS", 
            sectionUrl: "/projects"
        }
    ]

    profileActive = false;
    projectsActive = false

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.url;
 
                if (this.currentRoute === "/profile") {
                    this.profileActive = true;
                    this.projectsActive = false;
                } else {
                    this.profileActive = false;
                    this.projectsActive = true;
                }
            }
        })
    }

    headerImageName: string = "../../assets/images/header_image_name.png";
    headerImageLaptop: string = "../../assets/images/header_image_laptop.png";
    
    ngOnInit() {

    }
}
