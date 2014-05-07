//global variables for multi selecct tree
var businessroleId = 0;
var businessRoleName = null;
var businessGroupEdit = null;
var rowID = null;
var action = null;



var ModuletoObj;
//var ModuleoldToObj;
//var tempToObj;
var flagforRight = 0; //for moving right
var ll = 0; //global for seleccted lis

//glbal vars

//removenullfunction

function ModuleremoveNullJsons(ModuleoldToObjj) {
	var ModuleTempJsonObj = {
		"title" : "",
		"root" : []
	}; //json	global variable;
	var rootloc = 0;
	var childloc = 0;
	var childrenloc = 0;

	console.log('>>>>>>>>>OldOne two what is old:'+ JSON.stringify(ModuleoldToObjj));
	var rootLength = ModuleoldToObjj.root.length;
	console.log('>>>>>ModuleoldToObjj.root.length:'+ ModuleoldToObjj.root.length);

	for (mr = 0; mr < rootLength; mr++) {
		if (ModuleoldToObjj.root[mr] != null) {
			ModuleTempJsonObj.root.push({
				"title" : ModuleoldToObjj.root[mr].title,
				"children" : []
			});

			var fChildrenLength = ModuleoldToObjj.root[mr].children.length;
			console.log('childrenLength:::::::' + fChildrenLength);

			for (chid = 0; chid < fChildrenLength; chid++) {
				console.log('>>>>>>>>>OldOne two what is old:'	+ JSON.stringify(ModuleoldToObjj));
				console.log('>>>>>>>>>OldOne two what is old:'+ JSON.stringify(ModuleTempJsonObj));
				var childrenSize = ModuleoldToObjj.root[mr].children.size;
				console.log('children size:' + childrenSize);
				if (ModuleoldToObjj.root[mr].children[chid] != null) {

					console.log('not null children:'	+ ModuleoldToObjj.root[mr].children[chid].name);
					console.log('root loc' + rootloc);
					console.log('childloc' + childloc);
					ModuleTempJsonObj.root[rootloc].children.push({
						"name" : ModuleoldToObjj.root[mr].children[chid].name,
						"value" : ModuleoldToObjj.root[mr].children[chid].value
					});

				} //childrenif

			} //children loop

			childloc++;

			rootloc++;

		} //rootif
	} //mail loop

	console.log('TempJson two after childAdd --------:'+ JSON.stringify(ModuleTempJsonObj));
	return ModuleTempJsonObj;
}
//removenullfunction

//function for removing selected li from given json object

//ending of removing selected li function

//parent function will give selected li json object Begin

function ModuleParentFunction(li) {

	////alert(li.text());
	var ULS = new Array();
	var LIS = new Array();
	var PS = new Array();
	var DV = new Array();
	var Childrens = new Array();
	var Childs = new Array();
	var Roles = new Array();
	var Datas = new Array();
	var children;
	var child;
	var treeitem;
	var valuee;
	var childvalue;
	var childrenvalue;
	var u = 0; //for array index
	var l = 0;
	var co = li.attr('role');
	var currentrole = li.attr('role');
	var ModuletoObjSelect = null;
	var UlSelecction = {'title':"",'root':[]};
	var ModuleSectedJobj = {
		"title" : "",
		"root" : [ {
			"title" : "",
			"root" : "",
			"child" : [ {
				"title" : "",
				"parent" : "",
				"children" : [ {
					"name" : "",	
					"value" : ""
				} ]
			} ]
		} ]
	}; //json	global variable
	console.log('the selected li having:' + li.attr('role'));
	console.log("U have selected::"+li.text());
	

	

	
	
	if (currentrole === 'treeitem') {
		var selLength = $(".tree-focus").length;
		console.log('Selection Length of Lis:' + selLength);

		//$('#to').html('');
		////alert('u can select'+co);
		for ( var i = 0; co !== 'tree'; i++) {

			////alert(li.parent().get(0).id);
			//var lli=li.parent();
			if (li.parent().get(0).tagName == 'UL') {

				////alert('Data-parent:'+li.attr('data-parent')+'data-value'+li.attr('data-value'));
				ULS[u]=li.parent().get(0).id;
				PS[u] = li.attr('data-parent');
				Childrens[u] = li.attr('children');
				Childs[u] = li.attr('child');
				DV[u] = li.attr('data-value');
				Roles[u] = li.attr('role');
				if (li.attr('role') == 'children') {
				
					children = li.attr('data-value');
					childrenvalue = li.attr('data-parent');
					//////console.log('children:'+li.attr('data-value'));
				}
				if (li.attr('role') == 'child') {
					child = li.attr('data-value');
					childvalue = li.attr('data-parent');
					//////console.log('child:'+li.attr('data-value'));
				}
				if (li.attr('role') == 'treeitem') {
					treeitem = li.attr('data-value');
					valuee = li.attr('data-parent');
					//////console.log('treeitem:'+li.attr('data-value'));
				}

				u++;
			}
			li = li.parent();
			co = li.attr('role');
		}
		flagforRight = 1;
	} //end the role if

	//if (currentrole !== 'treeitem') {
		//flagforRight = 0;
		//ModuletoObjSelect = null; //sending object emptying
		console.log('u pressed it is child' + li.parent().get(0).tagName);
	//}
	
	
	
	
	

	//ModuleSectedJobj.root[0].title=child;
	//ModuleSectedJobj.root[0].child[0].title=children;
	//ModuleSectedJobj.root[0].child[0].children[0].name=treeitem;

	//$('#to').append(buildTree(ModuleSectedJobj, 'selectto'));
	console.log('selected  one>>>>>>>>:' + JSON.stringify(ModuleSectedJobj));

	ModuleSectedJobj = {
		"title" : "",
		"root" : [ {
			"title" : children,
			"parent" : childrenvalue,
			"children" : [ {
				"name" : treeitem,
				"value" : valuee
			} ]
		} ]
	};

	if (flagforRight !== 0) {
		ModuletoObjSelect = jQuery.extend({}, ModuleSectedJobj);
		console.log('To Object length:' + ModuletoObjSelect);
	}

	
	
	//FOR SELECTIon of parent
	if(currentrole=='children'){

	//alert('its having:'+li.html());
	
        var sul=li.find('ul li');
		//alert(li.attr('id'));
		UlSelecction.root.push({"title" : li.attr('id'),"root" : "","children" : []});
		UlSelecction.title= li.attr('id');

		$( li.find('ul li') ).each(function( index ) {
		UlSelecction.root[0].children.push({"name" : $(this).text(),"value" : $(this).attr('data-parent')});
//alert(index + ": " + $(this).text() );
});
	

	console.log('The selecction:----'+JSON.stringify(UlSelecction));
	ModuletoObjSelect=UlSelecction;
	}
	
	
console.log('Last at parent function'+JSON.stringify(ModuletoObjSelect));
	return ModuletoObjSelect;
}
//parent function will give selected li json object End

////////////////////////////////////////////////////////////////
//executeClone functionstarts
////////////////////////////////////////////////////////////

function ModuleExecutionClone(tt, f, t, all, ModuleoldToObj, ModuletoObj) {
	console.log('all value setto' + all);
	if (!all) {
		console.log('inside all');
		f = f + ' li.tree-focus';

	}

	console.log('out side all f:' + f);

	console.log('the old to obj----------' + ModuleoldToObj);
	console.log('old one:' + JSON.stringify(ModuleoldToObj));
	console.log('flagforright:' + flagforRight);

		if(ModuleoldToObj) {

			var oldRootLength = ModuleoldToObj.root.length;
			console.log('old root length:' + oldRootLength);

			console.log('old one:' + JSON.stringify(ModuleoldToObj));
			console.log('new one:' + JSON.stringify(ModuletoObj));

			var flagforRoot = 0;
			for (ji = 0; ji < oldRootLength; ji++) {
				//old existing right tree values
				console.log('loop ModuletoObj:');
				console.dir(ModuletoObj);
				console.log('loop:');
				console.dir(ModuletoObj.root[ji]);
				console.log('ji:' + ji);
				var oldRoot = ModuleoldToObj.root[ji].title;
				//var newRoot=ModuletoObj.root[ji].title;//for multiselect
				var newRoot = ModuletoObj.root[0].title;

				console.log('oldroot:' + oldRoot);
				console.log('newroot:' + newRoot);

				var ro;

				if (oldRoot == newRoot) {
					flagforRoot = 1;
					//ro=ji;
					console.log('Check once to old one:'+ JSON.stringify(ModuleoldToObj));
					console.log('Check once to new one:'+ JSON.stringify(ModuletoObj));
					break;
				}

			} //root loop end
			console.log(':::::::::flagforRoot:' + flagforRoot);
			if (flagforRoot == 0) {
				ModuleoldToObj.root[ji] = ModuletoObj.root[0]; //new root adding
			}
			if (flagforRoot == 1) {
				console.log('In existing root::');
				console.log('In location:' + ji);

				//var oldChildLength = ModuleoldToObj.root[ji].child.length;

				//child loop declined for two level
				//////console.log('flagForChild declined:' + flagForChild);

				console.log('the child and root exists');
				console.log('root:' + ji);
				//////console.log('child' + ch);

				var oldChildrenLength = ModuleoldToObj.root[ji].children.length;

                if(ModuletoObj.root[0]!=undefined)
                var newChildrenLength=  ModuletoObj.root[0].children.length;

				console.log('old children length:' + oldChildrenLength);
                console.log('New children length:' + newChildrenLength);
                var chLength=oldChildrenLength;
               if(oldChildrenLength>newChildrenLength){
                    chLength  =oldChildrenLength;
                }   else{
                    chLength  =newChildrenLength;
                }

				var flagforChildren = 0;
				for (chd = 0; chd < chLength; chd++) {

                    if(ModuleoldToObj.root[ji].children[chd]!=undefined){
					var oldVal = ModuleoldToObj.root[ji].children[chd].name;
                    }

                    if(ModuletoObj.root[0]!=undefined)  {

                        if(ModuletoObj.root[0].children[chd]!=undefined){

                            var newVal = ModuletoObj.root[0].children[chd].name;
                        }
                           else{
                    var newVal = ModuletoObj.root[0].children[0].name;
                        }
                    }
                    else{
                        var newVal = ModuletoObj.root[0].children[0].name;
                    }


					console.log('-------oldvalue:' + oldVal);
					console.log('-------newvalue:' + newVal);


                    var check='no';
                    //checkChildren(children,object);
                    // if(toObj.root[0].child[0].children.length==1)
                    check=checkChildren(newVal,ModuleoldToObj.root[ji].children);


                    if(check=='yes'){
                        //break;
                    }
                    else{
                                if(ModuletoObj.root[0]!=undefined)
                                {
                                    if(ModuletoObj.root[0].children[chd-1]!=null)
                                        ModuleoldToObj.root[ji].children.push(ModuletoObj.root[0].children[chd]);
                                    else{
                                        ModuleoldToObj.root[ji].children.push(ModuletoObj.root[0].children[0]);
                                                                           }
                                }
                                else{


                                    ModuleoldToObj.root[ji].children.push(ModuletoObj.root[0].children[0]);
                                }


                            }

				} //children loop end

				console.log('flag for children:' + flagforChildren);


			} //endof flagforRootif

		} //end of if
		if (ModuleoldToObj == null)
			ModuleoldToObj = jQuery.extend({}, ModuletoObj);

		console.log('before to old one:' + JSON.stringify(ModuleoldToObj));
		console.log('before to new one:' + JSON.stringify(ModuletoObj));

		$(tt).html('');
		$(tt).append(buildTree(ModuleoldToObj, t));
		var treeviewApp2 = new treeview(t);

		//ModuleoldToObj=jQuery.extend({}, ModuletoObj);;


	return ModuleoldToObj;
} //ModuleExecutionClone function end	
//////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
//removing selected li
/////////////////////////////////////
//thd code for remove

function ModuleremoveSelectObj(ModuleoldToObj, ModuletoObj) {

	var oldRootLength = ModuleoldToObj.root.length;
	console.log('old root length:' + oldRootLength);

	console.log('old one:' + JSON.stringify(ModuleoldToObj));
	console.log('new one:' + JSON.stringify(ModuletoObj));

    console.log('The ul selected:'+ModuletoObj.title);
    //for UL remove
    var ulselect=ModuletoObj.title;

	var flagforRoot = 0;
	for (ji = 0; ji < oldRootLength; ji++) {
		//old existing right tree values
		console.log('loop ModuletoObj:');
		console.dir(ModuletoObj);
		console.log('loop:');
		console.dir(ModuletoObj.root[ji]);
		console.log('ji:' + ji);
		var oldRoot = ModuleoldToObj.root[ji].title;
		//var newRoot=ModuletoObj.root[ji].title;//for multiselect
		var newRoot = ModuletoObj.root[0].title;

		console.log('oldroot:' + oldRoot);
		console.log('newroot:' + newRoot);

		var ro;
        if(ulselect===ModuleoldToObj.root[ji].title)
        {
            flagforRoot = 2;
            delete ModuleoldToObj.root[ji];
            break;
        }

		if (oldRoot == newRoot) {
			flagforRoot = 1;
			//ro=ji;
			console.log('Check once to old one:'	+ JSON.stringify(ModuleoldToObj));
			console.log('Check once to new one:' + JSON.stringify(ModuletoObj));

			break;
		}

	} //root loop end
	console.log(':::::::::flagforRoot:' + flagforRoot);
	if (flagforRoot == 0) {
		ModuleoldToObj.root[ji] = ModuletoObj.root[0]; //new root adding
	}
	if (flagforRoot == 1) {
		console.log('In existing root::');
		console.log('In location:' + ji);

		console.log('the child and root exists');
		console.log('root:' + ji);

		var oldChildrenLength = ModuleoldToObj.root[ji].children.length;

		console.log('old children length:' + oldChildrenLength);
		var flagforChildren = 0;
		for (chd = 0; chd < oldChildrenLength; chd++) {

			var oldVal = ModuleoldToObj.root[ji].children[chd].name;
			var newVal = ModuletoObj.root[0].children[0].name;

			console.log('-------oldvalue:' + oldVal);
			console.log('-------newvalue:' + newVal);
			if (oldVal === newVal) {
				flagforChildren = 1;
				break;
			}

		} //children loop end

		console.log('flag for children:' + flagforChildren);
		if (flagforChildren == 1) {
			console.log('its already filled');
            console.log('The RootIs Deleting:'+ModuletoObj.root[0].title);
			if (ModuleoldToObj.root[ji].children.length == 1) {
				console.log('root deleted' + ji);
				delete ModuleoldToObj.root[ji];
			} else if (ModuleoldToObj.root[ji].children.length > 1) {
				delete ModuleoldToObj.root[ji].children[chd];

			}
		} else {
			console.log('no match');
		}
	}

	//$('#to').html('');
	//$('#to').append(buildTree(ModuleoldToObj, 'selectto'));

	return ModuleoldToObj;
}

//end of if