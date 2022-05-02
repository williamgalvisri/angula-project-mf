import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { IPosition } from 'angular2-draggable';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';
import { Dimension } from './resize-wrapper.model';
import { MIN_SIZE_DIMENSSION_ALLOWED } from './resize-wrapper.utils';

export type DimensionPosition = Dimension & IPosition;
@Component({
  selector: 'resize-wrapper-molecule',
  templateUrl: 'resize-wrapper.component.html',
  styleUrls: ['./resize-wrapper.component.css'],
})
export class ResizeWrapperMolecule implements OnInit {
  @Input() typeElement: string = '';
  @Input() bounds: HTMLElement = {} as HTMLElement;
  @Input() position: IPosition = {x: 0, y: 0 };
  @Output() onEmitDimensionPosition = new EventEmitter<DimensionPosition>();
  public style: object = {};
  @Input() dimension: Dimension = {
    width: MIN_SIZE_DIMENSSION_ALLOWED[this.typeElement]?.width ?? 0,
    height: MIN_SIZE_DIMENSSION_ALLOWED[this.typeElement]?.height ?? 0
  }

  get minWidth() {
    return MIN_SIZE_DIMENSSION_ALLOWED[this.typeElement].width
  }
  
  constructor() {}

  ngOnInit() {
  }

  emmitResize(event: IResizeEvent): void {
    this.dimension = {
      width: event.size?.width,
      height: event.size?.height
    };
    this.onEmitDimensionPosition.emit({
      ...this.position,
      width: event.size?.width ?? 0,
      height: event.size?.height ?? 0,
    });
  }


  
  emmitPosition(event: IPosition) {
    this.onEmitDimensionPosition.emit({
      ...this.dimension,
      x: event.x,
      y: event.y,
    });
    
  }

  validate = (typeElement: string) => (event: ResizeEvent) => {
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      event.rectangle.width < MIN_SIZE_DIMENSSION_ALLOWED[typeElement].width
    ) {
      return false;
    }
    return true;
  };
}
