package dart.mashup.myException;

public class MyExcepiton extends Exception {
	private String errStr;
	
	public void setError(String s)
	{
		this.errStr = s;
	}
	
	public String getErrorMsg()
	{
		return this.errStr;
	}
	
	public MyExcepiton(String e)
	{
		this.errStr = e;
	}
}
