import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

// Services
import { AccountsService } from './ethereum.services';


// MODULE FACTORY
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AccountsService]
})
export class EthereumModule {}