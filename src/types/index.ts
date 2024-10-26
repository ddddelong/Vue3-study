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

export type { Ref, ReactiveArray, MusicInfo };