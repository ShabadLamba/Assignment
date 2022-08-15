import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MaintenanceRequestController } from './maintenance-request.controller';
import { MaintenanceRequestDao } from './maintenance-request.dao';
import { MaintenanceRequestService } from './maintenance-request.service';


@Module({
  imports: [AuthModule],
  controllers: [MaintenanceRequestController],
  providers: [
    MaintenanceRequestService,
    MaintenanceRequestDao,
  ],
})
export class MaintenanceRequestModule {}
