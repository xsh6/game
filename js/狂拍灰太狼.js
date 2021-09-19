$(function(){
	// 监听游戏规则的点击
	$(".rules").click(function(){
		// 点击游戏规则出现
		$(".rule").stop().fadeIn(100);
	})
	// 监听关闭按钮的点击
	$("a").click(function(){
		// 关闭游戏规则的出现
		$(".rule").stop().fadeOut(100);
	})
	// 监听开始游戏按钮的点击
	$(".start").click(function(){
		// 开始游戏按钮消失
		$(".start").stop().fadeOut(100);
		// 监听进度条的变化
		progressHandler();
		// 调用位置的动画方法
		ProAnimation();
	})
	// 监听重新开始按钮，点击则进度条重新开始变化
	$(".reStart").click(function(){
		// 游戏结束界面消失
		$(".mask").stop().fadeOut(100);
		// 调用进度条的变化方法,重新启动进度条
		progressHandler();
		// 调用位置的动画方法
		ProAnimation();
	})
	// 进度条变化的方法
	function progressHandler(){
		// 设置开始时进度条的宽度
		$(".progress").css({
			width:180
		});
		// 设置定时器
		var timer = setInterval(function(){
			// 进度条的宽度变化
			var offwidth= $(".progress").width()-1;
			// 设置进度条的宽度
			$(".progress").css({
				width:offwidth
			})
			// 当进度条变到0时，显示重新开始
			if(offwidth <= 0){
				// 结束定时器
				clearInterval(timer);
				// 显示重新开始界面
				$(".mask").stop().fadeIn(100);
				// 停止灰太狼动画
				stopProAnimation();
			}
		},100)
	}
	var wolfTimer;
	function ProAnimation(){
		// 创建包含灰太狼图片的数组,图片会加入到HTML文件中，所以使用一个点表示当前目录下
		var Wolf_1 = ['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png',
		'./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
		// 创建包含小灰灰图片的数组
		var Wolf_2 = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png',
		'./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
		// 创建包含所有可能位置的数组
		var arrPos = [
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"}
			
		];
		// 创建一个image标签
		var $ImagePro = $("<img src='' class='wolfImage'/>")
		// 设置一个0-9的下标,math.round()表示四舍五入；math.random()可以生成一个0~1的随机数
		var index1 = Math.round(Math.random()*9);
		// 设置一个数来判断使用灰太狼还是小灰灰的图片
		var Wolf_num = Math.round(Math.random()) == 0 ? Wolf_1:Wolf_2;
		// // 设置一个数来控制显示的图片
		// var index2 = Math.round(Math.random()*9);
		// // 设置image标签的图片
		// $ImagePro.attr("src",Wolf_num[index2]);
		window.index2 = 0;
		window.index3 = 5;
		wolfTimer = setInterval(function(){
			if(index2 <= index3) {
				 $ImagePro.attr("src",Wolf_num[index2]);
				 index2++;
			}else{
				$ImagePro.remove();
				clearInterval(wolfTimer);
				ProAnimation();
			}
		},300);
		// 设置image标签的位置
		$ImagePro.css({
			position:"absolute",
			left:arrPos[index1].left,
			top:arrPos[index1].top
		});
		// 将图片加入到容器中
		$(".container").append($ImagePro);
		// 调用处理游戏规则的方法
		gameRules($ImagePro);
	}
	function stopProAnimation(){
		// 停止计时器
		clearInterval(wolfTimer);
		// 删除上面的图片
		$(".wolfImage").remove();
	}
	function gameRules($ImagePro){
		// 使用one事件处理，该事件只能执行一次
		$ImagePro.one("click",function(){
			// 设置图片的索引为5和9
			window.index2 = 5;
			window.index3 = 9;
			// 拿到当前图片的地址
			var $src = $(this).attr("src");
			// 判断地址中是否含有灰太狼h的字符
			var flag = $src.indexOf('h') >= 0;
			// 当打到灰太狼时加10，打到小灰灰-10
			if(flag){
				$(".sroce").text(parseInt($(".sroce").text())+10);
			} else{
				$(".sroce").text(parseInt($(".sroce").text())-10);
			}
		})
	}
});