/* eslint-disable quotes */

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const result = document.getElementById("result");

const checkPassword = (p1, p2) => {
  if (p1 === p2) {
    return true;
  }
  return false;
};

const handleInput = () => {
  if (checkPassword(input1.value, input2.value) && input1.value === "" && input2.value === "") {
    result.textContent = "";
  } else if (checkPassword(input1.value, input2.value)) {
    result.textContent = "Las contraseñas coinciden";
    result.style.color = "green";
  } else {
    result.textContent = "Las contraseñas no coinciden";
    result.style.color = "red";
  }
};

input1.addEventListener("input", handleInput);

input2.addEventListener("input", handleInput);
