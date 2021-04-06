/**
 * 跑酷道具
 */
class Item extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME,this.update, this);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**道具 */
	private item:egret.Bitmap = null;
	/**道具种类 */
	private itemType:number = 0;
	/**道具速度 */
	private itemSpeed:number = 0;
	/**道具初始化 */
	public itemInit(type:number)
	{
		this.itemType = type;
		this.item = new egret.Bitmap();
		this.item.texture = RES.getRes("item" + this.itemType + "_png");
		this.item.anchorOffsetX = this.item.width * 0.5;
		this.item.anchorOffsetY = this.item.height * 0.5;
		this.addChild(this.item);

		//注册消息
		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
	}
	private meteorTime:number = 0;
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
			this.itemSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		else if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.itemSpeed = 8;
		}
		this.x -= this.itemSpeed;
		//道具与玩家的碰撞
		if(Math.abs(this.x - PlayerManager.getPlayer().player.x) < (this.item.width + PlayerManager.getPlayer().player.player.width) * 0.5
		&& Math.abs(this.y - PlayerManager.getPlayer().player.y) < (this.item.height + PlayerManager.getPlayer().player.player.height) * 0.5)
		{
			if(this.parent != null)
			{
				KeyManager.getRocker().parkour.performance += 20;
				this.parent.removeChild(this);
			}
			if(this.itemType == 1)
			{
				Message.instance.send(MsgCMD.ITEM_MAGNET);
			}
			if(this.itemType == 2)
			{
				this.addEventListener(egret.Event.ENTER_FRAME, this.down, this);
				if(PlayerManager.getPlayer().player.x == 640)
				{
					Message.instance.send(MsgCMD.PLAYER_STOPGO);
				}
			}
			if(this.itemType == 3)
			{
				Message.instance.send(MsgCMD.ITEM_SPRINT);
			}
			if(this.itemType == 4)
			{ 
				Message.instance.send(MsgCMD.ITEM_SHIELD);
			}
		}

		for(let i=0;i<ObstacleManager.getObstacle().obstacleArray.length;i++)
		{
			if(Math.abs(this.x - ObstacleManager.getObstacle().obstacleArray[i].x) < (this.item.width + ObstacleManager.getObstacle().obstacleArray[i].obstacle.width) * 0.5)
			{
				if(ObstacleManager.getObstacle().obstacleArray[i].parent != null)
				{
					ObstacleManager.getObstacle().obstacleArray[i].parent.removeChild(ObstacleManager.getObstacle().obstacleArray[i]);
					ObstacleManager.getObstacle().obstacleArray.splice(i,1);
					i --;
				}
			}
		}
	}

	public down()
	{
		if(PlayerManager.getPlayer().player.playerDeath == true)
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.down,this);
		}
		this.meteorTime += 1;
		if(this.meteorTime % 30 == 0)
		{
			MeteorManager.getMeteor().addMeteor();
		}
		if(this.meteorTime >= 240)
		{
			this.meteorTime = 0;
			this.removeEventListener(egret.Event.ENTER_FRAME,this.down,this);
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.itemSpeed = 8;
			break;
			case MsgCMD.PLAYER_DEATH:
			this.itemSpeed = 0;
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