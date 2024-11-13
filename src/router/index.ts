import {createRouter, createWebHistory} from 'vue-router';
import APP from '@/App.vue';
import HomePage from "@/components/HomePage.vue";
import MessageContainer from "@/components/Message/MessageContainer.vue";
import Danmu from "@/components/BulletComments/Danmu.vue";

const router = createRouter(
	{
		history: createWebHistory(),
		routes: [
			{
				path: '/',
				component: HomePage
			},
			{
				name: 'Home',
				path: '/home',
				component: HomePage
			},
			{
				name: 'message',
				path: '/message',
				component: MessageContainer
			},
			{
				name: 'Danmu',
				path: '/danmu',
				component: Danmu,
			}
		]
	}
)

export default router;