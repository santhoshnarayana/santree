var obj = null; // to retun val
var successmsg = null;// for success messge
function callAjaxTreeMenuUser(data, method, urlL, from, to, btnadd, btnremv,
		btnaddall, btnremvall, selectfrom, selectto) {
	//console.log("data:" + JSON.stringify(data));
	//console.log("buroleId:" + method);
	//console.log("buroleId:" + urlL);
	//console.log("buroleId:" + from);
	//console.log("buroleId:" + to);
	//console.log("buroleId:" + btnadd);
	//console.log("buroleId:" + btnremv);
	//console.log("buroleId:" + btnremvall);
	//console.log("buroleId:" + selectfrom);
	//console.log("buroleId:" + selectto);

	$
			.ajax({
				type : method,
				// "GET",
				url : urlL,
				// "userRolesJsonModuleLeftPanel.sec",
				dataType : 'json',
				contentType : "application/json; charset=utf-8",
				data : data,
				// {busroleid: busroleId},

				success : function(data) {
					// add from here

					// //console.log("data:::::::left:::::" +
					// JSON.stringify(data.superParent[0]));
					// //console.log("data::::right::::::::" +
					// JSON.stringify(data.superParent[1]))

					// jsondata = data.superParent[0];
					// oldToObj = data.superParent[1];
					// success msgr
					var flagForCall=0;//to prevent the browser errrors twicecalls

					successmsg = "Successfully Updating";
					jsondata = data.left;
					oldToObj = data.right;
					$('#' + from).html(buildTree(jsondata, selectfrom));

					menuLocalRightDataUser(oldToObj);

					$('#' + to).html(buildTree(oldToObj, selectto));

					var treeviewApp1 = new treeview(selectfrom);
					var treeviewApp2 = new treeview(selectto);

					$("li").on('click', function() {

						var li = $(this);
						//console.log('this is clickable');
						toObj = parentFunction(li);

					});

					$('#' + btnadd)
							.click(
									function(event) {

										// executionclon() to add the selected
										// li with right json return the added
										// one.
										oldToObj = executionClone('#' + to,
												selectfrom, selectto, false,
												oldToObj, toObj);

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
															toObj = parentFunction(lii);
															console
																	.log('inside add button');

														});

										menuLocalRightDataUser(oldToObj);
									});

					$('#' + btnaddall)
							.click(
									function() {

										console
												.log('inside btn-addall click event');
										oldToObj = jsondata;
										// flagforRight=1;
										// removes any nulll items in a json
										oldToObj = removeNullJsons(oldToObj);
										$('#' + to).html(
												buildTree(oldToObj, selectto));
										var treeviewApp2 = new treeview(
												selectto);
										//console.log('flag for right:'	+ flagforRight);

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
															var liii = $(this);
															toObj = parentFunction(liii);

														});

										// executionClone('#selectfrom','#selectto',true);
										menuLocalRightDataUser(oldToObj);
									});

					$('#' + btnremv).on('click',
									function(e) {
									//preventing twice call errors
									
										console
												.log('---:::::::::::::::::::old one after null remove:'
														+ JSON
																.stringify(oldToObj));
										// oldToObj= removeNullJsons(oldToObj);
										console
												.log('old one after null remove:'
														+ JSON
																.stringify(oldToObj));

										//console.log('inside btn-remove click');
										//console.log('the old to obj----------'+ oldToObj);
										//console.log('Old one:'+ JSON.stringify(oldToObj));
										//console.log('Selected one:'+ JSON.stringify(toObj));

										// removeSelectObj(oldToObj,toObj) to
										// remove the selected item from json
											
										 oldToObj=removeSelectObj(oldToObj,toObj);
										
										
										// the code for remove end

										// execution('#selectto', '#selectfrom',
										// false);
										console
												.log('old one after remove:::::::::::'
														+ JSON
																.stringify(oldToObj));
										var toldToObj = removeNullJsons(oldToObj);
										oldToObj=toldToObj;
										//console.log('old one after remove:::::;::::::'+ JSON.stringify(oldToObj));
											
										
										$('#' + to).html(buildTree(oldToObj, selectto));

										var treeviewApp2 = new treeview(
												selectto);

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
															toObj = parentFunction(lii);

														});

										menuLocalRightDataUser(oldToObj);
									e.stopImmediatePropagation();//TWO PRivent the browser twice call error
									
									});

					$('#' + btnremvall)
							.click(
									function() {

					//console.log('>>>>>>>>>at btn-removeall'+ JSON.stringify(oldToObj));
				    //console.log('>>>>>>>>>at btn-removeall'+ JSON.stringify(toObj));
										oldToObj = null;

										$('#' + to).html(
												buildTree(oldToObj, selectto));
										// $('#to').append(buildTree(oldToObj,
										// 'selectto'));

										var treeviewApp2 = new treeview(
												selectto);
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
															toObj = parentFunction(lii);

														});
										menuLocalRightDataUser(oldToObj);

									});

					// for get the selected li

					obj = data;
					//console.log("Controler data json:" + JSON.stringify(data));
					menuLocalRightDataUser(oldToObj);

					
					flagForCall=0;//to prevent browser twice cll errors
				}

			
			
			
			
			});

	//console.log("out side Con{troler data json:" + JSON.stringify(obj));

}

function menuLocalRightDataUser(data) {
	//console.log("local data json:" + JSON.stringify(data));
	obj = data;
	//console.log("out side ConLocal RightOldTo:" + JSON.stringify(obj));
	return obj;
}

function localDataOldToObjUser() {
	return obj
}
function getMenuSuccessMsg() {
	return successmsg;
}