// Assignment code here

let charset = {
  lowercase :"abcdefghijklmnopqrstuvwxyz",
  uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric : "0123456789",
  special : "!@#$%^&*()><=",
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function makePasswordFromConfig(config) {
  let passwordString = ""
  let targetIndex = 0;
  for (var i = 0; i < config.password_length; i++) {
    let characterType = ""
    let currentIndex = 0
    for (characterTypeTarget of Object.keys(config)) {
      if (currentIndex >= targetIndex && config[characterTypeTarget] == true) {
        currentIndex += 1;
        characterType = characterTypeTarget
        break;
      }
      currentIndex += 1;
    }
    targetIndex = currentIndex;
    if (characterType == "") {
      targetIndex = 0;
      config.password_length += 1;
    } else {
      passwordString = passwordString + charset[characterType].charAt(getRandomInt(charset[characterType].length));
    }
  }
  return passwordString
}

function generatePassword() { 

  let password_length = Number(window.prompt('How long do you want the password to be?'))
  if (password_length && password_length > 0) {
    let config = {
      password_length : password_length,
      lowercase : window.confirm("Include lowercase letters?"),
      uppercase: window.confirm("Include uppercase letters?"),
      numeric: window.confirm("Include numeric characters?"),
      special: window.confirm("Include special characters?"),
    }
    let valid = false
    for (option of Object.values(config)) {
      if (option == true) {
        valid = true
      }
    }
    if (!valid) {
      return {success: false, data: "Invalid options"}
    } else {
      return {success: true, data: makePasswordFromConfig(config)} ;
    }
  } else {
    return {success: false, data: "Invalid length"}
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  if (password.success) {
    passwordText.value = password.data;
  } else {
    window.alert(password.data)
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
