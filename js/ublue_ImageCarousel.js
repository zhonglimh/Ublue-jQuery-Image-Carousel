(function($){
	/*!
	* Ublue jQuery Image Carousel
	* Copyright (c) 2013, 梦幻神化
	* Create: 2013.08.08
	* Version: 2.0
	* Update: 1.新增上下滚动和缩略图模式 2.部分语句重新定义 3.逻辑优化 4.更为精简
	*
	* 请保留此信息，如果您有修改或意见可通过网站给我留言
	* http://www.bluesdream.com
	*/
	$.fn.ublue_ImageCarousel=function(opts){
		var $this = $(this);
		// options
		var opts = $.extend({
			// Dom节点
			ubCon:".focusCon",				// 内容（滚动时以该层做定位）
			ubItem:".item",						// 列表项
			ubIndicators:".focusIndicators",	// 小按钮
			ubPrev:".focusPrev",				// 向上按钮
			ubNext:".focusNext",				// 向下按钮
			// 效果展现 （开启/关闭参数：on/off）
			ubEffect:"left",						// 效果呈现方式 "left" "top" "fade"
			ubTrigger:"hover",					// 小按钮经触发条件 "hover" "click"
			ubAutoPlay:"on",					// 是否自动播放
			ubAutoBtn:"on",					// 小按钮是否自动生成（便于做成缩略图形式）
			ubTitleHover:"off",					// 标题是否滑动显示
			ubMode:"off",						// 是否开启多图滚动
			// 时间设置 （按毫秒计算：1000毫秒=1秒）
			ubTime:5000,						// 自动播放的时间间隔
			ubSpeed:400,						// 图片切换的速度
			ubTitleSpeed:50					// 标题滑过显示的速度
		}, opts);
		var $stpe = 0,
			$ubCon 		= $this.find(opts.ubCon),
			$ubItem 		= $this.find(opts.ubItem),
			$ubIndicators 	= $this.find(opts.ubIndicators),
			$ubCount 		= $ubItem.length,
			$ubItemW 		= $ubItem.outerWidth(true),
			$ubItemH 		= $ubItem.outerHeight(true),
			$ubConW 		= $ubItemW * $ubCount,
			$ubMax 		= Math.floor( $ubCon.width()/$ubItemW ),
			$ubDistance 	= opts.ubMode=="off"?1:$ubMax,
			$ubMode 		= opts.ubMode=="off"?$ubCount:$ubMax,
			$ubJudge 		= opts.ubMode=="off"?$ubMode-$ubMax:$ubCount/$ubMax-1;
		// Initialization
		if ( opts.ubAutoBtn == "on" ) {
			$ubItem.each(function(i) {
				if ( i <= $ubJudge) {
					$ubIndicators.append("<a>" + (i + 1) + "</a>");
				}
			});
		};
		if ( opts.ubEffect == "left" || "top" ) {
			$ubCon.css("width",$ubConW);
		}
		if ( opts.ubEffect == "fade" ) {
			$ubItem.eq(0).show();
		}
		var $ubIndicatorsBtn = $ubIndicators.find("a");
		$ubIndicatorsBtn.eq(0).addClass('current');
		// AutoPlay
		if ( opts.ubAutoPlay == "on") {
			function focusAutoPlay() { nextSwitch() };
			var $autoScroll = setInterval(focusAutoPlay, opts.ubTime);
			$this.hover(function() {
				clearInterval($autoScroll);
			}, function() {
				$autoScroll = setInterval(focusAutoPlay, opts.ubTime);
			});
		};
		// Title Hide/Show
		if ( opts.ubTitleHover == "on") {
			var $hideSpacing = parseInt( $ubItem.find(".title").css("bottom")) ;
			var $showSpacing = $hideSpacing + $ubItem.find(".title").outerHeight(true);
			$ubItem.hover(function(){
				var $this = $(this);
				titleDelay = setTimeout(function() {
					$this.find(".title").stop(true,false).animate({"bottom":Math.abs( $showSpacing )},opts.ubTitleSpeed);
				}, 150);
			},function(){
				$(this).find(".title").stop(true,false).animate({"bottom":$hideSpacing},opts.ubTitleSpeed);
				clearTimeout(titleDelay);
			});
		};
		// Switch
		function effectSwitch(op){
			if ( opts.ubEffect == "fade" ) {
				$ubItem.eq(op).fadeIn(opts.ubSpeed).siblings().fadeOut(opts.ubSpeed);
			}else if( opts.ubEffect == "left" ){
				var $left = op*$ubDistance*$ubItemW;
				$ubCon.animate({"left":-$left},opts.ubSpeed);
			}else{
				var $top = op*$ubDistance*$ubItemH;
				$ubCon.animate({"top":-$top},opts.ubSpeed);
			}
			indicatorsStyle($stpe)
		}
		function nextSwitch(){
			if ( !$ubCon.is(":animated") && !$ubItem.is(":animated") ) {
				if ( $stpe == $ubJudge) {
					$stpe = 0
					effectSwitch($stpe)
				}else{
					$stpe++
					effectSwitch($stpe)
				}
			}
		}
		function indicatorsSwitch(op){
			if ( !$ubCon.is(":animated") && !$ubItem.is(":animated") ) {
				$stpe = op;
				if ( $stpe == 0 ){
					effectSwitch($stpe)
				}else{
					effectSwitch($stpe)
				}
			}
		}
		function indicatorsStyle(op){
			$ubIndicatorsBtn.eq(op).addClass("current").siblings().removeClass("current");
		}
		// Trigger
		$this.find(opts.ubPrev).click(function() {
			if ( !$ubCon.is(":animated") && !$ubItem.is(":animated") ) {
				if ( $stpe == 0 ) {
					$stpe = $ubJudge;
					effectSwitch($stpe)
				}else{
					$stpe--
					effectSwitch($stpe)
				}
			}
		});
		$this.find(opts.ubNext).click(function() {
			nextSwitch();
		});
		if ( opts.ubTrigger == "hover" ) {
			$ubIndicatorsBtn.hover(function() {
				var i = $(this).index()
				triggerDelay = setTimeout(function() { indicatorsSwitch(i) }, 150);
			},function(){
				clearTimeout(triggerDelay);
			});
		}else{
			$ubIndicatorsBtn.click(function() {
				indicatorsSwitch($(this).index());
			})
		}
	};
}(jQuery));