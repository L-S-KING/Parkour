var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * BOSS管理类
 */
var BossManager = (function () {
    function BossManager() {
        /**BOSS*/
        this.boss = null;
        /**BOSS血量 */
        this.bossHp = 0;
        /**BOSS停止 */
        this.bossStop = false;
        /**boss种类 */
        this.bossType = 0;
    }
    BossManager.getBoss = function () {
        if (this._boss == null) {
            this._boss = new BossManager();
        }
        return this._boss;
    };
    /**添加BOSS */
    BossManager.prototype.addBoss = function () {
        this.boss = new Boss();
        this.boss.bossInt(this.bossType);
        this.boss.x = 1000;
        this.boss.y = 640;
        if (this.bossType == 1) {
            this.bossHp = 800;
        }
        if (this.bossType == 2) {
            this.bossHp = 1200;
        }
        if (this.bossType == 3) {
            this.bossHp = 1200;
        }
        SceneManager.getInstance().currentScene.addChild(this.boss);
    };
    BossManager._boss = null;
    return BossManager;
}());
__reflect(BossManager.prototype, "BossManager");
//# sourceMappingURL=BossManager.js.map