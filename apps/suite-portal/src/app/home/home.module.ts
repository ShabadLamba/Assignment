import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [CommonModule, SharedModule, ComponentsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
