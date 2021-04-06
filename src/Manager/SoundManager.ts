class SoundManager 
{
	private static _instance:SoundManager;

	public static get instance():SoundManager
	{
		if( this._instance == null )
		{
			this._instance = new SoundManager();
		}
		return this._instance;
	}

	private bgSound:egret.Sound;
	private bgSoundChannel:egret.SoundChannel;

	public constructor() 
	{
			
	}

	public startBgMusic( key:string ):void{

		this.stopBgMusic();
		RES.getResAsync( key , this.loadBgMusicHandler , this );
	}

	private loadBgMusicHandler( sound:egret.Sound , url:string ):void{

		this.stopBgMusic();
		this.bgSound = sound;
		this.bgSound.type = egret.Sound.MUSIC;
		this.bgSoundChannel = this.bgSound.play( 0 , 0 );
		this.bgSoundChannel.addEventListener( egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
	}

	public stopBgMusic():void{

		if( this.bgSound )
		{
			this.bgSound = null;
		}
		if( this.bgSoundChannel )
		{
			this.bgSoundChannel.stop();
			this.bgSoundChannel.removeEventListener( egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
			this.bgSoundChannel = null;
		}
	}

	private onSoundComplete(event:egret.Event):void 
	{
        egret.log("bgSoundComplete");
    }

	public playEffect( key:string ):void{

		RES.getResAsync( key , this.loadEffectHandler , this );
	}

	private loadEffectHandler( sound:egret.Sound , url:string ):void{

		sound.type = egret.Sound.EFFECT;
		sound.play( 0 , 1 );
	}

	/**音乐是否播放 */
	public isPlay:boolean = true;
}