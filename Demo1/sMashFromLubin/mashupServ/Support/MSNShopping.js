// JScript File
function MSNShoppingClass() { 
    this.__getProducts = [new Product()];
    this.DEFAULT_MAX_PRODUCTS = 30;
}
MSNShoppingClass.prototype.getProducts = function(text, number){
    // Retrieves products from MSN Shopping having the specified text in the title or description.
    //
    // text (required): The desired text
    // number (optional): The maximum number of products to return (default=30)
    var params = "format=json&hasImage=1&text=" + escape(text) + "&pagesize=";
    var products = this._getMSNShoppingProducts(number, params);
    return products;
}
 
MSNShoppingClass.prototype._getMSNShoppingProducts = function(number, extraParams)
{
    if(!number || isNaN(number)) number = this.DEFAULT_MAX_PRODUCTS;
    var params = extraParams + number;
  //  var root = Sys.Serialization.JavaScriptSerializer.deserialize(environment.getText("http://shopping.msn.com/xml/v1/getproducts.aspx?" + params));
 // 	debugger;
    var resultText =  environment.getText("http://shopping.msn.com/xml/v1/getproducts.aspx?" + params);
    
    var root = eval('(' + resultText + ')');
    var size = (!root.msnshopping.items)? 0 : (!root.msnshopping.items.item.length)? 1 : root.msnshopping.items.item.length;
    var productArray = new Array(size);
    var id = "", brand="", description="", url="", name="", rating="", productUrl="", bCatId="", price="", vendId="", vendName = "";
    if (size == 1)
    {
        id = root.msnshopping.items.item.$id;
        brand = (!root.msnshopping.items.item.brand)?"":root.msnshopping.items.item.brand.$;
        description = (!root.msnshopping.items.item.description)?"":root.msnshopping.items.item.description.$ + " ...";
        url = (!root.msnshopping.items.item.imageURL)?"":root.msnshopping.items.item.imageURL.$;
        name = (!root.msnshopping.items.item.name)?"":root.msnshopping.items.item.name.$;
        rating = (!root.msnshopping.items.item.rating)?"":root.msnshopping.items.item.$value;
        productUrl = (!root.msnshopping.items.item.url)?"":root.msnshopping.items.item.url.$;
        bCatId = (!root.msnshopping.items.item.bCatId)?"":root.msnshopping.items.item.bCatId.$;
        price = (!root.msnshopping.items.item.price)?"":root.msnshopping.items.item.price.$;
        vendId = (!root.msnshopping.items.item.vendId)?"":root.msnshopping.items.item.vendId.$;
        vendName = (!root.msnshopping.items.item.vendName)?"":root.msnshopping.items.item.vendName.$;
        productArray[0] = new Product(id, brand, description, url, name, rating, productUrl, bCatId, price, vendId, vendName);
    }
    else
    {
        for(var i = 0; i < size; i++)
        {   
            if(root.msnshopping.items.item[i])
            {
                id = root.msnshopping.items.item[i].$id;
                brand = (!root.msnshopping.items.item[i].brand)?"":root.msnshopping.items.item[i].brand.$;
                description = (!root.msnshopping.items.item[i].description)?"":root.msnshopping.items.item[i].description.$ + " ...";
                url = (!root.msnshopping.items.item[i].imageURL)?"":root.msnshopping.items.item[i].imageURL.$;
                name = (!root.msnshopping.items.item[i].name)?"":root.msnshopping.items.item[i].name.$;
                rating = (!root.msnshopping.items.item[i].rating)?"":root.msnshopping.items.item[i].$value;
                productUrl = (!root.msnshopping.items.item[i].url)?"":root.msnshopping.items.item[i].url.$;
                bCatId = (!root.msnshopping.items.item[i].bCatId)?"":root.msnshopping.items.item[i].bCatId.$;
                price = (!root.msnshopping.items.item[i].price)?"":root.msnshopping.items.item[i].price.$;
                vendId = (!root.msnshopping.items.item[i].vendId)?"":root.msnshopping.items.item[i].vendId.$;
                vendName = (!root.msnshopping.items.item[i].vendName)?"":root.msnshopping.items.item[i].vendName.$;
                productArray[i] = new Product(id, brand, description, url, name, rating, productUrl, bCatId, price, vendId, vendName);
            }
        }
    }
    return productArray;
}
 
function Product(id, brand, description, url, name, rating, productUrl, bCatId, price, vendId, vendName)
{
    this.id = id;
    this.brand = brand;
    this.description = description;
    this.url = url;
    this.title = name;
    this.rating = rating;
    this.productUrl = productUrl;
    this.categoryId = bCatId;
    this.price = price;
    this.vendorId = vendId;
    this.vendorName = vendName;
    this.toString = function()    {
        var sb = new Sys.StringBuilder();
        sb.append("<table><tr><td><a href='" + this.productUrl + "' target='_blank'><img src='");
        sb.append(this.url + "' title='" + this.title ); 
        sb.append(", Brand: " + this.brand + ", Vendor: " + this.vendorName );
        sb.append(", Price: " + this.price + "'/></a></td><tr><td>");
        sb.append( this.description + "</td><tr><td>");
        sb.append(this.id + ", " + this.vendorId + ", " + this.categoryId + "," + this.rating + "</td></tr></table>");
        return sb.toString();
    } 
}
