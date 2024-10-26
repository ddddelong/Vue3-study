// src/types.d.ts
declare module 'lunar-calendar' {
	export default class LunarCalendar {
		static solarToLunar(year: number, month: number, day: number): any;
		// 其他需要声明的方法和属性
	}
}