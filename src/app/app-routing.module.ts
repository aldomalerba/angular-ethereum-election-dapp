import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectionComponent } from './election/election.component';
import { EthereumBrowserAlertComponent } from './ethereum-browser-alert/ethereum-browser-alert.component';
import { 
  Web3GuardService as Web3Guard 
} from './shared/guards/web3-guard.service';
const routes: Routes = [{
  path:'',
  component: ElectionComponent,
  canActivate:[Web3Guard]
},{
  path:'ethereum-browser-alert',
  component: EthereumBrowserAlertComponent,
},{
  path:'ethereum-network-alert',
  component: EthereumBrowserAlertComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
