<template>
	<view @touchstart="touchStart" @touchend="touchEnd">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 按下时间
				startTime: 0,
				// 按下坐标
				startX: 0,
				startY: 0
			}
		},
		methods:{
			touchStart(event){
				// console.log("按下" + event.changedTouches[0].clientX);
				// console.log("按下" + event.changedTouches[0].clientY);
				this.startTime = Date.now()
				this.startX = event.changedTouches[0].clientX
				this.starty = event.changedTouches[0].clientY
			},
			touchEnd(event){
				// console.log("松开" + event.changedTouches[0].clientX);
				// console.log("松开" + event.changedTouches[0].clientY);
				const endTime = Date.now()
				const endX = event.changedTouches[0].clientX
				const endY = event.changedTouches[0].clientY
				
				if(endTime - this.startTime > 2000){
					return
				}
				
				let direction = ''
				if(Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) > 10){
					direction = endX - this.startX > 0 ? 'left':'right'
				} else {
					return
				}
				
				console.log(direction);
				this.$emit('swiperAction',{direction})
			}
		}
	}
</script>

<style>
</style>
