/**
 * Created by Marko on 21.5.2016..
 */


$(function ($) {
  //toggle popover on load
  //$('[data-toggle="tooltip"]').tooltip().tooltip('show');
  //hide and disable tooltip on mouseclick
  $('#tooltip1').tooltip().tooltip('show');
  $('html').click(function () {
    $('#tooltip1').tooltip('disable').tooltip('hide');
  });
});


//$.getJSON( "cars.json", function(data) {
//  //console.log(typeof data);
//  //console.log(data);
//  data.forEach(function(dataItem)
//  {
//    console.log(dataItem);
//  })
//});

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset animation properties
var animating; //flag to prevent quick multi-click glitches
var increment = 0;

$(".next, .submit").click(function () {
  if ($('#inputQuestion').val().length !== 0) {
    increment++;
    //check(increment);
    //document.getElementById("inputQuestion").style.background = "white";
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset
    current_fs.animate({opacity: 0}, {
      step: function (now) {
        //now = opacity za current_fs
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = (now * 50) + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({'transform': 'scale(' + scale + ')'});
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //jquery easing
      easing: 'easeInQuint'
    });
  }
  else {
    $('#tooltip2').tooltip('enable').tooltip('show').tooltip('disable');  //tooltipster
  }
});

//$('a.nav-link').hover(function () {
//  $(this).css('width','180');
//});

$(".previous").click(function () {
  increment--;
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset
  current_fs.animate({opacity: 0}, {
    step: function (now) {
      //now = opacity za current_fs
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1 - now) * 50) + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({'left': left});
      previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
    },
    duration: 600,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //jquery easing
    easing: 'easeInQuint'
  });
});

$('.sent').click(function () {
  location.reload();
});

function check(increment) {
  if (increment == 4) {
    setTimeout(function () {
      location.reload();          // ne reload, hide/show
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

//
//$(function ($) {
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
//});

$(function () {

    $('.imageContainer2').click(function () {
      if ((parseInt($('.imageContainer1').css('z-index'))) > (parseInt($('.imageContainer2').css('z-index'))))
      {
      $('.imageContainer2').css('z-index', (parseInt($('.imageContainer1').css('z-index')) + 1)).addClass('animated pulse');
      $('.imageContainer1').removeClass('animated pulse');
      }
    });
});

$(function () {
  $('.imageContainer1').click(function () {
    if ((parseInt($('.imageContainer2').css('z-index'))) > (parseInt($('.imageContainer1').css('z-index'))))
    {
    $('.imageContainer1').css('z-index', (parseInt($('.imageContainer2').css('z-index')) + 1)).addClass('animated pulse');
    $('.imageContainer2').removeClass('animated pulse');
    }
  });
});


$(function(){
  //$('.slider > div').addClass('animated fadeInRight');
  var slides = ['firstImgContainer','secondImgContainer','thirdImgContainer','fourthImgContainer', 'fifthImgContainer'];
  loop = function () {
    for (var i=0; slides.length <= i;i++){
      console.log(slides[i]);
    }
  };

  setInterval(loop,3000);

});

$('.selectpicker').selectpicker({
  style: 'btn-info',
  size: 6
});
