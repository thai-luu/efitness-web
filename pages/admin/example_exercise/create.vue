<template>
<el-form ref="form" v-model="form" label-width="120px">
  <el-form-item label="Tên bài tập">
    <el-input type="text" v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="Mẹo tập">
    <el-input type="textarea" v-model="form.note"></el-input>
  </el-form-item>
  <el-form-item label="Dành cho">
    <el-select v-model="form.level_id" placeholder="please select your zone">
      <el-option v-for="(level,index) in levels" :key="level.id" :label="level.name_vi" :value="level.id">{{level.name_vi}}</el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Video hướng dẫn">
    <el-input type="text" v-model="form.linkVd"></el-input>
  </el-form-item>
  <el-form-item  label="Muscle" prop="muscle">
    <el-select
        v-model="form.muscles"
        multiple
        filterable
        default-first-option
        placeholder="Chọn các nhóm cơ">
            <el-option
                v-for="item in muscleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="onSubmit">Create</el-button>
    <el-button>Cancel</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import _mapKeys from 'lodash/mapKeys'
import _cloneDeep from 'lodash/cloneDeep';
import { getLevels,createExercise } from '~/api/exercise';
export default {
  props: {
  },
    layout:'admin',
    data (){
      return {
        form:{
          level_id:null,
          note:'',
          name:'',
          calories:'',
          linkVd:'',
          muscles:[]
        },
        muscles:[]
      }
    },
    async asyncData({app}){
        try{
        const levels = await getLevels(app.$axios)
        return { levels }
        }catch(err){
            return { levels:[]}
        }
    },

    computed: {
      muscleList () {
            return this.convertMuscle(this.muscles)
        }
    },

    created (){
      this.getStoreLocal()
    },

    methods:{
      getStoreLocal () {
            if(process.client) {
            this.muscles = JSON.parse(localStorage.muscles).data
            console.log(this.muscles)
        }
        
        },
      convertMuscle (muscles) {
            const muscleList = muscles.map((value) => {
            value =  _mapKeys(value , (val, key) => {
                    if(key === 'id'){
                    return 'value'
                    }
                    if(key === 'name'){
                    return 'label'
                    }
                    
                })
                delete value.undefined
                return value
            })
            
            return muscleList
        },
        async onSubmit(){
          try{
           
          await createExercise(this.$axios,this.form)
        }
      catch(err){
        this.$notify.error('Some thing went wrong')
      }
    }
    }
}
</script>