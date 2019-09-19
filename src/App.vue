<template>
	<div id="app" class="mobile">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
    <div class="audio" @mousedown.stop="move" :style="positions">
			<div class="audio-btn" @click="(showAudio = !showAudio)">
			  <span class="audio-icon"><i id="icon-yinyue" class="iconfont icon-yinyue"></i></span>
			</div>
			<div :class="['audio-list',{'audio-list-hidden': showAudio}]" >
				<audio-list></audio-list>
			</div>
		</div>
	</div>
</template>

<script>
import './assets/common/coverface.css'
import audioList from './pages/components/audio.vue'
export default {
	name: 'app',
	components: {
		audioList
	},
	data() {
		return {
			showAudio: true,
			positions: {'top': '80px','left': '180px'},
			positionX:0,
      positionY:0,
		}
	},
	created: function () {
    if(document.documentElement.clientWidth > 1000){
        require('./assets/common/pcindex.css');
    }else{
        require('./assets/js/flexible-2.0.js');
        require('./assets/mobile/mobile.css');
    }
  },
	methods: {
		move(e){
      let odiv = e.target;
			let objLeft = this.getMove(odiv,'offsetLeft');
			let objTop = this.getMove(odiv,'offsetTop');
      //算出鼠标相对元素的位置
      let disX = e.clientX - objLeft;
      let disY = e.clientY - objTop;
      document.onmousemove = (e)=>{    //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        this.positions = {'top': top + 'px','left': left + 'px'}
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

		getMove(element,direction){
			var actual = '';
			if(direction == 'offsetLeft'){
				actual =	element.offsetLeft
			}else if(direction == 'offsetTop'){
        actual =	element.offsetTop
			}
			var current = element.offsetParent;
			while (current !== null){
				if(direction == 'offsetLeft'){
					actual += current.offsetLeft
				}else if(direction == 'offsetTop'){
					actual += current.offsetTop
				}
			  current = current.offsetParent;
			}
			return actual;
		}

	},
}

</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	font-family: 'Nunito';
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
}

#app {
	font-family: 'Arial';
  font-size: 14px;
  font-weight: 400;
}

.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 10px;
	//border:1px solid #dfe6ec;
	margin: 10px 0px;
	.el-form-item {
		margin-bottom: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
