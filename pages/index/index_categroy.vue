<template>
	<view class="index">
		<!-- 分段器 -->
		<view class="tab_title">
			<!-- 左边 -->
			<view class="title_inner">
				<uni-segmented-control 
					:current="current" 
					:values="items.map(v => v.title)" 
					@clickItem="onClickItem" 
					style-type="text"
					active-color="#b4237a">
				</uni-segmented-control>
			</view>
			<!-- 右边 -->
			<image src="../../static/index/search_icon.png" class="icon"></image>
		</view>
		<!-- 内容 -->
		<view class="content">
			111
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"

	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [{
					title: "最新",
					order: "new"
				}, {
					title: "热门",
					order: "hot"
				}],
				current: 0,
				params: {
					limit: 30,
					skip: 0,
					order: "new"
				},
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			getList(){
				this.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params
				}).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		>.tab_title{
			position: relative;
			>.title_inner{
				width: 60%;
				margin: 0 auto;
			}
			>.icon{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				top: 50%;
				right: 5%;
				transform: translateY(-50%);
			}
		}
	}
</style>
