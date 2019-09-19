<template>
    <div id="music" class="music">
      <!-- 播放器 -->
      <audio :src="currentSong" id= 'bgMusic' autoplay="autoplay" preload="auto" controls="controls" @ended="nextSong()"> </audio>
      <ul>
        <li v-for="(item,index) in musicList" @click="clickHandle(index)">
          <span v-if="currentIndex==index" style="color:goldenrod">歌名:{{item.name}}---{{item.author}}</span>
          <span v-else>歌名:{{item.name}}---{{item.author}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
    import {getMusicList} from '../../api/api.js';
    export default {
        name: 'audioList',
        data() {
            return {
                musicList:[],
                status:true,
                currentIndex:0,
                currentSong:'',
                musicSta: true,
            }
        },

        mounted() {
            this.getMusic();
        },
        methods: {
            //获取用户列表
            getMusic() {
                let t = this;
                t.listLoading = true;
                getMusicList({}).then((res) => {
                    if (res.code == 200) {
                        let result = res.data.data;
                        t.musicList = result;
                        t.length = result.length;
                        t.total = parseInt(Math.random() * (t.length + 1), 10);
                        t.currentIndex = t.total;
                        this.currentSong = this.musicList[t.currentIndex].path;
                        t.listLoading = false;

                    }
                });
            },
            clickHandle: function (index) {
                this.currentIndex = index
                this.currentSong = this.musicList[index].path;
                console.log(this.musicList[index].path)
            },
            nextSong: function () {
                if (this.currentIndex == this.musicList.length - 1) {
                    this.currentIndex = -1;
                }
                this.currentIndex++;
                console.log(this.currentIndex);
            },
        }

    }

</script>
<style scoped>
 #music{
   width: 260px;
 }
</style>


