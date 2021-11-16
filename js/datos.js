var map;
//en este array se van a guardar los datos de servicio
var datos = new Array();
var totalpedido = 0;

//boton de lupa
document.getElementById("lupa").addEventListener("click", generarAlmacen, false);

class servicios {
    constructor(id, Descripcion, Tipo, Direccion, Latitud, Longitud, Precio, Duracion) {
        this.codigo = id;
        this.descripcion = Descripcion;
        this.tipo = Tipo;
        this.direccion = Direccion;
        this.latitud = Latitud;
        this.longitud = Longitud;
        this.precio = Precio;
        this.duracion = Duracion;

    }
    leerRegistro() {
        return this;
    }
}
//funcion para generar el almacen 
function generarAlmacen(evt) {

    var cuerpoa = document.querySelector("#cuerpoServicios");
    cuerpoa.innerHTML = "";

    for (i = 0; i < datos.length; i++) {

        registro = datos[i];

        //boton id
        linea = document.createElement("tr");
        botonId = document.createElement("button");
        // En el atributo  del button creado paso el artículo seleccionado pedido  
        //guardamos el registro con todos los datos del servicio seleccionado
        //botonId.datosRegistro= registro
        botonId.registro = registro;
        //cuando le demos al boton llamamos al metodo contratar servicio
        botonId.addEventListener("click", contratarServicio, true)
        dato = document.createTextNode(registro.codigo);
        botonId.appendChild(dato);
        col = document.createElement("td");
        col.appendChild(botonId);
        linea.appendChild(col);

        //descripcion 
        dato = document.createTextNode(registro.descripcion);
        col = document.createElement("td");
        col.appendChild(dato);
        linea.appendChild(col)

        //precio
        dato = document.createTextNode(registro.precio);
        col = document.createElement("td");
        col.appendChild(dato);
        linea.appendChild(col)

        //duracion 
        dato = document.createTextNode(registro.duracion);
        col = document.createElement("td");
        col.appendChild(dato);
        linea.appendChild(col)

        //direccion 
        dato = document.createTextNode(registro.direccion);
        col = document.createElement("td");
        col.appendChild(dato);
        linea.appendChild(col)
 /*
        contrnrdorMapa= document.createElement("div");
        contrnrdorMapa.id="id_"+registro.codigo;
        map = new google.maps.Map(
            document.getElementById(  contrnrdorMapa.id), {
            // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
                center: new google.maps.LatLng(latitud,longitud),//latitud,longitud),//
               // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
            zoom: 18, // zoom del mapa
            draggableCursor: 'auto', // forma del cursor
            draggingCursor: 'crosshair',
            mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
        });

        col = document.createElement("td");
        col.appendChild(contrnrdorMapa);
        linea.appendChild(col)
*/
       cuerpoa.appendChild(linea);

    }
  

}
function contratarServicio() {
    //registro=this.datosRegistro ;
    registro=this.registro ;
      map = new google.maps.Map(
         document.getElementById('map_canvas'), {
             
         // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
             center: new google.maps.LatLng(registro.latitud,registro.longitud),//latitud,longitud),//
            // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
         zoom: 18, // zoom del mapa
         draggableCursor: 'auto', // forma del cursor
         draggingCursor: 'crosshair',
         mapTypeId: google.maps.MapTypeId.HYBRID // tipo de mama
     }); 
     // Tabla Pedidos

     var cuerpoPedido = document.querySelector("#cuerpoPedido");
     
     //boton id
     linea = document.createElement("tr");
     botonId = document.createElement("button");
     // En el atributo  del button creado paso el artículo seleccionado pedido  
     botonId.registro = registro;    
     dato = document.createTextNode(registro.codigo);
     botonId.appendChild(dato);
     col = document.createElement("td");
     col.appendChild(botonId);
     linea.appendChild(col);

    //descripcion 
     dato = document.createTextNode(registro.descripcion);
     col = document.createElement("td");
     col.appendChild(dato);
     linea.appendChild(col)

     //precio
     dato = document.createTextNode(registro.precio);
     col = document.createElement("td");
     col.appendChild(dato);
     linea.appendChild(col)
     
     //cantidad 
     var cantidad = document.createElement("input");
     cantidad.type="text"
     cantidad.registro = registro;
     //llamamos al metodo calculo importe
     cantidad.addEventListener("keyup", calculoimporte, false)
     cantidad.codigoArticulo=registro.codigo;
     cantidad.title=registro.codigo;
     col = document.createElement("td");
     col.appendChild(cantidad);
     linea.appendChild(col)

     //importe
     var importe = document.createElement("input");
     importe.type="text"
     importe.disabled="true"
     col = document.createElement("td");
     col.appendChild(importe);
     linea.appendChild(col)


     cuerpoPedido.appendChild(linea);

     this.removeEventListener("click", contratarServicio, true);
 
}
//funcion importe
function calculoimporte() {

    articuloventa = this.registro;
    // var precio = articuloventa.precio;
    //aqui this el input, el value es el dato que introducimos 
    var precio =this.value
    var cantidad = this.value
    //calculamos el importe 
    var iimporte = parseFloat(precio) * parseFloat(cantidad);
       /* 
        let cajaimporte = document.getElementById("c"+articuloventa.codigoArticulo);
        alert(cajaimporte.value);
        let anterior=cajaimporte.value;
        let importeanterior = parseFloat(cajaimporte.value);

        if(isNaN(importeanterior)){
            importeanterior=0;
        }
        
        cajaimporte.value= importe;

        if(isNaN(cajaimporte.value)){
            cajaimporte.value=0;
        }

        if(isNaN(totalpedido)){
            totalpedido=0;
        }
        
        totalpedido = totalpedido + importe - importeAnterior;
        var ctotal = document.querySelector("#total");
        ctotal.value = totalpedido;
    */
        articuloventa = this.registro;
        var precio = articuloventa.precio;
        var cantidad = this.value
        var importeLinea = parseFloat(precio) * parseFloat(cantidad);
    
        var lineaPadre = this.parentElement.parentElement;
       
        var hijosVentaPedido = lineaPadre.childNodes;
       
        var importelinea = hijosVentaPedido[4].firstChild;
    
        var importeAnterior = parseFloat(importelinea.value);  
        if (isNaN(importeAnterior)) {
            importeAnterior = 0;
        }
        
        importelinea.value = importeLinea
        if (isNaN(importelinea.value)) {
            importelinea.value = '0';
        }
        if (isNaN(totalpedido)) {
            totalpedido = 0;
        }
        totalpedido = totalpedido + importeLinea - importeAnterior;
        var ctotal = document.querySelector("#total");
        ctotal.value = totalpedido;
        
        if (isNaN( ctotal.value )) {
            ctotal.value  = 0;
        }
    
   
}
