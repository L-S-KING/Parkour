class ExampleConfigModel 
{
	public type:number;
	public coinX:number;
	public coinY:number;

	public constructor( obj:string[] ) 
	{
		this.type = parseInt( obj[0] );
		this.coinX = parseInt( obj[1] );
		this.coinY = parseInt( obj[2] );
	}
}