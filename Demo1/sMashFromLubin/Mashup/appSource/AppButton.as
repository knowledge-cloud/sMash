package appSource
{
	import flash.events.MouseEvent;
	
	import mx.binding.utils.BindingUtils;
	import mx.containers.VBox;
	import mx.controls.Button;
	import mx.controls.Label;
	import mx.controls.TextInput;
	import mx.controls.Alert;

	

	public class AppButton extends Button
	{
		public var propertyArray:Array = new Array();
		

		
//		public function AppButton()
//		{
//			//TODO: implement function
//			super();
//			propertyArray[0] = "label";
//			var textInput:TextInput = new TextInput(); 
//			propertyArray[1] = textInput;
//			
//			BindingUtils.bindProperty(this, "label", textInput, "text");
//
//		}
		public function AppButton(displayName:String)
		{
			//TODO: implement function
			super();
			propertyArray[0] = "label";
			var textInput:TextInput = new TextInput(); 
			propertyArray[1] = textInput;
			BindingUtils.bindProperty(this, "label", textInput, "text");
			
	
			var displayer:Displayer = new Displayer(displayName);					
//			Alert.show("labelname: "+displayer.name);
			ControlDragManager.treeData.addItem(displayer);
//			BindingUtils.bindProperty(displayer, "name",textInput, "text");			
			BindingUtils.bindProperty(displayer, "name",this, "label");	

			

		}
		
		override protected function mouseDownHandler(event:MouseEvent):void
		{
			//super.mouseDownHandler(event);
			this.startDrag();
			var propertyContainer:VBox = this.parentApplication.mashupViews.getChildByName("appViewer").propertyContainer;
			
			propertyContainer.removeAllChildren();
			for(var i:int = 0; i<propertyArray.length/2; i++)
			{
				var propertyName:Label = new Label();
				propertyName.text = propertyArray[2*i];
				propertyContainer.addChild(propertyName);
				propertyContainer.addChild(propertyArray[2*i+1]);

			}
			
//			ControlDragManager.mouseDownOperation(this,propertyArray);
			 
		}
		
		override protected function mouseUpHandler(event:MouseEvent):void 
		{
					ControlDragManager.mouseUpOperation(this);
			
			
		}
		
	}
}