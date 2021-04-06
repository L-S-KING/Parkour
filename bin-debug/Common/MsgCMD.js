/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgCMD = (function () {
    function MsgCMD() {
    }
    /****************跑酷*************** */
    /**玩家跳跃按钮按下 */
    MsgCMD.PLAYER_JUMP = 0;
    /**玩家滑动按钮按下 */
    MsgCMD.PLAYER_SLIDE = 1;
    /**玩家滑动按钮松开 */
    MsgCMD.PLAYER_STOPSLIDE = 2;
    /**玩家速度为0*/
    MsgCMD.PLAYER_STOPGO = 3;
    /**玩家死亡*/
    MsgCMD.PLAYER_DEATH = 4;
    /**磁铁道具 */
    MsgCMD.ITEM_MAGNET = 5;
    /**冲刺道具 */
    MsgCMD.ITEM_SPRINT = 6;
    /**护盾道具 */
    MsgCMD.ITEM_SHIELD = 7;
    /**弹跳 */
    MsgCMD.PLAYER_BOUNCE = 8;
    /**玩家走出地板 */
    MsgCMD.PLAYER_DOWNFLOOR = 9;
    /**护盾消失 */
    MsgCMD.ITEM_SHIELDREMOVE = 10;
    /**玩家后退 */
    MsgCMD.PLAYER_BACK = 11;
    /**与地板左边碰撞 */
    MsgCMD.FLOOR_LEFT = 12;
    /**游戏暂停 */
    MsgCMD.GAME_STOP = 13;
    /**继续游戏 */
    MsgCMD.GAME_CONTINUE = 14;
    /***************格斗***************** */
    /**左键按下 */
    MsgCMD.KEY_LEFTBEGIN = 21;
    /**左键松开 */
    MsgCMD.KEY_LEFTEND = 22;
    /**右键按下 */
    MsgCMD.KEY_RIGHTBEGIN = 23;
    /**右键松开 */
    MsgCMD.KEY_RIGHTEND = 24;
    /**技能1按键按下 */
    MsgCMD.KEY_SKILL1 = 26;
    /**技能2按键按下 */
    MsgCMD.KEY_SKILL2 = 27;
    /**技能3按键按下 */
    MsgCMD.KEY_SKILL3 = 28;
    return MsgCMD;
}());
__reflect(MsgCMD.prototype, "MsgCMD");
//# sourceMappingURL=MsgCMD.js.map