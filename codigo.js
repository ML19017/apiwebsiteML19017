// Estructura de las filas
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
// Datos
var productos=null;
// Clasificacion
function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronics":code="c1";break;
	    	case "jewelery":code="c2";break;
		case "men's clothing":code="c3";break;
		case "women's clothing":code="c4";break;

	}
	return code;
}   
// Variable orden de fila
var orden=0;
// Llena las filas de la tabla
function listarProductos(productos) {
	// Obteniendo componentes de la tabla
	var precio=document.getElementById("price"); 
	precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	var num=productos.length;
	var listado=document.getElementById("listado");
	var formulario=document.getElementById("formulario");
	var ids,titles,prices,descriptions,categories,fotos, action;
	var tbody=document.getElementById("tbody"),nfila=0;
	tbody.innerHTML="";
	var catcode;
	// Se crean las filas que contendra la tabla
	for(i=0;i<num;i++)
		tbody.innerHTML+=fila;
	// Elemento Fila
	var tr; 
	// Obteniendo celda
	ids=document.getElementsByClassName("id");
	titles=document.getElementsByClassName("title");
	descriptions=document.getElementsByClassName("description");
	categories=document.getElementsByClassName("category");   
	fotos=document.getElementsByClassName("foto");   
	prices=document.getElementsByClassName("price");
	// Se evalua el orden de las filas
	if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	else if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	else if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	// Se cambia la visualizacion de los contenedores
	listado.style.display="block";
	formulario.style.display="block";
	// Se llena la tabla con los datos obtenidos
	for(nfila=0;nfila<num;nfila++) {
		ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
	}
}
// Realiza la operacion GET en la API
function obtenerProductos() {
	fetch("https://fakestoreapi.com/products").then(res=>res.json()).then(
		data=>{
			productos=data;
			productos.forEach(
			function(producto) {
				producto.price=parseFloat(producto.price);
			});
		listarProductos(data);
	});
}
// Ordena los elementos de la tabla de forma descendente
function ordenarDesc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
    	if(a[p_key] > b[p_key]) return -1;
		if(a[p_key] < b[p_key]) return 1;
		return 0;
   });
}
// Ordena los elementos de la tabla de forma ascendente
function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
    	if(a[p_key] > b[p_key]) return 1;
		if(a[p_key] < b[p_key]) return -1;
		return 0;
   });
}