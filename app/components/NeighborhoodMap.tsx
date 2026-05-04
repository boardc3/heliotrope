"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryColors, categoryLabels, PoiCategory, pois, propertyMarker } from "../data/poi";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const categories: ("all" | PoiCategory)[] = ["all", "beaches", "resorts", "dining", "outdoors", "culture"];

function miles(a: [number, number], b: [number, number]) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const r = 3958.8;
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(h));
}

function icon(category: PoiCategory) {
  if (category === "beaches") return "≈";
  if (category === "resorts") return "⌂";
  if (category === "dining") return "•";
  if (category === "outdoors") return "⌁";
  return "✦";
}

export function NeighborhoodMap() {
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  const [filter, setFilter] = useState<"all" | PoiCategory>("all");
  const [active, setActive] = useState(pois[0].id);

  const filtered = useMemo(() => pois.filter((poi) => filter === "all" || poi.category === filter), [filter]);

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: propertyMarker.coords,
      zoom: 12.8,
      pitch: 42,
      bearing: -12,
      antialias: true,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("style.load", () => {
      for (const layer of map.getStyle().layers ?? []) {
        try {
          if (layer.type === "symbol" && layer.id.includes("label")) map.setLayoutProperty(layer.id, "visibility", "none");
          if (layer.type === "fill" && layer.id.includes("water")) map.setPaintProperty(layer.id, "fill-color", "#C9D8DC");
          if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#F2EBDD");
        } catch {
          // Mapbox layer availability varies by style revision; keep the custom map resilient.
        }
      }
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 14.5,
        paint: {
          "fill-extrusion-color": "#DCD2BD",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.35,
        },
      });
    });

    const prop = document.createElement("button");
    prop.className = "mv-prop-marker";
    prop.innerHTML = "★";
    prop.setAttribute("aria-label", "437 Heliotrope");
    new mapboxgl.Marker({ element: prop })
      .setLngLat(propertyMarker.coords)
      .setPopup(new mapboxgl.Popup({ offset: 28 }).setHTML(`<div style="background:#0E1A24;color:#FAF6EC;padding:18px;max-width:260px"><p style="font:11px monospace;letter-spacing:.18em;color:#B8693C">THE PROPERTY</p><h3 style="font-size:24px;margin:8px 0 6px">437 Heliotrope</h3><p style="color:rgba(250,246,236,.72)">A two-residence Corona del Mar property in the village grid.</p></div>`))
      .addTo(map);

    pois.forEach((poi, index) => {
      const el = document.createElement("button");
      el.className = "mv-marker";
      el.style.setProperty("--c", categoryColors[poi.category]);
      el.style.animationDelay = `${index * 25}ms`;
      el.setAttribute("aria-label", poi.name);
      el.innerHTML = `${icon(poi.category)}<span>${poi.name}</span>`;
      const dist = miles(propertyMarker.coords, poi.coords);
      const popup = new mapboxgl.Popup({ offset: 22 }).setHTML(`
        <div style="padding:18px;max-width:290px;background:#FAF6EC;color:#0E1A24">
          <p style="font:11px monospace;letter-spacing:.18em;text-transform:uppercase;color:${categoryColors[poi.category]}">${categoryLabels[poi.category]}</p>
          <h3 style="font-size:24px;line-height:1;margin:8px 0;font-family:serif">${poi.name}</h3>
          <p style="line-height:1.5;color:rgba(14,26,36,.68)">${poi.blurb}</p>
          <p style="margin-top:12px;font:11px monospace;letter-spacing:.16em;text-transform:uppercase">${dist.toFixed(1)} MI · ~${Math.max(2, Math.round((dist / 22) * 60))} MIN DRIVE</p>
        </div>`);
      el.addEventListener("click", () => {
        setActive(poi.id);
        map.flyTo({ center: poi.coords, zoom: 14.6, pitch: 52, bearing: -12, speed: 0.9, curve: 1.6 });
      });
      markers.current[poi.id] = new mapboxgl.Marker({ element: el }).setLngLat(poi.coords).setPopup(popup).addTo(map);
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    Object.entries(markers.current).forEach(([id, marker]) => {
      const show = filtered.some((poi) => poi.id === id);
      marker.getElement().style.display = show ? "grid" : "none";
      marker.getElement().classList.toggle("is-active", id === active);
    });
  }, [active, filtered]);

  const focusPoi = (id: string) => {
    const poi = pois.find((item) => item.id === id);
    const marker = markers.current[id];
    const map = mapRef.current;
    if (!poi || !marker || !map) return;
    setActive(id);
    map.flyTo({ center: poi.coords, zoom: 14.6, pitch: 52, bearing: -12, speed: 0.9, curve: 1.6 });
    marker.togglePopup();
  };

  return (
    <section id="map" className="section-pad bg-pearl">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Neighborhood Map</span>
        <div className="mt-5 grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <h2 className="font-display text-5xl leading-[0.96] tracking-[-0.055em] md:text-7xl">
            Thirty reasons the address matters.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-ink/68">
            Beaches, restaurants, trails, resorts, and Newport culture orbit the property. Tap a marker or list item
            to understand the everyday geography of Heliotrope Avenue.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[380px_1fr]">
          <aside className="rounded-[2rem] bg-bone p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`rounded-full px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.15em] ${filter === cat ? "bg-ink text-bone" : "bg-pearl text-ink/65"}`}>
                  {cat === "all" ? "All" : categoryLabels[cat]}
                </button>
              ))}
            </div>
            <div className="mt-4 max-h-[560px] space-y-2 overflow-auto pr-1">
              {filtered.map((poi) => (
                <button key={poi.id} onClick={() => focusPoi(poi.id)} className={`w-full rounded-2xl p-4 text-left transition ${active === poi.id ? "bg-pearl ring-1 ring-copper" : "hover:bg-pearl/70"}`}>
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="font-display text-xl tracking-[-0.035em]">{poi.name}</span>
                      <span className="mt-1 block text-sm leading-5 text-ink/62">{poi.blurb}</span>
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-wider2" style={{ color: categoryColors[poi.category] }}>
                      {miles(propertyMarker.coords, poi.coords).toFixed(1)} mi
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <div className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-bone">
            <div ref={mapNode} className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(14,26,36,.18)_100%)]" />
            <button onClick={() => mapRef.current?.flyTo({ center: propertyMarker.coords, zoom: 12.8, pitch: 42, bearing: -12 })} className="absolute right-4 top-4 rounded-full bg-bone px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider2 shadow-xl">
              Recenter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
