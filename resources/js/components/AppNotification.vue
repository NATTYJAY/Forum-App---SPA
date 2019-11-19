<template>
    <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn icon slot="activator">
            <v-icon :color="color">add_alert</v-icon>{{unreadCount}}
        </v-btn>
      <v-list>
        <v-list-tile v-for="item in unread" :key="item.id">
            <v-list-tile-title @click="readIt(item)">{{item.question}}</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile >
          <v-list-tile-title></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
    data(){
        return {
            read : {},
            unread : {},
            unreadCount :0
        }
    },
    created(){
        if(User.loggedIn()){
            this.getNotifications();
        }
        Echo.private('App.User.' + User.id())
            .notification((notification) => {
                this.unread.unshift(notification)
                this.unreadCount++
        });
    },
    methods:{
        getNotifications(){
            axios.post('/api/notification')
            .then(res =>{
                //console.log(res.data);
                 this.read = res.data.read
                 this.unread = res.data.unread
                 this.unreadCount = res.data.unread.length
            })
        }
    }
}

</script>

<style>
</style>
