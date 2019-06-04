$(document).ready(function(){
   $(".delete").click(function(){
   var id = $(this).val();
   $.post("/remove",{no:id},function(data){
   	location.reload('/');
   });
   });
   $(".edit").click(function(){
   var id=$(this).val();
   $.post("/edit",{no:id},function(data){
   	var a=JSON.stringify(data);
      var pd=JSON.parse(a);
      alert(pd[0].name);
      $("#name").val(pd[0].name);
      $("#email").val(pd[0].email); 
      $("#rollno").val(pd[0].rollno);
      $("#college").val(pd[0].college);
      $("#branch").val(pd[0].branch);
      $("#address").val(pd[0].address);
      $("#phoneno").val(pd[0].mobileno);
   });
   $(".dontshow").show();
   });
});