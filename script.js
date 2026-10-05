const formulario = document.querySelector("#formProduto");
const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const quantidade = document.querySelector("#quantidade");
const lista = document.querySelector("#listaProdutos");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#listaVazia");
const botaoFormulario = document.querySelector("#botaoFormulario");

let produtoEditando = null;

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    if (quantidade.value <= 0) {
        alert("A quantidade deve ser maior que zero.");
        return;
    }

    if (produtoEditando === null) {
        adicionarProduto();
    } else {
        salvarAlteracao();
    }

    formulario.reset();
});

function adicionarProduto() {
    const item = document.createElement("li");
    item.classList.add("item-produto");

    const texto = document.createElement("span");

    texto.textContent =
        nome.value + " - R$ " +
        Number(preco.value).toFixed(2).replace(".", ",") +
        " (" + quantidade.value + " un.)";

    const botoes = document.createElement("div");
    botoes.classList.add("botoes");

    const editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.classList.add("editar");

    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.classList.add("remover");

    editar.addEventListener("click", function() {
        nome.value = nomeDoProduto(texto);
        preco.value = precoDoProduto(texto);
        quantidade.value = quantidadeDoProduto(texto);

        produtoEditando = item;
        botaoFormulario.textContent = "Salvar alterações";
    });

    remover.addEventListener("click", function() {
        item.remove();
        atualizarLista();
    });

    botoes.appendChild(editar);
    botoes.appendChild(remover);

    item.appendChild(texto);
    item.appendChild(botoes);

    lista.appendChild(item);

    atualizarLista();
}

function salvarAlteracao() {
    const texto = produtoEditando.querySelector("span");

    texto.textContent =
        nome.value + " - R$ " +
        Number(preco.value).toFixed(2).replace(".", ",") +
        " (" + quantidade.value + " un.)";

    produtoEditando = null;
    botaoFormulario.textContent = "Adicionar produto";
}

function nomeDoProduto(texto) {
    return texto.textContent.split(" - ")[0];
}

function precoDoProduto(texto) {
    let valor = texto.textContent.split("R$ ")[1].split(" ")[0];
    return valor.replace(",", ".");
}

function quantidadeDoProduto(texto) {
    return texto.textContent.split("(")[1].split(" ")[0];
}

function atualizarLista() {
    const quantidadeProdutos = lista.children.length;

    contador.textContent =
        "Produtos cadastrados: " + quantidadeProdutos;

    if (quantidadeProdutos === 0) {
        listaVazia.style.display = "block";
    } else {
        listaVazia.style.display = "none";
    }
}