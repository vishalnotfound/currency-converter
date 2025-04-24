const API_BASE = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

//populate the select option list

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        //default slect usd and inr

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

        //falg changed
        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
        });
    }
}

//update flag logic
const updateFlag = (element) =>{
    //elemtnt here iss target elemnet for now its select element 
    let currCode = element.value; //gives usd or inr etc
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");  //targets the select elemnt for both to and from conatiners
    img.src = newSrc;
}

//logic to update exhange

const updateExchange = async () => {
    let amount = document.querySelector(".amount input").value;
    if(amount==="" || amount < 1){
        amount = 1;
        document.querySelector(".amount input").value = "1";
    }

    const res =  await fetch(`${API_BASE}${fromCurr.value.toLowerCase()}`);
    const data = await res.json();
    let rates = data.rates[`${toCurr.value}`];
    let totalAmt = rates * amount;
    console.log(totalAmt);
    

    //show in msg
    let msg = document.querySelector(".msg");
    msg.innerText = `${amount} ${fromCurr.value} is ${totalAmt.toFixed(2)} ${toCurr.value}`;


    console.log(data);
    

}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange(); //call the fn to update the exchage rate.
});

window.addEventListener("load", ()=>{
    updateExchange();
});


