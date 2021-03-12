import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ethereum-browser-alert',
  templateUrl: './ethereum-browser-alert.component.html',
  styleUrls: ['./ethereum-browser-alert.component.css']
})
export class EthereumBrowserAlertComponent implements OnInit {

  networkError: boolean = false;

  constructor(private _router: Router) {
    if(this._router.url === '/ethereum-network-alert'){
      this.networkError = true;
    }
  }

  ngOnInit(): void {
  }

}
