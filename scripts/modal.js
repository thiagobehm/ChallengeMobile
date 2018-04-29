var modal = document.getElementById('modalEndereco');

//Botão que abre a modal
var btn = document.getElementById("btnModal");

// Pega o valor do span para fechar o modal
var span = document.getElementsByClassName("fechar-modal")[0];

function abrirModal() {
    modal.style.display = "block";
}

// Quando usuário clica no ícone(x) para fechar
function fecharModal() {
    modal.style.display = "none";
}

// Quando usuário clica fora da modal, fecha a mesma
function dismissModal(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Listeners
btn.addEventListener('click', abrirModal);
span.addEventListener('click', fecharModal);
window.addEventListener('click', dismissModal);