class GameOver extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private over:eui.Button;

	private init()
	{
		if(PlayerManager.getPlayer().playerType == 1)
		{
			this.skinName = "endOne";
		}

		if(PlayerManager.getPlayer().playerType == 2)
		{
			this.skinName = "endTwo";
		}

		if(PlayerManager.getPlayer().playerType == 3)
		{
			this.skinName = "endThree";
		}

		if(PlayerManager.getPlayer().playerType == 4)
		{
			this.skinName = "endFour";
		}
		
		this.addListener(this.over, egret.TouchEvent.TOUCH_TAP, this.overTap, this);

	}

	private overTap()
	{
		MeteorManager.getMeteor().meteorArray = [];
		ObstacleManager.getObstacle().obstacleArray = [];
		BlameManager.getBlame().blameArray = [];
		CoinManager.getCoin().coin = null;
		SceneManager.getInstance().addScene(new End());
	}
}