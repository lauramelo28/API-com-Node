var config = require('./dbconfig');
const sql = require('mssql');

async function addProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .query(`INSERT INTO [dbo].[produtos] ([Nome], [Codigo], [Preco], [Descricao], [Qtd_Em_Estoque], [Avaliacao], [Categoria]) 
                VALUES ('${produto.Nome}', '${produto.Codigo}', '${produto.Preco}', '${produto.Descricao}', '${produto.Qtd_Em_Estoque}', '${produto.Avaliacao}', '${produto.Categoria}')`);
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }   
}

async function getProdutos() {
    try {
        let pool = await sql.connect(config);
        let produtos = await pool.request().query("SELECT * FROM Produtos");
        return produtos.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getProdutoById(id) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM produtos WHERE Id = @input_parameter");
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }   
}

async function getProdutoByCodigo(codigo) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('input_parameter', sql.VarChar, codigo)
            .query("SELECT * FROM produtos WHERE Codigo = @input_parameter");
        return loja.recordset;
    } catch (error) {
        console.log(error);
    }   
}

async function getProdutosByCategoria(categoria) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('input_parameter', sql.VarChar, categoria)
            .query("SELECT * FROM produtos WHERE Categoria = @input_parameter");
        return loja.recordset;
    } catch (error) {
        console.log(error);
    }   
}

async function updateProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Id', sql.Int, produto.Id)
            .input('Nome', sql.VarChar, produto.Nome)
            .input('Codigo', sql.VarChar, produto.Codigo)
            .input('Preco', sql.Decimal, produto.Preco)
            .input('Descricao', sql.VarChar, produto.Descricao)
            .input('Qtd_Em_Estoque', sql.Int, produto.Qtd_Em_Estoque)
            .input('Avaliacao', sql.Decimal, produto.Avaliacao)
            .input('Categoria', sql.VarChar, produto.Categoria)
            .query(`UPDATE [dbo].[produtos] 
                    SET [Nome] = @Nome,
                        [Codigo] = @Codigo,
                        [Preco] = @Preco,
                        [Descricao] = @Descricao,
                        [Qtd_Em_Estoque] = @Qtd_Em_Estoque,
                        [Avaliacao] = @Avaliacao,
                        [Categoria] = @Categoria
                    WHERE Id = @Id`);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduto(id) {
   try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM [dbo].[produtos] WHERE Id = @input_parameter");
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }   
}

module.exports = {
    getProdutos: getProdutos,
    updateProduto: updateProduto,
    getProdutoById: getProdutoById,
    deleteProduto: deleteProduto,
    addProduto: addProduto,
    getProdutoByCodigo: getProdutoByCodigo,
    getProdutosByCategoria: getProdutosByCategoria
};