interface Danmu {
	mode: number;   // 弹幕的类型
	startTime: number;  // 弹幕相对于视频位置的开始时间（ms），0即在视频开始立即出现
	text: string;  // 弹幕的文本内容
	ttl: number;   // 表示弹幕剩余的生存时间（ms）
	duration: number;  // 弹幕的持续时间（ms）
	cIndex: number;  // 表示弹幕的弹幕池ID，用于在删除弹幕时寻找弹幕所在弹幕池。
	motion: number;  // 弹幕的运动轨迹，0为普通弹幕，1为底部弹幕，2为顶部弹幕，3为逆向弹幕。
	moveable: boolean;  // 弹幕是否可以移动，默认为false。
}

interface Danmu1 {
	type: '滚动' | '底部' | '顶部';
	content: string;
	color: string;
}

export type {Danmu, Danmu1};