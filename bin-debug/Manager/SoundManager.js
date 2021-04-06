var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        /**音乐是否播放 */
        this.isPlay = true;
    }
    Object.defineProperty(SoundManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SoundManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.startBgMusic = function (key) {
        this.stopBgMusic();
        RES.getResAsync(key, this.loadBgMusicHandler, this);
    };
    SoundManager.prototype.loadBgMusicHandler = function (sound, url) {
        this.stopBgMusic();
        this.bgSound = sound;
        this.bgSound.type = egret.Sound.MUSIC;
        this.bgSoundChannel = this.bgSound.play(0, 0);
        this.bgSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundManager.prototype.stopBgMusic = function () {
        if (this.bgSound) {
            this.bgSound = null;
        }
        if (this.bgSoundChannel) {
            this.bgSoundChannel.stop();
            this.bgSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.bgSoundChannel = null;
        }
    };
    SoundManager.prototype.onSoundComplete = function (event) {
        egret.log("bgSoundComplete");
    };
    SoundManager.prototype.playEffect = function (key) {
        RES.getResAsync(key, this.loadEffectHandler, this);
    };
    SoundManager.prototype.loadEffectHandler = function (sound, url) {
        sound.type = egret.Sound.EFFECT;
        sound.play(0, 1);
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map