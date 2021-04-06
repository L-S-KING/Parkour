class StopPk extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
	}
	/**继续游戏 */
	private continue:eui.Button;
	/**重新开始 */
	private again:eui.Button;
	/**返回主界面 */
	private menu:eui.Button;

	public init()
	{
		this.skinName = "stopBg"
		this.addListener(this.continue, egret.TouchEvent.TOUCH_TAP, this.continueTap, this);

		this.addListener(this.again, egret.TouchEvent.TOUCH_TAP, this.againTap, this);

		this.addListener(this.menu, egret.TouchEvent.TOUCH_TAP, this.menuTap, this)
	}

	private continueTap()
	{
		Message.instance.send(MsgCMD.GAME_CONTINUE);
		if(this.parent != null)
		{
			this.parent.removeChild(this);
		}
	}

	private againTap()
	{
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("pkMusicBg_mp3")
		}
		SceneManager.getInstance().addScene(new Level2());
	}

	private menuTap()
	{
		SoundManager.instance.stopBgMusic();
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("bgMusic_mp3");
		}
		SceneManager.getInstance().addScene(new MainMenu());
	}
}