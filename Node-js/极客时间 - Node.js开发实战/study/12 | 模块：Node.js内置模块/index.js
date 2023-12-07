const leonTime = require('./lib');

leonTime.addListener('newLevel', (res) => {
  // console.log('yeah! Level up!', res);
  if(res.property < 80){
    console.log('buy :>> ', res);
  }
});