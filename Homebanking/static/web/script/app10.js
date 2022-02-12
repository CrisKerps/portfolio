let app10 = new Vue({
    el: '#app10',
    data: {
        credit: [],
        mensaje: false,

        deleteCardNumber: "",
        deleteCardId: "",
        deleteMessage: "",
    },

    created() {
        this.loadData();
    },

    methods: {

        loadData() {
            axios.get('/api/clients/current')
                .then(response => {
                    this.credit = response.data.cards.filter(card => card.type == 'CREDIT');
                    console.log(this.credit);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        cut(date, inicio, largo) {
            return date.toString().substr(inicio, largo);
        },
        cutNS(date, inicio, largo) {
            return date.substr(inicio, largo);
        },
        logOut() {
            axios.post('/api/logout')
                .then(response => window.location = "/web/index.html")
                .catch(e => {
                    console.log(e);
                });
        },

        cerrarMensaje() {
            this.mensaje = !this.mensaje;
        },
        deleteCardConfirm() {
            axios.delete('/api/clients/current/cards/delete/' + this.deleteCardId)
                .then(res => this.deleteMessage = res.data)
                .then(res => {
                    setTimeout(function () { location.reload(); }, 2000)
                })
                .catch(err => {
                    this.deleteMessage = err.response.data
                    setTimeout(function () { location.reload(); }, 2000)
                })
        },
        expiredCard(tarjeta) {
            let dateNow = new Date()
            let expirationDate = new Date(tarjeta.thruDate)
            return expirationDate < dateNow
        },
        deleteCard(id, number) {
            this.deleteCardId = id
            this.deleteCardNumber = number
        }
    }
});