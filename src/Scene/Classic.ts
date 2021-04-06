/**
 * 经典模式
 */
class Classic extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**金币总量 */
	private totalGold:eui.Label;
	/**左移 */
	private btnLeft:eui.Button;
	/**右移 */
	private btnRight:eui.Button;
	/**开始游戏 */
	private btnStart:eui.Button;
	/**返回 */
	private btnBack:eui.Button;
	/**人物 */
	private player:eui.Group;
	/**速度 */
	private speed:number = 0;
	/**时间 */
	private time:number = 0;
	/**开局冲刺购买 */
	private buyOne:eui.Button;
	/**护盾购买 */
	private buyTwo:eui.Button;
	/**磁铁购买 */
	private buyThree:eui.Button;
	/**金币数量 */
	private goldNum:number = 0;
	/**第二个人物锁 */
	private lockTwo:eui.Image;
	/**第三个人物锁 */
	private lockThree:eui.Image;
	/**第四个人物锁 */
	private lockFour:eui.Image;
	/**音量控制按钮 */
	private setMusic:eui.ToggleButton;

	private init()
	{
		this.skinName = "classic";

		//音量控制按钮装态
		if(SoundManager.instance.isPlay == false)
		{
			this.setMusic.selected = true;
		}
		if(SoundManager.instance.isPlay == true)
		{
			this.setMusic.selected = false;
		}

		if(egret.localStorage.getItem("Gold"))
		{
			this.goldNum = Number(egret.localStorage.getItem("Gold"));
		}
		else 
		{
			this.goldNum = 0;	
		}
		this.totalGold.text = "" + this.goldNum;
		egret.localStorage.setItem("Gold","" + this.goldNum );



		if(egret.localStorage.getItem("BuyTwo"))
		{
			this.lockTwo.alpha = 0;
		}

		if(egret.localStorage.getItem("BuyThree"))
		{
			this.lockThree.alpha = 0;
		}

		if(egret.localStorage.getItem("BuyFour"))
		{
			this.lockFour.alpha = 0;
		}

		this.addListener(this.btnBack, egret.TouchEvent.TOUCH_TAP, this.backTap, this);

		this.addListener(this.btnLeft, egret.TouchEvent.TOUCH_TAP, this.leftTap, this);

		this.addListener(this.btnRight, egret.TouchEvent.TOUCH_TAP, this.rightTap, this);

		this.addListener(this.btnStart, egret.TouchEvent.TOUCH_TAP, this.startTap, this);

		this.addListener(this.buyOne, egret.TouchEvent.TOUCH_TAP, this.buyOneTap, this);

		this.addListener(this.buyTwo, egret.TouchEvent.TOUCH_TAP, this.buyTwoTap, this);

		this.addListener(this.buyThree, egret.TouchEvent.TOUCH_TAP, this.buyThreeTap, this);

		this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);

	}

	private backTap()
	{
		PlayerManager.getPlayer().isBuySprint = false;
		PlayerManager.getPlayer().isBuyShiled = false;
		PlayerManager.getPlayer().isBuyMagnet = false;
		SceneManager.getInstance().addScene(new MainMenu());
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

	private buyOneTap()
	{
		if(this.goldNum >= 200)
		{
			this.goldNum -= 200;
			this.goldNum += KeyManager.getRocker().gold;
			this.totalGold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );
			PlayerManager.getPlayer().isBuySprint = true;
		}
	}

	private buyTwoTap()
	{
		if(this.goldNum >= 600)
		{
			this.goldNum -= 600;
			this.totalGold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );
			PlayerManager.getPlayer().isBuyShiled = true;
		}
	}

	private buyThreeTap()
	{
		if(this.goldNum >= 150)
		{
			this.goldNum -= 150;
			this.totalGold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );
			PlayerManager.getPlayer().isBuyMagnet = true;
		}
	}

	private leftTap()
	{
		if(this.player.x >= 50 && this.speed == 0)
		{
			this.speed = -10;
			this.time = 36;
		}
	}

	private rightTap()
	{
		if(this.player.x <= 410 && this.speed == 0)
		{
			this.speed = 10;
			this.time = 36;
		}
	}

	private startTap()
	{
		if(PlayerManager.getPlayer().playerType == 1)
		{
			SceneManager.getInstance().addScene(new Level1());
		}

		if(PlayerManager.getPlayer().playerType == 2 && this.lockTwo.alpha == 0)
		{
			SceneManager.getInstance().addScene(new Level1());
		}

		if(PlayerManager.getPlayer().playerType == 3 && this.lockThree.alpha == 0)
		{
			SceneManager.getInstance().addScene(new Level1());
		}

		if(PlayerManager.getPlayer().playerType == 4 && this.lockFour.alpha == 0)
		{
			SceneManager.getInstance().addScene(new Level1());
		}
	}

	private update()
	{
	
		this.time -= 1;
		this.player.x += this.speed;
		if(this.time <= 0)
		{
			this.speed = 0;
		}
		if(this.player.x <= 770 && this.player.x > 410)
		{
			PlayerManager.getPlayer().playerType = 1;
		}
		if(this.player.x <= 410 && this.player.x > 50)
		{
			PlayerManager.getPlayer().playerType = 2;
		}
		if(this.player.x <= 50 && this.player.x > -310)
		{
			PlayerManager.getPlayer().playerType = 3;
		}
		if(this.player.x <= -310 && this.player.x > -670)
		{
			PlayerManager.getPlayer().playerType = 4;
		}
	}
}