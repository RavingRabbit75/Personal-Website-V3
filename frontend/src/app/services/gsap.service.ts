import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { 


  }

  public fadeOut(e: string, d: number, o: number) {
    gsap.to(e, {duration: d, opacity: o });
  }
}
