$(".spanclass ").on("click",function(){
  $(this).parent().remove();
  event.stopPropagation();
}); 