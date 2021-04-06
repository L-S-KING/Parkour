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
var BOSS_STATE;
(function (BOSS_STATE) {
    /**默认状态 */
    BOSS_STATE[BOSS_STATE["IDEO"] = 0] = "IDEO";
    /**后退状态 */
    BOSS_STATE[BOSS_STATE["DODEG"] = 1] = "DODEG";
    /**攻击状态 */
    BOSS_STATE[BOSS_STATE["ATTACK"] = 2] = "ATTACK";
})(BOSS_STATE || (BOSS_STATE = {}));
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        var _this = _super.call(this) || this;
        /**BOOS */
        _this.boss = null;
        /**BOSS种类 */
        _this.bossType = 0;
        /**BOSS序列帧 */
        _this.bossFrame = 0;
        /**技能种类 */
        _this.skillType = 0;
        /**序列帧切换时间 */
        _this.frameTime = 0;
        /**BOSS移动方向 */
        _this.vectorBoss = 0;
        /**BOSS的移动速度 */
        _this.speedBoss = 8;
        /**技能随机 */
        _this.random = 0;
        /**技能2CD */
        _this.cdTwo = 0;
        /**技能3CD */
        _this.cdThree = 0;
        /**2技能已经释放 */
        _this.twoRelease = false;
        /**3技能已经释放 */
        _this.threeRelease = false;
        /**释放技能计时 */
        _this.attackTime = 0;
        /**开始攻击 */
        _this.startAttack = false;
        /**默认状态 */
        _this.state = BOSS_STATE.IDEO;
        /**距离玩家的距离 */
        _this.disPlayer = 0;
        /**定时检测与玩家的距离 */
        _this.time = 0;
        /**是否释放技能 */
        _this.hasSkill = false;
        /**boss3移动 */
        _this.move = false;
        /**BOSS3 3技能移动时间 */
        _this.moveTime = 20;
        /**游戏暂停 */
        _this.gameStop = false;
        _this.addMessage(MsgCMD.GAME_STOP, _this);
        _this.addMessage(MsgCMD.GAME_CONTINUE, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Boss.prototype.bossInt = function (type) {
        this.gameStop = false;
        BossManager.getBoss().bossStop = false;
        this.bossType = type;
        this.skillType = 0;
        this.bossFrame = 1;
        this.boss = new egret.Bitmap();
        this.boss.texture = RES.getRes("boss" + this.bossType + this.skillType + this.bossFrame + "_png");
        this.boss.anchorOffsetX = this.boss.width * 0.5;
        this.boss.anchorOffsetY = this.boss.height;
        this.addChild(this.boss);
        this.boss.scaleX = -1;
    };
    Boss.prototype.update = function () {
        if (BossManager.getBoss().bossStop == true || this.gameStop == true) {
            return;
        }
        if (this.x <= -this.boss.width * 0.5) {
            this.x = -this.boss.width * 0.5;
        }
        if (this.x >= 1280 - this.boss.width * 0.5) {
            this.x = 1280 - this.boss.width * 0.5;
        }
        this.x += this.vectorBoss * this.speedBoss;
        switch (this.state) {
            case BOSS_STATE.IDEO:
                if (this.time == 0) {
                    //玩家与BOSS的距离
                    this.disPlayer = Math.abs(this.x - PlayerManager.getPlayer().fighter.x);
                }
                else if (this.time >= 50) {
                    this.time = 0;
                    if (this.disPlayer > Math.abs(this.x - PlayerManager.getPlayer().fighter.x)) {
                        if (this.state == BOSS_STATE.IDEO) {
                            this.state = BOSS_STATE.DODEG;
                        }
                    }
                    else {
                        if (this.state == BOSS_STATE.IDEO) {
                            this.state = BOSS_STATE.ATTACK;
                        }
                    }
                }
                this.time++;
                if (this.x <= 200) {
                    this.vectorBoss = 0;
                }
                if (this.x > 1000) {
                    this.vectorBoss = 0;
                }
                break;
            case BOSS_STATE.DODEG:
                //判断方向boss后退
                if (this.x - PlayerManager.getPlayer().fighter.x > 0) {
                    this.vectorBoss = 1;
                    this.boss.scaleX = -1;
                }
                if (this.x - PlayerManager.getPlayer().fighter.x < 0) {
                    this.vectorBoss = -1;
                    this.boss.scaleX = 1;
                }
                if (this.x <= 200) {
                    this.vectorBoss = 0;
                    this.bossFrame = 1;
                    this.state = BOSS_STATE.ATTACK;
                }
                else if (this.x >= 1000) {
                    this.vectorBoss = 0;
                    this.state = BOSS_STATE.ATTACK;
                    this.bossFrame = 1;
                }
                break;
            case BOSS_STATE.ATTACK:
                var random = Math.random();
                if (random < 0.5) {
                    if (!this.hasSkill) {
                        this.bossFrame = 1;
                        this.skillType = 2;
                        this.hasSkill = true;
                        //寻找目标
                        if (this.x - PlayerManager.getPlayer().fighter.x > 0) {
                            this.vectorBoss = -1;
                            this.boss.scaleX = -1;
                        }
                        if (this.x - PlayerManager.getPlayer().fighter.x < 0) {
                            this.vectorBoss = 1;
                            this.boss.scaleX = 1;
                        }
                    }
                }
                else {
                    if (!this.hasSkill) {
                        this.hasSkill = true;
                        this.bossFrame = 1;
                        this.skillType = 3;
                        //旋转方向
                        if (this.x - PlayerManager.getPlayer().fighter.x > 0) {
                            this.boss.scaleX = -1;
                        }
                        if (this.x - PlayerManager.getPlayer().fighter.x < 0) {
                            this.boss.scaleX = 1;
                        }
                    }
                }
                //进入boss攻击范围进行攻击
                if (Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < 200 && this.skillType == 2) {
                    //进行攻击
                    this.vectorBoss = 0;
                    if (!this.startAttack)
                        this.startAttack = true;
                }
                break;
        }
        //BOSS静止序列帧切换
        if (this.skillType == 0 && this.frameTime % 30 == 0) {
            this.bossFrame += 1;
            if (this.bossFrame > 3) {
                this.bossFrame = 1;
            }
        }
        /***********************************************************************BOSS1*******************************************************************************************************/
        if (this.bossType == 1) {
            this.frameTime += 1;
            // //好像是走路
            // if(this.skillType == 1 && this.frameTime % 10 == 0)
            // {
            // 	this.bossFrame += 1;
            // 	if(this.bossFrame >= 8)
            // 	{
            // 		this.bossFrame = 1;
            // 	}
            // }
            //技能2
            if (this.skillType == 2 && this.frameTime % 15 == 0) {
                if (this.startAttack) {
                    this.bossFrame += 1;
                    if (this.bossFrame == 4 || this.bossFrame == 7) {
                        if (Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.35
                            && Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.boss.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.3) {
                            //玩家掉血
                            PlayerManager.getPlayer().fighterHp -= 20;
                        }
                    }
                    if (this.bossFrame > 8) {
                        if (this.x - PlayerManager.getPlayer().fighter.x > 0) {
                            this.vectorBoss = 1;
                        }
                        if (this.x - PlayerManager.getPlayer().fighter.x < 0) {
                            this.vectorBoss = -1;
                        }
                        //重置状态
                        this.state = BOSS_STATE.IDEO;
                        this.skillType = 0;
                        this.bossFrame = 1;
                        this.startAttack = false;
                        this.frameTime = 0;
                        this.hasSkill = false;
                    }
                }
            }
            if (this.skillType == 3 && this.frameTime % 20 == 0) {
                this.bossFrame += 1;
                if (this.bossFrame == 2) {
                    EffectManager.getEffect().addEffect(14, this.x + this.boss.scaleX * 100, this.y - 150, 2);
                }
                if (this.bossFrame > 2) {
                    this.state = BOSS_STATE.IDEO;
                    this.skillType = 0;
                    this.bossFrame = 1;
                    this.frameTime = 0;
                    this.hasSkill = false;
                }
            }
        }
        /********************************************************************************************************************************************************************************** */
        if (this.bossType == 2) {
            this.frameTime += 1;
            // if(this.skillType == 1 && this.frameTime % 15 == 0)
            // {
            // 	this.bossFrame += 1;
            // 	if(this.bossFrame > 8)
            // 	{
            // 		this.bossFrame = 1;
            // 	}
            // }
            if (this.skillType == 2 && this.frameTime % 15 == 0) {
                if (this.startAttack) {
                    this.bossFrame += 1;
                    if (this.bossFrame == 3 || this.bossFrame == 7) {
                        if (Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.35
                            && Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.boss.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.3) {
                            //玩家掉血
                            PlayerManager.getPlayer().fighterHp -= 30;
                        }
                    }
                    if (this.bossFrame > 8) {
                        if (this.x - PlayerManager.getPlayer().fighter.x > 0) {
                            this.vectorBoss = 1;
                        }
                        if (this.x - PlayerManager.getPlayer().fighter.x < 0) {
                            this.vectorBoss = -1;
                        }
                        this.state = BOSS_STATE.IDEO;
                        this.skillType = 0;
                        this.bossFrame = 1;
                        this.startAttack = false;
                        this.frameTime = 0;
                        this.hasSkill = false;
                    }
                }
            }
            if (this.skillType == 3 && this.frameTime % 10 == 0) {
                this.bossFrame += 1;
                if (this.bossFrame == 6) {
                    EffectManager.getEffect().addEffect(16, this.x + this.boss.scaleX * 60, this.y - 150, 2);
                }
                if (this.bossFrame > 7) {
                    this.state = BOSS_STATE.IDEO;
                    this.skillType = 0;
                    this.bossFrame = 1;
                    this.frameTime = 0;
                    this.hasSkill = false;
                }
            }
        }
        /************************************************************************************************************************************************************************************* */
        if (this.bossType == 3) {
            this.frameTime += 1;
            if (this.skillType == 1 && this.frameTime % 20 == 0) {
                this.bossFrame += 1;
                if (this.bossFrame > 4) {
                    this.bossFrame = 1;
                }
            }
            if (this.startAttack) {
                if (this.skillType == 2 && this.frameTime % 10 == 0) {
                    this.bossFrame += 1;
                    if (this.bossFrame >= 2) {
                        this.bossFrame = 2;
                        this.move = true;
                    }
                }
                if (this.move == true) {
                    this.moveTime -= 1;
                    this.x += this.boss.scaleX * 20;
                    if (this.moveTime < 0) {
                        this.move = false;
                        this.moveTime = 20;
                        this.state = BOSS_STATE.IDEO;
                        this.skillType = 0;
                        this.bossFrame = 1;
                        this.startAttack = false;
                        this.frameTime = 0;
                        this.hasSkill = false;
                    }
                }
                if (Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.1) {
                    PlayerManager.getPlayer().fighterHp -= 10;
                }
            }
            if (this.skillType == 3 && this.frameTime % 6 == 0) {
                this.bossFrame += 1;
                if (this.bossFrame == 2) {
                    EffectManager.getEffect().addEffect(18, this.x + this.boss.scaleX * 100, this.y - 100, 3);
                }
                if (this.bossFrame > 5) {
                    this.state = BOSS_STATE.IDEO;
                    this.skillType = 0;
                    this.bossFrame = 1;
                    this.frameTime = 0;
                    this.hasSkill = false;
                }
            }
        }
        this.boss.texture = RES.getRes("boss" + this.bossType + this.skillType + this.bossFrame + "_png");
    };
    Boss.prototype.recvMsg = function (cmd, date) {
        switch (cmd) {
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Boss;
}(BaseModule));
__reflect(Boss.prototype, "Boss", ["IMessage"]);
//# sourceMappingURL=Boss.js.map