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
 * 跑酷按键
 */
var Parkour = (function (_super) {
    __extends(Parkour, _super);
    function Parkour() {
        var _this = _super.call(this) || this;
        /**分数 */
        _this.grade = 0;
        /**米 */
        _this.metre = 0;
        /**表现分数 */
        _this.performance = 0;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Parkour.prototype.init = function () {
        this.skinName = "parkour";
        //音量控制按钮装态
        if (SoundManager.instance.isPlay == false) {
            this.setMusic.selected = true;
        }
        if (SoundManager.instance.isPlay == true) {
            this.setMusic.selected = false;
            SoundManager.instance.startBgMusic("runMusic_mp3");
        }
        KeyManager.getRocker().gold = 0;
        this.addListener(this.jump, egret.TouchEvent.TOUCH_BEGIN, this.jumpBegin, this);
        this.addListener(this.slide, egret.TouchEvent.TOUCH_BEGIN, this.slideBegin, this);
        this.addListener(this.slideRange, egret.TouchEvent.TOUCH_END, this.slideEnd, this);
        this.addListener(this.stopBtn, egret.TouchEvent.TOUCH_BEGIN, this.stopBegin, this);
        this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Parkour.prototype.jumpBegin = function () {
        Message.instance.send(MsgCMD.PLAYER_JUMP);
    };
    Parkour.prototype.slideBegin = function () {
        Message.instance.send(MsgCMD.PLAYER_SLIDE);
    };
    Parkour.prototype.slideEnd = function () {
        Message.instance.send(MsgCMD.PLAYER_STOPSLIDE);
    };
    Parkour.prototype.update = function () {
        this.fraction.text = "" + this.grade;
        this.coinNum.text = "" + KeyManager.getRocker().gold;
        this.distance.text = "" + this.metre;
        this.performanceScore.text = "" + this.performance;
    };
    Parkour.prototype.setMusicTap = function () {
        if (this.setMusic.selected == false) {
            SoundManager.instance.startBgMusic("runMusic_mp3");
            SoundManager.instance.isPlay = true;
        }
        if (this.setMusic.selected == true) {
            SoundManager.instance.stopBgMusic();
            SoundManager.instance.isPlay = false;
        }
    };
    Parkour.prototype.stopBegin = function () {
        Message.instance.send(MsgCMD.GAME_STOP);
        this.stopBtn.touchEnabled = false;
        this.setMusic.touchEnabled = false;
        SoundManager.instance.stopBgMusic();
        SceneManager.getInstance().currentScene.addChild(new StopBg());
    };
    Parkour.prototype.recvMsg = function (cmd, date) {
        switch (cmd) {
            case MsgCMD.PLAYER_DEATH:
                this.jump.touchEnabled = false;
                this.slide.touchEnabled = false;
                this.stopBtn.touchEnabled = false;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.stopBtn.touchEnabled = true;
                this.setMusic.touchEnabled = true;
                if (SoundManager.instance.isPlay == true) {
                    SoundManager.instance.startBgMusic("runMusic_mp3");
                }
                break;
        }
    };
    return Parkour;
}(BaseModule));
__reflect(Parkour.prototype, "Parkour", ["IMessage"]);
//# sourceMappingURL=Parkour.js.map