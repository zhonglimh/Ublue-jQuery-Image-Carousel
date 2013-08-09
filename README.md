Ublue jQuery Image Carousel（焦点图&amp;图片轮播）
===========================

默认参数：

Dom节点

	// Dom节点
	ubCon:".focusCon",					// 内容（滚动时以该层做定位）
	ubItem:".item",						// 列表项
	ubIndicators:".focusIndicators",	// 小按钮
	ubPrev:".focusPrev",				// 向上按钮
	ubNext:".focusNext",				// 向下按钮

效果设置

	ubEffect:"left",					// 效果呈现方式 "left" "top" "fade"
	ubTrigger:"hover",					// 小按钮经触发条件 "hover" "click"
	ubAutoPlay:"on",					// 是否自动播放
	ubAutoBtn:"on",						// 小按钮是否自动生成（便于做成缩略图形式）
	ubTitleHover:"off",					// 标题是否滑动显示
	ubMode:"off",						// 是否开启多图滚动

时间设置 （按毫秒计算：1000毫秒=1秒）

	ubTime:5000,						// 自动播放的时间间隔
	ubSpeed:400,						// 图片切换的速度
	ubTitleSpeed:50						// 标题滑过显示的速度

使用和设置方法（示例）：
	$(".demoA").ublue_ImageCarousel();

	$(".demoB").ublue_ImageCarousel({
		ubAutoPlay:"off", // 取消自动滚动
		ubTitleHover:"on" // 标题hover显示
	});

	$(".demoC").ublue_ImageCarousel({
		ubAutoPlay:"off",  // 取消自动滚动
		ubMode:"on",  // 多图滚动
		ubTrigger:"click" // 小按钮点击切换
	});

	$(".demoD").ublue_ImageCarousel({
		ubAutoPlay:"off" // 取消自动滚动
	});

	$(".demoE").ublue_ImageCarousel({
		ubAutoPlay:"off", // 取消自动滚动
		ubEffect:"top"
	});

	$(".demoF").ublue_ImageCarousel({
		ubAutoPlay:"off", // 取消自动滚动
		ubEffect:"fade"
	});

	$(".demoG").ublue_ImageCarousel({
		ubAutoPlay:"off", // 取消自动滚动
		ubEffect:"fade", // 小按钮是否自动生成
		ubAutoBtn:"off" // 小按钮不自动生成（手工做成缩略图形式）
	});
