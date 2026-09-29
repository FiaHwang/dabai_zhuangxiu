import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, Copy, 
  HelpCircle, ChevronDown, ChevronUp, FileText,
  Percent, ArrowRight, ShieldCheck, Flame, Info
} from 'lucide-react';

export interface AuditItem {
  id: string;
  category: string;
  name: string;
  riskLevel: 'extreme' | 'high' | 'medium';
  typicalCostMin: number;
  typicalCostMax: number;
  costNote: string;
  contractorExcuse: string;
  pitfallAnalysis: string;
  contractClause: string;
  isDefaultMissingInQuote: boolean;
}

export const AUDIT_ITEMS: AuditItem[] = [
  // 1. 拆改与保护
  {
    id: 'trash_external',
    category: '01 拆改与施工保护',
    name: '建筑垃圾清运出小区外运费（非小区内堆放）',
    riskLevel: 'high',
    typicalCostMin: 800,
    typicalCostMax: 2000,
    costNote: '约 800 - 2000 元 (视拆墙量和车次而定)',
    contractorExcuse: '“我们报价里包含垃圾清运，但只负责运到小区物业指定的地面垃圾池，要拉出小区去渣土消纳场那是外运车，得另外掏钱！”',
    pitfallAnalysis: '90%的整装套餐都会在“清运”二字玩文字游戏。物业收的垃圾费通常只给堆放权，外运车每车收 600~1000 元。拆除量稍大就需要两三车。',
    contractClause: '【防坑条款】：工程总价包含拆改及施工产生的所有建筑垃圾装袋、下楼并清运出小区外运至市政指定消纳场，施工方承诺无任何二次短驳与清运外运附加费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'wall_insulation',
    category: '01 拆改与施工保护',
    name: '原阳台/室内保温层及空鼓批荡铲除与挂网抹灰',
    riskLevel: 'high',
    typicalCostMin: 1200,
    typicalCostMax: 3000,
    costNote: '约 1200 - 3000 元 (约35-50元/㎡)',
    contractorExcuse: '“量房时没看出来阳台有内保温层，现在拆完发现贴砖容易脱落，必须铲掉重新做水泥砂浆抹灰和挂钢丝网，这是房屋本身结构问题属于新增项！”',
    pitfallAnalysis: '新房阳台、外墙内侧常有泡沫保温板，如果不铲除直接贴砖必定空鼓下坠，刮腻子必开裂。装修公司前期故意不提，后期进场拆除后坐地起价。',
    contractClause: '【防坑条款】：乙方进场前已完成现场勘测，合同总价已涵盖阳台及室内所有内保温层、空鼓层铲除，以及重新挂网粉刷水泥砂浆找平恢复基层的全部人工与材料费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'public_protection',
    category: '01 拆改与施工保护',
    name: '公共区域（电梯间/走廊）及入户防盗门精细成品保护',
    riskLevel: 'medium',
    typicalCostMin: 300,
    typicalCostMax: 600,
    costNote: '约 300 - 600 元',
    contractorExcuse: '“报价只包含室内门槛简易保护，物业要求的电梯轿厢木板包覆、楼道全覆地膜保护需要额外购买保护耗材。”',
    pitfallAnalysis: '物业开工检查极其严格，若公共走廊或电梯未按标准铺设厚瓦楞纸或阻燃板，物业直接停电停水或扣押金。',
    contractClause: '【防坑条款】：乙方负责按当地物业要求完成单元门、公共走廊、电梯轿厢及入户防盗门双面防撞精细成品保护，费用包干，不得转嫁业主。',
    isDefaultMissingInQuote: true
  },

  // 2. 水电工程
  {
    id: 'hydropower_overrun',
    category: '02 水电隐蔽工程 (最大增项黑洞)',
    name: '水电“按实结算”无封顶恶意绕线增项',
    riskLevel: 'extreme',
    typicalCostMin: 3500,
    typicalCostMax: 8000,
    costNote: '约 3500 - 8000 元 (极度高危)',
    contractorExcuse: '“合同上写的是预估水电3500元，但您家改动多，加上做大弧弯横平竖直高标准工艺，实际量出来用了320米强电管和70米水管，必须按米补交差价！”',
    pitfallAnalysis: '这是所有装修公司最常用的“低价钓鱼”狠招！先在报价单写 3000~4000 元把总价做低吸引签约，开工后电工满屋拐大弯、一管穿一两根线，结账时直接要你补交近万元！',
    contractClause: '【防坑条款】：水电工程实行一口价闭口包干（或约定实测实量浮动总额不得超过预收总额的8%），超出部分由乙方自行承担；全屋水电布线坚持“两点一线”最短点对点走线，严禁恶意绕线。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'equipment_holes',
    category: '02 水电隐蔽工程 (最大增项黑洞)',
    name: '全屋空调、油烟机、燃气热水器设备打孔费',
    riskLevel: 'high',
    typicalCostMin: 450,
    typicalCostMax: 1000,
    costNote: '约 450 - 1000 元 (6-10个孔)',
    contractorExcuse: '“我们只管管线铺设，不包含打孔。梁上是钢筋混凝土硬梁，得用水钻加长打，一个孔80-100元，全屋8个孔要单独给打孔师傅结账。”',
    pitfallAnalysis: '三室两厅必备开孔：空调孔3-4个、油烟机孔1个、燃气热水器排烟孔1个、卫生间排气孔1个，很多梁上开孔还要加深。报价单漏写这一项，开工后就是几百上千的纯增项。',
    contractClause: '【防坑条款】：工程包含全屋所有设备（空调、油烟机、燃气热水器、浴霸排风、新风等）墙体及钢筋混凝土梁水钻开孔，无任何单孔附加费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'breaker_panel',
    category: '02 水电隐蔽工程 (最大增项黑洞)',
    name: '强弱电箱更换、漏电保护空开及专线回路扩容',
    riskLevel: 'high',
    typicalCostMin: 600,
    typicalCostMax: 1500,
    costNote: '约 600 - 1500 元',
    contractorExcuse: '“开发商原配电箱回路太少且质量差，您家厨房大功率烤箱、冰箱、卫生间智能马桶、空调都要独立专线，必须换大电箱和10个施耐德漏保，材料费另计。”',
    pitfallAnalysis: '现代家庭大功率电器多，原开发商电箱往往路数不足。若报价单仅写“原箱利旧”，后期更换箱体+高端空开必然是高额增项。',
    contractClause: '【防坑条款】：配电箱改造方案已在合同中核定，包含知名品牌（施耐德/正泰/德力西）强弱电箱本体、全套分路漏电保护空气开关，及厨房、卫浴、空调等所有独立回路专线材料与工费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'pipe_insulation',
    category: '02 水电隐蔽工程 (最大增项黑洞)',
    name: '卫生间主下水立管双层隔音棉降噪处理',
    riskLevel: 'medium',
    typicalCostMin: 300,
    typicalCostMax: 800,
    costNote: '约 300 - 800 元 (150-250元/根)',
    contractorExcuse: '“基础报价只包含红砖包立管，若要做阻尼止震片和隔音棉包裹，需要额外买材料加收人工费。”',
    pitfallAnalysis: '如果不包隔音棉，楼上半夜冲马桶声音如雷贯耳。很多报价单只写“包立管”，不写隔音棉，工人现场推销赚外快。',
    contractClause: '【防坑条款】：所有卫生间与阳台排水立管及支管，必须先包覆阻尼减震片再包裹≥20mm高密度梯度吸音棉，并扎带密实固定后方可砌砖包管，费用已包含在内。',
    isDefaultMissingInQuote: true
  },

  // 3. 泥瓦工程
  {
    id: 'large_tile_surcharge',
    category: '03 泥瓦贴砖工程',
    name: '主流 750×1500 大砖/大板贴砖人工附加费',
    riskLevel: 'extreme',
    typicalCostMin: 2000,
    typicalCostMax: 4500,
    costNote: '约 2000 - 4500 元 (30-60元/㎡附加费)',
    contractorExcuse: '“公司合同里标配人工只针对 800×800 普通地砖和 300×600 墙砖。您现在买的 750×1500 或 600×1200 属于大规格大板，搬运难、要两个人抬着贴，必须按每平米加收大砖补贴费！”',
    pitfallAnalysis: '这是近两年最严重的贴砖套路！现在几乎没人贴 300×600 小砖了，大家都买 750×1500 或 600×1200。装修公司报价单却故意按老旧小砖核算，等业主买好大砖进场后，每平米加收30~60元，客餐厅全铺下来直接暴涨几千元！',
    contractClause: '【防坑条款】：业主选购地砖规格（如 750×1500mm / 800×800mm）及墙砖规格（如 600×1200mm / 400×800mm）已在签约前确认，贴砖人工费为一口价综合包干，乙方不得以“大砖、规格超标、双人施工”为由加收任何铺贴附加费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'tile_processing',
    category: '03 泥瓦贴砖工程',
    name: '瓷砖 45° 海棠角倒角碰角与异形水管开孔加工费',
    riskLevel: 'high',
    typicalCostMin: 1000,
    typicalCostMax: 2500,
    costNote: '约 1000 - 2500 元 (倒角15-25元/米，开孔15元/个)',
    contractorExcuse: '“贴砖人工只包直接贴。要做漂亮的海棠角必须送加工厂机器倒角，工厂收倒角费和来回运费；另外水管出水圆孔开孔也需要专用钻头单算。”',
    pitfallAnalysis: '现代极简风格卫生间阳角都必须做45度海棠角美缝。全屋阳角少则几十米，加上全屋几十个水管、地漏打孔开孔，加工费和加工厂运费随随便便加收两千多。',
    contractClause: '【防坑条款】：包含全屋瓷砖45度海棠角倒角加工、异形裁切、管道及花洒接口圆弧精准开孔、地漏回字形排水坡度切割人工与耗材，不得另计深加工费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'tile_adhesive',
    category: '03 泥瓦贴砖工程',
    name: '全瓷墙砖专用 C2 级瓷砖胶与背涂胶材料费',
    riskLevel: 'high',
    typicalCostMin: 1500,
    typicalCostMax: 3000,
    costNote: '约 1500 - 3000 元 (德高/雨虹瓷砖胶需20-30袋)',
    contractorExcuse: '“合同辅料里只包含普通水泥和黄沙。您家买的全瓷砖吸水率低，只用水泥砂浆以后百分之百脱落砸人，必须加买专门的德高/雨虹瓷砖胶和背胶，材料费另算。”',
    pitfallAnalysis: '低价报价单永远只写“水泥黄沙”，隐瞒瓷砖胶。等砖运到工地，瓦工直接拒绝施工，逼你临时自掏腰包买几千块钱的高标号瓷砖胶。',
    contractClause: '【防坑条款】：厨卫所有墙地砖铺贴辅料必须全额包含符合国家标准的品牌 C2 级强效瓷砖胶（如德高/东方雨虹/百得）及配套界面背胶，薄贴法施工，严禁单用水泥砂浆。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'floor_leveling',
    category: '03 泥瓦贴砖工程',
    name: '地面找平厚度超标费与防水高度不足',
    riskLevel: 'medium',
    typicalCostMin: 800,
    typicalCostMax: 2000,
    costNote: '约 800 - 2000 元',
    contractorExcuse: '“报价单写的找平厚度是≤20mm，您家原始地面落差大，局部做到了35mm，超厚部分按每增加1cm每平米加收20元；另外卫生间防水报价默认刷1.5米，刷到顶要补材料差价。”',
    pitfallAnalysis: '很多开发商地面本身就不平，装修公司按最低厚度报价；防水高度更是只刷半截，逼你在开工后花钱“升级到顶”。',
    contractClause: '【防坑条款】：地面找平以达到木地板/地砖平整度验收标准（2m靠尺误差≤3mm）为准，不论实际回填或砂浆厚度均一口价包干；卫生间淋浴区防水必须刷至封顶高度（≥2.0m），地面返墙≥30cm并含48小时闭水试验。',
    isDefaultMissingInQuote: true
  },

  // 4. 木工与吊顶
  {
    id: 'curtain_box',
    category: '04 木工与吊顶工程',
    name: '隐藏式窗帘盒制作与电动窗帘预留欧松板打底',
    riskLevel: 'high',
    typicalCostMin: 800,
    typicalCostMax: 1800,
    costNote: '约 800 - 1800 元 (全屋3-4个窗帘盒)',
    contractorExcuse: '“报价单里只算了常规石膏板平面吊顶和双眼皮边吊，窗帘盒属于异形细木工构件，单独按延米收费（100-150元/米）。”',
    pitfallAnalysis: '现代装修只要挂窗帘或装电动窗帘，必须做窗帘盒，否则罗马杆漏光又过时。很多基础报价故意删掉窗帘盒，后期按米高价追加。',
    contractClause: '【防坑条款】：客餐厅及所有卧室窗帘盒（含双轨/电动窗帘预留滑轨槽及内嵌欧松板受力加固打底）已合并在天花吊顶总价中，不按延米额外计费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'spotlight_holes',
    category: '04 木工与吊顶工程',
    name: '无主灯筒灯/射灯打孔与磁吸轨道开槽加固费',
    riskLevel: 'medium',
    typicalCostMin: 400,
    typicalCostMax: 1000,
    costNote: '约 400 - 1000 元 (15-25元/孔，嵌入式开槽另计)',
    contractorExcuse: '“吊顶只管封石膏板，全屋无主灯要开28个射灯孔，每个孔木工收20元手工费；预埋磁吸轨道要裁切加固龙骨，每米加收50元开槽费。”',
    pitfallAnalysis: '做无主灯设计的家庭几乎人人被收这一项！几十个孔开下来，加上磁吸轨道槽，木工加收小一千块。',
    contractClause: '【防坑条款】：天花吊顶包含全屋所有筒灯、射灯、磁吸轨道灯、灯带凹槽的现场精准开孔、预埋铝型材开槽及龙骨木方加固，不单独按孔或按米计费。',
    isDefaultMissingInQuote: true
  },

  // 5. 油漆墙面工程
  {
    id: 'putty_removal',
    category: '05 油漆墙面工程',
    name: '原开发商劣质腻子/大白层铲除与全屋界面剂（墙锢）',
    riskLevel: 'extreme',
    typicalCostMin: 2500,
    typicalCostMax: 4500,
    costNote: '约 2500 - 4500 元 (三室两厅墙面约200-260㎡)',
    contractorExcuse: '“开发商交房刷的原墙皮不耐水，用水一喷就掉，如果不铲掉直接批腻子，几年后整面墙起皮脱落公司不质保！铲墙皮按全屋展开面积每平米收15元。”',
    pitfallAnalysis: '几乎所有毛坯房的大白腻子都必须铲掉重做耐水腻子，但绝大多数整装公司在报价单里故意不写铲墙皮，等进场后以“不铲就不保修”为要挟逼你掏三四千元！',
    contractClause: '【防坑条款】：报价已包含全屋原始墙顶面劣质腻子层彻底铲除至水泥砂浆抹灰基层，并全屋滚涂品牌防潮防起砂界面剂（墙锢）一道，绝不发生额外铲墙皮增项。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'vertical_leveling',
    category: '05 油漆墙面工程',
    name: '定制衣柜处冲筋定点垂平（垂直度误差≤2mm）',
    riskLevel: 'high',
    typicalCostMin: 1800,
    typicalCostMax: 4000,
    costNote: '约 1800 - 4000 元 (冲筋垂平30-50元/㎡)',
    contractorExcuse: '“我们报价只包含普通顺平（肉眼看着平）。您做通顶衣柜和极简门，要想墙面绝对垂直、柜子严丝合缝，必须做冲筋定点垂平工艺，工钱和找平石膏要翻倍。”',
    pitfallAnalysis: '只做“顺平”的话，墙面上下可能歪斜1-2公分。定制通顶大衣柜装上去后，侧面就会露出极丑的大牙签缝。如果找装修公司做垂平，工长当场漫天要价。',
    contractClause: '【防坑条款】：全屋定制衣柜靠墙处、室内门套线处、踢脚线交接处墙面必须达到垂直度验收标准（2m靠尺垂直度误差≤2mm），包含在油漆找平施工中，严禁借口“冲筋垂平”加收工费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'paint_color_fee',
    category: '05 油漆墙面工程',
    name: '乳胶漆电脑调色分色与深色背景墙刷涂附加费',
    riskLevel: 'medium',
    typicalCostMin: 300,
    typicalCostMax: 800,
    costNote: '约 300 - 800 元',
    contractorExcuse: '“套餐里乳胶漆只含全屋刷纯白色。您选的奶咖色、脏粉色每桶要收调色费50元；主卧刷深色背景墙得多滚涂一遍，加收分色人工费。”',
    pitfallAnalysis: '现代年轻人几乎都会给卧室选色号做背景墙。装修公司默认全白，只要挑颜色就层层加价。',
    contractClause: '【防坑条款】：包含全屋乳胶漆原厂电脑调色（提供不少于3个色号）及卧室单面背景墙分色滚涂施工，底漆一遍面漆两遍，不加收调色费与分色人工费。',
    isDefaultMissingInQuote: true
  },

  // 6. 橱柜与定制门窗
  {
    id: 'cabinet_overmeter',
    category: '06 橱柜定制与五金门窗',
    name: '橱柜超出套餐延米限制（通常只送3米地柜+1米吊柜）',
    riskLevel: 'high',
    typicalCostMin: 2000,
    typicalCostMax: 4500,
    costNote: '约 2000 - 4500 元 (地柜900-1400元/米，吊柜600-900元/米)',
    contractorExcuse: '“套餐里包3米地柜+1米吊柜。您家厨房U型布局，实际地柜有4.2米、吊柜2.5米，超出的1.2米地柜和1.5米吊柜必须按延米单价补交差价！”',
    pitfallAnalysis: '三室两厅的标准厨房，正常至少需要 3.8~4.5 米地柜、2~3 米吊柜。套餐送的3米地柜根本不够用，超出的延米单价极高，是整装公司赚取暴利的核心手段！',
    contractClause: '【防坑条款】：签约前根据设计师现场复尺图纸，确定厨房实际所需地柜与吊柜米数，按厨房完整定制一套一口价包干，杜绝开工后“超米补差”套路。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'undermount_sink',
    category: '06 橱柜定制与五金门窗',
    name: '厨房大单槽“台下盆”下挂加固工艺与开孔费',
    riskLevel: 'medium',
    typicalCostMin: 200,
    typicalCostMax: 500,
    costNote: '约 200 - 500 元',
    contractorExcuse: '“橱柜石英石台面默认只做普通台上盆。要做台下盆需要在工厂开孔磨边并打云石胶加装承重支架，属于特殊工艺加工费200元。”',
    pitfallAnalysis: '台上盆边缘打玻璃胶几个月后必发霉发黑，且台面积水无法直接扫入水槽，绝大多数家庭都选台下盆。但这通常是橱柜公司的隐形收费项。',
    contractClause: '【防坑条款】：橱柜石英石台面（厚度≥18mm/20mm）免费提供水槽台下盆开孔、打磨及下挂承重加固安装服务，无任何额外加工费。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'door_hardware',
    category: '06 橱柜定制与五金门窗',
    name: '室内木门不含静音磁吸锁、加厚合页与门吸',
    riskLevel: 'medium',
    typicalCostMin: 450,
    typicalCostMax: 1200,
    costNote: '约 450 - 1200 元 (3-4樘门，150-300元/套五金)',
    contractorExcuse: '“报价单里含的是木门门扇和门套，不包含锁具五金。标配锁是普通机械铁锁，想换静音磁吸锁、不锈钢加厚子母合页需要自购或补差价。”',
    pitfallAnalysis: '很多公司报价写“含木门3樘”，实际上配的锁极劣质，或者根本不包五金配件，安装时找你收五金费。',
    contractClause: '【防坑条款】：室内所有木门均包含全套优质五金配件（含品牌静音磁吸门锁、加厚不锈钢轴承子母合页3只/樘、地吸/墙吸），包含现场安装调校，包干不另收费。',
    isDefaultMissingInQuote: true
  },

  // 7. 物流杂费与综合管理
  {
    id: 'handling_fee',
    category: '07 材料运输、管理费与杂费',
    name: '主辅材上楼搬运费、电梯不进大砖步梯费、短驳二次搬运费',
    riskLevel: 'high',
    typicalCostMin: 1200,
    typicalCostMax: 3000,
    costNote: '约 1200 - 3000 元',
    contractorExcuse: '“大板瓷砖进不去电梯，师傅必须走楼梯一层一层扛上去，楼梯上楼费按每层每片单独计费；水泥大货车进不了地库，从小区门口推车到单元门这叫二次短驳搬运费！”',
    pitfallAnalysis: '毛坯房装修沙子水泥好几吨，大板砖长达1.5米。很多报价单只写“材料费”，不含装卸上楼费，或者遇到电梯进不去就按楼层天价收费。',
    contractClause: '【防坑条款】：合同总价已包含所有施工材料（含水泥黄沙、瓷砖、木工板材等）的运费、小区内短驳推车费、搬运上楼入户费（含无法进电梯走步梯搬运），无论楼层高低均不得向甲方收取任何搬运费用。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'grouting_service',
    category: '07 材料运输、管理费与杂费',
    name: '全屋瓷砖耐污聚脲/环氧彩砂美缝（报价常只包劣质填缝剂）',
    riskLevel: 'high',
    typicalCostMin: 1800,
    typicalCostMax: 3500,
    costNote: '约 1800 - 3500 元 (三室两厅全屋美缝)',
    contractorExcuse: '“我们报价里的勾缝是指送白水泥勾缝剂。美缝属于专业专项工程，公司不做美缝，您需要找第三方专业师傅来做。”',
    pitfallAnalysis: '白水泥勾缝不出半年就会发黄发黑、霉菌斑驳。如果要防霉耐擦洗的环氧或聚脲美缝，装修公司要么不包，要么作为昂贵增项开价4000元。',
    contractClause: '【防坑条款】：若合同包含美缝，必须注明品牌与材质（如聚脲美缝剂/环氧彩砂，保质期及质保年限），若不包含则需在预算中预留约 2000-3000 元第三方专业美缝预算。',
    isDefaultMissingInQuote: true
  },
  {
    id: 'management_fee_tax',
    category: '07 材料运输、管理费与杂费',
    name: '合同底部的隐蔽“综合管理费 (8%-12%)”与税金',
    riskLevel: 'high',
    typicalCostMin: 4000,
    typicalCostMax: 9000,
    costNote: '约 4000 - 9000 元 (按总工程款比例加收)',
    contractorExcuse: '“这7.9万只是直接工程直接费，所有装修公司都要加收8%-12%的现场综合管理费、监理费以及开票税金，这是行业行规。”',
    pitfallAnalysis: '很多装修公司在宣传和初次看报价时只提“7.9万一口价”，但等你要签约时，在报价单最后一页突然多出一行“工程管理费 8% = 6,320元”，瞬间多出大几千！',
    contractClause: '【防坑条款】：工程合同总价为涵盖设计、施工、现场监理、质量检验及税费的最终综合一口价，乙方不得在合同结算中另行加收任何百分比综合管理费或远程配合费。',
    isDefaultMissingInQuote: true
  }
];

export default function QuotationAudit() {
  // State for toggling which items are considered missing in current quote
  const [missingItemIds, setMissingItemIds] = useState<Set<string>>(() => {
    // Default to the common missing items
    return new Set(AUDIT_ITEMS.map(i => i.id));
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    '01 拆改与施工保护': true,
    '02 水电隐蔽工程 (最大增项黑洞)': true,
    '03 泥瓦贴砖工程': true,
    '04 木工与吊顶工程': false,
    '05 油漆墙面工程': false,
    '06 橱柜定制与五金门窗': false,
    '07 材料运输、管理费与杂费': false,
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Group items by category
  const categories = useMemo(() => {
    const map = new Map<string, AuditItem[]>();
    AUDIT_ITEMS.forEach(item => {
      if (!map.has(item.category)) {
        map.set(item.category, []);
      }
      map.get(item.category)!.push(item);
    });
    return Array.from(map.entries());
  }, []);

  // Calculate estimated extra cost risk
  const { totalMin, totalMax, checkedCount } = useMemo(() => {
    let min = 0;
    let max = 0;
    let count = 0;
    AUDIT_ITEMS.forEach(item => {
      if (missingItemIds.has(item.id)) {
        min += item.typicalCostMin;
        max += item.typicalCostMax;
        count++;
      }
    });
    return { totalMin: min, totalMax: max, checkedCount: count };
  }, [missingItemIds]);

  const toggleItem = (id: string) => {
    setMissingItemIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleCopyClause = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const CONTRACT_RIDERS = [
    {
      title: '黄金条款一：闭口包死与增项不超过 5% 约定',
      content: '“本工程报价为闭口包死价，包含完成设计施工图纸及约定效果所需的全部工序、主辅材与人工。除甲方书面认可的设计变更或项目增减外，施工期间总增项金额不得超过合同总造价的 5%（即不超过 4,000 元）；超出部分由乙方自行全额承担，甲方有权拒绝支付。”'
    },
    {
      title: '黄金条款二：杜绝恶意绕线与水电闭口限制',
      content: '“全屋水电隐蔽工程走线严格实行‘点对点两点一线’最短原则，严禁借口大弯横平竖直恶意绕线增加米数。最终实测实量结算总金额不得超过预估款项的 8%，超标米数及工费由乙方全额消化承担。”'
    },
    {
      title: '黄金条款三：大砖、海棠角、开孔、瓷砖胶一包到底',
      content: '“瓷砖铺贴工程已包含业主自购主流规格（含 750×1500mm 地砖、600×1200mm 墙砖）铺贴人工，包含45度海棠角倒角加工、圆弧开孔与地漏回字形裁切；必须满批使用符合国家标准的品牌 C2 级瓷砖胶与背胶，严禁另行向甲方收取大砖补贴费、加工费或辅料补差费。”'
    },
    {
      title: '黄金条款四：垃圾外运、材料搬运及打孔费用包干',
      content: '“合同总价已涵盖施工期间所有建渣装袋、搬运下楼并运出小区外运至市政消纳场的一切费用；涵盖全部材料从进场到入户（含步梯搬运与短驳搬运）的一切搬运费；涵盖油烟机、空调、热水器、排气等全屋所有设备打孔费用，绝无二次转运与打孔附加费。”'
    },
    {
      title: '黄金条款五：按工种阶段验收合格后再付款（3-3-3-1 原则）',
      content: '“工程款分期支付：① 签订合同进场开工付 30%；② 水电工程验收合格付 30%；③ 泥瓦木工工程竣工验收合格付 30%；④ 油漆工程竣工、洁具门窗安装完毕，整体验收合格且甲醛通风入住前付清剩余 10% 尾款。若上一道工序验收不合格，甲方有权暂缓支付当期款项，整改工期延误由乙方承担。”'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Overview Banner for User's Quotation */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 border-2 border-orange-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <Flame size={14} className="text-orange-600 animate-pulse" />
              <span>专项诊断报告：法兰原著 · 李老师 · 3室2厅1卫 (约7.9万报价单)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              这份 7.9 万元的整装报价单，隐藏了哪些没有考虑到的重大漏项？
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              根据你提供的“几何全案整装”报价单与常规套路分析：该报价看似涵盖了拆改、水电、瓦木油等全套基础，但把业内最容易被开工后恶意增项的 <strong>18 处隐蔽漏项</strong> 全都巧妙地移除了。如果你直接签字，开工后随时面临 <strong>1.8万 ~ 3.2万元</strong> 的被动增项！
            </p>
          </div>

          {/* Risk Metric Box */}
          <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-orange-200 shadow-sm shrink-0 flex flex-col justify-center min-w-[240px]">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>测算潜在增项风险</span>
              <span className="text-red-500 font-bold">已勾选 {checkedCount}/{AUDIT_ITEMS.length} 项</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-black text-red-600 tracking-tight">
              +¥{totalMin.toLocaleString()} ~ {totalMax.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              实际落地总造价预估：
              <span className="font-bold text-slate-800 ml-1">
                ¥{(79000 + totalMin).toLocaleString()} ~ {(79000 + totalMax).toLocaleString()}
              </span>
            </div>
            <div className="mt-3 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/60 leading-tight">
              ⚠️ 提示：点击下方条目可勾选/取消，模拟剔除或确认漏项后的真实成本。
            </div>
          </div>
        </div>
      </div>

      {/* Action Notice & How-To */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 text-red-600 shrink-0 mt-0.5">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">第一步：逐项核对报价单</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              对照下方 18 条高发漏项，在装修公司给你的纸质/电子报价单上一条条查找。只要没写“闭口包干”，默认就是后期要加钱的漏项。
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 shrink-0 mt-0.5">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">第二步：带着话术质问工长</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              在签约前把“避坑话术”抛给销售或工长，要求他们把“大砖补贴、水钻打孔、垃圾外运、水电超米封顶”当场算清并写入合同。
            </p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">第三步：补充协议白纸黑字</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              复制页面最下方的 5 条《黄金避坑补充条款》，直接作为主合同附件要求对方签字盖章。对方若不敢签，说明必有鬼！
            </p>
          </div>
        </div>
      </div>

      {/* Main Checklist Grouped by Categories */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-orange-500" size={22} />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              18 大隐蔽漏项深度排查清单 (对照报价单逐条自检)
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">点击条目右侧可折叠/展开</span>
        </div>

        {categories.map(([categoryName, items]) => {
          const isExpanded = expandedCategories[categoryName] ?? true;
          const categoryCheckedCount = items.filter(i => missingItemIds.has(i.id)).length;

          return (
            <div key={categoryName} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
              {/* Category Header */}
              <div 
                onClick={() => toggleCategory(categoryName)}
                className="w-full p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-100/60 border-b border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-800">
                    {categoryName}
                  </h4>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    共 {items.length} 项 / 疑似漏项 {categoryCheckedCount} 项
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-xs">{isExpanded ? '收起' : '展开'}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Items List */}
              {isExpanded && (
                <div className="divide-y divide-slate-100">
                  {items.map(item => {
                    const isMissing = missingItemIds.has(item.id);
                    return (
                      <div 
                        key={item.id} 
                        className={`p-4 sm:p-6 transition-colors ${
                          isMissing ? 'bg-white' : 'bg-slate-50/40 opacity-70'
                        }`}
                      >
                        {/* Title & Risk Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                          <div className="flex items-start sm:items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => toggleItem(item.id)}
                              className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 sm:mt-0 transition-colors shrink-0 ${
                                isMissing 
                                  ? 'bg-red-500 border-red-500 text-white' 
                                  : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                              }`}
                              title={isMissing ? "标记为已包含（无此增项）" : "标记为漏项（有增项风险）"}
                            >
                              <CheckCircle2 size={14} className={isMissing ? "opacity-100" : "opacity-0"} />
                            </button>
                            <h5 className="text-sm sm:text-base font-bold text-slate-800">
                              {item.name}
                            </h5>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.riskLevel === 'extreme' && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700 flex items-center gap-1">
                                <AlertTriangle size={12} /> 极高危增项
                              </span>
                            )}
                            {item.riskLevel === 'high' && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-700 flex items-center gap-1">
                                <AlertTriangle size={12} /> 高危漏项
                              </span>
                            )}
                            {item.riskLevel === 'medium' && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1">
                                <Info size={12} /> 隐形套路
                              </span>
                            )}
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                              增项金额：{item.costNote}
                            </span>
                          </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 text-xs sm:text-sm">
                          {/* Left: Routine & Trap */}
                          <div className="space-y-2 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                            <div>
                              <span className="font-bold text-slate-700 flex items-center gap-1 text-xs">
                                💬 装修公司惯用套路与借口：
                              </span>
                              <p className="text-slate-600 italic mt-1 leading-relaxed">
                                {item.contractorExcuse}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-slate-200/60">
                              <span className="font-bold text-amber-700 text-xs">
                                🔍 避坑分析（为什么报价单不写）：
                              </span>
                              <p className="text-slate-600 mt-0.5 leading-relaxed">
                                {item.pitfallAnalysis}
                              </p>
                            </div>
                          </div>

                          {/* Right: How to negotiate & clause */}
                          <div className="flex flex-col justify-between p-3 sm:p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-bold text-emerald-800 text-xs flex items-center gap-1">
                                  <ShieldCheck size={14} className="text-emerald-600" /> 必写进合同的避坑锁死条款：
                                </span>
                                <button
                                  onClick={() => handleCopyClause(item.contractClause, item.id)}
                                  className="text-[11px] text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100/70 hover:bg-emerald-200/70 transition-colors"
                                >
                                  <Copy size={12} />
                                  <span>{copiedKey === item.id ? '已复制' : '复制条款'}</span>
                                </button>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-mono text-[11px] sm:text-xs bg-white/80 p-2.5 rounded-lg border border-emerald-200/50">
                                {item.contractClause}
                              </p>
                            </div>
                            <div className="mt-2 text-[11px] text-emerald-700 flex items-center gap-1">
                              <span>💡 实操策略：要求工长把此条直接手写在报价单对应栏或合同补充页上！</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contract Riders Section (Ready to copy) */}
      <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>法律效力保障 · 签字前必须盖章</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
              装修合同避坑《5大黄金补充条款》（一键复制带走）
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              装修公司的格式合同全是保护他们自己的。在签字付定金前，打印或手写以下 5 条作为《附件补充协议》，让对方法人代表签字盖公章：
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {CONTRACT_RIDERS.map((rider, index) => (
            <div key={index} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
                  <span>{rider.title}</span>
                </h4>
                <button
                  onClick={() => handleCopyClause(rider.content, `rider-${index}`)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Copy size={13} />
                  <span>{copiedKey === `rider-${index}` ? '复制成功！' : '复制此条款'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {rider.content}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
          <div>
            <strong>警惕逃避行为：</strong> 如果装修公司经理或工长说：“李老师放心，我们都是大公司/熟人，这些都是小事，口头答应你没问题的，合同就不用加了”，<strong>切记：千万别信！</strong> 只要不敢白纸黑字写进补充协议的承诺，开工后 100% 会反悔！
          </div>
        </div>
      </div>
    </div>
  );
}
