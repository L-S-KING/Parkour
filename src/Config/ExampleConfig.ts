class ExampleConfig extends BaseConfig
{
	private static _instance:ExampleConfig;

	public static get instnace():ExampleConfig
	{
		if( this._instance == null )
		{
			this._instance = new ExampleConfig();
		}
		return this._instance;
	}

	private dataList:ExampleConfigModel[];
	public constructor()
	{
		super();
	}

	public init(str:string):void{

		this.dataList = [];
		super.init( str , ExampleConfigModel , this.dataList );
	}

	public getExampleArr():ExampleConfigModel[]
	{
		return this.dataList;
	}
	private floor:FloorConfigModel[];
	public floorInit(str:string):void
	{
		this.floor = [];
		super.init(str, FloorConfigModel, this.floor);
	}
	public getFloorArr():FloorConfigModel[]
	{
		return this.floor;
	}

}