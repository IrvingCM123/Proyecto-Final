var loading = document.getElementById('loading');
var mensaje = document.getElementById('mensaje');
import { verUsuarios } from "../../Connection/Controllers/controlador";
import { router } from "../../Connection/Routes/routes";

var boton = document.getElementById('carga_ajax');
boton.addEventListener('click', function() {
loading.style.display = 'block';
router.get(verUsuarios)
axios.get('texto.txt', {
    responseType: 'text'
})
    .then(function(res) {
    if(res.status==200) {
        mensaje.innerHTML = res.data;
    }
    console.log(res);
    })
    .catch(function(err) {
    mensaje.innerText = 'Error de conexión ' + err;
    })
    .then(function() {
    loading.style.display = 'none';
    });
});
