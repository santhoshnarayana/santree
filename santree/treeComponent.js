function treeview(treeID) {
    this.$id = $("#" + treeID);
    this.$items = this.$id.find("li");
    this.$parents = this.$id.find(".tree-parent");
    this.$visibleItems = null;
    this.$activeItem = null;
    this.keys = {
        tab: 9,
        enter: 13,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        asterisk: 106
    };
    this.init();
    this.bindHandlers();
}

treeview.prototype.init = function () {
    this.$parents.prepend('<img class="headerImg" src="img/expanded.gif" alt="Group expanded"/>');
    this.$parents.each(function () {
        if ($(this).attr("aria-expanded") === "false") {
            $(this).children("ul").hide().attr("aria-hidden", "true");
            $(this).children("img").attr("src", "img/contracted.gif").attr("alt", "Group collapsed");
        }
    });
    this.$visibleItems = this.$id.find("li:visible");
};

treeview.prototype.expandGroup = function ($item, hasFocus) {
    var $group = $item.children("ul");
    $group.show().attr("aria-hidden", "false");
    $item.attr("aria-expanded", "true");
    if (hasFocus == true) {
        $item.children("img").attr("src", "img/expanded-focus.gif").attr("alt", "Group expanded");
    } else {
        $item.children("img").attr("src", "img/expanded.gif").attr("alt", "Group expanded");
    }
    this.$visibleItems = this.$id.find("li:visible");
};

treeview.prototype.collapseGroup = function ($item, hasFocus) {
    var $group = $item.children("ul");
    $group.hide().attr("aria-hidden", "true");
    $item.attr("aria-expanded", "false");
    if (hasFocus == true) {
        $item.children("img").attr("src", "img/contracted-focus.gif").attr("alt", "Group collapsed");
    } else {
        $item.children("img").attr("src", "img/contracted.gif").attr("alt", "Group collapsed");
    }
    this.$visibleItems = this.$id.find("li:visible");
};

treeview.prototype.toggleGroup = function ($item, hasFocus) {
    var $group = $item.children("ul");
    if ($item.attr("aria-expanded") == "true") {
        this.collapseGroup($item, hasFocus);
    } else {
        this.expandGroup($item, hasFocus);
    }
};

treeview.prototype.bindHandlers = function () {
    var thisObj = this;
    this.$parents.dblclick(function (e) {
        return thisObj.handleDblClick($(this), e);
    });
    this.$items.click(function (e) {
        return thisObj.handleClick($(this), e);
    });
    this.$items.keydown(function (e) {
        return thisObj.handleKeyDown($(this), e);
    });
    this.$items.keypress(function (e) {
        return thisObj.handleKeyPress($(this), e);
    });
    this.$items.focus(function (e) {
        return thisObj.handleFocus($(this), e);
    });
    this.$items.blur(function (e) {
        return thisObj.handleBlur($(this), e);
    });
    $(document).click(function (e) {
        if (thisObj.$activeItem != null) {
            thisObj.$activeItem.removeClass("tree-focus");
            if (thisObj.$activeItem.hasClass("tree-parent") == true) {
                if (thisObj.$activeItem.attr("aria-expanded") == "true") {
                    thisObj.$activeItem.children("img").attr("src", "img/expanded.gif");
                } else {
                    thisObj.$activeItem.children("img").attr("src", "img/contracted.gif");
                }
            }
            thisObj.$activeItem = null;
        }
        return true;
    });
};

treeview.prototype.updateStyling = function ($item) {
    this.$items.removeClass("tree-focus").attr("tabindex", "-1");
    this.$parents.each(function () {
        if ($(this).attr("aria-expanded") == "true") {
            $(this).children("img").attr("src", "img/expanded.gif");
        } else {
            $(this).children("img").attr("src", "img/contracted.gif");
        }
    });
    if ($item.is(".tree-parent")) {
        if ($item.attr("aria-expanded") == "true") {
            $item.children("img").attr("src", "img/expanded-focus.gif");
        } else {
            $item.children("img").attr("src", "img/contracted-focus.gif");
        }
    }
    $item.addClass("tree-focus").attr("tabindex", "0");
};

treeview.prototype.handleKeyDown = function ($item, e) {
    var curNdx = this.$visibleItems.index($item);
    if (e.altKey || e.ctrlKey || e.shiftKey && e.keyCode != this.keys.tab) {
        return true;
    }
    switch (e.keyCode) {
        case this.keys.tab:
        {
            this.$activeItem = null;
            $item.removeClass("tree-focus");
            if ($item.hasClass("tree-parent") == true) {
                if ($item.attr("aria-expanded") == "true") {
                    $item.children("img").attr("src", "img/expanded.gif");
                } else {
                    $item.children("img").attr("src", "img/contracted.gif");
                }
            }
            return true;
        }

        case this.keys.home:
        {
            this.$activeItem = this.$parents.first();
            this.$activeItem.focus();
            e.stopPropagation();
            return false;
        }

        case this.keys.end:
        {
            this.$activeItem = this.$visibleItems.last();
            this.$activeItem.focus();
            e.stopPropagation();
            return false;
        }

        case this.keys.enter:
        case this.keys.space:
        {
            if (!$item.is(".tree-parent")) {
            } else {
                this.toggleGroup($item, true);
            }
            e.stopPropagation();
            return false;
        }

        case this.keys.left:
        {
            if ($item.is(".tree-parent") && $item.attr("aria-expanded") == "true") {
                this.collapseGroup($item, true);
            } else {
                var $itemUL = $item.parent();
                var $itemParent = $itemUL.parent();
                this.$activeItem = $itemParent;
                this.$activeItem.focus();
            }
            e.stopPropagation();
            return false;
        }

        case this.keys.right:
        {
            if (!$item.is(".tree-parent")) {
            } else if ($item.attr("aria-expanded") == "false") {
                this.expandGroup($item, true);
            } else {
                this.$activeItem = $item.children("ul").children("li").first();
                this.$activeItem.focus();
            }
            e.stopPropagation();
            return false;
        }

        case this.keys.up:
        {
            if (curNdx > 0) {
                var $prev = this.$visibleItems.eq(curNdx - 1);
                this.$activeItem = $prev;
                $prev.focus();
            }
            e.stopPropagation();
            return false;
        }

        case this.keys.down:
        {
            if (curNdx < this.$visibleItems.length - 1) {
                var $next = this.$visibleItems.eq(curNdx + 1);
                this.$activeItem = $next;
                $next.focus();
            }
            e.stopPropagation();
            return false;
        }

        case this.keys.asterisk:
        {
            var thisObj = this;
            this.$parents.each(function () {
                if (thisObj.$activeItem[0] == $(this)[0]) {
                    thisObj.expandGroup($(this), true);
                } else {
                    thisObj.expandGroup($(this), false);
                }
            });
            e.stopPropagation();
            return false;
        }
    }
    return true;
};

treeview.prototype.handleKeyPress = function ($item, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
        return true;
    }
    switch (e.keyCode) {
        case this.keys.tab:
        {
            return true;
        }

        case this.keys.enter:
        case this.keys.home:
        case this.keys.end:
        case this.keys.left:
        case this.keys.right:
        case this.keys.up:
        case this.keys.down:
        {
            e.stopPropagation();
            return false;
        }

        default:
        {
            var chr = String.fromCharCode(e.which);
            var bMatch = false;
            var itemNdx = this.$visibleItems.index($item);
            var itemCnt = this.$visibleItems.length;
            var curNdx = itemNdx + 1;
            if (curNdx == itemCnt) {
                curNdx = 0;
            }
            while (curNdx != itemNdx) {
                var $curItem = this.$visibleItems.eq(curNdx);
                var titleChr = $curItem.text().charAt(0);
                if ($curItem.is(".tree-parent")) {
                    titleChr = $curItem.find("span").text().charAt(0);
                }
                if (titleChr.toLowerCase() == chr) {
                    bMatch = true;
                    break;
                }
                curNdx = curNdx + 1;
                if (curNdx == itemCnt) {
                    curNdx = 0;
                }
            }
            if (bMatch == true) {
                this.$activeItem = this.$visibleItems.eq(curNdx);
                this.$activeItem.focus();
            }
            e.stopPropagation();
            return false;
        }
    }
    return true;
};

treeview.prototype.handleDblClick = function ($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
        return true;
    }
    this.$activeItem = $id;
    this.updateStyling($id);
    this.toggleGroup($id, true);
    e.stopPropagation();
    return false;
};

treeview.prototype.handleClick = function ($id, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey) {
        return true;
    }
    this.$activeItem = $id;
    this.updateStyling($id);
    e.stopPropagation();
    return false;
};

treeview.prototype.handleFocus = function ($item, e) {
    if (this.$activeItem == null) {
        this.$activeItem = $item;
    }
    this.updateStyling(this.$activeItem);
    return true;
};

treeview.prototype.handleBlur = function ($id, e) {
    return true;
};

