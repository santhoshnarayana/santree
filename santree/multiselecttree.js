/**
 *multi select tree framework using jqtree.js plugin
 *@auther:074
 */


// multi select tree vars
var selectedSubTree,
    selectedNode,
    selectedTreeBtoT,
    nodeObj = [],
    superNodeObj = [],
    bnodeObj,
    selectedNodeArray = [],
    fullTreeForSelected,
    subTreeForSelected;

//for status check
var moveStatus=false;

var $from, $to;


/**
 *Initializes the tree for the first time.
 *this should be called before using the tree generating framework
 */
function initializeSecGenTree(fromId,toId){

    //console.log('[INFO]: Initializing tree.....');
    //initialization of trees
    $('#'+fromId).tree({

        //data: ExampleData.example_data,
        data: [],
        autoOpen: true,
        closedIcon: '<img class="headerImg" src="img/contracted-focus.gif" />',
        openedIcon: '<img class="headerImg" src="img/expanded.gif" />'


    });


    $('#'+toId).tree({

        data: [],
        autoOpen: true,
        closedIcon: '<img class="headerImg" src="img/contracted-focus.gif" />',
        openedIcon: '<img class="headerImg" src="img/expanded.gif" />'

    });




}


/**
 *Gives the status of the movement or modified one.
 *if modified returns true or false.
 */

function checkTreeMoveStatus(){

    return moveStatus;
}

function secTreeGen(fromId,toId,leftData,rightData,rightMove,rightAllMove,remove,removeALL){
//function secTreeGen(){





    //-------   multi select jq tree Code-Block-Start-----------


    //assighning the from tree ids to vars
    var $from = $('#'+fromId);
    var $to = $('#'+toId);




    /**
     * Creates the left side tree with a empty data
     * for the first time.
     * All other nodes will be updated to the same tree
     *
     */



    $from.tree('loadData', leftData,'');
    $from.perfectScrollbar('update');



    /**
     * Creates the Right side tree with a empty data
     * for the first time.
     * All other nodes will be updated to the same tree
     *
     */

    $to.tree('loadData', rightData,'');
    $to.perfectScrollbar('update');




    $from.bind(
        'tree.select',
        function (event) {
            if (event.node) {
                // node was selected AND copied to sectednodeBtoT also
                selectedNode = event.node;
                selectedTreeBtoT = selectedNode;


                fullTreeForSelected = selectedNode.getFullData();
                subTreeForSelected = selectedNode.getDataWithSelf();
                //console.log('Full Tree 138 '+JSON.stringify(fullTreeForSelected));
                //console.log('SubTree:138 ' + JSON.stringify(subTreeForSelected));


            }
            else {
                // event.node is null
                // a node was deselected
                // e.previous_node contains the deselected node
            }
        });






    /**
     * By clicking the right arrow (>>) btton this function
     * will perform the action and generate the right panel
     * tree
     *btn-add click event funtion
     *it will add to the Right tree with the selected data object
     */
    $('#'+rightMove).click(function (e) {

        //setting the movestatus
        moveStatus=true;


        var rightRoot = $to.tree('getTree');
        var rightTreeData = rightRoot.getData();
        //console.log(' Selected the subtree:' + JSON.stringify(rightTreeData));

        //if Right side tree is not existed
        if (rightTreeData == undefined || rightTreeData.length == 0) {


            rightTreeData = fullTreeForSelected;
            //console.log('Now Selected the subtree:' + JSON.stringify(fullTreeForSelected));
            $to.tree('loadData', rightTreeData,'');
            $to.perfectScrollbar('update');
        }
        //if Right side tree existed
        else {
            var objwithkv = [],data=fullTreeForSelected;
            //console.dir(data[0].name);
            //console.log('138',subTreeForSelected);
            //console.log(JSON.stringify(fullTreeForSelected));
            var levelOfData = 0;
            for (var i = 1; data[0].name!==subTreeForSelected[0].name; i++) {
                var dummy = {};
                for (k in data[0]) {
                    v = data[0][k];
                    if ((k !== 'parent' && k !== 'children' && k !== 'element' && k !== 'tree' && k!=='licenceCount') && Object.prototype.hasOwnProperty.call(data[0], k)) {
                        dummy[k] = v;
                    }
                }
                objwithkv.push(dummy);
                data = data[0].children;
            }
            objwithkv.push(subTreeForSelected[0]);
            //console.log('objwithkv',objwithkv);

            for(var i=(objwithkv.length-1);i>=0;i--,levelOfData=i)
            {
                var toSelectedNode = $to.tree('getNodeById',objwithkv[i].id);
				
                if(toSelectedNode!==null&&toSelectedNode!==undefined)
                {
                    for(var j= i+1,len=objwithkv.length;j<len;j++)
                    {
                        $to.tree('appendNode',objwithkv[j],toSelectedNode);
                        $to.tree('openNode',toSelectedNode);
                        toSelectedNode = $to.tree('getNodeById',objwithkv[j].id);
                    }
                    i=-3;
                    if(subTreeForSelected[0].children)
                        $to.tree('loadData', subTreeForSelected[0].children, toSelectedNode);


                    $to.perfectScrollbar('update');
                }
            }
            //console.log(levelOfData);
            if(levelOfData==-1)
            {
                var original = $to.tree('getTree');
                var originalData = original.getData();
                //console.log("originalData"+JSON.stringify(originalData));
                originalData.push( fullTreeForSelected[0]);
                //console.log('fullTreeForSelected:'+JSON.stringify(fullTreeForSelected[0]));
                $to.tree('loadData', originalData,'');

                $to.perfectScrollbar('update');
            }

        }


        //loading right panel tree with new data


    });


    /**
     * By clicking the right arrow (>>>) btton this function
     * will perform the action and generate the right panel
     * tree
     *btn-addAll click event funtion
     *it will add to the Right tree with All data object of left panel tree
     */
    $('#'+rightAllMove).click(function (e) {


        //setting the movestatus
        moveStatus=true;


        //console.log('rightAll Moved');
        //getting the from tree total data object rootNode
        var leftTreeRoot = $from.tree('getTree');

        //getting the from tree total data object
        var leftTreeData = leftTreeRoot.getData();
        //assigning to the rightData object
        rightTreeData=leftTreeData;

        ////console.log(leftTreeData);
        //generating right panel tree
        $to.tree('loadData', leftTreeData,'');
        $to.perfectScrollbar('update');

    });



    /**
     * By clicking the left arrow (<<) btton this function
     * will perform the action and generate the right panel
     * tree
     *btn-remove click event funtion
     *it will remove from the Right tree with selected data object of left panel tree
     */
    $('#'+remove).click(function (e) {


        //setting the movestatus
        moveStatus=true;
        var removableNode;

        var selectedToNode =  $to.tree('getSelectedNode');


        //var parentNode=selectedToNode.parent;
        removeSelectedNode(selectedToNode);


    });

    function removeSelectedNode(node){

        var parentNode=node.parent;

        $to.tree('removeNode', node);

       // console.log(parentNode);

        if(null!=parentNode&&!parentNode.hasChildren()){
             if(parentNode.menu!=true&&parentNode.module!=true)
            removeSelectedNode(parentNode);

        }

    }




    /**
     * By clicking the left arrow (<<<) btton this function
     * will perform the action and generate the right panel
     * tree
     *btn-removeAll click event funtion
     *it will remove from the Right tree with All data object of left panel tree
     */
    $('#'+removeALL).click(function (e) {

        //setting the movestatus
        moveStatus=true;

        ////console.log(getRightTreeData("to"));
        $to.tree('loadData', [],'');
        $to.perfectScrollbar('update');


    });






}


/**
 *FUNCTION for getting the Tree total json data
 *
 */

function getRightTreeData(treeId){
    //getting the right tree total data object rootNode
    var rightTRoot = $('#'+treeId).tree('getTree');

    //getting the LEFT tree total data object
    var rightTData = rightTRoot.getData();

    return rightTData;

}


/**
 *compare the two nodes and gives the result
 * @author:074
 *
 * @param fromNode
 * @param toNode
 */

function hasChildrenNodes(node){

    if(node.children!=undefined&&node.children.length!=null&&node.children.length!=0){
        return true;
    }
    else{
        return false;
    }
}


/**
 * compares treenodes and removes the not existed nodes from the toTreeNode from fromTreeNode
 *
 * @author:074
 *
 * @param fromTreeNode
 * @param toTreeNode
 */
function treeSync(fromTreeNode,toTreeNode,toMenuId){

   // console.log("FromNode:"+JSON.stringify(fromTreeNode));
   // console.log("ToNode:"+JSON.stringify(toTreeNode));

    //console.log("fromLength:"+fromTreeNode.length);
    // console.log("toLength:"+toTreeNode.length);


    var toResultNode=syncNode(fromTreeNode,toTreeNode,toMenuId);
   // console.log('Got TO:'+JSON.stringify(toResultNode));
    return toResultNode.children;




}

var toNodeStore =null;
function syncNode(fromTreeNode,toTreeNode,toMenuId){

    //console.log("[FROM-TREE] "+JSON.stringify(fromTreeNode));
   // console.log("[TO-TREE] "+JSON.stringify(toTreeNode));


  //  console.log("FromTreeLength:"+fromTreeNode.length);
   // console.log("ToTreeLength:"+toTreeNode.length);
    toNodeStore={id:0,children:toTreeNode};

    // console.log("--------FROM NODES-----");
    // checkTreeNodeFrom({children:fromTreeNode});
   // console.log("--------TO NODES-----");
    return checkTreeNodeTo({id:0,children:toTreeNode},{id:0,children:fromTreeNode},toMenuId);


}

function checkTreeNodeFrom(fTreeNode,node){



   // console.log("[fNODE] "+JSON.stringify(fTreeNode));
  //  console.log("[tNODE] "+JSON.stringify(node));
    if(null!=node && node.id!==undefined&& fTreeNode.id==node.id){

       // console.log(node.id+"---FOUND---");
        return true;
    }


    if(hasChildrenNodes(fTreeNode)){
        for(var i=0;i<fTreeNode.children.length;i++){

            if(checkTreeNodeFrom(fTreeNode.children[i],node)!==true)
            {
            }
            else{

                return true;
            }
        }
    }


}

function checkTreeNodeTo(tNode,fTreeNode,toMenuId){



    //console.log("[tNODE] --->---> "+JSON.stringify(tNode));

    var stat=checkTreeNodeFrom(fTreeNode,tNode,toMenuId);
   // $to.tree('removeNode', tNode);

   //console.log("[STATUS]:"+stat);
    if(stat===undefined){

       //console.log("REMOVED NODE:"+tNode.id);
        var rnode=  $("#"+toMenuId).tree('getNodeById', tNode.id);
        $("#"+toMenuId).tree('removeNode', rnode);
        return false;
    }


    if(hasChildrenNodes(tNode)){
        for(var i=0;i<tNode.children.length;i++){

            var ss= checkTreeNodeTo(tNode.children[i],fTreeNode,toMenuId);
            if(ss===false){
                //console.log(JSON.stringify("Removed:"+JSON.stringify(toNodeStore.children[i])));
                //toNodeStore.children[i-1]=null;
            }
        }
    }


    return toNodeStore;
}


//---------------------------- multi select jq tree Code-Block-End ----------------------------

