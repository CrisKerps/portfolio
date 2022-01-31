var cabeceraAJAX = new Headers({
    "X-API-Key": "9VEjL1KFml63Msrgr0w0jKHG2YTegbsnTiK6Sx2z",
  });
  
  var miInit = { headers: cabeceraAJAX };
  
  var propublica = "";
  
  if (document.title.includes("Loyalty Senate")) {
    propublica = "senate";
  } else {
    propublica = "house";
  }
  member = {}
  fetch(
    `https://api.propublica.org/congress/v1/113/${propublica}/members.json`,
    miInit
  )
  .then(response => response.json())
  .then( d =>{    
    let app = new Vue({
        el:'#app',
        data:{
            members:d.results[0].members,                     
            totalMembers: 0,
            totalVotes:0,
            totalVotesPct:0,
            tenPercent: 0,
            membersParty: [
                {
                 party:'Democrats',
                 total:0,
                 votesPct:0,
                 votes:0                 
                },
                {
                party:'Republicans',
                total:0,
                votesPct:0,
                votes:0
                },
                {
                 party:'Independents',
                 total:0,
                 votesPct:0,
                 votes:0
                }
            ]
            }, 
        computed: {
                  partyMembers(){                    
                    this.members.forEach(member => {
                      if(member.party=='D'){
                          this.membersParty[0].total++;
                          this.membersParty[0].votes += member.votes_with_party_pct;
                          this.totalVotes+=member.votes_with_party_pct;
                      }
                      if(member.party=='R'){
                        this.membersParty[1].total++
                        this.membersParty[1].votes += member.votes_with_party_pct;
                        this.totalVotes+=member.votes_with_party_pct;
                      }
                      if(member.party=='ID'){
                        this.membersParty[2].total++
                        this.membersParty[2].votes += member.votes_with_party_pct;
                        this.totalVotes+=member.votes_with_party_pct;
                      }
                      this.totalMembers++;                      
                    });

                    this.membersParty[0].votesPct = Math.trunc(this.membersParty[0].votes / this.membersParty[0].total);
                    this.membersParty[1].votesPct = Math.trunc(this.membersParty[1].votes / this.membersParty[1].total);
                    
                    if(this.membersParty[2].total !=0)
                        {this.membersParty[2].votesPct = Math.trunc(this.membersParty[2].votes / this.membersParty[2].total);}
                    else {this.membersParty[2].votesPct=0;}
                        this.totalVotesPct = Math.trunc(this.totalVotes / this.totalMembers);
                    this.tenPercent = this.totalMembers*0.1;
                    return this.membersParty;
                  },
                topTenPercent(){
                   let orderMembers = this.members.sort(function (a,b) {
                              if(a.votes_with_party_pct<b.votes_with_party_pct){return -1}
                              if (a.votes_with_party_pct>b.votes_with_party_pct){return 1}
                              return 0;
                         })
                  let arrayTenPercent = [];
                   for (let index = 0; index < this.tenPercent-1; index++) {
                       arrayTenPercent.push(orderMembers[index]);                    
                   }

                  return arrayTenPercent;
                },
                bottomTenPercent(){
                   let orderMembers = this.members.sort(function (a,b) {
                              if(a.votes_with_party_pct<b.votes_with_party_pct){return -1}
                              if (a.votes_with_party_pct>b.votes_with_party_pct){return 1}
                              return 0;
                         })
                     let arrayTenPercent = [];
                     let limiteSuperior = this.totalMembers-1;
                     let limiteInferior = limiteSuperior - this.tenPercent;
                   for (let index =  limiteSuperior-1; index >limiteInferior ; index--){
                       arrayTenPercent.push(this.members[index]);                    
                   }
                   return arrayTenPercent;
                }  
       }
    })
})
.catch(err=>console.log(err))
  

