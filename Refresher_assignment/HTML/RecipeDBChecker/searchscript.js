const userName = "User";
var search_counter = 0;

if (localStorage.getItem("search_count")==null) {
    localStorage.setItem("search_count", 0)
}
document.getElementById("welcome").innerHTML = "Welcome " + userName +",";
getLocation()                               //Current location
async function successLocation(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    const api_key = "AnChWJhG73MBPQND8MHsMeLlMnAb16kDGzb7wVrONKG8Er0SqDzM-cWMUhZQ0azW"
    location_url = "http://dev.virtualearth.net/REST/v1/Locations/"+latitude.toString()+","+longitude.toString() + "?o=json&key="+api_key;
    console.log ("Talking to Bing Maps, for getting location");
    locationResponse = await fetch(location_url).then(response => response.json())
    var address =  (locationResponse.resourceSets[0].resources[0].name)

    document.getElementById("location").innerHTML = address;
}
function errorLocation(error) {
    console.error(error)
    document.getElementById("location").innerHTML = "Unable to get users location";
}
function getLocation() {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
  }
async function search() {
    // encode url
    // get response from url
    // print response as html divs

    var search_query = document.getElementById("search-box").value;
    search_counter++;

    var current_search_count = localStorage.getItem("search_count")

    current_search_count++;
    console.log(current_search_count);
    localStorage.setItem("search_count", current_search_count);
    // document.getElementById("total_searches").innerHTML = 
    
    var key = "search_" + search_counter;
    sessionStorage.setItem(key, search_query)

    var base_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    var url = base_url + encodeURIComponent(search_query);
    console.log(url)
    const response = await fetch(url)
                            .then(response => response.json());

    
    recent_searches_html = "";
    for (i=0; i<search_counter; i++) {
        var key = "search_" + i
        var value = sessionStorage.getItem(key)
        if (value!=null) {
            recent_searches_html = ("<li>" + value + "</li>" + "<br>") + recent_searches_html
        }
    }
    // recent_searches_html = ` <p> Total Searches So far = ` + localStorage.getItem("search_count") + `</p`; + recent_searches_html;

    recent_searches_innerHTML = `<p> Total Searches So far = ` + localStorage.getItem("search_count") + `</p>` + `<h3> Recent Searches: </h3>
        <ul>` + recent_searches_html + `</ul>`;
    document.getElementById("recent-searches").innerHTML = recent_searches_innerHTML


    if (response) {
        response_div = document.getElementById("search-results");
        response_div.innerHTML = ""
        console.log(response_div);

        for (const meal of response.meals) {
            var recipeId = meal.idMeal;
            var recipeName = meal.strMeal;
            var recipeArea = meal.strArea;
            var recipeCategory = meal.strCategory;
            var recipeInstructions = meal.strInstructions;
            var recipeSource = meal.strSource;
            var recipeTags = meal.strTags;
            //var recipeImage = meal.strMealThumb;
            var recipeYTLink = meal.strYoutube.replace("watch?v=", "embed/")
            var ingredientMap = new Map()
            for (let i=1; i < 21;  i++) {
                ingredient = "strIngredient" + i.toString()
                measure = "strMeasure" + i.toString()
                ingredientMap.set(meal[ingredient], meal[measure])
            }

            // Ingredients HTML
            var ingredientsHTML = `<ul id=ingredients-list>`
            ingredientMap.delete("")
            for (const [ingredient, measure] of ingredientMap.entries()) {
                ingredientsHTML = ingredientsHTML + "<li>" + "<b>" + ingredient + "</b>" +" : " + measure + "</li>";
            }
            ingredientsHTML += (`</ul>`)    
              
            htmlDiv = document.createElement("div");
            htmlDiv.id = "recipe";
            htmlDiv.innerHTML = `
                <a href = "`+ recipeSource + `"> <h3> ` + recipeName + `</h3> </a>
                <b>Cusine - ` + recipeArea +`</b> <br>
                <b>Recipe Ingredients:</b> <br>` + ingredientsHTML +`<b>Category - </b>` + recipeCategory + `<br><br>
                <b>Instructions - </b>` + recipeInstructions + `<br> <br>
                <b>Tags: </b> <em>`+ recipeTags + `</em> <br><br>
                <p align="center"> <iframe width="520" height="300" src="` + recipeYTLink + `"></iframe></p>`;

            response_div.appendChild(htmlDiv)
        }
    }

}


