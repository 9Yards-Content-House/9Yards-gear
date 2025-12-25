"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle, Scale, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGear, formatPrice, type GearItem } from "@/lib/gear-context";
import {
  addToComparison,
  isInComparison,
  removeFromComparison,
} from "@/lib/comparison-utils";
import { trackEvent } from "@/lib/analytics";
import { QuickViewModal } from "./quick-view-modal";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type GearCardProps = {
  item: GearItem;
};

export function GearCard({ item }: GearCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [inComparison, setInComparison] = useState(false);
  const { getCategoryById } = useGear();
  const { items } = useCart();
  const category = getCategoryById(item.category);
  const isInCart = items.some((i) => i.id === item.id);

  useEffect(() => {
    const updateComparisonStatus = () => {
      setInComparison(isInComparison(item.id));
    };

    updateComparisonStatus();
    window.addEventListener("comparisonUpdated" as any, updateComparisonStatus);
    return () =>
      window.removeEventListener(
        "comparisonUpdated" as any,
        updateComparisonStatus
      );
  }, [item.id]);

  const handleQuickBook = (e: React.MouseEvent) => {
    e.preventDefault();
    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700000000";
    const message = `Hi! I'd like to book the ${item.name} (${formatPrice(
      item.pricePerDay
    )}/day). Is it available?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
    trackEvent("whatsapp_click", { item_id: item.id, item_name: item.name });
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();

    if (inComparison) {
      removeFromComparison(item.id);
      toast.success("Removed from comparison");
      trackEvent("comparison_item_removed", { item_id: item.id });
    } else {
      const result = addToComparison(item.id);
      if (result.success) {
        toast.success(result.message, {
          action: {
            label: "View",
            onClick: () => (window.location.href = "/compare"),
          },
        });
        trackEvent("comparison_item_added", { item_id: item.id });
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <>
      <Card className="group h-full overflow-hidden bg-[#0A0A0A] hover:bg-[#121212] border-white/5 hover:border-white/20 transition-colors duration-300 ease-out">
        <div className="relative aspect-4/3 overflow-hidden bg-[#111]">
          <Link href={`/gear/${item.id}`}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className={cn(
                "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
                !item.available && "grayscale-[0.5] opacity-80"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </Link>
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {category && (
              <Badge
                variant="secondary"
                className="bg-black/50 backdrop-blur-md border-white/10 text-white/90 shadow-sm"
              >
                {category.name}
              </Badge>
            )}
            {!item.available && (
              <Badge variant="destructive" className="bg-red-500/90 text-white border-2 border-[#0A0A0A] shadow-sm">
                Booked
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            {item.featured && (
              <Badge className="bg-white/90 text-black border-none shadow-lg font-medium">
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 right-3 left-3 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ease-out translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0">
            <Button
              variant={inComparison ? "default" : "secondary"}
              className={cn(
                "h-9 flex-1 rounded-md shadow-lg transition-all duration-200 text-xs font-medium cursor-pointer backdrop-blur-sm",
                inComparison
                  ? "bg-white text-black hover:bg-white/90 border-transparent"
                  : "bg-black/40 text-white border border-white/10 hover:bg-black/80 hover:border-white/30"
              )}
              onClick={handleCompareToggle}
              title={
                inComparison
                  ? "Remove from Comparison list"
                  : "Add to Comparison list"
              }
            >
              {inComparison ? (
                <Check className="h-3.5 w-3.5 mr-2" />
              ) : (
                <Scale className="h-3.5 w-3.5 mr-2" />
              )}
              {inComparison ? "Compared" : "Compare"}
            </Button>
            <AddToCartButton
              item={item}
              className="flex-1 shadow-lg h-9 text-xs cursor-pointer bg-white text-black hover:bg-white/90 border-transparent transition-all duration-200"
              title={isInCart ? "Item in your Quote list" : "Add item to your Quote list"}
            />
          </div>
        </div>
        <CardContent className="p-5">
          <Link href={`/gear/${item.id}`}>
            <h3 className="text-base font-medium text-white group-hover:text-white/90 transition-colors duration-200 line-clamp-1 tracking-tight">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-[#888] mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          <div className="mt-4 flex items-baseline gap-2 border-t border-white/5 pt-4">
            <span className="text-xl font-bold text-white tracking-tight">
              {formatPrice(item.pricePerDay)}
            </span>
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">/ day</span>
          </div>
        </CardContent>
      </Card>

      <QuickViewModal
        item={item}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
