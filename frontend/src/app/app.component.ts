import { Component, OnInit } from '@angular/core';

interface GlobalData {
    global_description: {
        desc1: string,
        desc2: string,
    },
    global_icons: Array<{
        filename_header: string,
        filename_header_over: string,
        filename_footer: string,
        filename_footer_over: string,
        link: string
    }>
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    globalData: GlobalData = {
        global_description: {
            desc1: "",
            desc2: "",
        },
        global_icons: []

    }
    global_icons: Array<any> = [];

    constructor() { 

    }

    ngOnInit(): void {
        this.globalData.global_description.desc1 = "*****";
        this.globalData.global_description.desc2 = "*****";
        let fetch1 = fetch("http://localhost:3000/api/v1/globalinfo", {
            method: "GET",
            headers: {
                Accept: "application/json",
            }
        }).then((results)=>{
            return results.json();
        }).then((results)=>{
            this.globalData.global_description = results.global_description;
            this.global_icons = results.global_icons;
            let assetsSubPath = "../../assets/images/";

            this.global_icons = results.global_icons.map((icon: any, idx: number, arr: Array<any>) => {
                let rowPosition;
                if(idx === 0) {
                    rowPosition = "icon-left";
                } else if (idx === arr.length-1) {
                    rowPosition = "icon-right";
                } else {
                    rowPosition = "icon-middle";
                }

                return {
                    filename: assetsSubPath+icon.filename_header,
                    filenameOver: assetsSubPath+icon.filename_header_over,
                    link: icon.link,
                    section: "header",
                    rowPosition: rowPosition
                }
            });
            
        }).catch((err)=>{
            console.log(err);
        });

    }
    
}
