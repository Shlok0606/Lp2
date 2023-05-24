function FetchData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  xhr.send();
  xhr.onload = () => {
    let response = xhr.responseText;
    localStorage.setItem("users", response);
  };
  DisplayData();
}

function DisplayData() {
  let tbody = document.getElementById("tbody");
  let users = JSON.parse(localStorage.getItem("users"));
  tbody.innerHTML = "";
  users.forEach((element) => {
    tbody.innerHTML += `
          <tr>
              <td>${element.name}</td>
              <td>${element.username}</td>
              <td>${element.email}</td>
          </tr>
      `;
  });
}

FetchData();

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;

  let postObj = {
    name,
    username,
    email,
  };
  console.log(name);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users");
  //   xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
  xhr.send(JSON.stringify(postObj));

  xhr.onload = () => {
    if (xhr.status == 201) {
      let arr = JSON.parse(localStorage.getItem("users"));
      arr.unshift(postObj);
      localStorage.setItem("users", JSON.stringify(arr));
      DisplayData();
    }
  };
});
