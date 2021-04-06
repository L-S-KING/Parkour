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
 * 经典模式
 */
var Classic = (function (_super) {
    __extends(Classic, _super);
    function Classic() {
        var _this = _super.call(this) || this;
        /**速度 */
        _this.speed = 0;
        /**时间 */
        _this.time = 0;
        /**金币数量 */
        _this.goldNum = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Classic.prototype.init = function () {
        this.skinName = "classic";
        //音量控制按钮装态
        if (SoundManager.instance.isPlay == false) {
            this.setMusic.selected = true;
        }
        if (SoundManager.instance.isPlay == true) {
            this.setMusic.selected = false;
        }
        if (egret.localStorage.getItem("Gold")) {
            this.goldNum = Number(egret.localStorage.getItem("Gold"));
        }
        else {
            this.goldNum = 0;
        }
        this.totalGold.text = "" + this.goldNum;
        egret.localStorage.setItem("Gold", "" + this.goldNum);
        if (egret.localStorage.getItem("BuyTwo")) {
            this.lockTwo.alpha = 0;
        }
        if (egret.localStorage.getItem("BuyThree")) {
            this.lockThree.alpha = 0;
        }
        if (egret.localStorage.getItem("BuyFour")) {
            this.lockFour.alpha = 0;
        }
        this.addListener(this.btnBack, egret.TouchEvent.TOUCH_TAP, this.backTap, this);
        this.addListener(this.btnLeft, egret.TouchEvent.TOUCH_TAP, this.leftTap, this);
        this.addListener(this.btnRight, egret.TouchEvent.TOUCH_TAP, this.rightTap, this);
        this.addListener(this.btnStart, egret.TouchEvent.TOUCH_TAP, this.startTap, this);
        this.addListener(this.buyOne, egret.TouchEvent.TOUCH_TAP, this.buyOneTap, this);
        this.addListener(this.buyTwo, egret.TouchEvent.TOUCH_TAP, this.buyTwoTap, this);
        this.addListener(this.buyThree, egret.TouchEvent.TOUCH_TAP, this.buyThreeTap, this);
        this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
    };
    Classic.prototype.backTap = function () {
        PlayerManager.getPlayer().isBuySprint = false;
        PlayerManager.getPlayer().isBuyShiled = false;
        PlayerManager.getPlayer().isBuyMagnet = false;
        SceneManager.getInstance().addScene(new MainMenu());
    };
    Classic.prototype.setMusicTap = function () {
        if (this.setMusic.selected == false) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
            SoundManager.instance.isPlay = true;
        }
        if (this.setMusic.selected == true) {
            SoundManager.instance.stopBgMusic();
            SoundManager.instance.isPlay = false;
        }
    };
    Classic.prototype.buyOneTap = function () {
        if (this.goldNum >= 200) {
            this.goldNum -= 200;
            this.goldNum += KeyManager.getRocker().gold;
            this.totalGold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            PlayerManager.getPlayer().isBuySprint = true;
        }
    };
    Classic.prototype.buyTwoTap = function () {
        if (this.goldNum >= 600) {
            this.goldNum -= 600;
            this.totalGold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            PlayerManager.getPlayer().isBuyShiled = true;
        }
    };
    Classic.prototype.buyThreeTap = function () {
        if (this.goldNum >= 150) {
            this.goldNum -= 150;
            this.totalGold.text = "" + this.goldNum;
            egret.localStorage.setItem("Gold", "" + this.goldNum);
            PlayerManager.getPlayer().isBuyMagnet = true;
        }
    };
    Classic.prototype.leftTap = function () {
        if (this.player.x >= 50 && this.speed == 0) {
            this.speed = -10;
            this.time = 36;
        }
    };
    Classic.prototype.rightTap = function () {
        if (this.player.x <= 410 && this.speed == 0) {
            this.speed = 10;
            this.time = 36;
        }
    };
    Classic.prototype.startTap = function () {
        if (PlayerManager.getPlayer().playerType == 1) {
            SceneManager.getInstance().addScene(new Level1());
        }
        if (PlayerManager.getPlayer().playerType == 2 && this.lockTwo.alpha == 0) {
            SceneManager.getInstance().addScene(new Level1());
        }
        if (PlayerManager.getPlayer().playerType == 3 && this.lockThree.alpha == 0) {
            SceneManager.getInstance().addScene(new Level1());
        }
        if (PlayerManager.getPlayer().playerType == 4 && this.lockFour.alpha == 0) {
            SceneManager.getInstance().addScene(new Level1());
        }
    };
    Classic.prototype.update = function () {
        this.time -= 1;
        this.player.x += this.speed;
        if (this.time <= 0) {
            this.speed = 0;
        }
        if (this.player.x <= 770 && this.player.x > 410) {
            PlayerManager.getPlayer().playerType = 1;
        }
        if (this.player.x <= 410 && this.player.x > 50) {
            PlayerManager.getPlayer().playerType = 2;
        }
        if (this.player.x <= 50 && this.player.x > -310) {
            PlayerManager.getPlayer().playerType = 3;
        }
        if (this.player.x <= -310 && this.player.x > -670) {
            PlayerManager.getPlayer().playerType = 4;
        }
    };
    return Classic;
}(BaseModule));
__reflect(Classic.prototype, "Classic");
//# sourceMappingURL=Classic.js.map