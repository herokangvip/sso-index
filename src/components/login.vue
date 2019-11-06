<template>
    <div id="loginDiv">
      <div id="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

</template>
<script>
  import CryptoJS from "crypto-js";
  /**
   * 获取url参数
   * @param name
   * @returns {string}
   */
  function getParam(name){
    let reg = new RegExp('(^|&|\\?)' + name + '=([^(&|#)]*)', 'i');
    let r = location.href.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return 'null';
  }


  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        //屏幕尺寸1920*969
        //screenWidth:document.documentElement.clientWidth,
        //screenHeight:document.documentElement.clientHeight,
      };
    },
    methods: {
      submitForm(formName) {
        const instance = this.axios.create({
          baseURL: 'http://ssoserver.heroking.com:8080/api/',
          timeout: 1000,
          //headers: {'contentType': 'application/json;'},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
        let params = new URLSearchParams();
        params.append('name', this.ruleForm.name);
        let pass = CryptoJS.MD5(this.ruleForm.password);
        params.append('password', pass);
        let redirect = getParam("redirect");
        if(redirect==null||redirect.trim()==""){
          redirect = "http://ssoindex.heroking.com";
        }
        params.append('redirectUrl',redirect );

        this.$refs[formName].validate((valid) => {
          if (valid) {
            instance.post("/login",params)
              .then((response) => {
                  if(response.data.code == 200){
                    window.location.href = response.data.data;
                  }else {
                    this.$message({
                      message: '用户名密码错误',
                      type: 'warning'
                    });
                  }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  #loginDiv{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px;
    width: 400px;
    height: 400px;
    background: url("../assets/logo.png") no-repeat 10px center;
    line-height: 400px;
    font-size: 36px;
    text-align: center;
  }
  #login{
    position: absolute;
    z-index: 10;
    margin: 150px 5px 5px 5px;
    padding: 0;
    border: 0 solid green;
  }

</style>

