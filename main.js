const expenseInput = document.getElementById("expense");
const amountInput = document.getElementById("amount");
const addedBtn = document.getElementById("addedBtn");
const list = document.querySelector(".list")
const payCheckbox = document.getElementById("pay")
const totalSpan = document.getElementById("total")

addedBtn.addEventListener("click" , addExpense);

//event monitors in the list section
list.addEventListener("click", handleClick)

let expenses = []
//updating total amount value
function updateTotal(){
    var total = expenses.reduce((total,amount) => total + amount,0);
    totalSpan.innerText = `${total}`;
}


function addExpense(event){
    event.preventDefault();

    //if input values empty stop that function
    if(!amountInput.value || !expenseInput.value){
        alert("Please, fill out all required fields.")
        return
    }
    //create div and add item class
    const itemBox = document.createElement("div");
    itemBox.classList.add("item")
    // if paid section was ticked
    if(payCheckbox.checked){ 
        itemBox.classList.add("paid")
    }
    //itembox HTML theme
    itemBox.innerHTML = `
        <h2>${expenseInput.value}</h2>
        <h1>${amountInput.value}</h1>€
        <div class="buttons">
            <img id="edit" src="/images/payment-important.png" alt="">
            <img id="delete" src="/images/delete-important.png" alt="">
        </div>
    `;
    //added itembox to list
    list.appendChild(itemBox);
    //sending expenses to amountInput
    if(!payCheckbox.checked){
    expenses.push(Number(amountInput.value));
    }

    updateTotal()
    //cleaning input values
    amountInput.value = "";
    expenseInput.value= "";
}

//for tkicking function

function handleClick(e){
    const element = e.target

    if(e.target.id == "delete"){
        const spend = element.parentElement.parentElement;
        //removing element
        spend.remove()
        //total price in element
        const dropped = spend.querySelector("h1").innerText;
        //amount is dropping total price
        expenses.push(-Number(dropped));
        updateTotal()
    }
}