//global variables for multi selecct tree
var businessroleId = 0;
var businessRoleName = null;
var businessGroupEdit = null;
var rowID = null;
var action = null;
var selectedJobj = {
    "title": "",
    "root": [{
            "title": "",
            "root": 1,
            "child": [{
                    "title": "",
                    "parent": "BIM",
                    "children": [{
                            "name": "",
                            "value": "c"
                        }
                    ]
                }
            ]
        }
    ]
}; //json	global variable
var toObj;
var oldToObj;
var tempToObj;
var flagforRight = 0; //for moving right
var ll = 0; //global for seleccted lis

//glbal vars



//functionality for filter the the Json Object with the given string
function jsonModuleFilter(msg){

    console.log('I got it:'+msg);
    console.log('The right data:'+JSON.stringify(ModuleJsonData));

    $.each(ModuleJsonData,function(index,child){

        //console.dir(index);
        //console.log(JSON.stringify(ModuleJsonData[name]));
        console.log("Index:"+index);

        console.log("child:"+JSON.stringify(child));
        if(index==='root')
        {
            $.each(child,function(index,children){

               console.log("childIndex:"+index);
               console.log("children:"+JSON.stringify(children));
                $.each(children,function(index,item){
                    console.log("childrenIndex:"+index);
                    console.log("item:"+JSON.stringify(item));
                    //console.dir(item);


                });


            });
        }


    });



}




//removenullfunction

function removeNullJsons(oldToObjj) {
    var tempJsonObj = {
        "title": "",
        "root": []
    }; //json	global variable;
    var rootloc = 0;
    var childloc = 0;
    var childrenloc = 0;

    console.log('>>>>>>>>>OldOne two what is old:' + JSON.stringify(oldToObjj));
    var rootLength = oldToObjj.root.length;
    console.log('>>>>>oldToObjj.root.length:' + oldToObjj.root.length);

    for (mr = 0; mr < rootLength; mr++) {
        if (oldToObjj.root[mr] != null) {
            tempJsonObj.root.push({
                "title": oldToObjj.root[mr].title,
                "root": oldToObjj.root[mr].root,
                "child": []
            });
            var fChildLength = oldToObjj.root[mr].child.length;
            console.log('ChildLength OF' + mr + ' rOOT is:' + fChildLength);
            childloc = 0;
            for (ch = 0; ch < fChildLength; ch++) {
                if (oldToObjj.root[mr].child[ch] != null) {
                    tempJsonObj.root[rootloc].child.push({
                        "title": oldToObjj.root[mr].child[ch].title,
                        "parent": oldToObjj.root[mr].child[ch].parent,
                        "children": []
                    });

                    var fChildrenLength = oldToObjj.root[mr].child[ch].children.length;
                    console.log('childrenLength:::::::' + fChildrenLength);

                    for (chid = 0; chid < fChildrenLength; chid++) {
                        console.log('>>>>>>>>>OldOne two what is old:' + JSON.stringify(oldToObjj));
                        console.log('>>>>>>>>>OldOne two what is old:' + JSON.stringify(tempJsonObj));
                        if (oldToObjj.root[mr].child[ch].children[chid] != null) {

                            console.log('not null children:' + oldToObjj.root[mr].child[ch].children[chid].name);
                            console.log('root loc' + rootloc);
                            console.log('childloc' + childloc);
                            tempJsonObj.root[rootloc].child[childloc].children.push({
                                "name": oldToObjj.root[mr].child[ch].children[chid].name,
                                "value": oldToObjj.root[mr].child[ch].children[chid].value
                            });

                        } //childrenif


                    } //children loop

                    childloc++;
                } //childif


            } //childloop
            rootloc++;

        } //rootif
    } //mail loop




    console.log('TempJson two after childAdd --------:' + JSON.stringify(tempJsonObj));
    return tempJsonObj;
}
//removenullfunction




//function for removing selected li from given json object


//ending of removing selected li function


//parent function will give selected li json object Begin

function parentFunction(li) {



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
    var UlSelecction = {'title':"",'root':[]};
    var childvalue;
    var childrenvalue;
    var u = 0; //for array index
    var l = 0;
    var co = li.attr('role');
    var currentrole = li.attr('role');

    console.log('the selected li having:' + li.attr('role'));

    if (currentrole === 'treeitem') {
        var selLength = $(".tree-focus").length;
        console.log('Selection Length of Lis:' + selLength);

        //$('#to').html('');
        ////alert('u can select'+co);
        for (var i = 0; co !== 'tree'; i++) {

            ////alert(li.parent().get(0).id);
            //var lli=li.parent();
            if (li.parent().get(0).tagName == 'UL') {

                ////alert('Data-parent:'+li.attr('data-parent')+'data-value'+li.attr('data-value'));
                //ULS[u]=li.parent().get(0).id;
                PS[u] = li.attr('data-parent');
                Childrens[u] = li.attr('children');
                Childs[u] = li.attr('child');
                DV[u] = li.attr('data-value');
                Roles[u] = li.attr('role');
                if (li.attr('role') == 'children') {
                    children = li.attr('data-value');
                    childrenvalue = li.attr('data-parent');
                    console.log('children:'+li.attr('data-value'));
                }
                if (li.attr('role') == 'child') {
                    child = li.attr('data-value');
                    childvalue = li.attr('data-parent');
                    console.log('child:'+li.attr('data-value'));
                }
                if (li.attr('role') == 'treeitem') {
                    treeitem = li.attr('data-value');
                    valuee = li.attr('data-parent');
                    console.log('treeitem:'+li.attr('data-value'));
                }

                u++;
            }
            li = li.parent();
            co = li.attr('role');
        }
        flagforRight = 1;
    } //end the role if

    if (currentrole !== 'treeitem') {
        flagforRight = 0;
        toObj = null; //sending object emptying
        console.log('u pressed it is child' + li.parent().get(0).tagName);
    }


    //selectedJobj.root[0].title=child;
    //selectedJobj.root[0].child[0].title=children;
    //selectedJobj.root[0].child[0].children[0].name=treeitem;


    //$('#to').append(buildTree(selectedJobj, 'selectto'));
    console.log('selected  one>>>>>>>>:' + JSON.stringify(selectedJobj));




    selectedJobj = {
        "title": "",
        "root": [{
                "title": child,
                "root": childvalue,
                "child": [{
                        "title": children,
                        "parent": childrenvalue,
                        "children": [{
                                "name": treeitem,
                                "value": valuee
                            }
                        ]
                    }
                ]
            }
        ]
    };






    //$(this).toggleClass("highlight");

    ////alert($(".highlight").length);


    console.log('SelectedJobj length:' + selectedJobj.root[0].length);




    console.log(selectedJobj);
    //toObj = $.parseJSON(selectedJobj);
    //toObj=selectedJobj;
    if (flagforRight !== 0) {
        toObj = jQuery.extend({}, selectedJobj);
        console.log('To Object length:' + toObj);
    }

    //FOR SELECTIon of parent
    if(currentrole=='children'){
        //alert('the children:'+li.parent().parent().text());

        var topUl=li.parent().parent()  ;
        //alert(topUl.attr('id'));
        UlSelecction.root.push({"title": topUl.attr('id'), "root": topUl.attr('data-parent'), "child": []});
        //alert('its having:'+li.html());

        var sul=li.find('ul li');
        //alert(li.attr('id'));
        UlSelecction.root[0].child.push({"title" : li.attr('id'),"root" : "","children" : []});
        UlSelecction.title= li.attr('id');

        $( li.find('ul li') ).each(function( index ) {
            UlSelecction.root[0].child[0].children.push({"name" : $(this).text(),"value" : $(this).attr('data-parent')});
            //alert(index + ": " + $(this).text() );
        });


        console.log('The selecction:----'+JSON.stringify(UlSelecction));
        toObj=UlSelecction;
        flagforRight=2;
    }


    return toObj;
}
//parent function will give selected li json object End




////////////////////////////////////////////////////////////////
//executeClone functionstarts
////////////////////////////////////////////////////////////

function executionClone(tt, f, t, all, oldToObj, toObj) {
    console.log('all value setto' + all);
    if (!all) {
        console.log('inside all');
        f = f + ' li.tree-focus';

    }

    console.log('out side all f:' + f);

    console.log('the old to obj----------' + oldToObj);
    console.log('old one:' + JSON.stringify(oldToObj));
    console.log('flagforright:' + flagforRight);
    if (flagforRight !== 0) {
        if (oldToObj) {

            var oldRootLength = oldToObj.root.length;
            console.log('old root length:' + oldRootLength);

            console.log('old one:' + JSON.stringify(oldToObj));
            console.log('new one:' + JSON.stringify(toObj));

            var flagforRoot = 0;
            for (ji = 0; ji < oldRootLength; ji++) {
                //old existing right tree values
                console.log('loop ToObj:');
                console.dir(toObj);
                console.log('loop:');
                console.dir(toObj.root[0]);
                console.log('ji:' + ji);
                var oldRoot = oldToObj.root[ji].title;
                //var newRoot=toObj.root[ji].title;//for multiselect
                var newRoot = toObj.root[0].title;

                console.log('oldroot:' + oldRoot);
                console.log('newroot:' + newRoot);

                var ro;

                if (oldRoot == newRoot) {
                    flagforRoot = 1;
                    //ro=ji;
                    console.log('Check once to old one:' + JSON.stringify(oldToObj));
                    console.log('Check once to new one:' + JSON.stringify(toObj));
                    break;
                }

            } //root loop end
            console.log(':::::::::flagforRoot:' + flagforRoot);
            if (flagforRoot == 0) {
                oldToObj.root[ji] = toObj.root[0]; //new root adding
            }
            if (flagforRoot == 1) {
                console.log('In existing root::');
                console.log('In location:' + ji);

                var oldChildLength = oldToObj.root[ji].child.length;


                console.log('old child length:' + oldChildLength);
                var flagForChild = 0;

                for (ch = 0; ch < oldChildLength; ch++) {

                    console.log('In child:' + (ch + 1));

                    var oldChild = oldToObj.root[ji].child[ch].title;
                    //var newChild=toObj.root[ji].child[ci].title;//for multiselect
                    var newChild = toObj.root[0].child[0].title;

                    console.log('oldchild:' + oldChild);
                    console.log('newchild:' + newChild);

                    if (oldChild === newChild) {
                        flagForChild = 1;
                        break;
                    }

                } //child loop
                console.log('flagForChild:' + flagForChild);

                if (flagForChild == 1) {
                    console.log('the child and root exists');
                    console.log('root:' + ji);
                    console.log('child' + ch);

                    var oldChildrenLength = oldToObj.root[ji].child[ch].children.length;
                    if(toObj.root[0]!=undefined){
                    if(toObj.root[0].child[ch]!=undefined){
                    var newChildrenLength = toObj.root[0].child[ch].children.length;
                    }
                    }else{

                        var newChildrenLength=1;
                    }
                    var childlength=0;

                   if(oldChildrenLength>newChildrenLength){
                       childlength= oldChildrenLength;
                   }
                    else{
                       childlength= newChildrenLength;
                   }

                    console.log('old children length:' + oldChildrenLength);
                    console.log('new children length:' + newChildrenLength);

                    var flagforChildren = 0;
                    for (chd = 0; chd < childlength; chd++) {

                        if(oldToObj.root[ji].child[ch].children[chd]!=undefined){
                        var oldVal = oldToObj.root[ji].child[ch].children[chd].name;
                        }
                        if(toObj.root[0]!=undefined){
                        if(toObj.root[0].child[ch].children[chd]!=undefined){
                            var newVal = toObj.root[0].child[ch].children[chd].name
                        }
                          else{
                        var newVal = toObj.root[0].child[0].children[0].name;
                        }
                        }else{
                            var newVal = toObj.root[0].child[0].children[0].name;
                        }
                        var newRootVal=0;
                        console.log('-------oldvalue:' + oldVal);
                        console.log('-------newvalue:' + newVal);

                        var check='no';
                        //checkChildren(children,object);
                       // if(toObj.root[0].child[0].children.length==1)
                        check=checkChildren(newVal,oldToObj.root[ji].child[ch].children);


                        if(check=='yes'){
                            //break;
                        }
                        else{
                            newRootVal=chd;
                            if(toObj.root[ji]!=undefined){
                            oldToObj.root[ji].child[ch].children.push(toObj.root[0].child[ch].children[chd]);
                            }
                            else{
                                oldToObj.root[ji].child[ch].children.push(toObj.root[0].child[0].children[chd]);
                            }
                            if(newChildrenLength==1){


                            }

                        }

                    } //children loop end


                    console.log('flag for children:' + flagforChildren);
                   // if (flagforChildren == 1) {
                        ////alert('its already filled');
                   // } else {

                     //   oldToObj.root[ji].child[ch].children[chd] = toObj.root[0].child[0].children[0];
                   // }
                } else {
                    console.log('the child and root match not exists');
                    console.log('can root:' + ji);
                    console.log('can child' + ch);
                    oldToObj.root[ji].child[ch] = toObj.root[0].child[0];
                }




            } //endof flagforRootif




        } //end of if
        if (oldToObj == null)
            oldToObj = jQuery.extend({}, toObj);

        console.log('before to old one:' + JSON.stringify(oldToObj));
        console.log('before to new one:' + JSON.stringify(toObj));

        $(tt).html('');
            oldToObj= removeNullJsons(oldToObj);
        $(tt).append(buildTree(oldToObj, t));
        var treeviewApp2 = new treeview(t);


        //oldToObj=jQuery.extend({}, toObj);;
    } //flagforRight if end

    return oldToObj;
} //executionClone function end	
//////////////////////////////////////////////////////////////////////

//to check children present or not
function checkChildren(children,Object){
    var status='no';
    var len=Object.length;
    for(le=0;le<len;le++){
        if(Object[le].name===children)
        {
            status='yes';
            break;
        }
        console.log('Text:'+Object[le].name);
    }
    return status;
}


/////////////////////////////////////////////////
//removing selected li
/////////////////////////////////////
//thd code for remove

function removeSelectObj(oldToObj, toObj) {

    var oldRootLength = oldToObj.root.length;
    console.log('old root length:' + oldRootLength);

    console.log('old one:' + JSON.stringify(oldToObj));
    console.log('new one:' + JSON.stringify(toObj));

    var flagforRoot = 0;
    for (ji = 0; ji < oldRootLength; ji++) {
        //old existing right tree values
        console.log('loop ToObj:');
        console.dir(toObj);
        console.log('loop:');
        console.dir(toObj.root[ji]);
        console.log('ji:' + ji);
        var oldRoot = oldToObj.root[ji].root;
        //var newRoot=toObj.root[ji].title;//for multiselect
        var newRoot = toObj.root[0].root;

        console.log('oldroot:' + oldRoot);
        console.log('newroot:' + newRoot);

        var ro;

        if (oldRoot == newRoot) {
            flagforRoot = 1;
            //ro=ji;
            console.log('Oldroot Title:'+oldToObj.title);
            console.log('To be delete Newroot Title:'+toObj.title);
            console.log('Check once to old one:' + JSON.stringify(oldToObj));
            console.log('Check once to new one:' + JSON.stringify(toObj));
            break;
        }

    } //root loop end
    console.log(':::::::::flagforRoot:' + flagforRoot);
    if (flagforRoot == 0) {
        oldToObj.root[ji] = toObj.root[0]; //new root adding
    }
    if (flagforRoot == 1) {
        console.log('In existing root::');
        console.log('In location:' + ji);

        var oldChildLength = oldToObj.root[ji].child.length;


        console.log('old child length:' + oldChildLength);
        var flagForChild = 0;

        for (ch = 0; ch < oldChildLength; ch++) {

            console.log('In child:' + (ch + 1));

            var oldChild = oldToObj.root[ji].child[ch].title;
            //var newChild=toObj.root[ji].child[ci].title;//for multiselect
            var newChild = toObj.root[0].child[0].title;

            console.log('oldchild:' + oldChild);
            console.log('newchild:' + newChild);

            if (oldChild === newChild) {


                flagForChild = 1;
                break;
            }

        } //child loop
        console.log('flagForChild:' + flagForChild);

        if (flagForChild == 1) {
            console.log('the child and root exists');
            console.log('root:' + ji);
            console.log('child' + ch);

            var oldChildrenLength = oldToObj.root[ji].child[ch].children.length;

            console.log('old children length:' + oldChildrenLength);
            var flagforChildren = 0;
            for (chd = 0; chd < oldChildrenLength; chd++) {

                var oldVal = oldToObj.root[ji].child[ch].children[chd].name;
                var newVal = toObj.root[0].child[0].children[0].name;

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

                if(toObj.title===oldChild)
                {

                    console.log('Length:'+oldToObj.root[ji].child.length);
                    if(oldToObj.root[ji].child.length===1){
                    delete oldToObj.root[ji];
                    }else{
                        delete oldToObj.root[ji].child[ch];
                    }

                }else
                if (oldToObj.root[ji].child[ch].children.length == 1 && oldToObj.root[ji].child.length == 1) {
                    console.log('root deleted' + ji);
                    delete oldToObj.root[ji];
                } else if (oldToObj.root[ji].child[ch].children.length == 1 && oldToObj.root[ji].child.length > 1) {
                    delete oldToObj.root[ji].child[ch];


                } else {
                    delete oldToObj.root[ji].child[ch].children[chd];
                }
            } else {
                console.log('no match');
            }
        } else {
            console.log('the child and root match not exists');
            console.log('can root:' + ji);
            console.log('can child' + ch);
            oldToObj.root[ji].child[ch] = toObj.root[0].child[0];
        }

        //$('#to').html('');
        //$('#to').append(buildTree(oldToObj, 'selectto'));


        
        
    }



    return oldToObj;
} //end of if

