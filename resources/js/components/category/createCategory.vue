<template>
    <v-container>
         <category-modal message="Are you sure you want to delete"></category-modal>
        <error-alert v-bind:message="errorMessage" ref="erorrAlert"></error-alert>
         <div class="loader" v-if="loading"></div>
        <v-form @submit.prevent="submit">
            <span class="red--text"></span>
            <v-text-field
                    label="Title"
                    v-model="form.name"
                    type="text"
                    required
            ></v-text-field>
            <v-btn type="submit" color="pink" v-if="editSlug" :disabled="disabled">Update</v-btn>
            <v-btn type="submit" color="teal" v-else :disabled="disabled">Create</v-btn>
            <br><br>

        </v-form>
        <v-card>
            <v-toolbar color="indigo" dark dense>
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>
        <v-list>
            <div v-for="(category,index) in categories" :key="category.id">
                <v-list-tile>

                    <v-list-tile-action >
                        <v-btn @click="edit(index)">
                            <v-icon color="orange">edit </v-icon>
                        </v-btn>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>
                             {{category.name}}
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                       <!-- <p> </p> -->
                        <v-btn @click="destroy(category.slug,index)">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
            </div>
        </v-list>
        </v-card>
       
    </v-container>
</template>

<script>
 import ErrorAlert from '../Alerts/errorAlerts';
 import CategoryModal from '../Modals/categoryModal'
    export default {
        data(){
            return{
                form :{
                    name:null
                },
                categories:{},
                editSlug:null,
                errorMessage:'',
                loading:0,
               
            }
        },
        components:{ErrorAlert,CategoryModal},
        computed:{
            disabled(){
                return !(this.form.name);
            }
        },
        created(){
            if(!User.admin()){
                this.$router.push('/forum')
            }
            axios.get('/api/category')
                .then(res => this.categories = res.data.data)
        },
        methods:{
            submit(){
               this.editSlug ? this.update():this.create();
            },
            handleActionButton(){

            },
            update() {
                axios.patch(`/api/category/${this.editSlug}`, this.form).then(res => {
                    this.categories.unshift(res.data);
                    this.form.name = null;
                });
            },
            create(){
                this.loading = 1;
                axios.post('/api/category',this.form)
                    .then(res=>{
                        this.loading = 0;
                        this.categories.unshift(res.data);
                        this.form.name = null;
                    }).catch((error)=> {
                          this.loading = 0;
                          this.errorMessage = error.response.data.errors.name[0];
                          this.$refs.erorrAlert.showAlert();
                    });
            },
            destroy(slug, index) {
                axios.delete(`/api/category/${slug}`)
                    .then(res => this.categories.splice(index, 1));
            },
            confirmDeleteModal(slug,index){
                //this.$emit('button_clicked');
                //this.modalOpen = !this.modalOpen;
               // console.log(slug,index);
                //this.selectedUser = slug;
			//this.confirmModal = true;
            //     let modal =  M.Modal.getInstance(document.getElementById('edit-batch-modal'));
            //     modal.options.onCloseStart = ()=>{
            //         //this.getBatches();
            //         //console.log("rejoice")
            //     };
            //   modal.open();
                //this.$refs.categoryModel.showCategoryModal();
            },
            
            edit(index){
                this.form.name = this.categories[index].name;
                this.editSlug = this.categories[index].slug;
                this.categories.splice(index,1);
            }
        }
    }
</script>

<style scoped>
   .loader {
  border: 16px solid #f3f3f3;
  float: right;
  border-radius: 50%;
  border-top: 16px solid blue;
  border-right: 16px solid green;
  border-bottom: 16px solid red;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>