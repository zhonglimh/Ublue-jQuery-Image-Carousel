(function($){
	/*!
	* Ublue jQuery Image Carousel
	* Copyright (c) 2013, 梦幻神化
	* Create: 2013.08.08
	* Version: 2.0
	* Update: 1.新增上下滚动和缩略图模式 2.部分语句重新定义 3.逻辑优化 4.更为精简
	* Version: 2.1 （2013-10-21）
	* Update: 1.新增左右无缝滚动 2.语句优化
	* Version: 2.2 （2013-11-18）
	* Update: 1.新增上下无缝滚动 2.代码优化
	*
	* 请保留此信息，如果您有修改或意见可通过网站给我留言
	* http://www.bluesdream.com
	*/
	$.fn.ublue_ImageCarousel=function(opts){
		var $this = $(this);
		// options
		opts = $.extend({
			// Dom节点
			ubArea:'.focusArea',				// 外层（上下无缝滚动时，以该层做定位）
			ubCon:'.focusCon',					// 内容（滚动时以该层做定位）
			ubItem:'.focusItem',				// 列表项
			ubIndicators:'.focusIndicators',		// 小按钮
			ubPrev:'.focusPrev',					// 向上按钮
			ubNext:'.focusNext',				// 向下按钮
			// 效果展现 （以下为默认值）
			ubEffect:'left',						// 效果呈现方式 'left' 'top' 'fade' 'leftSeamless' 'topSeamless'
			ubTrigger:'hover',					// 小按钮经触发条件 'hover' 'click'
			ubAutoPlay:'on',					// 是否自动播放
			ubAutoBtn:'on',						// 小按钮是否自动生成（便于做成缩略图形式）
			ubTitleHover:'off',					// 标题是否滑动显示
			ubGallery:'off',						// 是否开启多图滚动
			// 时间设置 （按毫秒计算：1000毫秒=1秒）
			ubTime:5000,						// 自动播放的时间间隔
			ubSpeed:480,						// 图片切换的速度
			ubTitleSpeed:50					// 标题滑过显示的速度
		}, opts);
		var $ubDistance,
			$ubJudge,
			$ubMax,
			$ubItemSize,
			$stpe			= 0,
			$animate		= {},$direction,
			$ubCon		= $this.find(opts.ubCon),
			$ubItem		= $this.find(opts.ubItem),
			$ubIndicators	= $this.find(opts.ubIndicators),
			$ubCount		= $ubItem.length,
			$ubItemW		= $ubItem.outerWidth(true),
			$ubItemH		= $ubItem.outerHeight(true),
			$ubMaxW		= Math.floor( $ubCon.width()/$ubItem.width() ),
			$ubMaxH		= Math.floor( $(this).find(opts.ubArea).height()/$ubItem.height() );
		// Initialization
		if( opts.ubEffect == 'fade' ){
			$ubMax = $ubMaxW;
			$ubItem.eq(0).show();
		}
		if( opts.ubEffect == 'left' || opts.ubEffect == 'leftSeamless' ){
			$ubItemSize = $ubItemW;
			$ubMax = $ubMaxW;
			$direction = 'left';
		}
		if( opts.ubEffect == 'top' || opts.ubEffect == 'topSeamless'){
			$ubItemSize = $ubItemH;
			$ubMax = $ubMaxH;
			$direction = 'top';
		}
		if ( opts.ubEffect == 'left' ) {
			$ubCon.css( 'width',$ubItemSize*$ubCount );
		}
		if ( opts.ubEffect == 'leftSeamless' ) {
			$ubCon.css( 'width',$ubItemSize*($ubMax+$ubCount) );
		}
		$ubDistance = opts.ubGallery=='off'?1:$ubMax;
		$ubJudge = opts.ubGallery=='off'?$ubCount-$ubMax:$ubCount/$ubMax-1;
		// Seamless
		if ( opts.ubEffect == 'leftSeamless' || opts.ubEffect == 'topSeamless' ) {
			var group = '<ul class=\'focusGroup\'></ul>';
			$ubCon.wrapInner(group).append(group);
			$ubCon.find('.focusGroup').last().append( $ubItem.slice(0, $ubMax).clone() );
			$ubJudge	= opts.ubGallery=='off'?$ubCount:Math.floor($ubCount/$ubMax);
		}
		// Indicators
		if ( opts.ubAutoBtn == 'on') {
			if ( opts.ubEffect == 'leftSeamless' || opts.ubEffect == 'topSeamless' ) {
				for ( var i =0; i < $ubJudge; i++ ) {
					$ubIndicators.append('<a>' + (i + 1) + '</a>');
				}
			}else{
				for ( var i =0; i <= $ubJudge; i++ ) {
					$ubIndicators.append('<a>' + (i + 1) + '</a>');
				}
			}
		}
		var $ubIndicatorsBtn = $ubIndicators.find('a');
		$ubIndicatorsBtn.eq(0).addClass('current');
		// AutoPlay
		if ( opts.ubAutoPlay == 'on') {
			var $autoScroll = setInterval(nextSwitch, opts.ubTime);
			$this.hover(function() {
				clearInterval($autoScroll);
			}, function() {
				$autoScroll = setInterval(nextSwitch, opts.ubTime);
			});
		}
		// Title Hide/Show
		if ( opts.ubTitleHover == 'on') {
			var $hideSpacing = parseInt( $ubItem.find('.title').css('bottom'));
			var $showSpacing = $hideSpacing + $ubItem.find('.title').outerHeight(true);
			$ubItem.hover(function(){
				var _this = $(this);
				titleDelay = setTimeout(function() {
					_this.find('.title').stop(true,false).animate({'bottom':Math.abs( $showSpacing )},opts.ubTitleSpeed);
				}, 150);
			},function(){
				$(this).find('.title').stop(true,false).animate({'bottom':$hideSpacing},opts.ubTitleSpeed);
				clearTimeout(titleDelay);
			});
		}
		// Switch
		function effectSwitch(op){
			switch(opts.ubEffect){
				case 'fade':
					$ubItem.eq(op).fadeIn(opts.ubSpeed).siblings().fadeOut(opts.ubSpeed);
					break;
				default:
					$animate[$direction] = -op*$ubDistance*$ubItemSize;
					$ubCon.animate($animate,opts.ubSpeed);
			}
			indicatorsStyle($stpe);
		}
		function nextSwitch(){
			if ( !$ubCon.is(':animated') && !$ubItem.is(':animated') ) {
				if ( opts.ubEffect == 'leftSeamless' || opts.ubEffect == 'topSeamless' ){
					if ( $stpe == $ubJudge-1 ) {
						$stpe++;
						$animate[$direction] = -$stpe*$ubDistance*$ubItemSize;
						$ubCon.animate($animate,opts.ubSpeed);
						indicatorsStyle(0);
					}else if( $stpe == $ubJudge ){
						$stpe = 1;
						$ubCon.css($direction,'0');
						effectSwitch($stpe);
					}else{
						$stpe++;
						effectSwitch($stpe);
					}
				}else{
					if ( $stpe == $ubJudge ) {
						$stpe = 0;
						effectSwitch($stpe);
					}else{
						$stpe++;
						effectSwitch($stpe);
					}
				}
			}
		}
		function prevSwitch(){
			if ( !$ubCon.is(':animated') && !$ubItem.is(':animated') ) {
				if ( $stpe == '0' ) {
					if ( opts.ubEffect == 'leftSeamless' || opts.ubEffect == 'topSeamless' ){
						$ubCon.css( $direction,-$ubJudge*$ubDistance*$ubItemSize );
						$stpe = $ubJudge-1;
					}else{
						$stpe = $ubJudge;
					}
				}else{
					$stpe--;
				}
				effectSwitch($stpe);
			}
		}
		function indicatorsStyle(op){
			$ubIndicatorsBtn.eq(op).addClass('current').siblings().removeClass('current');
		}
		// Trigger
		$this.find(opts.ubPrev).click(prevSwitch);
		$this.find(opts.ubNext).click(nextSwitch);
		if ( opts.ubTrigger == 'hover' ) {
			$ubIndicatorsBtn.hover(function(e) {
				var i = $(this).index();
				triggerDelay = setTimeout(function() {
					$stpe = i;
					effectSwitch($stpe);
				}, 200);
			},function(){
				clearTimeout(triggerDelay);
			});
		}else{
			$ubIndicatorsBtn.click(function() {
				$stpe = $(this).index();
				effectSwitch($stpe);
			});
		}
	};
}(jQuery));
