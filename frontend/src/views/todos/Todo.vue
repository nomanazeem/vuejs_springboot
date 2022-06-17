<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          <h1> Add / Edit Todo Details</h1>
        </CCardHeader>
        <CCardBody>
         <CForm @submit.prevent="save">

                <div v-if="error" class="alert alert-danger" role="alert">
                  {{error}}
                </div>
                <div v-if="success" class="alert alert-success" role="alert">
                  {{success}}
                </div>

                  <CInput placeholder="Id" v-model="todo.id" readonly>
                  </CInput>
                  <CInput placeholder="Name" v-model="todo.name" required>
                  </CInput>

                  <div role="group" class="form-group">
                  <select v-model="todo.status" class="form-control" required>
                    <option v-for="option in options" :key="option.value" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                  </div>

                 <!--   <CSelect
                        v-model="todo.staus"
                        :options="options"
                        :v-bind:text="options.text"
                        /> -->


                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="info" @click="goBack">Back</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="primary" type="submit" class="px-4">Save</CButton>
                    </CCol>
                  </CRow>
                </CForm>
        </CCardBody>
        <CCardFooter>
        </CCardFooter> 
          <!-- <CDataTable
            striped
            small
            fixed
            :items="visibleData"
            :fields="fields"
          />
       -->
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import http from '../../http-common';

export default {
  name: 'Todo',
  data () {
    return {
      id: 0,
      options: [
        { text: 'Active', value: 'Active' },
        { text: 'Banned', value: 'Banned' },
         { text: 'Pending', value: 'Pending' },
        { text: 'Inactive', value: 'Inactive' }
      ],
      error:'',
      success:'',
      todo:{
        id:'',
        name:'',
        status:''
      }
    }
  },
  computed: {
  },

  mounted(){
      this.init();
      this.getItem(this.id);
  },

  methods: {
    init () {
       this.id = this.$route.params.id;
    },
    goBack() {
      this.$router.push({path: '/todos'})
    },
    save(){
      var todoPayload = {id:this.todo.id, name: this.todo.name, status:this.todo.status};

      http({url: '/todo/save', data:todoPayload, method:'POST'})
      .then(resp=>{
        this.success=resp.data.message;  
      })
      .catch(err=>{
          this.error=err;
      });
    },
    getItem(id){
      if(id > 0 ){
        http({url:'/todo/find/'+id, methods:'GET'})
        .then(resp=>{
          //console.log(resp.data);
          //alert(resp.data.message);
          this.todo =  resp.data;
        });
      }
    },
  }
}
</script>
