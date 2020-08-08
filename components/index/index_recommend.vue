<template>
	<view class="recommend">
		<!-- 推荐 -->
		<view class="recommend_wrap">
			<view class="recommend_item" v-for="item in recommend" :key="item.id">
				<image :src="item.thumb" mode="widthFix" class="icon"></image>
			</view>
		</view>
		<!-- 月份 -->
		<view class="moneths_wrap">
			<view class="moneths_title">
				<view class="moneths_title_info">
					<view class="moneths_info">
						<text class="text">18/</text>01月
					</view>
					<view class="moneths_text">你负责美丽就好</view>
				</view>
				<view class="moneths_title_more">更多 ></view>
			</view>
			<view class="moneths_content">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommend: []
			}
		},
		mounted() {
			this.request({
				url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
				data: {
					limit: 30,
					order: 'hot',
					skip: 0
				}
			}).then(result => {
				console.log(result)
				this.recommend = result.res.homepage[1].items
			})
		}
	}
</script>

<style lang="scss">
	.recommend{
		>.recommend_wrap{
			display: flex;
			flex-wrap: wrap;
			>.recommend_item{
				margin-left: 5rpx;
				>.icon{
					width: 370rpx;
				}
			}
		}
		>.moneths_wrap{
			>.moneths_title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				>.moneths_title_info{
					color: $color;
					font-size: 30rpx;
					font-weight: 600;
					display: flex;
					>.moneths_info{
						>.text{
							font-size: 36rpx;
						}
					}
					>.moneths_text{
						font-size: 34rpx;
						color: #666666;
						margin-left: 30rpx;
					}
				}
				>.moneths_title_more{
					font-size: 24rpx;
					color: $color;
				}
			}
		}
	}
</style>
