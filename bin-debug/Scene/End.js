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
 * 游戏结束界面
 */
var End = (function (_super) {
    __extends(End, _super);
    function End() {
        var _this = _super.call(this) || this;
        /**玩家 */
        _this.player = null;
        /**历史最高分 */
        _this.score = 0;
        /**本局总分 */
        _this.totalGrade = 0;
        /**金币总量 */
        _this.totalGold = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    End.prototype.init = function () {
        this.skinName = "end";
        this.player = new egret.Bitmap();
        this.player.texture = RES.getRes("player" + PlayerManager.getPlayer().playerType + "_png");
        this.addChild(this.player);
        this.player.anchorOffsetX = this.player.width * 0.5;
        this.player.anchorOffsetY = this.player.height * 0.5;
        this.player.x = 950;
        this.player.y = 360;
        //本局总分
        this.totalGrade = KeyManager.getRocker().parkour.grade + KeyManager.getRocker().parkour.performance * 10 + KeyManager.getRocker().parkour.metre * 10;
        if (egret.localStorage.getItem("Score")) {
            this.score = Number(egret.localStorage.getItem("Score"));
        }
        if (this.totalGrade >= this.score) {
            this.score = this.totalGrade;
            this.highest.alpha = 1;
        }
        else if (this.totalGrade < this.score) {
            this.score = this.score;
        }
        this.highestScore.text = "" + this.score;
        this.totalScore.text = "" + this.totalGrade;
        this.distance.text = "" + KeyManager.getRocker().parkour.metre;
        if (PlayerManager.getPlayer().playerType == 1) {
            this.goldNum.text = "" + KeyManager.getRocker().gold;
        }
        if (PlayerManager.getPlayer().playerType == 2) {
            this.goldNum.text = "" + KeyManager.getRocker().gold * 2;
        }
        if (PlayerManager.getPlayer().playerType == 3) {
            this.goldNum.text = "" + KeyManager.getRocker().gold * 3;
        }
        if (PlayerManager.getPlayer().playerType == 4) {
            this.goldNum.text = "" + KeyManager.getRocker().gold * 4;
        }
        this.performanceScore.text = "" + KeyManager.getRocker().parkour.performance;
        egret.localStorage.setItem("Score", this.highestScore.text);
        this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);
        this.addListener(this.again, egret.TouchEvent.TOUCH_TAP, this.againTap, this);
        if (egret.localStorage.getItem("Gold")) {
            this.totalGold = Number(egret.localStorage.getItem("Gold"));
        }
        else {
            this.totalGold = 0;
        }
        if (PlayerManager.getPlayer().playerType == 1) {
            this.totalGold += KeyManager.getRocker().gold;
        }
        if (PlayerManager.getPlayer().playerType == 2) {
            this.totalGold += KeyManager.getRocker().gold * 2;
        }
        if (PlayerManager.getPlayer().playerType == 3) {
            this.totalGold += KeyManager.getRocker().gold * 3;
        }
        if (PlayerManager.getPlayer().playerType == 4) {
            this.totalGold += KeyManager.getRocker().gold * 4;
        }
        egret.localStorage.setItem("Gold", "" + this.totalGold);
    };
    End.prototype.backTap = function () {
        SoundManager.instance.stopBgMusic();
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
        }
        SceneManager.getInstance().addScene(new MainMenu());
    };
    End.prototype.againTap = function () {
        SoundManager.instance.stopBgMusic();
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
        }
        SceneManager.getInstance().addScene(new Classic());
    };
    return End;
}(BaseModule));
__reflect(End.prototype, "End");
//# sourceMappingURL=End.js.map