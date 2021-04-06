class Key extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
		this.addListener(this, egret.Event.ENTER_FRAME,this.update,this);
	}
	/**左键 */
	private btnLeft:eui.Button;
	/**左键范围 */
	private groupLeft:eui.Group;
	/**右键 */
	private btnRight:eui.Button;
	/**右键范围 */
	private groupRight:eui.Group;
	/**技能1按键 */
	private skill1:eui.Image;
	/**技能2按键 */
	private skill2:eui.Image;
	/**技能3按键 */
	private skill3:eui.Image;
	/**玩家血条 */
	private fighterHp:eui.ProgressBar;
	/**BOSS血条 */
	private bossHp:eui.ProgressBar;
	/**返回按钮 */
	private back:eui.Button;
	/**音量控制按钮 */
	private setMusic:eui.ToggleButton;
	/**暂停按钮 */
	private stopPk:eui.Button;

	
	public keyInit()
	{
		this.skinName = "key";
		KeyManager.getRocker().gold = 0;
		SoundManager.instance.stopBgMusic();
		
		this.stopPk.touchEnabled = true;
		this.setMusic.touchEnabled = true;
		this.back.touchEnabled = true;
		this.skill1.touchEnabled = true;
		this.skill2.touchEnabled = true;
		this.skill3.touchEnabled = true;
		//音量控制按钮装态
		if(SoundManager.instance.isPlay == false)
		{
			this.setMusic.selected = true;
		}
		if(SoundManager.instance.isPlay == true)
		{
			this.setMusic.selected = false;
			SoundManager.instance.startBgMusic("pkMusicBg_mp3");
		}
		this.fighterHp.value = PlayerManager.getPlayer().fighterHp;
		this.bossHp.value = BossManager.getBoss().bossHp;
		this.addListener(this.btnLeft, egret.TouchEvent.TOUCH_BEGIN, this.leftBegin, this);
		this.addListener(this.groupLeft, egret.TouchEvent.TOUCH_END, this.leftEnd, this);
		this.addListener(this.btnRight, egret.TouchEvent.TOUCH_BEGIN, this.rightBegin, this);
		this.addListener(this.groupRight, egret.TouchEvent.TOUCH_END, this.rightEnd, this);

		this.addListener(this.skill1, egret.TouchEvent.TOUCH_BEGIN, this.skill1Begin, this);
		this.addListener(this.skill2, egret.TouchEvent.TOUCH_BEGIN, this.skill2Begin, this);
		this.addListener(this.skill3, egret.TouchEvent.TOUCH_BEGIN, this.skill3Begin, this);
		
		this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);
		this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
		this.addListener(this.stopPk, egret.TouchEvent.TOUCH_TAP, this.stopPkTap, this);
	}
	private backTap()
	{
		if(this.parent != null)
		{
			this.parent.removeChild(this);
			SceneManager.getInstance().addScene(new Adventure());
		}
	}
	private stopPkTap()
	{
		Message.instance.send(MsgCMD.GAME_STOP);
		this.stopPk.touchEnabled = false;
		this.back.touchEnabled = false;
		this.setMusic.touchEnabled = false;
		this.skill1.touchEnabled = false;
		this.skill2.touchEnabled = false;
		this.skill3.touchEnabled = false;
		SoundManager.instance.stopBgMusic();
		SceneManager.getInstance().currentScene.addChild(new StopPk());
	}

	private setMusicTap()
	{
		if(this.setMusic.selected == false)
		{
			SoundManager.instance.startBgMusic("pkMusicBg_mp3");
			SoundManager.instance.isPlay = true;
		}
		if(this.setMusic.selected == true)
		{
			SoundManager.instance.stopBgMusic();
			SoundManager.instance.isPlay = false;
		}
	}
	private leftBegin()
	{
		Message.instance.send(MsgCMD.KEY_LEFTBEGIN);
	}
	private leftEnd()
	{
		Message.instance.send(MsgCMD.KEY_LEFTEND);
	}
	private rightBegin()
	{
		Message.instance.send(MsgCMD.KEY_RIGHTBEGIN);
	}
	private rightEnd()
	{
		Message.instance.send(MsgCMD.KEY_RIGHTEND);
	}
	private skill1Begin()
	{
		if(this.skill1.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false) 
		{
			Message.instance.send(MsgCMD.KEY_SKILL1);
			this.skill1.alpha = 0.4;
			this.cdOne = 180;
		}
	}
	private skill2Begin()
	{
		if(this.skill2.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false)
		{
			Message.instance.send(MsgCMD.KEY_SKILL2);
			this.skill2.alpha = 0.4;
			this.cdTwo = 360;
		}
	}
	private skill3Begin()
	{
		if(this.skill3.alpha == 1 && PlayerManager.getPlayer().fighter.isRelease == false)
		{
			Message.instance.send(MsgCMD.KEY_SKILL3);
			this.skill3.alpha = 0.4;
			this.cdThree = 600;
		}
	}
	/**技能1CD */
	private cdOne:number = 0;
	/**技能2CD */
	private cdTwo:number = 0;
	/**技能3CD */
	private cdThree:number = 0;

	public update()
	{
		if(this.stopPk.touchEnabled == false)
		{
			return;
		}
		if(PlayerManager.getPlayer().fighter.fighterType == 1)
		{
			this.fighterHp.value = PlayerManager.getPlayer().fighterHp * 1/8;
		}
		if(PlayerManager.getPlayer().fighter.fighterType == 2)
		{
			this.fighterHp.value = PlayerManager.getPlayer().fighterHp * 1/12;
		}
		if(BossManager.getBoss().bossType == 1)
		{
			this.bossHp.value = BossManager.getBoss().bossHp * 1/8;
		}
		if(BossManager.getBoss().bossType == 2)
		{
			this.bossHp.value = BossManager.getBoss().bossHp * 1/12;
		}	
		if(BossManager.getBoss().bossType == 3)
		{
			this.bossHp.value = BossManager.getBoss().bossHp * 1/12;
		}	

		if(this.skill1.alpha == 0.4)
		{
			this.cdOne -= 1;
			if(this.cdOne < 0)
			{
				this.skill1.alpha = 1;
			}
		}

		if(this.skill2.alpha == 0.4)
		{
			this.cdTwo -= 1;
			if(this.cdTwo < 0)
			{
				this.skill2.alpha = 1;
			}
		}

		if(this.skill3.alpha == 0.4)
		{
			this.cdThree -= 1;
			if(this.cdThree < 0)
			{
				this.skill3.alpha = 1;
			}
		}

		if(this.fighterHp.value >= 0 && this.bossHp.value <= 0 && this.first == false)
		{
			if(BossManager.getBoss().bossType == 1)
			{
				egret.localStorage.setItem("Level2","Two")
			}

			if(BossManager.getBoss().bossType == 2)
			{
				egret.localStorage.setItem("Level3","Three")
			}

			Message.instance.send(MsgCMD.GAME_STOP);
			this.stopPk.touchEnabled = false;
			this.back.touchEnabled = false;
			this.setMusic.touchEnabled = false;
			this.skill1.touchEnabled = false;
			this.skill2.touchEnabled = false;
			this.skill3.touchEnabled = false;

			KeyManager.getRocker().gold = this.fighterHp.value * 3;

			SceneManager.getInstance().currentScene.addChild(new Success());

			this.first = true;
		}

		if(this.bossHp.value >=0 && this.fighterHp.value <= 0 && this.first == false)
		{
			Message.instance.send(MsgCMD.GAME_STOP);
			this.stopPk.touchEnabled = false;
			this.back.touchEnabled = false;
			this.setMusic.touchEnabled = false;
			this.skill1.touchEnabled = false;
			this.skill2.touchEnabled = false;
			this.skill3.touchEnabled = false;

			SceneManager.getInstance().currentScene.addChild(new Fail());

			this.first = true;
		}
	}
	private first:boolean = false;

	recvMsg(cmd:number, date:any)
	{
		switch(cmd)
		{
			case MsgCMD.GAME_CONTINUE:
			this.stopPk.touchEnabled = true;
			this.setMusic.touchEnabled = true;
			this.back.touchEnabled = true;
			this.skill1.touchEnabled = true;
			this.skill2.touchEnabled = true;
			this.skill3.touchEnabled = true;
			if(SoundManager.instance.isPlay == true)
			{
				SoundManager.instance.startBgMusic("pkMusicBg_mp3");
			}
			break;
		}
	}
}