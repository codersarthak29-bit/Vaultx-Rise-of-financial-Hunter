import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { SHOP_ITEMS } from '../data/shopData';
import { InventoryItem } from '../types';
import { Shield, Zap, Clock, Sparkles, Award, HelpCircle, Check, ShoppingBag, Box } from 'lucide-react';
import { sound } from '../utils/audio';

export const InventoryShop: React.FC = () => {
  const { user, buyItem, useItem } = useGame();
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');
  const [purchaseNotice, setPurchaseNotice] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-rose-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleBuy = (item: InventoryItem) => {
    const success = buyItem(item);
    if (success) {
      setPurchaseNotice(`Purchased ${item.name}! Check your Inventory.`);
      setTimeout(() => setPurchaseNotice(null), 3000);
    } else {
      setPurchaseNotice(`Insufficient Vault Coins for ${item.name}! Complete more quests.`);
      setTimeout(() => setPurchaseNotice(null), 3000);
    }
  };

  const handleUse = (itemId: string, itemName: string) => {
    const success = useItem(itemId);
    if (success) {
      setPurchaseNotice(`Activated ${itemName}!`);
      setTimeout(() => setPurchaseNotice(null), 3000);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            VIRTUAL ECONOMY & ARSENAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Vault Market & Backpack
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Acquire booster potions, streak preservation shields, and rare hunter titles.
          </p>
        </div>

        {/* Currency display */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Vault Coins</span>
              <p className="text-base font-extrabold text-amber-300 tabular-nums">
                {user.vaultCoins.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {purchaseNotice && (
        <div className="p-3 rounded-xl bg-slate-850 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{purchaseNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('shop');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'shop'
              ? 'bg-emerald-500 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Vault Store</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('inventory');
          }}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'inventory'
              ? 'bg-emerald-500 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>My Inventory ({user.inventory.length})</span>
        </button>
      </div>

      {/* SHOP VIEW */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOP_ITEMS.map((item) => {
            const canAfford = user.vaultCoins >= item.cost;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🪙</span>
                    <span className="font-extrabold text-amber-300 text-sm tabular-nums">
                      {item.cost} Coins
                    </span>
                  </div>

                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INVENTORY VIEW */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {user.inventory.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-3">
              <p className="text-slate-400 text-sm">Your inventory is currently empty.</p>
              <button
                onClick={() => setActiveTab('shop')}
                className="text-xs text-emerald-400 hover:underline font-semibold"
              >
                Visit the Vault Store to get supplies →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.inventory.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                        {getIcon(item.icon)}
                      </div>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded tabular-nums">
                        x{item.quantity}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      {item.active ? '● Currently Active' : 'Ready to use'}
                    </span>

                    {item.category !== 'cosmetic' ? (
                      <button
                        onClick={() => handleUse(item.id, item.name)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        {item.active ? 'Extend' : 'Activate'}
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-400">Equipped</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
