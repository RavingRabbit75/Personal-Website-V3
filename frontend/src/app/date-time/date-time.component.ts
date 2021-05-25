import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {
	myDate = ""
	myTime = ""

	constructor() { 

	}

	ngOnInit(): void {
		this.startTime();
		let t = setInterval(() => {
			this.startTime();
		}, 5000);
	}

	startTime() {
		let today = new Date();
		let year = today.getFullYear();
		let month = adjustMonth(today.getMonth());
		let date = today.getDate();
		let day = adjustDay(today.getDay());
		let h = adjustHours(today.getHours());
		let antePostMeridiem = getAntePostMeridiem(today.getHours());
		let m = today.getMinutes();

		let minStr = addZero(m);
		this.myDate = day + " " + month+" "+ date +", " + year;
		this.myTime = h + ":" + minStr + " " + antePostMeridiem;

		function getAntePostMeridiem(hour: number): string{
			if(hour < 12){
				return "AM";
			} else {
				return "PM";
			}
		}

		function adjustMonth(i: number): string {
			let month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
			let n = month[i];
			return n;
		}

		function adjustDay(dayNum: number): string | null {
			let dayString: string | null;
			switch(dayNum) {
				case 0:
					dayString = "Sunday";
					break;
				case 1:
					dayString = "Monday";
					break;
				case 2:
					dayString = "Tuesday";
					break;
				case 3:
					dayString = "Wednesday";
					break;
				case 4:
					dayString = "Thursday";
					break;
				case 5:
					dayString = "Friday";
					break;
				case 6:
					dayString = "Saturday";
					break;
				default:
					dayString = null
					console.log("no day picked");
			}

			return dayString;
		}

		function adjustHours(hourNum: number): number {
			if (hourNum > 12) {
				hourNum = hourNum - 12;
			} else if (hourNum == 0) {
				hourNum = 12;
			}
			return hourNum;
		}

		function addZero(i: number): string {
			let minuteString: string | null = null;
			if (i < 10) {
				minuteString = "0" + i;
			} else {
				minuteString = i.toString();
			}
			return minuteString;
		}
	}

}
