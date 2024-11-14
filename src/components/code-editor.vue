<template>
    <div class="monaco-editor" ref="editor" :style="style"></div>
  </template>
  
  <script>
  //全部引入
  import * as monaco from 'monaco-editor'
  export default {
    name: 'monaco-editor',
    //引入组件
    props: {
      width: {
        type: [String, Number],
        default: '100%'
      },
      height: {
        type: [String, Number],
        default: '100%'
      },
      code: {
        type: String,
        default: '// code \n'
      },
      theme: {
        type: String,
        default: 'vs-dark' // vs, hc-black
      },
      language: {
        type: String,
        default: 'python'
      },
      options: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      //这里存放数据
      return {
        editor: null, //文本编辑器
        codeOptions: {
          value: this.code, //编辑器初始显示文字
          language: this.language, //语言支持自行查阅demo
          readOnly: false, //只读
          automaticLayout: true, // 自动布局
          scrollBeyondLastLine: false, //底部代码不留白
          theme: this.theme, //官方自带三种主题vs, hc-black, or vs-dark
          roundedSelection: true,
          fontFamily: "Consolas, 'Courier New', monospace", // 字体设置
          fontSize: 14, // 字体大小
          lineHeight: 20,
          tabSize: 2, // 制表符大小
          scrollBeyondLastLine: false, // 禁用超出最后一行的滚动
          minimap: {
            enabled: true
          },
          ...this.option
        }
      };
    },
    //监听属性 类似于data概念
    computed: {
      style() {
        const { width, height } = this;
        const fixedWidth = /(%|px)/.test(width) ? width : width + 'px';
        const fixedHeight = /(%|px)/.test(height) ? height : height + 'px';
        return {
          width: fixedWidth,
          height: fixedHeight
        };
      }
    },
    //监控data中的数据变化
    watch: {
      code: {
        handler(newName) {
          this.setValue(newName);
        }
      }
    },
    //方法集合
    methods: {
      initEditor() {
        // 初始化编辑器，确保dom已经渲染
        this.editor = monaco.editor.create(this.$refs.editor, this.codeOptions);
        this.editor.setPosition({ lineNumber: 1, column: 1 });
      },
      getValue() {
        this.editor.getValue(); //获取编辑器中的文本
      },
      setValue(val) {
        this.editor.setValue(val); //设置编辑器中的文本
      }
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
      this.initEditor();
    },
    //生命周期 - 销毁完成
    destroyed() {
      this.editor.dispose();
    }
  };
  </script>