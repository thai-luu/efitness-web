<template>
<div class="container mx-auto header-profile">
    <el-menu
            ref="menu"
            mode="horizontal"
            :default-active="defaultActive"
            active-text-color="#5077c7"
            class="el-menu-demo flex justify-center"
            router
            >
                <el-menu-item :index="`${route}/profile`">Profile</el-menu-item>
                <el-menu-item :index="`${route}/exercise_mode`">Exercise</el-menu-item>
                <el-menu-item :index="`${route}/diet?day_use=${day}`">Diary</el-menu-item>
                <el-menu-item :index="`${route}/training_session`">Training Session</el-menu-item>
                <el-menu-item :index="`${route}/food`">My foods</el-menu-item>
      </el-menu>
      <div class="min-h-screen px-5 py-5">
      <nuxt-child/>
      </div>

</div>
</template>
<script>
const date = new Date()
const today = (date) => {
    const dateDay = date.getDate()
    const month = date.getMonth() + 1
    let dateMonth
    let dateToday
    if(dateDay < 10)
        dateToday = `0${dateDay}`
    else
        dateToday = dateDay
    if(month < 10)
        dateMonth = `0${month}`
    else
        dateMonth = month
    return `${date.getFullYear()}-${dateMonth}-${dateToday}`
    }
import TabLinks from '~/components/shared/TabLinks/Tabs.vue';
import TabLinkItem from '~/components/shared/TabLinks/Item.vue';
export default {
    layout: 'default',
    components:{
        TabLinks,
        TabLinkItem
    },
    data () {
      return {
        day: today(date)
      }
    },

    computed:{
      defaultActive() {
        const pathArr = this.$route.path.split('/');
        const path3 = pathArr[3].split('?')
        const path = `/${pathArr[1]}/${pathArr[2]}/${pathArr[3]}`;
        const pathDefault = pathArr[3]
        if(pathDefault === undefined || pathDefault === '')
        return `/${pathArr[1]}/${pathArr[2]}/profile`;
        else{
          if(path3[0] === 'diet')
            return `${path}?day_use=${this.day}` || `/${pathArr[1]}/${pathArr[2]}`;
          else
            return path || `/${pathArr[1]}/${pathArr[2]}`;
        }
        
      },

      route(){
        const pathArr = this.$route.path.split('/');
        const path = `/${pathArr[1]}/${pathArr[2]}`;
        return path || '/';
      }
    },

      created(){
      
    },
    methods:{
        tab(route) {
                return `/contests/${route}`;
            },
    }
}
</script>
<style lang="scss">
.header-profile{
  .el-menu-item.is-active{
      border-bottom-color: #67C23A !important;
      color: #67C23A !important;
      border-bottom: 2px solid #67C23A !important;
  }
}
</style>