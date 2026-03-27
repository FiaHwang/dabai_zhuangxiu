import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, Droplets, Zap, PaintRoller, Grid, Wrench, 
  Sofa, Lightbulb, Image as ImageIcon, Leaf, Palette, 
  CheckCircle2, AlertTriangle, Info, ChevronRight,
  X, Clock, DollarSign, AlertCircle, ThumbsUp,
  PencilRuler, Package, Tv
} from 'lucide-react';

// --- Data ---
const HARD_STEPS = [
  {
    id: 'design',
    title: '前期设计',
    subtitle: '装修的灵魂与蓝图',
    icon: PencilRuler,
    description: '明确装修风格、功能需求，进行房屋精确测量，出具平面布置图、施工图和效果图。',
    tips: ['一定要亲自量房，不要完全依赖户型图。', '明确自己的生活习惯，插座位置和收纳空间要提前规划。', '预算表要细化到每一项，预留10%-20%的备用金。'],
    details: {
      precautions: [
        '不要盲目跟风网红设计，实用性永远是第一位的。',
        '设计合同要看清，是否包含后期软装搭配指导，修改次数是否受限。',
        '自己半包的话，一定要提前确定好橱柜、中央空调、地暖等需要提前进场的设备尺寸。',
        '承重墙、剪力墙在图纸上必须明确标出，绝对不可拆改。'
      ],
      suggestions: [
        '多看案例，建立自己的“灵感库”，方便与设计师沟通。',
        '列出家庭成员的特殊需求（如宠物、老人、小孩、居家办公）。',
        '如果预算有限，可以“重硬装轻软装”或者“重软装轻硬装”，但隐蔽工程绝不能省。'
      ],
      estimatedCost: '免费至 100-500元/平米（视设计师级别）',
      timeline: '1-4周'
    }
  },
  {
    id: 'demolition',
    title: '主体拆改',
    subtitle: '重塑空间格局',
    icon: Hammer,
    description: '根据设计图纸进行砸墙、砌墙、铲墙皮、拆暖气、换塑钢窗等，是装修的第一个实质性阶段。',
    tips: ['承重墙、配重墙绝对不能动！', '拆改前务必去物业办理审批手续。', '注意保护下水管道，防止建筑垃圾堵塞。'],
    details: {
      precautions: [
        '严禁拆除承重墙、剪力墙、配重墙。',
        '拆除阳台半截墙前需确认是否为配重墙。',
        '旧房改造需注意老化水管和电线的安全拆除。',
        '拆改产生的建筑垃圾需按物业规定清运，切勿乱堆放。'
      ],
      suggestions: [
        '提前规划好空间布局，避免反复拆改增加成本。',
        '保留有用的旧物（如质量尚可的防盗门），可翻新再利用。',
        '拆除后及时清理现场，为后续施工提供良好环境。'
      ],
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
    tips: ['插座宁多勿少，提前规划好家具家电尺寸。', '水管建议走顶，漏水易发现且好维修。', '强弱电交叉处需用锡箔纸包裹防干扰。'],
    details: {
      precautions: [
        '水管走顶不走地，电线走墙不走地（条件允许下）。',
        '强弱电管间距需保持30cm以上，交叉处必须用锡箔纸屏蔽。',
        '冷热水管不能同槽，间距需达到15cm。',
        '封槽前必须进行打压试验和电路测试，并拍照留存管线走向图。'
      ],
      suggestions: [
        '厨房、卫生间等大功率电器区域需单独走4平方或6平方专线。',
        '床头、玄关、走廊建议设置双控开关。',
        '考虑未来智能家居需求，开关盒内预留零线。'
      ],
      estimatedCost: '80-150元/平米（按实际走线长度或建筑面积计算）',
      timeline: '5-10天'
    }
  },
  {
    id: 'waterproof',
    title: '防水工程',
    subtitle: '滴水不漏的保障',
    icon: Droplets,
    description: '卫生间、厨房、阳台的地面和墙面涂刷防水涂料，防止漏水渗水。',
    tips: ['卫生间墙面防水建议做满高（1.8米以上）。', '防水干透后必须做48小时闭水试验。', '去楼下邻居家确认是否有渗漏。'],
    details: {
      precautions: [
        '基层必须清理干净、平整，不能有起沙、空鼓。',
        '阴阳角、管根等容易漏水的部位需做成圆弧形并加刷防水附加层。',
        '防水涂料需涂刷2-3遍，十字交叉涂刷，每遍干透后再刷下一遍。',
        '闭水试验水位不低于2cm，时长不少于48小时。'
      ],
      suggestions: [
        '干湿分离的卫生间，干区墙面防水也建议做到1.2米。',
        '厨房和阳台虽然漏水风险较小，但也建议做地面防水和30cm墙面防水。',
        '选择柔性防水涂料用于墙面，刚性防水涂料用于地面。'
      ],
      estimatedCost: '40-80元/平米',
      timeline: '3-5天'
    }
  },
  {
    id: 'masonry',
    title: '泥瓦工程',
    subtitle: '面子工程的开始',
    icon: Grid,
    description: '包含地面找平、铺贴墙砖地砖、过门石、窗台石的安装以及地漏安装。',
    tips: ['瓷砖进场要核对批号，防止色差。', '贴砖前要泡水（全瓷砖除外）。', '贴完后检查空鼓率，单块砖空鼓不能超过15%。'],
    details: {
      precautions: [
        '墙砖地砖不能混用，地砖上墙需用瓷砖胶并做好防脱落措施。',
        '铺贴前需进行排砖，非整砖应排在次要部位或阴角处。',
        '卫生间地砖需向地漏方向找坡，确保排水顺畅不积水。',
        '填缝或美缝需在瓷砖干透后进行（通常在贴完一周后）。'
      ],
      suggestions: [
        '大规格瓷砖（如750*1500）铺贴人工费较高，需提前确认预算。',
        '厨卫建议选择防滑耐脏的哑光砖。',
        '地漏安装要与铺砖同步进行，推荐使用回字形铺法。'
      ],
      estimatedCost: '人工费50-120元/平米，材料费视瓷砖档次而定',
      timeline: '10-20天'
    }
  },
  {
    id: 'carpentry',
    title: '木工工程',
    subtitle: '定制你的专属收纳',
    icon: Wrench,
    description: '吊顶、石膏线、打柜子、背景墙制作、木门套打底等。',
    tips: ['吊顶转角处需用整块石膏板做“L”型处理，防开裂。', '定制柜子要注意板材环保等级（E0或ENF级）。', '五金件一定要买好的，决定柜子寿命。'],
    details: {
      precautions: [
        '轻钢龙骨比木龙骨更稳定、防潮、防火，建议优先使用。',
        '石膏板接缝处需留3-5mm缝隙，并用嵌缝石膏和防裂带处理。',
        '木作工程需注意防潮处理，特别是靠近卫生间的区域。',
        '现场打柜子封边工艺不如机器封边，需注意甲醛释放风险。'
      ],
      suggestions: [
        '全屋定制虽然价格较高，但设计感和封边工艺更好。',
        '衣柜内部结构多做挂衣区，少做层板，更实用。',
        '五金配件（铰链、滑轨）建议选择百隆、海蒂诗等知名品牌。'
      ],
      estimatedCost: '吊顶100-200元/平米，定制柜800-2000元/平米',
      timeline: '7-15天'
    }
  },
  {
    id: 'painting',
    title: '油漆工程',
    subtitle: '给家穿上新衣',
    icon: PaintRoller,
    description: '墙面基层处理、刮腻子、打磨、刷底漆和面漆。',
    tips: ['腻子一定要干透才能刮下一遍或打磨。', '深色漆尽量不要兑水，容易花。', '刷完漆后阴干，不要立刻开窗暴晒通风，防开裂。'],
    details: {
      precautions: [
        '墙面基层有裂缝或不平整需先用石膏找平，贴网格布防裂。',
        '腻子通常刮2-3遍，每遍必须完全干透后才能进行下一步。',
        '打磨腻子时需用强光灯侧照，确保墙面平整无波浪。',
        '底漆不能省，它能抗碱防潮、增加面漆附着力。'
      ],
      suggestions: [
        '选择环保认证（如十环认证、法国A+）的乳胶漆。',
        '调色漆建议在电脑上调好，人工调色容易产生色差且难以补漆。',
        '刷漆时注意保护好门窗套、开关插座面板等。'
      ],
      estimatedCost: '人工+材料 30-80元/平米（按墙面面积计算）',
      timeline: '10-15天'
    }
  },
  {
    id: 'installation',
    title: '成品安装',
    subtitle: '硬装的最后拼图',
    icon: Package,
    description: '包含橱柜、木门、地板、卫浴洁具、五金件、开关插座面板等的安装。',
    tips: ['安装顺序很重要：一般是先厨卫吊顶，再橱柜，接着木门，最后地板。', '地板安装前地面必须找平且干透。', '五金件安装时注意保护已完成的墙面和地面。'],
    details: {
      precautions: [
        '橱柜安装时要注意水槽和燃气灶的开孔尺寸是否准确。',
        '木门安装要注意门缝大小，开关是否顺畅，门锁是否好用。',
        '地板铺贴要注意预留伸缩缝，防止后期起拱。',
        '开关插座面板安装要横平竖直，通电测试是否正常。'
      ],
      suggestions: [
        '安装季家里最好留人盯工，遇到尺寸不合或磕碰问题及时沟通解决。',
        '准备好保护膜，安装大件物品时铺在地上防止划伤地砖或地板。',
        '所有安装产生的垃圾，要求安装师傅尽量带走或清理到指定地点。'
      ],
      estimatedCost: '通常包含在购买产品的费用中，部分需另付安装费',
      timeline: '1-2周'
    }
  }
];

const SOFT_STEPS = [
  {
    id: 'furniture',
    title: '家具进场',
    subtitle: '空间的主角',
    icon: Sofa,
    description: '沙发、床、餐桌椅、茶几、电视柜等大件家具的选购与摆放。',
    tips: ['买家具前务必复尺，确认电梯和入户门能否进得去。', '注意家具尺寸与空间动线的关系，留出舒适过道。', '风格要统一，颜色搭配遵循“墙浅地中家具深”或同色系。'],
    details: {
      precautions: [
        '购买前务必测量电梯门、楼道、入户门及室内门的尺寸，避免家具无法搬入。',
        '实木家具需注意木材种类和含水率，防止开裂变形。',
        '真皮沙发需辨别真伪，注意日常保养防抓挠。',
        '网购家具需确认退换货政策和物流送装服务。'
      ],
      suggestions: [
        '客厅沙发尺寸不宜过大，占客厅面积的1/4左右为宜。',
        '小户型建议选择细腿家具，视觉上更显通透。',
        '床垫的选择比床架更重要，建议去实体店试躺后再决定。'
      ],
      estimatedCost: '2万-10万+（差异极大，视品牌和材质而定）',
      timeline: '硬装结束后1-2周内'
    }
  },
  {
    id: 'appliances',
    title: '家电进场',
    subtitle: '赋予家现代科技感',
    icon: Tv,
    description: '电视、冰箱、洗衣机、空调、洗碗机、烘干机等家用电器的送货与安装。',
    tips: ['嵌入式家电（如冰箱、洗碗机）必须在定制柜子前确定好型号和尺寸。', '大功率电器必须使用专线插座。', '送货时务必当面拆箱验机，确认无外观损伤再签收。'],
    details: {
      precautions: [
        '冰箱进场后需静置24小时以上才能通电，防止压缩机损坏。',
        '洗衣机安装时必须拆除背部的运输固定螺丝，否则脱水时会剧烈震动。',
        '电视壁挂安装需确认墙体是否为承重墙或实心砖墙，空心砖墙需特殊处理。',
        '燃气热水器必须由燃气公司或有资质的专业人员安装。'
      ],
      suggestions: [
        '家电购买可以趁着电商大促集中采购，能省下不少钱。',
        '洗碗机和烘干机是提升幸福感的利器，预算允许强烈建议购入。',
        '保留好所有家电的发票和保修卡，最好拍照电子存档。'
      ],
      estimatedCost: '3万-10万+（视品牌和数量而定）',
      timeline: '硬装结束后，家具进场前后'
    }
  },
  {
    id: 'lighting',
    title: '灯具照明',
    subtitle: '营造氛围的魔术师',
    icon: Lightbulb,
    description: '主灯、射灯、筒灯、落地灯、台灯、灯带等照明设备的搭配。',
    tips: ['无主灯设计需在硬装阶段提前规划好线路和吊顶。', '注意色温一致性，温馨选3000K，明亮选4000K。', '显色指数（Ra）建议大于90，还原物品真实色彩。'],
    details: {
      precautions: [
        '灯具重量较大时，必须安装在承重结构上，不能直接固定在石膏板上。',
        '卫生间和厨房的灯具需具备防潮防油污功能。',
        '射灯防眩光设计很重要，避免直射眼睛造成不适。',
        '网购灯具注意光源是否可替换，一体化光源损坏需整灯更换。'
      ],
      suggestions: [
        '采用层次照明：基础照明（筒灯/主灯）+ 重点照明（射灯/吊灯）+ 装饰照明（灯带/落地灯）。',
        '餐厅吊灯距离桌面70-80cm为宜，光线聚焦在食物上更有食欲。',
        '卧室建议使用低色温（2700K-3000K）的暖光，有助于睡眠。'
      ],
      estimatedCost: '3000-15000元',
      timeline: '硬装收尾阶段安装'
    }
  },
  {
    id: 'textiles',
    title: '窗帘布艺',
    subtitle: '柔化空间的利器',
    icon: Palette,
    description: '窗帘、地毯、抱枕、床品、桌布等软性材质的装饰。',
    tips: ['卧室窗帘遮光度建议85%以上，客厅可选用透光不透人的纱帘。', '窗帘建议做高温定型，垂坠感更好。', '地毯尺寸要够大，客厅地毯至少要能压在沙发前腿下。'],
    details: {
      precautions: [
        '窗帘盒需在木工阶段提前预留好尺寸（单轨15cm，双轨20cm）。',
        '测量窗帘尺寸时需考虑褶皱倍数，通常为1.5-2倍。',
        '地毯容易藏污纳垢，有过敏体质或宠物的家庭需谨慎选择长毛地毯。',
        '深色布艺容易褪色，避免长时间阳光直射。'
      ],
      suggestions: [
        '窗帘颜色可呼应空间中的辅助色（如沙发、抱枕、挂画的颜色）。',
        '百叶帘适合书房、卫生间等需要调节光线且不怕潮湿的区域。',
        '通过更换抱枕、桌布等小件布艺，可以低成本改变家居氛围。'
      ],
      estimatedCost: '3000-10000元',
      timeline: '家具进场前后'
    }
  },
  {
    id: 'decor',
    title: '装饰摆件',
    subtitle: '彰显个性的细节',
    icon: ImageIcon,
    description: '挂画、摆件、花瓶、相框、挂钟等提升空间艺术感的物品。',
    tips: ['挂画高度中心点建议在视平线（离地约1.4-1.5米）。', '摆件遵循“少即是多”，留白更有高级感。', '可以根据季节或节日更换小摆件，保持新鲜感。'],
    details: {
      precautions: [
        '挂画打孔前需确认墙内是否有水电管线。',
        '贵重或易碎摆件需放置在稳固且不易触碰的地方，特别是有小孩的家庭。',
        '避免过度装饰，堆砌太多物品会让空间显得杂乱无章。'
      ],
      suggestions: [
        '挂画尺寸应与墙面和下方家具比例协调，沙发背景墙挂画总宽度约为沙发的2/3。',
        '摆件陈列可采用“三角构图法”或“高低错落法”，增加层次感。',
        '融入个人爱好和旅行纪念品，让家更有你的专属印记。'
      ],
      estimatedCost: '1000-5000元',
      timeline: '入住前慢慢添置'
    }
  },
  {
    id: 'plants',
    title: '绿植花卉',
    subtitle: '注入自然生机',
    icon: Leaf,
    description: '大型绿植（琴叶榕、天堂鸟）、桌面小盆栽、鲜花切花等。',
    tips: ['根据室内光照条件选择合适的植物（喜阳或耐阴）。', '注意浇水频率，很多室内植物是“浇水浇死”的。', '好看的花盆（如水泥盆、藤编筐）能大大提升绿植颜值。'],
    details: {
      precautions: [
        '了解植物是否有毒性，有宠物或小孩的家庭需避开百合、夹竹桃、滴水观音等。',
        '刚装修完的房子不要指望靠几盆绿植除甲醛，通风才是王道。',
        '注意防虫防病，定期检查叶片背面和土壤。'
      ],
      suggestions: [
        '新手推荐：散尾葵、龟背竹、虎皮兰、绿萝等好养护的品种。',
        '利用高低不同的植物架，打造错落有致的室内植物角。',
        '鲜切花虽然寿命短，但能瞬间提升空间精致度，可定期购买。'
      ],
      estimatedCost: '500-2000元',
      timeline: '入住前及日常添置'
    }
  }
];

// --- Components ---

function StepModal({ step, onClose }: any) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!step) return null;
  const Icon = step.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
              <Icon size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{step.title}</h2>
              <p className="text-slate-500 font-medium">{step.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <p className="text-lg text-slate-600 leading-relaxed">
            {step.description}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Clock className="text-blue-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">预计耗时</h4>
                <p className="text-sm text-slate-600">{step.details.timeline}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <DollarSign className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">预计花费</h4>
                <p className="text-sm text-slate-600">{step.details.estimatedCost}</p>
              </div>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
              <AlertCircle className="text-red-500" size={22} />
              注意事项 (避坑)
            </h3>
            <ul className="space-y-3">
              {step.details.precautions.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 bg-red-50/50 p-4 rounded-xl border border-red-100/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4">
              <ThumbsUp className="text-emerald-500" size={22} />
              专业建议
            </h3>
            <ul className="space-y-3">
              {step.details.suggestions.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepCard({ step, index, isCompleted, toggleComplete, onClick }: any) {
  const Icon = step.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group ${
        isCompleted 
          ? 'bg-emerald-50/50 border-emerald-200' 
          : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg'
      }`}
    >
      {/* Card Header */}
      <div className="p-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-colors ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'}`}>
            <Icon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-400">0{index + 1}</span>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{step.title}</h3>
            </div>
            <p className="text-sm text-slate-500 font-medium">{step.subtitle}</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleComplete(step.id);
          }}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors z-10 ${
            isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
          }`}
          title={isCompleted ? "标记为未完成" : "标记为已完成"}
        >
          <CheckCircle2 size={20} />
        </button>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6">
        <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2">
          {step.description}
        </p>
        
        <div className="flex items-center text-sm font-medium text-orange-500 group-hover:text-orange-600 transition-colors">
          <span>查看详情与避坑指南</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Progress indicator bar at bottom */}
      <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${isCompleted ? 'w-full bg-emerald-500' : 'w-0 bg-orange-400 group-hover:w-full opacity-30'}`} />
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'hard' | 'soft'>('hard');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const currentSteps = activeTab === 'hard' ? HARD_STEPS : SOFT_STEPS;
  const hardProgress = Math.round((HARD_STEPS.filter(s => completedSteps.has(s.id)).length / HARD_STEPS.length) * 100);
  const softProgress = Math.round((SOFT_STEPS.filter(s => completedSteps.has(s.id)).length / SOFT_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 selection:bg-orange-200">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-300" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-6"
          >
            <Info size={16} />
            <span>新手必看，少走弯路</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            小白装修指南
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl leading-relaxed"
          >
            装修是一场修行。本指南将装修分为「硬装」与「软装」两大阶段，为你梳理核心步骤与避坑要点，助你打造理想中的家。
          </motion.p>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 to-transparent" />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Tabs & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex p-1 bg-slate-200/50 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('hard')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'hard' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              硬装指南 (Hard Furnishing)
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'soft' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              软装指南 (Soft Furnishing)
            </button>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center gap-6 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">硬装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${hardProgress}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600">{hardProgress}%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium mb-1">软装进度</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>装修是一件充满期待的事，祝你早日住进理想的家。</p>
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
