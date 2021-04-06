var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 商城
 */
var Shop = (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super.call(this) || this;
        /**金币总量 */
        _this.goldNum = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
        // egret.localStorage.clear();
    }
    Shop.prototype.init = function () {
        this.skinName = "shop";
        if (egret.localStorage.getItem("Gold")) {
            this.goldNum = Number(egret.localStorage.getItem("Gold"));
        }
        else {
            this.goldNum = 0;
        }
        this.gold.text = "" + this.goldNum;
        egret.localStorage.setItem("Gold", "" + this.goldNum);
        if (egret.localStorage.getItem("BuyTwo")) {
            this.shopTwo.alpha = 0;
            this.buyTwo.alpha = 0;
            this.buyTwo.touchEnabled = false;
        }
        if (egret.localStorage.getItem("BuyThree")) {
            this.shopThree.alpha = 0;
            this.buyThree.alpha = 0;
            this.buyThree.touchEnabled = false;
        }
        if (egret.localStorage.getItem("BuyFour")) {
            this.shopFour.alpha = 0;
            this.buyFour.alpha = 0;
            this.buyFour.touchEnabled = true;
        }
        if (egret.localStorage.getItem("BuyFive")) {
            this.shopFive.alpha = 0;
            this.buyFive.alpha = 0;
            this.buyFive.touchEnabled = false;
        }
        this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);
        this.addListener(this.buyTwo, egret.TouchEvent.TOUCH_TAP, this.buyTwoTap, this);
        this.addListener(this.buyThree, egret.TouchEvent.TOUCH_TAP, this.buyThreeTap, this);
        this.addListener(this.buyFour, egret.TouchEvent.TOUCH_TAP, this.buyFourTap, this);
        this.addListener(this.buyFive, egret.TouchEvent.TOUCH_TAP, this.buyFiveTap, this);
    };
    Shop.prototype.backTap = function () {
        SceneManager.getInstance().addScene(new MainMenu());
    };
    Shop.prototype.buyTwoTap = function () {
        if (this.goldNum > 1200) {
            this.goldNum -= 1200;
            this.gold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            this.shopTwo.alpha = 0;
            this.buyTwo.alpha = 0;
            this.buyTwo.touchEnabled = false;
            egret.localStorage.setItem("BuyTwo", "Two");
        }
    };
    Shop.prototype.buyThreeTap = function () {
        if (this.goldNum >= 1800) {
            this.goldNum -= 1800;
            this.gold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            this.shopThree.alpha = 0;
            this.buyThree.alpha = 0;
            this.buyThree.touchEnabled = false;
            egret.localStorage.setItem("BuyThree", "Three");
        }
    };
    Shop.prototype.buyFourTap = function () {
        if (this.goldNum >= 2400) {
            this.goldNum -= 2400;
            this.gold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            this.shopFour.alpha = 0;
            this.buyFour.alpha = 0;
            this.buyFour.touchEnabled = true;
            egret.localStorage.setItem("BuyFour", "Four");
        }
    };
    Shop.prototype.buyFiveTap = function () {
        if (this.goldNum >= 8888) {
            this.goldNum -= 8888;
            this.gold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            this.shopFive.alpha = 0;
            this.buyFive.alpha = 0;
            this.buyFive.touchEnabled = true;
            egret.localStorage.setItem("BuyFive", "Five");
        }
    };
    return Shop;
}(BaseModule));
__reflect(Shop.prototype, "Shop");
//# sourceMappingURL=Shop.js.map