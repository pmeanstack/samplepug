$(document).ready(function(){
	
	$(".s").click(function(){
		$(".sf").fadeIn();
		$(".lf").fadeOut();
	
	});
	$(".l").click(function(){
		$(".lf").fadeIn();
	    $(".sf").fadeOut();
	});
    
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print' 
        ]
    } );
   	
	
});

