class Level1 extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this)
	}
	public init()
	{
		this.addChild(new Bg());
		this.addChild(new Floor());
		PlayerManager.getPlayer().addPlayer();
		KeyManager.getRocker().addParkour();
	}
	private gameOver:GameOver = null;
	public update()
	{
		if(PlayerManager.getPlayer().player.playerDeath == true)
		{
			if(this.gameOver == null)
			{
				this.gameOver = new GameOver();
				SceneManager.getInstance().currentScene.addChild(this.gameOver);
			}
		}
	} 
}