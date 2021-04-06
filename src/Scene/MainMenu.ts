/**
 * 游戏主界面
 */
class MainMenu extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);

		// this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**商城按钮 */
	private btnShop:eui.Button;
	/**经典模式按钮 */
	private btnClassic:eui.Button;
	/**冒险模式按钮 */
	private btnAdventure:eui.Button;
	/**音量控制按钮 */
	private setMusic:eui.ToggleButton;

	private init()
	{
		this.skinName = "menu";
		
		//音量控制按钮装态
		if(SoundManager.instance.isPlay == false)
		{
			this.setMusic.selected = true;
		}
		if(SoundManager.instance.isPlay == true)
		{
			this.setMusic.selected = false;
		}

		this.addListener(this.btnClassic, egret.TouchEvent.TOUCH_TAP, this.btnClassicTap, this);

		this.addListener(this.btnAdventure, egret.TouchEvent.TOUCH_TAP, this.btnAdventureTap, this);

		this.addListener(this.btnShop, egret.TouchEvent.TOUCH_TAP, this.btnShopTap, this);

		this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this)
	}

	private btnClassicTap()
	{
		SceneManager.getInstance().addScene(new Classic());
	}

	private btnAdventureTap()
	{
		SoundManager.instance.stopBgMusic();
		SceneManager.getInstance().addScene(new Adventure());
	}

	private btnShopTap()
	{
		SceneManager.getInstance().addScene(new Shop());
	}

	private setMusicTap()
	{

		if(this.setMusic.selected == false)
		{
			SoundManager.instance.startBgMusic("bgMusic_mp3");
			SoundManager.instance.isPlay = true;
		}
		if(this.setMusic.selected == true)
		{
			SoundManager.instance.stopBgMusic();
			SoundManager.instance.isPlay = false;
		}
	
	}
	
	recvMsg(cmd:number, data:any)
	{
		switch(cmd)
		{

		}
	}
}