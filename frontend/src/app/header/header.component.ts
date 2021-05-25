import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

    @Input() globalData: any;
    @Input() globalIcons: any;

    constructor() {
        
    }

    headerImageName: string = "../../assets/images/header_image_name.png";
    headerImageLaptop: string = "../../assets/images/header_image_laptop.png";
    
    ngOnInit() {

    }
}
