var ModuleRightData = null; // to retun val module
var menuObj = null// to return val for menu
var successmsg = null;
var ModuleOldToObj = null;
var ModuletoObj = null;

//user screen purpose
var ModuleRightDataUser = null; // to retun val module
var menuObj = null// to return val for menu
var successmsgUserUser = null;
var ModuleOldToObjUser = null;
var ModuletoObjUser = null;

//UserScreeModule


//End of userScreeModule call

//Module
function callAjaxTreeModuleUser(ModuledataUser, method, urlL, from, to, btnadd,
                                btnremv, btnaddall, btnremvall, selectfrom, selectto) {
    console.log("data:" + JSON.stringify(ModuledataUser));
    console.log("buroleId:" + method);
    console.log("buroleId:" + urlL);
    console.log("buroleId:" + from);
    console.log("buroleId:" + to);
    console.log("buroleId:" + btnadd);
    console.log("buroleId:" + btnremv);
    console.log("buroleId:" + btnremvall);
    console.log("buroleId:" + selectfrom);
    console.log("buroleId:" + selectto);

    $
        .ajax({
            type : method,
            // "GET",
            url : urlL,
            // "userRolesJsonModuleLeftPanel.sec",
            dataType : 'json',
            contentType : "application/json; charset=utf-8",
            data : ModuledataUser,
            // {busroleid: busroleId},

            success : function(data) {
                // add from here

                var msgUser = "Successfully Updated";

                ModuleJsonDataUser = data.left;
                ModuleOldToObjUser = data.right;
                console.log("left one:" + JSON.stringify(data.left));
                console.log("right one:" + JSON.stringify(data.right));

                $('#' + from).html(buildTree(ModuleJsonDataUser, selectfrom));
                $('#' + to).html(buildTree(ModuleOldToObjUser, selectto));
                ModulelocalRightDataUser(ModuleOldToObjUser, msgUser);

                var treeviewApp1 = new treeview(selectfrom);
                var treeviewApp2 = new treeview(selectto);

                //for menus tree for selected menu items
                var maduleDataUser = {
                    'jsandata' : JSON.stringify(ModuleOldToObjUser),
                    'busroleId' : businessroleId
                };


                //end for menus
				

                $("li").on('click', function() {

                    var li = $(this);
                    console.log('-------------this is clickable---------------');
                    ModuletoObjUser = ModuleParentFunction(li);

                });

                $('#' + btnadd)
                    .click(
                    function(event) {

                        // executionclon() to add the selected
                        // li with right json return the added
                        // one.
                        ModuleOldToObjUser = ModuleExecutionClone(
                            '#' + to, selectfrom, selectto,
                            false, ModuleOldToObjUser,
                            ModuletoObjUser);

                        $('#' + selectto + ' ul li')
                            .on(
                            'click',
                            function() {
							console.log('u clicked right li..dont warry');

                            console.log('li of selection'+ $(this).attr('data-value'));
                                var lii = $(this);
                                ModuletoObjUser = ModuleParentFunction(lii);
                                console.log('inside add button');

                            });

                        ModulelocalRightDataUser(ModuleOldToObjUser,
                            msgUser);

                        var maduleDataUser = {
                            'jsandata' : JSON.stringify(ModuleOldToObjUser),
                            'busroleId' : businessroleId
                        };



                    });

                $('#' + btnaddall)
                    .click(
                    function() {

                        console.log('inside btn-addall click event');
                        ModuleOldToObjUser = ModuleJsonDataUser;
                        // removes any nulll items in a json
                        ModuleOldToObjUser = ModuleremoveNullJsons(ModuleOldToObjUser);
               $('#' + to).html( buildTree(ModuleOldToObjUser, selectto));
                        var treeviewApp2 = new treeview( selectto);
                        console.log('flag for right:' + flagforRight);

                        $('#' + selectto + ' ul li').on('click',function() {

                                console.log('u clicked right li..dont warry');

                                console .log('li of selection'+ $(this).attr('data-value'));
                                var liii = $(this);
                                ModuletoObjUser = ModuleParentFunction(liii);

                            });

                        // ModuleExecutionClone('#selectfrom','#selectto',true);
                        ModulelocalRightDataUser(ModuleOldToObjUser,
                            msgUser);

                        var maduleDataUser = {
                            'jsandata' : JSON.stringify(ModuleOldToObjUser),
                            'busroleId' : businessroleId
                        };


                    });

                $('#' + btnremv)
                    .click(
                    function() {
                        console.log('---:::::::::::::::::::old one after null remove:'+ JSON.stringify(ModuleOldToObjUser));

                        console.log('old one after null remove:'+ JSON.stringify(ModuleOldToObjUser));

                        console.log('inside btn-remove click');
                        console.log('the old to ModuleRightDataUser----------'+ ModuleOldToObjUser);
                        console .log('Old one:'+ JSON.stringify(ModuleOldToObjUser));
                        console.log('Selected one:' + JSON.stringify(ModuletoObjUser));

                        // ModuleremoveSelectObj(ModuleOldToObjUser,ModuletoObjUser)
                        // to remove the selected item from json
                 ModuleOldToObjUser = ModuleremoveSelectObj( ModuleOldToObjUser, ModuletoObjUser);

                        // the code for remove end

                        // execution('#selectto', '#selectfrom',
                        // false);
                        console.log('old one after remove:::::::::::' + JSON.stringify(ModuleOldToObjUser));
                        ModuleOldToObjUser = ModuleremoveNullJsons(ModuleOldToObjUser);
                        console.log('old one after remove:::::;::::::' + JSON.stringify(ModuleOldToObjUser));

                        $('#' + to).html(
                            buildTree(ModuleOldToObjUser, selectto));

                        var treeviewApp2 = new treeview(selectto);

                        $('#' + selectto + ' ul li')
                            .on(
                            'click',
                            function() {

                                console
                                    .log('u clicked right li..dont warry');

                                console
                                    .log('li of selection'
                                        + $(
                                        this)
                                        .attr(
                                            'data-value'));
                                var lii = $(this);
                                ModuletoObjUser = ModuleParentFunction(lii);

                            });

                        ModulelocalRightDataUser(ModuleOldToObjUser,
                            msgUser);

                        var maduleDataUser = {
                            'jsandata' : JSON
                                .stringify(ModuleOldToObjUser),
                            'busroleId' : businessroleId
                        };

                     //evt.stopImmediatePropagation();

                    });

                $('#' + btnremvall)
                    .click(
                    function() {

                        console
                            .log('>>>>>>>>>at btn-removeall'
                                + JSON
                                .stringify(ModuleOldToObjUser));
                        console.log('>>>>>>>>>at btn-removeall' + JSON.stringify(ModuletoObjUser));
                        ModuleOldToObjUser = null;

                        $('#' + to).html(
                            buildTree(ModuleOldToObjUser,
                                selectto));
                        // $('#to').append(buildTree(ModuleOldToObjUser,
                        // 'selectto'));

                        var treeviewApp2 = new treeview(selectto);
                        $('#' + selectto + ' ul li') .on('click', function() {

                            console.log('u clicked right li..dont warry');

                            console.log('li of selection'+$(this).attr('data-value'));
                            var lii = $(this);
                            ModuletoObjUser = ModuleParentFunction(lii);

                        });
                  ModulelocalRightDataUser(ModuleOldToObjUser, msgUser);

                        ModuleRightDataUser = ModuleOldToObjUser;
                   console.log("Controler data json:" + JSON.stringify(ModuleOldToObjUser));
                        ModulelocalRightDataUser(ModuleOldToObjUser,
                            msgUser);

                        var maduleDataUser = {
                            'jsandata' : JSON
                                .stringify(ModuleOldToObjUser),
                            'busroleId' : businessroleId
                        };



                    });

                //for get the selected li

            }

        });

    console.log("out side Con{troler data json:" + JSON.stringify(ModuleRightDataUser));

}

function ModulelocalRightDataUser(ModuledataUser, msgUser) {
    console.log("local data json:" + JSON.stringify(ModuledataUser));
    ModuleRightDataUser = ModuledataUser;
    successmsgUserUser = msgUser;
    console.log("out side ConLocal RightOldTo:"+ JSON.stringify(ModuleRightDataUser));
    return ModuleRightDataUser;
}

function localDataOldToObjModuleUser() {
    return ModuleRightDataUser;
}

function getSuccessMsgModuleUser() {
    return successmsgUserUser;
}


//Module
function callAjaxTreeModule(Moduledata, method, urlL, from, to, btnadd,
		btnremv, btnaddall, btnremvall, selectfrom, selectto) {
	console.log("data:" + JSON.stringify(Moduledata));
	console.log("buroleId:" + method);
	console.log("buroleId:" + urlL);
	console.log("buroleId:" + from);
	console.log("buroleId:" + to);
	console.log("buroleId:" + btnadd);
	console.log("buroleId:" + btnremv);
	console.log("buroleId:" + btnremvall);
	console.log("buroleId:" + selectfrom);
	console.log("buroleId:" + selectto);

	$
			.ajax({
				type : method,
				// "GET",
				url : urlL,
				// "userRolesJsonModuleLeftPanel.sec",
				dataType : 'json',
				contentType : "application/json; charset=utf-8",
				data : Moduledata,
				// {busroleid: busroleId},

				success : function(data) {
					// add from here

					var msg = "Successfully Updated";

					ModuleJsonData = data.left;
					ModuleOldToObj = data.right;
					console.log("left one:" + JSON.stringify(data.left));
					console.log("right one:" + JSON.stringify(data.right));

					$('#' + from).html(buildTree(ModuleJsonData, selectfrom));
					$('#' + to).html(buildTree(ModuleOldToObj, selectto));
					ModulelocalRightData(ModuleOldToObj, msg);

					var treeviewApp1 = new treeview(selectfrom);
					var treeviewApp2 = new treeview(selectto);

					//for menus tree for selected menu items
					var maduleData = {
						'jsandata' : JSON.stringify(ModuleOldToObj),
						'busroleId' : businessroleId
					};

					callAjaxTreeMenu(maduleData, 'GET',
							'userRolesJsonMenuLeftPanel.sec', 'frommenu',
							'tomenu', 'btnmenu-add', 'btnmenu-remove',
							'btnmenu-addall', 'btnmenu-removeall',
							'selectfrommenu', 'selecttomenu');

					//end for menus

					$("li").on('click', function() {

						var li = $(this);
						console.log('this is clickable');
						ModuletoObj = ModuleParentFunction(li);
						console.log('Last at parent function ADDING'+JSON.stringify(ModuletoObj));

					});

					$('#' + btnadd)
							.click(
									function(event) {

										// executionclon() to add the selected
										// li with right json return the added
										// one.
						console.log('Last at parent function ADDING oldto'+JSON.stringify(ModuletoObj));
						ModuleOldToObj = ModuleExecutionClone('#' + to, selectfrom, selectto,false, ModuleOldToObj,
												ModuletoObj);

										$('#' + selectto + ' ul li').on('click',
														function() {
															console.log('u clicked right li..dont warry');

															console.log('li of selection'+ $(this).attr('data-value'));
															var lii = $(this);
															ModuletoObj = ModuleParentFunction(lii);
															console.log('inside add button');

														});

										ModulelocalRightData(ModuleOldToObj,msg);

										var maduleData = {
											'jsandata' : JSON.stringify(ModuleOldToObj),
											'busroleId' : businessroleId
										};

										callAjaxTreeMenu(
                                                 maduleData,
                                                'GET',
												'userRolesJsonMenuLeftPanel.sec',
												'frommenu', 'tomenu',
												'btnmenu-add',
												'btnmenu-remove',
												'btnmenu-addall',
												'btnmenu-removeall',
												'selectfrommenu',
												'selecttomenu');

									});

					$('#' + btnaddall).click(
									function() {

										console.log('inside btn-addall click event');
										ModuleOldToObj = ModuleJsonData;
										// flagforRight=1;
										// removes any nulll items in a json
										// ModuleOldToObj =
										// ModuleremoveNullJsons(ModuleOldToObj);
										$('#' + to).html(
												buildTree(ModuleOldToObj,
														selectto));
										var treeviewApp2 = new treeview(
												selectto);
										console.log('flag for right:'+ flagforRight);

										$('#' + selectto + ' ul li').on('click',
														function() {
									console.log('u clicked right li..dont warry');

									console.log('li of selection'+ $(this).attr('data-value'));
															var liii = $(this);
															ModuletoObj = ModuleParentFunction(liii);

														});

										// ModuleExecutionClone('#selectfrom','#selectto',true);
										ModulelocalRightData(ModuleOldToObj,msg);

										var maduleData = {
											'jsandata' : JSON.stringify(ModuleOldToObj),
											'busroleId' : businessroleId
										};

										callAjaxTreeMenu(
												maduleData,
												'GET',
												'userRolesJsonMenuLeftPanel.sec',
												'frommenu', 'tomenu',
												'btnmenu-add',
												'btnmenu-remove',
												'btnmenu-addall',
												'btnmenu-removeall',
												'selectfrommenu',
												'selecttomenu');

									});

					$('#' + btnremv).click(
									function() {
						console.log('---:::::::::::::::::::old one after null remove:'+ JSON.stringify(ModuleOldToObj));
							 ModuleOldToObj= ModuleremoveNullJsons(ModuleOldToObj);
						console	.log('old one after null remove:'+ JSON.stringify(ModuleOldToObj));

					console.log('inside btn-remove click');
					console.log('the old to ModuleRightData----------'+ ModuleOldToObj);
					console	.log('Old one:'	+ JSON.stringify(ModuleOldToObj));
				    console.log('Selected one:'+ JSON.stringify(ModuletoObj));

										// ModuleremoveSelectObj(ModuleOldToObj,ModuletoObj)
										// to remove the selected item from json
					ModuleOldToObj = ModuleremoveSelectObj(ModuleOldToObj, ModuletoObj);

										// the code for remove end

										// execution('#selectto', '#selectfrom',
										// false);
					console	.log('old one after remove:::::::::::'+ JSON.stringify(ModuleOldToObj));
					ModuleOldToObj = ModuleremoveNullJsons(ModuleOldToObj);
					console.log('old one after remove:::::;::::::'+ JSON.stringify(ModuleOldToObj));

				$('#' + to).html(buildTree(ModuleOldToObj,selectto));

				var treeviewApp2 = new treeview(selectto);

				$('#' + selectto + ' ul li').on('click',function() {

					console	.log('u clicked right li..dont warry');

					console	.log('li of selection'+ $(this)	.attr('data-value'));
					var lii = $(this);
					ModuletoObj = ModuleParentFunction(lii);
                    });
                    ModulelocalRightData(ModuleOldToObj,msg);

					var maduleData = {'jsandata' : JSON	.stringify(ModuleOldToObj),'busroleId' : businessroleId	};

										callAjaxTreeMenu(
												maduleData,
												'GET',
												'userRolesJsonMenuLeftPanel.sec',
												'frommenu', 'tomenu',
												'btnmenu-add',
												'btnmenu-remove',
												'btnmenu-addall',
												'btnmenu-removeall',
												'selectfrommenu',
												'selecttomenu');

									});

					$('#' + btnremvall)
							.click(
									function() {

					console.log('>>>>>>>>>at btn-removeall'+ JSON.stringify(ModuleOldToObj));
					console.log('>>>>>>>>>at btn-removeall'+ JSON.stringify(ModuletoObj));
							ModuleOldToObj = null;

							$('#' + to).html(buildTree(ModuleOldToObj,selectto));
							// $('#to').append(buildTree(ModuleOldToObj,
							// 'selectto'));

					var treeviewApp2 = new treeview(selectto);

                     $('#' + selectto + ' ul li').on('click',function() {

					console.log('u clicked right li..dont warry');

					console	.log('li of selection'+ $(this).attr('data-value'));
						var lii = $(this);
					ModuletoObj = ModuleParentFunction(lii);

														});
					ModulelocalRightData(ModuleOldToObj,msg);

					ModuleRightData = data;
					console.log("Controler data json:"+ JSON.stringify(data));
					ModulelocalRightData(ModuleOldToObj,msg);

				    var maduleData = {'jsandata' : JSON.stringify(ModuleOldToObj),
                        'busroleId' : businessroleId};

										callAjaxTreeMenu(
												maduleData,
												'GET',
												'userRolesJsonMenuLeftPanel.sec',
												'frommenu', 'tomenu',
												'btnmenu-add',
												'btnmenu-remove',
												'btnmenu-addall',
												'btnmenu-removeall',
												'selectfrommenu',
												'selecttomenu');

									});

					//for get the selected li

				}

			});

	console.log("out side Con{troler data json:"+ JSON.stringify(ModuleRightData));

}

function ModulelocalRightData(Moduledata, msg) {
	console.log("local data json:" + JSON.stringify(Moduledata));
	ModuleRightData = Moduledata;
	successmsg = msg;
	console.log("out side ConLocal RightOldTo:"+ JSON.stringify(ModuleRightData));
	return ModuleRightData;
}

function localDataOldToObjModule() {
	return ModuleRightData;
}

function getSuccessMsgModule() {
	return successmsg;
}