declare let window: any;
declare let require: any;
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
import { WEB3 } from '../ethereum';
import { Candidate } from '../intefaces/candidate';
import { Party } from '../intefaces/party';
const contract = require("@truffle/contract");
const electionAbi = require('../../../../build/contracts/Election.json')

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  electionEvent = new BehaviorSubject<any>(null);
  enable: any;
  contract: any;

  constructor(
    @Inject(WEB3) private web3: Web3
  ) {
    if(this.web3 && this.web3.currentProvider){
      this.contract = contract(electionAbi)
      this.contract.setProvider(this.web3.currentProvider)
      this.enable = this.enableMetaMaskAccount()
      this._listenForEvents()
    }
  }

  public async isDeployedContract(){
    try{
      await this.contract.deployed()
      return true;
    }catch(err){
      return false;
    }

    
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable()
    })
    return Promise.resolve(enable)
  }

  async getAllCandidates(): Promise<Candidate[]>{
    let candidates: Candidate[] = []
    const electionInstance = await this.contract.deployed()
    const candidatescCount = await electionInstance.candidatesCount()
    for(let i = 1; i<=candidatescCount; i++){
      const candidate = await electionInstance.candidates(i);
      candidates.push({
        id: candidate[0],
        name: candidate[1],
        voteCount: candidate[2].toNumber(),
        partyName: (await electionInstance.parties(candidate[3]))[1]
      })
    }
    return candidates;
  }

  async getAllParties(): Promise<Party[]>{
    let parties: Party[] = []
    const electionInstance = await this.contract.deployed()
    const partiesCount = await electionInstance.partiesCount()
    for(let i = 1; i<=partiesCount; i++){
      const party = await electionInstance.parties(i);
      
      parties.push({
        name: party[1],
        voteCount: party[2].toNumber()
      })
    }
    return parties;  
  }

  async hasVoted(address: string): Promise<boolean> {
    const electionInstance = await this.contract.deployed()
    return await electionInstance.voters(address)
  }

  async castVote(candidate: Candidate, account: string) {
    const electionInstance = await this.contract.deployed()
    return await electionInstance.vote(candidate.id,{
      from: account
    })
  }

  private async _listenForEvents(){
    const electionInstance = await this.contract.deployed();
    electionInstance.votedEvent({
      fromBlock: 0,
      toBlock: 'latest'
    },(error:any, event:any)=>{
      if(error) console.error(error)
      this.electionEvent.next(event);
    })

    return electionInstance;
  }

}
