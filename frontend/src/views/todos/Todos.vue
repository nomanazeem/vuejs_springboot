<template>
  <div>
    <CRow>
      <CCol col="12" xl="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center"/><strong>TODO LIST</strong>

            <div class="card-header-actions">
              <CButton class="btn btn-sm btn-primary" @click="addNew"><CIcon name="cilPencil" /> Add New</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <div v-if="success" class="alert alert-success" role="alert">
              {{ success }}
            </div>

            <div class="list row">
              <div class="col-md-6">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                    v-model="searchText"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="
                        currentPage = 1;
                        getSearch();"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-inline justify-content-sm-end">
                  <label class="mr-2">Items per Page:</label>
                  <select
                    class="form-control"
                    v-model="pageSize"
                    @change="handlePageSizeChange($event)"
                  >
                    <option v-for="size in pageSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <hr/>
            <div class="list row">
              <div class="col-md-12">
                <table class="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="70%" @click="sortBy='name'; arrowUpDown1 = sortDirection=sortDirection==1?0:1; getSearch();">Name <b-icon-arrow-up v-if="arrowUpDown1==1"></b-icon-arrow-up> <b-icon-arrow-down v-if="arrowUpDown1==0"></b-icon-arrow-down></th>
                      <th width="10%" @click="sortBy='status'; arrowUpDown2= sortDirection=sortDirection==1?0:1; getSearch();">Status <b-icon-arrow-up v-if="arrowUpDown2==1"></b-icon-arrow-up> <b-icon-arrow-down v-if="arrowUpDown2==0"></b-icon-arrow-down></th>
                      <th width="10%">Edit</th>
                      <th width="10%">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tutorials" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.status }}</td>
                      <td>
                        <router-link
                          :to="{ path: `todos/${item.id}` }"
                          class="btn btn-sm btn-primary"
                          ><CIcon name="cilPencil" /> Edit</router-link
                        >
                      </td>
                      <td>
                        <CButton
                          class="btn btn-sm btn-danger"
                          @click.prevent="deleteTodo(item.id)"
                          ><CIcon name="cilSettings" /> Delete</CButton
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="list row">
              <div class="col-md-4">
                  Showing {{start}} to {{end}} entries {{totalItems}}
              </div>
              <div class="col-md-8">

                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalItems"
                  :per-page="pageSize"
                  prev-text="Prev"
                  next-text="Next"
                  @change="handlePageChange"
                ></b-pagination> 
              </div>
            </div>

            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import http from "../../http-common";
import { freeSet } from "@coreui/icons";

export default {
  name: "Todos",
  icons: { freeSet },
  data() {
    return {
     
      error: "",
      success: "",

      tutorials: [],
      
      sortBy:"id_todo",
      sortDirection:1,
      arrowUpDown1:1,
      arrowUpDown2:1,

      searchText: "",
      

      totalItems: 0,
      totalPages: 0,
      currentPage: 1,

      start:0,
      end:0,

      pageSize: 3,
      pageSizes: [3, 6, 9],
    };
  },

  mounted() {
    this.getSearch();
  },

  methods: {
    deleteTodo(id) {
      if (confirm("Are you sure want to delete?")) {
        http({ url: "/todo/delete/" + id, methods: "GET" })
          .then((resp) => {
            //console.log(resp.data);

            this.success = resp.data.message;
            this.getList();
          })
          .catch((err) => {
            this.error = err.data.message;
          });
      }
    },
    addNew() {
      this.$router.push("todos/add");
    },
   
    getSearch() {
      console.log('sort direction='+this.sortDirection);
      http({
        url:
          "/todo/search?query="+this.searchText+"&page="+(this.currentPage)+"&pageSize="+ this.pageSize +"&sortBy="+ this.sortBy +"&sortDirection="+this.sortDirection,
        methods: "GET",
      }).then((resp) => {
        console.log(resp.data);
        //alert('dd');
        this.tutorials = resp.data.data;

        this.totalItems = resp.data.totalItems;
        this.totalPages = resp.data.totalPages;
        this.currentPage = resp.data.currentPage;

        var pg = this.currentPage -1;
        this.start = (pg * this.pageSize)+1;
        this.end = ((pg) * this.pageSize) + parseInt(this.pageSize);
        this.end = this.end>this.totalItems? this.totalItems:this.end;

      });
    },
    handlePageChange(value) {
      //alert(value);
      this.currentPage = value;

      this.$router.push({ query: { page: value } });
      this.getSearch();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.currentPage = 1;
      this.getSearch();
    },
    refreshList() {
      this.getSearch();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
   
  },
};
</script>
