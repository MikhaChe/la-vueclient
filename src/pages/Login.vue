<template>
  <div class="box">
    <div class="header-page">
      <div class="header-main">liveAlbania</div>
      <div class="header-small-main">welcome to login page</div>
      <my-input
        v-model="user.username"
        type="text"
        placeholder="username"
      />
      <my-input
        v-model="user.password"
        type="password"
        placeholder="password"
      />
      <my-button
        @click="loginUser"
      >
        Login
      </my-button>
    </div>
    <!-- <div style="text-align: left;" class="header-page">
      <div><strong>UserName:</strong> {{ user.email}}</div>
      <div><strong>Password:</strong> {{ user.password}}</div>
    </div> -->
  </div>
</template>

<script>
import {login, registration} from "../http/userAPI";

  export default {
    data() {
      return {
        httpPoint: process.env.VUE_APP_API_URL,
        user: {
          username: '',
          password: '',
        }
      }
  },
  methods: {
    async loginUser() {
      let data;
        try {
          data = await login(this.user);
          if(data.username === 'spritz.orange') {
            this.$router.push('/phouse-payments');
          } else {
            alert("Redirect to a friendly Telegram group :) ");
          }
        } catch (e) {
          alert(JSON.stringify(e.response.data.message));
        }
      },
  }
    
  }
</script>

<style scope>
.header-main {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  margin-bottom: 15px;
  margin-top: 15px;
}

.header-small-main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    margin-bottom: 15px;
    margin-top: 15px;
  
}
.box {
  margin: 5px 300px;
  display: block;
  text-align: right;
}
</style>