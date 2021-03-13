import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountsService } from '../shared/ethereum';
import { ElectionService } from '../shared/services/election.service';
import {MatTableDataSource} from '@angular/material/table';
import { Candidate } from '../shared/intefaces/candidate';
import { SelectionModel } from '@angular/cdk/collections';
import { Party } from '../shared/intefaces/party';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'voteCount', 'partyName'];
  dataSource = new MatTableDataSource<Candidate>()
  candidates: Candidate[] = []
  parties: Party[] = []
  hasVoted: boolean = true;
  selection = new SelectionModel<any>(false);
  account: string = '';
  counter: number = 0;
  showParties:boolean = false
  loading: boolean = false;
  constructor(
    private _electionService: ElectionService,
    private _accountService: AccountsService,
    private _cd: ChangeDetectorRef 
  ) { 

    this._electionService.electionEvent.subscribe(
      emitEvent => {
        if(emitEvent) this._refreshData()
      })
    this._accountService.accountChanged.subscribe( account => {
      if(account) this._refreshData()
    });
  
  }


  ngOnInit() {
    this._refreshData()
  }

  private _refreshData(){
    this.loading = true;
    this._accountService.currentAccount()
    .subscribe(
       async account => {
          this.account = account;
          this.candidates = await this._electionService.getAllCandidates()
          this.parties = await this._electionService.getAllParties()
          this.hasVoted = await this._electionService.hasVoted(this.account)
          this.loading = false;
          this.dataSource = new MatTableDataSource(this.candidates)
          this._cd.detectChanges();
      },
      err => {
        this.loading = false;
      }
    )
  }

  voteCandidate(){
    const selectedCandidate = this.selection.selected[0]

    if(selectedCandidate){
      this._electionService.castVote(selectedCandidate, this.account)
      .then(value => console.log(value))
      .catch(err => console.error(err))
    }
  }

  onChangeToggle($event: any){
    this.showParties = $event.checked;
  }

  onChange($event: any, element: Candidate){
    this.selection.toggle(element);
  }

}
