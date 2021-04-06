class EffectManager 
{
	private constructor() 
	{
	}
	private static _effect:EffectManager = null;
	public static getEffect():EffectManager
	{
		if(this._effect == null)
		{
			this._effect = new EffectManager();
		}
		return this._effect;
	}
	/**特效 */
	private effect:Effect = null;
	/**特效队列 */
	public effectArray:Effect[] = [];
	/**添加特效 */
	public addEffect(type:number, effectX:number, effectY:number, level:number)
	{
		this.effect = new Effect();
		this.effect.effectInit(type);
		this.effect.x = effectX;
		this.effect.y = effectY;
		SceneManager.getInstance().currentScene.addChildAt(this.effect,level);
		this.effectArray.push(this.effect);
	}
}