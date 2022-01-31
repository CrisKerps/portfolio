var cabeceraAJAX = new Headers({
  "X-API-Key": "9VEjL1KFml63Msrgr0w0jKHG2YTegbsnTiK6Sx2z",
});

var miInit = { headers: cabeceraAJAX };

//const tbodyMembers = document.getElementById("tbody-table");
//const member = data.results[0].members;

propublica = "";
data = {};
if (document.title.includes("Congress 113 Senate")) {
  propublica = "senate";
} else {
  propublica = "house";
}

fetch(
  `https://api.propublica.org/congress/v1/113/${propublica}/members.json`,
  miInit
)
  .then((response) => response.json())
  .then((d) => {
    data = d;
    console.log(d);

    let app = new Vue({
      el: "#app",
      data: {
        members: d.results[0].members,
        select: "all",
        states: [],
        checkeados: ['D','R','ID'],
      },
      methods: {},
      computed: {
        filterMembers() {
          return this.members.filter((member) => {
            if (member.state == this.select || this.select == "all") {
              if(this.checkeados.includes(member.party)){
              return member;
            }
          }
          });
        },
        addStates() {
          this.members.forEach((member) => {
            this.states.push(member.state);
          });
          console.log(this.states);
          return this.states;
        },
      },
    });
  });
