/**
 * 地板
 */
class Floor extends BaseModule implements IMessage{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
		this.floorType = Math.floor(Math.random() * 2 + 1);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**地板速度 */
	private floorSpeed:number = 0;
	/**地板 */
	public floor:egret.Bitmap = null;
	/**地板种类 */
	private floorType:number = 0;
	/**地板X位置 */
	private floorX:number = -168;
	/**创建块数 */
	public setFloorNum:number = 0;
	/**地板数组 */
	private floorArray:egret.Bitmap[] = [];

	/**横向间隔距离 */
	private distanceX:number = 0;
	/**横向间隔概率 */
	private randomX:number = 0;
	/**纵向距离 */
	private distanceY:number = 0;
	/**纵向间隔概率 */
	private randomY:number = 0;
	/** */
	private time:number = 160;
	/**生成随机概率 */
	private set:number = 0;
	/**道具生成时间 */
	private itemTime:number = 0;

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
		this.itemTime += 1;
		this.time -= 1;
		if(PlayerManager.getPlayer().player.isSprint == true)
		{
			this.floorSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.floorSpeed = 8;
		}
		//地板横向间隔距离
		this.randomX = Math.random();
		this.randomY = Math.random();
		if(this.randomX < 0.8 || this.time >= 0)
		{
			this.distanceX = 310;
		}
		else if(this.randomX >= 0.8 && this.randomX < 0.9)
		{
			this.distanceX = 600;
		}
		else if(this.randomX >= 0.9)
		{
			this.distanceX = 800;
		}
		if(this.randomY < 0.8 || this.time >= 0)
		{
			this.distanceY = 0;
		}
		else if(this.randomY >= 0.8)
		{
			this.distanceY = 80;
		}
		
		if(this.setFloorNum <= 8)
		{
			this.floor = new egret.Bitmap();
			this.floor.texture = RES.getRes("floor" + this.floorType + "_png");
			this.floor.anchorOffsetX = this.floor.width * 0.5;
			this.floor.anchorOffsetY = this.floor.height * 0.5;
			this.addChild(this.floor);
			this.floorArray.push(this.floor);

			this.floor.x = this.floorX + this.distanceX;
			this.floor.y = 622 - this.distanceY;
			this.floorX = this.floor.x;
			this.set = Math.random() * 1;

			if(this.itemTime % 720 != 0)
			{
				//添加金币
				if(this.set < 0.5)
				{
					//钱币种类
					let cointype:number = Math.floor(Math.random() * 3 + 1);
					//钱币X位置
					let coinX:number = this.floor.x - this.floor.width * 0.3;
					//钱币Y位置
					let coinY:number = this.floor.y - 200;
					CoinManager.getCoin().setCoin(cointype,4,coinX,coinY, 36, 18);
				}
				//添加怪
				else if(this.set > 0.5 && this.set <= 0.7 && this.setFloorNum > 6)  
				{
					//怪的种类
					let blameType:number = Math.floor(Math.random() * 2 + 1)
					//怪的X位置
					let blamex:number = this.floor.x - this.floor.width * 0.2;
					//怪的Y位置
					let blameY:number = this.floor.y - this.floor.height * 0.5 - 30; 
					BlameManager.getBlame().addBlame(blameType,blamex,blameY);				
				}
				//添加障碍物
				else if(this.set > 0.8 && this.setFloorNum > 6)
				{
					//障碍物种类
					let obstacleType:number = Math.floor(Math.random() * 8 + 1);
					//障碍物的X位置
					let obstacleX:number = this.floor.x;
					//障碍物的Y位置
					let obstacleY:number = this.floor.y - this.floor.height * 0.5 - 200;
					ObstacleManager.getObstacle().addObstacle(obstacleX,obstacleY);
				}
			}
			
			this.setFloorNum += 1;
		}
		//添加道具
		if(this.itemTime % 720 == 0)
		{
			let itemType:number = Math.floor(Math.random() * 3 + 1);
			ItemManager.getItem().addItem(itemType,this.floor.x,this.floor.y - 300);
		}
		
		//地板走出屏幕删除
		if(this.floorArray != null)
		{
			for(let i=0;i<this.floorArray.length;i++)
			{
				if(this.floorArray[i].x < -500)
				{
					this.removeChild(this.floorArray[i]);
					this.floorArray.splice(i,1);
					i--;
					this.floorX = this.floorArray[7].x;
					this.setFloorNum -= 1;
				}
			}
		}

		for(let i=0;i<this.floorArray.length;i++)
		{
			//地板的移动
			this.floorArray[i].x -= this.floorSpeed;
			//玩家与地板上面碰撞
			if(PlayerManager.getPlayer().player.y + PlayerManager.getPlayer().player.player.height*0.5 > (this.floorArray[i].y  - this.floor.height * 0.5)-5
			&& PlayerManager.getPlayer().player.y < this.floorArray[i].y 
			&& PlayerManager.getPlayer().player.isJumpState == true 
			&& PlayerManager.getPlayer().player.jumpSpeed <= 0)
			{
				if(PlayerManager.getPlayer().player.x  > this.floorArray[i].x - this.floor.width * 0.5 - 5
				&& PlayerManager.getPlayer().player.x  < this.floorArray[i].x + this.floor.width * 0.5 + 5)
				{
					PlayerManager.getPlayer().player.y = this.floorArray[i].y - this.floor.height * 0.45-PlayerManager.getPlayer().player.player.height*0.5;
					PlayerManager.getPlayer().player.jumpSpeed = 0;
					PlayerManager.getPlayer().player.isJumpState = false;
					PlayerManager.getPlayer().player.jumpTimes = 2;
					PlayerManager.getPlayer().player.jumpFrame = 1;
					PlayerManager.getPlayer().player.isFloor = true;
				}
			}
			//玩家与地板左侧碰撞
			if(Math.abs((this.floorArray[i].x - this.floor.width * 0.4) - (PlayerManager.getPlayer().player.x + PlayerManager.getPlayer().player.player.width * 0.4)) < (20 + 20) * 0.5
			&& Math.abs(this.floorArray[i].y - PlayerManager.getPlayer().player.y) < (PlayerManager.getPlayer().player.player.height + this.floor.height) * 0.4
			&& this.floorArray[i].x > PlayerManager.getPlayer().player.x)
			{
				Message.instance.send(MsgCMD.FLOOR_LEFT);
			}
			//玩家走出下落
			if(PlayerManager.getPlayer().player.x  > this.floorArray[i].x + this.floor.width * 0.45)
			{
				Message.instance.send(MsgCMD.PLAYER_DOWNFLOOR);
			}

			//流星与地板的碰撞
			if(MeteorManager.getMeteor().meteorArray.length > 0)
			{
				for(let j=0;j<MeteorManager.getMeteor().meteorArray.length;j++)
				{
					if(Math.abs(MeteorManager.getMeteor().meteorArray[j].x - this.floorArray[i].x) < (MeteorManager.getMeteor().meteorArray[j].meteor.width + this.floor.width) * 0.5
					&& Math.abs(MeteorManager.getMeteor().meteorArray[j].y - this.floorArray[i].y) < (MeteorManager.getMeteor().meteorArray[j].meteor.height + this.floor.height) * 0.5
					&& MeteorManager.getMeteor().meteorArray[j].isMeteor == true && MeteorManager.getMeteor().meteorArray[j].y < this.floorArray[i].y - this.floor.height * 0.5)
					{
						MeteorManager.getMeteor().meteorArray[j].downSpeed = 0;
					}
				}
			}
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.floorSpeed = 8;
			break;
			case MsgCMD.PLAYER_DEATH:
			this.floorSpeed = 0;
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