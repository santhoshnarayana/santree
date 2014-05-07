        /**
		*multi select tree using jqtree.js plugin
		*@auther:Santhosh.Narayana
		*/
		
		
	// multi select tree vars
	var selectedSubTree;
	var selectedNode;
	var selectedTreeBtoT;
	var nodeObj=[];
	var superNodeObj=[];
	var bnodeObj;
	var selectedNodeArray=[];
	var rightTreeData;
        
	$(document).ready(function()  
	{
		
		
		
		//-------   multi select jq tree Code-Block-Start-----------
		
		var $from = $('#from');
		var $to= $('#to');
		
		$from.tree({
		
		data:ExampleData.example_data,
		autoOpen:true,
		
		
		});
		
		$from.bind(
		'tree.select',
		function(event) {
        if (event.node) {
            // node was selected AND copied to sectednodeBtoT also
           selectedNode = event.node;
		   selectedTreeBtoT=selectedNode;
		   
		   
		   selectedSubTree=selectedNode.getData();
			
            //console.log("Selected Name:"+selectedNode.name);
			
			//console.log("Selected ID:"+selectedNode.id);
			
			nodeObj.push({label: selectedNode.name,id:selectedNode.id,children:""});
			
			////console.log("Created Node:"+JSON.stringify(nodeObj));
			
			nodeObj[0].children=selectedSubTree;
			console.log('the subtree:'+JSON.stringify(selectedSubTree));
			////console.log("After Created Node:"+JSON.stringify(nodeObj));
			
			
			var nparent=selectedTreeBtoT.parent;
			var tlevel=selectedTreeBtoT.getLevel();
			//console.log('parent of selected node:'+nparent.name);
			//console.log("level of node:"+tlevel);
			bnodeObj=selectedTreeBtoT;
			
			//insializing with empty value
			selectedNodeArray=[];
			
			
			
			//loop upto top level parent
			for(var i=0;i<tlevel;i++)
			{
			
			selectedNodeArray.push({label: selectedTreeBtoT.name,id:selectedTreeBtoT.id});
			
			/* //console.log(selectedTreeBtoT.parent.name);
			//console.log(selectedTreeBtoT.parent.id); */
			
			selectedTreeBtoT=selectedTreeBtoT.parent;
			
			
			}
			
			//making cyclic object for the array of nodes.
			superNodeObj= makeTreeCyclic(selectedNodeArray,tlevel);
			
			
			if(rightTreeData==undefined)			
			{
			rightTreeData=superNodeObj;
			}
			else{
			alert("nodata");
			
			rightTreeData=checkAndMerge(rightTreeData,superNodeObj,$to,$from,selectedSubTree);
			
			//console.log("AfterCheck:"+JSON.stringify(rightTreeData));
			
			}
			
			
			
        }
        else {
            // event.node is null
            // a node was deselected
            // e.previous_node contains the deselected node
        }
			});
		
		
		
		/**
		*This function made us the cyclic object for given array
		*/
		function makeTreeCyclic(selectedNodeArray,tlevel){
			//console.log("----------------------");
			//console.log(selectedNodeArray);
			//inisializing with empty array.
			superNodeObj=[];
			var ssubtree=null;
			var tempobj=null;
			var kk=null;
			kk={label:selectedNodeArray[tlevel-1].label,id:selectedNodeArray[tlevel-1].id,children:[]};
			for(var i=tlevel-2;i>=0;i--)
			{
			
			tempobj={label:selectedNodeArray[i].label,id:selectedNodeArray[i].id,children:[]};
			//for the first iterator obj
			
			
			kk.children.push(tempobj);;
			
			//console.log(i);
			//console.log(selectedNodeArray[i]);
			//console.log("kk:"+i);
			//console.log(kk);
			if(i===tlevel-2)
			ssubtree=kk;
			kk=tempobj;
			
			
			}
			
			//console.log('the subtree:');
			//console.log(ssubtree);
			superNodeObj.push(ssubtree);
			//console.log('the NodeObj:');
			//console.log(superNodeObj);
			//console.log(rightTreeData);
			
			return superNodeObj;
			}
		
		
		
		
		
		/**
		* By clicking the right arrow (>>) btton this function
		* will perform the action and generate the right panel
		* tree
		*/
		
		
		$to.tree({
		
		data:{},
		autoOpen:true,
		
		
		});
		
		/**
		*btn-add click even funtion
		*/
		$('#btn-add').click(function(e){
		//console.log(' Selected the subtree:'+JSON.stringify(rightTreeData));
		//console.log(superNodeObj.length);
		
		
		//loading right panel tree with new data
		$to.tree('loadData', rightTreeData);
		
		
		
		});
		
		
		
		/**
		*this method will check the existing rightpanel tree
		*merge the leafs for the existing parents
		*/
		
		function checkAndMerge(rData,sData,$to,$from,sSubTree){
		
		
		
		console.log('Checking............');
		
		var checkNodeName=selectedNode.name;
		var checkNodeId=selectedNode.id
		var checkLevel=selectedNode.getLevel();
		
		
		console.log('Selected Node:'+checkNodeName);
		console.log('Selected id:'+checkNodeId);
		console.log('Level:'+checkLevel);
		console.log('Is subTree:'+JSON.stringify(sSubTree));
		console.log(sSubTree.length);
		
		//checking the node exists or not 
		var snode = $to.tree('getNodeById', checkNodeId);
		
		console.log(snode);
		console.log("Data at Right:"+JSON.stringify(rData));
		
		/**
		*adding subtree to the right panel object if exists
		*for the selected node
		*/
		//if(sSubTree.length>0){
		
		//sData=addSubTree(rData,sSubTree,checkLevel,selectedNode);
		
		//}
		
		/**
		*if the selected node not exists in right tree
		*checking his parent and adding to it.
		*/
		var prnts=[];
		if(snode==undefined){
		var temp=selectedNode;
		for(var l=1;l<checkLevel;l++){
		var lparent=temp.parent;
		console.log(lparent);
		var stat = $to.tree('getNodeById', lparent.id);
		
		//console.log(stat);
		if(stat!=undefined){
		console.log('parent exists at:'+l);
		
		console.log('its exists at first level itself');
		console.log(lparent);
		console.log(stat);l
		console.log("rData:"+JSON.stringify(rData));
		console.log("sData:"+JSON.stringify(sData));
		
		
		//$to.tree('addNodeAfter',selectedNode,stat);
		
		for(var v=0;v<checkLevel;v++){
		
		console.log(rData.label);
		
		}
		
		
		}
		else{
		prnts.push(stat);
		
		}
		
		temp=temp.parent;
		
		}
		
		
		//var data=makeTreeCyclic(prnts,checkLevel-1);
		
		}
		
		
		return sData;
		}
		
		
		/**
		*to add the subtree to the existing tree
		*/
		function addSubTree(rData,sSubTree,checkLevel,selectedNode){
		
		//checking the node exists or not 
		var snode = $to.tree('getNodeById', selectedNode.id);
		
		console.log(snode);
		
		for(var alvl=checkLevel;alvl>0;alvl--)
		{
		console.log(alvl);
		
		}
		
		
		return sSubTree;
		}
		
		
		//---------------------------- multi select jq tree Code-Block-End ----------------------------
		
		});