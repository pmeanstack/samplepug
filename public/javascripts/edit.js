$(document).ready(function(){
   $(".delete").click(function(){
   var id = $(this).val();
   $.post("/remove",{no:id},function(data){
   	location.reload('/');
   });
   });
});