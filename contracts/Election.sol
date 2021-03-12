// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Election {

    struct Party {
        uint id;
        string name;
        uint voteCount;
        bool exists;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        uint partyId;
    }

    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;
    mapping(uint => Party) public parties;

    uint public candidatesCount;
    uint public partiesCount;

    event votedEvent(
        uint indexed _candidateId
    );

    constructor() {
        addParty('Party 1'); //1
        addParty('Party 2'); //2

        addCandidate('Candidate 1', 1);
        addCandidate('Candidate 2', 2);
        addCandidate('Candidate 3', 1);
        addCandidate('Candidate 4', 2);
    }

    function addCandidate(string memory _name, uint _partyId) private {

        //check valid party
        require(_partyId > 0 && _partyId <= partiesCount);

        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _partyId);
    }

    function addParty(string memory _name) private {
        partiesCount++;
        parties[partiesCount] = Party(partiesCount, _name, 0, true);
    }

    function vote (uint _candidateId) public {
        //check they haven't voted before
        require(!voters[msg.sender]);

        //check valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        //record that voter has voted
        voters[msg.sender] = true;
        
        //update candidate vote count
        candidates[_candidateId].voteCount ++;

        //update party vote count
        parties[candidates[_candidateId].partyId].voteCount ++;

        emit votedEvent(_candidateId);
    }


}