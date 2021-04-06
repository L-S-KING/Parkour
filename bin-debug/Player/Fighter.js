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
 * 格斗玩家
 */
var Fighter = (function (_super) {
    __extends(Fighter, _super);
    function Fighter() {
        var _this = _super.call(this) || this;
        /**玩家 */
        _this.fighter = null;
        /**玩家种类 */
        _this.fighterType = 0;
        /**玩家序列帧 */
        _this.fighterFrame = 1;
        /**玩家技能种类 */
        _this.skillType = 0;
        /**玩家的移动方向 */
        _this.vectorX = 0;
        /**玩家的移动速度 */
        _this.fighterSpeed = 4;
        /**玩家序列帧切换时间 */
        _this.frameTime = 0;
        /**普通攻击键是否按下 */
        _this.isAttack = false;
        /**游戏暂停 */
        _this.gameStop = false;
        /**玩家是否正在释放技能 */
        _this.isRelease = false;
        /**左键是否按下 */
        _this.isLeft = false;
        /**右键是否按下 */
        _this.isRight = false;
        /**技能1按键按下 */
        _this.isSkill1 = false;
        /**技能2按键按下 */
        _this.isSkill2 = false;
        /**技能3按键按下 */
        _this.isSkill3 = false;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        _this.addMessage(MsgCMD.KEY_LEFTBEGIN, _this);
        _this.addMessage(MsgCMD.KEY_LEFTEND, _this);
        _this.addMessage(MsgCMD.KEY_RIGHTBEGIN, _this);
        _this.addMessage(MsgCMD.KEY_RIGHTEND, _this);
        _this.addMessage(MsgCMD.KEY_SKILL1, _this);
        _this.addMessage(MsgCMD.KEY_SKILL2, _this);
        _this.addMessage(MsgCMD.KEY_SKILL3, _this);
        _this.addMessage(MsgCMD.GAME_STOP, _this);
        _this.addMessage(MsgCMD.GAME_CONTINUE, _this);
        return _this;
    }
    /**玩家初始化 */
    Fighter.prototype.fighterInit = function (type) {
        this.isRelease = false;
        this.fighterType = type;
        this.skillType = 0;
        this.fighterFrame = 1;
        this.fighter = new egret.Bitmap();
        this.fighter.texture = RES.getRes("fighter" + this.fighterType + this.skillType + this.fighterFrame + "_png");
        this.fighter.anchorOffsetX = this.fighter.width * 0.5;
        this.fighter.anchorOffsetY = this.fighter.height;
        this.fighter.scaleX = 1;
        this.addChild(this.fighter);
    };
    Fighter.prototype.update = function () {
        //游戏暂停
        if (this.gameStop == true) {
            return;
        }
        //玩家不能移除屏幕
        if (this.x <= this.fighter.width * 0.5) {
            this.x = this.fighter.width * 0.5;
        }
        if (this.x >= 1280 - this.fighter.width * 0.5) {
            this.x = 1280 - this.fighter.width * 0.5;
        }
        this.frameTime += 1;
        //玩家攻击时不可以移动
        if (this.isAttack == true || this.isSkill1 == true || this.isSkill2 == true || this.isSkill3 == true) {
            this.isLeft = false;
            this.isRight = false;
        }
        //确定玩家移动方向
        if (this.isLeft == true && this.isRight == true) {
            this.vectorX = 0;
        }
        if (this.isLeft == true && this.isRight == false) {
            this.vectorX = -1;
            this.fighter.scaleX = -1;
        }
        if (this.isRight == true && this.isLeft == false) {
            this.vectorX = 1;
            this.fighter.scaleX = 1;
        }
        if (this.isLeft == false && this.isRight == false) {
            this.vectorX = 0;
        }
        //玩家的移动
        this.x += this.fighterSpeed * this.vectorX;
        if (this.frameTime % 10 == 0 && (this.isLeft == true || this.isRight == true)) {
            this.fighterFrame += 1;
            if (this.fighterFrame > 5) {
                this.fighterFrame = 1;
            }
        }
        if (this.fighterType == 2) {
            if (this.frameTime % 10 == 0 && this.isSkill1 == true) {
                this.skillType = 1;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x + this.fighter.scaleX * this.fighter.width * 0.5;
                var effectY = this.y - 150;
                if (this.fighterFrame == 4) {
                    EffectManager.getEffect().addEffect(13, effectX, effectY, 3);
                }
                if (this.fighterFrame > 7) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill1 = false;
                    this.isRelease = false;
                }
            }
            if (this.frameTime % 10 == 0 && this.isSkill2 == true) {
                this.skillType = 2;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x + this.fighter.scaleX * this.fighter.width * 0.2;
                var effectY = this.y - this.fighter.height * 0.7;
                if (this.fighterFrame == 6) {
                    EffectManager.getEffect().addEffect(7, effectX, effectY, 2);
                }
                if (this.fighterFrame > 9) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill2 = false;
                    this.isRelease = false;
                }
            }
            if (this.frameTime % 15 == 0 && this.isSkill3 == true) {
                this.skillType = 3;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x;
                var effectY = this.y - 50;
                if (this.fighterFrame == 3) {
                    EffectManager.getEffect().addEffect(10, effectX, effectY, 1);
                }
                if (this.fighterFrame >= 4) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill3 = false;
                    this.isRelease = false;
                }
            }
            this.fighter.texture = RES.getRes("fighter" + this.fighterType + this.skillType + this.fighterFrame + "_png");
        }
        /********************************************************************************************************************************************************/
        if (this.fighterType == 1) {
            if (this.frameTime % 10 == 0 && this.isSkill1 == true) {
                this.skillType = 1;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x + this.fighter.scaleX * this.fighter.width * 0.5;
                var effectY = this.y - this.fighter.height * 0.5;
                if (this.fighterFrame == 3) {
                    EffectManager.getEffect().addEffect(9, effectX, effectY, 3);
                }
                if (this.fighterFrame > 5) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill1 = false;
                    this.isRelease = false;
                }
                this.fighter.texture = RES.getRes("fighter" + this.fighterType + this.skillType + this.fighterFrame + "_png");
            }
            if (this.frameTime % 6 == 0 && this.isSkill2 == true) {
                this.skillType = 2;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x + this.fighter.scaleX * this.fighter.width * 0.5;
                var effectY = this.y - this.fighter.height * 0.5;
                if (this.fighterFrame == 4) {
                    EffectManager.getEffect().addEffect(8, effectX, effectY, 3);
                }
                if (this.fighterFrame >= 8) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill2 = false;
                    this.isRelease = false;
                }
                this.fighter.texture = RES.getRes("fighter" + this.fighterType + this.skillType + this.fighterFrame + "_png");
            }
            if (this.frameTime % 6 == 0 && this.isSkill3 == true) {
                this.x += this.fighter.scaleX * 4;
                this.skillType = 3;
                this.isRelease = true;
                this.fighterFrame += 1;
                var effectX = this.x + this.fighter.scaleX * this.fighter.width * 0.5;
                var effectY = this.y - this.fighter.height * 0.5 + 50;
                if (this.fighterFrame == 2) {
                    EffectManager.getEffect().addEffect(1, effectX, effectY, 3);
                }
                if (this.fighterFrame == 6) {
                    EffectManager.getEffect().addEffect(2, effectX, effectY, 3);
                }
                if (this.fighterFrame == 12) {
                    EffectManager.getEffect().addEffect(3, effectX, effectY, 3);
                }
                if (this.fighterFrame == 17) {
                    EffectManager.getEffect().addEffect(4, effectX, effectY, 3);
                }
                if (this.fighterFrame == 20) {
                    EffectManager.getEffect().addEffect(5, effectX, effectY, 3);
                }
                if (this.fighterFrame == 28) {
                    EffectManager.getEffect().addEffect(6, effectX, effectY, 3);
                }
                if (this.fighterFrame >= 29) {
                    this.skillType = 0;
                    this.fighterFrame = 1;
                    this.isSkill3 = false;
                    this.isRelease = false;
                }
                this.fighter.texture = RES.getRes("fighter" + this.fighterType + this.skillType + this.fighterFrame + "_png");
            }
        }
    };
    Fighter.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.KEY_LEFTBEGIN:
                this.isLeft = true;
                break;
            case MsgCMD.KEY_LEFTEND:
                this.isLeft = false;
                break;
            case MsgCMD.KEY_RIGHTBEGIN:
                this.isRight = true;
                break;
            case MsgCMD.KEY_RIGHTEND:
                this.isRight = false;
                break;
            case MsgCMD.KEY_SKILL1:
                this.isSkill1 = true;
                break;
            case MsgCMD.KEY_SKILL2:
                this.isSkill2 = true;
                break;
            case MsgCMD.KEY_SKILL3:
                this.isSkill3 = true;
                break;
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Fighter;
}(BaseModule));
__reflect(Fighter.prototype, "Fighter", ["IMessage"]);
//# sourceMappingURL=Fighter.js.map