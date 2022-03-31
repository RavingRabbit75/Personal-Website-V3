import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { 

  }

  public fadeIn(e: string, d: number, o: number) {
    gsap.to(e, { duration: d, opacity: o });
  }

  public fadeOut(e: string, d: number, o: number) {
    gsap.to(e, { duration: d, opacity: o });
  }

  public animToColor(e: string, d: number, hexColor: string) {
    gsap.to(e, { duration: d, color: hexColor });
  }

  public sectionIndicatorOut(e: string) {
    gsap.to(e, { duration: 0.6, width: "0%", ease: "power4.in", delay: -0.5});
  }

  public sectionIndicatorIn(e: string) {
    gsap.to(e, { duration: 0.6, width: "100%", ease: "circ.out", delay: 0});
  }
}
