<template>
    <div class="block">
    <span class="demonstration">Select a date </span>
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Pick a day"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
      @change="pickDay">
    </el-date-picker>
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
import _find from 'lodash/find'
import _assign from 'lodash/assign'
export default {
    data(){
        return {
            pickerOptions: {
                disabledDate(time) {
                    return false
                },
            shortcuts: [
                {
                    text: 'Today',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                },
                {
                    text: 'Yesterday',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, 
                {
                    text: 'A week ago',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
        },
            value: today(date),
        }
    },

     methods:{
        pickDay() {
            this.$router.push({
                query: _assign({}, this.$route.query, {
                    ['day_use']: this.value,
                }),
            })
        },

        clear() {
            this.$router.push({
                query: '',
            })
        }
    },

    created() {
        if(Object.getOwnPropertyNames(this.$route.query).length === 0){
            this.$router.push({
            query: _assign({}, this.$route.query, {
                    ['day_use']: this.value,
                }),
            })
        }
        
    }
}
</script>