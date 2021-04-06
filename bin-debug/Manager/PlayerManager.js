var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家管理类
 */
var PlayerManager = (function () {
    function PlayerManager() {
        /**玩家 */
        this.player = null;
        /**是否购买开局冲刺道具 */
        this.isBuySprint = false;
        /**是否购买护盾道具 */
        this.isBuyShiled = false;
        /**是否购买磁铁道具 */
        this.isBuyMagnet = false;
        /**是否购买死亡冲刺道具 */
        this.isBuyDeathSprint = false;
        /**格斗者 */
        this.fighter = null;
        /**玩家血量 */
        this.fighterHp = 0;
        /**格斗家种类 */
        this.fighterType = 0;
    }
    PlayerManager.getPlayer = function () {
        if (this._player == null) {
            this._player = new PlayerManager();
        }
        return this._player;
    };
    /**添加玩家 */
    PlayerManager.prototype.addPlayer = function () {
        this.player = new Player();
        this.player.playerInit(this.playerType);
        this.player.x = 30;
        this.player.y = 500;
        SceneManager.getInstance().currentScene.addChild(this.player);
    };
    /**添加格斗玩家 */
    PlayerManager.prototype.addFighter = function () {
        this.fighter = new Fighter();
        this.fighter.fighterInit(this.fighterType);
        this.fighter.x = 300;
        this.fighter.y = 640;
        if (this.fighterType == 1) {
            this.fighterHp = 800;
        }
        if (this.fighterType == 2) {
            this.fighterHp = 1200;
        }
        SceneManager.getInstance().currentScene.addChild(this.fighter);
    };
    PlayerManager._player = null;
    return PlayerManager;
}());
__reflect(PlayerManager.prototype, "PlayerManager");
//# sourceMappingURL=PlayerManager.js.map