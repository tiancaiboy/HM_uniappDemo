<template>
	<view class="touch" @touchstart="touchStart" @touchend="touchEnd">
		上下左右滑动手势
	</view>
</template>
/**
 * 给容器两个事件  按下和松开
 按下：记录按下时间Date.now()  返回毫秒
	   记录按下的x y
	   
 离开：记录离开时间Date.now()  返回毫秒
	   记录离开的x y
	   根据两个时间运算判断按下屏幕的时间是否合法
	   根据两个的坐标判断距离是否合法  判断滑动方向
 */
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
				if(Math.abs(endX - this.startX) > 10){
					direction = endX - this.startX > 0 ? 'left':'right'
				} else {
					return
				}
				
				console.log(direction);
			}
		}
	}
</script>

<style>
	.touch{
		height: 600rpx;
		background-color: #007AFF;
	}
</style>
