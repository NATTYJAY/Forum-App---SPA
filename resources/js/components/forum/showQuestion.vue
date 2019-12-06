<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{data.title}}
                    </div>
                    <span class="grey--text">{{data.user}} posted {{data.created_at}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{reply_count}} Replies</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

            <v-card-actions v-if="own">
                <v-btn @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>

    export default {
        props:['data'],
        data(){
            return{
                own: User.own(this.data.user_id),
                reply_count: this.data.reply_count
            }
        },
        created(){
            EventBus.$on('newReply',()=>{
                this.reply_count++;
            });
            Echo.channel('deleteReply')
                .listen('deleteReply', (e) => {
                    for(let index = 0; index<this.content.length; index++){
                        if(this.content[index].id == e.id){
                             this.content.splice(index,1)
                        }
                    }
                });
            Echo.private('App.User.' + User.id())
                .notification((notification) => {
                   this.reply_count++;
            });
            EventBus.$on('deleteReply',()=>{
                this.reply_count--;
            });
            Echo.channel('deleteReplyChannel')
                .listen('DeleteReplyEvent', (e) => {
                    this.reply_count--;
            });
        },
        computed:{
            body(){
                return md.parse(this.data.body)
            }
        },
        methods:{
            destroy(){
                axios.delete(`/api/question/${this.data.slug}`)
                    .then(res => this.$router.push('/forum'))
                    .catch(error => console.log(error.response.data))
            },
            edit(){
                EventBus.$emit('startEditing')
            }
        },
        
    }
</script>

<style scoped>

</style>