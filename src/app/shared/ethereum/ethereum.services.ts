import { Injectable, Inject } from '@angular/core';
// Web3
import { WEB3 } from './tokens';
import Web3 from 'web3';

// RXJS
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { bindNodeCallback } from 'rxjs/';
import { map, tap, catchError } from 'rxjs/operators';
declare let window: any;

@Injectable()
export class AccountsService {

    accountChanged = new BehaviorSubject<string>('');

    constructor(@Inject(WEB3) private web3: Web3) {

        /*window['ethereum'].on('accountsChanged', (accounts:string[]) => {
            this.accountChanged.next(accounts[0])
        })*/
    }

    get defaultAccount(): string { return this.web3.eth.defaultAccount || ''; }
    set defaultAccount(account: string) { this.web3.eth.defaultAccount = account; }

    /** Returns all accounts available */
    public getAccounts(): Observable<string[]> {
        return bindNodeCallback(this.web3.eth.getAccounts)();
    }

    /** Get the current account */
    public currentAccount(): Observable<string> {
            return this.getAccounts().pipe(
                tap((accounts: string[]) => {
                    if (accounts.length === 0) { throw new Error('No accounts available'); }
                }),
                map((accounts: string[]) => accounts[0]),
                tap((account: string) => this.defaultAccount = account),
                catchError((err: Error) => {throw throwError(err)})
            );
    }
}