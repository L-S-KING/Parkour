var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 障碍物管理类
 */
var ObstacleManager = (function () {
    function ObstacleManager() {
        /**障碍物 */
        this.obstacle = null;
        /**障碍物队列 */
        this.obstacleArray = [];
    }
    ObstacleManager.getObstacle = function () {
        if (this._obstacle == null) {
            this._obstacle = new ObstacleManager();
        }
        return this._obstacle;
    };
    /**添加障碍物 */
    ObstacleManager.prototype.addObstacle = function (posX, posY) {
        this.obstacle = new Obstacle();
        this.obstacle.obstacleInit();
        this.obstacle.x = posX;
        this.obstacle.y = posY;
        SceneManager.getInstance().currentScene.addChild(this.obstacle);
        this.obstacleArray.push(this.obstacle);
    };
    ObstacleManager._obstacle = null;
    return ObstacleManager;
}());
__reflect(ObstacleManager.prototype, "ObstacleManager");
//# sourceMappingURL=ObstacleManager.js.map