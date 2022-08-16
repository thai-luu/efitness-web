<template>
<div>
  <div class="bg-gray-800 pt-3">
    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
      <h1 class="font-bold pl-2">Users</h1>
    </div>
  </div>
  <SearchUser />
    <el-table
    ref="multipleTable"
    :data="users"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="Email"
      property="email"
      width="220">
    </el-table-column>
    <el-table-column
      property="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      property="permission"
      label="Permission"
      >
      <template slot-scope="scope">{{ scope.row.permissions[0].name }}</template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button>
        <el-button type="text" size="small" v-if="scope.row.deleted_at != null && scope.row.id != $auth.user.data.id" @click="unBlock(scope.row.id)">Unblock</el-button>
        <el-button type="text" size="small" v-if="scope.row.deleted_at == null && scope.row.id != $auth.user.data.id" @click="block(scope.row.id)">Block</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-bind="{ currentPage, total, pageSize }" />
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
  <el-dialog
    title="Edit User"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>This is a message</span>
    <el-form :model="user" class="">
      <el-form-item label="Permission">
      <el-select v-model="user.permissions[0].name" placeholder="Activity zone">
        <el-option v-for="permission in options" :label="permission.label" :value="permission.value" :key="permission.name"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="Password">
      <el-input v-model="user.password" type="password" placeholder="Input password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm password" prop="checkPass">
        <el-input type="password" v-model="user.checkPass"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" plain @click="updateUser(user.id)">Update</el-button>
      <el-button @click="dialogVisible = false">Cancel</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import Pagination from '~/components/shared/Pagination.vue'
import SearchUser from '~/components/shared/user/SearchUser.vue'
import { index, block, unBlock, update } from '~/api/admin/user'
import _cloneDeep from 'lodash/cloneDeep'
export default {
    components: {
        Pagination,
        SearchUser
    },
    layout:'admin',

    watchQuery: true,

    async asyncData({app, query}) {
        try{
            const users =  await index(app.$axios, query)
            return  { 
              users: users.data,
              total: users.meta.total,
              pageSize: users.meta.per_page,
              currentPage: users.meta.current_page,
              }
        }catch (err){
          return {users:[] }
        }
    },

    data() {
        return {
            multipleSelection: [],
            dialogVisible: false,
            user: {
              permissions: [
                {
                  name:'',
                }
              ],
              password: '',
            },

            options:[
                {
                    label:'CTV',
                    value: 'CTV'
                },
                {
                    label:'QTV',
                    value: 'QTV'
                },
                {
                    label:'ND',
                    value: 'ND'
                },
            ],
        }
    },
    methods:{
        async fetchUser() {
          try{
            const users =  await index(this.$axios, this.$route.query) 
              this.users = users.data
              this.total = users.meta.total
              this.pageSize = users.meta.per_page
              this.currentPage = users.meta.current_page
        }catch (err){ 
        }
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        edit(user) {
          this.user = _cloneDeep(user)
          this.dialogVisible = true
        },

        async updateUser(id) {
          const form = {
            password: this.user.password,
            permissions: this.user.permissions[0].name
          }
          if(this.user.password === this.user.checkPass){
            try {
              await update(this.$axios, id, form)
              this.$message.success('Updated successfully')
              this.fetchUser()
              this.dialogVisible = false
            } catch (error) {
              this.$message.error('Some thing went wrong')
            }
          } else {
            this.$message.error('Confirm password incorrect')
          }
        },

        async block(id) {
          try {
            await block(this.$axios, id)
            this.$message.success('Updated successfully')
            this.fetchUser()
          } catch (error) {
            this.$message.error('Some thing went wrong')
          }
        },

        async unBlock(id) {
          try {
            await unBlock(this.$axios, id)
            this.$message.success('Update successfully')
            this.fetchUser()
          } catch (error) {
            this.$message.error('Some thing went wrong')
          }
        }
    }
}
</script>