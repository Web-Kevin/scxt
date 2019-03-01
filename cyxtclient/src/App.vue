<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
            <MenuItem name="1-1">
              <Icon type="ios-navigate"></Icon>
              <span>Option 1</span>
            </MenuItem>
            <MenuItem name="1-2">
              <Icon type="ios-search"></Icon>
              <span>Option 2</span>
            </MenuItem>
            <MenuItem name="1-3">
              <Icon type="ios-settings"></Icon>
              <span>Option 3</span>
            </MenuItem>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout>
          <Header class="layout-header-bar" :style="{color:'#fff'}">采 油 作 业 三 区 生 产 辅 助 系 统</Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
            <Tabs value="name1">
              <TabPane label="作业区概况" name="name1">
                作业区概况
                <button @click="routerTo">click here to news page</button>
                <router-view></router-view>
              </TabPane>

              <TabPane label="单井分析" name="name2">
                <Row>
                  <Col span="3">
                    <TimeLine msg="Welcome to Your Vue.js App"></TimeLine>
                  </Col>
                  <Col span="21">
                    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TimeLine from "./components/TimeLine.vue";
export default {
  name: "app",
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  components: {
    HelloWorld,
    TimeLine
  },
  methods: {
    routerTo() {
      this.$router.push({ path: "/Home", query: { userid: 123 } });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  font-size: 26px;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
