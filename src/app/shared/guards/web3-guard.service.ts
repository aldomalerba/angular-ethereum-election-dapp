import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { WEB3 } from '../ethereum';
import { ElectionService } from '../services/election.service';

@Injectable({
  providedIn: 'root'
})
export class Web3GuardService implements CanActivate{

  constructor(
    @Inject(WEB3) private web3: Web3,
    private _router: Router,
    private _electionService: ElectionService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    console.log('test')
    if (!this.web3.currentProvider) {
      console.log('test 2')
      this._router.navigate(['ethereum-browser-alert']);
      return false;
    }


      let isDeployed = await this._electionService.isDeployedContract();

      if(!isDeployed){
        console.log('test 3')
        this._router.navigate(['ethereum-network-alert']);
        return false;
      }

      return true;

    
  }
}
