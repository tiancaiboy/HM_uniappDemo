<template>
	<view class="index">
		<view class="tab_title">
			<view class="title_inner">
				<uni-segmented-control 
					:current="current" 
					:values="items.map(v => v.title)" 
					@clickItem="onClickItem" 
					style-type="text"
					active-color="#b4237a">
				</uni-segmented-control>
			</view>
			<image src="../../static/index/search_icon.png" class="icon"></image>
		</view>
		<view class="content">
			<view v-if="current === 0">
				<index-recommend></index-recommend>
			</view>
			<view v-if="current === 1">
				<index-categroy></index-categroy>
			</view>
			<view v-if="current === 2">
				<index-new></index-new>
			</view>
			<view v-if="current === 3">
				<index-album></index-album>
			</view>
		</view>
	</view>
</template>

<script>
	import indexCategroy from '@/components/index/index_categroy.vue'
	import indexNew from '@/components/index/index_new.vue'
	import indexRecommend from '@/components/index/index_recommend.vue'
	import indexAlbum from '@/components/index/index_album.vue'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"

	export default {
		components: {
			indexCategroy,
			indexNew,
			indexRecommend,
			indexAlbum,
			uniSegmentedControl
		},
		data() {
			return {
				items: [{
					title: "推荐"
				}, {
					title: "分类"
				}, {
					title: "最新"
				}, {
					title: "专辑"
				}],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		// onLoad() {
		// 	this.request({
		// 		url: 'http://157.122.54.189:9088/image/v1/vertical/category'
		// 	}).then(res => {
		// 		console.log(res);
		// 	})
		// }
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
