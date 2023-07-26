var prodName = document.getElementById("prodName");
var prodPrice = document.getElementById("prodPrice");
var prodDesc = document.getElementById("prodDesc");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var products = [];
//check if there are array in local storage get and display it in the table
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}
btnAdd.addEventListener("click", getProduct);
function getProduct() {
  if (
    validationProductName() &&
    validationProductPrice() &&
    validationProductDesc()
  ) {
    var productObject = {
      name: prodName.value,
      price: prodPrice.value,
      desc: prodDesc.value,
    };
    products.push(productObject);
    localStorage.setItem("products", JSON.stringify(products));
    displayProduct();
    clear();
    prodName.classList.remove("is-valid");
    prodPrice.classList.remove("is-valid");
    prodDesc.classList.remove("is-valid");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    Swal.fire({
      icon: "error",
      position: "center",
      title: "All fields are required",
      confirmButtonText: "ok",
    });
  }
}
// display products from array into the table
function displayProduct() {
  var box = ``;
  for (let i = 0; i < products.length; i++) {
    box += `
  <tr>
  <td>${i + 1}</td>
  <td>${products[i].name}</td>
  <td>${products[i].price}</td>
  <td>${products[i].desc}</td>
  <td><button onclick="deleteElement(${i})" class="btn btn-danger fw-semibold">Delete</button>
  <button onclick="changeButton(${i})" class="btn btn-warning fw-semibold">Update</button></td>
  </tr>
  `;
  }
  document.getElementById("demo").innerHTML = box;
}
// clear the form after we push
function clear() {
  prodName.value = "";
  prodPrice.value = "";
  prodDesc.value = "";
}
// delete item from table (array and local storage)
function deleteElement(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct();
}
// search items in table
function search(search) {
  var box = ``;
  for (let i = 0; i < products.length; i++) {
    if (
      JSON.stringify(products[i]).toLowerCase().includes(search.toLowerCase())
    ) {
      box += `
      <tr>
      <td>${i + 1}</td>
      <td>${products[i].name.replace(
        search,
        `<span class="bgMark">${search}</span>`
      )}</td>
      <td>${products[i].price.replace(
        search,
        `<span class="bgMark">${search}</span>`
      )}</td>
      <td>${products[i].desc.replace(
        search,
        `<span class="bgMark">${search}</span>`
      )}</td>
      <td><button onclick="deleteElement(${i})" class="btn btn-danger fw-semibold">Delete</button>
      <button onclick="changeButton(${i})" class="btn btn-warning fw-semibold">Update</button></td>
      </tr>
      `;
    }
  }
  document.getElementById("demo").innerHTML = box;
}
//change button from add to update
var index = ``;
function changeButton(term) {
  btnAdd.classList.replace("d-block", "d-none");
  btnUpdate.classList.replace("d-none", "d-block");
  prodName.value = products[term].name;
  prodPrice.value = products[term].price;
  prodDesc.value = products[term].desc;
  index = term;
}
btnUpdate.addEventListener("click", pullAndUpdate);
function pullAndUpdate() {
  var productObject = {
    name: prodName.value,
    price: prodPrice.value,
    desc: prodDesc.value,
  };
  products[index] = productObject;
  localStorage.setItem("products", JSON.stringify(products));
  displayProduct();
  clear();
  btnAdd.classList.replace("d-none", "d-block");
  btnUpdate.classList.replace("d-block", "d-none");
  prodName.classList.remove("is-valid");
  prodPrice.classList.remove("is-valid");
  prodDesc.classList.remove("is-valid");
}
// validate product name
function validationProductName() {
  let regex = /^([a-z]|[A-Z]|[0-9]){2,}\-{0,2}([a-z]|[A-Z]|[0-9]){0,}$/;
  return regex.test(prodName.value);
}
prodName.addEventListener("keyup", checkValidateName);
function checkValidateName() {
  if (validationProductName()) {
    prodName.classList.replace("is-invalid", "is-valid");
  } else {
    prodName.classList.add("is-invalid");
  }
}
// validate product price
function validationProductPrice() {
  let regex = /^[1-9][0-9]{0,}$/;
  return regex.test(prodPrice.value);
}
prodPrice.addEventListener("keyup", checkValidatePrice);
function checkValidatePrice() {
  if (validationProductPrice()) {
    prodPrice.classList.replace("is-invalid", "is-valid");
  } else {
    prodPrice.classList.add("is-invalid");
  }
}
// validate product description
function validationProductDesc() {
  let regex = /^\S\D{2,}$/;
  return regex.test(prodDesc.value);
}
prodDesc.addEventListener("keyup", checkValidateDesc);
function checkValidateDesc() {
  if (validationProductDesc()) {
    prodDesc.classList.replace("is-invalid", "is-valid");
  } else {
    prodDesc.classList.add("is-invalid");
  }
}
