const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, '请输入有效邮箱')
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `请输入${input.name}`)
    } else {
      showSuccess(input);
    }
  })
  return isRequired;
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(input, `请输入${min}-${max}位数${input.name}`)
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '密码输入不一致')
  }
}

username.onblur = function () {
  checkLength(username, 6, 15);
}

email.onblur = function () {
  checkEmail(email);
}

password.onblur = function () {
  checkLength(password, 6, 25);

  if (this.value.trim() !== '') {
    checkPasswordsMatch(password, password2);
  }

}

password2.onblur = function () {
  checkLength(password2, 6, 25);

  if (this.value.trim() !== '') {
    checkPasswordsMatch(password, password2);
  }

}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 6, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

})