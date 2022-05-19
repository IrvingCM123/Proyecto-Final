document.getElementById("Barra-Lateral").addEventListener("click", mostrar_menu);

function mostrar_menu(){
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}

//Ejecutando funciones
document.getElementById("funcion-buscar").addEventListener("click", mostrar_buscador);
document.getElementById("Funcion-Buscador").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search =       document.getElementById("Mostrar-Busqueda");
cover_ctn_search =  document.getElementById("Funcion-Buscador");
BuscarPalabra =       document.getElementById("BuscarPalabra");
box_search =        document.getElementById("Sugerencias");

function mostrar_buscador(){
    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    BuscarPalabra.focus();

    if (BuscarPalabra.value === ""){
        box_search.style.display = "none";
    }
}

function ocultar_buscador(){
    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    BuscarPalabra.value = "";
    box_search.style.display = "none";
}

document.getElementById("BuscarPalabra").addEventListener("keyup", buscador_interno);

function buscador_interno(){

    filter = BuscarPalabra.value.toUpperCase();
    li = box_search.getElementsByTagName("li");
    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            box_search.style.display = "block";

            if (BuscarPalabra.value === ""){
                box_search.style.display = "none";
            }
        }else{
            li[i].style.display = "none";
        }
    }
}

window.onload = function() { alert('Eureka Funciona!'); };

