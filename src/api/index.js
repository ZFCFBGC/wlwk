import swdCompop from "./compop";
import swdConfirm from "./confirm";
import swdPay from "./pay";
import swdToast from "./toast";
import swdShowInfo from "./showInfo";
/**
 * 为防止页面打印ccb方法集合
 * const swd为一个function
 */
const swd = () => {};

swd.compop = options => {
  swdCompop.show(options);
};
swd.confirm = options => {
  swdConfirm.show(options);
};
swd.pay = options => {
  swdPay.show(options);
};
swd.toast = options => {
  swdToast.show(options);
};
swd.showInfo = options => {
  swdShowInfo.show(options);
};
export default swd;
