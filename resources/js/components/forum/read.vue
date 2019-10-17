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
            <new-reply :questionSlug="questions.slug"></new-reply>
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
        components:{showQuestion,EditQuestion,Replies,NewReply},
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