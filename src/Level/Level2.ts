class Level2 extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	public init()
	{
		this.addChild(new BossBg());
		BossManager.getBoss().addBoss();
		PlayerManager.getPlayer().addFighter();
		KeyManager.getRocker().addKey();
	}
}