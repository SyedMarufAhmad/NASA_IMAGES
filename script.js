const apiKey = "TNz0s08zgGotn03utMOOawucWVlfVeYktksANDVu";
 
function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().slice(0, 10);

    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`)
    .then(response => response.json())
    .then (data => {
        console.log(data);
        const currentImageContainer= document.getElementById('current-image-container')
        currentImageContainer.innerHTML = `
        <h1>NASA Picture of the Day</h1>
        <img src="${data.hdurl}" alt="${data.title}">
        <h3>${data.title}</h3>
        <p>${data.explanation}</p>
        `;
       
    })
    .catch(error => console.log(error));
}

function getImageOfTheDay(selectedDate){
    // const currentDate = new Date().toISOString().split("T")[0];
  fetch(`https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
      const currentImageContainer = document.getElementById('current-image-container')
      currentImageContainer.innerHTML=`
      <h1>NASA Picture of the ${selectedDate}</h1>
      <img src="${data.hdurl}" alt="${data.title}"/>
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
      `;

    saveSearch(selectedDate);
    addSearchHistory(selectedDate);
     
  })
  .catch(error => console.log(error));
}

function saveSearch(date){
    console.log("exuekdlj")
    // localStorage.setItem("searches", date);
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}
function addSearchHistory(date){
    // let searches = JSON.parse(localStorage.getItem("searches"));
   const search = document.getElementById("search-history");
   const li= document.createElement("li");
   const link = document.createElement("a");
   link.href="javascript:void(0)"
   link.textContent=date;
   link.addEventListener('click' , function(){
    getImageOfTheDay(date);
   })
   li.appendChild(link);
   search.append(li);
}



document.getElementById("search-form").addEventListener('submit', function(event){
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];
    if(selectedDate>currentDate){
        alert("Please enter a valid date!");
        return;
    }
    getImageOfTheDay(selectedDate);
})
getCurrentImageOfTheDay();