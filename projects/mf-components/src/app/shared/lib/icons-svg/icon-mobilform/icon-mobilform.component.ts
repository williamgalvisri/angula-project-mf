import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-mobilform-svg',
  templateUrl: './icon-mobilform.component.svg',
  styleUrls: ['./icon-mobilform.component.css']
})
export class IconMobileformSvg {
  @Input() dimension: number = 37;
  @Input() animated: boolean = false;
}