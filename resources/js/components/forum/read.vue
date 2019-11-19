<template>
    <div  v-if="questions">
        <edit-question
                v-if="editing"
                :data = questions
        >
        </edit-question>
        <show-question
                v-else
                :data = questions
        >
        </show-question>
        <v-container>
            <replies :question="questions"></replies>
            <new-reply v-if="loggedIn" :questionSlug="questions.slug"></new-reply>
               
            <div class="mt-4" v-else >
            <router-link to="/login">Login in to Reply</router-link>
            </div>
        </v-container>

    </div>
</template>

<script>
    import showQuestion from './showQuestion'
    import EditQuestion from './editQuestion'
    import Replies from '../reply/replies'
    import NewReply from '../reply/newReply'
    export default {
        data(){
            return{
                questions:null,
                editing:false
            }
        },
        computed:{
            loggedIn(){
                return User.loggedIn();
            }
        },
        components:{
            showQuestion,
            EditQuestion,
            Replies,
            NewReply
        },
       created(){
            EventBus.$on('startEditing', ()=>{
                this.editing = true;
            });
           EventBus.$on('cancelEditing', ()=>{
               this.editing = false;
           });
           axios.get(`/api/question/${this.$route.params.slug}`)
               .then(res=>this.questions = res.data.data)
       }
    }
</script>

<style scoped>

</style>