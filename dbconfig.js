const config = {
    server: "localhost",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "123"
        }
    },
    options: {
        database: "Loja_de_produtos_node",
        encrypt: false
    },
    port: 1433
}

module.exports = config;