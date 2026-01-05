const BASE_URL = "https://api.frankfurter.app/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    if(!response.ok) {
        alert("choose another country");
    }
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    console.log(rate);
    
    let finalAmount = amtval * rate;
    
    msg.innerText = `${amtval}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}
for (let select of dropdowns) {
    for (let curCode in countryList) {
        
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value= curCode;
        
        if(select.name === "From" && curCode === "USD") {
            newOption.selected = true;
        }
        else if(select.name === "To" && curCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})