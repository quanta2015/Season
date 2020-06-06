/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50709
 Source Host           : localhost:3306
 Source Schema         : season

 Target Server Type    : MySQL
 Target Server Version : 50709
 File Encoding         : 65001

 Date: 02/05/2020 17:49:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for act
-- ----------------------------
DROP TABLE IF EXISTS `act`;
CREATE TABLE `act` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `target` varchar(100) DEFAULT NULL,
  `regmd` varchar(200) DEFAULT NULL,
  `pic` varchar(1000) DEFAULT NULL,
  `qrcode` varchar(100) DEFAULT NULL,
  `addr` varchar(100) DEFAULT NULL,
  `dt` varchar(20) DEFAULT NULL,
  `cnt` varchar(1000) DEFAULT NULL,
  `charge` varchar(100) DEFAULT NULL,
  `form` varchar(200) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `award` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of act
-- ----------------------------
BEGIN;
INSERT INTO `act` VALUES (4, '线下', '研学西溪●源于自然●学习自然', '杭州市青少年儿童（6-12岁），限30位学员独立参加', '详细活动内容可咨询请扫码添加小李老师微信', '01.jpeg|02.jpeg|03.jpeg|04.jpeg', 'qrcode01.png', '杭州西溪国家湿地公园', '2020年5月下旬', '研学一日游\n1、健康徒步\n2、写生绘画：“湿地滋润万物”\n身临其境，在专业老师的指导下在观鸟亭观鸟、深潭口赏景，画下你眼中的湿地\n3、科学研学：“探索湿地的生态环境”\n植物西溪：认识观察植物并制作植物标本；深入西溪：湿地测量西溪水域PH值 ', '59元/人', NULL, NULL, NULL);
INSERT INTO `act` VALUES (5, '征集', '守望春天|一同前行 江干区青少年儿童抗击疫情绘画大赛活动', '杭州市青少年儿童（4-14岁）', '截止日期：即日起至2020年5月30日\r\n投稿形式：平邮至江干区环丁路10号文体中心三楼311办公室，收件人：娄老师', '01.jpeg|02.jpeg|03.jpeg|04.jpeg', 'qrcode01.png', NULL, NULL, NULL, NULL, '每收集一副作品，承办单位“杭州艺童时代培训学校”捐赠5元公益金，用于支持需要帮助的青少年儿童。', '作品要求：\r\n1、要求原创作品\r\n2、作品纸张大小规格40x55厘米以内\r\n内容要求：\r\n1、结合抗疫主题，具有积极向上的正能量；\r\n2、图文记录身边关于疫情抗争的故事、感悟或心得体会，作品以绘画为主', '1、对征集的作品按年龄段分类，并进行在线评比，优秀作品（前100名）将在丁兰街道辖区内学校、社区等场所进行巡展。\r\n2、所有参与活动的小朋友都会获得“抗疫小天使”荣誉证书和极具意义的纪念勋章一枚；');
INSERT INTO `act` VALUES (6, '线下', 'a', 'c', NULL, 'upload/20200502052005.jpeg|upload/20200502052008.jpeg|upload/20200502052012.jpeg', 'upload/20200502052015.jpeg', 'd', 'e', 'f', 'g', NULL, NULL, NULL);
INSERT INTO `act` VALUES (7, '征集', 'eee', 'dddd', NULL, 'upload/20200502052400.jpeg|upload/20200502052416.jpeg|upload/20200502052422.jpeg', 'upload/20200502052429.jpeg', NULL, NULL, NULL, NULL, 'bbbf', 'yyy', 'ddddddddd');
COMMIT;

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of info
-- ----------------------------
BEGIN;
INSERT INTO `info` VALUES (60, 'wewfawfe打造专业社区服务平台，开展各类公益服务活动、公益文化交流、提供信息咨询和会务服务，社会组织培育与发展，承接政府有关部门委托的各类公益项目和其他服务。');
INSERT INTO `info` VALUES (61, '联盟是四季青街道辖区内各校外培训机构的共同家园，监督规范办学、提供有益指导、共建发展平台。');
INSERT INTO `info` VALUES (62, '规范校外培训机构的办学与生态发展，开展“四季·爱在春天”公益联盟项目');
INSERT INTO `info` VALUES (63, 'xxxweee');
INSERT INTO `info` VALUES (64, 'xxx');
INSERT INTO `info` VALUES (65, 'xxx');
COMMIT;

-- ----------------------------
-- Table structure for msg
-- ----------------------------
DROP TABLE IF EXISTS `msg`;
CREATE TABLE `msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `dt` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `msg` varchar(2000) DEFAULT NULL,
  `mark` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg
-- ----------------------------
BEGIN;
INSERT INTO `msg` VALUES (4, 'wef', '2020-04-29 23:39:06', '13515814446', 'autoSize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autoSize 可以设定为一个对象，指定最小行数和最大行数。', 0);
INSERT INTO `msg` VALUES (5, 'erwf', '2020-04-29 23:41:03', '13515814446', 'autoSize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autoSize 可以设定为一个对象，指定最小行数和最大行数。', 0);
COMMIT;

-- ----------------------------
-- Table structure for proj
-- ----------------------------
DROP TABLE IF EXISTS `proj`;
CREATE TABLE `proj` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(100) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `addr` varchar(200) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `proj` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=344 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proj
-- ----------------------------
BEGIN;
INSERT INTO `proj` VALUES (230, '五福', '杭州市江干区乐迪教育培训学校', '江干区凤起东路189号新城时代广场1号楼602.603', '120.213495', '30.270142', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (231, '唐祝', '杭州思丹莱培训学校', '江干区钱潮路618号铭鑫大厦4层', '120.220846', '30.275448', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (232, '钱塘', '杭州阳光艺术专修学校', '江干区庆和路41-43号', '120.223873', '30.261598', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (233, '企发', '杭州市江干区音卓钢琴专修学校', '江干区新业路228号来福士03层17B/18A号', '120.219375', '30.254665', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (234, '三新', '杭州市江干区新联邦艺术专修学校', '新塘路33号三新大厦6楼', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (235, '三叉', '杭州市江干区森林艺术培训学校', '江干区新塘路33号三新大厦10楼、3楼', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (236, '三叉', '杭州市江干区崇德培训学校', '江干区太平门直街260号三新银座601室', '120.209306', '30.265042', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (237, '三叉', '杭州浙思培训学校有限公司', '江干区景昙路9号西子国际2座6楼', '120.209994', '30.2648', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (238, '三堡', '杭州骄儿成长空间培训学校有限公司', '江干区杭海路601号三堡产业大厦C座三楼3-35、3-36、3-37、3-38室', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (239, '三堡', '杭州启灵谷英语培训学校有限公司', '江干区杭海路601号三堡产业大厦C座三楼3-40、3-41、3-42、3-43、3-44室', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (240, '五福', '杭州阳萌培训学校有限公司', '江干区凤起东路与顺福路交叉口裙楼第三层3-8', '120.217683', '30.270097', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (241, '五福', '杭州秦才培训学校有限责任公司', '江干区凤起时代大厦401室', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (242, '企发', '杭州市江干区光华启迪培训学校', '江干区新业路228号来福士广场L6-09号商铺', '120.219587', '30.254767', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (243, '三叉', '杭州世纪晓教育培训学校有限公司新塘路分公司', '杭州市江干区新塘路58号广新大厦303室', '120.215293', '30.266561', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (244, '唐祝', '杭州拓博培训学校有限公司', '江干区钱潮路618号铭鑫大厦202室', '120.220846', '30.275448', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (245, '三叉', '杭州遇见风华培训学校有限公司', '江干区新塘路58号广新商务大厦301室', '120.214711', '30.266101', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (246, '三叉', '杭州鲤跃培训学校有限公司', '杭州市江干区旺座中心2幢501室-502室', '120.213521', '30.268203', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (247, '五福', '杭州星锐培训学校有限公司', '江干区新塘路115号新城时代广场C座101室', '120.213604', '30.271294', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (248, '五福', '杭州市下城区启晨专修学校凤起东路教学点', '江干区凤起东路358号天星龙大厦裙楼项目东区块顺福路与凤起东路交叉口第一层1-12', '120.217267', '30.269388', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (249, '企发', '杭州优胜乐习培训学校有限公司', '江干区万象城3幢304、305室', '120.220732', '30.259534', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (250, '三叉', '杭州爱英培家培训学习有限公司', '江干区凤起东路131号第二层', '120.208813', '30.269809', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (251, '五福', '杭州英可美言语言培训学校有限公司第一分公司', '江干区凤起东路358号天星龙大厦B幢裙房第一层101室与第二层201室', '120.217267', '30.269388', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (252, '三堡', '杭州龙科培训学校有限公司', '江干区杭海路601号三堡产业大厦C座3-15、3-16、3-23、3-24室', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (253, '三叉', '杭州知之苑培训学校有限公司', '杭州市江干区凤起东路131号第一层', '120.208813', '30.269809', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (254, '钱运', '杭州前海爱圣培训学校有限公司', '杭州市江干区运塘街99号', '120.211539', '30.263311', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (255, '三堡', '杭州龙文培训学校有限公司杭海路分公司', '江干区杭海路601号三堡产业大厦C座2-02、2-03、2-04室', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (256, '三堡', '杭州孔怀培训学校有限公司', '江干区杭海路601号三堡产业大厦C座3-06', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (257, '三叉', '杭州利普培训学校有限公司', '杭州市江干区景昙路9号西子国际中心三楼301-74', '120.209994', '30.2648', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (258, '三堡', '杭州兴鸿培训学校有限公司', '杭海路601号三堡产业大厦C座3-05', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (259, '三叉', '杭州纳思培训学校有限公司凤起东路分公司', '杭州市江干区凤起时代大厦204-209室', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (260, '三叉', '杭州利普培训学校有限公司景昙路分公司', '杭州市江干区西子国际中心102-1、102-2', '120.210192', '30.264032', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (261, '五福', '杭州精锐培训学校有限公司新城时代广场分公司', '江干区新城时代广场1幢301室', '120.213495', '30.270142', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (262, '钱运', '杭州博圆倍思科培训学校有限公司', '杭州市江干区维多利商务中心1幢203室', '120.195948', '30.282146', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (263, '水湘', '杭州阳光艺术专修学校钱塘教学点', '杭州市江干区钱塘府6幢底商4、商铺5', '120.224058', '30.276876', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (264, '水湘', '杭州古鼎培训学校有限公司', '江干区昙花庵路58号三楼', '120.220176', '30.277063', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (265, '五福', '杭州好果果教育培训学校有限公司', '江干区凤起东路358号天星龙大厦B幢裙楼第三层302室', '120.217267', '30.269388', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (266, '企发', '杭州秋荻艺术培训有限公司', '华润大厦B座302、303', '120.220826', '30.259551', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (267, '三叉', '杭州童尚文化创意有限公司', '西子国际三楼301-9.10', '120.309136', '30.407378', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (268, '三叉', '杭州创想童年科技连锁有限公司景昙路分公司', '西子国际三楼301-73', '120.309136', '30.407378', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (269, '三叉', '新鸿教育', '西子国际三楼301-75', '120.309136', '30.407378', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (270, '三叉', '杭州盛歌实业投资有限公司', '西子国际三楼301-79', '120.309136', '30.407378', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (271, '三叉', '杭州贝加体育策划有限公司', '西子国际三楼301-82', '120.309136', '30.407378', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (272, '三叉', '杭州乐说教育咨询有限公司', '西子国际C座801', '120.210321', '30.26428', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (273, '三叉', '杭州恢弘文化创意有限公司', '西子国际C座1002', '120.210321', '30.26428', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (274, '三叉', '杭州小码教育科技有限公司西子分公司', '西子国际C座2205', '120.210321', '30.26428', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (275, '三叉', '杭州百蝶文化艺术策划有限公司', '元华旺座A501室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (276, '三叉', '杭州滢佳艺术特长培训有限公司', '元华旺座B302A室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (277, '三叉', '杭州欧叶教育信息有限公司', '元华旺座B601室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (278, '三叉', '朗宁双语美育中心（杭州彦迪教育咨询有限公司）', '元华旺座B701室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (279, '三叉', '杭州惠控科技有限公司（杭州乐慧教育科技有限公司）', '元华旺座B401室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (280, '三叉', '杭州翎午教育咨询有限公司（吉雅舞蹈艺术中心）', '三新大厦11楼', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (281, '三叉', '追梦舞蹈（杭州联手才艺测评活动中心江干区第三分部）', '凤起时代大厦B402', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (282, '三叉', '杭州君尊鼓迹教育科技有限公司', '凤起时代大厦B415', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (283, '三叉', '浙江纳思教育科技有限公司', '凤起时代大厦B204', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (284, '三叉', '贝尔追马综合素养中心', '凤起时代大厦B315', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (285, '三叉', '爱体能运动', '凤起时代大厦B405', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (286, '三叉', '杭州扶苏文化艺术有限公司', '凤起时代大厦A1003', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (287, '三叉', '杭州微鸟教育咨询有限公司', '三新银座11楼1105', '120.209306', '30.265042', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (288, '三叉', '杭州新京武教育咨询有限公司', '庆春银泰', '120.269001', '30.232449', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (289, '三叉', '杭州子枫科技有限公司（蓝旗游泳）', '新传媒大厦裙楼三层', '120.215224', '30.266334', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (290, '三叉', '杭州诗音琴行有限公司', '新传媒产业大厦裙楼2楼', '120.215224', '30.266334', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (291, '三叉', '杭州双子星舞蹈培训有限公司', '新传媒产业大厦12楼', '120.215224', '30.266334', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (292, '三叉', '杭州禄艺文化艺术有限公司', '新传媒产业大厦3楼', '120.215224', '30.266334', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (293, '三叉', '杭州梓为星文化创意有限公司', '新传媒17楼', '120.215224', '30.266334', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (294, '三叉', '杭州学思教育咨询有限公司', '新业大厦11楼', '120.215659', '30.26812', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (295, '三叉', '杭州学之行教育科技有限公司', '凤起时代大厦310室', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (296, '三叉', '杭州齐天体育文化发展有限公司', '西子国际中心3楼301-88', '120.210192', '30.264032', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (297, '三叉', '杭州鸿文教育咨询有限公司', '西子国际C座1101室', '120.210321', '30.26428', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (298, '三叉', '杭州蓝音文化创意有限公司', '凤起时代大厦2404室', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (299, '三叉', '杭州星魂文化传播有限公司', '三新大厦11楼1118室', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (300, '三叉', '新庆春艺术文化有限公司', '三新大厦7楼720室', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (301, '三叉', '杭州古月美学文化艺术有限公司', '三新大厦203室', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (302, '三叉', '杭州金芭蕾艺术培训有限公司', '景昙路18-26号3F-304（庆春银泰）', '120.211243', '30.265823', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (303, '三叉', '杭州优数教育科技有限公司', '西子国际中心A座601室', '120.210192', '30.264032', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (304, '三叉', '杭州培飞教育信息咨询有限公司', '西子国际中心3楼', '120.210192', '30.264032', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (305, '五福', '杭州乐纳艺术培训有限公司', '天星龙A座裙楼第二层2-5', '120.215646', '30.268547', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (306, '五福', '杭州赋森教育科技有限责任公司', '天星龙A座裙楼第三层3-2', '120.215646', '30.268547', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (307, '五福', '杭州博谦企业管理咨询有限公司江干分公司', '天虹A座二楼', '120.215189', '30.270371', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (308, '五福', '杭州宝瑞思教育咨询服务有限公司', '天虹A座108、201号', '120.216206', '30.270689', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (309, '五福', '杭州铠鸿健身服务有限公司', '天虹B座303-305号', '120.216206', '30.270689', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (310, '五福', '杭州象爱信息技术有限公司', '天虹B座309号', '120.216642', '30.270827', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (311, '五福', '杭州企瑞教育咨询有限公司', '天虹A座101、203号', '120.215189', '30.270371', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (312, '五福', '杭州音之舞艺术培训股份有限公司新塘路分公司', '天虹B座315号', '120.216642', '30.270827', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (313, '五福', '杭州东书房艺术培训有限公司', '天虹B座', '120.216642', '30.270827', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (314, '五福', '杭州立书大艺术培训有限公司', '新城时代广场1幢1602室', '120.213495', '30.270142', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (315, '五福', '杭州格行文化艺术创意有限公司', '新城时代广场3幢801室', '120.213069', '30.271419', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (316, '五福', '杭州市江干区艺往琴行', '太平门直街637号', '120.220134', '30.267188', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (317, '五福', ' 杭州少之华教育信息咨询有限公司', '太平门直街635号', '120.22008', '30.267192', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (318, '五福', '杭州卓乐艺术培训有限公司', '太平门直街627号', '120.219931', '30.267199', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (319, '五福', '杭州市江干区箐筠琴行', '钱潮路309号', '120.221033', '30.267446', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (320, '五福', '杭州骞冬科技有限公司', '天虹B座408b号', '120.216206', '30.270689', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (321, '五福', '杭州晶盈教育科技有限公司', '天虹B座317-318号', '120.216642', '30.270827', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (322, '三堡', '杭州润英体育竞技培训艺术有限公司', '江干区杭海路601号三堡产业大厦C座三楼3-47/68', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (323, '三堡', '杭州艺扬教育信息咨询有限公司杭州江和美分公司', '江干区杭海路601号三堡产业大厦C座三楼3-69/71', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (324, '三堡', '杭州竹云文化创意有限公司', '江干区杭海路601号三堡产业大厦C座三楼3-45-53', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (325, '三堡', '爱萝卜科投（杭州）有限公司', '江干区杭海路601号三堡产业大厦C座二楼2-32-14', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (326, '三堡', '杭州明秀文化发展有限公司', '浙江省杭州市江干区杭海路601号三堡产业大厦C座2-07室', '120.234246', '30.274705', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (327, '三堡', '杭州领扬教育信息咨询有限公司', '杭州市江干区三堡北苑商铺20号2楼', '120.223323', '30.274364', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (328, '三堡', '杭州毗努伊勒教育信息咨询有限公司', '杭州市江干区杭海路601号三堡产业大厦B幢4楼401室', '120.234518', '30.27551', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (329, '钱塘', '创才教育', '盛世钱塘花园会所', '120.228143', '30.265584', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (330, '钱塘', '杭州汉源棋文化策划有限公司（安朵国际）', '钱潮路2号天元大厦裙楼', '120.230623', '30.260872', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (331, '钱塘', '杭州好囡信息技术有限公司  （好姑姑）', '庆和路45号', '120.22381', '30.261749', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (332, '钱塘', '杭州杉逸艺术培训有限公司   （乐谷国际）', '瑞丽江河汇大厦金座5楼', '120.231794', '30.262594', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (333, '钱塘', '杭州安彼润园文化艺术有限公司（安彼国际）', '东方润园会所103号', '120.228326', '30.259657', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (334, '钱塘', '杭州华艺艺术发展中心', '新城国际彩园2-2-102', '120.225031', '30.262202', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (335, '钱运', '杭州米利艺术特长培训有限公司（迪卡）', '维多利商务中心1幢3楼', '120.187727', '30.269663', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (336, '企发', '杭州樱教爱教育咨询有限公司', '华润大厦B座702、703', '120.220826', '30.259551', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (337, '企发', '芝麻街英语', '来福士中心L308B', '120.219375', '30.254665', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (338, '企发', '杭州乐雅艺术特长培训有限公司江干区分公司（澳蒙国际）', '平安金融中心3幢1-2楼', '120.218906', '30.257356', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (339, '三叉', '杭州优腾文化咨询有限公司', '西子国际中心二层201-56店铺', '120.210192', '30.264032', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (340, '三叉', '杭州美宇教育科技有限公司', '凤起时代大厦B210', '120.213519', '30.269098', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (341, '三叉', '杭州市江干区晓雯乐器商行', '元华旺座B402室', '120.213843', '30.267636', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (342, '三叉', '杭州未莱星书法培训有限公司', '三新大厦7楼', '120.213531', '30.266433', NULL, NULL, NULL);
INSERT INTO `proj` VALUES (343, '三叉', '杭州播浪文化艺术有限公司', '新传媒产业大厦1408', '120.215224', '30.266334', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for ques
-- ----------------------------
DROP TABLE IF EXISTS `ques`;
CREATE TABLE `ques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ques
-- ----------------------------
BEGIN;
INSERT INTO `ques` VALUES (4, '如何选择合适的培训机构？', '从距离上选择：可点击平台中的“联盟空间”中“机构介绍”按钮，查询您周边的教培机构；\r\n从内容上选择：在机构介绍中了解机构们的主培项目，选择适合孩子发展的项目');
INSERT INTO `ques` VALUES (5, '通过什么途径可以深入了解机构？', '可点击平台中的“联盟空间”中“机构介绍”按钮先进行基本了解。也可点击平台中的“精彩活动”的“往期活动”中查看优秀机构分享的公益微课来了解每个机构们的特色内容');
INSERT INTO `ques` VALUES (6, '想让孩子多参加社会教育实践有什么推荐途径吗？', '联盟会不定期开展进社区流动送教活动、研学活动，请关注平台公众号和社区公告栏。');
INSERT INTO `ques` VALUES (7, 'aawe', 'bbbb');
COMMIT;

-- ----------------------------
-- Procedure structure for PROC_ACT_ADD_COL
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_ACT_ADD_COL`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_ACT_ADD_COL`(IN `data` varchar(20000))
BEGIN
		DECLARE _type   varchar(20) default null;
		DECLARE _title  varchar(200) default null;
		DECLARE _target varchar(100) default null;
		DECLARE _regmd  varchar(200) default null;
		DECLARE _pic    varchar(1000) default null;
		DECLARE _qrcode varchar(100) default null;
		DECLARE _form   varchar(200) default null;
		DECLARE _note   varchar(200) default null;
		DECLARE _award  varchar(200) default null;
		
    set _type   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));
		set _title  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.title'));
		set _target = JSON_UNQUOTE(JSON_EXTRACT(data,'$.target'));
		set _regmd  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.regmd'));
		set _pic    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.pic'));
		set _qrcode = JSON_UNQUOTE(JSON_EXTRACT(data,'$.qrcode'));
		set _form   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.form'));
		set _note   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.note'));
		set _award  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.award'));
		
		insert into act(type,title,target,regmd,pic,qrcode,form,note,award) 
		value(_type,_title,_target,_regmd,_pic,_qrcode,_form,_note,_award);
		
	select * from act;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_ACT_ADD_OFL
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_ACT_ADD_OFL`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_ACT_ADD_OFL`(IN `data` varchar(20000))
BEGIN
		DECLARE _type   varchar(20) default null;
		DECLARE _title  varchar(200) default null;
		DECLARE _target varchar(100) default null;
		DECLARE _regmd  varchar(200) default null;
		DECLARE _pic    varchar(1000) default null;
		DECLARE _qrcode varchar(100) default null;
		DECLARE _addr   varchar(100) default null;
		DECLARE _dt     varchar(20) default null;
		DECLARE _cnt    varchar(1000) default null;
		DECLARE _charge   varchar(100) default null;
		
    set _type   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.type'));
		set _title  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.title'));
		set _target = JSON_UNQUOTE(JSON_EXTRACT(data,'$.target'));
		set _regmd  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.regmd'));
		set _pic    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.pic'));
		set _qrcode = JSON_UNQUOTE(JSON_EXTRACT(data,'$.qrcode'));
		set _addr   = JSON_UNQUOTE(JSON_EXTRACT(data,'$.addr'));
		set _dt     = JSON_UNQUOTE(JSON_EXTRACT(data,'$.dt'));
		set _cnt    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.cnt'));
		set _charge = JSON_UNQUOTE(JSON_EXTRACT(data,'$.charge'));
		
		insert into act(type,title,target,regmd,pic,qrcode,addr,dt,cnt,charge) 
		value(_type,_title,_target,_regmd,_pic,_qrcode,_addr,_dt,_cnt,_charge);
		
	select * from act;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_ACT_LOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_ACT_LOAD`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_ACT_LOAD`()
BEGIN
	select * from act;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_MSGS_LOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_MSGS_LOAD`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_MSGS_LOAD`()
BEGIN
	select * from msg  where mark = 0;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_MSGS_SAVE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_MSGS_SAVE`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_MSGS_SAVE`(IN `data` varchar(20000))
BEGIN
		DECLARE list varchar(20000) default null;
		DECLARE _name varchar(100) default null;
		DECLARE _dt   varchar(20) default null;
		DECLARE _mobile varchar(20) default null;
		DECLARE _msg   varchar(2000) default null;
		
		DECLARE json_items  BIGINT UNSIGNED ;
		DECLARE _index      BIGINT UNSIGNED DEFAULT 0;
		
		
    set list = JSON_UNQUOTE(JSON_EXTRACT(data,'$.data'));
    set json_items = JSON_LENGTH(list);
		
		delete from msg;
		
    while `_index` < `json_items` do
       set _name  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].name')));
			 set _dt  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].dt')));
			 set _mobile  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].mobile')));
			 set _msg  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].msg')));
			 
			 insert into msg(`name`,`dt`,`mobile`,`msg`) value(_name,_dt,_mobile,_msg);
       set `_index` := `_index` + 1;
    end while;
		
	select * from msg;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_MSG_SAVE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_MSG_SAVE`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_MSG_SAVE`(IN `data` varchar(20000))
BEGIN
	DECLARE _name varchar(100) default null;
	DECLARE _mobile varchar(20) 	default null;
	DECLARE _msg varchar(1000) default null;

	SET _name  = JSON_UNQUOTE(JSON_EXTRACT(data,'$.name'));
	SET _mobile = JSON_UNQUOTE(JSON_EXTRACT(data,'$.mobile'));
	SET _msg = JSON_UNQUOTE(JSON_EXTRACT(data,'$.msg'));
	
	insert into msg(name,mobile,dt,msg) values(_name,_mobile,now(),_msg);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_PROJECT_LOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_PROJECT_LOAD`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_PROJECT_LOAD`()
BEGIN
	select * from proj;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_PROJECT_SAVE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_PROJECT_SAVE`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_PROJECT_SAVE`(IN `data` varchar(20000))
BEGIN
		DECLARE list varchar(20000) default null;
		DECLARE _area varchar(100) default null;
		DECLARE _name varchar(200) default null;
		DECLARE _addr varchar(200) default null;
		DECLARE _lat varchar(20) default null;
		DECLARE _lng varchar(20) default null;
		
		DECLARE json_items  BIGINT UNSIGNED ;
		DECLARE _index      BIGINT UNSIGNED DEFAULT 0;
		
		
    set list = JSON_UNQUOTE(JSON_EXTRACT(data,'$.data'));
    set json_items = JSON_LENGTH(list);
		
		delete from proj;
		
    while `_index` < `json_items` do
       set _area  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].area')));
			 set _name  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].name')));
			 set _addr  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].addr')));
			 set _lat   = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].lat')));
			 set _lng   = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].lng')));
			 
			 insert into proj(`area`,`name`,`addr`,`lat`,`lng`) value(_area,_name,_addr,_lat,_lng);
       set `_index` := `_index` + 1;
    end while;
		
	select * from proj;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUES_LOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUES_LOAD`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_QUES_LOAD`()
BEGIN
	select * from ques;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUES_SAVE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUES_SAVE`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_QUES_SAVE`(IN `data` varchar(20000))
BEGIN
		DECLARE list varchar(20000) default null;
		DECLARE _question varchar(1000) default null;
		DECLARE _answer varchar(1000) default null;
		
		DECLARE json_items  BIGINT UNSIGNED ;
		DECLARE _index      BIGINT UNSIGNED DEFAULT 0;
		
		
    set list = JSON_UNQUOTE(JSON_EXTRACT(data,'$.data'));
    set json_items = JSON_LENGTH(list);
		
		delete from ques;
		
    while `_index` < `json_items` do
       set _question  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].question')));
			 set _answer  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].answer')));
			 
			 insert into ques(`question`,`answer`) value(_question,_answer);
       set `_index` := `_index` + 1;
    end while;
		
	select * from ques;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_UNION_INFO_LOAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_UNION_INFO_LOAD`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_UNION_INFO_LOAD`()
BEGIN
	select * from info;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_UNION_INFO_SAVE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_UNION_INFO_SAVE`;
delimiter ;;
CREATE PROCEDURE `season`.`PROC_UNION_INFO_SAVE`(IN `data` varchar(20000))
BEGIN
		DECLARE list varchar(20000) default null;
		DECLARE _desc varchar(1000) default null;
		DECLARE json_items  BIGINT UNSIGNED ;
		DECLARE _index      BIGINT UNSIGNED DEFAULT 0;
		
		
    set list = JSON_UNQUOTE(JSON_EXTRACT(data,'$.data'));
    set json_items = JSON_LENGTH(list);
		
		delete from info;
		
    while `_index` < `json_items` do
       set _desc  = JSON_UNQUOTE(json_extract(list, concat('$[', `_index`, '].desc')));
			 insert into info(`desc`) value(_desc);
       set `_index` := `_index` + 1;
    end while;
		
	select * from info;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
