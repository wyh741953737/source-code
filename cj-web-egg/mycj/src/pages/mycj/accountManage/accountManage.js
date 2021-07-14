export function accountManageFactory(angular) {
	// 账号管理
	const app = angular.module('mycj-accountManage.module', ['service']);
	app.controller('mycj-accountManage.ctrl', ['$rootScope', '$scope', 'dsp', '$stateParams', 'utils',
		function ($rootScope, $scope, dsp, $stateParams, utils) {
			console.log('******************* => 账号管理', $rootScope.userInfo.vip);
			const PwdReq = /^(?=(.*[A-Za-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W_]){1,})(?!.*\s).{8,15}$/
			$scope.statusList = {
				enable: { name: 'enable', cn: '启用', en: 'Enabled', type: 1 },
				disable: { name: 'disable', cn: '禁用', en: 'Disabled', type: 2 },
			}
			$scope.showConfirmFlag = false        //禁用启用弹窗flag  
			$scope.showAddFlag = false            //新增弹窗flag
			$scope.showUpdFlag = false            //修改密码弹窗flag
			$scope.editFlag = false               //是否处于编辑状态flag
			$scope.roleList = {
				administrator: { name: 'administrator', type: 1, cn: '管理员', cn: 'Administrator' },
				employee: { name: 'employee', type: 2, cn: '员工', cn: 'Employee' }
			}
			$scope.initialMenu = []               //初始菜单
			$scope.allMenu = []                   //组装过后的所有权限菜单
			$scope.searchName = ''                //搜索 - 姓名
			$scope.searchUserName = ''            //搜索 - 登录名
			$scope.searchStatus = null              //搜索 - 状态 1启用 2停用
			$scope.searchRole = null                //搜索 - 角色类别  3 All  1管理员 2员工
			$scope.accountList = []
			const maxAdminLen = 3
			const maxEmployeeLen = 27
			$scope.searchRoleList = [
				{ key: 1, name: 'All roles', role: '' },
				{ key: 2, name: 'Administrator', role: 1 },
				{ key: 3, name: 'Employee', role: 2 },
			]
			$scope.searchStatusList = [
				{ key: 1, name: 'All status', role: '' },
				{ key: 2, name: 'Disabled', role: 2 },
				{ key: 3, name: 'Enabled', role: 1 },
			]
			/** 选择走索role */
			$scope.selectRole = key => {
				$scope.searchRole = key
			}
			$scope.selectStatus = key => {
				$scope.searchStatus = key
			}
			const base64 = new Base64();
			const isNotErpAdmin = base64.decode(localStorage.getItem('erpoperateuser') || '') != 'admin' 
			const isFromErp = encodeURIComponent(localStorage.getItem('loginfromerp') || '') == '1' 
			$scope.fromErpNotAdmin = isNotErpAdmin && isFromErp
			//获取所有菜单
			getAllMenu()
			function getAllMenu() {
				optAjaxFn({
					url: 'app/subAccount/getAllMenu',
					successFn: res => {
						$scope.initialMenu = res
						res.forEach(item => {
							if (+item.parentId === 0) {//一级菜单
								$scope.allMenu = [...$scope.allMenu, { ...item, children: [] }]
							} else {
								$scope.allMenu = $scope.allMenu.map(_item => {
									if (+_item.id === +item.parentId && item.code !== 'Amazon' && item.code !== 'Amazon FBA') {
										_item.children.push(item)
									}
									return _item
								})
							}
						})
						$scope.allMenu = $scope.allMenu.map(item => {
							item.checked = false
							item.children = item.children.map(child => {
								child.checked = false
								return child
							})
							return item
						})
						console.log($scope.allMenu)
					}
				})
			}
			//获取主账号下的所以子账号列表
			getList()
			function getList() {
				const params = {
					name: $scope.searchName,
					loginName: $scope.searchUserName,
					status: $scope.searchStatus ? $scope.searchStatusList[+$scope.searchStatus - 1].role : '',
					codStatus: $scope.searchRole ? $scope.searchRoleList[+$scope.searchRole - 1].role : ''
				}
				optAjaxFn({
					url: 'app/subAccount/getAllSubAccountInfo', params, layer: 1,
					successFn: res => {
						$scope.accountList = res
						dsp.removeNodataPic($('.account-manage-list'))
						$scope.accountList.length === 0 && dsp.addNodataPic($('.account-manage-list'), 460, 47, 0)
					}
				})
			}
			//搜索
			$scope.searchFn = _ => getList()
			//重置搜索条件
			$scope.resetFn = _ => {
				$scope.searchName = ''
				$scope.searchUserName = ''
				$scope.searchStatus = null
				$scope.searchRole = null
				getList()
			}

			/** 新增子账号 模块 */
			//打开新增弹窗并数据初始化
			$scope.openAdd = () => {
				if($scope.fromErpNotAdmin) {
					layer.msg('You cannot edit it.')
					return
				}
				$scope.showAddFlag = true
				$scope.addItem = {
					role: $scope.roleList.administrator.type,              //角色  administrator 管理员  employee 员工
					name: '',                                              //姓名
					userName: '',                                          //用户名
					password: '',                                          //密码
					confirmPassword: '',                                   //确认密码
					menu: JSON.parse(JSON.stringify($scope.allMenu)).map(item => { //963 968
						if (item.id === 963 || item.id === 981) item.children = item.children.map(child => {
							if (child.id === 968 || child.id === 982) child.checked = true
							return child
						})
						return item
					})
				}
				$scope.passwordErrMsg = ''
				$scope.passwordConfirmErrMsg = ''
				$scope.nameErrMsg = ''
				$scope.userNameErrMsg = ''
				$scope.addErrorFlag = ''
				$scope.permissionErrMsg = ''
				judgeRoleLen($scope.addItem.role)
			}
			//切换角色
			$scope.changeAddRole = role => {
				$scope.addItem.role = $scope.roleList[role].type
				judgeRoleLen($scope.addItem.role)
			}
			// 禁止username输入空格
			$scope.handdleChangeUserName = (val) => {
				if(!(/^\S*$/.test(val))) {
					layer.msg('Invalid user name. Remove the space.');
				} else {
					$scope.userNameErrMsg = '';
				}
				
			}
			//员工权限 - 全选
			$scope.addCheckAll = id => $scope.addItem.menu = checkALLFn($scope.addItem.menu, id)
			//员工权限 - 单选
			$scope.addCheckOne = (id, parentId) => $scope.addItem.menu = checkOneFn($scope.addItem.menu, id, parentId)
			//验证邮箱
			$scope.verifyPwd = (pwd) => {
				if (!pwd) {
					$scope.passwordErrMsg = 'Please enter the password.'
				} else if (!PwdReq.test(pwd)) {
					$scope.passwordErrMsg = 'Password must be at least 8-15 characters long, including letters, numbers and special characters.'
				} else {
					$scope.passwordErrMsg = ''
				}
			}

			//验证确认密码
			$scope.verifyConfirmPwd = (cfpwd, pwd) => {
				if (!cfpwd) {
					$scope.passwordConfirmErrMsg = 'Please enter the confirm password.'
				} else if (cfpwd !== pwd) {
					$scope.passwordConfirmErrMsg = 'Two password must match'
				} else {
					$scope.passwordConfirmErrMsg = ''
				}
			}
			//姓名非空判断
			$scope.verifyName = _ => {
				$scope.nameErrMsg = !$scope.addItem.name ? 'Please enter the name.' : '';
				if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test($scope.addItem.name)) {
					$scope.nameErrMsg = 'Email is not allowed for user name.';
				}
			}
			//登录名非空判断
			$scope.verifyUserName = _ => {
				$scope.userNameErrMsg = !$scope.addItem.userName ? 'Please enter the user name.' : '';
				if(!(/^\S*$/.test($scope.addItem.userName))) {
					$scope.userNameErrMsg = 'Invalid user name. Remove the space.';
				} 
				else if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test($scope.addItem.userName)) {
					$scope.userNameErrMsg = 'Email is not allowed for user name.';
				}
				else {
					$scope.userNameErrMsg = '';
				}
			}
			//权限判空
			$scope.verifyPermission = (role, list) => {
				$scope.permissionErrMsg = disposePermissionFn(role, list).length > 0 ? '' : 'Please select at least one permission'
			}
			//确认新增
			$scope.confirmAdd = () => {
				if (!$scope.addErrorFlag) {
					$scope.verifyName()
					$scope.verifyUserName()
					$scope.verifyPwd($scope.addItem.password)
					$scope.verifyConfirmPwd($scope.addItem.confirmPassword, $scope.addItem.password)
					$scope.verifyPermission($scope.addItem.role, $scope.addItem.menu)
					if (!$scope.nameErrMsg && !$scope.userNameErrMsg && !$scope.passwordConfirmErrMsg && !$scope.passwordErrMsg && !$scope.permissionErrMsg) {
						const params = {
							name: $scope.addItem.name,
							loginName: $scope.addItem.userName,
							password: $scope.addItem.password,
							password2: $scope.addItem.confirmPassword,
							codStatus: $scope.addItem.role,
							menuIds: disposePermissionFn($scope.addItem.role, $scope.addItem.menu).join()
						}
						optAjaxFn({
							url: 'app/subAccount/insertSubAccount', params, layer: 2, layerLeft: true,
							successFn: res => {
								layer.msg('The new subaccount was successfully added')
								$scope.showAddFlag = false
								getList()
							}, errFn: ({ statusCode }) => layer.msg(statusCode === '202'
								? 'The user name already exists'
								: statusCode === '302' || statusCode === '303'
									? `here are ${statusCode === '302' ? '3 administrator' : '27 employee'} accounts already, and no more ${statusCode === '302' ? 'administrator' : 'employee'} accounts can be added.`
									: statusCode === '501' ? 'The user name already exists.'
										: statusCode === '502' ? 'Email is not allowed for user name.'
											:'Failed to add a child account')
						})
					}
				}
			}
			/** 新增子账号 模块结束 */

			/** 禁用启用 模块 */
			$scope.changeStatusFn = (status, account) => { //打开禁用启用confirm弹窗
				console.log(account, status)
				const { id, codStatus } = account
				const adminLen = $scope.accountList.filter(item => +item.codStatus === $scope.roleList.administrator.type && +item.status === $scope.statusList.enable.type).length   //已有管理员数量
				const employeeLen = $scope.accountList.filter(item => +item.codStatus === $scope.roleList.employee.type && +item.status === $scope.statusList.enable.type).length     //已有员工数量
				if (status === 'enable' && codStatus === $scope.roleList.administrator.type && adminLen === maxAdminLen) {
					layer.msg('here are 3 administrator accounts already, and no more administrator accounts can be enabled')
				} else if (status === 'enable' && codStatus === $scope.roleList.employee.type && employeeLen === maxEmployeeLen) {
					layer.msg('here are 27 employee accounts already, and no more employee accounts can be enabled')
				} else {
					$scope.showConfirmFlag = true
					$scope.showConfirmItem = { id, status }
				}
			}
			$scope.confirmStatus = _ => { //确认禁用启用
				const params = {
					id: $scope.showConfirmItem.id,
					status: $scope.statusList[$scope.showConfirmItem.status].type
				}
				optAjaxFn({
					url: 'app/subAccount/updateStatus', params, layer: 2,
					successFn: res => {
						layer.msg(`${$scope.statusList[$scope.showConfirmItem.status].en} the success`)
						$scope.showConfirmFlag = false
						$scope.accountList = $scope.accountList.map(item => {
							if (item.id === params.id) item.status = params.status
							return item
						})
					}, errFn: _ => {
						layer.msg(`${$scope.statusList[$scope.showConfirmItem.status].en} the failure`)
						$scope.showConfirmFlag = false
					}
				})
			}
			/** 禁用启用 模块结束 */

			/** 修改密码 模块 */
			//打开修改密码弹窗并数据初始化
			$scope.openUpdPwd = id => {
				$scope.showUpdFlag = true
				$scope.updItem = { id, updPassword: '', updConfirmPassword: '' }
				$scope.passwordErrMsg = ''
				$scope.passwordConfirmErrMsg = ''
			}
			//确认修改密码
			$scope.confirmUpt = _ => {
				$scope.verifyPwd($scope.updItem.updPassword)
				$scope.verifyConfirmPwd($scope.updItem.updConfirmPassword, $scope.updItem.updPassword)
				if (!$scope.passwordConfirmErrMsg && !$scope.passwordErrMsg) {
					const params = {
						id: $scope.updItem.id,
						password: $scope.updItem.updPassword,
						password2: $scope.updItem.updConfirmPassword
					}
					optAjaxFn({
						url: 'app/subAccount/updatePassword', params, layer: 2,
						successFn: _ => {
							layer.msg('Password change successful')
							$scope.showUpdFlag = false
						}, errFn: _ => {
							layer.msg('Password change failed')
							$scope.showUpdFlag = false
						}
					})
				}
			}
			/** 修改密码 模块结束 */

			/** 编辑 模块 */
			//打开编辑并获取子账号信息
			$scope.openEdit = id => {
				optAjaxFn({
					url: 'app/subAccount/getSubAccountInfo', params: { id }, layer: 2,
					successFn: ({ menus, user }) => {
						let checkedList = []
						menus.forEach(_ => {
							_.checked && checkedList.push(_.id)
						})
						$scope.editItem = {                   //编辑
							id: user.id,                        //子账号id
							role: user.codStatus,               //角色  administrator 管理员  employee 员工
							name: user.name,                    //姓名
							userName: user.loginName,           //用户名
							status: user.status,                //账号状态
							date: user.createDate,              //创建日期 / 修改日期
							menu: JSON.parse(JSON.stringify($scope.allMenu)).map(item => {
								item.children = item.children.map(child => {
									child.checked = checkedList.includes(child.id)
									return child
								})
								item.checked = item.children.filter(_ => _.checked).length === item.children.length
								return item
							})
						}
						$scope.oldRole = user.codStatus
						$scope.editErrorFlag = false
						$scope.editFlag = true
						$scope.editPermissionErrFlag = false
					}
				})
			}
			//修改角色种类
			$scope.changeEditRole = role => {
				$scope.editItem.role = $scope.roleList[role].type
				judgeRoleLen($scope.editItem.role)
				$scope.editErrorFlag = $scope.editItem.role !== $scope.oldRole && $scope.addErrorFlag
			}
			//编辑 - 权限 - 全选
			$scope.editCheckAll = id => $scope.editItem.menu = checkALLFn($scope.editItem.menu, id)
			//编辑 - 权限 - 单选
			$scope.editCheckOne = (id, parentId) => $scope.editItem.menu = checkOneFn($scope.editItem.menu, id, parentId)
			//编辑 - 确认编辑
			$scope.confirmEdit = _ => {
				$scope.editPermissionErrFlag = !disposePermissionFn($scope.editItem.role, $scope.editItem.menu).length > 0
				if (!$scope.editErrorFlag && !$scope.editPermissionErrFlag) {
					const params = {
						id: $scope.editItem.id,
						codStatus: $scope.editItem.role,
						menuIds: disposePermissionFn($scope.editItem.role, $scope.editItem.menu).join()
					}
					optAjaxFn({
						url: 'app/subAccount/updateMenusIds', params, layer: 2,
						successFn: res => {
							layer.msg('Successfully modified')
							$scope.editFlag = false
							getList()
						}, errFn: ({ statusCode }) => layer.msg(statusCode === '302' || statusCode === '303'
							? `here are ${statusCode === '302' ? '3 administrator' : '27 employee'} accounts already, and no more ${statusCode === '302' ? 'administrator' : 'employee'} accounts can be added.`
							: 'Failed to add a child account'
						)
					})
				}
			}

			/** 编辑 模块结束 */

			//公用 - 全选
			function checkALLFn(list, id) {
				return list.map(item => {
					if (item.id === id) {
						item.checked = !item.checked
						item.children = item.children.map(child => {
							child.checked = item.checked
							return child
						})
					}
					return item
				})
			}
			//公用 - 单选
			function checkOneFn(list, id, parentId) {
				return list.map(item => {
					if (item.id === parentId) {
						item.children = item.children.map(child => {
							if (child.id === id) child.checked = !child.checked
							return child
						})
						item.checked = item.children.filter(_ => _.checked).length === item.children.length
					}
					return item
				})
			}
			//公用 - 处理权限数据
			function disposePermissionFn(role, list) {
				let ids = []
				if (role === $scope.roleList.administrator.type) {//新增管理员 拥有所有权限
					$scope.initialMenu.forEach(item => ids.push(item.id))
				} else { //普通员工
					list.forEach(item => {
						const childCheckedList = item.children.filter(_ => _.checked)
						if (childCheckedList.length > 0) {
							ids.push(item.id)
							childCheckedList.forEach(_ => ids.push(_.id))
						}
					})
				}
				return ids
			}
			//对新增窗口 name Input 的placeholder文案进行处理
			$scope.disposeInputPlaceHolder = role => {
				return `Please input ${role === $scope.roleList.administrator.type ? 'administrator' : 'employee'}'s name`
			}
			//公用 - 对增角色进行数量判断
			function judgeRoleLen(role) {
				const adminLen = $scope.accountList.filter(item => +item.codStatus === $scope.roleList.administrator.type && +item.status === $scope.statusList.enable.type).length   //已有管理员数量
				const employeeLen = $scope.accountList.filter(item => +item.codStatus === $scope.roleList.employee.type && +item.status === $scope.statusList.enable.type).length     //已有员工数量
				$scope.addErrorFlag = (role === $scope.roleList.administrator.type && adminLen >= maxAdminLen)
					|| (role === $scope.roleList.employee.type && employeeLen >= maxEmployeeLen)
			}

			//封装请求
			function optAjaxFn({ params = {}, url, successFn, errFn = _ => dsp.cjMesFun(1), layer, layerLeft }) {
				if (layer) { layer === 1 ? dsp.loadPercent($('.account-manage-list'), $(window).height() - 400, 47, 0) : dsp.load(layerLeft) }
				dsp.postFun(url, params, ({ data }) => {
					const { statusCode, result } = data
					if (layer) { layer === 1 ? dsp.closeLoadPercent($('.account-manage-list')) : dsp.closeLoad() }
					statusCode === '200' ? successFn(result) : errFn(data)
				}, _ => {
					dsp.cjMesFun(1)
					if (layer) { layer === 1 ? dsp.closeLoadPercent($('.account-manage-list')) : dsp.closeLoad() }
				})
			}
		}])
	return app;
}