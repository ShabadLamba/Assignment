import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [CommonModule, SharedModule, ComponentsModule],
  declarations: [AdminComponent, AdminDashboardComponent],
  exports: [AdminComponent, AdminDashboardComponent],
})
export class AdminModule {}
