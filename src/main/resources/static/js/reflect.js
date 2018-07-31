// JavaScript Document

//var tip=document.getElementsByClassName("main_style_tip");
//tip.onclick=function(){
//	alert("asdf");
//}



$('.main_style_tip').mouseover(function(){
		$('#test').css('-webkit-filter','blur(3px)');
//		$('.divA').fadeIn();
//		$('.divB').html("hello")
	})
	$('#wrap').mouseleave(function(){
		$('.a1').css('-webkit-filter','blur()');
		$('.divA').fadeOut();
})