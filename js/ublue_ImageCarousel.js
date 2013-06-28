(function($){
	$(function() {
	/*!
	* Ublue jQuery Image Carousel
	* Copyright (c) 2013, 梦幻神化
	* Create:2013.06.03
	* Version:1.3.1
	* Update:1.3（1.增加小按钮的触发条件 2.性能优化，小按钮和滚动标题，鼠标停留150ms后才执行）
	* Update:1.3.1（1.语句优化）
	* Update:1.3.2（1.兼容性调整）
	*
	* 请保留此信息，如果您有修改或意见可通过网站给我留言
	* http://www.bluesdream.com
	*/
	$.fn.ublue_ImageCarousel=function(opts){
		var $this = $(this);
		// options
		var opts = $.extend({
			// Dom节点
			ubMain:".focusMain",		// 最外层框架
			ubCon:".focusCon",		// 内容和定位层
			ubItem:".item",				// 列表项
			ubBullets:".focusBullets",	// 小按钮
			ubPrev:".focusPrev",		// 向上按钮
			ubNext:".focusNext",		// 向下按钮
			// 效果展现 （开启/关闭参数：on/off）
			ubLen:"off",				// 多图滚动（列表项总数：配合ubDistance滚动距离一起使用）
			ubDistance:"off",			// 多图滚动（滚动距离：按每行最大显示容量计算）
			ubAuto:"on",				// 是否自动播放
			ubTitleHover:"off",			// 标题是否滑动显示
			ubEffect:"off",				// 是否使用滤镜效果
			ubHover:"on",				// 小按钮经触发条件
			// 时间设置 （按毫秒计算：1000毫秒=1秒）
			ubTime:5000,				// 自动播放的时间间隔
			ubSpeed:400,				// 图片切换的速度
			ubTitleSpeed:50			// 标题滑动显示的速度
		}, opts);
		var $stpe = 0,
			$ubCon 		= $this.find(opts.ubCon),
			$ubItem 		= $this.find(opts.ubItem),
			$ubBullets 		= $this.find(opts.ubBullets),
			$ubCount 		= $ubItem.length,
			$ubItemW 		= $ubItem.outerWidth(true),
			$ubConW 		= $ubItemW * $ubCount,
			$ubMax 		= Math.floor( $ubCon.width()/$ubItemW ),
			$ubDistance 	= opts.ubDistance=="off"?1:$ubMax,
			$ubLen 		= opts.ubLen=="off"?$ubCount:$ubMax,
			$ubJudge 		= opts.ubLen=="off"?$ubLen-$ubMax:$ubCount/$ubMax-1;
		// Initialization
		$ubCon.css("width",$ubConW);
		$ubItem.each(function(i) {
			if ( i <= $ubJudge) {
				$(this).css("z-index", -(i - $ubCount));
				$ubBullets.append("<a>" + (i + 1) + "</a>");
				$ubBullets.find("a").eq(0).addClass("current");
			}
		});
		var $ubBulletsBtn = $ubBullets.find("a");
		// AutoPlay
		function focusAutoPlay() {
			if ( opts.ubAuto == "on") {
				nextSwitch();
			};
		};
		var $autoScroll = setInterval(focusAutoPlay, opts.ubTime);
		$this.hover(function() {
			clearInterval($autoScroll);
		}, function() {
			$autoScroll = setInterval(focusAutoPlay, opts.ubTime);
		});
		// Title Hide/Show
		if ( opts.ubTitleHover == "on") {
			var $hideSpacing = parseInt( $ubItem.find(".title").css("bottom")) ;
			var $showSpacing = $hideSpacing + $ubItem.find(".title").outerHeight(true);
			$ubItem.hover(function(){
				var $this = $(this);
				hoverTime = setTimeout(function() {
					$this.find(".title").stop(true,false).animate({"bottom":Math.abs( $showSpacing )},opts.ubTitleSpeed);
				}, 150);
			},function(){
				$(this).find(".title").stop(true,false).animate({"bottom":$hideSpacing},opts.ubTitleSpeed);
				clearTimeout(hoverTime);
			});
		};
		// Switch & Effect
		function nextSwitch(){
			if ( !$ubCon.is(":animated") && !$ubItem.is(":animated") ) {
				if ( $stpe == $ubJudge) {
					$stpe = 0
					if ( opts.ubEffect == "on" ) {
						filterSwitch($stpe)
					}else{
						$ubCon.animate({"left":$stpe},opts.ubSpeed);
					};
				}else{
					$stpe++
					if ( opts.ubEffect == "on" ) {
						$ubItem.eq($stpe-1).fadeOut('slow').next().fadeIn('slow');
					}else{
						slideSwitch($stpe);
					};
				}
			}
			bulletsStyle($stpe);
		}
		function bulletsStyle(mark){
			$ubBulletsBtn.eq(mark).addClass("current").siblings().removeClass("current");
		}
		function bulletsSwitch(op){
			$stpe = op;
			if ( $stpe == 0 ){
				if ( opts.ubEffect == "on" ) {
					$ubItem.eq(0).fadeIn();
				}else{
					$ubCon.animate({"left":$stpe},opts.ubSpeed);
				}
			}else{
				if ( opts.ubEffect == "on" ) {
					filterSwitch($stpe)
				}else{
					slideSwitch($stpe);
				}
			}
			bulletsStyle($stpe);
		}
		function filterSwitch(op){
			$ubItem.eq(op).fadeIn('slow').siblings().fadeOut('slow');
		}
		function slideSwitch(op){
			var $left = op*$ubDistance*$ubItemW;
			$ubCon.animate({"left":-$left},opts.ubSpeed);
		}
		// Click
		$this.find(opts.ubPrev).click(function() {
			if ( !$ubCon.is(":animated") && !$ubItem.is(":animated") ) {
				if ( $stpe == 0 ) {
					$stpe = $ubJudge;
					if ( opts.ubEffect == "on" ) {
						filterSwitch($stpe)
					}else{
						slideSwitch($stpe)
					};
				}else{
					$stpe--
					if ( opts.ubEffect == "on" ) {
						$ubItem.eq($stpe).fadeIn('slow');
					}else{
						slideSwitch($stpe);
					};
				}
			}
			bulletsStyle($stpe);
		});
		$this.find(opts.ubNext).click(function() {
			nextSwitch();
		});
		$ubBulletsBtn.each(function(e) {
			if ( opts.ubHover == "on" ) {
				$(this).hover(function() {
					hoverTime2 = setTimeout(function() {
						bulletsSwitch(e);
					}, 150);
				},function(){
					clearTimeout(hoverTime2);
				});
			}else{
				$stpe = e;
				$(this).click(function() {
					bulletsSwitch(e);
				})
			}
		})
	};

	});
}(jQuery));