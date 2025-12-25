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
      <Card className="group h-full overflow-hidden bg-card hover:bg-secondary/50 transition-all duration-300 border-border hover:border-primary/50 hover:shadow-xl">
        <div className="relative aspect-4/3 overflow-hidden">
          <Link href={`/gear/${item.id}`}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </Link>
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            {category && (
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm"
              >
                {category.name}
              </Badge>
            )}
            {!item.available && <Badge variant="destructive">Booked</Badge>}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            {item.featured && (
              <Badge className="bg-primary text-primary-foreground shadow-sm">
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 right-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              variant={inComparison ? "default" : "secondary"}
              className={cn(
                "h-10 flex-1 rounded-md shadow-lg transition-all duration-300 text-xs font-medium",
                inComparison
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 hover:bg-background"
              )}
              onClick={handleCompareToggle}
              title={
                inComparison
                  ? "Remove from Comparison list"
                  : "Add to Comparison list"
              }
            >
              {inComparison ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Scale className="h-4 w-4 mr-2" />
              )}
              {inComparison ? "Compared" : "Compare"}
            </Button>
            <AddToCartButton
              item={item}
              className="flex-1 shadow-lg h-10 text-xs"
              title={isInCart ? "Item in your Quote list" : "Add item to your Quote list"}
            />
          </div>
        </div>
        <CardContent className="p-4">
          <Link href={`/gear/${item.id}`}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(item.pricePerDay)}
            </span>
            <span className="text-xs text-muted-foreground">/day</span>
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
