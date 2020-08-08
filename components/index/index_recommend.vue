<template>
	<view class="index_rec">
		<scroll-view @scrolltolower="scrolltolower" scroll-y class="scroll">
			<view class="recommend" v-if="recommend.length>0">
				<!-- 推荐 -->
				<view class="recommend_wrap">
					<navigator class="recommend_item" v-for="item in recommend" :key="item.id" :url="`./index_album?id=${item.target}`">
						<image :src="item.thumb" mode="widthFix" class="icon"></image>
					</navigator>
				</view>
				<!-- 月份 -->
				<view class="monthes_wrap">
					<view class="monthes_title">
						<view class="monthes_title_info">
							<view class="monthes_info">
								<text class="text">{{monthes.MM}}/</text>{{monthes.DD}}月
							</view>
							<view class="monthes_text">{{monthes.title}}</view>
						</view>
						<view class="monthes_title_more">更多 ></view>
					</view>
					<view class="monthes_content">
						<view class="monthes_items" v-for="(item,index) in monthes.items" :key="item.id">
							<go-detail :list="monthes.items" :index="index">
								<image :src="item.thumb + item.rule.replace('$<Height>', 360)" mode="aspectFill" class="icon"></image>
							</go-detail>
						</view>
					</view>
				</view>
				<!-- 热门 -->
				<view class="hots_wrap">
					<view class="hots_title">
						<text class="text">热门</text>
					</view>
					<view class="hots_content">
						<view class="hots_item" v-for="item in hots" :key="item.id">
							<image :src="item.thumb" mode="widthFix" class="icon"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import moment from 'moment'
	import goDetail from './goDetail.vue'

	export default {
		data() {
			return {
				recommend: [],
				monthes: {},
				hots: [],
				params: {
					limit: 30,
					order: 'hot',
					skip: 0
				},
				hasMore: true //分页默认还有数据
			}
		},
		mounted() {
			this.getList()
			uni.setNavigationBarTitle({
				title:"推荐"
			})
		},
		components:{
			goDetail
		},
		methods: {
			getList() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
					data: this.params
				}).then(result => {
					// console.log(result)
					//如果有就不重新渲染
					if(this.recommend.length === 0){
						// 推荐模块
						this.recommend = result.res.homepage[1].items
						//月份模块
						this.monthes = result.res.homepage[2]
						// 时间戳
						this.monthes.MM = moment(this.monthes.stime).format('MM')
						this.monthes.DD = moment(this.monthes.stime).format('DD')
						// console.log(this.monthes);
					}
					// 热门 数组拼接
					this.hots = [...this.hots, ...result.res.vertical]
					//判断是否还有下一页
					if(result.res.vertical.length === 0){
						this.hasMore = false
						uni.showToast({
							title:'已经到底啦',
							icon:'none'
						})
						return
					}
				})
			},
			scrolltolower() {
				if(this.hasMore){
					this.params.skip += this.params.limit
					this.getList()
				} else {
					uni.showToast({
						title:'已经到底啦',
						icon:'none'
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
	.recommend {
		>.recommend_wrap {
			display: flex;
			flex-wrap: wrap;

			>.recommend_item {
				margin-left: 5rpx;

				>.icon {
					width: 370rpx;
				}
			}
		}

		>.monthes_wrap {
			>.monthes_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;

				>.monthes_title_info {
					color: $color;
					font-size: 30rpx;
					font-weight: 600;
					display: flex;

					>.monthes_info {
						>.text {
							font-size: 36rpx;
						}
					}

					>.monthes_text {
						font-size: 34rpx;
						color: #666666;
						margin-left: 30rpx;
					}
				}

				>.monthes_title_more {
					font-size: 24rpx;
					color: $color;
				}
			}

			>.monthes_content {
				display: flex;
				flex-wrap: wrap;

				>.monthes_items {
					margin-left: 5rpx;

					>.icon {
						width: 245rpx;
					}
				}
			}
		}

		>.hots_wrap {
			>.hots_title {
				padding: 20rpx;

				>.text {
					border-left: 5rpx solid $color;
					font-size: 32rpx;
					font-weight: 800;
					padding-left: 20rpx;
				}
			}

			>.hots_content {
				display: flex;
				flex-wrap: wrap;

				>.hots_item {
					margin-left: 5rpx;

					>.icon {
						width: 245rpx;
					}
				}
			}
		}
	}
</style>
