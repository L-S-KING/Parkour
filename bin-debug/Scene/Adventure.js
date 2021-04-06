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
 * 冒险模式
 */
var Adventure = (function (_super) {
    __extends(Adventure, _super);
    function Adventure() {
        var _this = _super.call(this) || this;
        /**格斗家 */
        _this.fighter = null;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Adventure.prototype.init = function () {
        this.skinName = "adventure";
        //音量控制按钮装态
        if (SoundManager.instance.isPlay == false) {
            this.setMusic.selected = true;
        }
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("pkMusic_mp3");
            this.setMusic.selected = false;
        }
        this.fighterCover = new egret.Bitmap();
        this.fighterCover.texture = RES.getRes("fighterBg_png");
        this.addChild(this.fighterCover);
        this.fighterCover.x = 682;
        this.fighterCover.y = 130;
        this.fighterCover.touchEnabled = true;
        this.btnStart.touchEnabled = true;
        PlayerManager.getPlayer().fighterType = 1;
        BossManager.getBoss().bossType = 1;
        this.level1.alpha = 1;
        this.level2.alpha = 0.5;
        this.level3.alpha = 0.5;
        if (egret.localStorage.getItem("BuyFive")) {
            this.fighterLock.alpha = 0;
        }
        if (egret.localStorage.getItem("Level2")) {
            this.lockLevel2.alpha = 0;
        }
        if (egret.localStorage.getItem("Level3")) {
            this.lockLevel3.alpha = 0;
        }
        this.addListener(this.btnBack, egret.TouchEvent.TOUCH_TAP, this.btnBackTap, this);
        this.addListener(this.btnStart, egret.TouchEvent.TOUCH_TAP, this.btnStartTap, this);
        this.addListener(this.fighterCover, egret.TouchEvent.TOUCH_TAP, this.coverTap, this);
        this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
        this.addListener(this.level1, egret.TouchEvent.TOUCH_TAP, this.level1Tap, this);
        this.addListener(this.level2, egret.TouchEvent.TOUCH_TAP, this.level2Tap, this);
        this.addListener(this.level3, egret.TouchEvent.TOUCH_TAP, this.level3Tap, this);
    };
    Adventure.prototype.coverTap = function () {
        if (this.fighterCover.x == 682) {
            this.fighterCover.x = 280;
            PlayerManager.getPlayer().fighterType = 2;
            if (this.fighterLock.alpha == 1) {
                this.btnStart.touchEnabled = false;
            }
            else {
                this.btnStart.touchEnabled = true;
            }
        }
        else if (this.fighterCover.x == 280) {
            this.fighterCover.x = 682;
            PlayerManager.getPlayer().fighterType = 1;
            this.btnStart.touchEnabled = true;
        }
    };
    Adventure.prototype.setMusicTap = function () {
        if (this.setMusic.selected == false) {
            SoundManager.instance.startBgMusic("pkMusic_mp3");
            SoundManager.instance.isPlay = true;
        }
        if (this.setMusic.selected == true) {
            SoundManager.instance.stopBgMusic();
            SoundManager.instance.isPlay = false;
        }
    };
    Adventure.prototype.btnBackTap = function () {
        SoundManager.instance.stopBgMusic();
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
        }
        SceneManager.getInstance().addScene(new MainMenu());
    };
    Adventure.prototype.btnStartTap = function () {
        SoundManager.instance.stopBgMusic();
        SceneManager.getInstance().addScene(new Level2());
    };
    Adventure.prototype.level1Tap = function () {
        BossManager.getBoss().bossType = 1;
        this.level1.alpha = 1;
        this.level2.alpha = 0.5;
        this.level3.alpha = 0.5;
    };
    Adventure.prototype.level2Tap = function () {
        if (this.lockLevel2.alpha == 0) {
            BossManager.getBoss().bossType = 2;
            this.level1.alpha = 0.5;
            this.level2.alpha = 1;
            this.level3.alpha = 0.5;
        }
    };
    Adventure.prototype.level3Tap = function () {
        if (this.lockLevel3.alpha == 0) {
            BossManager.getBoss().bossType = 3;
            this.level1.alpha = 0.5;
            this.level2.alpha = 0.5;
            this.level3.alpha = 1;
        }
    };
    Adventure.prototype.recvMsg = function (cmd, data) {
    };
    return Adventure;
}(BaseModule));
__reflect(Adventure.prototype, "Adventure", ["IMessage"]);
//# sourceMappingURL=Adventure.js.map