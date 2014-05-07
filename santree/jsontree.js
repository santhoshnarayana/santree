function buildTree(data, id) {
    if (data) {
	
        rootid = removeSpace(data.title) + data.title.length;
        var root = $('<h2 class="treeHeading" />');
        root.text(data.title).attr('role', 'application').attr('id', rootid);
        $('#from').append(root);
        var tree = $('<ul/>');
        tree.attr('id', id)
            .attr('role', 'tree')
            .addClass('tree root-level')
            .attr('aria-labelledby', rootid);

			
			
        function innerTre(obj) {

		var subroot="";
            var finalObj,
                outerUl = $('<ul/>');
            outerUl.attr('role', 'group').attr("class","treeMenu")
            $.each(obj, function (i, items) {

			
                if (items.hasOwnProperty('child')) {
                    var outerLi = $('<li/>');
                    outerLi.addClass('tree-parent')
                        .attr('role', 'child')
						.attr('data-parent',items.root)
                        .attr('aria-expanded', true)
						.attr('data-value',removeSpace(items.title))
                        .attr('id', removeSpace(items.title));
                    subroot=items.title;
					
					//console.log('subroot'+subroot);
					var span = $('<span class="treespan"/> ');
                    span.text(items.title);
                    //console.log(items.title);
                    span.appendTo(outerLi);
                    outerLi.append(innerTre(items.child));
                    var temp;
                    if (items.hasOwnProperty('header')) {
                        var headerUL = $('<ul/>');
                        outerLi.appendTo(headerUL);
                        temp = headerUL;
                    }
                    else {
                        temp = outerLi;
                    }
                    if (items.hasOwnProperty('root')) {
					//var childroot=items.name;
                        tree.append(temp);
                    } else {
                        finalObj = temp;
                    }
                }
                else if (items.hasOwnProperty('children')) {
				if(items.title!==""){
                    var outerLi = $('<li/>');
                    outerLi.addClass('tree-parent')
                        .attr('role', 'children')
                        .attr('aria-expanded', true)
						.attr('data-parent',items.parent)
						.attr('id',items.title)
						.attr('data-value',items.title);
						
                    var span = $('<span/>');
                    span.text(items.title);
                    console.log(items.title);
                    span.appendTo(outerLi);
                    outerLi.append(buildInnerTree(items.children, items.title));
                    outerUl.append(outerLi);
					
                    finalObj = outerUl;
                }}
            });
            return finalObj;
        }

        tree.append(innerTre(data.root));
        return tree;
    }
	
    return '';
}




function removeSpace(data) {
    if (data) return data.replace(/\s/g, "-"); else return "";
}






function buildInnerTree(items, name) {
    var Ul = $('<ul/>');
    Ul.attr('id', removeSpace(name))
        .attr('role', 'group');
    $.each(items, function (i, item) {
        var innerLi = $('<li/>');
        innerLi.attr('role', 'treeitem')
		           .text(item.name)
            .attr('data-value', item.name)
			.attr('data-parent', item.value)
            .attr('tab-index', '-1');
        innerLi.appendTo(Ul);
    });
    return Ul;
}