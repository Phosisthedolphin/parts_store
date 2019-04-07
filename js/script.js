function dropdown() {
    document.getElementById("subdrop").classList.toggle("sub-header-dropdown-show");
  }

$('img.thumb').click(function() {
    var full = $(this).parent('.catalogue-card-inner').find('img.full');
    full.attr('src', $(this).attr('src'));
    $(this).parent('.catalogue-card-inner').find('#image-link').attr('href', full.attr('src'));
});
