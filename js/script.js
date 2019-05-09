AOS.init();

function dropdown() {
    document.getElementById("subdrop").classList.toggle("sub-header-dropdown-show");
  };

  // $("img").on("error", function() {
  //   $(this).hide();
  // });

  // $('img').on("error", function() {
  //   $(this).attr('src', '/img/missing.jpg');
  // });



  function imgError(image) {
    image.onerror = "";
    image.src = "/img/missing.jpg";
    return true;
};

$('img.thumb').click(function() {
    var full = $(this).parent('.catalogue-card-inner').find('img.full');
    full.attr('src', $(this).attr('src'));
    $(this).parent('.catalogue-card-inner').find('#image-link').attr('href', full.attr('src'));
});

$(document).ready(function(){
  var trigger = $('#subheader ul li a'),
  container = $('#catalogue-wrapper');

  trigger.on('click', function(){
    var $this = $(this),
        target = $this.data('target');

  container.load(target + '.php');

  return false;
  });
});
