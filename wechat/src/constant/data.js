export const DATE_FORMAT  = 'YYYY/MM/DD'
export const MONTH_FORMAT = 'YYYY/MM'




const SUBMENU_INFO =     [{ title:'联盟介绍', icon:'profile', path:'/intr' },
                          { title:'主培项目', icon:'profile', path:'/proj' },
                          { title:'联系方式', icon:'profile', path:'/cont' }]
   
const SUBMENU_ACTY =     [{ title:'活动在线', icon:'profile', path:'/acty' },
                          { title:'往期活动', icon:'profile', path:'/hist' }]
   
const SUBMENU_SERV =     [{ title:'常见问题', icon:'profile', path:'/ques' },
                          { title:'一对一咨询',icon:'profile', path:'/chat' },
                          { title:'意见箱',   icon:'profile', path:'/msg' }]   

export const MENU_MAIN = [{ title:'联盟空间', icon:'search', submenu: SUBMENU_INFO },
                          { title:'精彩活动', icon:'laptop', submenu: SUBMENU_ACTY },
                          { title:'教育咨询', icon:'laptop', submenu: SUBMENU_SERV }] 



export const STAT = [ ['已终止','black'],
                      ['申请中','red' ],
                      ['已审查','blue'],
                      ['已竣工','#f50'],
                      ['已评价','#87d068'],
                      ['已展示','#108ee9'], ]


export const PROC_NAME = ['受理申请并确定申请人和实施主体',
                          '现场勘测和制定可行性方案',
                          '协议公示(业主协议、资金费用、电梯保养)',
                          '委托施工图审并备案',
                          '政府组织联合审查',
                          '施工单位实施加装作业',
                          '竣工验收和使用登记']


export const STAT_NAME = ['执行中','已完成']              





