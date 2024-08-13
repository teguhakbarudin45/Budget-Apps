const buttonBudget = document.getElementById("set-budget");
const buttonCekJumlah = document.getElementById("cek-jumlah");
const inputBudget = document.getElementById("input-budget");
const inputTitleProduct = document.getElementById("title-product");
const totalProduct = document.getElementById("cost-product")
const emptyBudget = document.getElementById("budget-error");
const emptyExpenses = document.getElementById("expenses-error");
const totalBudget = document.getElementById("total-budget");
const totalExpenses = document.getElementById("total-expenses");
const totalBalance = document.getElementById("total-balance");
const containerList = document.querySelector(".container-list")
const titleExpenses = document.querySelector(".title-expenses")
let tempAmount = 0; // set value 
let editingItems = null // menyimpan nilai yang sedang di edit

// Event Set budget
buttonBudget.addEventListener("click", () => {
   tempAmount = inputBudget.value
   // Jika value input budget kosong tampilkan pesan kesalahan
   if (tempAmount === "" || tempAmount < 0) {
      displayAlert("Value cannot be empty or negative", "error", "budget")
   }
   // Set budget
   totalBudget.innerHTML = tempAmount;
   // Set balance
   totalBalance.innerText = parseInt(tempAmount) - parseInt(totalExpenses.innerText)
   // Mengkosongkan value dari inputan
   inputBudget.value = ""
});


// Event Expenses
buttonCekJumlah.addEventListener("click", () => {
   if (inputTitleProduct.value === "" || totalProduct.value === "") {
      displayAlert("Values cannot be empty", "error", "expenses")
   } else {
      // Ngambil nilai dari input total product
      let expenditure = parseInt(totalProduct.value);
      // Total pengeluaran yang ada + total pengeluaran yan baru
      let sum = parseInt(totalExpenses.innerText) + expenditure;
      totalExpenses.innerText = sum;
      // Total balance
      const valueBalance = tempAmount - sum;
      totalBalance.innerText = valueBalance;

      // Jika ada items yang dipebaruhi maka jalankan block if
      // if(editingItems != null)
      if (editingItems) {
         // Update item yang sudah di edit
         editingItems.querySelector(".list-product").innerText = inputTitleProduct.value;
         editingItems.querySelector(".jumlah-expenses").innerText = totalProduct.value;
         // Jika sudah diperbaruhi reset lagi kesetingan null
         editingItems = null;

         // style button cek jumlah
         buttonCekJumlah.textContent = "Cek Jumlah";
         buttonCekJumlah.style.backgroundColor = "rgb(88, 126, 244)";

         // Mengubah title dari expenses
         titleExpenses.textContent = "Expenses"
      } else {
         // Menambah item jika, jika items tidak ada yang diperbaruhi
         // Create List
         addList(inputTitleProduct.value, totalProduct.value)
      }
      // Mengkosongkan value dari inputan
      inputTitleProduct.value = ""
      totalProduct.value = ""
   }
});


// Function  add list 
const addList = (nameProduct, expensesValue) => {
   const listItem = document.createElement("div")
   listItem.classList.add("list-items")
   listItem.innerHTML = `
      <p class="list-product">${nameProduct}</p>
      <p class="jumlah-expenses">${expensesValue}</p>
      <div class="modify-items">
         <button class="edit-item"><i class="fa-regular fa-pen-to-square"></i></button>
         <button class="hapus-item"><i class="fa-regular fa-trash-can"></i></i></button>
      </div>
   `

   // Event Edit Item
   const editItem = listItem.querySelector(".edit-item");
   editItem.addEventListener("click", () => {
      modifyElement(editItem)
   });

   // Event Delete item
   const deleteItem = listItem.querySelector(".hapus-item");
   deleteItem.addEventListener("click", () => {
      deleteItems(listItem)
   });

   containerList.append(listItem);
};


// Modify element
const modifyElement = (element) => {

   // Untuk mentarget parent dari element editItems
   // const parentDiv = element.currentTarget.closest(".list-items")
   const parentDiv = element.closest(".list-items")


   // Ambil nilai dari elemen-elemen terkait
   const currentBalance = totalBalance.innerText;
   const currentExpenses = totalExpenses.innerText
   let jumlahExpenses = parentDiv.querySelector(".jumlah-expenses").innerText
   let namaProduct = parentDiv.querySelector(".list-product").innerText

   // Isi inputan dengan nilai yang akan diubah
   inputTitleProduct.value = namaProduct
   totalProduct.value = jumlahExpenses

   /*
       Update totalExpenses dengan mengurangi jumlah expenses
       totalExpeneses = currentExspenses(totalExpenses) - jumlahExpenses
    */
   totalExpenses.innerText = parseInt(currentExpenses) - parseInt(jumlahExpenses)

   /*
      Upadate totalBalance dengan menambahkan jumlah expenses
      totalBalance = currentBalance(totalBalance) + jumlahExpenses
   */
   totalBalance.innerText = parseInt(currentBalance) + parseInt(jumlahExpenses)

   editingItems = parentDiv

   // style button cek jumlah
   buttonCekJumlah.textContent = "Save Change";
   buttonCekJumlah.style.backgroundColor = "rgb(255, 70, 90)";

   // Mengubah title dari expenses
   titleExpenses.textContent = "Editing Expenses"
};

const deleteItems = (element) => {
   /*
      Update totalExpenses dengan mengurangi jumlah expenses
      totalExpeneses = currentExspenses(totalExpenses) - jumlahExpenses
   */
   const currentExpenses = totalExpenses.innerText
   let jumlahExpenses = document.querySelector(".jumlah-expenses").innerText
   totalExpenses.innerText = parseInt(currentExpenses) - parseInt(jumlahExpenses);

   /*
      Upadate totalBalance dengan menambahkan jumlah expenses
      totalBalance = currentBalance(totalBalance) + jumlahExpenses
   */
   const currentBalance = totalBalance.innerText;
   totalBalance.innerText = parseInt(currentBalance) + parseInt(jumlahExpenses)

   element.remove()
}

// Function diplay alert
function displayAlert(text, content, type) {
   // variable untuk mentarget element
   let targetElement;
   if (type === 'budget') {
      // Value Empty budget
      targetElement = emptyBudget
   } else if (type === 'expenses') {
      // Value Empty Expenses
      targetElement = emptyExpenses
   }

   targetElement.textContent = text
   targetElement.classList.add(content)
   targetElement.classList.remove("hide")

   setTimeout(function () {
      targetElement.classList.add("hide")
   }, 1000);
};
