/**
 * 流星
 */
class Meteor extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
		
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**流星 */
	public meteor:egret.Bitmap = null;
	/**流星速度 */
	public meteorSpeed:number = 0;
	/**是否存在流星 */
	public isMeteor:boolean = false;
	/**流星与地板碰撞 */
	private isTouch:boolean = false;
	/**流星初始化 */
	public meteorInit()
	{
		this.meteor = new egret.Bitmap();
		this.meteor.texture = RES.getRes("meteor_png");
		this.meteor.anchorOffsetX = this.meteor.width * 0.5;
		this.meteor.anchorOffsetY = this.meteor.height * 0.5;
		this.addChild(this.meteor);
		
		this.isMeteor = true;
		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
	}
	public downSpeed:number = 10;

	public update()
	{
		if(PlayerManager.getPlayer().player.playerDeath == true)
		{
			return;
		}
		if(this.gameStop == true)
		{
			return;
		}
		if(PlayerManager.getPlayer().player.isSprint == true)
		{
			this.meteorSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		else if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.meteorSpeed = 8;
		}
		this.y += this.downSpeed;
		this.x += this.downSpeed * 1.2;
		if(Math.abs(this.x - PlayerManager.getPlayer().player.x) < (this.meteor.width + PlayerManager.getPlayer().player.player.width) * 0.5
		&& Math.abs(this.y - PlayerManager.getPlayer().player.y) < (this.meteor.height + PlayerManager.getPlayer().player.player.height) * 0.5
		&& this.downSpeed == 0)
		{
			if(this.parent != null)
			{
				KeyManager.getRocker().parkour.performance += 40;
				this.parent.removeChild(this);
				this.isMeteor = false;
			}
		}
		if(this.x < 0 && this.parent != null)
		{
			this.parent.removeChild(this);
		}
		if(this.downSpeed == 0 )
		{
			this.x -= 8;
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.meteorSpeed = 8;
			break;

			case MsgCMD.PLAYER_DEATH:
			this.meteorSpeed = 0;
			break;

			case MsgCMD.GAME_STOP:
			this.gameStop = true;
			break;

			case MsgCMD.GAME_CONTINUE:
			this.gameStop = false;
			break;
		}
	}
}