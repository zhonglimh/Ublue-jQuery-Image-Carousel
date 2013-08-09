Ublue jQuery Image Carousel（焦点图&amp;图片轮播）
===========================

设置和说明：

Dom节点

	// Dom节点
	ubCon:".focusCon",				// 内容（滚动时以该层做定位）
	ubItem:".item",						// 列表项
	ubIndicators:".focusIndicators",	// 小按钮
	ubPrev:".focusPrev",				// 向上按钮
	ubNext:".focusNext",				// 向下按钮

效果展现

	ubEffect:"left",						// 效果呈现方式 "left" "top" "fade"
	ubTrigger:"hover",					// 小按钮经触发条件 "hover" "click"
	ubAutoPlay:"on",					// 是否自动播放
	ubAutoBtn:"on",					// 小按钮是否自动生成（便于做成缩略图形式）
	ubTitleHover:"off",					// 标题是否滑动显示
	ubMode:"off",						// 是否开启多图滚动

时间设置 （按毫秒计算：1000毫秒=1秒）

	ubTime:5000,						// 自动播放的时间间隔
	ubSpeed:400,						// 图片切换的速度
	ubTitleSpeed:50					// 标题滑过显示的速度
