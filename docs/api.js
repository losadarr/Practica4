const searchBtn = document.querySelector('#boton');

//inicializar variables
var table = document.getElementById("tabla");
var coctel = "";
var categoria = "";
var instrucciones="";
var imagen="";
var variaciones="";

function generarTabla(){

    loading.classList.remove("visually-hidden");

    
    reiniciar();

    nombre="";


    let api = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+nombre;

    if (coctel !== null){
        nombre += coctel;
    }

    api = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+nombre ;

 
    console.log(api)
      
    
    fetch(api) //Devuelve una promise
            .then(response =>  response.json())
            .then(data => {
                //console.log(response)
                console.log("data")
                console.log(data)

                if(data.error){
                    document.querySelector('h1').innerHTML = "Lo sentimos, no existe ningun coctel";
                    return;
                }
                
                
                
                
                for(let i = 0;i<15;i++){
                    var img = document.createElement('img');
                    img.src = data.drinks[i].strImageSource;
                   

                    if(data.drinks.strDrink === null)
                    {
                        break
                    }
                    else{
                    console.log("coctels")
                    console.log(data.drinks[i])
                    console.log("tabla")

                    
   
                    // Create an empty <tr> element and add it to the last position of the table:
                    var row = table.insertRow(-1);
                    

                    // Insert new cells (<td> elements) of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
                    cell1.classList.add('align-middle');
                    var cell2 = row.insertCell(1);
                    cell2.classList.add('align-middle');
                    var cell3 = row.insertCell(2);
                    cell3.classList.add('align-middle');
                    var cell4 = row.insertCell(3);
                    cell4.classList.add('align-middle');
                    var cell5 = row.insertCell(4);
                    cell5.classList.add('align-middle');


                    // Add some text to the new cells:

                
                    
                    cell1.innerHTML = (data.drinks[i].strDrink) ;
                    ingr2 = [];
                    ingr2.push(data.drinks[i].strIngredient1);
                    ingr2.push(data.drinks[i].strIngredient2);
                    ingr2.push(data.drinks[i].strIngredient3);
                    ingr2.push(data.drinks[i].strIngredient4);
                    ingr2.push(data.drinks[i].strIngredient5);
                    ingr2.push(data.drinks[i].strIngredient6);
                    ingr2.push(data.drinks[i].strIngredient7);
                    ingr2.push(data.drinks[i].strIngredient8);
                    ingr2.push(data.drinks[i].strIngredient9);
                    ingr2.push(data.drinks[i].strIngredient10);
                    ingr="";

                    for(element in ingr2){

                        if (ingr2[element]== null)
                        {
                            break
                        }

                        else{

                        ingr += ingr2[element] + ", ";

                        }

                    }
                    cell2.innerHTML = ingr;
                    
                    cell3.innerHTML = data.drinks[i].strCategory;

                    
                    cell4.innerHTML = data.drinks[i].strInstructions;



                
                    }

                }
                

        })
    setTimeout(function(){
        table.visibility = "visible";
        document.getElementById('pagination').style.visibility = "visible";
        document.getElementById('tabla').style.visibility = "visible";
        loading.classList.add("visually-hidden");
    }, 200)
    
}


//recogemos info del form
document.addEventListener('DOMContentLoaded',function(){
    generarTabla();

    document.querySelector('form').onsubmit = () =>{
        //Recogemos los valores introducidos por el usuario
        coctel = document.querySelector('#coctel').value;

        //Limpiamos los campos
        document.querySelector('#coctel').value = "";

        generarTabla();
        //Stop form from submitting
        return false;
    }
});

console.log(coctel)

function reiniciar(){
    var rowCount = table.rows.length;
    for (var i = rowCount-1;i>0;i--){
        table.deleteRow(i);
    }
}