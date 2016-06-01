/**
 * Created by Marko on 21.5.2016..
 */

var tooltip1 = $('#tooltip1');
var tooltip2 = $('#tooltip2');
$(function ($) {
  //toggle popover on load
  //$('[data-toggle="tooltip"]').tooltip().tooltip('show');
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

var current_fs, next_fs, previous_fs; //fieldsets
//var left, opacity, scale; //fieldset animation properties
var animating; //flag to prevent quick multi-click glitches
var increment = 0;


$(".next, .submit").click(function () {
  if ($('#inputQuestion').val().length !== 0) {
    increment++;
    catBulColor();
    check(increment);
    //document.getElementById("inputQuestion").style.background = "white";
    //if (animating) return false;
    //animating = true;
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //show the next fieldset
    next_fs.show().addClass('animated fadeInRight');
    current_fs.hide();
    //hide the current fieldset
    //current_fs.animate({opacity: 0}, {
    //  step: function (now) {
    //    //now = opacity za current_fs
    //    //1. scale current_fs down to 80%
    //    scale = 1 - (1 - now) * 0.2;
    //    //2. bring next_fs from the right(50%)
    //    //left = (now * 50) + "%";
    //    //3. increase opacity of next_fs to 1 as it moves in
    //    opacity = 1 - now;
    //    current_fs.css({'transform': 'scale(' + scale + ')'});
    //    //next_fs.css({'left': left, 'opacity': opacity});
    //  },
    //  duration: 800,
    //  complete: function () {
    //    current_fs.hide();
    //    animating = false;
    //  },
    //  //jquery easing
    //  easing: 'easeInQuint'
    //});
  }
  else {
    tooltip2.tooltip('enable').tooltip('show').tooltip('disable');  //tooltipster
  }

  //if (increment === 2) {
  //  $('.msform').validate({ // initialize the plugin
  //    rules: {
  //      name: {
  //        required: true,
  //        minlength: 1
  //      },
  //      email: {
  //        required: true,
  //        email: true
  //      }
  //    },
  //    submitHandler: function (form) { // for demo
  //      return false; // for demo
  //    }
  //  });
  //}
});

//$('a.nav-link').hover(function () {
//  $(this).css('width','180');
//});


// form bullet scroll
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


function resetForm() {
  $('.msform')[0].reset();
  carsDrop.css('visibility', 'hidden').removeClass('animated fadeInDown');
  tooltip1.tooltip('enable').tooltip('show');
  buttonCat.addClass('buttonCategory');
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
  secondSet.hide();
  thirdSet.hide();
  fourthSet.removeClass('animated fadeInLeft').show().addClass('animated fadeInRight')
  increment = 3;
  catBulColor();
});


//back button click

$(".previous").click(function () {
  increment--;
  catBulColor();
  //if (animating) return false;
  //animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //show the previous fieldset
  previous_fs.removeClass('animated fadeInRight').show().addClass('animated fadeInLeft');
  current_fs.hide();
  //hide the current fieldset
  //current_fs.animate({opacity: 0}, {
  //  step: function (now) {
  //    //now = opacity za current_fs
  //    //1. scale previous_fs from 80% to 100%
  //    scale = 0.8 + (1 - now) * 0.2;
  //    //2. take current_fs to the right(50%) - from 0%
  //    //left = ((1 - now) * 50) + "%";
  //    //3. increase opacity of previous_fs to 1 as it moves in
  //    opacity = 1 - now;
  //    //current_fs.css({'left': left});
  //    previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
  //  },
  //  duration: 600,
  //  complete: function () {
  //    current_fs.hide();
  //    animating = false;
  //  },
  //  //jquery easing
  //  easing: 'easeInQuint'
  //});
});


$('.sent').click(function () {
  $('#fifthSet').hide();
  $('#firstSet').show().addClass('animated fadeInRight');
  clearTimeout(timerSubmit);
  increment = 0;

  resetForm();
});

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

//check for input
//function check($fs) {
//  switch ($fs.attr('data-check-id')) {
//    case '1':  //1st fieldset
//      $i_question = $('input[name="q1"]', $fs);
//
//      //QUESTION
//      if ($i_question.val().length == 0) {
//        $i_question.addClass('error');
//      }
//      else {
//        $i_question.removeClass('error');
//      }
//      break;
//    case '3': //3rd fieldset
//      $i_name = $('input[name="name"]', $fs);
//      $i_email = $('input[name="email"]', $fs);
//
//      //NAME
//      if ($i_name.val().length < 3) {
//        $i_name.addClass('error');
//      }
//      else {
//        $i_name.removeClass('error');
//      }
//
//      //EMAIL
//      if ($i_email.val().length < 6) {
//        $i_email.addClass('error');
//      }
//      else {
//        $i_email.removeClass('error');
//      }
//      break;
//  }
//}


$(function ($) {
  $('.msform').validate({ // initialize the plugin
    rules: {
      name: {
        required: true,
        minlength: 1
      },
      email: {
        required: true,
        email: true
      }
    },
    submitHandler: function (form) { // for demo
      return false; // for demo
    }
  });
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

//testimonials slider

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
//
//function formSlideOne() {
//
//}
//
//function formSlideTwo() {
//
//}
//function formSlideThree() {
//
//}

var functionArray = [firstSlide, secondSlide, thirdSlide, fourthSlide, fifthSlide];

var timeout = window.setInterval(function () {
  functionArray[intervalIndex++ % functionArray.length]();
}, 7000);

var selectBox = $('#selectBox');
var carsDrop = $('#carsDropdown');

var cars;
var keys;
var yearVar;
var makeVar;
var modelVar;
//
//$.getJSON("cars.json", function (data) {
//  //console.log(typeof data);
//  //console.log(data);
//  cars = data;
//  //printCars(cars);
//  //
//  //var newList = filterCars("1955");
//  //printCars(newList);
//  //
//  //var keys = arrayOfKeys(cars);
//  //console.log(keys[0]);
//  //console.log(keys[1]);
//  //console.log(keys[2]);
//
//  arrayOfKeys(cars);
//  //arrayOfYears(cars);
//  //arrayOfMake(cars);
//  //arrayOfModel(cars);
//});

var jsonKeys = [];
var jsonYears = [];
var jsonMake = [];
var jsonModel = [];

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
  //console.log(jsonYears);
}

function arrayOfMake(makes) {
  $.each(makes, function (index, value) {
    if ($.inArray(value.make, jsonMake) == -1) {
      jsonMake.push(value.make);
    }
  });
  return jsonMake;
  //console.log(jsonMake);
}

function arrayOfModel(models) {
  $.each(models, function (index, value) {
    if ($.inArray(value.model, jsonModel) == -1) {
      jsonModel.push(value.model);
    }
  });
  return jsonModel;
  //console.log(jsonModel);
}

//testiranje

//function printCars(filteredCars) {
//  var list = $('#test');
//  list.empty();
//
//  filteredCars.forEach(function (car) {
//    list
//      .append('<li>')
//      .append('<p>').append(car.year).append('</p')
//      .append('<p>').append(car.make).append('</p')
//      .append('<p>').append(car.model).append('</p')
//      .append('</li>')
//  })
//}

//testiranje

//function filterYear(year) {
//  var filteredYears = [];
//
//  cars.forEach(function (car) {
//    if (car.year === year) {
//      filteredYears.push(car);
//    }
//  })
//  return filteredYears;
//}

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
  })
  return filteredModels;
}

function filterMakesOnYear(year) {
  var filteredMakes = [];
  cars.forEach(function (car) {
    if (car.year === year) {
      filteredMakes.push(car.make);
    }
  })
  return filteredMakes;
}

function filterModelOnMakesAndYear(year, make) {
  var filteredModels = [];
  cars.forEach(function (car) {
    if (car.year === year && car.make === make) {
      filteredModels.push(car.model);
    }
  })
  return filteredModels;
}
