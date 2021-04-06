/**
 * 商城
 */
class Shop extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);

		// egret.localStorage.clear();
	}

	/**返回按钮 */
	private back:eui.Button;
	/**金币文本框 */
	private gold:eui.Label;
	/**金币总量 */
	private goldNum:number = 0;
	/**购买第二个人物按钮 */
	private buyTwo:eui.Button;
	/**购买第三个人物按钮 */
	private buyThree:eui.Button;
	/**购买第四个人物按钮 */
	private buyFour:eui.Button;
	/**购买格斗人物按钮 */
	private buyFive:eui.Button;
	/**第二个人物覆盖图片 */
	private shopTwo:eui.Image;
	/**第三个人物覆盖图片 */
	private shopThree:eui.Image;
	/**第四个人物覆盖图片 */
	private shopFour:eui.Image;
	/**格斗人物覆盖图片 */
	private shopFive:eui.Image;
	private init()
	{
		this.skinName = "shop";
		
		if(egret.localStorage.getItem("Gold"))
		{
			this.goldNum = Number(egret.localStorage.getItem("Gold"));
		}
		else
		{
			this.goldNum = 0;
		}
		this.gold.text = "" + this.goldNum;
		egret.localStorage.setItem("Gold","" + this.goldNum );


		if(egret.localStorage.getItem("BuyTwo"))
		{
			this.shopTwo.alpha = 0;
			this.buyTwo.alpha = 0;
			this.buyTwo.touchEnabled = false;
		}
		
		if(egret.localStorage.getItem("BuyThree"))
		{
			this.shopThree.alpha = 0;
			this.buyThree.alpha = 0;
			this.buyThree.touchEnabled = false;
		}

		if(egret.localStorage.getItem("BuyFour"))
		{
			this.shopFour.alpha = 0;
			this.buyFour.alpha = 0;
			this.buyFour.touchEnabled = true;
		}

		if(egret.localStorage.getItem("BuyFive"))
		{
			this.shopFive.alpha = 0;
			this.buyFive.alpha = 0;
			this.buyFive.touchEnabled = false;
		}


		this.addListener(this.back, egret.TouchEvent.TOUCH_TAP, this.backTap, this);

		this.addListener(this.buyTwo, egret.TouchEvent.TOUCH_TAP, this.buyTwoTap, this);

		this.addListener(this.buyThree, egret.TouchEvent.TOUCH_TAP, this.buyThreeTap, this);

		this.addListener(this.buyFour, egret.TouchEvent.TOUCH_TAP, this.buyFourTap, this);

		this.addListener(this.buyFive, egret.TouchEvent.TOUCH_TAP, this.buyFiveTap, this);
	}

	private backTap()
	{
		SceneManager.getInstance().addScene(new MainMenu());
	}

	private buyTwoTap()
	{
		if(this.goldNum > 1200)
		{
			this.goldNum -= 1200;
			this.gold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );

			this.shopTwo.alpha = 0;
			this.buyTwo.alpha = 0;
			this.buyTwo.touchEnabled = false;
			egret.localStorage.setItem("BuyTwo","Two");
		}
		
	}

	private buyThreeTap()
	{
		if(this.goldNum >= 1800)
		{
			this.goldNum -= 1800;
			this.gold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );
			
			this.shopThree.alpha = 0;
			this.buyThree.alpha = 0;
			this.buyThree.touchEnabled = false;
			egret.localStorage.setItem("BuyThree","Three")
		}
	}

	private buyFourTap()
	{
		if(this.goldNum >= 2400)
		{
			this.goldNum -= 2400;
			this.gold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );

			this.shopFour.alpha = 0;
			this.buyFour.alpha = 0;
			this.buyFour.touchEnabled = true;
			egret.localStorage.setItem("BuyFour","Four");
		}
	}

	private buyFiveTap()
	{
		if(this.goldNum >= 8888)
		{
			this.goldNum -= 8888;
			this.gold.text = "" + this.goldNum;
			egret.localStorage.setItem("Gold","" + this.goldNum );

			this.shopFive.alpha = 0;
			this.buyFive.alpha = 0;
			this.buyFive.touchEnabled = true;
			egret.localStorage.setItem("BuyFive","Five");
		}
	}
}