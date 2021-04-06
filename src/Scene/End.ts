/**
 * 游戏结束界面
 */
class End extends BaseModule 
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
	}
	/**返回主界面 */
	private back:eui.Button;
	/**再来一局 */
	private again:eui.Button;
	/**历史最高分文本框 */
	private highestScore:eui.Label;
	/**本局总分文本框 */
	private totalScore:eui.Label;
	/**本局距离文本框 */
	private distance:eui.Label;
	/**本局表现分文本框 */
	private performanceScore:eui.Label;
	/**本局金币数文本框 */
	private goldNum:eui.Label;
	/**历史最高图片 */
	private highest:eui.Image;
	/**玩家 */
	private player:egret.Bitmap = null;
	/**历史最高分 */
	private score:number = 0;
	/**本局总分 */
	private totalGrade:number = 0;
	/**金币总量 */
	private totalGold:number = 0;

	private init()
	{
		this.skinName = "end"

		this.player = new egret.Bitmap();
		this.player.texture = RES.getRes("player" + PlayerManager.getPlayer().playerType + "_png");
		this.addChild(this.player);
		this.player.anchorOffsetX = this.player.width * 0.5;
		this.player.anchorOffsetY = this.player.height * 0.5;
		this.player.x = 950;
		this.player.y = 360;

		//本局总分
		this.totalGrade = KeyManager.getRocker().parkour.grade + KeyManager.getRocker().parkour.performance * 10 + KeyManager.getRocker().parkour.metre * 10;

		if(egret.localStorage.getItem("Score"))
		{
			this.score = Number(egret.localStorage.getItem("Score"));
		}
		if(this.totalGrade >= this.score)
		{
			this.score = this.totalGrade;
			this.highest.alpha = 1;
		}
		else if(this.totalGrade < this.score)
		{
			this.score = this.score;
		}

		this.highestScore.text = "" + this.score;
		this.totalScore.text = "" + this.totalGrade;
		this.distance.text = "" + KeyManager.getRocker().parkour.metre;
		if(PlayerManager.getPlayer().playerType == 1)
		{
			this.goldNum.text = "" + KeyManager.getRocker().gold;
		}
		if(PlayerManager.getPlayer().playerType == 2)
		{
			this.goldNum.text = "" + KeyManager.getRocker().gold * 2;
		}
		if(PlayerManager.getPlayer().playerType == 3)
		{
			this.goldNum.text = "" + KeyManager.getRocker().gold * 3;
		}
		if(PlayerManager.getPlayer().playerType == 4)
		{
			this.goldNum.text = "" + KeyManager.getRocker().gold * 4;
		}
		this.performanceScore.text = "" + KeyManager.getRocker().parkour.performance;

		egret.localStorage.setItem("Score",this.highestScore.text);

		this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);

		this.addListener(this.again, egret.TouchEvent.TOUCH_TAP, this.againTap, this);

		if(egret.localStorage.getItem("Gold"))
		{
			this.totalGold = Number(egret.localStorage.getItem("Gold"));
		}
		else 
		{
			this.totalGold = 0;	
		}
		if(PlayerManager.getPlayer().playerType == 1)
		{
			this.totalGold += KeyManager.getRocker().gold;
		}
		if(PlayerManager.getPlayer().playerType == 2)
		{
			this.totalGold += KeyManager.getRocker().gold * 2;
		}
		if(PlayerManager.getPlayer().playerType == 3)
		{
			this.totalGold += KeyManager.getRocker().gold * 3;
		}
		if(PlayerManager.getPlayer().playerType == 4)
		{
			this.totalGold += KeyManager.getRocker().gold * 4;
		}
		
		egret.localStorage.setItem("Gold","" + this.totalGold );
	}

	private backTap()
	{
		SoundManager.instance.stopBgMusic();
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("bgMusic_mp3");
		}
		SceneManager.getInstance().addScene(new MainMenu());
	}

	private againTap()
	{
		SoundManager.instance.stopBgMusic();
		if(SoundManager.instance.isPlay == true)
		{
			SoundManager.instance.startBgMusic("bgMusic_mp3");
		}
		SceneManager.getInstance().addScene(new Classic());
	}
}