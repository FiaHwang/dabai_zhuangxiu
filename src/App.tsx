import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, Droplets, Zap, PaintRoller, Grid, Wrench, 
  Sofa, Lightbulb, Image as ImageIcon, Leaf, Palette, 
  CheckCircle2, Info, ChevronRight,
  X, Clock, DollarSign, AlertCircle, ThumbsUp,
  PencilRuler, Package, Tv, ShieldCheck, Tag, Star, ShoppingBag, Store
} from 'lucide-react';
import QuotationAudit from './components/QuotationAudit';

export interface StepDetail {
  precautions: string[];
  suggestions: string[];
  estimatedCost: string;
  timeline: string;
  brandAdvice?: {
    focus: string[];
    ignore: string[];
  };
  modelRecommendations?: string[];
  purchaseAdvice?: {
    online: string[];
    offline: string[];
  };
}

export interface StepItem {
  id: string;
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  description: string;
  tips: string[];
  details: StepDetail;
}

// --- Data ---
const HARD_STEPS: StepItem[] = [
  {
    id: 'design',
    title: '前期设计与平面布置图',
    subtitle: '装修的灵魂与蓝图 · 户型规划全指南',
    icon: PencilRuler,
    description: '平面布置图是装修的第一步，也是决定未来10年居住舒适度的核心！它决定了墙体拆改、动线规划、家具尺寸、全屋收纳以及水电点位。',
    tips: [
      '一定要实地精准量房（含梁高、窗高、下水管位置），切勿直接拿开发商彩页户型图画！',
      '【报价单避坑】平面图与施工图定稿前严禁签施工合同！必须约定“闭口包死价，非业主主动变更总增项不得超过总造价5%”！',
      '动线优先原则：先定动线（回家/家务/做饭/访客动线），再定家具尺寸，最后定细节。',
      '承重墙、剪力墙、配重墙在图纸上必须加粗标黑，严禁任何破坏！'
    ],
    details: {
      precautions: [
        '【报价单避坑·闭口包死与增项上限】装修公司出完平面图后给出的报价单，必须附带全套施工图。合同必须白纸黑字注明：“本工程为闭口包死总价，施工期间非业主书面认可的设计变更，总增项金额不得超过合同总造价的 5%（超出部分由乙方自行承担，甲方有权拒付）”。坚决杜绝低价诱导签约、开工坐地起价。',
        '【量房切忌偷懒】：必须测出净层高、梁下高、窗台高、窗宽、门洞宽、强弱电箱位置、排污管/地漏中心距墙尺寸、暖气燃气管走向。',
        '【严禁拆动结构安全墙】：开发商黑体实心承重墙、阳台配重矮墙、连体剪力墙绝对不能拆改，开槽不得横向切断钢筋。',
        '【人体工学与通道间距】：主通道预留≥90-100cm，次通道≥60-70cm；床边走道≥60cm；餐桌拉开椅子后通道≥80cm；沙发与茶几≥40cm。',
        '【警惕“纯免费出图”套路】：装修公司“免设计费”多数是套模板、把图画得满满当当引导你多做吊顶、多打柜子以增加增项。',
        '【一定要出全套图纸】：不仅要平面布置图，还必须有：原始测量图、拆改墙体图、天花吊顶图、强弱电插座开关图、给排水点位图、立面节点图。'
      ],
      suggestions: [
        '【出平面布置图的标准流程（5步法）】：\n① 精准量房画出原始结构图（含承重墙、柱、梁、管线位）；\n② 梳理全家居住需求清单（常住几人、是否需要独立书房、大容量鞋柜、双开门冰箱、干湿分离等）；\n③ 空间功能划分与动线梳理（玄关-餐厨-客厅-卫浴-卧室，减少交叉折返）；\n④ 墙体合理拆改与格局优化（如打通非承重阳台、移门半开放厨房、卫生间干区外置）；\n⑤ 尺寸放样与家具家电布局（严格按真实尺寸绘制，切忌缩小家具比例显大）。',
        '【小白自己出图的高效软件推荐】：\n• 酷家乐 / 三维家：浏览器打开，搜索同楼盘一键导入户型，3D/2D自由拖拽家具，自动出俯视图；\n• 知户型 APP：配合红外测距仪蓝牙连接，边量房边自动出框图；\n• SketchUp（草图大师）/ AutoCAD：专业建模与施工图标准。',
        '【找设计师的避坑建议】：\n• 预算充裕（80-300元/㎡）：找独立设计工作室，纯出方案和全套施工图，不绑定施工，方案更客观；\n• 预算紧凑：网购独立画图（按模板细致量好后出图，性价比极高）；\n• 找装修公司：要求提供不少于2-3套平面优化方案，重点考察收纳容量和动线流畅度。'
      ],
      brandAdvice: {
        focus: ['独立设计工作室 / 资深独立设计师', '口碑好的本地纯设计机构', '支持现场量房和施工交底的设计团队'],
        ignore: ['“0元免费出全套图”的推销型装修公司（往往靠工程增项或死板模板图）']
      },
      modelRecommendations: [
        '【画图软件】酷家乐 (网页版/APP，搜户型库即有模型，小白半小时上手)',
        '【手机快速量房】知户型 APP (搭配红外测距仪，蓝牙连接自动出框图)',
        '【专业3D建模】SketchUp (草图大师，空间体块感好)',
        '【专业施工制图】AutoCAD 2024 / 天正建筑 (施工图通用格式DWG)'
      ],
      purchaseAdvice: {
        online: [
          '激光红外测距仪（自己量房神器，博世BOSCH、得力DELI，几十到一百多元）',
          '独立设计师/绘图师线上出图服务（按平米收费，性价比极高，适合有清晰需求的屋主）'
        ],
        offline: [
          '本地独立设计师（推荐本地可上门量房、跑工地指导交底的团队）',
          '物业工程部（开工前去调取房屋原始结构建筑图纸，准确核实承重墙与梁柱走向）'
        ]
      },
      estimatedCost: '自己动手免费；网购线上出图 500-2000元/全套；独立设计师 80-300元/平米',
      timeline: '1-3周（需经过需求沟通、现场复尺、2-3轮方案推敲修改与定稿）'
    }
  },
  {
    id: 'demolition',
    title: '主体拆改',
    subtitle: '重塑空间格局',
    icon: Hammer,
    description: '根据设计图纸进行砸墙、砌墙、铲墙皮、拆暖气、换塑钢窗等，是装修的第一个实质性阶段。',
    tips: [
      '承重墙、配重墙绝对不能动！',
      '【报价单避坑】合同必须写明“垃圾外运出小区至消纳场包干”，谨防只包倒在小区垃圾堆、外运车单收上千元！',
      '【报价单避坑】毛坯房阳台及内墙保温层铲除+挂网抹灰找平，签约前必须明确已含在内，防开工后按平米要挟加价。',
      '注意保护下水管道，防止建筑垃圾掉入造成堵塞。'
    ],
    details: {
      precautions: [
        '【报价单避坑·垃圾清运外运】90%报价单玩文字游戏只写“运至小区垃圾池”，绝不包含运出小区的消纳车外运费（800-1500元/车）。合同必须注明：“包含拆改及施工产生的所有建筑垃圾装袋、下楼并清运出小区外运至市政指定消纳场，无任何二次短驳与外运清运费”。',
        '【报价单避坑·保温层与空鼓铲除】毛坯房阳台、外墙内侧常有泡沫/珍珠岩保温层，不铲除直接贴砖必脱落、刮腻子必开裂。工长开工后常加收35-50元/㎡（全屋增项1500-3000元）。签约前测量并写明：“阳台及全屋所有内保温层、空鼓层铲除及重新挂钢丝网抹灰找平已含在报价内，不加收增项”。',
        '【报价单避坑·物业成品保护】物业要求的电梯轿厢木板包覆、楼道全覆地膜及入户防盗门双面防撞保护，必须由施工方包干承担，避免被物业停水停电或扣押金。',
        '严禁拆除承重墙、剪力墙、配重墙（压着挑梁绝对不能砸）。',
        '旧房改造需注意老化水管和电线的安全拆除，务必关闭总阀。'
      ],
      suggestions: [
        '提前规划好空间布局，避免后期反复拆改增加人工费用。',
        '保留有用的旧物（如质量尚可的入户防盗门），可包边翻新再利用。',
        '新砌墙体必须植筋（间距约50cm植入拉结钢筋），顶部做斜砌蜈蚣脚防下沉开裂。'
      ],
      brandAdvice: {
        focus: [],
        ignore: ['拆旧工具', '辅料（主要看工人手艺和责任心，无需品牌）']
      },
      purchaseAdvice: {
        online: [],
        offline: ['拆旧工人/团队（本地找，方便沟通、看现场和清运垃圾）']
      },
      estimatedCost: '50-150元/平米（视拆除量和当地人工费而定；注意核实是否含垃圾外运费）',
      timeline: '3-7天'
    }
  },
  {
    id: 'hydropower',
    title: '水电改造',
    subtitle: '隐蔽工程重中之重 · 增项第一黑洞',
    icon: Zap,
    description: '确定开关、插座、灯具、水盆、浴缸、洗衣机等确切位置，进行开槽布线布管。这是所有装修公司最易恶意增项的环节。',
    tips: [
      '【报价单避坑】坚决杜绝“按实结算无封顶”！必须约定点对点最短走线，结算总额浮动不得超过预收的8%或一口价包死！',
      '【报价单避坑】全屋空调、油烟机、热水器水钻打孔费必须写明“全包干”，防开工后按50-100元/孔单收上千元！',
      '水管走顶不走地，强弱电交叉处必须包锡箔纸屏蔽防干扰。',
      '插座宁多勿少，底盒必须预留零线方便升级智能家居。'
    ],
    details: {
      precautions: [
        '【报价单避坑·杜绝恶意绕线超米】报价单写“水电预估3500元按实结算”，开工后工长故意做大弧弯绕大圈排线，结算暴涨到近万元！合同必须明确：“全屋水电布线坚持两点一线最短点对点走线，严禁恶意绕线；最终实测实量总金额浮动不得超过预估额的8%（或闭口包干），超标米数由乙方全额承担”。',
        '【报价单避坑·全屋设备打孔费】3室2厅至少需要：空调孔3-4个、油烟机孔1个、燃气热水器排烟孔1个、浴霸排气孔1个，共计6~8个孔。钢筋混凝土梁水钻开孔每个50-100元。合同必须写明：“包含全屋所有设备墙体及钢筋混凝土梁水钻开孔，无任何单孔附加费”。',
        '【报价单避坑·强弱电箱与漏保空开】原开发商配电箱回路少且质量一般，蒸烤箱/洗烘套装/空调需要独立回路专线漏保。签约前必须明确是利旧还是换新，指定施耐德/正泰品牌空开，避免后期高价增项。',
        '【报价单避坑·下水管隔音棉】主排污立管及支管必须明确：“阻尼减震片+≥20mm加厚高密度吸音棉双层满包扎带固定，费用包含在包立管工序内”，防后期工人现场加收200-300元/根。',
        '水管走顶不走地，电线走墙不走地（条件允许下）。',
        '强弱电管间距需保持30cm以上，交叉处必须用锡箔纸屏蔽防干扰。',
        '卫生间洗手台建议墙排水，下方预留地漏防反水。'
      ],
      suggestions: [
        '厨房、客厅多留插座且带开关；卧室必须双控开关。',
        '阳台记得预留进出水管与电源（给烘干机/智能晾衣架）。',
        '所有开关底盒内务必留零线，方便后续加装智能开关。'
      ],
      brandAdvice: {
        focus: ['强弱电线（如熊猫、起帆、远东、金龙羽）', 'PPR水管（如伟星、日丰、保利）', '强弱电箱（如施耐德、西门子、正泰）'],
        ignore: ['PVC穿线管、底盒（符合国标阻燃即可，无需追求昂贵大牌）']
      },
      purchaseAdvice: {
        online: ['开关插座（网购大牌旗舰店，保真且常有活动）', '前置过滤器', '强弱电箱', '防臭地漏（如潜水艇，泥瓦进场前必须备好）'],
        offline: ['水管、电线、穿线管（通常由施工方提供或本地建材市场购买，方便按需补退货）']
      },
      estimatedCost: '80-150元/平米（按实际走线长度或建筑面积计算）',
      timeline: '5-10天'
    }
  },
  {
    id: 'waterproof',
    title: '防水工程',
    subtitle: '滴水不漏的保障 · 严防高度缩水',
    icon: Droplets,
    description: '卫生间、厨房、阳台的地面和墙面涂刷防水涂料，防止漏水渗水到楼下或隔壁。',
    tips: [
      '【报价单避坑】淋浴区防水必须刷满高（≥1.8~2.0米到顶），严防报价单默认只刷1.5米开工后加钱！',
      '防水干透后必须做48小时闭水试验，必须亲自去楼下邻居家天花板确认无渗漏。',
      '【报价单避坑】闭水试验合格后必须做水泥砂浆保护层，防止瓦工进场踩破防水层。'
    ],
    details: {
      precautions: [
        '【报价单避坑·防水高度刷到顶】低价报价单常在防水高度偷工减料，淋浴区只写刷1.5米甚至1.2米。合同必须明确：“卫生间淋浴区墙面防水必须刷至封顶高度（≥2.0米），地面全做防水且返墙≥30cm，做满48小时闭水试验，绝不加收加高材料费”。',
        '【报价单避坑·闭水试验与保护层】合同需注明“包含48小时闭水试验及贴砖前水泥砂浆保护层”，防止瓦工施工时工具沙石踩破防水涂层导致后期漏水渗水。',
        '卫生间地面必须全防水，门口贴砖前务必刷一遍堵漏王做防水坝防渗水。',
        '阴阳角、管根等容易漏水部位需做成圆弧形倒角并加刷聚酯无纺布加强层。'
      ],
      suggestions: [
        '干湿分离卫生间，干区墙面防水也建议做到1.2米。',
        '厨房和阳台虽然漏水风险较小，但也建议做地面防水和30cm墙面反高。',
        '选择柔性防水涂料用于墙面，刚性/高聚物防水涂料用于地面。'
      ],
      brandAdvice: {
        focus: ['防水涂料（如东方雨虹、德高、科顺，关乎防漏和全屋安全）'],
        ignore: ['涂刷滚筒、毛刷等消耗工具']
      },
      purchaseAdvice: {
        online: [],
        offline: ['防水涂料（重量大，网购运费高且易破损，本地专卖店购买方便补货且能验真伪）']
      },
      estimatedCost: '40-80元/平米（确保合同约定淋浴区刷到顶包干）',
      timeline: '3-5天'
    }
  },
  {
    id: 'masonry',
    title: '泥瓦工程',
    subtitle: '面子工程的开始 · 规格与加工避坑核心',
    icon: Grid,
    description: '包含地面找平、铺贴墙砖地砖、过门石、窗台石的安装以及地漏安装。这是决定全屋质感且工艺增项极多的关键一步。',
    tips: [
      '【报价单避坑】签约前锁定750×1500地砖/600×1200墙砖规格人工包干，严禁开工后加收30-60元/㎡“大砖补贴费”！',
      '【报价单避坑】45度海棠角倒角加工、水管圆孔、地漏回字形切割，合同必须明确已含在贴砖单价中，不另收工厂加工费！',
      '【报价单避坑】低吸水全瓷砖上墙必须满批品牌C2级瓷砖胶及背胶，合同必须包含材料费，防只写水泥黄沙后期逼加钱！',
      '认准广东佛山砖，看包装箱厂址防贴牌，吸水率必须<0.5%。'
    ],
    details: {
      precautions: [
        '【报价单避坑·大砖铺贴附加费】报价单人工默认针对 800×800 或 300×600 老规格砖。若选主流 750×1500 地砖或 600×1200 墙砖，开工后工长常借口“双人大板施工”加收 30-60元/㎡（全屋增项 2500-4500元）。合同必须明确：“铺贴人工费为一口价综合包干，不收取大砖超标附加费”。',
        '【报价单避坑·海棠角与圆孔加工费】阳角海棠角碰角一米收 15-25 元，开水管圆孔收 15元/个，全屋加工费随随便便破千。合同必须注明：“全屋瓷砖45度海棠角倒角、异形裁切、管道精准开孔、地漏回字形坡度切割已全额包含在贴砖单价内，不得另计加工费与加工运费”。',
        '【报价单避坑·全瓷专用C2瓷砖胶】全瓷砖吸水率极低，单用水泥砂浆必空鼓掉砖。低价报价单只写“水泥黄沙”，瓦工进场后逼你花几千块买瓷砖胶。合同必须明确：“墙地砖铺贴辅料必须全额包含品牌 C2 级强效瓷砖胶（如德高/雨虹）及配套界面背胶”。',
        '【报价单避坑·地面找平厚度超标】找平常写“限厚≤20mm超厚每公分加收20元”。合同必须约定：“地面找平以达到平整度验收标准（2米靠尺误差≤3mm）为准一口价包干，不因原始地面落差加收超厚找平费”。',
        '【排水坡度】卫生间地砖必须外高里低，下水坡度至少2厘米，绝不能积水。',
        '【淋浴区】淋浴区做下沉式或隐形坡度，放弃传统笨重的大理石挡水条。'
      ],
      suggestions: [
        '【产地与材质】认准广东砖（800x800规格约70-80元/块），吸水率必须<0.5%，重产地轻品牌溢价。',
        '【亮光 vs 柔光】采光差选亮光砖（好打理）；追求质感选柔光砖（纯色暖色），慎用粗糙哑光砖（极难打理）。卫生间地面必选防滑柔光砖。',
        '【尺寸建议】客餐厅：主流750*1500mm（显大气）或800*800mm（性价比高）；厨卫墙砖400*800mm；厨卫地砖300*300mm（便于找坡）。',
        '【颜色搭配】客餐厅首选浅灰、米黄、奶油色。厨卫尽量浅色系，强烈建议避开深灰色或黑色地砖（水垢极显脏）。',
        '【通铺建议】全屋通铺（不加过门石）视觉更延伸，但对师傅手艺要求高，损耗率约增加5%-10%。'
      ],
      brandAdvice: {
        focus: ['瓷砖胶/背胶（如德高、雨虹、百得）', '地漏（如潜水艇，防臭防虫最关键）', '美缝剂（如卓高、立邦，选聚脲材质防黄变）'],
        ignore: ['瓷砖（认准“广东佛山”产区优等品即可，没必要溢价买天价一线）', '水泥黄沙（正规建材市场合格品即可）']
      },
      purchaseAdvice: {
        online: ['地漏（网购大牌旗舰店，款式齐全）', '美缝剂（网购颜色全，可先寄色卡对比）'],
        offline: ['瓷砖（重且易碎，退换货运费昂贵，必须线下看实物并核查产地）', '窗台石/过门石（需现场测量加工）', '水泥黄沙']
      },
      estimatedCost: '人工费50-120元/平米，材料费视瓷砖档次而定',
      timeline: '10-20天'
    }
  },
  {
    id: 'carpentry',
    title: '木工工程',
    subtitle: '定制你的专属收纳与空间层次 · 吊顶避坑',
    icon: Wrench,
    description: '包含吊顶造型、石膏线、窗帘盒、定制柜体打底、背景墙制作等。',
    tips: [
      '【报价单避坑】客餐厅及卧室窗帘盒必须明确合并在吊顶总价中，严防开工后按延米单收100-150元/米！',
      '【报价单避坑】做无主灯吊顶必须写明包含所有筒灯/射灯/磁吸轨道开孔与开槽加固，不单独按孔计费！',
      '吊顶转角必做“L”型整板防开裂，必须使用轻钢龙骨（防火防潮防变形）。',
      '柜体板材认准ENF级环保标准，胶水认准MDI无醛胶，五金铰链带液压阻尼缓冲。'
    ],
    details: {
      precautions: [
        '【报价单避坑·隐藏式窗帘盒包干】报价单常只算直线吊顶，把窗帘盒单列按延米收费（100-150元/米，全屋增项800-1800元）。合同必须写明：“客餐厅及所有卧室窗帘盒（含双轨/电动窗帘滑轨预留槽与欧松板加固打底）已包含在吊顶总价中，不按延米额外计费”。',
        '【报价单避坑·无主灯开孔开槽费】做无主灯全屋要开20-40个射灯孔，如果报价单未写，木工开一个孔收15-25元，磁吸轨道预埋开槽每米加收50元。合同必须约定：“天花吊顶包含全屋所有筒灯、射灯、磁吸轨道灯的现场精准开孔与龙骨加固，不单独按孔或按米计费”。',
        '【板材环保】ENF级颗粒板/多层板 > E0级。胶水优先选MDI无醛胶，杜绝劣质脲醛胶。密度板甲醛大，柜体坚决不用。',
        '【封边工艺】柜门首选PUR或激光封边，平整无溢胶痕迹。',
        '【吊顶工艺】必须使用轻钢龙骨，转角处用整块石膏板裁成“L”型整板，嵌缝用嵌缝石膏+防裂网带。',
        '【防潮处理】靠近卫浴、厨房的木作（如衣柜背板、门套打底）背部必须加贴防潮膜或预留1-2cm防潮缝。'
      ],
      suggestions: [
        '【衣柜布局】多挂衣区（短衣>90cm，长衣>130cm），少叠衣区，深度55-60cm。做到顶，上方不落灰。',
        '【柜门设计】柜门做免拉手或极简小拉手，视觉整洁。挂衣杆选铝合金，五金铰链必须带液压阻尼缓冲。',
        '【全屋收纳】玄关鞋柜底部悬空15-20cm放常穿拖鞋，内嵌感应灯带。',
        '【窗帘盒尺寸】单轨宽15cm，双轨宽20-22cm，高15-18cm，内部预留电动窗帘220V电源插座。'
      ],
      brandAdvice: {
        focus: ['柜体板材（如万华禾香板、爱格板、克诺斯邦，认准ENF级）', '五金铰链/滑轨（如百隆Blum、海蒂诗Hettich、DTC东泰）', '白乳胶/发泡胶（环保重点）'],
        ignore: ['石膏板、轻钢龙骨（选国标大厂如龙牌、泰山即可，无需进口大牌）']
      },
      purchaseAdvice: {
        online: ['五金件（百隆、海蒂诗铰链网购更便宜，可自购让师傅装）'],
        offline: ['全屋定制柜（需多次上门复尺、设计、安装与售后，强烈建议本地门店）', '石膏板/轻钢龙骨（本地建材市场送货）']
      },
      estimatedCost: '吊顶100-200元/平米（确认含窗帘盒与开孔），定制柜800-2000元/投影平米',
      timeline: '7-15天'
    }
  },
  {
    id: 'painting',
    title: '油漆工程',
    subtitle: '给家穿上新衣 · 铲墙皮与找平避坑',
    icon: PaintRoller,
    description: '墙面基层处理、刮腻子、打磨、刷底漆和面漆。',
    tips: [
      '【报价单避坑】必须写明“全屋原开发商劣质大白腻子铲除至抹灰层并滚涂墙锢一道包干”，防开工后要挟加收全屋3000-4500元！',
      '【报价单避坑】定制衣柜与门套靠墙处垂直度误差≤2mm必须含在找平中，严禁开工后借口“冲筋垂平”加收30-50元/㎡！',
      '【报价单避坑】乳胶漆包含免费电脑调色（至少3个色号）与分色施工，不加收调色与人工费。',
      '乳胶漆必须一底两面，耐水腻子刮2-3遍且干透才能打磨，强光灯侧照验收波浪纹。'
    ],
    details: {
      precautions: [
        '【报价单避坑·铲原房大白腻子】开发商原墙面素灰腻子遇水即化，不铲直接刷漆后期整面墙起皮脱落。90%报价单故意不写铲墙皮，拆改完工长以“不铲不保修”要挟按展开面积加收15元/㎡（全屋3000-4500元）。合同必须明确：“包含全屋原始墙顶面劣质腻子层彻底铲除至抹灰基层，并全屋滚涂品牌防潮界面剂（墙锢）一道”。',
        '【报价单避坑·定制衣柜处冲筋垂平】普通顺平会导致通顶大衣柜和极简门套侧面露出1-2cm大三角缝。如果现场要求做垂平，工长当场要价30-50元/㎡。合同必须写明：“全屋定制衣柜靠墙处、室内门套线处墙面必须达到垂直度验收标准（2米靠尺误差≤2mm），包含在油漆找平施工中，严禁借口冲筋垂平额外收费”。',
        '【报价单避坑·乳胶漆电脑调色分色】合同明确：“包含全屋乳胶漆原厂电脑调色（提供不少于3个色号）及卧室单面背景墙分色滚涂施工，不加收调色费与分色人工费”。',
        '乳胶漆必须一底两面（一遍底漆两遍面漆），底漆抗碱防霉绝不可省。',
        '墙面开槽处或石膏板拼缝处必须贴嵌缝网格布防裂。',
        '耐水腻子刮2-3遍，每遍完全干透后再刮下一遍。',
        '打磨腻子时需用强光灯侧照打磨，确保墙面绝对平整无波浪纹。'
      ],
      suggestions: [
        '品牌认准立邦、多乐士、三棵树、佐敦、都芳，优选中高端环保系列。',
        '认准环保认证（十环认证、法国A+、美国绿色卫士），VOC指标越低越好。',
        '调色漆建议电脑原厂调色，手工调色难以还原且后期补漆会有明显色差。',
        '刷漆时做好地面、开关盒及门窗套的成品保护。'
      ],
      brandAdvice: {
        focus: ['乳胶漆面漆与底漆（认准十环认证或法国A+）'],
        ignore: ['腻子粉（选大厂成品耐水腻子如美巢即可）', '滚筒刷具']
      },
      purchaseAdvice: {
        online: ['乳胶漆（官方旗舰店大促时划算，但需确认是否包电脑调色）'],
        offline: ['腻子粉/轻质石膏（重量大，本地购买送货）', '乳胶漆调色（线下专卖店电脑调色直观，补漆方便）']
      },
      estimatedCost: '人工+材料 30-80元/平米（确认已含铲墙皮与墙锢费用）',
      timeline: '10-15天'
    }
  },
  {
    id: 'installation',
    title: '成品安装',
    subtitle: '硬装的最后拼图 · 橱柜五金避坑',
    icon: Package,
    description: '包含厨卫吊顶、橱柜及案台、室内门、地板、卫浴洁具、开关插座面板等的安装。',
    tips: [
      '【报价单避坑】橱柜签约前按厨房实际复尺米数一口价包干（防套餐仅含3米地柜、超米单价暴涨）！免费含台下盆工艺！',
      '【报价单避坑】室内木门必须注明包含品牌静音磁吸锁、加厚不锈钢轴承合页3只/樘及门吸，防只配劣质铁锁或后期收费！',
      '【报价单避坑】合同必须注明全屋主辅材搬运上楼入户（含无法进电梯走步梯搬运）无二次收费；核实是否包含防霉聚脲美缝。',
      '安装顺序：厨卫吊顶 → 橱柜 → 室内木门 → 踢脚线/地板。马桶严禁用纯水泥封底，必须用防霉中性玻璃胶。'
    ],
    details: {
      precautions: [
        '【报价单避坑·橱柜超米与台下盆加工】整装套餐通常只送3米地柜+1米吊柜，正常3室厨房地柜需3.8-4.5米，超出的延米地柜按900-1400元/米补差价；做大单槽台下盆加收200-300元加工费。合同必须明确：“根据现场复尺图纸，按厨房完整定制一口价包干；免费提供水槽台下盆开孔、打磨及下挂承重加固安装服务”。',
        '【报价单避坑·室内门全套五金】很多报价单只写含木门门扇门套，不包含锁具五金或配廉价薄铁锁。合同必须注明：“室内所有木门均包含全套优质五金（品牌静音磁吸门锁、加厚不锈钢轴承子母合页3只/樘、地吸/墙吸），包干不另收费”。',
        '【报价单避坑·材料步梯搬运与短驳费】大板砖（如750×1500）进不去电梯走楼梯按层按片收费；水泥货车进不去地库收短驳推车费。合同必须注明：“合同总价已包含所有施工材料运费、小区内短驳费、搬运上楼入户费（含步梯搬运），无论楼层高低均不得另收搬运费”。',
        '【报价单避坑·全屋瓷砖防霉美缝】报价单写的“勾缝”是指送廉价白水泥填缝剂（半年发霉发黑）。若合同包含美缝，必须注明品牌与材质（如聚脲美缝剂/环氧彩砂）；若不包含需预留1800-3500元找第三方美缝。',
        '【木门选购】选免漆门（环保耐刮，1200元左右）或实木复合门，厚度≥4.5cm，配磁吸静音锁和304不锈钢厚合页。',
        '【厨卫移门】卫生间选双层超白长虹/油砂玻璃门；厨房选极窄边框地轨移门。',
        '【烟道止逆阀】厨房吊顶前务必安装优质烟道止逆阀并打胶密封，防止楼下油烟倒灌。'
      ],
      suggestions: [
        '橱柜案台首选石英石（厚度≥1.5cm，石英含量>90%），大单槽+台下盆+抽拉水龙头最顺手。',
        '卫浴洁具：马桶选大管道虹吸式，洗漱台选陶瓷一体盆无死角。',
        '开关插座水平对齐，大功率电器（空调、热水器）必须配16A专用插座。',
        '安装大件物品时地上铺设瓦楞纸或地膜防刮伤。'
      ],
      brandAdvice: {
        focus: ['卫浴洁具（TOTO、科勒、恒洁、箭牌）', '开关插座面板（施耐德、西门子、公牛、罗格朗）', '角阀/软管（潜水艇，防爆防漏）'],
        ignore: ['室内门品牌（看门芯材质与工艺即可，不必盲目追大牌）', '踢脚线']
      },
      purchaseAdvice: {
        online: ['花洒/水龙头/毛巾架', '指纹锁（网购包上门安装）', '烟道止逆阀', '防霉玻璃胶（如瓦克、百得）', '浴霸灯'],
        offline: ['室内木门/踢脚线（定制属性强，线下包测量和安装）', '橱柜/石英石台面', '铝扣板吊顶']
      },
      estimatedCost: '包含在购买产品费用中，部分按项另计安装费',
      timeline: '1-2周'
    }
  }
];

const SOFT_STEPS: StepItem[] = [
  {
    id: 'furniture',
    title: '家具进场',
    subtitle: '空间的主角',
    icon: Sofa,
    description: '沙发、床、餐桌椅、茶几、成品电视柜、化妆台、书桌等大件家具的选购与摆放。',
    tips: [
      '买家具前务必复尺，确认电梯、楼道和入户门能否顺利搬入。',
      '注意家具尺寸与空间动线关系，过道预留60-90cm。',
      '颜色遵循“墙浅地中家具深”或自然低饱和同色系。'
    ],
    details: {
      precautions: [
        '【床架选购】排骨架选松木或榉木，间隙<5cm。床底悬空≥12cm方便扫地机器人进出。',
        '【床垫选购】“重床垫轻床架”，老人小孩选护脊硬垫，年轻人选独立袋装弹簧+乳胶/记忆棉。',
        '【沙发选购】直排沙发最实用好布局。布艺选高克重棉麻/猫抓布（高回弹海绵密度>45D）。',
        '【岩板餐桌】岩板厚度≥12mm，底部必须有实木或多层板复合衬板，防止磕碰断裂。'
      ],
      suggestions: [
        '小户型多选细腿、悬空或通透材质家具，视觉轻盈显大。',
        '电视柜优先选落地柜，便于隐藏插座且不藏灰。',
        '儿童书桌椅建议选择人体工学升降款，适应身高变化。'
      ],
      brandAdvice: {
        focus: ['床垫（如金可儿、丝涟、喜临门、雅兰，直接决定睡眠健康）', '人体工学椅（如保友、西昊、永艺）'],
        ignore: ['沙发、茶几、餐桌椅、床架（重材质做工，源头工厂或家具城性价比极高，无需高额品牌溢价）']
      },
      purchaseAdvice: {
        online: ['餐桌椅（江西南康实木/广东佛山岩板）', '小件茶几/边几', '床架', '人体工学椅'],
        offline: ['沙发（线下必须试坐软硬度、腰背支撑和坐深）', '床垫（必须亲自躺下测试仰卧与侧卧贴合度）']
      },
      modelRecommendations: [
        '【床垫】喜临门（白骑士/光年系列，性价比爆款）、金可儿（繁星A/B）、雅兰（深睡尊享）',
        '【沙发】顾家家居（经典布艺/真皮）、芝华仕（头等舱电动功能沙发）、左右沙发',
        '【实木家具】源氏木语（纯橡木/樱桃木，网购成熟）、原始原素',
        '【工学椅】保友（金豪B）、西昊（C300）、永艺（撑腰椅）'
      ],
      estimatedCost: '2万-8万元（视品牌与材质）',
      timeline: '硬装结束后1-2周'
    }
  },
  {
    id: 'appliances',
    title: '家电进场',
    subtitle: '赋予家现代科技感',
    icon: Tv,
    description: '电视、冰箱、洗衣机、空调、热水器、洗碗机、烘干机等家用电器的送货与安装。',
    tips: [
      '嵌入式家电（冰箱、洗碗机）必须在定制橱柜前敲定型号和预留散热尺寸。',
      '大功率电器（空调、热水器）必须使用专线。',
      '送货时必须当面开箱通电验机，确认无磕碰再签收。'
    ],
    details: {
      precautions: [
        '【烟机 vs 集成灶怎么选】\n• 选集成灶：开放式厨房、高频爆炒重油烟、厨房面积小（<5㎡）想多留吊柜收纳空间；必须注意：排烟管走地柜下排，水电阶段必须在地面上方20-30cm公共烟道开孔，且会切断地柜，下方无法安装独立洗碗机；后期换机受限于橱柜开孔尺寸。\n• 选传统分体/集成烹饪中心：喜欢台面整体性强、地柜想装大容量洗碗机或大抽屉、或者公共烟道开孔在顶部的；坏哪换哪互不影响，维护成本低。',
        '【微蒸烤一体机避坑】① 选“直喷式双孔/多孔蒸汽”，坚决不买底部蒸发盘式（易积水垢串味）；② 选上下独立控温管+背部热风（真风炉配置）；③ 选多档变频微波（≥900W）；④ 内胆优选陶瓷涂层或优质搪瓷（好擦洗不发黄）；⑤ 外置电动水箱（中途加水不泄温）。容量推荐≥50L大容量。',
        '【燃气灶选购要点】① 火力选 5.0kW~5.2kW（家用猛火爆炒黄金区间）；② 认准新一级能效（热效率≥63%-68%）；③ 选全铜/黄铜分火器（耐高温不变形，杜绝铝合金）；④ 选可调节底盘（换灶免切橱柜开孔）；⑤ 带0秒延时脉冲点火与热电偶熄火保护；预算充裕建议选带防干烧和定时关火。',
        '【冰箱】首选十字对开门或法式多门，双循环双系统防串味，风冷无霜。',
        '【洗衣机】洗烘套装（热泵烘干）远优于洗烘一体机。洗净比≥1.1，BLDC变频或DD直驱电机。',
        '【热水器】燃气热水器首选16L带水量伺服器（恒温不忽冷忽热），必须由专业师傅打孔排烟。',
        '【电视】尺寸“买大不买小”，认准MiniLED、高刷（≥120Hz），预留PVC穿线管藏线。',
        '【空调】卧室选新一级能效变频壁挂机，注意出风口切忌直吹床头。'
      ],
      suggestions: [
        '【油烟机核心参数】风量建议≥24m³/min，最大静压≥900Pa（高层低楼层必看，否则做饭高峰期排烟倒灌）。',
        '【集成灶核心避坑】预算充足优先选带“蒸烤独立/一体”模块的集成灶（比单纯消毒柜款实用得多）；购买前务必让师傅上门核实公共烟道开孔位置与燃气表间距。',
        '洗碗机建议选14-16套大容量，锅碗瓢盆一次洗净，带热风烘干和银离子除菌。',
        '净水器认准RO反渗透膜，通量800G-1000G，出水快且滤芯寿命长。'
      ],
      brandAdvice: {
        focus: ['集成灶/油烟机/燃气灶（方太、老板、华帝；集成灶火星人、美大）', '微蒸烤一体机（凯度、美的、老板、松下）', '大家电全系（海尔、美的、格力、西门子、索尼、TCL等）'],
        ignore: []
      },
      purchaseAdvice: {
        online: ['电视、冰箱、洗衣机、空调、微蒸烤一体机（电商大促叠加国补以旧换新，价格最优且全国联保）'],
        offline: ['集成灶/中央空调（需要现场复尺与排烟定位，实体店包安装和打孔勘测更稳妥）']
      },
      modelRecommendations: [
        '【微蒸烤一体机】凯度（ZR Pro/丰度系列，双热风变频微蒸烤天花板）、美的（寻味系列/GC5，性价比极高）、老板（CQ926/CQ920D，大牌售后稳）、松下（台嵌高阶款）',
        '【燃气灶】方太（01-HA/TH26B，5.0kW聚焰大火，一级能效）、老板（57B0D/9B315，5.2kW紫焰大火，全铜火盖）、华凌（神灶系列，高性价比百元神机）',
        '【集成灶】火星人（E30/T7系列，低空吸净率高）、美大（风华系列）、亿田（S8系列）',
        '【传统烟灶/集成烹饪中心】方太（玥影/新欧式超薄系列）、老板（双腔大吸力系列/集成烹饪中心）',
        '【空调】华凌N8HE1（高性价比神机）、格力云佳、美的风尊',
        '【冰箱】海尔全空间保鲜系列（460/500）、容声双系统平嵌系列',
        '【洗烘套装】小天鹅水魔方/本色系列、海尔叠黛和美',
        '【电视】TCL Q10G Pro/Q10H MiniLED、海信E8K、索尼X90L',
        '【燃热】林内RUS-16QD03、能率GQ-16E4、海尔KL5',
        '【洗碗机】西门子全能舱系列、美的RX600/GX1000Pro'
      ],
      estimatedCost: '3万-8万元',
      timeline: '硬装结束后，家具进场前后'
    }
  },
  {
    id: 'lighting',
    title: '灯具照明',
    subtitle: '营造氛围的魔术师',
    icon: Lightbulb,
    description: '客厅主灯/射灯、卧室灯、餐厅吊灯、厨房感应灯、见光不见灯的灯带搭配。',
    tips: [
      '注意色温统一：全屋温馨选3500K-4000K暖白光，卧室可选3000K。',
      '显色指数（Ra）务必大于90（防频闪，还原食物和空间真色）。',
      '厨房切菜区和洗碗区务必加装吊柜底手扫感应灯带。'
    ],
    details: {
      precautions: [
        '射灯必须选深杯防眩光设计（遮光角>30°），避免直射人眼刺目。',
        '较重的吊灯必须固定在水泥顶或膨胀螺栓上，切勿直接挂在石膏板吊顶上。',
        '卫生间和厨房灯具必须具备防水防油雾密封性能。'
      ],
      suggestions: [
        '层次照明搭配：基础照明 + 重点洗墙射灯 + 局部氛围灯带。',
        '餐厅吊灯离餐桌距离在70-80cm为佳，聚焦美食更显食欲。',
        '床头灯建议独立按键或智能调光，起夜不晃眼。'
      ],
      brandAdvice: {
        focus: ['光源驱动与芯片（如欧司朗、普瑞芯片，Ra>90，无频闪）'],
        ignore: ['灯具外壳造型（广东中山直发即可，不必买高溢价设计品牌）']
      },
      purchaseAdvice: {
        online: ['全屋灯具（筒灯、射灯、吸顶灯、轨道灯，认准广东中山古镇发货，价格仅线下1/3）'],
        offline: ['复杂无主灯的整案调试设计（需本地灯光师或专业电工配合）']
      },
      estimatedCost: '2000-8000元',
      timeline: '硬装收尾阶段'
    }
  },
  {
    id: 'textiles',
    title: '窗帘布艺',
    subtitle: '柔化空间的利器',
    icon: Palette,
    description: '窗帘、纱帘、地毯、抱枕、床品软饰等。',
    tips: [
      '卧室窗帘遮光度建议在85%以上（深色雪尼尔/高精密面料）。',
      '窗帘做高温定型，褶皱更规整垂顺。',
      '地毯尺寸买大不买小，至少压在沙发前两脚下。'
    ],
    details: {
      precautions: [
        '【窗帘参数】做1.8-2倍韩褶或S挂钩，底端离地2cm避免拖地吸灰。',
        '滑轨选铝合金静音纳米滑轮轨道，坚决不用罗马杆（漏光且拉动卡顿）。',
        '面料认准A类无甲醛认证，安装后先通风除气味。'
      ],
      suggestions: [
        '客厅推荐“幻影纱”或“金刚纱”，透光不透人，轻盈灵动。',
        '卧室窗帘选雪尼尔或仿羊绒面料，垂坠感好且吸音隔音。',
        '窗帘颜色呼应室内地毯、抱枕或墙面莫兰迪色系。'
      ],
      brandAdvice: {
        focus: ['窗帘电机/静音轨道（如杜亚、绿米、欧瑞博）'],
        ignore: ['窗帘布料（看克重和遮光率即可，去浙江绍兴柯桥源头店铺买，坚决不买商场大牌）']
      },
      purchaseAdvice: {
        online: ['窗帘（认准浙江绍兴柯桥发货，先买几块小样看颜色厚度再下单）', '地毯（天津武清）', '四件套床品（江苏南通）'],
        offline: ['想省心且不想自己量尺安装的（找本地窗帘店，价格稍高）']
      },
      estimatedCost: '2000-6000元',
      timeline: '家具进场前后'
    }
  },
  {
    id: 'decor',
    title: '装饰摆件',
    subtitle: '彰显个性的细节',
    icon: ImageIcon,
    description: '艺术挂画、陶瓷花瓶、香薰摆件、挂钟等细节提升氛围感。',
    tips: [
      '挂画中心视平线高度离地1.4-1.5米最佳。',
      '“少即是多”，留白比堆满更有高级质感。',
      '融入个人爱好与旅行纪念物，家才有独特性。'
    ],
    details: {
      precautions: [
        '打孔挂画前确认墙内无水电管线走向。',
        '易碎陶瓷或重物摆件避开儿童活动区域。'
      ],
      suggestions: [
        '沙发背景墙挂画总宽度建议为沙发长度的2/3左右。',
        '采用高低错落三角陈列法摆放饰品。'
      ],
      brandAdvice: {
        focus: [],
        ignore: ['挂画、摆件（看审美与做工，无品牌要求）']
      },
      purchaseAdvice: {
        online: ['挂画（深圳大芬村壁画）', '花瓶摆件（景德镇/义乌）', '餐具（潮州骨瓷）'],
        offline: ['二手中古店、艺术展淘好物']
      },
      estimatedCost: '800-3000元',
      timeline: '入住前逐步添置'
    }
  },
  {
    id: 'plants',
    title: '绿植花卉',
    subtitle: '注入自然生机',
    icon: Leaf,
    description: '大型绿植（天堂鸟、琴叶榕、量天尺）、桌面小盆栽、鲜花。',
    tips: [
      '根据室内采光条件选择喜阳或耐阴植物。',
      '很多室内绿植是“浇水过频”闷根死掉的，干透浇透。',
      '好看的花盆（水泥盆、编织篮）能大幅提升植物颜值。'
    ],
    details: {
      precautions: [
        '家有猫狗或婴幼儿需避开百合、滴水观音等有毒植物。',
        '除甲醛依靠开窗通风为主，切莫指望几盆绿植能吸净甲醛。'
      ],
      suggestions: [
        '新手耐造推荐：龟背竹、虎皮兰、橡皮树、散尾葵、绿萝。',
        '客厅角落配1.5米左右高叶大绿植，瞬间提升空间生机感。'
      ],
      brandAdvice: {
        focus: [],
        ignore: ['花草绿植及花盆']
      },
      purchaseAdvice: {
        online: ['小型多肉、鲜切花配饰、特色花盆'],
        offline: ['大型绿植（去本地花卉市场挑选，形态直观且运输损耗小）']
      },
      estimatedCost: '300-1500元',
      timeline: '开窗通风期间及入住前'
    }
  }
];

// --- Components ---

function StepModal({ step, onClose }: { step: StepItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const Icon = step.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 sm:p-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-orange-100 text-orange-600 shrink-0">
              <Icon size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-800">{step.title}</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">{step.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {step.description}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-blue-50/50 border border-blue-100/60">
              <Clock className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-700 mb-0.5">预计耗时</h4>
                <p className="text-xs sm:text-sm text-slate-600">{step.details.timeline}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/60">
              <DollarSign className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-700 mb-0.5">参考花费</h4>
                <p className="text-xs sm:text-sm text-slate-600">{step.details.estimatedCost}</p>
              </div>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800 mb-3">
              <AlertCircle className="text-red-500" size={20} />
              注意事项 (避坑要点)
            </h3>
            <ul className="space-y-2.5">
              {step.details.precautions.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 bg-red-50/40 p-3 sm:p-3.5 rounded-xl border border-red-100/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800 mb-3">
              <ThumbsUp className="text-emerald-500" size={20} />
              专业实操建议
            </h3>
            <ul className="space-y-2.5">
              {step.details.suggestions.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 bg-emerald-50/40 p-3 sm:p-3.5 rounded-xl border border-emerald-100/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div className="leading-relaxed whitespace-pre-line">{item}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Advice */}
          {step.details.brandAdvice && (step.details.brandAdvice.focus.length > 0 || step.details.brandAdvice.ignore.length > 0) && (
            <div>
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800 mb-3">
                <ShieldCheck className="text-blue-500" size={20} />
                品牌选购指南 (钱花在刀刃上)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {step.details.brandAdvice.focus.length > 0 && (
                  <div className="bg-blue-50/40 p-3.5 sm:p-4 rounded-xl border border-blue-100/50">
                    <h4 className="flex items-center gap-1.5 font-bold text-blue-700 text-xs sm:text-sm mb-2.5">
                      <ShieldCheck size={16} /> ✅ 重点看品牌 (保安全/保寿命)
                    </h4>
                    <ul className="space-y-1.5">
                      {step.details.brandAdvice.focus.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.details.brandAdvice.ignore.length > 0 && (
                  <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200/60">
                    <h4 className="flex items-center gap-1.5 font-bold text-slate-700 text-xs sm:text-sm mb-2.5">
                      <Tag size={16} /> ❌ 没必要看品牌 (重材质/性价比)
                    </h4>
                    <ul className="space-y-1.5">
                      {step.details.brandAdvice.ignore.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Model Recommendations */}
          {step.details.modelRecommendations && step.details.modelRecommendations.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800 mb-3">
                <Star className="text-amber-500" size={20} />
                经典品牌与型号推荐 (直接抄作业)
              </h3>
              <ul className="space-y-2">
                {step.details.modelRecommendations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Purchase Advice */}
          {step.details.purchaseAdvice && (step.details.purchaseAdvice.online.length > 0 || step.details.purchaseAdvice.offline.length > 0) && (
            <div>
              <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800 mb-3">
                <ShoppingBag className="text-orange-500" size={20} />
                线上线下购买建议
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {step.details.purchaseAdvice.online.length > 0 && (
                  <div className="bg-emerald-50/40 p-3.5 sm:p-4 rounded-xl border border-emerald-100/50">
                    <h4 className="flex items-center gap-1.5 font-bold text-emerald-700 text-xs sm:text-sm mb-2.5">
                      <ShoppingBag size={16} /> 🌐 建议线上 (价格透明/型号全)
                    </h4>
                    <ul className="space-y-1.5">
                      {step.details.purchaseAdvice.online.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.details.purchaseAdvice.offline.length > 0 && (
                  <div className="bg-orange-50/40 p-3.5 sm:p-4 rounded-xl border border-orange-100/50">
                    <h4 className="flex items-center gap-1.5 font-bold text-orange-700 text-xs sm:text-sm mb-2.5">
                      <Store size={16} /> 🏪 建议线下 (重体验/售后/安装)
                    </h4>
                    <ul className="space-y-1.5">
                      {step.details.purchaseAdvice.offline.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepCard({ 
  step, 
  index, 
  isCompleted, 
  toggleComplete, 
  onClick 
}: { 
  step: StepItem; 
  index: number; 
  isCompleted: boolean; 
  toggleComplete: (id: string) => void; 
  onClick: () => void; 
}) {
  const Icon = step.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
        isCompleted 
          ? 'bg-emerald-50/40 border-emerald-200' 
          : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg'
      }`}
    >
      {/* Card Header */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`p-2.5 sm:p-3 rounded-xl transition-colors ${
            isCompleted 
              ? 'bg-emerald-100 text-emerald-600' 
              : 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'
          }`}>
            <Icon size={22} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-400">0{index + 1}</span>
              <h3 className="text-base sm:text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                {step.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">{step.subtitle}</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleComplete(step.id);
          }}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors z-10 shrink-0 ${
            isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
          }`}
          title={isCompleted ? "标记为未完成" : "标记为已完成"}
        >
          <CheckCircle2 size={18} />
        </button>
      </div>

      {/* Card Body */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6 leading-relaxed line-clamp-2">
          {step.description}
        </p>
        
        <div className="flex items-center text-xs sm:text-sm font-medium text-orange-500 group-hover:text-orange-600 transition-colors">
          <span>查看详情与避坑指南</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Progress indicator bar at bottom */}
      <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
        isCompleted ? 'w-full bg-emerald-500' : 'w-0 bg-orange-400 group-hover:w-full opacity-30'
      }`} />
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'hard' | 'soft' | 'quote'>('quote');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completedSteps');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [selectedStep, setSelectedStep] = useState<StepItem | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('completedSteps', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const currentSteps = activeTab === 'soft' ? SOFT_STEPS : HARD_STEPS;
  const hardProgress = Math.round((HARD_STEPS.filter(s => completedSteps.has(s.id)).length / HARD_STEPS.length) * 100);
  const softProgress = Math.round((SOFT_STEPS.filter(s => completedSteps.has(s.id)).length / SOFT_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 selection:bg-orange-200">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 pt-10 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-300" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <Info size={16} />
            <span>新手必看 · 避坑全景图与报价审计</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4"
          >
            小白装修指南
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            装修是一场修行。本指南将装修拆解为「硬装」、「软装」及「报价单避坑审计」核心模块，梳理全套工序、避坑要点、增项测算与花费预估，助你轻松装出理想的家。
          </motion.p>
        </div>
        
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent" />
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Tabs & Progress */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="flex flex-wrap p-1 bg-slate-200/60 rounded-xl w-full lg:w-auto gap-1">
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex-1 sm:flex-none px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'quote' 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>🔥 报价单漏项自查 (7.9万避坑)</span>
            </button>
            <button
              onClick={() => setActiveTab('hard')}
              className={`flex-1 sm:flex-none px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === 'hard' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              硬装指南 (Hard)
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`flex-1 sm:flex-none px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === 'soft' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              软装指南 (Soft)
            </button>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 bg-white px-4 sm:px-5 py-3 rounded-xl border border-slate-200 shadow-sm w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">硬装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${hardProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600">{hardProgress}%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">软装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${softProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600">{softProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'quote' ? (
          <QuotationAudit />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {currentSteps.map((step, index) => (
                <StepCard 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  isCompleted={completedSteps.has(step.id)}
                  toggleComplete={toggleComplete}
                  onClick={() => setSelectedStep(step)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-slate-500 text-xs sm:text-sm">
          <p>装修是一件充满期待的事，愿你少踩坑，早日住进理想的家。</p>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <StepModal 
            step={selectedStep} 
            onClose={() => setSelectedStep(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
