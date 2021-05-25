import { Component, Input, OnInit } from '@angular/core';

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

	constructor() { 
		
	}

	ngOnInit(): void {

	}

}
