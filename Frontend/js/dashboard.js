// Script para activar el link del menu lateral
var lista = document.querySelectorAll('.nav li');
function activarLink(){
    lista.forEach((item)=>
        item.classList.remove('active'));
    this.classList.add('active');
}

lista.forEach((item)=>
    item.addEventListener('mouseover', activarLink));

// Script para mostrar y ocultar el menu lateral
var toogle = document.querySelector('.toogle');
var nav = document.querySelector('.nav');
var container = document.querySelector('.container');

toogle.onclick = function(){
    nav.classList.toggle('active');
    container.classList.toggle('active');
}