import React, { useState, useMemo } from 'react';
import { 
  Wrench, CheckCircle2, AlertTriangle, ShieldCheck, 
  Calendar, Users, Truck, Copy, ChevronDown, ChevronUp, 
  FileText, ArrowRight, DollarSign, Flame, Clock, 
  Sparkles, CheckSquare, Layers, HelpCircle,
  Search, Filter, X, SlidersHorizontal, CheckCheck, Sofa,
  Home, Key, Lightbulb
} from 'lucide-react';
import { 
  MATERIAL_CATEGORIES, 
  MaterialItem, 
  MaterialCategory 
} from '../data/selfRenovationMaterials';
import RentalVsOwnerComparison from './RentalVsOwnerComparison';

export type { MaterialItem, MaterialCategory };
export { MATERIAL_CATEGORIES };

export interface WorkflowStage {
  stepNumber: string;
  name: string;
  duration: string;
  role: string;
  coreTasks: string[];
  ownerMustDo: string[];
  procurementArrival: string[];
  acceptanceCriteria: string[];
  pitfallWarning: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    stepNumber: '01',
    name: '物业审批、封窗测量与前期准备',
    duration: '2 - 5 天',
    role: '业主本人 + 封窗厂家 + 物业工程部',
    coreTasks: [
      '到物业办理装修施工许可证，签署《装修管理协议》，缴纳装修押金与垃圾清运费',
      '调取房屋原始建筑图纸（重点核实承重墙、剪力墙、配重墙、梁柱与管道井位置）',
      '封阳台/更换系统窗商家上门第一次初测尺寸并出设计方案',
      '购买开工临时物资：临时简易马桶（冲水用）、临时强电插座排插、工地临时挂灯'
    ],
    ownerMustDo: [
      '必须在开工前给工人购买「施工意外险/装修雇主责任险」（支付宝/微信保险搜，100-200元，保全家安心！自装无公司兜底，工人摔伤若无保险业主全责承担赔偿）',
      '实地测量全屋各房间净层高、梁下高、强弱电箱位置、下水主立管位置',
      '去楼下邻居家走访拜访并拍照存档天花板原始状态（为闭水试验对比留底，避免邻里扯皮）'
    ],
    procurementArrival: [
      '开工临时马桶、临时插排、入户防盗门保护套、电梯间楼道保护膜'
    ],
    acceptanceCriteria: [
      '物业装修许可证张贴于入户门外',
      '水电总阀门可正常开关且不漏水'
    ],
    pitfallWarning: '切勿省去工人意外险！自装业主就是法定雇主，工人一旦在工地发生意外磕碰摔伤，无保险情况下所有医疗和赔偿责任全部由业主自费承担！'
  },
  {
    stepNumber: '02',
    name: '主体拆改与建筑垃圾外运',
    duration: '3 - 7 天',
    role: '拆旧砸墙师傅 + 清运工人',
    coreTasks: [
      '用红漆在墙面标记“拆”字与“砌”字，严格按图纸砸除非承重墙',
      '铲除原厨房、卫生间、阳台内保温层（泡沫板/珍珠岩）直至红砖或混凝土基层',
      '铲除全屋原开发商劣质非耐水腻子/大白层，直至抹灰层',
      '新砌墙体开槽植入拉结钢筋（间距约50cm植筋），顶部斜砌蜈蚣脚防止后期沉降开裂',
      '建筑垃圾装袋、下楼，联系渣土清运车外运出小区至市政消纳场'
    ],
    ownerMustDo: [
      '砸墙第一天必须到场盯着！严禁工人偷懒横向开槽切断钢筋或破坏承重梁柱',
      '提前用塑料袋和胶带把厨房、卫生间、地漏下水管管口全部严密封死，防止砖石渣块掉入造成主立管爆管堵塞！'
    ],
    procurementArrival: [
      '新砌墙用轻体砖/红砖、水泥黄沙、植筋胶、建筑拉结钢筋'
    ],
    acceptanceCriteria: [
      '承重墙、配重墙零损伤；新砌墙体垂直平整；下水管口无掉渣堵塞；垃圾彻底清离现场'
    ],
    pitfallWarning: '谈拆除工钱必须约定“包工、装袋、搬运下楼、装车拉走外运出小区一口价包干”，绝不接受“只管砸不管运”或“按天点工”。'
  },
  {
    stepNumber: '03',
    name: '封阳台外框安装与设备初次交底',
    duration: '1 - 2 天',
    role: '封窗师傅 + 橱柜设计师 + 中央空调/新风工程师',
    coreTasks: [
      '封阳台安装外框主架，用膨胀螺栓牢固固定，外框与墙体接缝处打满发泡胶与高品质耐候硅酮胶',
      '全屋中央空调/新风系统/地暖工程师上门现场交底，标记内机吊装位置、穿梁打孔点位与排水管走向',
      '橱柜设计师第一次上门初测，出具厨房《水电点位设计图》（标明油烟机、洗碗机、蒸烤箱、燃气表、插座水路位置）'
    ],
    ownerMustDo: [
      '一定要在瓦工贴砖之前安装好窗框外框！这样瓦工才能用水泥砂浆包边并贴砖压框收口，才能彻底解决窗台雨水倒灌渗水问题',
      '核对橱柜水电图：大功率电器（烤箱、蒸箱、洗碗机）必须是4平方独立专线'
    ],
    procurementArrival: [
      '窗户铝合金主框及外立面五金配件'
    ],
    acceptanceCriteria: [
      '窗框水平垂直误差≤2mm，发泡胶密实无漏空，外侧防水耐候胶刮平无断裂'
    ],
    pitfallWarning: '窗框外侧打胶必须用专门的“外墙硅酮耐候密封胶”，切勿使用室内普通酸性玻璃胶，否则晒一两年就开裂漏雨！'
  },
  {
    stepNumber: '04',
    name: '水电隐蔽工程改造 (最核心阶段)',
    duration: '5 - 10 天',
    role: '专业水电师傅',
    coreTasks: [
      '根据橱柜水电图与全屋家具尺寸，在墙面弹出水平线并用墨线标记插座开关开槽位置',
      '水管走顶不走地，冷热水管分色分槽，间距≥15cm，左热右冷',
      '电线走墙走地，强弱电管间距≥30cm，交叉节点必须包裹专用锡箔纸屏蔽防电磁干扰',
      '全屋所有开关底盒内必须引拉“零线”（为以后随时升级智能开关做储备，不留零线以后改不了）',
      '水管铺设完毕后进行高压打压试验（8-10公斤稳压打压30分钟，压降不超过0.05MPa为合格）'
    ],
    ownerMustDo: [
      '拍照或录像全景留存全屋开槽布线走向图（包含尺寸标注），保存到网盘！未来在墙上打孔挂画、装电视装镜子才绝不会打爆水管电线！',
      '亲自去现场看水管打压试验，打压表指针必须亲自拍照记录！',
      '坚持点对点两点一线走线，坚决制止电工为了多卖管线恶意做90度大弯横平竖直！'
    ],
    procurementArrival: [
      '国标BV电线（2.5平方/4平方/6平方）、阻燃PVC穿线管及底盒、PPR热水管及管件、前置过滤器、全屋防臭地漏（潜水艇）'
    ],
    acceptanceCriteria: [
      '打压30分钟不掉压；线管内穿线截面积不超过管截面积40%（能轻松活线抽拉）；所有底盒标高水平一致'
    ],
    pitfallWarning: '水电工钱严禁按天算，必须按“建筑平米包干”或“点对点实际米数加封顶条款”。切勿让工人漫天绕线！'
  },
  {
    stepNumber: '05',
    name: '暖通设备安装 (中央空调/风管机/新风)',
    duration: '1 - 2 天',
    role: '空调/新风品牌官方安装师傅',
    coreTasks: [
      '中央空调室内机定位吊装，双螺母固定，并做好防尘塑料膜包裹保护',
      '铜管排布、充氮气保压焊接，排水管按1%排水坡度固定并做注水排水测试',
      '新风主机吊装、PE管送回风排布并做好消音降噪处理'
    ],
    ownerMustDo: [
      '检查内机出风口、回风口及检修口尺寸预留，确保木工吊顶能够准确对齐',
      '核验铜管打压保压表（通常充氮保压30-40公斤），拍照记录表压，等木工完工后再看是否有降压漏气'
    ],
    procurementArrival: [
      '中央空调/风管机室内机与配件、新风管道'
    ],
    acceptanceCriteria: [
      '排水测试顺畅无积水回流；内机水平无倾斜；保压压力表稳定无泄压'
    ],
    pitfallWarning: '排水管一定要做“倒水排坡测试”！工人常忽视排水坡度，入住后冷凝水倒灌泡烂木工吊顶石膏板！'
  },
  {
    stepNumber: '06',
    name: '瓦工工程与全屋防水 (最显手艺的阶段)',
    duration: '10 - 20 天',
    role: '专业泥瓦工师傅',
    coreTasks: [
      '卫生间下水立管用高阻尼隔音止震片+20mm吸音棉双层满包扎带固定，再砌砖包立管',
      '墙地面基层抹灰找平，阴阳角做圆弧角倒角处理',
      '卫生间防水涂刷：地面刚柔高聚物防水，墙面柔性防水刷至淋浴区封顶高度（≥2.0米），返墙30cm',
      '做满48小时闭水试验，亲自去楼下邻居家天花板确认无渗漏痕迹，合格后再做水泥砂浆保护层',
      '全瓷砖铺贴：满批C2级强效瓷砖胶+背胶，做45度海棠角碰角，卫生间地面做外高里低排水坡度并裁切地漏回字形'
    ],
    ownerMustDo: [
      '瓷砖到场当天必须开箱抽检产地（认准包装箱印有“广东佛山/清远”产区与优等品标识），核对色号与批次号一致',
      '贴砖前让瓦工师傅先做“地面排版预演”，避免大门入口处出现难看的小窄条碎砖',
      '亲自去楼下敲门检查闭水试验，并给楼下天花板拍高清视频存档'
    ],
    procurementArrival: [
      '全屋瓷砖（按实际面积+8%损耗备货）、C2级强效瓷砖胶（德高/雨虹）、背涂胶、防水涂料、地漏、门槛石过门石'
    ],
    acceptanceCriteria: [
      '全瓷砖空鼓率≤5%，单块砖中心严禁空鼓；45度海棠角接缝平直均匀；卫生间下水坡度顺畅无积水'
    ],
    pitfallWarning: '全瓷低吸水率砖严禁只用水泥黄沙铺贴！必须用正品C2级瓷砖胶薄贴，否则一两年后大面积空鼓脱落砸坏洁具！'
  },
  {
    stepNumber: '07',
    name: '门槛石安装与定制家具二次精准复尺',
    duration: '1 - 2 天',
    role: '石材安装工 + 全屋定制/橱柜设计师',
    coreTasks: [
      '瓦工阶段同步安装卫生间门槛石（过门石），并在门槛石下方刷一道堵漏王做防水坎',
      '瓦工墙地砖全部贴完、地面找平完成后，通知橱柜与全屋定制设计师上门进行第二次“最终精准复尺”',
      '确定定制柜体立面分割图、抽屉数量、铰链五金、拉手开孔及封板方案并最终下单生产（生产周期约20-35天）'
    ],
    ownerMustDo: [
      '复尺时必须核实：冰箱预留凹槽净宽、洗碗机嵌入高度、蒸烤箱开孔尺寸、通顶衣柜与吊顶衔接高度',
      '要求定制合同明确板材环保等级为国标 ENF 级（无醛添加MDI胶），柜门封边为PUR或激光封边'
    ],
    procurementArrival: [
      '过门石、窗台大理石板、止水坎堵漏王'
    ],
    acceptanceCriteria: [
      '门槛石两端卡进门洞墙根并打胶密实；全屋定制最终深化图纸签字确认'
    ],
    pitfallWarning: '定制柜下单周期极长（25-35天），瓦工贴完砖必须第一时间让设计师复尺下单，否则后期会严重拖延工期！'
  },
  {
    stepNumber: '08',
    name: '木工工程 (吊顶、窗帘盒与造型基层)',
    duration: '5 - 10 天',
    role: '专业木工师傅',
    coreTasks: [
      '吊顶全屋采用国标镀锌轻钢龙骨（主龙骨间距≤80cm，副龙骨间距≤40cm，吊杆间距≤100cm）',
      '吊顶所有转角处必须采用整块石膏板裁切成“L”型整板转角，严禁两块板直接拼接（防止后期开裂）',
      '客餐厅与所有卧室制作隐藏式窗帘盒（双轨宽20cm，深15-18cm），并在顶面预留欧松板受力加固打底与电动窗帘电源',
      '无主灯筒灯、射灯现场精准打孔，磁吸轨道预埋开槽加固'
    ],
    ownerMustDo: [
      '检查木工是否在空调内机处预留了检修口，出风口与回风口开孔是否平直',
      '检查石膏板接缝处是否倒“V”型角（便于油漆工嵌缝石膏填实防裂），自攻螺丝间距15-20cm且螺丝头沉入板面0.5-1mm'
    ],
    procurementArrival: [
      '轻钢龙骨、石膏板（龙牌/泰山）、阻燃欧松板、黑白自攻防锈螺丝、环保白乳胶'
    ],
    acceptanceCriteria: [
      '吊顶平整度误差≤2mm，受力龙骨稳固无晃动，窗帘盒内衬欧松板稳固'
    ],
    pitfallWarning: '坚决禁止转角处石膏板直线拼缝！必须做L型整板，石膏板螺丝必须做防锈漆涂刷，否则后期螺丝生锈返黄！'
  },
  {
    stepNumber: '09',
    name: '油漆工程 (找平、挂网、腻子与刷漆)',
    duration: '10 - 15 天',
    role: '专业油漆工/漆匠师傅',
    coreTasks: [
      '全屋原始水泥砂浆墙面滚涂品牌界面剂（墙锢）一道，防起砂防潮',
      '开槽处、石膏板拼接处及新旧墙交接处满贴耐碱玻纤网格布做防裂处理',
      '定制衣柜靠墙处、室内门套线处用底层找平石膏做“冲筋垂平”，确保阴阳角垂直度误差≤2mm',
      '全屋批刮 2 - 3 遍成品耐水腻子（每遍必须彻底干透后再刮下一遍）',
      '用 300瓦强光探照灯侧面打光精细打磨墙面，砂纸选用 240-320目细腻砂纸',
      '全屋滚涂乳胶漆：严格执行“一遍底漆 + 两遍面漆”（底漆抗碱防霉绝对不能省）'
    ],
    ownerMustDo: [
      '打磨完腻子后，晚上带强光手电筒去工地侧照验收！墙面不能有任何波浪纹、沙眼、划痕或凹凸不平！',
      '刷完乳胶漆后必须关窗阴干 3-5 天，切记严禁立刻大开窗户暴晒通风（否则漆膜表面风干过快必大面积龟裂脱皮）！'
    ],
    procurementArrival: [
      '耐水腻子粉（美巢/圣戈班）、轻质底层找平石膏、嵌缝石膏、网格布、PVC阳角条、品牌乳胶漆底漆与面漆'
    ],
    acceptanceCriteria: [
      '强光侧照平整无波浪；阴阳角方正垂直；漆面颜色均匀饱满、无流挂无透底'
    ],
    pitfallWarning: '常规施工队只做“顺平”，通顶大衣柜装上去侧面会露出1-2厘米大三角缝！在油漆工进场时必须交代：衣柜处必须冲筋做垂直！'
  },
  {
    stepNumber: '10',
    name: '厨卫吊顶、浴霸与烟道止逆阀安装',
    duration: '1 天',
    role: '铝扣板吊顶师傅 + 品牌浴霸安装工',
    coreTasks: [
      '厨房与卫生间安装集成吊顶（首选哑光纯白铝扣板，厚度≥0.6mm-0.7mm）',
      '在公共烟道与公共排气道口安装高品质全铜或ABS双叶片止逆阀，边缘涂抹结构胶并打防霉胶密封防反味',
      '安装卫生间智能风暖浴霸、凉霸与集成平板照明灯'
    ],
    ownerMustDo: [
      '烟道止逆阀一定要在吊顶封板之前亲自看着装好并打胶严密！楼下邻居炒辣椒闻不闻得到全靠这个止逆阀！'
    ],
    procurementArrival: [
      '优质烟道止逆阀（潜水艇）、厨卫哑光铝扣板及配套边条龙骨、风暖浴霸'
    ],
    acceptanceCriteria: [
      '扣板拼缝严密无起翘，止逆阀密封严实开合自如，浴霸运转平稳无异响'
    ],
    pitfallWarning: '切勿使用开发商配的劣质薄塑料止逆阀！半年就卡死漏油烟，必须自购潜水艇重力加弹簧双密封止逆阀。'
  },
  {
    stepNumber: '11',
    name: '全屋瓷砖耐污防霉美缝',
    duration: '1 - 2 天',
    role: '专业美缝师傅 (或自装屋主自己动手)',
    coreTasks: [
      '用清缝锥和吸尘器彻底清理瓷砖缝隙内的水泥黄沙灰尘，清缝深度≥2-3mm',
      '柔光砖/哑光砖缝隙两边必须涂抹美缝蜡，方便后期铲胶',
      '全屋打聚脲美缝剂或环氧彩砂，用压缝球或钨钢压缝片压平，干透后铲除余料'
    ],
    ownerMustDo: [
      '一定要在定制柜体进场之前把全屋美缝做完！如果柜子先装，柜子底下和靠墙边死角就永远做不了美缝，容易发霉积水生虫',
      '首选耐黄变聚脲美缝剂（浅色系阳光暴晒不发黄），认准十环环保认证'
    ],
    procurementArrival: [
      '聚脲美缝剂/环氧彩砂（卓高/德高/立邦）、清缝刀、压缝球、铲刀、美缝蜡'
    ],
    acceptanceCriteria: [
      '缝隙饱满平整无气泡、无凹陷、无断胶；砖面余胶铲除干净无残留'
    ],
    pitfallWarning: '切勿为了省钱用普通白水泥勾缝，半年就发黑长霉！美缝颜色选“与瓷砖颜色接近的浅色哑光”，切勿选闪闪发光的亮金色！'
  },
  {
    stepNumber: '12',
    name: '全屋定制柜体与橱柜安装',
    duration: '2 - 4 天',
    role: '全屋定制品牌专业安装师傅团队',
    coreTasks: [
      '按图纸拼装鞋柜、餐边柜、电视柜、通顶大衣柜、浴室柜框架与背板',
      '橱柜石英石台面现场裁切、安装，大单槽台下盆开孔并用云石胶+承重支架加固下挂',
      '安装柜门门板、调节百隆/海蒂诗阻尼铰链缝隙、安装抽屉滑轨与拉篮'
    ],
    ownerMustDo: [
      '师傅拼装柜体时现场监督，核查板材横截面是否为ENF级环保板材，封边是否严密',
      '台面开孔时让师傅接上吸尘器操作，减少室内石英石粉尘污染；水槽台下盆必须有承重金属支架加固！'
    ],
    procurementArrival: [
      '定制柜全套板材五金、石英石台面、厨房水槽大单槽、抽拉水龙头'
    ],
    acceptanceCriteria: [
      '柜门横平竖直缝隙均匀（缝宽约1.5-2mm）；抽屉抽拉阻尼顺畅；台下盆注满水无渗漏晃动'
    ],
    pitfallWarning: '台下盆绝对不能只靠玻璃胶粘！盛满水或放铁锅极易整体掉落，必须要求底部有金属承重托架支撑螺栓紧固！'
  },
  {
    stepNumber: '13',
    name: '木门、钛镁合金极简门与踢脚线安装',
    duration: '1 - 2 天',
    role: '木门安装师傅 + 踢脚线师傅',
    coreTasks: [
      '安装卧室木门门套基层板与门框，用发泡胶固定发泡胶固化后切除多余胶体',
      '挂门扇，安装静音磁吸门锁、加厚不锈钢轴承合页（每樘门3只合页）与地吸',
      '安装厨房、卫生间极窄钛镁合金超白玻璃移门',
      '全屋通铺安装超薄铝合金极简踢脚线或实木复合踢脚线'
    ],
    ownerMustDo: [
      '检查木门门缝：上方及左右两侧门缝各留2-3mm，门底缝预留5-8mm（不刮地毯不透风）',
      '开关门测试磁吸锁是否灵敏顺畅，关门是否严丝合缝无撞击异响'
    ],
    procurementArrival: [
      '室内木门及门套、静音磁吸锁、304合页、门吸、玻璃移门、金属踢脚线'
    ],
    acceptanceCriteria: [
      '门扇在任意角度停住不自动溜门关门；门套与墙壁贴合紧密打胶美观；锁舌弹出灵敏'
    ],
    pitfallWarning: '门装好后如果自动往前关或往后滑，说明门框没有垂直安装！必须当场让师傅重新调整水平垂直度。'
  },
  {
    stepNumber: '14',
    name: '开关插座面板、全屋灯具与卫浴五金安装',
    duration: '1 - 2 天',
    role: '专业电工师傅 + 洁具安装工',
    coreTasks: [
      '全屋开关插座面板接线安装（左零N右火L，中间接地E，用相位检测仪逐个测试）',
      '安装无主灯射灯、筒灯、磁吸轨道灯具、卧室吸顶灯、餐边吊灯',
      '安装智能马桶、恒温花洒、浴室一体陶瓷盆浴室柜、毛巾架'
    ],
    ownerMustDo: [
      '买一个十几块钱的“三孔插座相位检测仪”，逐个插进全屋每一个插座，检查是否有地线缺失或零火线反接！',
      '马桶安装底座坚决禁止用水泥封底（水泥膨胀必撑裂马桶底座！），必须使用优质防霉中性硅酮玻璃胶密封。'
    ],
    procurementArrival: [
      '开关插座面板（施耐德/西门子/公牛）、全屋灯具、智能马桶、花洒、角阀软管（潜水艇）、防霉中性玻璃胶（瓦克/百得）'
    ],
    acceptanceCriteria: [
      '全屋插座通电测试正常零火地无错接；花洒龙头冷热水通畅无渗水；马桶冲水虹吸顺畅'
    ],
    pitfallWarning: '角阀和软管千万别用买花洒附赠的廉价杂牌！一定要自己买潜水艇纯铜防爆角阀，爆一个水浸全屋几十万！'
  },
  {
    stepNumber: '15',
    name: '开荒深度精细保洁 (彻底清除施工痕迹)',
    duration: '1 天',
    role: '专业保洁团队 (或自装屋主全家总动员)',
    coreTasks: [
      '大块建筑垃圾与保护膜全面撕除收纳清运',
      '用工业大功率吸尘器彻底吸除窗轨、抽屉滑轨、天花吊顶缝隙石膏粉尘',
      '双面玻璃擦清洗窗户玻璃内外侧，刮净水泥点与胶痕',
      '地板、地砖表面使用中性清洁剂拖洗干净'
    ],
    ownerMustDo: [
      '千万叮嘱保洁师傅：严禁使用钢丝球擦拭花洒电镀层、黑色水龙头和柔光砖！（钢丝球一擦表面全划伤报废！）',
      '严禁使用草酸等强酸洗剂清洗地砖和不锈钢五金（强酸会导致金属迅速氧化发黑生锈）'
    ],
    procurementArrival: [
      '玻璃刮刀、除胶剂、工业吸尘器、羊毛地拖、无痕魔术擦'
    ],
    acceptanceCriteria: [
      '全屋窗槽无灰尘；瓷砖地板光洁无脚印污渍；玻璃通透无灰斑'
    ],
    pitfallWarning: '一定要在家具和软装窗帘进场前做深度保洁！家具一旦搬进来，死角粉尘再也吸不干净。'
  },
  {
    stepNumber: '16',
    name: '窗帘挂装、家具大家电进场与除醛通风',
    duration: '持续 1 - 3 个月',
    role: '家具送装团队 + 家电售后工程师 + 业主本人',
    coreTasks: [
      '挂装客餐厅窗帘（先熨烫再挂褶皱更垂顺），调试电动窗帘电机行程',
      '床垫、沙发、餐桌椅、成品家具送货上门安装，搬运时注意门套与地面防刮碰',
      '冰箱、洗衣机、电视、微蒸烤一体机、燃气灶安装调试',
      '开启科学除醛通风：开窗通风为主，搭配工业大风扇对准窗外吹加速空气置换'
    ],
    ownerMustDo: [
      '家具进场时在门框套线上贴防撞护角，地面铺纸板，防止工人搬床垫磕破乳胶漆和门套！',
      '科学除醛真理：开窗对流风远超任何除醛喷剂/绿萝炭包！密闭增温加湿几天后再开大风扇猛吹效果最佳。'
    ],
    procurementArrival: [
      '窗帘成品、家具床垫、大家电、工业强力落地大风扇（50-100元）'
    ],
    acceptanceCriteria: [
      '所有家电运转正常，排水顺畅；室内空气检测甲醛与TVOC达标安全（国标标准≤0.08mg/m³）'
    ],
    pitfallWarning: '刚刷完乳胶漆不要立刻开大风扇吹！通风除醛应在油漆干透一周后、家具全部进场散味时再开窗加速通风。'
  }
];

export default function SelfRenovationGuide({ onNavigateToSoft }: { onNavigateToSoft?: () => void }) {
  const [subTab, setSubTab] = useState<'materials' | 'workflow' | 'workers'>('materials');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [activeMaterialCategoryIndex, setActiveMaterialCategoryIndex] = useState<number>(0);
  const [materialSearch, setMaterialSearch] = useState<string>('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'online_only' | '线上品牌旗舰店' | '线下专卖店/市场' | '线上线下均可'>('all');
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'owner' | 'rental'>('all');
  const [showRentalGuide, setShowRentalGuide] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'stage' | 'all'>('stage');

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('self_reno_completed_steps');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [completedMaterials, setCompletedMaterials] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('self_reno_completed_materials');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleStep = (stepNum: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepNum)) {
        next.delete(stepNum);
      } else {
        next.add(stepNum);
      }
      try {
        localStorage.setItem('self_reno_completed_steps', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleMaterial = (matId: string) => {
    setCompletedMaterials(prev => {
      const next = new Set(prev);
      if (next.has(matId)) {
        next.delete(matId);
      } else {
        next.add(matId);
      }
      try {
        localStorage.setItem('self_reno_completed_materials', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const progressPercent = Math.round((completedSteps.size / WORKFLOW_STAGES.length) * 100);

  // Total material items count
  const totalMaterialCount = MATERIAL_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedMaterialCount = completedMaterials.size;
  const materialPercent = Math.round((completedMaterialCount / totalMaterialCount) * 100);

  // Filtered categories and items based on search, channel and purpose
  const filteredCategories = useMemo(() => {
    return MATERIAL_CATEGORIES.map(cat => {
      const items = cat.items.filter(item => {
        const query = materialSearch.trim().toLowerCase();
        const matchSearch = !query || 
          item.name.toLowerCase().includes(query) ||
          item.specs.toLowerCase().includes(query) ||
          item.brands.toLowerCase().includes(query) ||
          item.tips.toLowerCase().includes(query) ||
          item.dosage.toLowerCase().includes(query) ||
          item.estimatedCost.toLowerCase().includes(query) ||
          (item.ownerRecommendation && item.ownerRecommendation.toLowerCase().includes(query)) ||
          (item.rentalRecommendation && item.rentalRecommendation.toLowerCase().includes(query));
        
        const matchChannel = channelFilter === 'all' 
          ? true 
          : channelFilter === 'online_only'
            ? (item.channel === '线上品牌旗舰店' || item.channel === '线上线下均可')
            : item.channel === channelFilter;

        let matchPurpose = true;
        if (purposeFilter === 'owner') {
          matchPurpose = !item.purposeTag || item.purposeTag === '🏡 自住品质优选' || item.purposeTag === '⚖️ 自住出租通用底线';
        } else if (purposeFilter === 'rental') {
          matchPurpose = !item.purposeTag || item.purposeTag === '🔑 出租高性价比' || item.purposeTag === '⚖️ 自住出租通用底线';
        }

        return matchSearch && matchChannel && matchPurpose;
      });
      return {
        ...cat,
        items
      };
    });
  }, [materialSearch, channelFilter, purposeFilter]);

  const totalFilteredCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  const handleCopyFullMaterials = () => {
    let fullText = '【自装全屋详细物料采购与施工进场清单（8大阶段完整版）】\n\n';
    MATERIAL_CATEGORIES.forEach(cat => {
      fullText += `==========================================\n`;
      fullText += `📌 ${cat.categoryName} (${cat.phase})\n`;
      fullText += `💰 预算参考: ${cat.budgetRef}\n`;
      fullText += `📝 阶段说明: ${cat.description}\n`;
      fullText += `------------------------------------------\n`;
      cat.items.forEach((item, idx) => {
        const status = completedMaterials.has(item.id) ? '[已备齐] ' : '[待采购] ';
        fullText += `${idx + 1}. ${status}【${item.name}】\n`;
        fullText += `   • 规格标准: ${item.specs}\n`;
        fullText += `   • 预估用量: ${item.dosage}\n`;
        fullText += `   • 参考预算: ${item.estimatedCost}\n`;
        fullText += `   • 采购时机: ${item.timing}\n`;
        fullText += `   • 采购渠道: ${item.channel}\n`;
        fullText += `   • 推荐品牌: ${item.brands}\n`;
        if (item.ownerRecommendation) fullText += `   • 🏡 自住建议: ${item.ownerRecommendation}\n`;
        if (item.rentalRecommendation) fullText += `   • 🔑 出租建议: ${item.rentalRecommendation}\n`;
        fullText += `   • 选购避坑: ${item.tips}\n\n`;
      });
    });
    handleCopyText(fullText, 'full_materials');
  };

  const handleCopyOwnerMaterials = () => {
    let fullText = '【🏡 自装硬装主辅材 · 自住品质与长期耐用采购单】\n\n';
    MATERIAL_CATEGORIES.forEach(cat => {
      const items = cat.items.filter(it => !it.purposeTag || it.purposeTag === '🏡 自住品质优选' || it.purposeTag === '⚖️ 自住出租通用底线');
      if (items.length === 0) return;
      fullText += `------------------------------------------\n`;
      fullText += `📌 ${cat.categoryName}\n`;
      fullText += `------------------------------------------\n`;
      items.forEach((item, idx) => {
        fullText += `${idx + 1}. 【${item.name}】\n`;
        fullText += `   • 推荐品牌: ${item.brands}\n`;
        if (item.ownerRecommendation) fullText += `   • 🏡 自住方案: ${item.ownerRecommendation}\n`;
        fullText += `   • 施工避坑: ${item.tips}\n\n`;
      });
    });
    handleCopyText(fullText, 'owner_materials');
  };

  const handleCopyRentalMaterials = () => {
    let fullText = '【🔑 自装硬装主辅材 · 房东出租高性价比防坑采购单】\n\n';
    fullText += '💡 房东原则：水电防水底线坚决保质，装饰表面材料选耐磨好打理高性价比！\n\n';
    MATERIAL_CATEGORIES.forEach(cat => {
      const items = cat.items.filter(it => !it.purposeTag || it.purposeTag === '🔑 出租高性价比' || it.purposeTag === '⚖️ 自住出租通用底线');
      if (items.length === 0) return;
      fullText += `------------------------------------------\n`;
      fullText += `📌 ${cat.categoryName}\n`;
      fullText += `------------------------------------------\n`;
      items.forEach((item, idx) => {
        fullText += `${idx + 1}. 【${item.name}】\n`;
        if (item.rentalRecommendation) fullText += `   • 🔑 出租高性价比方案: ${item.rentalRecommendation}\n`;
        fullText += `   • 防踩坑要点: ${item.tips}\n\n`;
      });
    });
    handleCopyText(fullText, 'rental_materials');
  };

  const handleCopyOnlineMaterials = () => {
    let onlineText = '【🛒 自装建议网上购买的物品清单（正品旗舰店/高性价比抄作业版）】\n\n';
    onlineText += '💡 为什么建议网购？规格高度标准化、假货率低、大促折扣大、免去线下建材城层层加价加码，送货上楼省心省力！\n\n';
    MATERIAL_CATEGORIES.forEach(cat => {
      const onlineItems = cat.items.filter(it => it.channel === '线上品牌旗舰店' || it.channel === '线上线下均可');
      if (onlineItems.length === 0) return;

      onlineText += `------------------------------------------\n`;
      onlineText += `📦 ${cat.categoryName} (进场节点: ${cat.phase})\n`;
      onlineText += `------------------------------------------\n`;
      onlineItems.forEach((item, idx) => {
        const status = completedMaterials.has(item.id) ? '[已备齐] ' : '[待下单] ';
        onlineText += `${idx + 1}. ${status}【${item.name}】\n`;
        onlineText += `   • 推荐规格: ${item.specs}\n`;
        onlineText += `   • 预估用量: ${item.dosage}\n`;
        onlineText += `   • 参考价格: ${item.estimatedCost}\n`;
        onlineText += `   • 推荐品牌/店铺: ${item.brands}\n`;
        onlineText += `   • 提前采购时机: ${item.timing}\n`;
        onlineText += `   • 避坑提示: ${item.tips}\n\n`;
      });
    });
    handleCopyText(onlineText, 'online_materials');
  };

  const WORKER_FINDING_TIPS = [
    {
      title: '渠道一：本小区正在施工的邻居家“截胡”（最稳靠！）',
      desc: '直接在同单元或同楼盘看哪家在装修，进门实地看师傅手艺：看工地干不干净、水管走得顺不顺、瓷砖贴得平不平。手艺好的师傅直接要电话，问邻居师傅脾气和要价。这种师傅往往就在小区里干，省下路上奔波，补活最方便！'
    },
    {
      title: '渠道二：本地建材五金店 / 品牌瓷砖店老板转介绍',
      desc: '卖德高防水、伟星水管、佛山瓷砖的小店老板，常年接触本地成百上千个瓦工和水电工。他们最清楚哪个师傅手艺过硬从不糟蹋好砖好料。买料时直接让老板推荐 2-3 个手艺最好的老师傅电话。'
    },
    {
      title: '渠道三：滚雪球转介绍（好师傅只跟好师傅搭档）',
      desc: '只要你第一步找准了一个认真负责的水电工，通常他合作过十几个瓦工木工，直接问他：“师傅，你常搭档的瓦工里哪个手艺最稳、海棠角切得最漂亮？”优秀匠人间往往有默契，工种配合更顺畅。'
    },
    {
      title: '渠道四：社交平台同城真实自装案例反查',
      desc: '在小红书/抖音搜索“城市名 + 自装工人推荐”，找本地自装业主完工半年以上的真实分享，私信要师傅联系方式。但务必去他正在施工的现场看一次实物，切忌只看精修网图。'
    }
  ];

  const AGREEMENT_TEMPLATES = [
    {
      id: 'safety_clause',
      title: '自装师傅必备《施工人身安全与意外免责协议条款》',
      content: `【自装施工安全与责任协议】
甲方（业主）：_________________   乙方（施工师傅）：_________________ 身份证号：_________________
1. 甲方已出资为乙方（及乙方现场作业人员）投保施工期间商业意外伤害险/雇主责任险。
2. 乙方承诺具备相应工种专业施工技能与安全常识，进入施工现场必须严格执行安全规程（含登高作业穿戴防护、电动工具安全绝缘、严禁酒后上岗、严禁违规动用明火等）。
3. 因乙方自身违规操作、擅自破坏承重结构、疏忽大意或个人疾病导致的人身伤害或第三方财产损失，由乙方自行承担法律与经济责任，与甲方无关。
4. 施工完毕每天离场前，乙方必须关闭水电路总阀门及门窗，确保现场无明火安全隐患。
甲方（签字）：                 乙方（签字）：                 日期：`
    },
    {
      id: 'payment_clause',
      title: '自装防扯皮《工费分段验收合格付款协议条款》',
      content: `【工费包干与分段付款约定】
1. 本项工程（工种名称：________）实行一口价包干总价：人民币 ________ 元整。包含约定工作量内的全部人工、工具损耗及工艺要求，中途不得以任何理由借口增加人工费用。
2. 实行三段式验收合格分期付款：
   ① 开工进场第一天交底并开工，支付预付款 10%（计 ____ 元）；
   ② 工序施工完成，经甲方现场根据国家规范初步验收合格，支付中期进度款 60%（计 ____ 元）；
   ③ 经下一道工序施工方交接无异议，且最终全项验收合格后 3 日内，付清剩余 30% 尾款（计 ____ 元）。
3. 若施工质量达不到约定验收标准（如瓷砖大面积空鼓、平整度误差超标、水压测试漏水等），乙方必须在 3 日内无条件免费返工修复；拒绝返工或严重拖延工期者，甲方有权终止协议并扣除相应尾款另请他人修复。
甲方（签字）：                 乙方（签字）：                 日期：`
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles size={14} className="text-amber-400" />
            <span>自装通关秘籍 · 自己当工长省下 30%~40% 预算</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            小白自装全景实操指南
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            不给装修公司交管理费和中间商抽成！把 16 步核心施工工序、找师傅秘诀、物料进场倒排表与安全合同模板梳理清晰。只要把控好<strong>工种进场衔接</strong>与<strong>分段验收付款</strong>，自装既省大钱又住得踏实放心！
          </p>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>自装 16 步工序整体进度</span>
              <span className="text-indigo-400 font-bold">{completedSteps.size} / {WORKFLOW_STAGES.length} 步完成 ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Sub Tabs Selector */}
      <div className="flex flex-wrap p-1.5 bg-slate-200/70 rounded-2xl gap-1.5 shadow-inner">
        <button
          onClick={() => setSubTab('materials')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            subTab === 'materials'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Layers size={16} />
          <span>📋 详情物料清单 (7大阶段·规格用量)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
            {completedMaterialCount}/{totalMaterialCount}
          </span>
        </button>

        <button
          onClick={() => setSubTab('workflow')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            subTab === 'workflow'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Calendar size={16} />
          <span>🧭 16步工序全景推进 (交底与验收)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
            {completedSteps.size}/{WORKFLOW_STAGES.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('workers')}
          className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            subTab === 'workers'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Users size={16} />
          <span>🤝 找师傅与签约协议 (免责合同)</span>
        </button>
      </div>

      {/* VIEW 1: MATERIALS CHECKLIST */}
      {subTab === 'materials' && (
        <div className="space-y-6">
          {/* Quick Jump to Soft Furnishing List Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/60 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sofa size={18} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <span>正在寻找沙发、床垫、家电、灯具、窗帘等软装物品清单？</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800">已上线</span>
                </div>
                <div className="text-xs text-emerald-700 mt-0.5">
                  已整理全套「全屋软装物品采购清单」，带网购与实体店标记、源头产业带与避坑指南
                </div>
              </div>
            </div>
            {onNavigateToSoft && (
              <button
                onClick={onNavigateToSoft}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-xs"
              >
                <span>立即打开【软装清单】</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Search, Filter & Quick Action Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={materialSearch}
                  onChange={(e) => setMaterialSearch(e.target.value)}
                  placeholder="搜索物料名称、推荐品牌、规格型号或避坑关键词（如：地漏、伟星、电线、瓷砖胶...）"
                  className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
                />
                {materialSearch && (
                  <button 
                    onClick={() => setMaterialSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                    title="清空搜索"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyOnlineMaterials}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="仅提取并复制适合在京东/天猫官方旗舰店采购的五金、电器与辅料"
                >
                  <Copy size={14} />
                  <span>{copiedKey === 'online_materials' ? '已复制网购清单！' : '🛒 复制网购清单'}</span>
                </button>

                <button
                  onClick={handleCopyOwnerMaterials}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors"
                  title="提取适合自住的高品质、静音、环保主辅材方案"
                >
                  <Home size={14} />
                  <span>{copiedKey === 'owner_materials' ? '已复制自住单！' : '🏡 复制自住单'}</span>
                </button>

                <button
                  onClick={handleCopyRentalMaterials}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 flex items-center justify-center gap-1.5 transition-colors"
                  title="提取适合出租的高性价比、耐磨易清洁、保底线主辅材方案"
                >
                  <Key size={14} />
                  <span>{copiedKey === 'rental_materials' ? '已复制出租单！' : '🔑 复制出租单'}</span>
                </button>

                <button
                  onClick={handleCopyFullMaterials}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Copy size={14} />
                  <span>{copiedKey === 'full_materials' ? '已复制全屋总清单！' : '复制全屋总单'}</span>
                </button>

                {/* View Mode Toggle */}
                <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
                  <button
                    onClick={() => setViewMode('stage')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'stage' 
                        ? 'bg-white text-indigo-700 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    按阶段
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'all' 
                        ? 'bg-white text-indigo-700 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    平铺全览
                  </button>
                </div>
              </div>
            </div>

            {/* Purpose Filter & Guide Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                  <Home size={13} className="text-indigo-600" />
                  用途分类:
                </span>
                <button
                  onClick={() => setPurposeFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    purposeFilter === 'all'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  全部用途
                </button>
                <button
                  onClick={() => setPurposeFilter('owner')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    purposeFilter === 'owner'
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  <Home size={12} />
                  <span>🏡 仅看自住优选（高环保·静音·高耐用）</span>
                </button>
                <button
                  onClick={() => setPurposeFilter('rental')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    purposeFilter === 'rental'
                      ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-200'
                      : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
                  }`}
                >
                  <Key size={12} />
                  <span>🔑 仅看出租配置（回本快·耐造·防扯皮）</span>
                </button>
              </div>

              <button
                onClick={() => setShowRentalGuide(!showRentalGuide)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  showRentalGuide
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Lightbulb size={13} className="text-amber-500 fill-amber-500" />
                <span>{showRentalGuide ? '收起自住vs出租差异指南' : '💡 自住 vs 出租选材差异与避坑指南'}</span>
              </button>
            </div>

            {/* Expandable Rental vs Owner Comparison Guide */}
            {showRentalGuide && (
              <div className="pt-2">
                <RentalVsOwnerComparison 
                  currentPurpose={purposeFilter}
                  onSelectPurpose={(p) => setPurposeFilter(p)}
                />
              </div>
            )}

            {/* Filter Pills & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
                  <Filter size={13} />
                  渠道筛选:
                </span>
                <button
                  onClick={() => setChannelFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    channelFilter === 'all'
                      ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                      : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  全部渠道
                </button>
                <button
                  onClick={() => setChannelFilter('online_only')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    channelFilter === 'online_only'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <span>🛒 仅看适合网上买 (网购清单)</span>
                </button>
                {(['线上品牌旗舰店', '线下专卖店/市场', '线上线下均可'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setChannelFilter(ch)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      channelFilter === ch
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                        : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
                {(materialSearch || channelFilter !== 'all' || purposeFilter !== 'all') && (
                  <button
                    onClick={() => { setMaterialSearch(''); setChannelFilter('all'); setPurposeFilter('all'); }}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-1 underline cursor-pointer"
                  >
                    重置筛选条件
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {materialSearch || channelFilter !== 'all' || purposeFilter !== 'all' ? (
                  <span className="text-indigo-600 font-bold">
                    匹配到 {totalFilteredCount} 项物料
                  </span>
                ) : (
                  <span>
                    全屋物料库共 <strong className="text-slate-800">{totalMaterialCount}</strong> 项 · 已备齐 <strong className="text-emerald-600">{completedMaterialCount}</strong> 项 ({materialPercent}%)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stage Buttons (in stage mode) */}
          {viewMode === 'stage' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck size={14} className="text-indigo-600" />
                  自装 8 大施工阶段物料分批导航
                </span>
                <span className="text-xs text-indigo-600 font-bold">
                  点击切换查看各工序进场物料
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {MATERIAL_CATEGORIES.map((cat, idx) => {
                  const isCatActive = activeMaterialCategoryIndex === idx;
                  const catDone = cat.items.filter(i => completedMaterials.has(i.id)).length;
                  const catTotal = cat.items.length;
                  const isAllDone = catDone === catTotal && catTotal > 0;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveMaterialCategoryIndex(idx)}
                      className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                        isCatActive
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : isAllDone
                            ? 'bg-emerald-50/60 text-slate-800 border-emerald-200 hover:border-emerald-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-[10px] font-black ${isCatActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {cat.categoryName.split(' ')[0]}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isCatActive 
                            ? 'bg-white/20 text-white' 
                            : isAllDone
                              ? 'bg-emerald-200 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                        }`}>
                          {catDone}/{catTotal}
                        </span>
                      </div>
                      <span className="text-xs font-bold line-clamp-1 leading-tight">
                        {cat.categoryName.split(' ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RENDER CATEGORIES */}
          {(() => {
            const categoriesToRender = viewMode === 'all' 
              ? filteredCategories 
              : [filteredCategories[activeMaterialCategoryIndex]];

            return (
              <div className="space-y-6">
                {categoriesToRender.map((currentCat) => {
                  if (currentCat.items.length === 0 && (materialSearch || channelFilter !== 'all')) {
                    return null;
                  }

                  const copyTextForCategory = `【自装物料采购单 - ${currentCat.categoryName}】\n` + 
                    `进场时机: ${currentCat.phase} | 预算参考: ${currentCat.budgetRef}\n` +
                    currentCat.items.map(it => `• ${it.name} | 规格: ${it.specs} | 用量: ${it.dosage} | 预算: ${it.estimatedCost} | 品牌: ${it.brands}`).join('\n');

                  return (
                    <div key={currentCat.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                      {/* Category Header */}
                      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-semibold">
                              <span>进场时机：{currentCat.phase}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                              <span>阶段预算参考：{currentCat.budgetRef}</span>
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-2xl font-black text-white">
                            {currentCat.categoryName}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-300">
                            {currentCat.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCopyText(copyTextForCategory, `cat_${currentCat.id}`)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-1.5 transition-colors shrink-0"
                        >
                          <Copy size={14} />
                          <span>{copiedKey === `cat_${currentCat.id}` ? '已复制本阶段清单' : '复制本阶段清单发给商家'}</span>
                        </button>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-slate-100 p-2 sm:p-4">
                        {currentCat.items.length === 0 ? (
                          <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                            当前筛选条件下暂无此阶段匹配物料
                          </div>
                        ) : (
                          currentCat.items.map((item) => {
                            const isPurchased = completedMaterials.has(item.id);

                            return (
                              <div
                                key={item.id}
                                className={`p-4 sm:p-5 rounded-2xl transition-all ${
                                  isPurchased ? 'bg-emerald-50/30 opacity-75' : 'hover:bg-slate-50'
                                }`}
                              >
                                {/* Item Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2.5">
                                  <div className="flex items-start gap-3">
                                    <button
                                      type="button"
                                      onClick={() => toggleMaterial(item.id)}
                                      className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors cursor-pointer ${
                                        isPurchased
                                          ? 'bg-emerald-500 border-emerald-500 text-white'
                                          : 'border-slate-300 bg-white hover:border-indigo-500'
                                      }`}
                                      title={isPurchased ? "标记为未备齐" : "标记为已备齐/已送达"}
                                    >
                                      {isPurchased && <CheckCircle2 size={14} />}
                                    </button>
                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                          <span className={isPurchased ? 'line-through text-slate-400' : ''}>
                                            {item.name}
                                          </span>
                                        </h4>
                                        {item.purposeTag && (
                                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                            item.purposeTag.includes('自住品质')
                                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                              : item.purposeTag.includes('出租高性价比')
                                                ? 'bg-teal-50 text-teal-800 border-teal-200'
                                                : item.purposeTag.includes('底线')
                                                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                                          }`}>
                                            {item.purposeTag}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-indigo-700 font-medium mt-0.5">
                                        📐 规格标准：{item.specs}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-1.5 shrink-0 pl-8 sm:pl-0">
                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                      💰 {item.estimatedCost}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                      📦 用量：{item.dosage}
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                      🛒 {item.channel}
                                    </span>
                                  </div>
                                </div>

                                {/* Timing note */}
                                {item.timing && (
                                  <div className="text-xs text-slate-500 mb-2 pl-8 flex items-center gap-1.5">
                                    <Clock size={12} className="text-indigo-500 shrink-0" />
                                    <span>采购送达时机：<strong className="text-slate-700">{item.timing}</strong></span>
                                  </div>
                                )}

                                {/* Owner vs Rental Dual Comparison Cards */}
                                {(item.ownerRecommendation || item.rentalRecommendation) && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5 pl-8">
                                    {item.ownerRecommendation && (
                                      <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                                          <Home size={13} className="text-indigo-600" />
                                          <span>🏡 自住方案（品质·舒适·耐用）</span>
                                        </div>
                                        <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                                          {item.ownerRecommendation}
                                        </p>
                                      </div>
                                    )}

                                    {item.rentalRecommendation && (
                                      <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                                          <Key size={13} className="text-teal-700" />
                                          <span>🔑 出租方案（高性价比·易洁·回本快）</span>
                                        </div>
                                        <p className="text-xs text-teal-950 font-medium leading-relaxed">
                                          {item.rentalRecommendation}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Specs, Brands and Tips grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm pl-8">
                                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                                    <span className="font-bold text-slate-700 flex items-center gap-1 text-xs">
                                      ⭐ 大厂推荐品牌（抄作业）：
                                    </span>
                                    <p className="text-slate-800 font-medium leading-relaxed">
                                      {item.brands}
                                    </p>
                                  </div>

                                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-1">
                                    <span className="font-bold text-amber-900 flex items-center gap-1 text-xs">
                                      🔍 选购避坑与真假核验：
                                    </span>
                                    <p className="text-slate-700 leading-relaxed">
                                      {item.tips}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 2: WORKFLOW STAGES */}
      {subTab === 'workflow' && (
        <div className="space-y-6">
          {/* Navigation tabs for the 16 steps */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" />
                <span>自装 16 步工序排期推进表 (点击快速跳转查看要点)</span>
              </h3>
              <span className="text-xs text-slate-400">勾选复选框可记录你的自装实际进度</span>
            </div>

            {/* Scrollable pills for all 16 steps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {WORKFLOW_STAGES.map((stage, idx) => {
                const isCompleted = completedSteps.has(stage.stepNumber);
                const isCurrent = activeStageIndex === idx;

                return (
                  <button
                    key={stage.stepNumber}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                      isCurrent 
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm' 
                        : isCompleted
                          ? 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-300'
                          : 'border-slate-200 bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-black ${
                        isCurrent ? 'text-indigo-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        #{stage.stepNumber}
                      </span>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStep(stage.stepNumber);
                        }}
                        className={`w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-colors ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'border border-slate-300 hover:border-indigo-400'
                        }`}
                        title={isCompleted ? "标记为未完成" : "标记为已完成"}
                      >
                        {isCompleted && <CheckCircle2 size={12} />}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
                      {stage.name.split('、')[0].split('与')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Card */}
          {(() => {
            const cur = WORKFLOW_STAGES[activeStageIndex];
            const isDone = completedSteps.has(cur.stepNumber);

            return (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-black tracking-wider uppercase">
                        工序节点 #{cur.stepNumber}
                      </span>
                      <span className="text-xs text-slate-300 flex items-center gap-1">
                        <Clock size={13} className="text-amber-400" />
                        参考工期：{cur.duration}
                      </span>
                      <span className="text-xs text-slate-300 flex items-center gap-1">
                        <Users size={13} className="text-indigo-400" />
                        进场角色：{cur.role}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-black text-white">
                      {cur.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleStep(cur.stepNumber)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                        isDone 
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      <span>{isDone ? '已完成此节点' : '标记为已完成'}</span>
                    </button>
                  </div>
                </div>

                {/* Content Details Grid */}
                <div className="p-5 sm:p-8 space-y-6">
                  {/* Core Tasks & Owner Must Do */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Core Tasks */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Wrench size={16} className="text-indigo-600" />
                        <span>本阶段核心施工内容 (师傅干什么)</span>
                      </h4>
                      <ul className="space-y-2">
                        {cur.coreTasks.map((task, i) => (
                          <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Owner Must Do */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-amber-600" />
                        <span>自装业主必做与监工要点 (你必须盯什么)</span>
                      </h4>
                      <ul className="space-y-2">
                        {cur.ownerMustDo.map((task, i) => (
                          <li key={i} className="text-xs sm:text-sm text-amber-950 flex items-start gap-2 leading-relaxed font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Material Procurement & Acceptance Criteria */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Material Arrival */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2.5">
                      <h4 className="text-xs sm:text-sm font-bold text-blue-900 flex items-center gap-2">
                        <Truck size={16} className="text-blue-600" />
                        <span>本阶段必须提前备好/送达的材料清单</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {cur.procurementArrival.map((item, i) => (
                          <li key={i} className="text-xs sm:text-sm text-blue-950 flex items-start gap-2 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Acceptance Criteria */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2.5">
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-900 flex items-center gap-2">
                        <CheckSquare size={16} className="text-emerald-600" />
                        <span>完工合格验收标准 (不合格绝不付尾款)</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {cur.acceptanceCriteria.map((item, i) => (
                          <li key={i} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pitfall Warning */}
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-900 flex items-start gap-2.5 leading-relaxed">
                    <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-700">🚨 自装翻车警示：</strong>
                      <span>{cur.pitfallWarning}</span>
                    </div>
                  </div>

                  {/* Prev/Next buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      disabled={activeStageIndex === 0}
                      onClick={() => setActiveStageIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      ← 上一步工序
                    </button>
                    <span className="text-xs text-slate-400 font-medium">
                      {activeStageIndex + 1} / {WORKFLOW_STAGES.length}
                    </span>
                    <button
                      disabled={activeStageIndex === WORKFLOW_STAGES.length - 1}
                      onClick={() => setActiveStageIndex(prev => Math.min(WORKFLOW_STAGES.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      下一步工序 →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 3: WORKERS & AGREEMENT */}
      {subTab === 'workers' && (
        <div className="space-y-6">
          {/* Part 3: How to Find & Negotiate with Workers */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                <Users size={22} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  自装怎么找靠谱师傅？4 大黄金挖掘渠道与考察方法
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  自装最怕遇到半吊子师傅或做一半加价跑路的工人。按以下 4 个渠道筛选，找师傅成功率超 95%：
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORKER_FINDING_TIPS.map((tip, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span>{tip.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 3 Golden Rules when talking to workers */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs sm:text-sm text-amber-950">
              <h4 className="font-bold flex items-center gap-2 text-amber-900">
                <Flame size={16} className="text-amber-600" />
                <span>跟师傅谈工钱必须恪守的 3 大铁律：</span>
              </h4>
              <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
                <li><strong>一律按平米/米数/整项包干，坚决不按“天工（点工）”算！</strong> 只要按天算，很多工人就会故意磨洋工拖延工期多混工钱。</li>
                <li><strong>坚决不提前预支工费！</strong> 很多师傅一进场就找借口预支几千元买工具生活费，给了钱后师傅态度大变甚至直接不来。必须坚持分段验收合格后再转账。</li>
                <li><strong>工具自备，损耗自理：</strong> 明确切割机、水钻机、激光水平仪等工具磨损和钻头自备，业主只提供施工原材料。</li>
              </ol>
            </div>
          </div>

          {/* Part 4: Agreement Templates for Workers */}
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck size={14} />
                  <span>自装法律底线 · 白纸黑字保平安</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  自装必备师傅签约协议（一键复制给师傅签）
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  工人进场前，打印或微信发送以下 2 份简明协议让师傅签字确认，杜绝人身意外索赔与后期坐地加价扯皮：
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {AGREEMENT_TEMPLATES.map((tmpl) => (
                <div key={tmpl.id} className="p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-400 flex items-center gap-2">
                      <FileText size={16} />
                      <span>{tmpl.title}</span>
                    </h4>
                    <button
                      onClick={() => handleCopyText(tmpl.content, tmpl.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Copy size={13} />
                      <span>{copiedKey === tmpl.id ? '复制成功！' : '复制此协议文本'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 whitespace-pre-wrap overflow-x-auto">
                    {tmpl.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
