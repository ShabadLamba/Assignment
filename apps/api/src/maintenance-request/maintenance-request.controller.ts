import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Request,
  InternalServerErrorException,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { AuthService } from '../auth/auth.service';
import { MaintenanceRequestService } from './maintenance-request.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
    private authService: AuthService
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async getAllMaintenanceRequest() {
    try {
      return await this.maintenanceRequestService.getAllMaintenanceRequest();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Put('/:id/close')
  public async closeMaintenanceRequestById(@Param('id') id: string) {
    return await this.maintenanceRequestService.closeMaintenanceRequestById(id);
  }
}
