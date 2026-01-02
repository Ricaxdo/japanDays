"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Info, Receipt } from "lucide-react";
import * as React from "react";

export type LineItem = {
  label: string;
  value: number;
  note?: string;
};

function yen(n: number) {
  return `¥${n.toLocaleString("en-US")}`;
}

export function TrainBreakdownDialog({
  title = "Trenes usados (JR/Shinkansen)",
  subtitle = "*Incluye Nagano en Shinkansen",
  hint = "Click para ver desglose",
  totalJr,
  totalNonJr,
  itemsJr,
  itemsNonJr,
}: {
  title?: string;
  subtitle?: string;
  hint?: string;
  totalJr: number;
  totalNonJr: number;
  itemsJr: LineItem[];
  itemsNonJr: LineItem[];
}) {
  const [open, setOpen] = React.useState(false);
  const grandTotal = totalJr + totalNonJr;

  return (
    <>
      {/* Card clickeable */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left"
        aria-label="Ver desglose de transporte"
      >
        <div className="border-border bg-muted/50 hover:bg-muted group relative w-full rounded-xl border p-6 transition-colors">
          {/* ring hover */}
          <div className="ring-accent/30 pointer-events-none absolute inset-0 rounded-xl ring-0 transition-all group-hover:ring-2" />

          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">
            {title}
          </p>

          <p className="text-accent text-2xl font-bold sm:text-3xl">{yen(totalJr)}</p>

          <p className="text-muted-foreground mt-2 text-xs">{subtitle}</p>

          {/* hint visual */}
          <div className="text-muted-foreground mt-4 inline-flex items-center gap-2 text-xs font-medium">
            <span className="bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <Receipt className="h-3.5 w-3.5" />
              {hint}
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] gap-0 p-0 sm:max-w-[1000px]">
          {/* Header fijo */}
          <DialogHeader className="border-b p-4 sm:p-6">
            <DialogTitle className="mr-5 flex items-center gap-2 text-base sm:text-lg">
              Desglose de transporte aprox.
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Estimaciones. Puede variar por temporada, asiento y horarios.
            </DialogDescription>
          </DialogHeader>

          {/* Contenido scrollable */}
          <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {/* JR */}
              <Card className="w-full p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
                  <p className="text-xs font-semibold sm:text-sm">JR / Shinkansen</p>
                  <p className="text-accent text-xs font-bold sm:text-sm">
                    {yen(totalJr)}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {itemsJr.map((it) => (
                    <div
                      key={it.label}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs leading-snug font-medium sm:text-sm">
                          {it.label}
                        </p>
                        {it.note ? (
                          <p className="text-muted-foreground mt-0.5 text-[10px] leading-tight sm:text-xs">
                            {it.note}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-xs font-semibold sm:text-sm">
                        {yen(it.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* NO-JR */}
              <Card className="w-full p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
                  <p className="text-xs font-semibold sm:text-sm">Extras NO-JR</p>
                  <p className="text-accent text-xs font-bold sm:text-sm">
                    {yen(totalNonJr)}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {itemsNonJr.map((it) => (
                    <div
                      key={it.label}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs leading-snug font-medium sm:text-sm">
                          {it.label}
                        </p>
                        {it.note ? (
                          <p className="text-muted-foreground mt-0.5 text-[10px] leading-tight sm:text-xs">
                            {it.note}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-xs font-semibold sm:text-sm">
                        {yen(it.value)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/40 mt-3 rounded-lg p-2.5 sm:mt-4 sm:p-3">
                  <p className="text-muted-foreground flex items-start gap-2 text-[10px] leading-relaxed sm:text-xs">
                    <Info className="mt-0.5 h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                    IC Card (Suica/PASMO/ICOCA) para metro/buses urbanos: rápido y cómodo.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer fijo */}
          <div className="flex flex-row justify-end space-x-4 border-t p-4 sm:p-6">
            {/* Total */}
            <div className="mr-5 flex items-center justify-between gap-5">
              <p className="text-xs font-semibold sm:text-sm">Total estimado del viaje</p>
              <p className="text-accent text-2xl font-bold sm:text-lg">
                {yen(grandTotal)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
