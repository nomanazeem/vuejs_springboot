<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="registerUser">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                
                <div v-if="status===true" class="alert alert-success" role="alert">
                  {{message}}
                </div>
                <div v-else-if="status===false" class="alert alert-danger" role="alert">
                  {{message}}
                </div>

                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  required
                  v-model="register.username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  required
                  v-model="register.email"
                  prepend="@"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  required
                  autocomplete="new-password"
                  v-model="register.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  required
                  autocomplete="new-password"
                  v-model="register.repeatpassword"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" block type="submit" >Create Account</CButton>
                <CButton color="link" @click="$router.push('/pages/login')" class="px-0">Already member? sign-in here</CButton> 
              </CForm>
            </CCardBody>
            <!-- <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter> -->
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
      status:'',
      message:'Testing',
      register:{
        username:'',
        email:'',
        password:'',
        repeatpassword:''
      }
    }
  },

  methods:{
    registerUser(){
        if(this.register.password != this.register.repeatpassword){
          this.status=false;
          this.message="Password and repeat password must be same.";
          return;
        }
       //debugger;
        this.$store.dispatch("register", {username: this.register.username, email:this.register.email, password: this.register.password, role:'admin'})
        .then((resp)=>{
          //debugger;
          console.log('regster success');
          
          this.status=resp.data.status;
          this.message=resp.data.message;

          //Set empty
          this.register.username="";
          this.register.email="";
          this.register.password="";
          this.register.repeatpassword="";
        })
        .catch(err=>{
          //debugger;
          console.log(err);
          //debugger;
          
          this.status=false;
          this.message = err.response.data.message;          
        });

    }
  }
}
</script>
