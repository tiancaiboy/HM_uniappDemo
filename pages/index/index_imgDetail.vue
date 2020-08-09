<template>
	<view class="imgDetall">
		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetall.user.avatar" mode="widthFix" class="icon"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">{{imgDetall.user.name}}</view>
				<view class="user_time">{{imgDetall.cntime}}</view>
			</view>
		</view>
		<!-- 大图显示 -->
		<view class="user_hightImg">
			<swiper-action @swiperAction="handswiperAction">
				<image :src="imgDetall.newThumb" mode="widthFix"></image>
			</swiper-action>
		</view>
		<!-- 点赞收藏 -->
		<view class="user_rank">
			<view class="rank">
				<image src="../../static/index/bingo_icon.png" mode="widthFix" class="icon"></image>
				<text class="iconD">{{imgDetall.rank}}</text>
			</view>
			<view class="user_collect">
				<image src="../../static/index/bingo_icon_left.png" mode="widthFix" class="icon"></image>
				<text class="iconS">收藏</text>
			</view>
		</view>
		<!-- 下载 -->
		<view class="album_download" @click="download">
			<view class="download">下载图片</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	moment.locale('zh-cn') // 时间英文转中文
	import swiperAction from '@/components/index/swiperAction.vue'
	
	export default {
		data() {
			return {
				imgDetall: {},
				album: [],
				hot: [],
				comment: [],
				imgIndex: 0
			}
		},
		onLoad() {
			console.log(getApp().globalData);
			const {imgIndex} = getApp().globalData
			
			this.imgIndex = imgIndex
			this.getDate()
		},
		components:{
			swiperAction
		},
		methods:{
			getDate(){
				const {imgList} = getApp().globalData
				this.imgDetall = imgList[this.imgIndex]
				this.imgDetall.newThumb = this.imgDetall.thumb + this.imgDetall.rule.replace('$<Height>',360)
				// 时间戳
				this.imgDetall.cntime = moment(this.imgDetall.atime*1000).fromNow();
				
				this.getComm(this.imgDetall.id)
			},
			getComm(id){
				this.request({
					url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
				}).then(result => {
					console.log(result);
					this.album = result.res.album
					this.hot = result.res.hot
					this.comment = result.res.comment
				})
			},
			handswiperAction(e){
				console.log(e);
				const {imgList} = getApp().globalData
				if(e.direction==='left' && this.imgIndex<imgList.length - 1){
					this.imgIndex++ //左滑
					this.getDate()
				} else if(e.direction==='right' && this.imgIndex>0){
					this.imgIndex-- //右滑
					this.getDate()
				} else {
					uni.showToast({
						title:'没有更多了哟',
						icon:'none'
					})
				}
			},
			async download(){
				await uni.showLoading({
					title:'下载中'
				})
				// 先将图片保存在临时地址  tempFilePath
				const res1 = await uni.downloadFile({
					url:this.imgDetall.img,
				})
				const {tempFilePath} = res1[1]
				// 然后保存本地
				const res2 = await uni.saveImageToPhotosAlbum({
					filePath: tempFilePath
				})
				uni.hideLoading()
				await uni.showToast({
					title:"下载成功"
				})
			}
		}
	}
</script>

<style lang="scss">
	.imgDetall{
		>.user_info{
			display: flex;
			padding: 20rpx;
			>.user_icon{
				padding: 0 20rpx;
				>.icon{
					width: 88rpx;
					border-radius: 50%;
				}
			}
			>.user_desc{
				>.user_name{
					color: #000;
					font-weight: 500;
				}
				>.user_time{
					color: #ccc;
					font-size: 24rpx;
					padding: 10rpx 0;
				}
			}
		}
		>.user_rank{
			height: 80rpx;
			display: flex;
			border-bottom: 1rpx solid #ccc;
			>.rank{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				>.icon{
					width: 40rpx;
				}
			}
			>.user_collect{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				>.icon{
					width: 40rpx;
				}
			}
		}
		>.album_download{
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			>.download{
				width: 90%;
				height: 85%;
				background-color: $color;
				color: #fff;
				font-size: 50rpx;
				font-weight: 600;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
