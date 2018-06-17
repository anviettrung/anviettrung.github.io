var sectionHeight = function() {
  var total    = $(window).height(),
      $section = $('section').css('height','auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(function() {

  $(window).on("resize", function() {

    if ($(window).width() < $(".post-content").width() + 2*($("#sidebar-nav").width() + 10))
      $("#sidebar-nav").hide();
    else
      $("#sidebar-nav").show();

  });



  var section_index = 0;
  $(".post-content h2, .post-content h3").each(function(){
    
    var text_content_modified = $(this).text();
    // if (text_content_modified.length > 15)
    //   text_content_modified = text_content_modified.substring(0, 11) + "...";
    $("#sidebar-nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#header-number-" + section_index + "'>" + text_content_modified + "</a></li>");
    $(this).attr("id","header-number-" + section_index);
    $("#sidebar-nav ul li:first-child a").parent().addClass("active");
    section_index += 1;

  });



  $("#sidebar-nav ul li").on("click", "a", function(event) {

    var position = $($(this).attr("href")).offset().top - 10;
    $("html, body").animate({scrollTop: position}, 400);
    $("#sidebar-nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();

  });



  $(window).scroll(function() {

    $(".post-content h2, .post-content h3").each(function() {

      if ($(window).scrollTop() > $(this).offset().top) {
        $("#sidebar-nav ul li a").parent().removeClass("active");
        $("a[href$="+$(this).attr('id')+"]").parent().addClass("active");
        event.preventDefault();
      }


    });

  });

  sectionHeight();

  $('img').on('load', sectionHeight);
});
