<template>
<el-calendar>
  <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
              <template
                slot="dateCell"
                slot-scope="{date, data}">
                <p @click="console(data,date)">
                  {{ data.day.split('-').slice(1).join('-') }}
                </p>
              </template>
            </el-calendar>
</template>
<script>
export default {
    layout: 'null',
    data () {
        return {
        form: {
            name:'',
            email:'',
            password: '',
        }
        }
    },
    methods: {
       console(data,date){
           
       }
    }
}
</script>