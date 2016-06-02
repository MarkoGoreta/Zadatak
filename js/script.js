/**
 * Created by Marko on 21.5.2016..
 */

//******************************  TOOLTIP CONTROL  ******************************//

var tooltip1 = $('#tooltip1');
var tooltip2 = $('#tooltip2');

$(function ($) {
  //hide and disable tooltip on mouseclick
  tooltip1.tooltip().tooltip('show');
  $('html').click(function () {
    tooltip1.tooltip('disable').tooltip('hide');
  });

  $('#inputQuestion').hover(function () {
      tooltip1.tooltip('disable').tooltip('hide');
      tooltip2.tooltip('hide');
    }
  );
});

//******************************  NEXT BUTTON CLICK  ******************************//

var current_fs, next_fs, previous_fs;
var increment = 0;

$(".next, .submit").click(function () {
  if ($('#inputQuestion').val().length !== 0) {
    increment++;
    catBulColor();
    check(increment);

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    next_fs.show().addClass('animated fadeInRight');
    current_fs.hide();
  }
  else {
    tooltip2.tooltip('enable').tooltip('show').tooltip('disable');
  }
});

//******************************  BACK BUTTON CLICK  ******************************//

$(".previous").click(function () {
  increment--;
  catBulColor();

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //show the previous fieldset
  previous_fs.removeClass('animated fadeInRight').show().addClass('animated fadeInLeft');
  current_fs.hide();
});

//******************************  SENT (SUBMIT) BUTTON CLICK  ******************************//

$('.sent').click(function () {
  $('#fifthSet').hide();
  $('#firstSet').show().addClass('animated fadeInRight');
  clearTimeout(timerSubmit);
  increment = 0;

  resetForm();
});

//******************************  FORM RESET  ******************************//

var timerSubmit;

function check(increment) {
  if (increment == 4) {
    timerSubmit = setTimeout(function () {
      $('#fifthSet').hide();
      $('#firstSet').removeClass('animated fadeInRight').show().addClass('animated fadeInRight');
      increment = 0;

      resetForm();
    }, 7000);
  }
};

//******************************  FORM RESET FUNCTION  ******************************//

function resetForm() {
  $('.msform')[0].reset();
  carsDrop.css('visibility', 'hidden').removeClass('animated fadeInDown');
  setTimeout(function () {
    tooltip1.tooltip('enable').tooltip('show');
  }, 1000);
  buttonCat.addClass('buttonCategory');
}

//******************************  FORM EMAIL AND USERNAME VALIDATION  ******************************//

var username = $('#username');
var email = $('#email');

var checkIfUsernameExists = false;
var checkIfEmailExists = false;
var checkIfEmailIsValid = false;
var validated = false;

$('.formValidation').on('click', function () {
  var emailValue = email.val();
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

  if (email.val().length !== 0 && username.val().length === 0) {
    if (!testEmail.test(emailValue)) {
      if (checkIfEmailIsValid === false) {
        checkIfEmailIsValid = true;
        showEmailNotValid();
        return checkUsername();
      }
      return;
    }
  }

  if (username.val().length === 0 && email.val().length === 0) {
    removeInvalidEmailErrorWithEmpty();
    var name = checkUsername();
    var mail = checkEmail();
    return name && mail;
  }

  if (username.val().length === 0) {
    return checkUsername();
  }

  if (email.val().length === 0) {
    removeInvalidEmailErrorWithEmpty();
    return checkEmail();
  }

  if (email.val().length !== 0) {
    if (!testEmail.test(emailValue)) {
      if (checkIfEmailIsValid === false) {
        checkIfEmailIsValid = true;
        showEmailNotValid();
        return;
      }
      return;
    }
  }

  validated = true;
  increment++;
  catBulColor();
  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  next_fs.show().addClass('animated fadeInRight');
  current_fs.hide();
});

username.keypress(function () {
  if (checkIfUsernameExists === true) {
    removeUsernameError();
    checkIfUsernameExists = false;
  }
});

email.keypress(function () {
  if (checkIfEmailExists === true) {
    removeEmailError();
    checkIfEmailExists = false;
  }
  if (checkIfEmailIsValid === true) {
    removeInvalidEmailError();
    checkIfEmailIsValid = false;
  }
});

function checkUsername() {
  if (checkIfUsernameExists === false) {
    showUsernameError();
    checkIfUsernameExists = true;
    validated = false;
  }
}

function checkEmail() {
  if (checkIfEmailExists === false) {
    showEmailError();
    checkIfEmailExists = true;
    validated = false;
  }
}

function showUsernameError() {
  $("<br id='breakUsername'><p class='errorMessage' id='usernameError'>Username is required.</p>").insertAfter("#username");
  username.css('border', '2px solid red');
}

function showEmailError() {
  $("<br id='breakEmail'><p class='errorMessage' id='emailError' >Email is required.</p>").insertAfter("#email");
  email.css('border', '2px solid red');
}

function showEmailNotValid() {
  $("<br id='breakInvalidEmail'><p class='errorMessage' id='emailInvalidError' >Enter valid email.</p>").insertAfter("#email");
  email.css('border', '2px solid red');
}

function removeUsernameError() {
  $('#usernameError').fadeOut(700, function () {
    $(this).remove();
  });
  $('#breakUsername').fadeOut(700, function () {
    $(this).remove();
  });
  username.css('border', '');
}

function removeEmailError() {
  $('#emailError').fadeOut(700, function () {
    $(this).remove();
  });
  $('#breakEmail').fadeOut(700, function () {
    $(this).remove();
  });
  email.css('border', '');
}

function removeInvalidEmailError(){
  $('#emailInvalidError').fadeOut(700, function () {
    $(this).remove();
  });
  $('#breakInvalidEmail').fadeOut(700, function () {
    $(this).remove();
  });
  email.css('border', '');
}

function removeInvalidEmailErrorWithEmpty(){
  $('#emailInvalidError').remove();
  $('#breakInvalidEmail').remove();
}

//******************************  FORM BULLET SCROLL  ******************************//

var catBul1 = $('.catBul1');
var catBul2 = $('.catBul2');
var catBul3 = $('.catBul3');
var allCatBul = $('.catBullet');
var secondSet = $('#secondSet');
var thirdSet = $('#thirdSet');
var fourthSet = $('#fourthSet');

function catBulColor() {
  if (increment === 1) {
    allCatBul.css({'background-color': '#ffffff', 'opacity': '0.3'});
    catBul1.css({'background-color': '#ffffff', 'opacity': '1'});
  }

  if (increment === 2) {
    allCatBul.css({'background-color': '#ffffff', 'opacity': '0.3'});
    catBul2.css({'background-color': '#ffffff', 'opacity': '1'});
  }

  if (increment === 3) {
    allCatBul.css({'background-color': '#ffffff', 'opacity': '0.3'});
    catBul3.css({'background-color': '#ffffff', 'opacity': '1'});
  }
}

catBul1.click(function () {
  secondSet.removeClass('animated fadeInRight').show().addClass('animated fadeInLeft');
  thirdSet.hide();
  fourthSet.hide();

  increment = 1;
  catBulColor();
});

catBul2.click(function () {
  if (increment === 1) {
    secondSet.hide();
    thirdSet.removeClass('animated fadeInRight').removeClass('animated fadeInLeft').show().addClass('animated fadeInRight');
    fourthSet.hide();
  }

  if (increment === 3) {
    secondSet.hide();
    thirdSet.removeClass('animated fadeInRight').removeClass('animated fadeInLeft').show().addClass('animated fadeInLeft');
    fourthSet.hide();
  }

  increment = 2;
  catBulColor();
});

catBul3.click(function () {

  if (increment === 1) {

    secondSet.hide();
    thirdSet.removeClass('animated fadeInRight').removeClass('animated fadeInLeft').show().addClass('animated fadeInRight');
    fourthSet.hide();
    $('.formValidation').trigger('click');
    if (validated === true) {
      increment = 3;
      catBulColor();
    }
    else {
      increment = 2;
      catBulColor();
    }
  }

  if (increment === 2) {
    $('.formValidation').trigger('click');
    if (validated === true) {
      increment = 3;
      catBulColor();
    }
  }
});

//******************************  FORM - PREVENT DEFAULT  ******************************//

$('form').click(function (event) {
    event.preventDefault();
});

var imgCont1 = $('.imageContainer1');
var imgCont2 = $('.imageContainer2');

$(function () {
  imgCont2.click(function () {
    if ((parseInt(imgCont1.css('z-index'))) > (parseInt(imgCont2.css('z-index')))) {
      imgCont2.css('z-index', (parseInt(imgCont1.css('z-index')) + 1)).addClass('animated pulse');
      imgCont1.removeClass('animated pulse');
    }
  });
});

$(function () {
  imgCont1.click(function () {
    if ((parseInt(imgCont2.css('z-index'))) > (parseInt(imgCont1.css('z-index')))) {
      imgCont1.css('z-index', (parseInt(imgCont2.css('z-index')) + 1)).addClass('animated pulse');
      imgCont2.removeClass('animated pulse');
    }
  });
});

//******************************  TESTIMONIALS SLIDER  ******************************//

var intervalIndex = 1;
var slierDiv = $('.slider > div');
var bullet = $('.bullet');

function firstSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul1').css({'background-color': 'black', 'opacity': '0.5'});
  $('#firstImgContainer').css('visibility', 'visible').addClass('animated fadeInRight');
  intervalIndex = 1;
  window.clearTimeout(timeout);
  timeout = window.setInterval(function () {
    functionArray[intervalIndex++ % functionArray.length]();
  }, 7000);
}

function secondSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul2').css({'background-color': 'black', 'opacity': '0.5'});
  $('#secondImgContainer').css('visibility', 'visible').addClass('animated fadeInRight');
  intervalIndex = 2;
  window.clearTimeout(timeout);
  timeout = window.setInterval(function () {
    functionArray[intervalIndex++ % functionArray.length]();
  }, 7000);
}

function thirdSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul3').css({'background-color': 'black', 'opacity': '0.5'});
  $('#thirdImgContainer').css('visibility', 'visible').addClass('animated fadeInRight');
  intervalIndex = 3;
  window.clearTimeout(timeout);
  timeout = window.setInterval(function () {
    functionArray[intervalIndex++ % functionArray.length]();
  }, 7000);
}

function fourthSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul4').css({'background-color': 'black', 'opacity': '0.5'});
  $('#fourthImgContainer').css('visibility', 'visible').addClass('animated fadeInRight');
  intervalIndex = 4;
  window.clearTimeout(timeout);
  timeout = window.setInterval(function () {
    functionArray[intervalIndex++ % functionArray.length]();
  }, 7000);
}

function fifthSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul5').css({'background-color': 'black', 'opacity': '0.5'});
  $('#fifthImgContainer').css('visibility', 'visible').addClass('animated fadeInRight');
  intervalIndex = 5;
  window.clearTimeout(timeout);
  timeout = window.setInterval(function () {
    functionArray[intervalIndex++ % functionArray.length]();
  }, 7000);
}

var functionArray = [firstSlide, secondSlide, thirdSlide, fourthSlide, fifthSlide];

var timeout = window.setInterval(function () {
  functionArray[intervalIndex++ % functionArray.length]();
}, 7000);

//******************************  FILTER JSON FILE - CARS  ******************************//

var selectBox = $('#selectBox');
var carsDrop = $('#carsDropdown');

var cars, keys, yearVar, makeVar, modelVar;

var jsonKeys = [], jsonYears = [], jsonMake = [], jsonModel = [];

function arrayOfKeys(key) {
  for (var obj in key) break;
  {
    if (key.hasOwnProperty(obj)) {
      for (var prop in key[obj]) {
        if (!jsonKeys.hasOwnProperty(prop)) {
          jsonKeys.push(prop);
        }
      }
    }
  }
  return jsonKeys;
}

function arrayOfYears(years) {
  $.each(years, function (index, value) {
    if ($.inArray(value.year, jsonYears) == -1) {
      jsonYears.push(value.year);
    }
  });
  return jsonYears;
}

function arrayOfMake(makes) {
  $.each(makes, function (index, value) {
    if ($.inArray(value.make, jsonMake) == -1) {
      jsonMake.push(value.make);
    }
  });
  return jsonMake;
}

function arrayOfModel(models) {
  $.each(models, function (index, value) {
    if ($.inArray(value.model, jsonModel) == -1) {
      jsonModel.push(value.model);
    }
  });
  return jsonModel;
}

function showYears(years) {
  $.each(years, function (key, value) {
    yearRef
      .append($("<option>")
        .attr("value", key)
        .text(value))
      .append(value)
      .append("</option>");
  });
}

function showModels(model) {
  $.each(model, function (key, value) {
    modelRef
      .append($("<option>")
        .attr("value", key)
        .text(value))
      .append(value)
      .append("</option>");
  });
}

function showMakes(make) {
  $.each(make, function (key, value) {
    makeRef
      .append($("<option>")
        .attr("value", key)
        .text(value))
      .append(value)
      .append("</option>");
  });
}

function removeDuplicateMakes() {
  var usedNames = {};
  $("#makeRef > option").each(function () {
    if (usedNames[this.text]) {
      $(this).remove();
    } else {
      usedNames[this.text] = this.value;
    }
  });
}

var yearRef = $('#yearRef');
var makeRef = $('#makeRef');
var modelRef = $('#modelRef');

var buttonCat = $('.buttonCategory');

selectBox.on('change', function () {
  if ($('option[value="cars"]').is(':selected')) {

    $.getJSON("cars.json", function (data) {
      cars = data;
      keys = arrayOfKeys(cars);
      var years = arrayOfYears(cars);
      var model = arrayOfModel(cars);
      var make = arrayOfMake(cars);

      yearVar = keys[0];
      makeVar = keys[1];
      modelVar = keys[2];

      capitalizeAndFillYear(yearVar);
      capitalizeAndFillMake(makeVar);
      capitalizeAndFillModel(modelVar);

      showYears(years);
      showMakes(make);
      showModels(model);
      removeDuplicateMakes();

      carsDrop.css('visibility', 'visible').addClass('animated fadeInDown');
      buttonCat.addClass('buttonAnimDown');

      setTimeout(function () {
        carsDrop.removeClass('animated fadeInDown')
        buttonCat.removeClass('buttonCategory').removeClass('buttonAnimDown');
      }, 1000);
      //printCars()
    });
  }
  else if (carsDrop.css('visibility') == 'visible') {
    carsDrop.css('visibility', 'hidden').removeClass('animated fadeInDown');
    buttonCat.addClass('buttonAnimUp');
    setTimeout(function () {
      buttonCat.removeClass('buttonAnimUp').addClass('buttonCategory');
    }, 1000)
  }
});

//******************************  Capitalize first letter of a string  ******************************//

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function capitalizeAndFillYear(yearVar) {

  var year = yearVar.capitalizeFirstLetter();

  yearRef
    .append($("<option selected disabled>")
      .attr("value", year)
      .text(year))
    .append(year)
    .append("</option>");
}

function capitalizeAndFillMake(makeVar) {
  var make = makeVar.capitalizeFirstLetter();

  makeRef
    .append($("<option selected disabled>")
      .attr("value", make)
      .text(make))
    .append(make)
    .append("</option>");
}

function capitalizeAndFillModel(modelVar) {
  var model = modelVar.capitalizeFirstLetter();

  modelRef
    .append($("<option selected disabled>")
      .attr("value", model)
      .text(model))
    .append(model)
    .append("</option>");
}

yearRef.change(function () {

  var currentYear = $('#yearRef option:selected').text();
  var models = filterModelsOnYear(currentYear);
  var makes = filterMakesOnYear(currentYear);

  makeRef.find('option')
    .remove();

  modelRef.find('option')
    .remove();

  capitalizeAndFillMake(makeVar);
  capitalizeAndFillModel(modelVar);

  showMakes(makes);
  removeDuplicateMakes();
  showModels(models);
});

makeRef.change(function () {

  var currentYear = $('#yearRef option:selected').text();
  var currentMake = $('#makeRef option:selected').text();
  var models = filterModelOnMakesAndYear(currentYear, currentMake);

  modelRef.find('option')
    .remove();

  capitalizeAndFillModel(modelVar);
  showModels(models);
});

function filterModelsOnYear(year) {
  var filteredModels = [];
  cars.forEach(function (car) {
    if (car.year === year) {
      filteredModels.push(car.model);
    }
  });
  return filteredModels;
}

function filterMakesOnYear(year) {
  var filteredMakes = [];
  cars.forEach(function (car) {
    if (car.year === year) {
      filteredMakes.push(car.make);
    }
  });
  return filteredMakes;
}

function filterModelOnMakesAndYear(year, make) {
  var filteredModels = [];
  cars.forEach(function (car) {
    if (car.year === year && car.make === make) {
      filteredModels.push(car.model);
    }
  });
  return filteredModels;
}
