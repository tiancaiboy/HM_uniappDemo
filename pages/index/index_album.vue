<template>
	<view class="album_message">
		<!-- 背景 -->
		<view class="album_bg">
			<image :src="album.cover" mode="widthFix" class="icon"></image>
			<view class="album_info">
				<view class="album_name">{{album.name}}</view>
				<view class="album_btn">关注专辑</view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="album_author">
			<view class="album_author_info">
				<image :src="album.user.avatar" mode="widthFix" class="icon"></image>
				<view class="album_author_name">{{album.user.name}}</view>
			</view>
			<view class="album_author_desc"><text>{{album.desc}}</text></view>
		</view>
		<!-- 剧照 -->
		<view class="album_list">
			<view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill" class="icon"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from '@/components/index/goDetail.vue'
	
	export default {
		data() {
			return {
				params: {
					limit: 30,
					order: 'new',
					skip: 0,
					first: 1
				},
				id: -1,
				album: {},
				wallpaper: [],
				hasMore: true
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.id
			// this.id = "5e5cf679e7bce739db1281e4"
			this.getList()
		},
		onReachBottom() {
			if (this.hasMore) {
				this.params.first = 0
				this.params.skip += this.params.limit
				this.getList()
			} else {
				uni.showToast({
					title: '已经到底啦',
					icon: 'none'
				})
			}
		},
		components:{
			goDetail
		},
		methods:{
			getList() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(result => {
					console.log(result);
					console.log(JSON.stringify(result.res.album.desc));
					if(Object.keys(this.album).length === 0){
						this.album = result.res.album
					}
					if(result.res.wallpaper.length === 0){
						this.hasMore = false
						uni.showToast({
							title: '已经到底啦',
							icon: 'none'
						})
						return
					}
					this.wallpaper = [...this.wallpaper, ...result.res.wallpaper]
				})
			}
		}
	}
</script>

<style lang="scss">
	.album_message{
		>.album_bg{
			position: relative;
			>.icon{
				
			}
			>.album_info{
				position: absolute;
				width: 100%;
				left: 0;
				bottom: 0;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 80rpx;
				color: #fff;
				>.album_name{
					font-size: 40rpx;
				}
				>.album_btn{
					font-size: 30rpx;
					background-color: $color;
					width: 150rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
				}
			}
		}
		>.album_author{
			padding: 10rpx;
			>.album_author_info{
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				>.icon{
					width: 50rpx;
				}
				>.album_author_name{
					color: #000;
					margin-left: 20rpx;
				}
			}
			>.album_author_desc{
				
			}
		}
		>.album_list{
			display: flex;
			flex-wrap: wrap;
			>.album_item{
				margin-left: 5rpx;
				width: 245rpx;
				>.icon{
					height: 160rpx;
				}
			}
		}
	}
</style>
