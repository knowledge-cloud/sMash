class mx.controls.Tree extends mx.controls.List
{
    var nodeIcons, invUpdateControl, invalidate, branchNodes, treeDataProvider, openNodes, nodeList, __vPosition, rowIndex, __rowCount, getStyle, tween, opening, __rowHeight, rows, maskList, rowList, __viewMetrics, __hScrollPolicy, __width, __maxHPosition, attachMovie, topRowZ, listContent, getStateAt, __dataProvider, eventAfterTween, invScrollProps, eventPending, vScroller, updateControl, __get__firstVisibleNode, setSelectedIndex, __get__selectedNode, getSelectedItem, setSelectedIndices, __get__selectedNodes, getSelectedItems, nodeIndices, __set__selectedNode, dispatchEvent, __set__firstVisibleNode, __set__selectedNodes;
    function Tree()
    {
        super();
    } // End of the function
    function setIcon(node, iconID, iconID2)
    {
        if (nodeIcons == undefined)
        {
            nodeIcons = new Object();
        } // end if
        if (iconID2 == undefined)
        {
            iconID2 = iconID;
        } // end if
        var _loc4 = nodeIcons[node.getID()] = {iconID: iconID, iconID2: iconID2};
        invUpdateControl = true;
        this.invalidate();
    } // End of the function
    function getIsBranch(node)
    {
        return (node.hasChildNodes() || branchNodes[node.getID()] != undefined);
    } // End of the function
    function setIsBranch(node, branch)
    {
        if (branchNodes == undefined)
        {
            branchNodes = new Object();
        } // end if
        if (!branch)
        {
            delete branchNodes[node.getID()];
        }
        else
        {
            branchNodes[node.getID()] = true;
        } // end else if
        if (this.isNodeVisible(node))
        {
            invUpdateControl = true;
            this.invalidate();
        } // end if
    } // End of the function
    function getNodeDepth(node)
    {
        var _loc3 = 0;
        for (var _loc2 = node; _loc2.parentNode != undefined && _loc2 != treeDataProvider; _loc2 = _loc2.parentNode)
        {
            ++_loc3;
        } // end of for
        return (_loc3);
    } // End of the function
    function getIsOpen(node)
    {
        return (openNodes[node.getID()] == true);
    } // End of the function
    function setIsOpen(node, open, animate, fireEvent)
    {
        if (!this.getIsBranch(node) || this.getIsOpen(node) == open || isOpening)
        {
            return;
        } // end if
        if (open)
        {
            openNodes[node.getID()] = open;
        } // end if
        if (this.isNodeVisible(node))
        {
            nodeList = this.getDisplayList(node, !open);
            rowIndex = this.getDisplayIndex(node) + 1 - __vPosition;
            var _loc6 = Math.min(nodeList.length, __rowCount - rowIndex);
            var _loc13 = this.getStyle("openDuration");
            if (animate && rowIndex < __rowCount && _loc6 > 0 && _loc6 < 20 && _loc13 != 0)
            {
                tween.endTween();
                opening = open;
                isOpening = true;
                var _loc7 = _loc6 * __rowHeight;
                for (var _loc15 = rowIndex; _loc15 < __rowCount; ++_loc15)
                {
                    rows[_loc15].__lastY = rows[_loc15]._y;
                } // end of for
                maskList = new Array();
                rowList = new Array();
                var _loc4 = __viewMetrics;
                var _loc12 = __hScrollPolicy == "on" || __hScrollPolicy == "auto" ? (__width + __maxHPosition) : (__width - _loc4.left - _loc4.right);
                for (var _loc15 = 0; _loc15 < _loc6; ++_loc15)
                {
                    var _loc3 = maskList[_loc15] = this.attachMovie("BoundingBox", "openMask" + _loc15, 2001 + _loc15);
                    _loc3._width = __width - _loc4.left - _loc4.right;
                    _loc3._x = _loc4.left;
                    _loc3._height = _loc7;
                    _loc3._y = rows[rowIndex]._y;
                    var _loc2 = rowList[_loc15] = listContent.createObject(__rowRenderer, "treeRow" + topRowZ++, topRowZ, {owner: this, styleName: this});
                    _loc2._x = _loc4.left;
                    _loc2.setSize(_loc12, __rowHeight);
                    if (open)
                    {
                        _loc2.drawRow(nodeList[_loc15], "normal");
                        _loc2._y = rows[rowIndex]._y - _loc7 + __rowHeight * _loc15;
                        _loc2.setMask(_loc3);
                    }
                    else
                    {
                        var _loc5 = Math.max(__vPosition + __rowCount + _loc15 + nodeList.length - _loc6, rowIndex + nodeList.length);
                        _loc2.drawRow(__dataProvider.getItemAt(_loc5), this.getStateAt(_loc5));
                        _loc2._y = rows[__rowCount - 1]._y + (_loc15 + 1) * __rowHeight;
                        rows[rowIndex + _loc15].setMask(_loc3);
                    } // end else if
                    _loc2.__lastY = _loc2._y;
                } // end of for
                _loc13 = _loc13 * Math.max(_loc6 / 5, 1);
                if (fireEvent)
                {
                    eventAfterTween = node;
                } // end if
                tween = new mx.effects.Tween(this, 0, open ? (_loc7) : (-1 * _loc7), _loc13, 5);
                var _loc16 = this.getStyle("openEasing");
                if (_loc16 != undefined)
                {
                    tween.easingEquation = _loc16;
                } // end if
            }
            else
            {
                isOpening = false;
                if (open)
                {
                    this.addItemsAt(this.getDisplayIndex(node) + 1, nodeList);
                }
                else
                {
                    __dataProvider.removeItemsAt(this.getDisplayIndex(node) + 1, nodeList.length);
                } // end else if
                invScrollProps = true;
                if (fireEvent)
                {
                    eventPending = node;
                } // end if
                this.invalidate();
            } // end if
        } // end else if
        if (!open)
        {
            openNodes[node.getID()] = open;
        } // end if
        _loc15 = this.getDisplayIndex(node);
        var _loc14 = rows[_loc15 - __vPosition];
        _loc14.drawRow(_loc14.item, this.getStateAt(_loc15));
    } // End of the function
    function onTweenUpdate(val)
    {
        for (var _loc2 = rowIndex; _loc2 < __rowCount; ++_loc2)
        {
            rows[_loc2]._y = rows[_loc2].__lastY + val;
        } // end of for
        for (var _loc2 = 0; _loc2 < rowList.length; ++_loc2)
        {
            rowList[_loc2]._y = rowList[_loc2].__lastY + val;
        } // end of for
    } // End of the function
    function onTweenEnd(val)
    {
        for (var _loc2 = rowIndex; _loc2 < __rowCount; ++_loc2)
        {
            rows[_loc2]._y = rows[_loc2].__lastY + val;
            delete rows[_loc2].__lastY;
            if (_loc2 >= __rowCount - rowList.length && opening)
            {
                rows[_loc2].removeMovieClip();
            } // end if
        } // end of for
        for (var _loc2 = 0; _loc2 < rowList.length; ++_loc2)
        {
            rowList[_loc2]._y = rowList[_loc2].__lastY + val;
            if (opening)
            {
                rowList[_loc2].setMask(undefined);
            }
            else
            {
                rows[rowIndex + _loc2].removeMovieClip();
            } // end else if
            maskList[_loc2].removeMovieClip();
        } // end of for
        isOpening = false;
        vScroller.__set__scrollPosition(__vPosition);
        if (opening)
        {
            var _loc4 = rowIndex + rowList.length;
            for (var _loc2 = __rowCount - 1; _loc2 >= _loc4; --_loc2)
            {
                rows[_loc2] = rows[_loc2 - rowList.length];
                rows[_loc2].rowIndex = _loc2;
            } // end of for
            for (var _loc2 = rowIndex; _loc2 < _loc4; ++_loc2)
            {
                rows[_loc2] = rowList[_loc2 - rowIndex];
                rows[_loc2].rowIndex = _loc2;
            } // end of for
            this.addItemsAt(rowIndex + __vPosition, nodeList);
        }
        else
        {
            var _loc3 = __rowCount - rowList.length;
            for (var _loc2 = rowIndex; _loc2 < _loc3; ++_loc2)
            {
                rows[_loc2] = rows[_loc2 + rowList.length];
                rows[_loc2].rowIndex = _loc2;
            } // end of for
            for (var _loc2 = _loc3; _loc2 < __rowCount; ++_loc2)
            {
                rows[_loc2] = rowList[_loc2 - _loc3];
                rows[_loc2].rowIndex = _loc2;
            } // end of for
            __dataProvider.removeItemsAt(rowIndex + __vPosition, nodeList.length);
        } // end else if
        if (eventAfterTween != undefined)
        {
            eventPending = eventAfterTween;
            this.invalidate();
            delete this.eventAfterTween;
        } // end if
        delete this.tween;
        delete this.invUpdateControl;
    } // End of the function
    function size(Void)
    {
        tween.endTween();
        super.size();
    } // End of the function
    function setVPosition(pos)
    {
        if (isOpening)
        {
            return;
        } // end if
        super.setVPosition(pos);
    } // End of the function
    function onScroll(evt)
    {
        if (isOpening)
        {
            return;
        } // end if
        super.onScroll(evt);
    } // End of the function
    function addItemsAt(index, arr)
    {
        var _loc4 = __dataProvider.slice(0, index);
        var _loc3 = __dataProvider.slice(index);
        __dataProvider = _loc4.concat(arr, _loc3);
        __dataProvider.addEventListener("modelChanged", this);
        this.modelChanged({eventName: "addItems", firstItem: index, lastItem: index + arr.length - 1});
    } // End of the function
    function setDataProvider(dP)
    {
        if (treeDataProvider != undefined)
        {
            treeDataProvider.removeEventListener(this);
        } // end if
        if (typeof(dP) == "string")
        {
            dP = new XML(dP);
        } // end if
        treeDataProvider = dP;
        treeDataProvider.isTreeRoot = true;
        this.setIsBranch(treeDataProvider, true);
        this.setIsOpen(treeDataProvider, true);
        this.setDisplayIndex(treeDataProvider, -1);
        treeDataProvider.addEventListener("modelChanged", this);
        this.modelChanged({eventName: "updateTree"});
    } // End of the function
    function getDataProvider()
    {
        return (treeDataProvider);
    } // End of the function
    function refresh()
    {
        this.updateControl();
    } // End of the function
    function addTreeNode(label, data)
    {
        if (treeDataProvider == undefined)
        {
            this.setDataProvider(new XML());
        } // end if
        return (treeDataProvider.addTreeNode(label, data));
    } // End of the function
    function addTreeNodeAt(index, label, data)
    {
        if (treeDataProvider == undefined)
        {
            this.setDataProvider(new XML());
        } // end if
        return (treeDataProvider.addTreeNodeAt(index, label, data));
    } // End of the function
    function getTreeNodeAt(index)
    {
        return (treeDataProvider.getTreeNodeAt(index));
    } // End of the function
    function removeTreeNodeAt(index)
    {
        return (treeDataProvider.removeTreeNodeAt(index));
    } // End of the function
    function removeAll()
    {
        return (treeDataProvider.removeAll());
    } // End of the function
    function getNodeDisplayedAt(index)
    {
        return (__dataProvider.getItemAt(index));
    } // End of the function
    function modelChanged(eventObj)
    {
        var _loc6 = eventObj.eventName;
        if (_loc6 == "updateTree")
        {
            __dataProvider = this.getDisplayList(treeDataProvider);
            __dataProvider.addEventListener("modelChanged", this);
            super.modelChanged({eventName: "updateAll"});
        }
        else if (_loc6 == "addNode")
        {
            var _loc8 = eventObj.node;
            if (this.isNodeVisible(_loc8))
            {
                if (_loc8.nextSibling != undefined)
                {
                    this.setDisplayIndex(_loc8, this.getDisplayIndex(_loc8.nextSibling));
                }
                else if (_loc8.previousSibling != undefined)
                {
                    var _loc7 = this.getDisplayList(_loc8.previousSibling);
                    if (_loc7.length > 0)
                    {
                        this.setDisplayIndex(_loc8, this.getDisplayIndex(_loc7.pop()) + 1);
                    }
                    else
                    {
                        this.setDisplayIndex(_loc8, this.getDisplayIndex(_loc8.previousSibling) + 1);
                    } // end else if
                }
                else
                {
                    this.setDisplayIndex(_loc8, this.getDisplayIndex(_loc8.parentNode) + 1);
                } // end else if
                var _loc10 = this.getDisplayList(_loc8);
                _loc10.unshift(_loc8);
                this.addItemsAt(this.getDisplayIndex(_loc8), _loc10);
            }
            else
            {
                invUpdateControl = true;
                this.invalidate();
            } // end else if
        }
        else if (_loc6 == "removeNode")
        {
            _loc8 = eventObj.node;
            var _loc9 = this.getDisplayIndex(_loc8);
            if (_loc9 != undefined)
            {
                var _loc11 = this.getDisplayList(_loc8);
                __dataProvider.removeItemsAt(_loc9, _loc11.length + 1);
            } // end if
        }
        else if (_loc6 == "addItems")
        {
            super.modelChanged(eventObj);
            var _loc5 = __dataProvider;
            for (var _loc3 = eventObj.firstItem; _loc3 < _loc5.length; ++_loc3)
            {
                this.setDisplayIndex(_loc5[_loc3], _loc3);
            } // end of for
        }
        else if (_loc6 == "removeItems")
        {
            _loc5 = __dataProvider;
            for (var _loc3 = eventObj.firstItem; _loc3 < _loc5.length; ++_loc3)
            {
                this.setDisplayIndex(_loc5[_loc3], _loc3);
            } // end of for
            super.modelChanged(eventObj);
        }
        else
        {
            super.modelChanged(eventObj);
        } // end else if
    } // End of the function
    function isNodeVisible(node)
    {
        return (this.getDisplayIndex(node) != undefined || this.getDisplayIndex(node.parentNode) != undefined && this.getIsOpen(node.parentNode));
    } // End of the function
    function getFirstVisibleNode()
    {
        return (__dataProvider.getItemAt(__vPosition));
    } // End of the function
    function setFirstVisibleNode(node)
    {
        var _loc2 = this.getDisplayIndex(node);
        if (_loc2 == undefined)
        {
            return;
        } // end if
        this.setVPosition(_loc2);
    } // End of the function
    function set firstVisibleNode(node)
    {
        this.setFirstVisibleNode(node);
        //return (this.firstVisibleNode());
        null;
    } // End of the function
    function get firstVisibleNode()
    {
        return (this.getFirstVisibleNode());
    } // End of the function
    function set selectedNode(node)
    {
        var _loc2 = this.getDisplayIndex(node);
        if (_loc2 >= 0)
        {
            this.setSelectedIndex(_loc2);
        } // end if
        //return (this.selectedNode());
        null;
    } // End of the function
    function get selectedNode()
    {
        return (this.getSelectedItem());
    } // End of the function
    function set selectedNodes(nodeArray)
    {
        var _loc5 = new Array();
        var _loc3;
        for (var _loc2 = 0; _loc2 < nodeArray.length; ++_loc2)
        {
            _loc3 = this.getDisplayIndex(nodeArray[_loc2]);
            if (_loc3 != undefined)
            {
                _loc5.push(_loc3);
            } // end if
        } // end of for
        this.setSelectedIndices(_loc5);
        //return (this.selectedNodes());
        null;
    } // End of the function
    function get selectedNodes()
    {
        return (this.getSelectedItems());
    } // End of the function
    function getDisplayList(node, removed)
    {
        var _loc5 = new Array();
        if (!this.isNodeVisible(node) || !this.getIsOpen(node))
        {
            return (_loc5);
        } // end if
        var _loc6 = this.getDisplayIndex(node);
        var _loc3 = new Array();
        var _loc2 = node.firstChild;
        var _loc4 = _loc2 == undefined;
        while (!_loc4)
        {
            if (removed)
            {
                this.setDisplayIndex(_loc2, undefined);
            }
            else
            {
                this.setDisplayIndex(_loc2, ++_loc6);
            } // end else if
            _loc5.push(_loc2);
            if (_loc2.childNodes.length > 0 && this.getIsOpen(_loc2))
            {
                if (_loc2.nextSibling != undefined)
                {
                    _loc3.push(_loc2.nextSibling);
                } // end if
                _loc2 = _loc2.firstChild;
                continue;
            } // end if
            if (_loc2.nextSibling != undefined)
            {
                _loc2 = _loc2.nextSibling;
                continue;
            } // end if
            if (_loc3.length == 0)
            {
                _loc4 = true;
                continue;
            } // end if
            _loc2 = _loc3.pop();
        } // end while
        return (_loc5);
    } // End of the function
    function getDisplayIndex(node)
    {
        return (nodeIndices[node.getID()]);
    } // End of the function
    function setDisplayIndex(node, UID)
    {
        nodeIndices[node.getID()] = UID;
    } // End of the function
    function keyDown(e)
    {
        if (isOpening)
        {
            return;
        } // end if
        var _loc3 = this.__get__selectedNode();
        if (e.ctrlKey)
        {
            super.keyDown(e);
        }
        else if (e.code == 32)
        {
            if (this.getIsBranch(_loc3))
            {
                var _loc6 = !this.getIsOpen(_loc3);
                this.setIsOpen(_loc3, _loc6, true, true);
            } // end if
        }
        else if (e.code == 37)
        {
            if (this.getIsOpen(_loc3))
            {
                this.setIsOpen(_loc3, false, true, true);
            }
            else
            {
                this.__set__selectedNode(_loc3.parentNode);
                this.dispatchEvent({type: "change"});
                var _loc5 = this.getDisplayIndex(this.__get__selectedNode());
                if (_loc5 < __vPosition)
                {
                    this.setVPosition(_loc5);
                } // end if
            } // end else if
        }
        else if (e.code == 39)
        {
            if (this.getIsBranch(_loc3))
            {
                if (this.getIsOpen(_loc3))
                {
                    this.__set__selectedNode(_loc3.firstChild);
                    this.dispatchEvent({type: "change"});
                }
                else
                {
                    this.setIsOpen(_loc3, true, true, true);
                } // end if
            } // end else if
        }
        else
        {
            super.keyDown(e);
        } // end else if
    } // End of the function
    function init()
    {
        super.init();
        openNodes = new Object();
        nodeIndices = new Object();
    } // End of the function
    function invalidateStyle(propName)
    {
        if (isNewRowStyle[propName])
        {
            invUpdateControl = true;
            this.invalidate();
        } // end if
        super.invalidateStyle(propName);
    } // End of the function
    function layoutContent(x, y, tW, tH, dW, dH)
    {
        var _loc5 = 0;
        var _loc6 = 0;
        for (var _loc3 = 0; _loc3 < rows.length; ++_loc3)
        {
            var _loc4 = rows[_loc3].getDepth();
            if (_loc4 > _loc5)
            {
                _loc5 = _loc4;
                _loc6 = _loc3;
            } // end if
        } // end of for
        var _loc7 = _loc5 + rows.length - _loc6;
        if (topRowZ < _loc7)
        {
            topRowZ = _loc7;
        } // end if
        super.layoutContent(x, y, tW, tH, dW, dH);
    } // End of the function
    function draw(Void)
    {
        super.draw();
        if (eventPending != undefined)
        {
            this.dispatchEvent({type: this.getIsOpen(eventPending) ? ("nodeOpen") : ("nodeClose"), node: eventPending});
            delete this.eventPending;
        } // end if
    } // End of the function
    static var symbolName = "Tree";
    static var symbolOwner = mx.controls.Tree;
    var className = "Tree";
    static var version = "2.0.2.127";
    static var mixIt2 = mx.controls.treeclasses.TreeDataProvider.Initialize(XMLNode);
    var isNewRowStyle = {depthColors: true, indentation: true, disclosureOpenIcon: true, disclosureClosedIcon: true, folderOpenIcon: true, folderClosedIcon: true, defaultLeafIcon: true};
    var __rowRenderer = "TreeRow";
    var isOpening = false;
    var minScrollInterval = 50;
} // End of Class
