<template>
  <div class="home">
    <!-- 账户信息 -->
    <div class="accountInfo">
      <div class="acoountBal">
        <div class="balance clearfix">
          <div class="leftLine fl"></div>
          <div class="balTitle fl">
            {{ $t("localization.HAccountBalance") }}
          </div>
          <div class="money fl">&yen;{{ balance }}</div>
        </div>
      </div>
      <div class="card-info">
        <div class="total">
          <div class="title">
            <span>{{ $t("localization.CardTotal") }}</span>
            <Tip content="" />
          </div>
          <div class="num">
            {{ cardStat.cardsCount }}
          </div>
        </div>
        <div class="testDate">
          <div class="title">
            <span>{{ $t("localization.TestPeriod") }}</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.testCardsCount }}</div>
        </div>
        <div class="silence">
          <div class="title">
            <span>沉默期</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.silentCardsCount }}</div>
        </div>
        <div class="activate">
          <div class="title">
            <span>{{ $t("localization.Active") }}</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.activeCardsCount }}</div>
        </div>
        <div class="machineHalt">
          <div class="title">
            <span>{{ $t("localization.OverStop") }}</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.excessCardsCount }}</div>
        </div>
        <div class="dueDate">
          <div class="title">
            <span>{{ $t("localization.ExpirationStop") }}</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.expireCardsCount }}</div>
        </div>
        <div class="others">
          <div class="title">
            <span>其他</span>
            <Tip content="" />
          </div>
          <div class="num">{{ cardStat.otherCardsCount }}</div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="echartsAll" v-if="flowPool">
      <div class="top clearfix">
        <!-- 快速销售 -->
        <div class="sales fl">
          <div class="title clearfix">
            <div class="title-prefix titleWarm fl">
              {{ $t("localization.HFastSell") }}
            </div>
          </div>
          <div class="clients">
            <div class="client_t">
              {{ $t("localization.TargetClient")
              }}<span style="color: #ff0000;">*</span>
            </div>
            <div class="client_s">
              <client-name
                v-model="client"
                @nodeChange="getClientVal"
              ></client-name>
            </div>
          </div>
          <div class="cardnum">
            <div class="cardnum_t">
              添加卡号<span style="color: #ff0000;">*</span>
            </div>
            <div class="cardnum_s clearfix">
              <div class="shuru fl">
                <swd-input
                  :value="packPrice1"
                  placeholder=""
                  :width="365"
                ></swd-input>
              </div>
              <div class="batch fl">{{ $t("localization.HBatchSell") }}</div>
              <div class="running fl" @click="serialSale">
                {{ $t("localization.HConsecutiveSell") }}
              </div>
              <div class="number fr">
                {{ $t("localization.Currently") }}：20{{
                  $t("localization.item")
                }}
              </div>
            </div>
          </div>
          <div class="saleTable">
            <swd-table
              :more="false"
              :table="tableAll"
              :tableData="tableData"
              :tableLabel="quickSellLabel"
              :maxHeight="170"
              :total="total"
            >
              <template slot="handle">
                <div class="handle" @click="goDelete(props.row)">
                  {{ $t("localization.Delete") }}
                </div>
              </template>
            </swd-table>
          </div>
          <div class="btnArr clearfix">
            <div class="confirm fl pointer">
              {{ $t("localization.Sell") }}
            </div>
            <div class="refresh fl pointer">
              {{ $t("localization.Refresh") }}
            </div>
          </div>
        </div>
        <!-- sim卡柱状图 -->
        <div class="bar-chart fr">
          <div class="title clearfix">
            <div class="title-prefix titleWarm fl">
              {{ $t("localization.SIMcardalarm") }}
            </div>
          </div>
          <div class="barEcharts">
            <Charts
              id="barEcharts"
              className="echartStatus"
              :styles="{ width: '450px', height: '375px' }"
              :items="barOptions"
            ></Charts>
          </div>
        </div>
      </div>
      <div class="bottom clearfix">
        <!-- 月流量 -->
        <div class="userflow fl">
          <div class="title clearfix">
            <div class="title-prefix titleWarm fl">
              {{ $t("localization.MonthlyUsed")
              }}<Tip :content="$t('localization.Top10')" color="#4E83FD" />
            </div>
          </div>
          <div>
            <swd-table
              :table="tableAll"
              :tableData="tableData"
              :tableLabel="tableLabel"
              :total="total"
              :more="false"
              @handleSelectionChange="handleSelectionChange"
              @handleCurrentChange="handleCurrentChange"
            ></swd-table>
          </div>
        </div>
        <!-- 流量折线图 -->
        <div class="line-chart fr">
          <div class="title clearfix">
            <div class="title-prefix titleWarm fl">
              {{ $t("localization.DateTrendChart") }}
            </div>
          </div>
          <div class="line-chart-btn">
            <span
              :class="['range-change', timeRange === 7 ? 'selected' : '']"
              @click="changeLineChart(7)"
              >{{ $t("localization.Week") }}</span
            >
            <span
              :class="['range-change', timeRange === 30 ? 'selected' : '']"
              @click="changeLineChart(30)"
              >{{ $t("localization.AboutOneMonth") }}</span
            >
          </div>
          <div class="line-chart__body">
            <Charts
              id="lineChart"
              className="echartStatus"
              :styles="{ width: '700px', height: '375px' }"
              :items="lineChartOpt"
            ></Charts>
          </div>
        </div>
      </div>
      <div class="circle">
        <div class="lineChart">
          <!-- 饼图 -->
          <div class="title clearfix">
            <div class="title-prefix titleWarm fl">流量池</div>
          </div>
          <div class="lineChart_l clearfix">
            <div class="fl">
              <Charts
                id="lineEcharts"
                className="echartStatus"
                :styles="{ width: '700px', height: '300px' }"
                :items="pieOptions"
              ></Charts>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="serial-sale">
      <SerialSale
        :show="showSerialSale"
        @cancel="showSerialSale = falsef"
      ></SerialSale>
    </div>
  </div>
</template>
<script>
import Charts from "../../components/echarts/Charts";
import swdTable from "../../components/swdTable/swdTable1";
import searchPanel from "../../components/searchPanel/searchPanel";
import swdInput from "../../components/form/swdInput";
import Tip from "../../components/tip/Tip";
import SerialSale from "../../components/salePop/SerialSale";
import clientName from "../../components/form/clientName";
export default {
  components: {
    Charts,
    swdTable,
    searchPanel,
    swdInput,
    clientName,
    SerialSale,
    Tip,
  },
  data() {
    return {
      userId: null,
      client: "",
      packPrice1: "",
      balance: "",
      flowPool: true,
      cardStat: {
        cardsCount:null,
        testCardsCount:null,
        silentCardsCount:null,
        activeCardsCount:null,
        excessCardsCount:null,
        expireCardsCount:null,
        otherCardsCount:null
      },
      barOptions: {},
      pieOptions: {},
      lineOptions1: {},
      lineChartOpt: {},
      showSerialSale: false,
      tableAll: {
        select: false,
        handle: false,
      },
      tableData: [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }],
      total: null, //总条数
      tableLabel: [
        {
          prop: "id",
          title: this.$t("localization.SerialNo"),
          width: "150",
          type: "index",
        },
        { prop: "cardNo", title: "ICCID" },
        { prop: "corresponding", title: "MSISDN" },
        { prop: "nickname", title: "使用量（MB）" },
      ],
      quickSellLabel: [
        {
          prop: "id",
          title: this.$t("localization.SerialNo"),
          width: "150",
          type: "index",
        },
        { prop: "", title: "设备号（IMEI）" },
        { prop: "", title: this.$t("localization.BelongsCustomer") },
        {
          prop: "handle",
          title: this.$t("localization.Operation"),
          slot: true,
        },
      ],
      timeRange: 7,
    };
  },
  created() {},
  mounted() {
    var that = this;
    this.goStatus();
    this.goStatus1();
    this.goBar();
    this.goLine();
    this.getInfo();
  },
  methods: {
    //测试方法
    goSearch(info) {},
    getInfo() {
      this.getUserInfo().then((res) => {
        if (res.code === "200") {
          this.balance = res.data.balanceAmount;
          this.userId = res.data.id;
          this.$cookie.set('userId', this.userId)
          this.getStat();
        }
      });
    },
    getUserInfo() {
      let url = "/user/getUserInfo.do";
      return this.$client.get(url);
    },
    getStat() {
      let url = "/statistics/queryCardsStatistics.do";
      let params = {
        userId: this.userId,
      };
      this.$client.get(url, params).then((res) => {
        if (res.code === "200") {
          Object.assign(this.cardStat, res.data);
        }
      });
    },
    serialSale() {
      this.showSerialSale = true;
    },
    //表格子组件选择框触发方法
    handleSelectionChange(obj) {},
    //分页按钮触发方法
    handleCurrentChange(obj) {},
    //柱状图
    goBar() {
      var that = this;
      that.barOptions = {
        // ----  标题 -----
        title: {
          show: false,
        },
        // ---- legend ----
        legend: {
          type: "plain", // 图列类型，默认为 'plain'
          top: "top", // 图列相对容器的位置 top\bottom\left\right
          selected: {
            // '销量': true  // 图列选择，图形加载出来会显示选择的图列，默认为true
          },
          textStyle: {
            // 图列内容样式
            color: "#fff", // 字体颜色
            backgroundColor: "black", // 字体背景色
          },
          tooltip: {
            // 图列提示框，默认不显示
            show: true,
            color: "red",
          },
          data: [],
        },
        // ---  提示框 ----
        tooltip: {
          show: false, // 是否显示提示框，默认为true
        },
        // ---- gird区域 ---
        gird: {
          show: false, // 是否显示直角坐标系网格
        },
        //  ------  X轴 ------
        xAxis: {
          show: true, // 是否显示
          position: "bottom", // x轴的位置
          offset: 0, // x轴相对于默认位置的偏移
          type: "category", // 轴类型， 默认为 'category'
          name: "", // 轴名称
          nameLocation: "", // 轴名称相对位置
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#999999",
            padding: [5, 0, 0, -5],
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          nameRotate: 0, // 坐标轴名字旋转
          axisLine: {
            // 坐标轴轴线
            show: true, // 是否显示
            symbol: ["none", "none"], // 是否显示轴线箭头
            lineStyle: {
              color: "#999999",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            // 坐标轴 刻度
            show: false, // 是否显示
          },
          axisLabel: {
            // 坐标轴标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 5, // 刻度标签与轴线之间的距离
            color: "#666666", // 默认取轴线的颜色
          },
          splitLine: {
            // gird区域中的分割线
            show: false, // 是否显示
            lineStyle: {},
          },
          splitArea: {
            // 网格区域
            show: false, // 是否显示，默认为false
          },
          data: [
            this.$t("localization.Flow"),
            this.$t("localization.SMS"),
            this.$t("localization.OverStop"),
            this.$t("localization.ExpirationStop"),
          ],
        },
        //   ------   y轴  ----------
        yAxis: {
          show: true, // 是否显示
          position: "left", // y轴位置
          offset: 0, // y轴相对于默认位置的偏移
          type: "value", // 轴类型，默认为 ‘category’
          name: "销量", // 轴名称
          nameLocation: "end", // 轴名称相对位置value
          max: 800,
          splitNumber: 4,
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, 5], // 坐标轴名称相对位置
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          nameRotate: 270, // 坐标轴名字旋转
          axisLine: {
            // 坐标轴 轴线
            show: false, // 是否显示
          },
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示
          },
          axisLabel: {
            // 坐标轴的标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 8, // 刻度标签与轴线之间的距离
            color: "#666666", // 默认轴线的颜色
          },
          splitLine: {
            // gird 区域中的分割线
            show: true, // 是否显示
            lineStyle: {
              color: "#ECECEC",
              width: 1,
              type: "dashed",
            },
          },
          splitArea: {
            // 网格区域
            show: false, // 是否显示，默认为false
          },
        },
        //  -------   内容数据 -------
        series: [
          {
            name: "销量", // 序列名称
            type: "bar", // 类型
            legendHoverLink: true, // 是否启用图列 hover 时的联动高亮
            label: {
              // 图形上的文本标签
              show: false,
              position: "insideTop", // 相对位置
              rotate: 0, // 旋转角度
              color: "#eee",
            },
            itemStyle: {
              // 图形的形状
              normal: {
                color: function (params) {
                  var colorList = ["#39C829", "#00B4FF", "#FF4040", "#FB7823"];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: function (params) {
                      var colorList = [
                        "#39C829",
                        "#00B4FF",
                        "#FF4040",
                        "#FB7823",
                      ];
                      return colorList[params++];
                    },
                    fontSize: 16,
                  },
                },
                shadowBlur: 6,
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowOffsetX: 4,
                shadowOffsetY: 0.5,
              },
            },
            barWidth: 29, // 柱形的宽度
            barCategoryGap: "20%", // 柱形的间距
            data: [650, 465, 130, 580],
          },
        ],
      };
    },
    //饼图
    goStatus() {
      var that = this;
      that.pieOptions = {
        //标题设置参数
        title: {
          show: true,
        },
        //鼠标hover提示设置
        tooltip: {
          show: true,
          trigger: "item",
          formatter: () => {
            return "<div style='font-size:13px;padding:15px;'>池子编号：20200720252<br/>套餐类型：30MB<br/>成员总数：1000<br/>池子总量：10000MB<br/>本月剩余：2500MB</div>";
          },
        },
        //图列设置
        legend: {
          show: true,
          right: 0,
          top: "45%",
          orient: "vertical",
          borderRadius: 10,
        },
        //设置饼状图每个颜色块的颜色
        color: ["#39C829", "#4292F6"],
        series: [
          {
            name: "池子1",
            type: "pie",
            hoverAnimation: false,
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["0%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["20%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 200, name: this.$t("localization.PoolTotal") },
              { value: 600, name: "本月剩余" },
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：鼠标hover上去的效果展示
              normal: {
                shadowBlur: 10,
                shadowColor: "rgba(66,146,246,0.5)",
                shadowOffsetX: 5,
                shadowOffsetY: 2,
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "rgba(66,146,246,0.5)",
                shadowOffsetX: 5,
                shadowOffsetY: 2,
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
              },
            },
            // 设置圆环值域的显示
            label: {
              normal: {
                position: "inner", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                formatter: "{d}%",
              },
            },
          },
          {
            name: "池子1",
            type: "pie",
            hoverAnimation: false,
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["0%", "70%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["60%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 200, name: this.$t("localization.PoolTotal") },
              { value: 600, name: "本月剩余" },
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：鼠标hover上去的效果展示
              normal: {
                shadowBlur: 10,
                shadowColor: "rgba(66,146,246,0.5)",
                shadowOffsetX: 5,
                shadowOffsetY: 2,
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "rgba(66,146,246,0.5)",
                shadowOffsetX: 5,
                shadowOffsetY: 2,
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
              },
            },
            // 设置圆环值域的显示
            label: {
              normal: {
                position: "inner", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                formatter: "{d}%",
              },
            },
          },
        ],
      };
    },
    goStatus1() {
      var that = this;
      that.lineOptions1 = {
        //标题设置参数
        title: {
          show: false,
        },
        //鼠标hover提示设置
        tooltip: {
          show: false,
        },
        //图列设置
        legend: {
          show: false,
        },
        //设置饼状图每个颜色块的颜色
        color: ["#39C829", "#4292F6"],
        series: [
          {
            name: "",
            type: "pie",
            hoverAnimation: false,
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ["0%", "100%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "50%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 200, name: this.$t("localization.PoolTotal") },
              { value: 600, name: "本月剩余" },
            ],
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：鼠标hover上去的效果展示
              emphasis: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: "rgba(30, 144, 255，0.5)",
              },
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
              },
            },
            // 设置圆环值域的显示
            label: {
              normal: {
                position: "inner", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                formatter: "{d}%",
              },
            },
          },
        ],
      };
    },
    //折线图
    goLine() {
      this.lineChartOpt = {
        legend: {
          show: false,
        },
        xAxis: {
          type: "category",
          data: ["4/23", "4/24", "4/25", "4/26", "4/27", "4/28", "4/29"], // x轴数据
          axisLine: {
            // 坐标轴轴线
            show: true, // 是否显示
            symbol: ["none", "none"], // 是否显示轴线箭头
            lineStyle: {
              color: "#999999",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            // 坐标轴 刻度
            show: true, // 是否显示
            length: 4,
            //interval:1000
          },
          //boundaryGap:["20%","20%"],
          boundaryGap: false,
          axisLabel: {
            // 坐标轴标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 10, // 刻度标签与轴线之间的距离
            color: "#666666", // 默认取轴线的颜色
          },
          splitLine: {
            // gird区域中的分割线
            show: false, // 是否显示
            lineStyle: {},
          },
          splitArea: {
            // 网格区域
            show: false, // 是否显示，默认为false
          },
          name: "", // x轴名称
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18,
          },
          axisPointer: {
            show: true,
            label: {
              show: false,
            },
            lineStyle: {
              color: "#A2A7AE",
              width: 2,
              type: "dashed",
            },
            triggerTooltip: false,
          },
        },
        yAxis: {
          show: true, // 是否显示
          position: "left", // y轴位置
          offset: 0, // y轴相对于默认位置的偏移
          type: "value", // 轴类型，默认为 ‘category’
          name: "销量", // 轴名称
          nameLocation: "end", // 轴名称相对位置value
          max: 3,
          splitNumber: 6,
          nameTextStyle: {
            // 坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, 5], // 坐标轴名称相对位置
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          nameRotate: 270, // 坐标轴名字旋转
          axisLine: {
            // 坐标轴 轴线
            show: false, // 是否显示
          },
          axisTick: {
            // 坐标轴的刻度
            show: false, // 是否显示
          },
          axisLabel: {
            // 坐标轴的标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 8, // 刻度标签与轴线之间的距离
            color: "#666666", // 默认轴线的颜色
          },
          splitLine: {
            // gird 区域中的分割线
            show: true, // 是否显示
            lineStyle: {
              color: "#ECECEC",
              width: 1,
              type: "dashed",
            },
          },
          splitArea: {
            // 网格区域
            show: false, // 是否显示，默认为false
          },
        },
        label: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "#fff",
          textStyle: {
            color: "#555555",
            fontSize: "13px",
          },
          position: function ([x, y]) {
            var newY = y - 70;
            var newX = x - 30;
            return [newX, newY];
          },
          formatter: (params) => {
            return `<div style="font-size:13px;text-align:center">${
              params.name
            }</div><div style="font-size:13px;">${this.$t(
              "localization.Data"
            )}：${params.value}</div>`;
          },
          extraCssText:
            "padding:15px;box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.15)",
        },
        color: "#39C829",
        series: [
          {
            name: "",
            data: [1, 1, 1, 1, 1, 2, 2],
            type: "line",
            symbol: "circle", //拐点样式
            symbolSize: 5, //拐点大小
            showAllSymbol: false,
            color: "transparent",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3, //折线宽度 //折线颜色渐变
                  color: "#39C829",
                  shadowBlur: 6,
                  shadowColor: "rgba(57, 200, 41, 0.3)",
                  shadowOffsetX: 4,
                  shadowOffsetY: 14,
                },
              },
            },
            emphasis: {
              itemStyle: {
                color: "#ccc",
              },
            },
          },
        ],
      };
    },
    // 更换折线图显示时间
    changeLineChart(range) {
      this.timeRange = range;
    },
    getClientVal(e) {
      this.client = e.nickname;
      this.userId = e.userId;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  box-sizing: border-box;
  background: #fbfbfd;
  .accountInfo {
    width: 100%;
    height: 230px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    .acoountBal {
      .balance {
        padding: 31px 0 0 32px;
        .leftLine {
          width: 4px;
          height: 20px;
          background: #409eff;
        }
        .balTitle {
          font-size: 14px;
          color: #323232;
          height: 20px;
          line-height: 20px;
          padding-left: 4px;
        }
        .money {
          font-family: Arial;
          color: rgba(255, 138, 0, 1);
          font-size: 20px;
          margin-left: 21px;
        }
      }
    }
    .card-info {
      box-sizing: border-box;
      margin-top: 46px;
      padding: 0 34px;
      width: 100%;
      height: 100px;
      display: flex;
      .info-question-icon {
        width: 15px;
        height: 15px;
        text-align: right;
        display: inline-block;
        border: 1px solid #eee;
        border-radius: 50%;
      }
      .total,
      .testDate,
      .silence,
      .activate,
      .machineHalt,
      .dueDate,
      .others {
        flex: 1;
        height: 100px;
        width: 12.6%;
        margin-right: 2%;
        border-radius: 8px;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background: linear-gradient(130deg, #fff, transparent);
          clip-path: polygon(
            nonzero,
            104px 1px,
            199px 0px,
            199px 100px,
            4px 101px
          );
          opacity: 0.2;
          transform: translateX(40%);
        }
        .title {
          padding: 18px 0 0 26px;
          span {
            font-size: 12px;
            line-height: 14px;
            color: #fff;
          }
        }
        .num {
          padding: 26px 0 0 26px;
          font-size: 24px;
          color: #fff;
        }
      }
      .total {
        background: #409eff;
      }
      .testDate {
        background: #8546f5;
      }
      .silence {
        background: #686c75;
      }
      .activate {
        background: #67c23a;
      }
      .machineHalt {
        background: #ff4040;
      }
      .dueDate {
        background: #909399;
      }
      .others {
        margin-right: 0;
        background: #fb7823;
      }
    }
  }
  .echartsAll {
    .top {
      padding-top: 16px;
      .sales {
        width: 49.5%;
        height: 540px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        box-sizing: border-box;
        padding: 30px;
        .title {
          // margin: 32px 0 10px 32px;
          .titleBar {
            width: 4px;
            height: 16px;
            background: #3370ff;
          }
          .titleWarm {
            padding-left: 4px;
            height: 16px;
            font-size: 14px;
            color: rgba(50, 50, 50, 1);
            line-height: 16px;
          }
        }
        .clients {
          padding-top: 30px;

          .client_t {
            font-size: 13px;
            line-height: 16px;
            color: #333;
            margin-bottom: 14px;
          }
        }
        .cardnum {
          padding-top: 16px;
          .cardnum_t {
            font-size: 13px;
            line-height: 16px;
            color: #333;
            margin-bottom: 14px;
          }
          .batch,
          .running {
            margin-left: 12px;
            padding: 0 16px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(222, 224, 227, 1);
            border-radius: 3px;
            line-height: 30px;
            text-align: center;
            font-size: 13px;
            color: #333;
            cursor: pointer;
          }
          .number {
            font-size: 13px;
            color: #666;
            line-height: 32px;
          }
        }
        .saleTable {
          padding-top: 22px;
        }
        .btnArr {
          padding-top: 38px;
          .confirm {
            width: 76px;
            height: 32px;
            background: rgba(51, 112, 255, 1);
            border-radius: 3px;
            line-height: 32px;
            color: #fff;
            text-align: center;
            font-size: 13px;
            margin-right: 12px;
          }
          .refresh {
            width: 76px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(222, 224, 227, 1);
            border-radius: 3px;
            line-height: 30px;
            text-align: center;
            font-size: 13px;
            color: #333;
          }
        }
      }
      .bar-chart {
        width: 49.5%;
        height: 540px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        .title {
          margin: 32px 0 10px 32px;
          .titleBar {
            width: 4px;
            height: 16px;
            background: #3370ff;
          }
          .titleWarm {
            padding-left: 4px;
            height: 16px;
            font-size: 14px;
            color: rgba(50, 50, 50, 1);
            line-height: 16px;
          }
        }
        .barEcharts {
          padding: 0 25%;
        }
      }
    }
    .bottom {
      padding-top: 16px;
      .userflow {
        width: 49.5%;
        height: 598px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        padding: 32px;
        box-sizing: border-box;
        .title {
          margin-bottom: 30px;
          .titleBar {
            width: 4px;
            height: 16px;
            background: #3370ff;
          }
          .titleWarm {
            padding-left: 4px;
            height: 16px;
            font-size: 14px;
            color: rgba(50, 50, 50, 1);
            line-height: 16px;
          }
        }
      }
      .line-chart {
        width: 49.5%;
        height: 598px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        .title {
          margin: 32px 0 10px 32px;
          .titleBar {
            width: 4px;
            height: 16px;
            background: #3370ff;
          }
          .titleWarm {
            padding-left: 4px;
            height: 16px;
            font-size: 14px;
            color: rgba(50, 50, 50, 1);
            line-height: 16px;
          }
        }
        .line-chart-btn {
          margin: 5% 5% 0 5%;
          .range-change {
            cursor: pointer;
            box-sizing: border-box;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(222, 224, 227, 1);
            border-radius: 4px;
            font-size: 13px;
            display: inline-block;
            line-height: 32px;
            padding: 0 8px;
            margin-left: 15px;
            &.selected {
              background-color: #3370ff;
              color: #fff;
            }
          }
        }
        .line-chart__body {
          // padding: %;
        }
      }
    }
    .circle {
      padding-top: 16px;
      .lineChart {
        width: 49.5%;
        height: 538px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        position: relative;
        .title {
          padding: 32px 0 10px 32px;
          .titleBar {
            width: 4px;
            height: 16px;
            background: #3370ff;
          }
          .titleWarm {
            padding-left: 4px;
            height: 16px;
            font-size: 14px;
            color: rgba(50, 50, 50, 1);
            line-height: 16px;
          }
        }
        .lineChart_l {
          height: 176px;
          position: absolute;
          left: 30px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .lineChart_r {
          height: 176px;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
    }
  }
}
</style>
<style lang="less">
.userflow {
  th {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
  }
  td {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
  }
}
</style>
