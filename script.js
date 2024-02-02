const API_KEY = "rMGVB5qkPbUHmiuBAzbEbqzdIFyzKm15BIz2lbW9";
const URI = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&concept_tags=True&`;

const form = document.querySelector(".form");
const calendar = document.querySelector("#calendar");

const preloader = document.querySelector(".preloader");

const outputWrapper = document.querySelector(".output-wrapper");
const outputСontainer = document.querySelector(".output-container");
const outputTitle = document.querySelector(".output-title");
const outputDescription = document.querySelector(".output-description");
const outputDate = document.querySelector(".output-date");
const img = document.querySelector(".img");

const downloadBtn = document.querySelector(".download");
const downloadLink = document.querySelector(".downloadLink");

const errorOutput = document.querySelector(".error-output");

const getCurrentDate = () => {
    const d = new Date();
    const day = d.getDate() < 10 ? `0${d.getDate()}`:d.getDate() ;
    const month = d.getMonth() < 10 ? `0${d.getMonth() + 1}`:d.getMonth() ;
    const year = d.getFullYear();
    return `${year}-${month}-${day}`
}

calendar.value = getCurrentDate()
/* Preloader */
const loadPreloader = (loading) => {
    if(loading) {
        preloader.style.display = "block"; 
    }else {
        preloader.style.display = "none"; 
    }
}
/* Display Error */
const displayError = (error) => {
    errorOutput.innerHTML = error;
}
/* Display Data */
const displayData = (data) => {
    img.src = data.url
    outputWrapper.style.display = 'block';
    outputTitle.innerHTML= data.title;
    outputDescription.innerHTML = data.explanation;
    outputDate.innerHTML = data.date;
    downloadLink.href = data.url;
}
const fetchData = async (event) => {
    event.preventDefault();
    loadPreloader(true)
    try {
       const response = await fetch(`${URI}date=${calendar.value}`);
       const data = await response.json()

       if(response.ok){

        loadPreloader(false);
        displayData(data);
       }else {
        if(response.status === 400 ) throw new Error('Kindly check selected date!')
        if(response.status === 404 ) throw new Error('404 page not found!')
        if(response.status === 500) throw new Error('Server error. Please, try again later!')

       }
    } catch (error) {
        loadPreloader(false);
        displayError(error)
    }
}


form.addEventListener('submit', fetchData)