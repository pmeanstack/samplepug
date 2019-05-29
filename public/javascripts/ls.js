$(document).ready(function(){
	$(".l").click(function(){
		$(".lf").fadeIn();
		$(".sf").fadeOut();

	});
	$(".s").click(function(){
		$(".sf").fadeIn();
		$(".lf").fadeOut();

	});
	$(".sub").click(function(){
		$(".sf").fadeOut();
		$(".lf").fadeOut();
	});
});

