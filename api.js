var Db = require('./dboperations');
var Produto = require('./produto');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware activated');
    next();
});

router.route('/produtos').get((request, response) => {
    dboperations.getProdutos().then(result => {
        response.json(result[0]);
    });
})

router.route('/produtos/id/:id').get((request, response) => {
    dboperations.getProdutoById(request.params.id).then(result => {
        if (result.length > 0) {
            response.json(result[0]); 
        } else {
            response.status(404).json({ message: 'Produto não encontrado' });
        }
    });
});

router.route('/produtos/codigo/:codigo').get((request, response) => {
    dboperations.getProdutoByCodigo(request.params.codigo).then(result => {
        if (result.length > 0) {
            response.json(result[0]); 
        } else {
            response.status(404).json({ message: 'Produto não encontrado' });
        }
    });
});

router.route('/produtos/categoria/:categoria').get((request, response) => {
    dboperations.getProdutosByCategoria(request.params.categoria).then(result => {
        if (result.length > 0) {
            response.json(result); 
        } else {
            response.status(404).json({ message: 'Produtos não encontrados com a categoria especificada' });
        }
    });
});

router.route('/produtos/:id').patch((request, response) => {
    var produto = { ...request.body };
    dboperations.updateProduto(produto).then(result => {
        response.status(204).json(result);
    });
});

router.route('/produtos/:id').delete((request, response) => {
    dboperations.deleteProduto(request.params.id).then(result => {
        response.json(result[0]);
    });
});

router.route('/produtos').post((request, response) => {
    var produto = { ...request.body };
    dboperations.addProduto(produto).then(result => {
        response.status(201).json(result);
    });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log('API de produtos rodando na porta ' + port);