class mx.controls.treeclasses.TreeRow extends mx.controls.listclasses.SelectableRow
{
    var node, owner, disclosure, nodeIcon, open, getStyle, createObject, cell, item, rowIndex, __height, __get__height, __width, _parent;
    function TreeRow()
    {
        super();
    } // End of the function
    function setValue(item, state)
    {
        node = item;
        var _loc4 = owner.getIsBranch(node);
        super.setValue(node, state);
        if (node == undefined)
        {
            disclosure._visible = nodeIcon._visible = false;
            return;
        } // end if
        nodeIcon._visible = true;
        open = owner.getIsOpen(node);
        var _loc6 = (owner.getNodeDepth(node) - 1) * this.getStyle("indentation");
        var _loc5 = owner.getStyle(open ? ("disclosureOpenIcon") : ("disclosureClosedIcon"));
        disclosure = this.createObject(_loc5, "disclosure", 3);
        disclosure.onPress = disclosurePress;
        disclosure.useHandCursor = false;
        disclosure._visible = _loc4;
        disclosure._x = _loc6 + 4;
        var _loc3 = owner.nodeIcons[node.getID()][open ? ("iconID2") : ("iconID")];
        if (_loc3 == undefined)
        {
            _loc3 = owner.__iconFunction(node);
        } // end if
        if (_loc4)
        {
            if (_loc3 == undefined)
            {
                _loc3 = owner.getStyle(open ? ("folderOpenIcon") : ("folderClosedIcon"));
            } // end if
        }
        else
        {
            if (_loc3 == undefined)
            {
                _loc3 = node.attributes[owner.iconField];
            } // end if
            if (_loc3 == undefined)
            {
                _loc3 = owner.getStyle("defaultLeafIcon");
            } // end if
        } // end else if
        nodeIcon.removeMovieClip();
        nodeIcon = this.createObject(_loc3, "nodeIcon", 20);
        nodeIcon._x = disclosure._x + disclosure._width + 2;
        cell._x = nodeIcon._x + nodeIcon._width + 2;
        this.size();
    } // End of the function
    function getNormalColor()
    {
        node = item;
        var _loc6 = super.getNormalColor();
        var _loc7 = rowIndex + owner.__vPosition;
        var _loc5 = owner.getColorAt(_loc7);
        if (_loc5 == undefined)
        {
            var _loc4 = owner.getStyle("depthColors");
            if (_loc4 == undefined)
            {
                return (_loc6);
            }
            else
            {
                var _loc3 = owner.getNodeDepth(node);
                if (_loc3 == undefined)
                {
                    _loc3 = 1;
                } // end if
                _loc5 = _loc4[(_loc3 - 1) % _loc4.length];
            } // end if
        } // end else if
        return (_loc5);
    } // End of the function
    function createChildren()
    {
        super.createChildren();
        if (disclosure == undefined)
        {
            this.createObject("Disclosure", "disclosure", 3, {_visible: false});
            disclosure.onPress = disclosurePress;
            disclosure.useHandCursor = false;
        } // end if
    } // End of the function
    function size()
    {
        super.size();
        disclosure._y = (__height - disclosure._height) / 2;
        nodeIcon._y = (this.__get__height() - nodeIcon._height) / 2;
        cell.setSize(__width - cell._x, __height);
    } // End of the function
    function disclosurePress()
    {
        var _loc3 = _parent;
        var _loc2 = _loc3.owner;
        if (_loc2.isOpening || !_loc2.enabled)
        {
            return;
        } // end if
        var _loc4 = _loc3.open ? (90) : (0);
        _loc3.open = !_parent.open;
        _loc2.pressFocus();
        _loc2.releaseFocus();
        _loc2.setIsOpen(_loc3.node, _loc3.open, true, true);
    } // End of the function
    var indentAdjust = 3;
} // End of Class
