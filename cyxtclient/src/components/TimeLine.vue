<template>
  <div class="TimeLine">
    <Timeline>
      <TimelineItem v-for="(i,index) of list" :key="index">
        <p class="time">{{i[0]}}</p>
        <p class="content">{{i[1]}}</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getTimeLine();
  },
  methods: {
    getTimeLine: async function() {
      let temp = [];
      await this.axios
        .get("http://192.168.1.111:3000/yj/getTl?jh=锦2-14-001C")
        .then(function(response) {
          temp = response.data; //获取data数据
        });
      // console.log(temp);
      this.list = temp;
    }
  }
};
</script>

<style scoped>
.TimeLine {
  margin-left: 10%;
}
.time {
  font-size: 14px;
  font-weight: bold;
  padding-right: 60px;
  padding-left: 20px;
}
.content {
  padding-left: 5px;
  padding-right: 60px;
}
</style>