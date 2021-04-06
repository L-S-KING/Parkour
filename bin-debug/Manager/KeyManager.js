var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跑酷操作管理
 * 格斗操作管理
 */
var KeyManager = (function () {
    function KeyManager() {
        /**金币 */
        this.gold = 0;
        /**金币数量 */
        this.goldNum = 0;
        /**跑酷按键 */
        this.parkour = null;
        /**摇杆 */
        this.rocker = null;
        /**按键 */
        this.key = null;
        /**格斗停止 */
        this.pkStop = false;
    }
    KeyManager.getRocker = function () {
        if (this._key == null) {
            this._key = new KeyManager();
        }
        return this._key;
    };
    /**添加跑酷按键 */
    KeyManager.prototype.addParkour = function () {
        this.parkour = new Parkour();
        this.parkour.init();
        SceneManager.getInstance().currentScene.addChild(this.parkour);
    };
    /**添加摇杆 */
    KeyManager.prototype.addRocker = function () {
        this.rocker = new Rocker();
        this.rocker.rockerInit();
        SceneManager.getInstance().currentScene.addChild(this.rocker);
    };
    /**添加按键 */
    KeyManager.prototype.addKey = function () {
        this.key = new Key();
        this.key.keyInit();
        SceneManager.getInstance().currentScene.addChild(this.key);
    };
    KeyManager._key = null;
    return KeyManager;
}());
__reflect(KeyManager.prototype, "KeyManager");
//# sourceMappingURL=KeyManager.js.map