import React, { useState } from 'react';
import { 
  Home, Key, AlertTriangle, ShieldCheck, DollarSign, 
  Sparkles, CheckCircle2, XCircle, ArrowRight, Copy, Check,
  Sliders, Calculator, HelpCircle, Layers, Lightbulb
} from 'lucide-react';

interface RentalVsOwnerComparisonProps {
  onSelectPurpose?: (purpose: 'all' | 'owner' | 'rental') => void;
  currentPurpose?: 'all' | 'owner' | 'rental';
}

export default function RentalVsOwnerComparison({
  onSelectPurpose,
  currentPurpose = 'all'
}: RentalVsOwnerComparisonProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Simple ROI calculator state
  const [renovationCost, setRenovationCost] = useState<number>(35000);
  const [monthlyRent, setMonthlyRent] = useState<number>(2600);

  const paybackMonths = monthlyRent > 0 ? (renovationCost / monthlyRent).toFixed(1) : '0';
  const paybackYears = monthlyRent > 0 ? (renovationCost / (monthlyRent * 12)).toFixed(1) : '0';
  const annualYield = renovationCost > 0 ? ((monthlyRent * 12 / renovationCost) * 100).toFixed(1) : '0';

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyGuide = () => {
    const guideText = `【自住 vs 出租 软硬装策略对比与选材避坑指南】

💡 核心思维差异：
• 自住思维：算 10 年平摊成本。注重健康环保（ENF级板材/低VOC）、人体工学、静音降噪与智能享受，关键项一步到位。
• 出租思维：算租金回本周期（ROI）。注重极致性价比、结实耐造、防污易洁、低维护、安全底线（防漏水防触电）。

🚫 出租房【6 样绝对不能省】（安全与防灾底线）：
1. 水电隐蔽管线与阻燃电线（起帆/远东/伟星，暗埋漏水漏电赔几万）
2. 卫生间防水与48小时闭水试验（漏水渗到楼下赔偿直接吃光两年房租）
3. 全铜防爆角阀与潜水艇防臭地漏（角阀脆裂全屋泡汤，地漏反臭租客必退租）
4. 厨房公共烟道防烟止逆阀（几十元小投入，杜绝楼下做饭油烟倒灌）
5. 出租公寓专用密码智能锁（支持远程发临时密码，退租一键修改，免去送钥匙）
6. 带防电墙热水器与漏电保护空气开关（租客生命安全第一底线）

💸 出租房【8 样坚决别买贵 / 甚至不要买】：
1. 洗碗机 / 扫地机（租客操作不当常堵塞故障、耗材纠纷）
2. 厨下RO净水器（滤芯更换责任不清、接头老化易泡烂橱柜）
3. 昂贵真皮或浅色难拆洗布艺沙发（钥匙/宠物/油污一刮一泼就废）
4. 复杂满吊顶与无主灯磁吸轨道（开孔多故障率高，超薄吸顶灯最亮最省心）
5. 昂贵薄岩板/大理石餐桌（易被剁骨头或重物磕裂，选防火板或加厚木质）
6. 智能马桶一体机（电路主板与喷头易坏，选普通陶瓷虹吸机械马桶十年不坏）
7. 独立热泵烘干机（耗电高且毛屑滤网不清理有火灾隐患，配置变频滚筒即可）
8. 昂贵进口乳胶漆与艺术漆（选国标工程白漆耐擦洗，退租滚涂成本仅两百元）

📊 核心物品极速对照表：
• 沙发：自住选头层牛皮/高回弹大三人位(3500-8000元) | 出租选加厚三防科技布(600-1200元)
• 床垫：自住选独立袋装弹簧+乳胶护脊(2000-4500元) | 出租选整网加硬弹簧/椰棕(400-800元)
• 空调：自住选防直吹大导风变频冷暖(2500-3500元) | 出租闭眼买华凌神机N8HE1(1600-1900元)
• 冰箱：自住选450L+双系统法式多门(3500-6000元) | 出租选210L三门风冷无霜(900-1400元)
• 瓷砖：自住选750×1500柔光微水泥大砖(80-150元/片) | 出租选800×800通体抛釉砖(25-45元/片)
• 烟机：自住选24m³暴风双吸+900Pa大静压(3000-5000元) | 出租选名气/华凌大吸力烟灶套(800-1200元)
• 马桶：自住选内置水箱泡沫盾智能马桶(2000-3800元) | 出租选普通全瓷机械虹吸马桶(350-550元)`;
    handleCopyText(guideText, 'rental_vs_owner_guide');
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-7 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles size={14} className="text-amber-300" />
            <span>自装决策秘籍 · 自住品质与出租高ROI双轨配置</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white">
            自住 vs 出租：选材策略与避坑指南
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            自住算<strong>10年生活品质与健康</strong>，出租算<strong>租金回本周期与耐造抗损</strong>。同一套房子，自住和出租的选材逻辑截然相反！搞清楚“哪些坚决不能省”与“哪些坚决别买贵”，省下好几万智商税。
          </p>

          {/* Quick Purpose Filter Switch */}
          {onSelectPurpose && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-300 mr-1">清单视角快速切换：</span>
              <button
                onClick={() => onSelectPurpose('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentPurpose === 'all'
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>全部项目</span>
              </button>
              <button
                onClick={() => onSelectPurpose('owner')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentPurpose === 'owner'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-emerald-300 hover:bg-white/20'
                }`}
              >
                <Home size={14} />
                <span>🏡 仅看自住优选</span>
              </button>
              <button
                onClick={() => onSelectPurpose('rental')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentPurpose === 'rental'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white/10 text-amber-300 hover:bg-white/20'
                }`}
              >
                <Key size={14} />
                <span>🔑 仅看出租省钱</span>
              </button>
            </div>
          )}
        </div>

        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Core Mindset Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Owner-Occupied Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-base sm:text-lg">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Home size={18} />
                </div>
                <span>🏡 刚需/改善自住逻辑</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                重健康·重享受·长期主义
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
              <strong>核心算法：</strong>把装修总费用平摊到入住的 10 年，折算每天的健康呼吸、深度睡眠与愉悦心情。
            </p>

            <ul className="text-xs sm:text-sm text-emerald-900 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>环保无妥协：</strong>万华禾香板/爱格板ENF级、低VOC儿童乳胶漆，避免甲醛残留。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>睡眠与脊椎：</strong>独立袋装弹簧+乳胶护脊床垫、高密度护腰沙发、升降书桌。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>消灭家务矛盾：</strong>16套嵌入式洗碗机、扫拖机器人、水量伺服器恒温燃热。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>静音环境：</strong>下水立管双层阻尼隔音棉、静音磁吸门锁、三玻两腔隔音窗。</span>
              </li>
            </ul>
          </div>

          {/* Rental Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-black text-base sm:text-lg">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <Key size={18} />
                </div>
                <span>🔑 房东出租房逻辑</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                算回本·结实耐造·防扯皮
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
              <strong>核心算法：</strong>算投入产出比（ROI）。多花3万元如果每个月租金只能多200元，需要整整 <strong>12.5 年</strong>才能收回成本！
            </p>

            <ul className="text-xs sm:text-sm text-amber-950 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <span><strong>结实耐造防损：</strong>三防科技布沙发（不怕抓不怕泼）、整网硬弹簧床垫（耐踩耐压）。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <span><strong>易洁好打理：</strong>800×800通体抛釉地砖、纯白工程漆、防污石英石台面，脏了一擦就净。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <span><strong>神机与低维护：</strong>华凌神机空调、海尔统帅冰箱洗衣机、机械马桶，配件便宜极易修。</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-amber-700 shrink-0 mt-0.5" />
                <span><strong>防扯皮安全锁：</strong>公寓密码锁（远程发码）、全铜角阀（防爆水）、防烟止逆阀。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 1: 出租房 6 样绝不能省 VS 8 样坚决别买贵 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* 6 样绝对不能省 */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
              <ShieldCheck size={18} className="text-rose-600" />
              <span>出租房【6 样绝对不能省】（安全与防灾底线）</span>
            </div>
            <p className="text-xs text-rose-700">
              省了这些，万一出事赔偿金和租客纠纷直接吃光几年房租！
            </p>

            <div className="space-y-2 text-xs text-slate-800">
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <div>
                  <strong className="text-rose-900">水电暗埋管线与阻燃电线：</strong>
                  <span>起帆/远东/伟星等大牌。暗埋水管漏水或电线起火，直接毁了整间房并赔偿楼下数万元！</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <div>
                  <strong className="text-rose-900">卫生间防水与48小时闭水试验：</strong>
                  <span>东方雨虹/德高刚柔涂料。渗水到楼下自建房或邻居家，赔偿损失极惨烈，房东必须亲自到楼下验收！</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <div>
                  <strong className="text-rose-900">全铜防爆角阀与潜水艇地漏：</strong>
                  <span>严禁使用花洒水槽附赠的劣质锌合金角阀（两年必脆断爆水）；机械防臭地漏不返臭，租客才能长租。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <div>
                  <strong className="text-rose-900">厨房公共烟道止逆阀：</strong>
                  <span>潜水艇双叶片止逆阀几十元。一旦楼下做饭油烟倒灌进屋，整间屋全是油烟味，租客必频繁投诉退房！</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">5</span>
                <div>
                  <strong className="text-rose-900">出租公寓专用密码门锁：</strong>
                  <span>小米/网联公寓锁（300-500元）。支持微信发远程临时密码给中介或租客，退租一键修改，省去交接钥匙和换锁芯烦恼。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">6</span>
                <div>
                  <strong className="text-rose-900">带防电墙热水器与漏保空开：</strong>
                  <span>海尔统帅防电墙电热或正规强排燃热，厨卫回路配独立漏电保护断路器，人身安全第一道防线。</span>
                </div>
              </div>
            </div>
          </div>

          {/* 8 样坚决别买贵 / 甚至不要买 */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm sm:text-base">
              <AlertTriangle size={18} className="text-amber-600" />
              <span>出租房【8 样坚决别买贵 / 甚至不要买】</span>
            </div>
            <p className="text-xs text-amber-800">
              买贵了就是沉没成本，不仅无法带来租金溢价，还带来海量维修纠纷！
            </p>

            <div className="space-y-2 text-xs text-slate-800">
              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">洗碗机与扫拖机器人：</strong>
                  <span>租客误放洗洁精冒泡烧电机、残渣堵塞排水管漏水，配件耗材昂贵，退租极易扣押金纠纷！</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">厨下RO反渗透净水器：</strong>
                  <span>滤芯每年更换责任扯皮不清；水管接头老化漏水易泡烂橱柜和地板，租客建议自备桶装水。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">昂贵真皮或浅色难拆洗布艺沙发：</strong>
                  <span>租客钥匙、指甲、猫狗极易划破皮面；饮料汤汁泼入浅色布艺洗不掉，选加厚免洗防污科技布！</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">客厅卧室大面积地毯：</strong>
                  <span>租客外卖油污与奶茶泼洒无法清理，退租时往往发霉恶臭沦为垃圾，极大增加退租保洁成本。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">全屋满吊顶与磁吸轨道灯：</strong>
                  <span>变压器和轨道易坏且木工吊顶耗费数千元；直接装超薄LED吸顶灯，明亮开阔无光衰。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">智能马桶一体机：</strong>
                  <span>租客误操作或水垢杂质易导致主板与喷头损坏报修；选普通优质陶瓷机械虹吸马桶，十年不坏。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">独立热泵烘干机：</strong>
                  <span>耗电大、租客不会清理毛屑滤网易烧毁或引发火灾；配8-10kg变频滚筒或波轮单机最皮实。</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-100 flex items-start gap-2">
                <XCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-900">进口高端艺术漆与昂贵乳胶漆：</strong>
                  <span>立邦美得丽/多乐士家丽安国标工程白漆即可（耐擦洗防霉），白墙显大，退租滚筒补刷仅需百元。</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: QUICK COMPARISON TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-black text-sm sm:text-base text-slate-900">
              <Layers size={18} className="text-indigo-600" />
              <span>全屋高频物品 自住 vs 出租 极速对照表</span>
            </div>
            <button
              onClick={handleCopyGuide}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1.5 transition-colors border border-indigo-200"
            >
              {copiedKey === 'rental_vs_owner_guide' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedKey === 'rental_vs_owner_guide' ? '已复制对比指南！' : '复制自住出租对比全景指南'}</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">物品类别</th>
                  <th className="py-3 px-4 bg-emerald-50/50 text-emerald-900">🏡 自住选型与预算 (品质寿命)</th>
                  <th className="py-3 px-4 bg-amber-50/50 text-amber-950">🔑 出租选型与预算 (高ROI与耐造)</th>
                  <th className="py-3 px-4 text-slate-500">选型关键差异说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🛋️ 客厅沙发</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">头层牛皮 / 高克重亲肤棉麻</span>
                    <div className="text-xs text-emerald-700 mt-0.5">顾家/左右 (3,500 - 8,000 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">加厚三防科技布 / 原木架沙发</span>
                    <div className="text-xs text-amber-700 mt-0.5">工厂直发 (600 - 1,200 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    出租严禁买真皮（易划破）与浅色布（泼汤毁坏），科技布防污耐刮
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🛏️ 核心床垫</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">独立袋装弹簧 + 天然乳胶护脊</span>
                    <div className="text-xs text-emerald-700 mt-0.5">喜临门白骑士 / 雅兰 (2,000 - 4,500 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">整网加硬连锁弹簧 / 环保椰棕</span>
                    <div className="text-xs text-amber-700 mt-0.5">大自然平替 / 喜临门工程款 (400 - 800 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    自住重静音抗干扰；出租重结实耐踩压（袋装弹簧易被踩塌偏位）
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">❄️ 卧室空调</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">大导风板防直吹 / 无风感静音</span>
                    <div className="text-xs text-emerald-700 mt-0.5">美的风尊 / 格力云佳 (2,400 - 3,200 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">出租房公认神机：华凌 N8HE1</span>
                    <div className="text-xs text-amber-700 mt-0.5">华凌 1.5P 变频冷暖 (1,600 - 1,900 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    华凌神机双排铜管+美芝压缩机，一级能效省电耐用，房东圈神机
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🧊 厨房冰箱</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">450-520L 法式多门/双系统不串味</span>
                    <div className="text-xs text-emerald-700 mt-0.5">海尔全空间保鲜 / 容声 (3,500 - 6,000 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">210-260L 三门/双门风冷无霜</span>
                    <div className="text-xs text-amber-700 mt-0.5">海尔统帅 / 美的 / 容声 (900 - 1,400 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    出租体积紧凑省空间、一天不到半度电，配件通用维修几十块
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🧺 洗衣设备</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">独立变频滚筒 + 热泵烘干机套装</span>
                    <div className="text-xs text-emerald-700 mt-0.5">小天鹅水魔方 / 海尔 (5,000 - 8,500 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">8-10kg 变频滚筒单机 或 波轮</span>
                    <div className="text-xs text-amber-700 mt-0.5">统帅 / 小天鹅 / 美的 (700 - 1,300 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    出租坚决不配烘干机！耗电大且滤网不清理有火灾隐患，单机最耐造
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🍳 烟机灶具</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">24m³暴风双吸 + 900Pa大静压</span>
                    <div className="text-xs text-emerald-700 mt-0.5">老板60D1S / 方太 (3,000 - 4,800 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">大吸力顶吸/侧吸性价比套装</span>
                    <div className="text-xs text-amber-700 mt-0.5">老板旗下名气 / 华凌 (750 - 1,200 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    出租选机械按键耐用款，无娇贵触屏，19-21m³排风好清洗
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🚽 卫生间马桶</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">内置水箱泡沫盾智能一体马桶</span>
                    <div className="text-xs text-emerald-700 mt-0.5">九牧S770 / 恒洁Q9X (2,000 - 3,500 元)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">全瓷微晶施釉机械虹吸马桶</span>
                    <div className="text-xs text-amber-700 mt-0.5">箭牌 / 九牧工程款 (350 - 550 元)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    出租机械马桶十年不坏，无电路板故障与水垢堵喷头纠纷
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">🧱 全屋地砖</td>
                  <td className="py-3.5 px-4 bg-emerald-50/20">
                    <span className="font-semibold text-emerald-900">750×1500 柔光微水泥大砖</span>
                    <div className="text-xs text-emerald-700 mt-0.5">广东大厂优等品 (70 - 130 元/片)</div>
                  </td>
                  <td className="py-3.5 px-4 bg-amber-50/20">
                    <span className="font-semibold text-amber-900">800×800 通体大理石抛釉砖</span>
                    <div className="text-xs text-amber-700 mt-0.5">广东大厂优等品 (25 - 45 元/片)</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    800砖耐磨耐划、亮光好拖地打扫、坏了极易单片替换，成本省60%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: RENTAL ROI CALCULATOR (收租回本与折旧心法) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm sm:text-base">
              <Calculator size={18} className="text-indigo-600" />
              <span>🧮 房东回本周期测算与折旧心法 (ROI Calculator)</span>
            </div>
            <span className="text-xs text-slate-500">
              精准把控软硬装投入，避免“豪华装修给租客、十年难回本”
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                预计出租装修总投入 (元)
              </label>
              <input
                type="number"
                value={renovationCost}
                onChange={(e) => setRenovationCost(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-sm text-slate-800 outline-none focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">包含简装硬装辅料+家具家电</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                预计月租金收入 (元/月)
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-sm text-slate-800 outline-none focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">根据所在城市地段真实行情估算</span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-around text-center">
              <div>
                <span className="text-[11px] text-indigo-700 block font-medium">装修回本期</span>
                <strong className="text-base sm:text-lg text-indigo-950 font-black">{paybackMonths} 个月</strong>
                <span className="text-[10px] text-indigo-600 block">({paybackYears} 年)</span>
              </div>
              <div className="w-px h-8 bg-indigo-200" />
              <div>
                <span className="text-[11px] text-indigo-700 block font-medium">年化装修回报率</span>
                <strong className="text-base sm:text-lg text-emerald-700 font-black">{annualYield}%</strong>
                <span className="text-[10px] text-emerald-600 block">(租金收益)</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed flex items-start gap-2">
            <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>房东必背折旧黄金法则：</strong>
              出租房家具家电正常使用寿命约为 4-6 年。装修回本期控制在 <strong>12-18 个月</strong>以内的属于优秀投资；若回本期超过 <strong>36 个月 (3年)</strong>，说明你在非核心装饰上投入过高，应立刻对照上方清单砍掉洗碗机、复杂吊顶、高端岩板等低ROI溢价项目！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
