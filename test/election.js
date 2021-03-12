const { assert } = require("chai");

var Election = artifacts.require("./Election.sol")

contract("Election", accounts => {

    it("initializes with two parties", async () => {
        const instance = await Election.deployed()
        const count = await instance.partiesCount()
        assert.equal(count, 2);
    })

    it("initializes with four candidates", async () => {
        const instance = await Election.deployed()
        const count = await instance.candidatesCount()
        assert.equal(count, 4);
    })

    it("initialized the candidates with the correct values", async () => {
        const instance = await Election.deployed()
        const firstCandidate = await instance.candidates(1)
        const secondCandidate = await instance.candidates(2)
        const thirdCandidate = await instance.candidates(3)
        const fourthCandidate = await instance.candidates(4)

        assert.equal(firstCandidate[0], 1, "contains the correct id")
        assert.equal(firstCandidate[1], "Candidate 1", "contains the correct name")
        assert.equal(firstCandidate[2], 0, "contains the correct vote count")
        assert.equal(firstCandidate[3], 1, "contains the correct vote count")

        assert.equal(secondCandidate[0], 2, "contains the correct id")
        assert.equal(secondCandidate[1], "Candidate 2", "contains the correct name")
        assert.equal(secondCandidate[2], 0, "contains the correct vote count")
        assert.equal(secondCandidate[3], 2, "contains the correct vote count")

        assert.equal(thirdCandidate[0], 3, "contains the correct id")
        assert.equal(thirdCandidate[1], "Candidate 3", "contains the correct name")
        assert.equal(thirdCandidate[2], 0, "contains the correct vote count")
        assert.equal(thirdCandidate[3], 1, "contains the correct vote count")

        assert.equal(fourthCandidate[0], 4, "contains the correct id")
        assert.equal(fourthCandidate[1], "Candidate 4", "contains the correct name")
        assert.equal(fourthCandidate[2], 0, "contains the correct vote count")
        assert.equal(fourthCandidate[3], 2, "contains the correct vote count")

    })

    it("allows a voter to cast a vote", async () => {
        const instance = await Election.deployed()
        const candidateId = 1;
        const receipt = await instance.vote(candidateId, {
            from: accounts[0]
        })
        assert.equal(receipt.logs.length, 1, "an event was triggered")
        assert.equal(receipt.logs[0].event, 'votedEvent', 'the event type is correct')
        assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, 'the candidate id is correct')

        const voted = await instance.voters(accounts[0])
        assert(voted, "The voter was marked as voted")

        const candidate = await instance.candidates(1)
        const party = await instance.parties(candidate[3])

        const candidateVoteCount = candidate[2]
        const partyVoteCount = party[2]
        assert.equal(candidateVoteCount, 1, "increments the candidate's vote count");
        assert.equal(partyVoteCount, 1, "increments the party's vote count");
    })

    it("throws an exception for invalid candidates", async () => {
        let instance = await Election.deployed()
        try {
            await instance.vote(99, { from: accounts[1] })
        } catch (error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert')
            let candidate1 = await instance.candidates(1)
            let candidate2 = await instance.candidates(2)
            let voteCount1 = candidate1[2]
            let voteCount2 = candidate2[2]

            assert.equal(voteCount1, 1, 'candidate 1 did not receive any votes')
            assert.equal(voteCount2, 0, 'candidate 2 did not receive any votes')

        }
    })

    it("throws an exception for double voting", async () => {
        let instance = await Election.deployed()
        let candidateId = 2

        await instance.vote(candidateId, { from: accounts[1] })
        let candidate = await instance.candidates(candidateId)
        let voteCount = candidate[2]
        assert.equal(voteCount, 1, 'accepts first vote')

        try{
            await instance.vote(candidateId, { from: accounts[1] })
        }
        catch(error){
            assert(error.message.indexOf('revert') >= 0, 'error message must conain revert') 
            let candidate1 = await instance.candidates(1);
            voteCount = candidate1[2]
            assert.equal(voteCount, 1, 'candidate 1 did did not receive any votes')

            let candidate2 = await instance.candidates(2);
            voteCount = candidate2[2]
            assert.equal(voteCount, 1, 'candidate 2 did did not receive any votes')
        }

    })

})