// 自定义模块

function Show (){
  this.name = 'user1'
  this.say = function () {
    console.log(`my name is ${this.name}`);
  }
}


module.exports = Show;