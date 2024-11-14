<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <!-- 顶部工具栏 -->
      <el-header style="display: flex; align-items: center; background-color: #f7f9fc;">
        <el-button type="primary" @click="newFile">New</el-button>
        <el-button type="primary" @click="runCode">Run</el-button>
        <el-input
          v-model="cmdArguments"
          placeholder="Command Line Arguments"
          style="margin-left: 10px; flex: 1;"
        ></el-input>
      </el-header>

    <!-- 文件标签和编辑器/输出区 -->
    <el-main style="">
        <!-- 文件标签栏 -->
        <el-tabs v-model="activeFile" type="card" @tab-click="handleTabClick" style="background-color: #f7f9fc;height: 100%;" closable
            @tab-remove="removeTab">
            <el-tab-pane
              v-for="(file, index) in files"
              :key="index"
              :label="file.name"
              :name="index.toString()"
            >
        
          <!-- 编辑器区域 -->
          <div style="height: 80%; padding: 0px;">
              <!-- <el-input
                v-model="files[activeFile].content"
                type="textarea"
                placeholder="输入代码..."
                style="width: 100%; height: 100%; font-family: monospace; font-size: 14px;"
                :autosize="{ minRows: 10, maxRows: 20 }"
              ></el-input> -->
              <code-editor style="width:100%; height: 300vh;"/>
          </div>
          </el-tab-pane>
          </el-tabs>
    </el-main>
    <!-- 输出区域 -->
    <el-footer style="height: 20%; padding: 20px; border-top: 1px solid #ddd;">
              <h3>Output</h3>
              <pre style="white-space: pre-wrap; word-wrap: break-word;">{{ output }}</pre>
    </el-footer>
    </el-container>
  </div>
</template>

<script>
import codeEditor from './code-editor.vue';
export default {
  components:{
    codeEditor
  },
  data() {
    return {
      files: [
        { name: 'main.py', content: '' },
        { name: 'Untitled2.py', content: '' },
        { name: 'Untitled3.py', content: '' },
      ],
      activeFile: "0", // 当前激活的文件索引（字符串形式，配合 el-tabs 使用）
      cmdArguments: '', // 命令行参数
      output: '', // 运行结果
    };
  },
  methods: {
    handleTabClick(tab) {
      this.activeFile = tab.name;
    },
    runCode() {
      try {
        // 在这里执行代码逻辑，比如使用 new Function 模拟代码运行
        const result = new Function(this.files[this.activeFile].content)();
        this.output = result || "代码已成功执行，无返回值";
      } catch (error) {
        this.output = "错误：" + error.message;
      }
    },
    newFile() {
      const newFile = { name: 'Untitled' + (this.files.length + 1) + '.py', content: '' };
      this.files.push(newFile);
      this.activeFile = (this.files.length - 1).toString();
    },
    removeTab(targetName) {
        let tabs = this.files;
        let activeName = this.activeFile;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (index === targetName) {
              let nextTab = index + 1 || index - 1;
              if (nextTab) {
                activeName = nextTab;
              }
            }
          });
        }
        
        this.editaactiveFilebleTabsValue = activeName;
        this.files = tabs.filter(tab => tab.name !== targetName);
      }
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

h3 {
  margin: 0;
}
</style>