/**
 * Created by Marko on 21.5.2016..
 */

//******************************  BOOTSTRAP SELECT  ******************************//
var selPick = $(".selectpicker");
selPick.selectpicker({
  size: 6
});

//******************************  TOOLTIP CONTROL  ******************************//

var tooltip1 = $('#tooltip1');
var tooltip2 = $('#tooltip2');

$(function ($) {
  //hide and disable tooltip on mouseclick
  tooltip1.tooltip({trigger: "manual"}).tooltip('show');
  tooltip2.tooltip({trigger: "manual"}).tooltip('hide');
  $('html').click(function () {
    tooltip1.tooltip('disable').tooltip('hide');
    tooltip2.tooltip('enable');
  });
});

//******************************  NEXT BUTTON CLICK  ******************************//

var current_fs, next_fs, previous_fs;
var increment = 0;
var inputQuestion = $('#inputQuestion');
var tooltip2Visible = false;

$(".next, .submit").click(function () {
  if (inputQuestion.val().length !== 0) {
    increment++;
    catBulColor();
    checkSize();
    check(increment);

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    next_fs.show().addClass('animated fadeInRight');
    current_fs.hide();
  }
  else {
    if (tooltip2Visible === false) {
      tooltip2.tooltip('enable');
      tooltip2.tooltip({trigger: "manual"}).tooltip('show').tooltip('disable');
      tooltip2Visible = true;
    }
  }
});

inputQuestion.keyup(function () {
  if (!this.value) {
    tooltip2.tooltip('enable').tooltip('show');
    tooltip2Visible = true;
  }
  else {
    tooltip2.tooltip('enable').tooltip('hide');
    tooltip2Visible = false;
  }
});

//******************************  BACK BUTTON CLICK  ******************************//

$(".previous, .previousMobile").click(function () {
  increment--;
  checkSize();
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
  resetForm();
});

//******************************  FORM RESET  ******************************//

var timerSubmit;

function check(increment) {
  if (increment == 4) {
    timerSubmit = setTimeout(function () {
      $('#fifthSet').hide();
      $('#firstSet').removeClass('animated fadeInRight').show().addClass('animated fadeInRight');

      resetForm();
    }, 7000);
  }
};

//******************************  FORM RESET FUNCTION  ******************************//

var wantWhen = $('#wantWhen');
function resetForm() {
  $('.msform')[0].reset();
  increment = 0;
  selectBox.selectpicker('refresh');
  wantWhen.selectpicker('refresh');
  tooltip2Visible = false;
  carsDrop.css('visibility', 'hidden').removeClass('animated fadeInDown');
  setTimeout(function () {
    tooltip1.tooltip('enable').tooltip('show');
    tooltip2.tooltip('disable');
  }, 1000);
  buttonCat.addClass('buttonCategory');
}

//******************************  Prevent enter submit  ******************************//
//
$(document).ready(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

//******************************  FORM EMAIL AND USERNAME VALIDATION  ******************************//

var username = $('#username');
var email = $('#email');
var userError = $('#usernameError');
var emailError = $('#emailError');

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
  //$("<br id='breakUsername'><p class='errorMessage' id='usernameError'>Username is required.</p>").insertAfter("#username");
  username.css('border', '2px solid red');
  userError.text('This field is required.');
  userError.css('visibility', 'visible').css('display', 'inherit').addClass('animated fadeInUp');
}

function showEmailError() {
  //$("<br id='breakEmail'><p class='errorMessage' id='emailError' >Email is required.</p>").insertAfter("#email");
  email.css('border', '2px solid red');
  emailError.text('Email is required.');
  emailError.css('visibility', 'visible').css('display', 'inherit').addClass('animated fadeInUp');
}

function showEmailNotValid() {
  //$("<br id='breakInvalidEmail'><p class='errorMessage' id='emailInvalidError' >Enter valid email.</p>").insertAfter("#email");
  email.css('border', '2px solid red');
  emailError.text('Enter valid email address.');
  emailError.css('visibility', 'visible').css('display', 'inherit').addClass('animated fadeInUp');
}

function removeUsernameError() {
  userError.fadeOut(700, function () {
    userError.css('visibility', 'hidden');
  });
  //$('#breakUsername').fadeOut(700, function () {
  //  $(this).remove();
  //});
  username.css('border', '');
  userError.removeClass('animated fadeInUp');

}

function removeEmailError() {
  emailError.fadeOut(700, function () {
    emailError.css('visibility', 'hidden');
  });
  //$('#breakEmail').fadeOut(700, function () {
  //  $(this).remove();
  //});
  email.css('border', '');
  emailError.removeClass('animated fadeInUp');
}

function removeInvalidEmailError() {
  emailError.fadeOut(700, function () {
    emailError.css('visibility', 'hidden');
  });
  //$('#breakInvalidEmail').fadeOut(700, function () {
  //  $(this).remove();
  //});
  email.css('border', '');
  emailError.removeClass('animated fadeInUp');
}

function removeInvalidEmailErrorWithEmpty() {
  //userError.css('visibility','hidden')
  //emailError.css('visibility','hidden')
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

$('form').submit(function (event) {
  event.preventDefault();

  $.ajax({
    type: "POST",
    url: "test.php",
    data: $('form').serialize(),
    success: function () {
      alert("poslano");
    }
  });
  return false;

});

//******************************  TESTIMONIALS - Z index  ******************************//

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
var firstImgContainer = $('#firstImgContainer');
var secondImgContainer = $('#secondImgContainer');
var thirdImgContainer = $('#thirdImgContainer');
var fourthImgContainer = $('#fourthImgContainer');
var fifthImgContainer = $('#fifthImgContainer');

function firstSlide() {
  slierDiv.css('visibility', 'hidden').removeClass('animated fadeInRight');
  bullet.css({'background-color': '#d8d8d8', 'opacity': '1'});
  $('.bullet#bul1').css({'background-color': 'black', 'opacity': '0.5'});
  firstImgContainer.css('visibility', 'visible').addClass('animated fadeInRight');
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
  secondImgContainer.css('visibility', 'visible').addClass('animated fadeInRight');
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
  thirdImgContainer.css('visibility', 'visible').addClass('animated fadeInRight');
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
  fourthImgContainer.css('visibility', 'visible').addClass('animated fadeInRight');
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
  fifthImgContainer.css('visibility', 'visible').addClass('animated fadeInRight');
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
  return jsonYears.sort();
}

function arrayOfMake(makes) {
  $.each(makes, function (index, value) {
    if ($.inArray(value.make, jsonMake) == -1) {
      jsonMake.push(value.make);
    }
  });
  return jsonMake.sort();
}

function arrayOfModel(models) {
  $.each(models, function (index, value) {
    if ($.inArray(value.model, jsonModel) == -1) {
      jsonModel.push(value.model);
    }
  });
  return jsonModel.sort();
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

function removeDuplicateModel() {
  var usedNames = {};
  $("#modelRef > option").each(function () {
    if (usedNames[this.text]) {
      $(this).remove();
    } else {
      usedNames[this.text] = this.value;
    }
  });
}

function removeDuplicateYears() {
  var usedNames = {};
  $("#yearRef > option").each(function () {
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
//var spinner = $('.spinner');

selectBox.on('change', function () {

  if ($('option[value="Cars"]').is(':selected')) {

    //spinner.css('visibility', 'visible');
    $.getJSON("cars.json", function (data) {
      cars = data;
      keys = arrayOfKeys(cars);
      var years = arrayOfYears(cars);
      var model = arrayOfModel(cars);
      var make = arrayOfMake(cars);

      //yearVar = keys[0];
      //makeVar = keys[1];
      //modelVar = keys[2];

      //capitalizeAndFillYear(yearVar);
      //capitalizeAndFillMake(makeVar);
      //capitalizeAndFillModel(modelVar);

      //showYears(years);
      showMakes(make);
      //showModels(model);
      removeDuplicateMakes();

      //yearRef.addClass('selectpicker');
      //makeRef.addClass('selectpicker');
      //modelRef.addClass('selectpicker');
      $('.selectpicker').selectpicker({
        size: 11
      }).selectpicker('refresh');

      //spinner.css('visibility', 'hidden');

      carsDrop.css('visibility', 'visible').addClass('animated fadeInDown');
      buttonCat.addClass('buttonAnimDown');

      setTimeout(function () {
        carsDrop.removeClass('animated fadeInDown');
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
    .append()
    .attr("title", year);
  //.append($("<option selected disabled>")
  //  .attr("value", year)
  //  .text(year))
  //.append(year)
  //.append("</option>");
}

function capitalizeAndFillMake(makeVar) {
  var make = makeVar.capitalizeFirstLetter();

  makeRef
    .append()
    .attr("title", make);
}

function capitalizeAndFillModel(modelVar) {
  var model = modelVar.capitalizeFirstLetter();

  modelRef
    .append()
    .attr("title", model);
}

//yearRef.change(function () {
//
//  var currentYear = $('#yearRef option:selected').text();
//  var models = filterModelsOnYear(currentYear);
//  var makes = filterMakesOnYear(currentYear);
//
//  yearRef.removeClass('selectpicker');
//  makeRef.removeClass('selectpicker');
//  modelRef.removeClass('selectpicker');
//
//  makeRef.find('option')
//    .remove();
//
//  modelRef.find('option')
//    .remove();
//
//
//  capitalizeAndFillMake(makeVar);
//  capitalizeAndFillModel(modelVar);
//
//  showMakes(makes);
//  removeDuplicateMakes();
//  showModels(models);
//
//  yearRef.addClass('selectpicker');
//  makeRef.addClass('selectpicker');
//  modelRef.addClass('selectpicker');
//
//  $('.selectpicker').selectpicker('refresh');
//});

makeRef.change(function () {

  //var currentYear = $('#yearRef option:selected').text();
  var currentMake = $('#makeRef option:selected').text();
  var models = filterModelOnMakes(currentMake);
  var years = filterModelOnYears(currentMake);
  //yearRef.removeClass('selectpicker');
  //makeRef.removeClass('selectpicker');
  //modelRef.removeClass('selectpicker');

  modelRef.find('option')
    .remove();

  yearRef.find('option')
    .remove();

  //capitalizeAndFillModel(modelVar);
  showModels(models);
  showYears(years);
  removeDuplicateModel();
  removeDuplicateYears();

  //yearRef.addClass('selectpicker');
  //makeRef.addClass('selectpicker');
  //modelRef.addClass('selectpicker');

  $('.selectpicker').selectpicker('refresh');
});


modelRef.change(function () {
  var currentMake = $('#makeRef option:selected').text();
  var currentModel = $('#modelRef option:selected').text();
  var years = filterYearOnMakeAndModel(currentMake, currentModel);

  yearRef.find('option')
    .remove();

  showYears(years);

  removeDuplicateYears();

  $('.selectpicker').selectpicker('refresh');
});

//function filterModelsOnYear(year) {
//  var filteredModels = [];
//  cars.forEach(function (car) {
//    if (car.year === year) {
//      filteredModels.push(car.model);
//    }
//  });
//  return filteredModels;
//}

//function filterMakesOnYear(year) {
//  var filteredMakes = [];
//  cars.forEach(function (car) {
//    if (car.year === year) {
//      filteredMakes.push(car.make);
//    }
//  });
//  return filteredMakes;
//}

function filterModelOnMakes(make) {
  var filteredModels = [];
  cars.forEach(function (car) {
    if (car.make === make) {
      filteredModels.push(car.model);
    }
  });
  return filteredModels;
}

function filterModelOnYears(make) {
  var filteredYears = [];
  cars.forEach(function (car) {
    if (car.make === make) {
      filteredYears.push(car.year);
    }
  });
  return filteredYears;
}

function filterYearOnMakeAndModel(make, model) {
  var filteredYears = [];
  cars.forEach(function (car) {
    if (car.make === make && car.model === model) {
      filteredYears.push(car.year);
    }
  });
  return filteredYears;
}

//******************************  BxSLIDER  ******************************//

//var mobileTextExplore = $(".mobileTextExplore");
//var mobileImgExplore = $(".mobileImageExplore");
var slider = $('.bxslider');
//var sliderNext = $('#slider-next');
//var sliderPrevious = $('#slider-prev');
//var currentSlideText;

slider.bxSlider({
  nextSelector: '#slider-next',
  prevSelector: '#slider-prev',
  nextText: '',
  prevText: '',
  pagerCustom: '#bx-pager',
  mode: 'horizontal',
  auto: true,
  pause: 3000,
  speed: 500,
  onSlideAfter: function() {
    slider.stopAuto();
    slider.startAuto();
  }

  //onSlideAfter: function () {
  //  currentSlideText = mobileTextExplore.text();
  //  changeNameAndImgNext(currentSlideText);
  //}
});


//sliderNext.click(function () {
  //if (sliderNext.data('stop') == 1) return;
  //sliderNext.data('stop', 1);
  //
  //currentSlideText = mobileTextExplore.text();
  //changeNameAndImgNext(currentSlideText);
  //setTimeout(function () {
  //    sliderNext.data('stop', 0);
  //  }
  //  , 500);
//});

//sliderPrevious.click(function () {
  //if (sliderPrevious.data('stop') == 1) return;
  //sliderPrevious.data('stop', 1);
  //
  //currentSlideText = mobileTextExplore.text();
  //changeNameAndImgPrev(currentSlideText);
  //setTimeout(function () {
  //    sliderPrevious.data('stop', 0);
  //  }
  //  , 500);
//});

//function changeNameAndImgNext(name) {
//  if (name === "INTERIOR") {
//    mobileTextExplore.html("FASHION");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/fashion-icon.png");
//    return false;
//  }
//
//  if (name === "FASHION") {
//    mobileTextExplore.html("GADGETS");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/gadgets-icon.png");
//    return false;
//  }
//
//  if (name === "GADGETS") {
//    mobileTextExplore.html("CARS");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/cars-icon.png");
//    return false;
//  }
//
//  if (name === "CARS") {
//    mobileTextExplore.html("KIDS");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/kids-icon.png");
//    return false;
//  }
//
//  if (name === "KIDS") {
//    mobileTextExplore.html("ANYTHING");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/anything-icon.png");
//    return false;
//  }
//  if (name === "ANYTHING") {
//    mobileTextExplore.html("INTERIOR");
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/interior-icon.png");
//    return false;
//  }
//}
//
//function changeNameAndImgPrev(name) {
//  if (name === "INTERIOR") {
//    mobileTextExplore.html("ANYTHING");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/anything-icon.png");
//    return false;
//  }
//  if (name === "ANYTHING") {
//    mobileTextExplore.html("KIDS");
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/interior-icon.png");
//    return false;
//  }
//  if (name === "KIDS") {
//    mobileTextExplore.html("CARS");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/cars-icon.png");
//    return false;
//  }
//  if (name === "CARS") {
//    mobileTextExplore.html("GADGETS");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/gadgets-icon.png");
//    return false;
//  }
//  if (name === "GADGETS") {
//    mobileTextExplore.html("FASHION");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/fashion-icon.png");
//    return false;
//  }
//  if (name === "FASHION") {
//    mobileTextExplore.html("INTERIOR");  //.addClass("animated fadeIn")
//    mobileImgExplore.attr('src', "http://localhost:63342/zadatak/images/kids-icon.png");
//    return false;
//  }
//}

//function infiniteSlideLoop() {
//  setInterval(function () {
//    slider.goToNextSlide();
//    sliderNext.trigger('click');
//  }, 7000)
//}
//******************************  MOBILE  ******************************//

var logoToBack = $('#navLogo');
var backChevron = $('.backChevronMobile');

$(window).resize(function () {
  checkSize();
  centerImageTestimonialsTo480();
});

$(window).load(function () {
  centerImageTestimonialsTo480();
  //infiniteSlideLoop();
});

//******************************  Check window size  ******************************//

function checkSize() {
  if ($(window).width() <= 480 && increment > 0) {
    logoToBack.css('visibility', 'hidden');
    backChevron.css('visibility', 'visible').css('display', 'inline');
  }
  else if ($(window).width() <= 480 && increment == 0) {
    logoToBack.css('visibility', 'visible');
    backChevron.css('visibility', 'hidden').css('display', 'none');
  }
  else {
    logoToBack.css('visibility', 'visible');
  }
}

//******************************  Center Testimonials Images  ******************************//

function centerImageTestimonialsTo480() {
  if ($(window).width() <= 480) {
    var windowWidth = $(window).width();

    var imagesWidth = 300;
    var centerImages = (windowWidth - imagesWidth) / 2 + 'px';

    firstImgContainer.css('left', centerImages);
    secondImgContainer.css('left', centerImages);
    thirdImgContainer.css('left', centerImages);
    fourthImgContainer.css('left', centerImages);
    fifthImgContainer.css('left', centerImages);

    //var centerInput = windowWidth - 20 + 'px';
    //inputQuestion.css('width', centerInput);
  }
  else
  {
    firstImgContainer.css('left', "58%");
    secondImgContainer.css('left', "58%");
    thirdImgContainer.css('left', "58%");
    fourthImgContainer.css('left', "58%");
    fifthImgContainer.css('left', "58%");
  }
}
