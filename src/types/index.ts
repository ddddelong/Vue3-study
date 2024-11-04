type Ref<T> = { value: T };

type ReactiveArray<T> = Array<T> & {
	[key: number]: T;
}

type MusicInfo = {
	title: string;
	author: string;
	url: string;
	coverUrl: string;
	cruMusic: boolean;
}

type MessageObject = {
	id: string,
	message: string,
	color: string,
}

type textAnimationOptionsType = {
	duration: number,   // 动画持续时间，单位s
	speed: number,    // 动画速度
	msgArray: Array<string>,     // 消息数组
	msgCount: number,    // 消息数量
	textColorList: Array<string>,   // 文字颜色数组
}

export type {Ref, ReactiveArray, MusicInfo, MessageObject, textAnimationOptionsType};