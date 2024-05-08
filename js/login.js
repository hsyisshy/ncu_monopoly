function toggle(){
	// 轉換 log in / sign up
	if($(".button > a").html()==="Log in!"){
		// 改標題
		$(".header > h3").text("Log in");
		
		// 改 css
		$(".block").css("height","270px");
		$(".login_block").css("height","250px")
		$(".header").css("height","52.5px");
		$(".username, .password").css("height","72.5px");
		$(".button").css("height","52.5px");
		$('.error').hide();

		$(".button > a").text("Sign up?");
		isError = 0;
		hasLengthen = 0;
	}
	else{
		// 改 title
		$(".header > h3").text("Sign up");

		// 改 css
		$(".block").css("height","310px");
		$(".login_block").css("height","290px");
		$(".header").css("height","43.5px");
		$(".username, .password").css("height","72.5px");
		$(".button").css("height","43.5px");
		$('.error').hide();

		$(".button > a").text("Log in!");
		isError =  0;
		hasLengthen = 0;
	}
}

function showErrorMesg(errorMesg){
	$('.error').css("width",(errorMesg.length*2).toString()+"%");
	$('.error > h3').html(errorMesg);
	if(hasLengthen===0){
		$('.block').css("height",($('.block').height()+29).toString()+"px");
		$('.login_block').css("height",($('.login_block').height()+29).toString()+"px");
		$('.error').show();
		hasLengthen = 1
	}
	isError = 0;
}

let isError = 0;
let hasLengthen = 0;

$(function(){
	$('.submit').click(function(){
		const user_name = $("#username").val();
		const pass_word = $("#password").val();
		var isSignup = ($(".header > h3").html()==="Sign up")? 1 : 0; 
		var errorMesg = "";

		// handle the invalid input 
		if(!user_name){
 			errorMesg = "Username is required !";
 			isError = 1;
 		} else if(user_name.length<1 || user_name.length>20){
 			errorMesg = "Username should be within 7 - 20 English characters !";
 			isError = 1;
 		} else if(!pass_word){
 			errorMesg = "Password is required !";
 			isError = 1;
 		} else if(pass_word.length<8 || pass_word.length>21){
 			errorMesg = "Password should be within 8 - 21 English characters !";
 			isError = 1;
 		}

 		// show error message 
 		if(isError===1){
			showErrorMesg(errorMesg);
		}
		
		// all inputs are valid 
		else{
			if(hasLengthen===1){
				$('.block').css("height",($('.block').height()-29).toString()+"px");
				$('.login_block').css("height",($('.login_block').height()-29).toString()+"px");
				$('.error').hide();
				isError = 0;
				hasLengthen = 0;
			}
			//console.log("error message");
			//測試
			$.ajax({
				method: "POST",
				url: "TestDB1.php",
				data: {user_name: user_name, pass_word: pass_word, isSignup: isSignup},
				dataType: "json",
			  	success: function(data) {
			  		console.log(data);
			  		if(data.active===1){
			  			showErrorMesg(data.error_msg);
						// 如果 active 為 1，顯示錯誤訊息
						//console.log("Active is 1. Showing error message...");
					}
					/*else{
						console.log("Active is 0. Showing error message...");
					}*/
			  		if(data.redirect!==undefined)
						// 如果存在重定向 URL，導向該頁面
					 	/*console.log("Redirecting to: " + data.redirect);*/
			  			window.location.href=data.redirect;
			  	},
			  	error: function(err){
					/*console.log(err.responseText);*/
			  	}
			});
		}
	});
});