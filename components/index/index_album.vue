<template>
	<view class="index_alb">
		<scroll-view  @scrolltolower="scrolltolower" scroll-y class="scroll">
			<view class="album">
				<!-- 轮播 -->
				<view class="album_swiper">
					<swiper indicator-dots autoplay circular class="swiper">
						<swiper-item v-for="item in banner" :key="item.id" class="icom">
							<image :src="item.thumb" mode="widthFix" class="icon"></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- 列表 -->
				<view class="album_list">
					<navigator
						class="album_item" 
						v-for="item in album" 
						:key="item.id" 
						hover-class="none" 
						:url="`../../pages/index/index_album?id=${item.id}`">
						<view class="album_img">
							<image :src="item.cover" class="icon" mode="aspectFill"> </image>
						</view>
						<view class="album_info">
							<view class="album_name">{{item.name}}</view>
							<view class="album_desc">{{item.desc}}</view>
							<view class="album_btn">
								<view class="album_attention">+ 关注</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				album: [],
				banner: [],
				hasMore: true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: "专辑"
			})
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data: this.params
				}).then(result => {
					console.log(result);
					
					if(this.banner.length === 0){
						this.banner = result.res.banner
					}
					
					this.album = [...this.album, ...result.res.album]
					
					if(result.res.album.length === 0){
						this.hasMore = false
						uni.showToast({
							title: '已经到底啦',
							icon: 'none'
						})
						return
					}
				})
			},
			scrolltolower() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.getList()
				} else {
					uni.showToast({
						title: '已经到底啦',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.scroll{
		height: calc(100vh - 72rpx);
	}
	.album {
		>.album_swiper {
			>.swiper {
				height: calc(750rpx / 2.3);

				>.icon {
					height: 100%;
				}
			}
		}

		>.album_list {
			padding: 10rpx;

			>.album_item {
				@extend .last_boder;
				padding: 10rpx 0;
				display: flex;
				border-bottom: 1rpx solid #ccc;

				>.album_img {
					flex: 1;
					padding: 10rpx;

					>.icon {
						width: 200rpx;
						height: 200rpx;
					}
				}

				>.album_info {
					flex: 2;
					padding: 0 10rpx;
					overflow: hidden;

					>.album_name {
						font-size: 30rpx;
						color: #000;
						padding: 10rpx 0;
					}

					>.album_desc {
						padding: 10rpx 0;
						font-size: 24rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					>.album_btn {
						padding: 10rpx;
						display: flex;
						justify-content: flex-end;

						>.album_attention {
							color: $color;
							border: 1rpx solid $color;
							padding: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
