'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

const WA_NUMBER = '50685850000';
const WA_URL = `https://wa.me/+${WA_NUMBER}?text=Hola%20SobrePoxi%2C%20quiero%20información`;

/**
 * Floating WhatsApp bubble that is draggable.
 * When released, it snaps to the nearest horizontal edge.
 */
export default function WhatsAppBubble() {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1 }); // -1 = not yet initialized
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const wasDragged = useRef(false);
  const SIZE = 56;
  const EDGE_MARGIN = 12;

  // Initialize position (bottom-right)
  useEffect(() => {
    setPos({
      x: window.innerWidth - SIZE - EDGE_MARGIN,
      y: window.innerHeight - SIZE - 100,
    });
  }, []);

  // Snap to nearest horizontal edge
  const snapToEdge = useCallback((currentX: number, currentY: number) => {
    const midX = window.innerWidth / 2;
    const targetX = currentX + SIZE / 2 < midX
      ? EDGE_MARGIN
      : window.innerWidth - SIZE - EDGE_MARGIN;
    // Clamp Y
    const clampedY = Math.max(EDGE_MARGIN, Math.min(currentY, window.innerHeight - SIZE - EDGE_MARGIN));
    setPos({ x: targetX, y: clampedY });
  }, []);

  // --- Pointer events (unified mouse + touch) ---
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const el = bubbleRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    setDragging(true);
    wasDragged.current = false;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  }, [pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    wasDragged.current = true;
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    setPos({ x: newX, y: newY });
  }, [dragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const el = bubbleRef.current;
    if (el) el.releasePointerCapture(e.pointerId);
    setDragging(false);
    snapToEdge(pos.x, pos.y);
  }, [dragging, pos, snapToEdge]);

  const handleClick = useCallback(() => {
    if (wasDragged.current) return; // Don't navigate if we just dragged
    window.open(WA_URL, '_blank', 'noopener');
  }, []);

  // Handle window resize
  useEffect(() => {
    const onResize = () => {
      setPos(prev => {
        if (prev.x < 0) return prev;
        const midX = window.innerWidth / 2;
        const targetX = prev.x + SIZE / 2 < midX
          ? EDGE_MARGIN
          : window.innerWidth - SIZE - EDGE_MARGIN;
        const clampedY = Math.max(EDGE_MARGIN, Math.min(prev.y, window.innerHeight - SIZE - EDGE_MARGIN));
        return { x: targetX, y: clampedY };
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (pos.x < 0) return null; // Don't render until initialized

  return (
    <div
      ref={bubbleRef}
      role="button"
      aria-label="WhatsApp"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      className="fixed z-[9999] select-none touch-none"
      style={{
        left: pos.x,
        top: pos.y,
        width: SIZE,
        height: SIZE,
        transition: dragging ? 'none' : 'left 0.35s cubic-bezier(0.25,1,0.5,1), top 0.35s cubic-bezier(0.25,1,0.5,1)',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDuration: '2.5s' }} />

      {/* Bubble */}
      <span
        className={`relative flex items-center justify-center w-full h-full rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-transform ${
          dragging ? 'scale-110' : 'hover:scale-105'
        }`}
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
        </svg>
      </span>
    </div>
  );
}
