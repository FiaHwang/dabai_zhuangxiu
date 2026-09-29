import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, Droplets, Zap, PaintRoller, Grid, Wrench, 
  Sofa, Lightbulb, Image as ImageIcon, Leaf, Palette, 
  CheckCircle2, Info, ChevronRight,
  X, Clock, DollarSign, AlertCircle, ThumbsUp,
  PencilRuler, Package, Tv, ShieldCheck, Tag, Star, ShoppingBag, Store
} from 'lucide-react';

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
      '动线优先原则：先定动线（回家/家务/做饭/访客动线），再定家具尺寸，最后定细节。',
      '承重墙、剪力墙、配重墙在图纸上必须加粗标黑，严禁任何破坏！'
    ],
    details: {
      precautions: [
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
      '拆改前务必去物业办理审批手续并缴纳垃圾清运费。',
      '注意保护下水管道，防止建筑垃圾掉入造成堵塞。'
    ],
    details: {
      precautions: [
        '严禁拆除承重墙、剪力墙、配重墙。',
        '拆除阳台半截墙前需确认是否为配重墙（压着挑梁绝对不能砸）。',
        '旧房改造需注意老化水管和电线的安全拆除，务必关闭总阀。',
        '拆改产生的建筑垃圾需按物业规定装袋清运，切勿乱堆放。'
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
      estimatedCost: '50-150元/平米（视拆除量和当地人工费而定）',
      timeline: '3-7天'
    }
  },
  {
    id: 'hydropower',
    title: '水电改造',
    subtitle: '隐蔽工程重中之重',
    icon: Zap,
    description: '确定开关、插座、灯具、水盆、浴缸、洗衣机等确切位置，进行开槽布线布管。',
    tips: [
      '插座宁多勿少，提前规划好家具家电尺寸。',
      '水管建议走顶，漏水易发现且好维修。',
      '水电点对点即可，不需要直角艺术绕线（费钱还影响抽拉）。'
    ],
    details: {
      precautions: [
        '水管走顶不走地，电线走墙不走地（条件允许下）。',
        '强弱电管间距需保持30cm以上，交叉处必须用锡箔纸屏蔽防干扰。',
        '下水管道包隔音棉必须2公分以上厚度，且先包一层阻尼片减震。',
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
    subtitle: '滴水不漏的保障',
    icon: Droplets,
    description: '卫生间、厨房、阳台的地面和墙面涂刷防水涂料，防止漏水渗水到楼下或隔壁。',
    tips: [
      '卫生间墙面防水建议做满高（1.8米以上，淋浴区到顶）。',
      '防水干透后必须做48小时闭水试验。',
      '必须亲自去楼下邻居家天花板确认是否有渗漏痕迹。'
    ],
    details: {
      precautions: [
        '卫生间地面必须全防水，门口贴砖前务必刷一遍堵漏王防渗水。',
        '阴阳角、管根等容易漏水部位需做成圆弧形倒角并加刷聚酯无纺布加强层。',
        '闭水试验水位不低于2cm，时长不少于48小时，记录水位刻度。',
        '做完闭水试验后贴砖前必须做水泥砂浆保护层，防止瓦工踩破防水层。'
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
      estimatedCost: '40-80元/平米',
      timeline: '3-5天'
    }
  },
  {
    id: 'masonry',
    title: '泥瓦工程',
    subtitle: '面子工程的开始',
    icon: Grid,
    description: '包含地面找平、铺贴墙砖地砖、过门石、窗台石的安装以及地漏安装。这是决定全屋质感和基调的关键一步。',
    tips: [
      '认准广东佛山砖，看包装箱厂址防贴牌。',
      '全瓷砖上墙必须用瓷砖胶，严禁只用水泥砂浆（易空鼓脱落）。',
      '地砖排版图必须提前做，海棠角工艺比压边条美观得多。'
    ],
    details: {
      precautions: [
        '【墙地砖混用】墙砖地砖不能混用，地砖上墙重量大，必须刷背胶并使用优质瓷砖胶。',
        '【排水坡度】卫生间地砖必须外高里低，下水坡度至少2厘米，绝不能积水。',
        '【淋浴区】淋浴区做下沉式或隐形坡度，放弃传统笨重的大理石挡水条。',
        '【壁龛】卫生间建议做壁龛，实用收纳且视觉整洁。'
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
    subtitle: '定制你的专属收纳与空间层次',
    icon: Wrench,
    description: '包含吊顶造型、石膏线、定制柜体（鞋柜、衣柜、书柜等）打底、背景墙制作等。',
    tips: [
      '吊顶转角必做“L”型整板防开裂。',
      '柜体板材认准ENF级环保标准，胶水认准MDI无醛胶。',
      '五金件（铰链/滑轨）决定柜子寿命，千万别省。'
    ],
    details: {
      precautions: [
        '【板材环保】ENF级颗粒板/多层板 > E0级。胶水优先选MDI无醛胶，杜绝劣质脲醛胶。密度板甲醛大，柜体坚决不用。',
        '【封边工艺】柜门首选PUR或激光封边，平整无溢胶痕迹。',
        '【吊顶工艺】必须使用轻钢龙骨（防火防潮防变形），转角处用整块石膏板裁成“L”型整板，嵌缝用嵌缝石膏+防裂网带。',
        '【防潮处理】靠近卫浴、厨房的木作（如衣柜背板、门套打底）背部必须加贴防潮膜或预留1-2cm防潮缝。'
      ],
      suggestions: [
        '【衣柜布局】多挂衣区（短衣>90cm，长衣>130cm），少叠衣区，深度55-60cm。做到顶，上方不落灰。',
        '【柜门设计】柜门做免拉手或极简小拉手，视觉整洁。挂衣杆选铝合金，五金铰链必须带液压阻尼缓冲。',
        '【全屋收纳】玄关鞋柜底部悬空15-20cm放常穿拖鞋，内嵌感应灯带。',
        '【窗帘盒】木工阶段预留窗帘盒：单轨宽15cm，双轨宽20cm，高15cm。'
      ],
      brandAdvice: {
        focus: ['柜体板材（如万华禾香板、爱格板、克诺斯邦，认准ENF级）', '五金铰链/滑轨（如百隆Blum、海蒂诗Hettich、DTC东泰）', '白乳胶/发泡胶（环保重点）'],
        ignore: ['石膏板、轻钢龙骨（选国标大厂如龙牌、泰山即可，无需进口大牌）']
      },
      purchaseAdvice: {
        online: ['五金件（百隆、海蒂诗铰链网购更便宜，可自购让师傅装）'],
        offline: ['全屋定制柜（需多次上门复尺、设计、安装与售后，强烈建议本地门店）', '石膏板/轻钢龙骨（本地建材市场送货）']
      },
      estimatedCost: '吊顶100-200元/平米，定制柜800-2000元/投影平米',
      timeline: '7-15天'
    }
  },
  {
    id: 'painting',
    title: '油漆工程',
    subtitle: '给家穿上新衣',
    icon: PaintRoller,
    description: '墙面基层处理、刮腻子、打磨、刷底漆和面漆。',
    tips: [
      '腻子一定要干透才能刮下一遍或打磨。',
      '深色漆尽量不要兑水，否则容易花脸。',
      '刷完漆后关窗阴干，不要立刻开窗暴晒通风，防止干裂脱皮。'
    ],
    details: {
      precautions: [
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
      estimatedCost: '人工+材料 30-80元/平米（按墙面展开面积）',
      timeline: '10-15天'
    }
  },
  {
    id: 'installation',
    title: '成品安装',
    subtitle: '硬装的最后拼图',
    icon: Package,
    description: '包含厨卫吊顶、橱柜及案台、室内门、地板、卫浴洁具、开关插座面板等的安装。',
    tips: [
      '安装顺序：厨卫吊顶 → 橱柜 → 室内木门 → 踢脚线/地板。',
      '马桶安装切勿用水泥封底，必须使用防霉中性玻璃胶。',
      '厨房洗菜池强烈建议做“台下盆”工艺。'
    ],
    details: {
      precautions: [
        '【木门选购】选免漆门（环保耐刮，1200元左右）或实木复合门，厚度≥4.5cm，配磁吸静音锁和304不锈钢厚合页。',
        '【厨卫移门】卫生间选双层超白长虹/油砂玻璃门；厨房选极窄边框地轨移门。',
        '【厨卫吊顶】铝扣板性价比高好检修（厚度≥0.6mm，哑光白耐看），集成浴霸安装前留好排气孔。',
        '【烟道止逆阀】厨房吊顶前务必安装优质烟道止逆阀并打胶密封，防止楼下油烟倒灌。',
        '【智能门锁】选半导体指纹识别（带C级锁芯），购买前量好导向片尺寸。'
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
        '【冰箱】首选十字对开门或法式多门，双循环双系统防串味，风冷无霜。',
        '【洗衣机】洗烘套装（热泵烘干）远优于洗烘一体机。洗净比≥1.1，BLDC变频或DD直驱电机。',
        '【热水器】燃气热水器首选16L带水量伺服器（恒温不忽冷忽热），必须由专业师傅打孔排烟。',
        '【电视】尺寸“买大不买小”，认准MiniLED、高刷（≥120Hz），预留PVC穿线管藏线。',
        '【空调】卧室选新一级能效变频壁挂机，注意出风口切忌直吹床头。'
      ],
      suggestions: [
        '洗碗机建议选14-16套大容量，锅碗瓢盆一次洗净，带热风烘干和银离子除菌。',
        '净水器认准RO反渗透膜，通量800G-1000G，出水快且滤芯寿命长。',
        '油烟机建议风量≥22m³/min，最大静压≥450Pa（高层住宅防倒灌）。'
      ],
      brandAdvice: {
        focus: ['大家电全系（海尔、美的、格力、西门子、索尼、TCL等，技术成熟售后网点全）'],
        ignore: []
      },
      purchaseAdvice: {
        online: ['电视、冰箱、洗衣机、空调（电商大促叠加国补以旧换新，价格最优且全国联保）'],
        offline: ['中央空调/新风系统（“三分设备七分安装”，必须选本地正规靠谱服务商）']
      },
      modelRecommendations: [
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
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('hard');
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

  const currentSteps = activeTab === 'hard' ? HARD_STEPS : SOFT_STEPS;
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
            <span>新手必看 · 避坑全景图</span>
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
            装修是一场修行。本指南将装修拆解为「硬装」与「软装」两大核心阶段，梳理全套工序、避坑要点、选品推荐与花费预估，助你轻松装出理想的家。
          </motion.p>
        </div>
        
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent" />
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Tabs & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="flex p-1 bg-slate-200/60 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('hard')}
              className={`flex-1 md:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === 'hard' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              硬装指南 (Hard Furnishing)
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`flex-1 md:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === 'soft' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              软装指南 (Soft Furnishing)
            </button>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 bg-white px-4 sm:px-5 py-3 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">硬装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-20 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${hardProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600">{hardProgress}%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">软装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-20 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${softProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600">{softProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
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
