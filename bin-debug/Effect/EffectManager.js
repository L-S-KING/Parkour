var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectManager = (function () {
    function EffectManager() {
        /**特效 */
        this.effect = null;
        /**特效队列 */
        this.effectArray = [];
    }
    EffectManager.getEffect = function () {
        if (this._effect == null) {
            this._effect = new EffectManager();
        }
        return this._effect;
    };
    /**添加特效 */
    EffectManager.prototype.addEffect = function (type, effectX, effectY, level) {
        this.effect = new Effect();
        this.effect.effectInit(type);
        this.effect.x = effectX;
        this.effect.y = effectY;
        SceneManager.getInstance().currentScene.addChildAt(this.effect, level);
        this.effectArray.push(this.effect);
    };
    EffectManager._effect = null;
    return EffectManager;
}());
__reflect(EffectManager.prototype, "EffectManager");
//# sourceMappingURL=EffectManager.js.map