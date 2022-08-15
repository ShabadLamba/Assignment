import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [GridContainerComponent],
  imports: [CommonModule, SharedModule],
  exports: [GridContainerComponent],
})
export class ComponentsModule {}
