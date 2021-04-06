/**
 * 冒险模式
 */
class Adventure extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);

	}
	/**返回按钮 */
	private btnBack:eui.Button;
	/**开始闯关 */
	private btnStart:eui.Button;
	/**格斗家 */
	private fighter:egret.Bitmap = null;
	
	/**覆盖图片 */
	private fighterCover:egret.Bitmap;
	/**格斗人物锁 */
	private fighterLock:eui.Image;
	/**音量控制按钮 */
	private setMusic:eui.ToggleButton;
	/**第一关 */
	private level1:eui.Image;
	/**第二关 */
	private level2:eui.Image;
	/**第三关 */
	private level3:eui.Image;
	/**第二关锁 */
	private lockLevel2:eui.Image;
	/**第三关锁 */
	private lockLevel3:eui.Image 


	private init()
	{
		this.skinName = "adventure";

		//音量控制按钮装态
		if(SoundManager.instance.isPlay == false)
		{
			this.setMusic.selected = true;
		}
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("pkMusic_mp3")
			this.setMusic.selected = false;
		}
		this.fighterCover = new egret.Bitmap();
		this.fighterCover.texture = RES.getRes("fighterBg_png")
		this.addChild(this.fighterCover);
		this.fighterCover.x = 682;
		this.fighterCover.y = 130;
		this.fighterCover.touchEnabled = true;
		this.btnStart.touchEnabled = true;

		PlayerManager.getPlayer().fighterType = 1;
		BossManager.getBoss().bossType = 1;
		this.level1.alpha = 1;
		this.level2.alpha = 0.5;
		this.level3.alpha = 0.5;
		if(egret.localStorage.getItem("BuyFive"))
		{
			this.fighterLock.alpha = 0;
		}

		if(egret.localStorage.getItem("Level2"))
		{
			this.lockLevel2.alpha = 0;
		}

		if(egret.localStorage.getItem("Level3"))
		{
			this.lockLevel3.alpha = 0;
		}

		this.addListener(this.btnBack, egret.TouchEvent.TOUCH_TAP, this.btnBackTap, this);

		this.addListener(this.btnStart, egret.TouchEvent.TOUCH_TAP, this.btnStartTap, this);


		this.addListener(this.fighterCover, egret.TouchEvent.TOUCH_TAP, this.coverTap, this);

		this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);

		this.addListener(this.level1, egret.TouchEvent.TOUCH_TAP, this.level1Tap, this);

		this.addListener(this.level2, egret.TouchEvent.TOUCH_TAP, this.level2Tap, this);

		this.addListener(this.level3, egret.TouchEvent.TOUCH_TAP, this.level3Tap, this);

	}
	private coverTap()
	{
		if(this.fighterCover.x == 682)
		{
			this.fighterCover.x = 280;
			PlayerManager.getPlayer().fighterType = 2;
			if(this.fighterLock.alpha == 1)
			{
				this.btnStart.touchEnabled = false;
			}
			else
			{
				this.btnStart.touchEnabled = true;
			}
		}
		else if(this.fighterCover.x == 280)
		{
			this.fighterCover.x = 682;
			PlayerManager.getPlayer().fighterType = 1;
			this.btnStart.touchEnabled = true;
		}
	}
	
	private setMusicTap()
	{
		if(this.setMusic.selected == false)
		{
			SoundManager.instance.startBgMusic("pkMusic_mp3");
			SoundManager.instance.isPlay = true;
		}
		if(this.setMusic.selected == true)
		{
			SoundManager.instance.stopBgMusic();
			SoundManager.instance.isPlay = false;
		}
	}

	private btnBackTap()
	{
		SoundManager.instance.stopBgMusic();
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("bgMusic_mp3")
		}
		SceneManager.getInstance().addScene(new MainMenu());
	}

	private btnStartTap()
	{
		SoundManager.instance.stopBgMusic();
		SceneManager.getInstance().addScene(new Level2());
	}

	private level1Tap()
	{
		BossManager.getBoss().bossType = 1;
		this.level1.alpha = 1;
		this.level2.alpha = 0.5;
		this.level3.alpha = 0.5;
	}

	private level2Tap()
	{
		if(this.lockLevel2.alpha == 0)
		{
			BossManager.getBoss().bossType = 2;
			this.level1.alpha = 0.5;
			this.level2.alpha = 1;
			this.level3.alpha = 0.5;
		}
	}

	private level3Tap()
	{
		if(this.lockLevel3.alpha == 0)
		{
			BossManager.getBoss().bossType = 3;
			this.level1.alpha = 0.5;
			this.level2.alpha = 0.5;
			this.level3.alpha = 1;
		}
	}

	recvMsg(cmd:number, data:any)
	{

	}
}