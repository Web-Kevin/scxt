<template>
  <div class="helloworld">
    <Row type="flex">
      <Col span="12" order="1">
        <p
          class="yj"
        >{{jh}} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;冲程：&nbsp;{{cc}} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;冲次：{{cc1}}</p>
      </Col>
      <Col span="12" order="2">
        <DatePicker
          type="daterange"
          @on-change="checkDate"
          v-model="dateValue"
          :editable="false"
          format="yyyy/MM/dd"
          split-panels
          :options="options1"
          placement="bottom-end"
          placeholder="选择日期"
          style="width:260px"
        ></DatePicker>
        <span>&nbsp; &nbsp;</span>
        <Button type="primary" @click="getDataByDate">选 择</Button>
      </Col>
    </Row>
    <span
      :style="{width: '100%', height: '450px',margin: 'auto'}"
    >&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</span>
    <div id="myChart" :style="{width: '750px', height: '450px',margin: 'auto'}"></div>
    <div id="yl" :style="{width: '750px', height: '450px',margin: 'auto'}"></div>
    <div id="hs" :style="{width: '750px', height: '450px',margin: 'auto'}"></div>
    <div id="dl" :style="{width: '750px', height: '450px',margin: 'auto'}"></div>
    <div id="hy" :style="{width: '750px', height: '450px',margin: 'auto'}"></div>
  </div>
</template>

<script>
import ecStat from "echarts-stat";
import dayjs from "dayjs";
export default {
  name: "HelloWorld",
  data() {
    return {
      jh: "", //不能不赋值，不赋值会报错
      cc: "",
      cc1: "",
      dateValue: "",
      options1: {
        shortcuts: [
          {
            text: "1 星期",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      dataName: ["产量", "油量", "含水", "电流", "回压"]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    drawLine: function(result, name, elementName) {
      // 基于准备好的dom，初始化echarts实例
      this.jh = result.jh;
      this.cc = result.cc;
      this.cc1 = result.cc1;
      let myChart = this.$echarts.init(document.getElementById(elementName));
      // 绘制图表
      let myRegression = ecStat.regression("linear", result.data);
      let temp = 0;
      for (temp of myRegression.points) {
        temp[1] = temp[1].toFixed(2); //修正曲线斜率
      }
      myRegression.points.sort(function(a, b) {
        return a[0] - b[0];
      });

      let option = {
        title: {
          text: result.jh + " " + name + "曲线图", //名称
          // subtext: "By ecStat.regression",
          // sublink: "https://github.com/ecomfe/echarts-stat",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          type: "value",
          name: "天数",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: "value",
          name: name,
          min: 1.5,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: name,
            type: "scatter",
            label: {
              emphasis: {
                show: true,
                position: "left",
                textStyle: {
                  color: "blue",
                  fontSize: 16
                }
              }
            },
            data: result.data //这个地方注意也要更改
          },
          {
            name: "曲线数值",
            type: "line",
            showSymbol: false,
            data: myRegression.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: "transparent"
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "left",
                  formatter: myRegression.expression,
                  textStyle: {
                    color: "#333",
                    fontSize: 14
                  }
                }
              },
              data: [
                {
                  coord: myRegression.points[myRegression.points.length - 1]
                }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    checkDate(daterange) {
      let date1 = daterange[0];
      let date2 = daterange[1];
      if (dayjs(date1).isBefore(dayjs("2011/1/2"))) {
        this.$Message.error("日期选择不能小于2011");
        this.dateValue = "";
      }
      if (dayjs().isBefore(dayjs(date2))) {
        this.$Message.error("日期选择不能超过当天");
        this.dateValue = "";
      }
      this.dateValue = daterange;
    },
    getData: async function() {
      let result = {};
      await this.axios
        .get("http://192.168.1.111:3000/yj/?jh=锦2-14-001C")
        .then(response => {
          result = response.data; //获取data数据
        });
      this.drawLine(result, "产量", "myChart");
    },
    getDataByDate: async function() {
      let result = {};
      await this.axios
        .get(
          "http://192.168.1.111:3000/yj/getDataByDate/?date1=" +
            this.dateValue[0] +
            "&date2=" +
            this.dateValue[1] +
            "&jh=" +
            this.jh
        )
        .then(response => {
          result = response.data; //获取data数据
        });

      this.drawLine(result, "产量", "myChart");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yj {
  color: rgb(87, 129, 206);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 18px;
  padding-left: 0px;
}
.helloworld {
  height: 100%;
}
</style>
