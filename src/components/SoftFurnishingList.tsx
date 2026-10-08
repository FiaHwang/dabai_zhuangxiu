import React, { useState, useMemo } from 'react';
import { 
  Sofa, Tv, Lightbulb, Palette, Sparkles, CheckCircle2, 
  Search, Filter, X, Copy, Clock, Truck, Store, ExternalLink,
  Home, Key, HelpCircle, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';
import { 
  SOFT_MATERIAL_CATEGORIES, 
  SoftMaterialItem, 
  SoftMaterialCategory,
  SoftPurposeTag
} from '../data/softFurnishingMaterials';
import RentalVsOwnerComparison from './RentalVsOwnerComparison';

export default function SoftFurnishingList() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'online_only' | 'offline_only' | 'both'>('all');
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'owner' | 'rental'>('all');
  const [showComparisonGuide, setShowComparisonGuide] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'category' | 'all'>('category');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [completedItems, setCompletedItems] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('soft_furnishing_completed_items');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleItem = (itemId: string) => {
    setCompletedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      try {
        localStorage.setItem('soft_furnishing_completed_items', JSON.stringify(Array.from(next)));
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

  // Filtered categories and items
  const filteredCategories = useMemo(() => {
    return SOFT_MATERIAL_CATEGORIES.map(cat => {
      const items = cat.items.filter(item => {
        const query = searchQuery.trim().toLowerCase();
        const matchSearch = !query || 
          item.name.toLowerCase().includes(query) ||
          item.specs.toLowerCase().includes(query) ||
          item.brands.toLowerCase().includes(query) ||
          item.tips.toLowerCase().includes(query) ||
          item.dosage.toLowerCase().includes(query) ||
          item.estimatedCost.toLowerCase().includes(query) ||
          item.ownerRecommendation.toLowerCase().includes(query) ||
          item.rentalRecommendation.toLowerCase().includes(query);

        let matchChannel = true;
        if (channelFilter === 'online_only') {
          matchChannel = item.channel === '🛒 强烈建议网上买';
        } else if (channelFilter === 'offline_only') {
          matchChannel = item.channel === '🏬 建议线下实体试/买';
        } else if (channelFilter === 'both') {
          matchChannel = item.channel === '⚖️ 线上线下均可';
        }

        let matchPurpose = true;
        if (purposeFilter === 'owner') {
          matchPurpose = item.purposeTag === '🏡 自住品质优选' || item.purposeTag === '⚖️ 自住出租通用';
        } else if (purposeFilter === 'rental') {
          matchPurpose = item.purposeTag === '🔑 出租高性价比' || item.purposeTag === '⚖️ 自住出租通用';
        }

        return matchSearch && matchChannel && matchPurpose;
      });

      return {
        ...cat,
        items
      };
    });
  }, [searchQuery, channelFilter, purposeFilter]);

  const totalItemCount = SOFT_MATERIAL_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItemCount = completedItems.size;
  const progressPercent = Math.round((completedItemCount / totalItemCount) * 100);
  const totalFilteredCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  const handleCopyFullSoftList = () => {
    let fullText = '【全屋软装物品采购全景清单（含网购/实体店标记）】\n\n';
    SOFT_MATERIAL_CATEGORIES.forEach(cat => {
      fullText += `==========================================\n`;
      fullText += `📌 ${cat.categoryName}\n`;
      fullText += `💰 预算参考: ${cat.budgetRef}\n`;
      fullText += `📝 选购说明: ${cat.description}\n`;
      fullText += `------------------------------------------\n`;
      cat.items.forEach((item, idx) => {
        const status = completedItems.has(item.id) ? '[已备齐] ' : '[待选购] ';
        fullText += `${idx + 1}. ${status}【${item.name}】(${item.purposeTag})\n`;
        fullText += `   • 采购渠道: ${item.channel}\n`;
        fullText += `   • 推荐规格: ${item.specs}\n`;
        fullText += `   • 预估用量: ${item.dosage}\n`;
        fullText += `   • 参考预算: ${item.estimatedCost}\n`;
        fullText += `   • 🏡 自住方案: ${item.ownerRecommendation}\n`;
        fullText += `   • 🔑 出租方案: ${item.rentalRecommendation}\n`;
        fullText += `   • 避坑验货要点: ${item.tips}\n\n`;
      });
    });
    handleCopyText(fullText, 'full_soft_list');
  };

  const handleCopyOwnerList = () => {
    let text = '【🏡 全屋软装 · 自住品质健康采购清单】\n\n';
    text += '💡 自住核心：重环保、重睡眠、重人体工学与长久舒适度！\n\n';
    SOFT_MATERIAL_CATEGORIES.forEach(cat => {
      const items = cat.items.filter(it => it.purposeTag === '🏡 自住品质优选' || it.purposeTag === '⚖️ 自住出租通用');
      if (items.length === 0) return;
      text += `------------------------------------------\n`;
      text += `📦 ${cat.categoryName}\n`;
      text += `------------------------------------------\n`;
      items.forEach((it, idx) => {
        text += `${idx + 1}. 【${it.name}】(${it.channel})\n`;
        text += `   • 预算: ${it.estimatedCost}\n`;
        text += `   • 🏡 自住推荐: ${it.ownerRecommendation}\n`;
        text += `   • 规格要求: ${it.specs}\n`;
        text += `   • 避坑要点: ${it.tips}\n\n`;
      });
    });
    handleCopyText(text, 'owner_soft_list');
  };

  const handleCopyRentalList = () => {
    let text = '【🔑 全屋软装 · 房东出租高性价比防坑清单】\n\n';
    text += '💡 出租核心：极致性价比、三防耐脏、易修好换、耐踩耐刮、严格控制回本周期！\n\n';
    SOFT_MATERIAL_CATEGORIES.forEach(cat => {
      const items = cat.items.filter(it => it.purposeTag === '🔑 出租高性价比' || it.purposeTag === '⚖️ 自住出租通用');
      if (items.length === 0) return;
      text += `------------------------------------------\n`;
      text += `📦 ${cat.categoryName}\n`;
      text += `------------------------------------------\n`;
      items.forEach((it, idx) => {
        text += `${idx + 1}. 【${it.name}】(${it.channel})\n`;
        text += `   • 🔑 出租高性价比配置: ${it.rentalRecommendation}\n`;
        text += `   • 避坑避险点: ${it.tips}\n\n`;
      });
    });
    handleCopyText(text, 'rental_soft_list');
  };

  const handleCopyOnlineSoftList = () => {
    let onlineText = '【🛒 全屋建议网上购买的软装物品清单（电商抄作业直采版）】\n\n';
    onlineText += '💡 为什么建议网购？规格高度标准化、官方旗舰店有正品保修，或来自绍兴柯桥、中山古镇、南通海门等源头产业带，避开实体店层层溢价！\n\n';
    SOFT_MATERIAL_CATEGORIES.forEach(cat => {
      const onlineItems = cat.items.filter(it => it.channel === '🛒 强烈建议网上买');
      if (onlineItems.length === 0) return;

      onlineText += `------------------------------------------\n`;
      onlineText += `📦 ${cat.categoryName}\n`;
      onlineText += `------------------------------------------\n`;
      onlineItems.forEach((item, idx) => {
        const status = completedItems.has(item.id) ? '[已备齐] ' : '[待下单] ';
        onlineText += `${idx + 1}. ${status}【${item.name}】\n`;
        onlineText += `   • 推荐规格: ${item.specs}\n`;
        onlineText += `   • 预估用量: ${item.dosage}\n`;
        onlineText += `   • 参考预算: ${item.estimatedCost}\n`;
        onlineText += `   • 送货时机: ${item.timing}\n`;
        onlineText += `   • 推荐品牌/源头店: ${item.brands}\n`;
        onlineText += `   • 避坑要点: ${item.tips}\n\n`;
      });
    });
    handleCopyText(onlineText, 'online_soft_list');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden border border-emerald-800/40 shadow-lg">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Sparkles size={14} className="text-amber-300" />
            <span>软装选购宝典 · 标明网购与实体店最佳策略 · 支持自住与出租分型</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            全屋软装物品采购清单
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            沙发床垫去实体店试坐试躺，家电灯具窗帘床品认准源头网购！现已全面支持<strong>【自住品质优选】</strong>与<strong>【房东出租高性价比】</strong>专属对比，带耐造抗损与防扯皮建议。
          </p>

          {/* Quick Comparison Toggle Button in Banner */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowComparisonGuide(prev => !prev)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Lightbulb size={14} />
              <span>{showComparisonGuide ? '收起【自住 vs 出租选材避坑指南】' : '💡 打开【自住 vs 出租策略对比与避坑指南】'}</span>
              {showComparisonGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Progress */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1.5 font-medium">
              <span>软装备齐进度</span>
              <span className="font-bold text-amber-300">{completedItemCount} / {totalItemCount} 项已备齐 ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Conditionally Rendered Comparison Guide Drawer/Section */}
      {showComparisonGuide && (
        <RentalVsOwnerComparison
          onSelectPurpose={(p) => setPurposeFilter(p)}
          currentPurpose={purposeFilter}
        />
      )}

      {/* Search, Filter & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索软装物品、推荐品牌、产业带、自住/出租建议（如：沙发、洗碗机、华凌、床垫...）"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
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
              onClick={handleCopyOwnerList}
              className="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              title="复制专门适合自住的高品质软装清单"
            >
              <Home size={14} />
              <span>{copiedKey === 'owner_soft_list' ? '已复制自住清单！' : '🏡 复制自住清单'}</span>
            </button>

            <button
              onClick={handleCopyRentalList}
              className="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              title="复制专门适合出租房的高性价比耐造软装清单"
            >
              <Key size={14} />
              <span>{copiedKey === 'rental_soft_list' ? '已复制出租清单！' : '🔑 复制出租清单'}</span>
            </button>

            <button
              onClick={handleCopyOnlineSoftList}
              className="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              title="仅提取并复制适合在天猫/京东官方店采购的软装商品"
            >
              <Copy size={14} />
              <span>{copiedKey === 'online_soft_list' ? '已复制网购清单！' : '🛒 网购专属'}</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode('category')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'category' 
                    ? 'bg-white text-emerald-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                按分类
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'all' 
                    ? 'bg-white text-emerald-700 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                全览
              </button>
            </div>
          </div>
        </div>

        {/* Purpose Filter & Channel Filter Row */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          {/* Purpose Filter Bar (NEW) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <span>用途场景:</span>
            </span>
            <button
              onClick={() => setPurposeFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                purposeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              全部用途
            </button>
            <button
              onClick={() => setPurposeFilter('owner')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                purposeFilter === 'owner'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Home size={13} />
              <span>🏡 刚需/品质自住 (自住模式)</span>
            </button>
            <button
              onClick={() => setPurposeFilter('rental')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                purposeFilter === 'rental'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Key size={13} />
              <span>🔑 房东出租高性价比 (出租屋模式)</span>
            </button>
          </div>

          {/* Channel Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
                <Filter size={13} />
                采购策略:
              </span>
              <button
                onClick={() => setChannelFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  channelFilter === 'all'
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
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
                <span>🛒 强烈建议网上买 (闭眼冲)</span>
              </button>
              <button
                onClick={() => setChannelFilter('offline_only')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  channelFilter === 'offline_only'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <span>🏬 建议线下实体试/买 (重体感)</span>
              </button>
              <button
                onClick={() => setChannelFilter('both')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  channelFilter === 'both'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                ⚖️ 线上线下均可
              </button>

              {(searchQuery || channelFilter !== 'all' || purposeFilter !== 'all') && (
                <button
                  onClick={() => { setSearchQuery(''); setChannelFilter('all'); setPurposeFilter('all'); }}
                  className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-1 underline cursor-pointer"
                >
                  重置筛选条件
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              {searchQuery || channelFilter !== 'all' || purposeFilter !== 'all' ? (
                <span className="text-emerald-700 font-bold">
                  匹配到 {totalFilteredCount} 项软装
                </span>
              ) : (
                <span>
                  软装清单共 <strong className="text-slate-800">{totalItemCount}</strong> 项 · 已备齐 <strong className="text-emerald-600">{completedItemCount}</strong> 项
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills (in category mode) */}
      {viewMode === 'category' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {SOFT_MATERIAL_CATEGORIES.map((cat, idx) => {
              const isCatActive = activeCategoryIndex === idx;
              const catDone = cat.items.filter(i => completedItems.has(i.id)).length;
              const catTotal = cat.items.length;
              const isAllDone = catDone === catTotal && catTotal > 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                    isCatActive
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : isAllDone
                        ? 'bg-emerald-50/70 text-slate-800 border-emerald-200 hover:border-emerald-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-black ${isCatActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {cat.categoryName.split(' ')[0]}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isCatActive 
                        ? 'bg-white/20 text-white' 
                        : isAllDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                    }`}>
                      {catDone}/{catTotal}
                    </span>
                  </div>
                  <span className="text-xs font-bold truncate">
                    {cat.categoryName.split(' ').slice(1).join(' ')}
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
          : [filteredCategories[activeCategoryIndex]];

        return (
          <div className="space-y-6">
            {categoriesToRender.map((currentCat) => {
              if (currentCat.items.length === 0 && (searchQuery || channelFilter !== 'all' || purposeFilter !== 'all')) {
                return null;
              }

              const copyTextForCategory = `【软装采购单 - ${currentCat.categoryName}】\n` + 
                `预算参考: ${currentCat.budgetRef}\n` +
                currentCat.items.map(it => `• [${it.channel}] ${it.name} | 预算: ${it.estimatedCost} | 适用: ${it.purposeTag} | 自住: ${it.ownerRecommendation} | 出租: ${it.rentalRecommendation}`).join('\n');

              return (
                <div key={currentCat.id} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
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
                      <span>{copiedKey === `cat_${currentCat.id}` ? '已复制分类清单' : '复制此分类清单发给伴侣'}</span>
                    </button>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-slate-100 p-2 sm:p-4">
                    {currentCat.items.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
                        当前筛选条件下暂无此分类匹配软装
                      </div>
                    ) : (
                      currentCat.items.map((item) => {
                        const isDone = completedItems.has(item.id);
                        const isOnline = item.channel === '🛒 强烈建议网上买';
                        const isOffline = item.channel === '🏬 建议线下实体试/买';

                        return (
                          <div
                            key={item.id}
                            className={`p-4 sm:p-5 rounded-2xl transition-all ${
                              isDone ? 'bg-emerald-50/30 opacity-75' : 'hover:bg-slate-50'
                            }`}
                          >
                            {/* Item Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2.5">
                              <div className="flex items-start gap-3">
                                <button
                                  type="button"
                                  onClick={() => toggleItem(item.id)}
                                  className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors cursor-pointer ${
                                    isDone
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'border-slate-300 bg-white hover:border-emerald-600'
                                  }`}
                                  title={isDone ? "标记为未选购" : "标记为已选购/已备齐"}
                                >
                                  {isDone && <CheckCircle2 size={14} />}
                                </button>
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                                      <span className={isDone ? 'line-through text-slate-400' : ''}>
                                        {item.name}
                                      </span>
                                    </h4>

                                    {/* Purpose Tag Badge (NEW) */}
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                                      item.purposeTag === '🏡 自住品质优选'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : item.purposeTag === '🔑 出租高性价比'
                                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                                          : item.purposeTag === '⚠️ 出租强烈不建议'
                                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                                            : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                                    }`}>
                                      {item.purposeTag}
                                    </span>

                                    {/* Channel Badge */}
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                                      isOnline 
                                        ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                        : isOffline
                                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                                          : 'bg-slate-100 text-slate-700 border-slate-200'
                                    }`}>
                                      {item.channel}
                                    </span>
                                  </div>
                                  <p className="text-xs text-emerald-800 font-medium mt-1">
                                    📐 规格参数：{item.specs}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5 shrink-0 pl-8 sm:pl-0">
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  💰 {item.estimatedCost}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                  📦 数量：{item.dosage}
                                </span>
                              </div>
                            </div>

                            {/* Timing */}
                            {item.timing && (
                              <div className="text-xs text-slate-500 mb-2 pl-8 flex items-center gap-1.5">
                                <Clock size={12} className="text-emerald-600 shrink-0" />
                                <span>进场时机：<strong className="text-slate-700">{item.timing}</strong></span>
                              </div>
                            )}

                            {/* Dual-Track Comparison: 自住 vs 出租 (NEW) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2.5 pl-8">
                              <div className={`p-3 rounded-xl border transition-all ${
                                purposeFilter === 'owner' 
                                  ? 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-300' 
                                  : 'bg-emerald-50/40 border-emerald-200/80'
                              }`}>
                                <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs mb-1">
                                  <Home size={14} className="text-emerald-700" />
                                  <span>🏡 自住配置与推荐：</span>
                                </div>
                                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                                  {item.ownerRecommendation}
                                </p>
                              </div>

                              <div className={`p-3 rounded-xl border transition-all ${
                                purposeFilter === 'rental' 
                                  ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300' 
                                  : 'bg-amber-50/40 border-amber-200/80'
                              }`}>
                                <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs mb-1">
                                  <Key size={14} className="text-amber-700" />
                                  <span>🔑 房东出租高性价比与防坑：</span>
                                </div>
                                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                                  {item.rentalRecommendation}
                                </p>
                              </div>
                            </div>

                            {/* Brands and Tips grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs sm:text-sm pl-8">
                              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                                <span className="font-bold text-slate-700 flex items-center gap-1 text-xs">
                                  ⭐ 推荐品牌 / 源头产业带（抄作业）：
                                </span>
                                <p className="text-slate-800 font-medium leading-relaxed">
                                  {item.brands}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                                <span className="font-bold text-slate-700 flex items-center gap-1 text-xs">
                                  🔍 选购验货避坑要点：
                                </span>
                                <p className="text-slate-600 leading-relaxed">
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
  );
}

