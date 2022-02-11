import { Component, Input, OnInit } from '@angular/core';
import { gsap } from "gsap";

@Component({
	selector: 'app-icon-link',
	templateUrl: './icon-link.component.html',
	styleUrls: ['./icon-link.component.scss']
})
export class IconLinkComponent implements OnInit {

	@Input() filename: any;
	@Input() filenameOver: any;
	@Input() section: any;
	@Input() rowPosition: any;
	@Input() link: any;

	iconLinkOverId = "";

	constructor() { 
		
	}

	ngOnInit(): void {
		let filename = this.filenameOver.split("/")[4];
		filename = filename.split(".")[0]
		this.iconLinkOverId = filename;
		gsap.defaults({overwrite:"auto"})
	}

	mouseOver() {
		gsap.to("#" + this.iconLinkOverId, {opacity: 0.999, duration: 0.6});
	}

	mouseOut() {
		gsap.to("#" + this.iconLinkOverId, {opacity: 0, duration: 0.25});
	}
}
