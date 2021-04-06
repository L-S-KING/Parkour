/**
 * Created by Jacob.Yang on 2017/7/11.
 *
 */


class MsgCMD 
{
    /****************跑酷*************** */
    /**玩家跳跃按钮按下 */
    static PLAYER_JUMP:number = 0;
    /**玩家滑动按钮按下 */
    static PLAYER_SLIDE:number = 1;
    /**玩家滑动按钮松开 */
    static PLAYER_STOPSLIDE:number = 2;
    /**玩家速度为0*/
    static PLAYER_STOPGO:number = 3; 
    /**玩家死亡*/
    static PLAYER_DEATH:number = 4;   
    /**磁铁道具 */
    static ITEM_MAGNET:number = 5;
    /**冲刺道具 */
    static ITEM_SPRINT:number = 6;
    /**护盾道具 */
    static ITEM_SHIELD:number = 7;
    /**弹跳 */
    static PLAYER_BOUNCE:number = 8;
    /**玩家走出地板 */
    static PLAYER_DOWNFLOOR:number = 9;
    /**护盾消失 */
    static ITEM_SHIELDREMOVE:number = 10;
    /**玩家后退 */
    static PLAYER_BACK:number = 11;
    /**与地板左边碰撞 */
    static FLOOR_LEFT:number = 12;
    /**游戏暂停 */
    static GAME_STOP:number = 13;
    /**继续游戏 */
    static GAME_CONTINUE:number = 14;




    /***************格斗***************** */
    /**左键按下 */
    static KEY_LEFTBEGIN:number = 21;
    /**左键松开 */
    static KEY_LEFTEND:number = 22;
    /**右键按下 */
    static KEY_RIGHTBEGIN:number = 23;
    /**右键松开 */
    static KEY_RIGHTEND:number = 24;
    /**技能1按键按下 */
    static KEY_SKILL1:number = 26;
    /**技能2按键按下 */
    static KEY_SKILL2:number = 27;
    /**技能3按键按下 */
    static KEY_SKILL3:number = 28;
    /**玩家死亡 */
    // static GAME_OVER:number = 29;
    
}