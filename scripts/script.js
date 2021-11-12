var formulario = document.body.querySelector('form');
var btnCadastrar = document.body.querySelector('button');
var arrayEnderecos = new Array();
var json_local_storage;
var _local_storage;

btnCadastrar.onclick = function() {
    var valor_endereco = document.getElementById('endereco');
    _local_storage = localStorage.getItem('enderecos');

    if (formulario.checkValidity()) {
        if (_local_storage === null) {
            var json = '{"enderecos": ["' + valor_endereco.value + '"]}';

            var objeto = JSON.parse(json);

            json_local_storage = JSON.stringify(objeto);
            localStorage.setItem('enderecos', json_local_storage);
        } else {

            arrayEnderecos = JSON.parse(_local_storage);
            arrayEnderecos['enderecos'].push(valor_endereco.value.trim());

            json_local_storage = JSON.stringify(arrayEnderecos);
            localStorage.setItem('enderecos', json_local_storage);
        }

        criarLista(valor_endereco.value.trim());

        setTimeout(() => valor_endereco.blur(), 0);
        valor_endereco.value = '';

    }
}

window.onload = function() {

}

function criarLista(valorEndereco) {
    var ul = document.getElementById('listaEnderecos');

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(valorEndereco));
    ul.appendChild(li);
    var button = document.createElement('button');
    button.innerText = "Excluir";
    button.className = "btnItemExcluir";
    button.style.marginLeft = '10px';
    button.setAttribute("id", valorEndereco);
    button.onclick = function() { excluir(this) };
    li.appendChild(button);
}

function excluir(elemento) {
    _local_storage = localStorage.getItem('enderecos');
    var objeto = JSON.parse(_local_storage);
    arrayEnderecos = objeto.enderecos;

    var novo_array = arrayEnderecos.filter(valor => valor !== elemento.id);

    objeto.enderecos = novo_array;
    _local_storage = JSON.stringify(objeto);
    localStorage.setItem('enderecos', _local_storage);

    elemento.parentElement.remove();

}