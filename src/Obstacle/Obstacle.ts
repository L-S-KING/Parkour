/**
 * 障碍物
 */
class Obstacle extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**障碍物 */
	public obstacle:egret.Bitmap = null;
	/**障碍物种类 */
	private obstacleType:number = 0;
	/**障碍物速度 */
	private obstacleSpeed:number = 8;
	/**是否滑行 */
	private isSlide:boolean = false;
	/**是否冲刺 */
	private isSprint:boolean = false;
	/**障碍物初始化 */
	public obstacleInit()
	{
		this.obstacleType = Math.floor(Math.random() * 5 + 1);
		this.obstacle = new egret.Bitmap();
		this.obstacle.texture = RES.getRes("obstacle" + this.obstacleType + "_png");
		this.obstacle.anchorOffsetX = this.obstacle.width * 0.5;
		this.obstacle.anchorOffsetY = this.obstacle.height * 0.5;
		this.addChild(this.obstacle);

		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.PLAYER_SLIDE,this);
		this.addMessage(MsgCMD.PLAYER_STOPSLIDE,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
	}
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
			this.obstacleSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		else if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.obstacleSpeed = 8;
		}
		this.x -= this.obstacleSpeed;
		
		if(this.x < -300)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		//玩家与障碍物的碰撞
		if(Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.obstacle.width) * 0.5 
		&& Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.obstacle.height) * 0.5
		&& PlayerManager.getPlayer().player.x - PlayerManager.getPlayer().player.player.width * 0.2 < this.x)
		{
			//玩家不是冲刺状态
			if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.isSlide == false)
			{
				Message.instance.send(MsgCMD.PLAYER_BACK);
			}
			//玩家是冲刺状态
			if(PlayerManager.getPlayer().player.isSprint == true)
			{
				if(this.parent != null)
				{
					KeyManager.getRocker().parkour.performance += 40;
					this.parent.removeChild(this);
				}
			}
		}
		if(PlayerManager.getPlayer().player.x + PlayerManager.getPlayer().player.width * 0.4 > this.x - this.obstacle.width * 0.5 
		&& PlayerManager.getPlayer().player.x - PlayerManager.getPlayer().player.width * 0.4 < this.x + this.obstacle.width * 0.5 
		&& PlayerManager.getPlayer().player.y > this.y)
		{
			PlayerManager.getPlayer().player.jumpTimes = 0;
		}
		//流星与障碍物的碰撞
		for(let i=0;i<MeteorManager.getMeteor().meteorArray.length;i++)
		{
			if(Math.abs(MeteorManager.getMeteor().meteorArray[i].x - this.x) < (MeteorManager.getMeteor().meteorArray[i].meteor.width + this.obstacle.width) * 0.4
			&& Math.abs(MeteorManager.getMeteor().meteorArray[i].y - this.y) < (MeteorManager.getMeteor().meteorArray[i].meteor.height + this.obstacle.height) * 0.5
			&& MeteorManager.getMeteor().meteorArray[i].isMeteor == true)
			{
				MeteorManager.getMeteor().meteorArray[i].downSpeed = 0;
				if(this.parent != null)
				{
					KeyManager.getRocker().parkour.performance += 30;
					this.parent.removeChild(this);
				}
			}
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.obstacleSpeed = 8;
			break;
			case MsgCMD.PLAYER_DEATH:
			this.obstacleSpeed = 0;
			break;
			case MsgCMD.PLAYER_SLIDE:
			this.isSlide = true;
			break;
			case MsgCMD.PLAYER_STOPSLIDE:
			this.isSlide = false;
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