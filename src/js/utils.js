import CryptoJS from 'crypto-js'
export default {//加密
  encrypt(word){
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5("fJI468SDFjifsKF5").toString());
    var iv  = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0,16));
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key,iv, {mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  decrypt(word){
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5("fJI468SDFjifsKF5").toString());
    var iv  = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0,16));
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }

}
