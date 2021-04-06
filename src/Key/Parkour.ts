/**
 * 跑酷按键
 */
class Parkour extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**跳跃键 */
	private jump:eui.Button;
	/**下滑键 */
	private slide:eui.Button;
	/**下滑建范围 */
	private slideRange:eui.Group;
	/**暂停按钮 */
	private stopBtn:eui.Button;
	/**分数文本框 */
	private fraction:eui.Label;
	/**表现分数文本框 */
	private performanceScore:eui.Label;
	/**金币文本框 */
	private coinNum:eui.Label;
	/**距离文本框 */
	private distance:eui.Label;
	/**分数 */
	public grade:number = 0;
	/**米 */
	public metre:number = 0;
	/**表现分数 */
	public performance:number = 0;
	/**音量控制按钮 */
	private setMusic:eui.ToggleButton;
	
	public init()
	{
		this.skinName = "parkour";
		//音量控制按钮装态
		if(SoundManager.instance.isPlay == false)
		{
			this.setMusic.selected = true;
		}
		if(SoundManager.instance.isPlay == true)
		{
			this.setMusic.selected = false;
			SoundManager.instance.startBgMusic("runMusic_mp3");
		}
		KeyManager.getRocker().gold = 0;
		this.addListener(this.jump, egret.TouchEvent.TOUCH_BEGIN, this.jumpBegin, this);
		this.addListener(this.slide, egret.TouchEvent.TOUCH_BEGIN, this.slideBegin, this);
		this.addListener(this.slideRange, egret.TouchEvent.TOUCH_END, this.slideEnd, this);
		this.addListener(this.stopBtn, egret.TouchEvent.TOUCH_BEGIN, this.stopBegin, this);
		this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);

		this.addMessage(MsgCMD.PLAYER_DEATH, this);
		this.addMessage(MsgCMD.GAME_CONTINUE, this);
	}
	private jumpBegin()
	{
		Message.instance.send(MsgCMD.PLAYER_JUMP);
	}
	private slideBegin()
	{
		Message.instance.send(MsgCMD.PLAYER_SLIDE);
	}
	private slideEnd()
	{
		Message.instance.send(MsgCMD.PLAYER_STOPSLIDE);
	}
	private update()
	{
		this.fraction.text = "" + this.grade;
		this.coinNum.text = "" + KeyManager.getRocker().gold;
		this.distance.text = "" + this.metre;
		this.performanceScore.text = "" + this.performance;
	}
	private setMusicTap()
	{
		if(this.setMusic.selected == false)
		{
			SoundManager.instance.startBgMusic("runMusic_mp3");
			SoundManager.instance.isPlay = true;
		}
		if(this.setMusic.selected == true)
		{
			SoundManager.instance.stopBgMusic();
			SoundManager.instance.isPlay = false;
		}
	}
	private stopBegin()
	{
		Message.instance.send(MsgCMD.GAME_STOP);
		this.stopBtn.touchEnabled = false;
		this.setMusic.touchEnabled = false;
		SoundManager.instance.stopBgMusic();
		SceneManager.getInstance().currentScene.addChild(new StopBg());
	}
	
	recvMsg(cmd:number, date:any)
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_DEATH:
			this.jump.touchEnabled = false;
			this.slide.touchEnabled = false;
			this.stopBtn.touchEnabled = false;
			break;

			case MsgCMD.GAME_CONTINUE:
			this.stopBtn.touchEnabled = true;
			this.setMusic.touchEnabled = true;
			if(SoundManager.instance.isPlay == true)
			{
				SoundManager.instance.startBgMusic("runMusic_mp3");
			}
			break;
		}
	}
}