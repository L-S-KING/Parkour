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
var Key = (function (_super) {
    __extends(Key, _super);
    function Key() {
        var _this = _super.call(this) || this;
        /**技能1CD */
        _this.cdOne = 0;
        /**技能2CD */
        _this.cdTwo = 0;
        /**技能3CD */
        _this.cdThree = 0;
        _this.first = false;
        _this.addMessage(MsgCMD.GAME_CONTINUE, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Key.prototype.keyInit = function () {
        this.skinName = "key";
        KeyManager.getRocker().gold = 0;
        SoundManager.instance.stopBgMusic();
        this.stopPk.touchEnabled = true;
        this.setMusic.touchEnabled = true;
        this.back.touchEnabled = true;
        this.skill1.touchEnabled = true;
        this.skill2.touchEnabled = true;
        this.skill3.touchEnabled = true;
        //音量控制按钮装态
        if (SoundManager.instance.isPlay == false) {
            this.setMusic.selected = true;
        }
        if (SoundManager.instance.isPlay == true) {
            this.setMusic.selected = false;
            SoundManager.instance.startBgMusic("pkMusicBg_mp3");
        }
        this.fighterHp.value = PlayerManager.getPlayer().fighterHp;
        this.bossHp.value = BossManager.getBoss().bossHp;
        this.addListener(this.btnLeft, egret.TouchEvent.TOUCH_BEGIN, this.leftBegin, this);
        this.addListener(this.groupLeft, egret.TouchEvent.TOUCH_END, this.leftEnd, this);
        this.addListener(this.btnRight, egret.TouchEvent.TOUCH_BEGIN, this.rightBegin, this);
        this.addListener(this.groupRight, egret.TouchEvent.TOUCH_END, this.rightEnd, this);
        this.addListener(this.skill1, egret.TouchEvent.TOUCH_BEGIN, this.skill1Begin, this);
        this.addListener(this.skill2, egret.TouchEvent.TOUCH_BEGIN, this.skill2Begin, this);
        this.addListener(this.skill3, egret.TouchEvent.TOUCH_BEGIN, this.skill3Begin, this);
        this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);
        this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
        this.addListener(this.stopPk, egret.TouchEvent.TOUCH_TAP, this.stopPkTap, this);
    };
    Key.prototype.backTap = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
            SceneManager.getInstance().addScene(new Adventure());
        }
    };
    Key.prototype.stopPkTap = function () {
        Message.instance.send(MsgCMD.GAME_STOP);
        this.stopPk.touchEnabled = false;
        this.back.touchEnabled = false;
        this.setMusic.touchEnabled = false;
        this.skill1.touchEnabled = false;
        this.skill2.touchEnabled = false;
        this.skill3.touchEnabled = false;
        SoundManager.instance.stopBgMusic();
        SceneManager.getInstance().currentScene.addChild(new StopPk());
    };
    Key.prototype.setMusicTap = function () {
        if (this.setMusic.selected == false) {
            SoundManager.instance.startBgMusic("pkMusicBg_mp3");
            SoundManager.instance.isPlay = true;
        }
        if (this.setMusic.selected == true) {
            SoundManager.instance.stopBgMusic();
            SoundManager.instance.isPlay = false;
        }
    };
    Key.prototype.leftBegin = function () {
        Message.instance.send(MsgCMD.KEY_LEFTBEGIN);
    };
    Key.prototype.leftEnd = function () {
        Message.instance.send(MsgCMD.KEY_LEFTEND);
    };
    Key.prototype.rightBegin = function () {
        Message.instance.send(MsgCMD.KEY_RIGHTBEGIN);
    };
    Key.prototype.rightEnd = function () {
        Message.instance.send(MsgCMD.KEY_RIGHTEND);
    };
    Key.prototype.skill1Begin = function () {
        if (this.skill1.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false) {
            Message.instance.send(MsgCMD.KEY_SKILL1);
            this.skill1.alpha = 0.4;
            this.cdOne = 180;
        }
    };
    Key.prototype.skill2Begin = function () {
        if (this.skill2.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false) {
            Message.instance.send(MsgCMD.KEY_SKILL2);
            this.skill2.alpha = 0.4;
            this.cdTwo = 360;
        }
    };
    Key.prototype.skill3Begin = function () {
        if (this.skill3.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false) {
            Message.instance.send(MsgCMD.KEY_SKILL3);
            this.skill3.alpha = 0.4;
            this.cdThree = 600;
        }
    };
    Key.prototype.update = function () {
        if (this.stopPk.touchEnabled == false) {
            return;
        }
        if (PlayerManager.getPlayer().fighter.fighterType == 1) {
            this.fighterHp.value = PlayerManager.getPlayer().fighterHp * 1 / 8;
        }
        if (PlayerManager.getPlayer().fighter.fighterType == 2) {
            this.fighterHp.value = PlayerManager.getPlayer().fighterHp * 1 / 12;
        }
        if (BossManager.getBoss().bossType == 1) {
            this.bossHp.value = BossManager.getBoss().bossHp * 1 / 8;
        }
        if (BossManager.getBoss().bossType == 2) {
            this.bossHp.value = BossManager.getBoss().bossHp * 1 / 12;
        }
        if (BossManager.getBoss().bossType == 3) {
            this.bossHp.value = BossManager.getBoss().bossHp * 1 / 12;
        }
        if (this.skill1.alpha == 0.4) {
            this.cdOne -= 1;
            if (this.cdOne < 0) {
                this.skill1.alpha = 1;
            }
        }
        if (this.skill2.alpha == 0.4) {
            this.cdTwo -= 1;
            if (this.cdTwo < 0) {
                this.skill2.alpha = 1;
            }
        }
        if (this.skill3.alpha == 0.4) {
            this.cdThree -= 1;
            if (this.cdThree < 0) {
                this.skill3.alpha = 1;
            }
        }
        if (this.fighterHp.value >= 0 && this.bossHp.value <= 0 && this.first == false) {
            if (BossManager.getBoss().bossType == 1) {
                egret.localStorage.setItem("Level2", "Two");
            }
            if (BossManager.getBoss().bossType == 2) {
                egret.localStorage.setItem("Level3", "Three");
            }
            Message.instance.send(MsgCMD.GAME_STOP);
            this.stopPk.touchEnabled = false;
            this.back.touchEnabled = false;
            this.setMusic.touchEnabled = false;
            this.skill1.touchEnabled = false;
            this.skill2.touchEnabled = false;
            this.skill3.touchEnabled = false;
            KeyManager.getRocker().gold = this.fighterHp.value * 3;
            SceneManager.getInstance().currentScene.addChild(new Success());
            this.first = true;
        }
        if (this.bossHp.value >= 0 && this.fighterHp.value <= 0 && this.first == false) {
            Message.instance.send(MsgCMD.GAME_STOP);
            this.stopPk.touchEnabled = false;
            this.back.touchEnabled = false;
            this.setMusic.touchEnabled = false;
            this.skill1.touchEnabled = false;
            this.skill2.touchEnabled = false;
            this.skill3.touchEnabled = false;
            SceneManager.getInstance().currentScene.addChild(new Fail());
            this.first = true;
        }
    };
    Key.prototype.recvMsg = function (cmd, date) {
        switch (cmd) {
            case MsgCMD.GAME_CONTINUE:
                this.stopPk.touchEnabled = true;
                this.setMusic.touchEnabled = true;
                this.back.touchEnabled = true;
                this.skill1.touchEnabled = true;
                this.skill2.touchEnabled = true;
                this.skill3.touchEnabled = true;
                if (SoundManager.instance.isPlay == true) {
                    SoundManager.instance.startBgMusic("pkMusicBg_mp3");
                }
                break;
        }
    };
    return Key;
}(BaseModule));
__reflect(Key.prototype, "Key", ["IMessage"]);
//# sourceMappingURL=Key.js.map