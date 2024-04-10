<template>
  <div class="box">
    <div class="header-page">
      <div class="header-main">PENTHOUSE FINANCE. MONTHLY PAYMENTS</div>
      <div class="cashbox">
        <div>
          <div class="list-item-left">on the Date: {{this.cashbox.date}} </div> 
          <div class="list-item-left" style="font-weight: bold;">Input:  {{this.cashbox.total}} Lek </div>
        </div>
      
      </div>
      <div class="cashbox-post">
        <div class="list-item list-item-frame">{{cashbox.elevator}}</div>
        <div class="list-item list-item-frame">elevator</div>
        <div class="list-item list-item-frame">{{this.currentCashBox.elevator}}</div>
      </div>
      <div class="cashbox-post">
        <div class="list-item list-item-frame">{{cashbox.electricity}}</div>
        <div class="list-item list-item-frame">electricity</div>
        <div class="list-item list-item-frame">{{this.currentCashBox.electricity}}</div>
      </div>  
      <div class="cashbox-post">
        <div class="list-item list-item-frame">{{cashbox.pump}}</div>
        <div class="list-item list-item-frame">pump</div>
        <div class="list-item list-item-frame">{{this.currentCashBox.pump}}</div>
      </div>
      <div>
      <div class="cashbox">
        <div></div>
        <div>
          <div class="list-item-right" style="font-weight: bold">Remaning:  {{ this.currentCashBox.totalRemain }} Lek </div>
          <div class="list-item-right">on the Date: {{this.currentCashBox.date.slice(4, 24)}} </div>
          
        </div>
        
      </div>
      </div>     
    </div>
    <div class="header-table"> 
      <div class="list-item list-item-header-frame">Date</div>
      <div class="list-item list-item-header-frame">Description</div>
      <div class="list-item list-item-header-frame">Payment per month</div>
    </div>
    <div class="post" v-for="post in payments">
      <div class="list-item">{{ post.date }}</div>
      <div class="list-item list-item-description">{{ post.description }}</div>
      <div class="list-item">{{ post.payment }} Lek</div>
    </div>

    <my-button
    @click="selectToTable('elevator')"
    >Elevator</my-button>
    <my-button
    @click="selectToTable('electricity')"
    >Electricity</my-button>
    <my-button
    @click="selectToTable('pump')"
    >Pump</my-button>
    <button
    class="btns" style="color:black"
    v-bind:style="{background: 'lightblue'}"
    @click="getDataPage()"
    >Get all data</button>
  </div>
</template>

<script>
import axios from 'axios';
import {getPayments} from "../http/userAPI";

  export default {
    data() {
      return {
        httpPoint: process.env.VUE_APP_API_URL,
        posts: [],
        payments: [],
        cashbox: {date: 'Oct 04 2023',
          elevator: 8000,
          electricity: 3000,
          pump: 3000,
          total: 14000,
          
        },
        currentCashBox: {date: Date(),
          elevator: 0,
          electricity: 0,
          pump: 0,
          totalRemain: 0,
        }
      }
    },

    methods: {
      async getDataPage()
      {
        await this.fetchPosts();
        await this.totalRemain();
      },

      async fetchPosts() {
        this.payments = [];
        this.payments = await getPayments();
      },

      totalRemain() {
        const paymentArr = this.payments.map((el)  => {
          return el.payment;
        })
        
        const totalPay = paymentArr.reduce((currentSum, currentNum) => {
          return Number(currentSum) + Number(currentNum);
        });
        this.currentCashBox.totalRemain = this.cashbox.total - totalPay;
      
        this.currentCashBox.elevator=this.getSelectSum('elevator');
        this.currentCashBox.electricity=this.getSelectSum('electricity');
        this.currentCashBox.pump=this.getSelectSum('pump');
      },

      selectPayments(feature) {
        const selectPaymentArray = this.payments.filter( payment => {
          if(payment.description === feature) {
            return true;
          }
        });
        return selectPaymentArray;
      },

      getSelectSum(feature) {
        const selectPaymentArr = this.selectPayments(feature);
        
        let sumSelectPayment = 0;
        selectPaymentArr.forEach(el => {
          sumSelectPayment = sumSelectPayment + Number(el.payment);
        });
        
        return sumSelectPayment;
      },

      async selectToTable(feature) {
        await this.fetchPosts();
        this.payments=await this.selectPayments(feature);
      }
    },
    mounted() {
      this.getDataPage();
    }
  }
</script>

<style scoped>
.header-main {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  margin-bottom: 15px;
  margin-top: 15px;
  
}
.box {
  margin: 5px 300px;
  display: block;
  text-align: right;
}


.list-item {
  text-decoration: none;
  text-align: center;
}

.list-item-right {
  text-decoration: none;
  text-align: right;
  margin-right: 9px;
  margin-bottom: 7px;
  margin-top: 2px;
}

.list-item-left {
  text-decoration: none;
  text-align: left;
  margin-left: 9px;
  margin-top: 7px;
  margin-bottom: 2px;
}

.list-item-description {
  text-align: right !important;
}

.list-item-header-frame {
  padding: 10px 10px;
  border: 1px solid teal;
}

.list-item-frame {
  padding: 7px 7px;
  border: 1px solid teal;
}

.cashbox {
  padding: 4px;
  border: 2px solid teal;
  margin-top: 1px;
  display: grid;
  margin-top: 1.5px;
  margin-bottom: 1.5px;
  grid-template-columns: repeat(2, 1fr);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 17px;
}

.header-table {
  background-color: #9be8d3;
  padding: 2px;
  border: 1px solid teal;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 18px;
}
.post {
  padding: 9px;
  border: 2px solid teal;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font: 16px;
}

.cashbox-post {
  padding: 0px;
  margin-top: 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
}

.btns {
  margin-top: 15px;
  margin-left: 15px;
  
  padding: 10px 25px;
  background: none;
  color: teal;
  border: 1px solid teal;
  font-weight:600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
}

@media (max-width: 1000px){
  .box {
    margin: 0;
  }

  .header-table {
    font-size: 16px;
  }

}

</style>