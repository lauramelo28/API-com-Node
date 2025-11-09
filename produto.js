class Produto{
    constructor(Id, Nome, Codigo, Preco, Descricao, Qtd_Em_estoque, Avaliacao, Categoria){
        this.Id = Id;
        this.Nome = Nome;
        this.Codigo = Codigo;
        this.Preco = Preco;
        this.Descricao = Descricao;
        this.Qtd_Em_estoque = Qtd_Em_estoque;
        this.Avaliacao = this.Avaliacao;
        this.Categoria = this.Categoria;
    }
}

module.exports = Produto;