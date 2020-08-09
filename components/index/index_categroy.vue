<template>
	<view class="index_cat">
		<view class="home_categroy">
			<view class="cate_item" v-for="item in category" :key="item.id">
				<navigator :src="item.cover" mode="aspectFill" :url="`../../pages/index/index_categroy?id={item.id}`" hover-class="none" class="icon"></navigator>
				<view class="cate_name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category:[]
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"分类"
			})
			this.getList()
		},
		methods:{
			getList(){
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/vertical/category',
				}).then(result => {
					console.log(result);
					this.category = result.res.category
				})
			}
		}
	}
</script>

<style lang="scss">
	.index_cat{
		>.home_categroy{
			display: flex;
			flex-wrap: wrap;
			>.cate_item{
				width: 245rpx;
				position: relative;
				margin-left: 5rpx;
				>.icon{
					height: 240rpx;
				}
				>.cate_name{
					position: absolute;
					left: 0;
					bottom: 0;
					height: 50rpx;
					width: 100%;
					font-size: 40rpx;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					color: #fff;
					background-image: linear-gradient(to right top, rgba(0,0,0,.2), rgba(0,0,0,0))
				}
			}
		}
	}
</style>
