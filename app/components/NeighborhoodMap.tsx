"use client";

import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categoryColors, categoryLabels, googleMapsUrl, PoiCategory, pois, propertyMarker } from "../data/poi";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
if (MAPBOX_TOKEN) mapboxgl.accessToken = MAPBOX_TOKEN;

const categories: ("all" | PoiCategory)[] = [
  "all",
  "beaches",
  "dining",
  "shopping",
  "outdoors",
  "schools",
  "transport",
  "resorts",
  "culture",
];

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

const ICONS: Record<PoiCategory, string> = {
  beaches:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0 3 1.6 4.5 0M3 13c1.5-1.6 3-1.6 4.5 0s3 1.6 4.5 0 3-1.6 4.5 0 3 1.6 4.5 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  dining:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 3v8c0 1.5 1 3 3 3v7M7 3v6c0 1 .5 1.5 1.5 1.5S10 10 10 9V3M16 3c-1.5 0-3 1.5-3 3.5v5c0 1 .5 1.5 1.5 1.5h1.5V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  shopping:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 8h14l-1.4 11a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5 8zM9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  outdoors:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l-7 14h14L12 3zM6 21h12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  schools:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 9l10-5 10 5-10 5L2 9zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  transport:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12l-9 6 1-4H3l1-4h11l-1-4 8 6z" fill="currentColor"/></svg>',
  resorts:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 20V11l8-6 8 6v9M9 20v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  culture:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5 21V9l7-5 7 5v12M5 21h14M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>',
};

const STAR_SVG =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.6l2.95 6.04 6.65.96-4.8 4.69 1.13 6.61L12 17.78l-5.93 3.12 1.13-6.61-4.8-4.69 6.65-.96L12 2.6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" fill="currentColor"/></svg>';

export function NeighborhoodMap() {
  const mapNode = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Record<string, mapboxgl.Marker>>({});
  const popups = useRef<Record<string, mapboxgl.Popup>>({});
  const [filter, setFilter] = useState<"all" | PoiCategory>("all");
  const [active, setActive] = useState(pois[0].id);
  const [mapState, setMapState] = useState<"loading" | "ready" | "error">("loading");
  const [mapMessage, setMapMessage] = useState("Loading live neighborhood map...");

  const filtered = useMemo(() => pois.filter((poi) => filter === "all" || poi.category === filter), [filter]);
  const closePopups = useCallback(() => {
    Object.values(popups.current).forEach((popup) => popup.remove());
  }, []);

  useEffect(() => {
    if (!mapNode.current || mapRef.current || !MAPBOX_TOKEN) return;
    let map: mapboxgl.Map;
    try {
      map = new mapboxgl.Map({
        container: mapNode.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: propertyMarker.coords,
        zoom: 12.7,
        pitch: 44,
        bearing: -14,
        antialias: true,
        attributionControl: false,
      });
    } catch (error) {
      console.error("Mapbox failed to initialize", error);
      return;
    }
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    let hasLoaded = false;
    map.on("load", () => {
      hasLoaded = true;
      map.resize();
      setMapState("ready");
    });
    map.on("error", (event) => {
      if (hasLoaded) return;
      const message = event.error?.message || "Mapbox could not load this map.";
      console.error("Mapbox runtime error", message);
      setMapMessage(message);
      setMapState("error");
    });
    const resizeObserver = new ResizeObserver(() => map.resize());
    if (mapNode.current) resizeObserver.observe(mapNode.current);

    map.on("style.load", () => {
      try {
        map.setFog({
          color: "#F4EEDF",
          "high-color": "#C8D6DA",
          "horizon-blend": 0.08,
        });
        map.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14.5,
          paint: {
            "fill-extrusion-color": "#DBCFB7",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.35,
          },
        });
      } catch (error) {
        console.warn("Non-critical map styling failed", error);
      }
    });

    const prop = document.createElement("button");
    prop.className = "mv-prop-marker";
    prop.innerHTML = STAR_SVG;
    prop.setAttribute("aria-label", "437 Heliotrope");
    prop.addEventListener("click", closePopups);
    const propertyPopup = new mapboxgl.Popup({ offset: 32, closeButton: false, maxWidth: "300px" }).setHTML(`
      <div style="background:#13110E;color:#F4EEDF;padding:22px 22px 20px">
        <p style="margin:0;font-family:var(--font-inter,system-ui);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#A85A2F">The Property</p>
        <h3 style="margin:10px 0 6px;font-family:var(--font-fraunces,serif);font-weight:300;font-size:24px;letter-spacing:-.02em">437 Heliotrope</h3>
        <p style="margin:0;color:rgba(244,238,223,.72);font-size:14px;line-height:1.5">Two connected Corona del Mar condos — sold separately — on a 3,540 SF village lot.</p>
      </div>`);
    popups.current.property = propertyPopup;
    new mapboxgl.Marker({ element: prop })
      .setLngLat(propertyMarker.coords)
      .setPopup(propertyPopup)
      .addTo(map);

    pois.forEach((poi, index) => {
      const el = document.createElement("button");
      el.className = "mv-marker";
      el.style.setProperty("--c", categoryColors[poi.category]);
      el.style.animationDelay = `${index * 28}ms`;
      el.setAttribute("aria-label", poi.name);
      el.innerHTML = `${ICONS[poi.category]}<span>${poi.name}</span>`;
      const dist = miles(propertyMarker.coords, poi.coords);
      const popup = new mapboxgl.Popup({ offset: 22, closeButton: false, maxWidth: "320px" }).setHTML(`
        <div style="padding:22px 22px 20px;background:#F4EEDF;color:#13110E">
          <p style="margin:0;font-family:var(--font-inter,system-ui);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:${categoryColors[poi.category]}">${categoryLabels[poi.category]}</p>
          <h3 style="margin:10px 0 6px;font-family:var(--font-fraunces,serif);font-weight:300;font-size:22px;letter-spacing:-.02em;line-height:1.05">${poi.name}</h3>
          <p style="margin:0 0 6px;font-size:13px;line-height:1.55;color:rgba(19,17,14,.55)">${poi.address}</p>
          <p style="margin:0 0 14px;font-size:14px;line-height:1.55;color:rgba(19,17,14,.7)">${poi.blurb}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid rgba(19,17,14,.1);padding-top:12px">
            <span style="font-family:var(--font-inter,system-ui);font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(19,17,14,.5)">${dist.toFixed(1)} mi · ~${Math.max(2, Math.round((dist / 22) * 60))} min drive</span>
            <a href="${googleMapsUrl(poi)}" target="_blank" rel="noopener noreferrer" style="font-family:var(--font-inter,system-ui);font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#A85A2F;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px">Open in Maps →</a>
          </div>
        </div>`);
      el.addEventListener("click", () => {
        setActive(poi.id);
        map.flyTo({
          center: poi.coords,
          zoom: 14.6,
          pitch: 52,
          bearing: -14,
          speed: 0.85,
          curve: 1.6,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
        closePopups();
      });
      popups.current[poi.id] = popup;
      markers.current[poi.id] = new mapboxgl.Marker({ element: el }).setLngLat(poi.coords).setPopup(popup).addTo(map);
    });

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      markers.current = {};
      popups.current = {};
    };
  }, [closePopups]);

  useEffect(() => {
    Object.entries(markers.current).forEach(([id, marker]) => {
      const show = filtered.some((poi) => poi.id === id);
      marker.getElement().style.display = show ? "grid" : "none";
      marker.getElement().classList.toggle("is-active", id === active);
      if (!show) popups.current[id]?.remove();
    });
  }, [active, filtered]);

  const focusPoi = (id: string) => {
    const poi = pois.find((item) => item.id === id);
    const marker = markers.current[id];
    const map = mapRef.current;
    if (!poi || !marker || !map) return;
    setActive(id);
    map.flyTo({
      center: poi.coords,
      zoom: 14.6,
      pitch: 52,
      bearing: -14,
      speed: 0.85,
      curve: 1.6,
    });
    closePopups();
    popups.current[id]?.setLngLat(poi.coords).addTo(map);
  };

  return (
    <section className="relative bg-pearl section-pad">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">10 — Neighborhood</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.8rem)] font-light leading-[1.02] tracking-[-0.035em]">
              The everyday <span className="italic">geography</span> of the address.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-[1.75] text-ink/68 lg:pb-3">
            Beaches, dining, schools, shopping, transport, trails, resorts, and Newport culture orbit 437 Heliotrope.
            Tap any marker or list item for context, distance, and a direct link to the location in Google Maps.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[360px_1fr]">
          <aside className="flex h-[520px] flex-col rounded-sm border border-line bg-bone lg:h-[680px]">
            <div className="flex flex-wrap gap-2 border-b border-line p-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`inline-flex items-center justify-center rounded-full border px-3.5 py-2 text-[0.6rem] font-medium uppercase tracking-widest3 shadow-sm transition ${
                    filter === cat
                      ? "border-ink bg-ink text-bone shadow-[0_12px_24px_-16px_rgba(19,17,14,0.8)]"
                      : "border-line bg-pearl/55 text-ink/62 hover:border-ink/25 hover:bg-pearl hover:text-ink"
                  }`}
                >
                  {cat === "all" ? "All" : categoryLabels[cat]}
                </button>
              ))}
            </div>
            <div className="no-scrollbar flex-1 overflow-auto p-2">
              {filtered.map((poi) => (
                <div
                  key={poi.id}
                  className={`group rounded-sm p-3 transition ${active === poi.id ? "bg-pearl" : "hover:bg-pearl/55"}`}
                >
                  <button
                    onClick={() => focusPoi(poi.id)}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: categoryColors[poi.category] }}
                    />
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-[1.05rem] font-normal leading-tight tracking-[-0.02em]">
                          {poi.name}
                        </span>
                        <span className="tabular text-[0.62rem] font-medium uppercase tracking-widest3 text-ink/45">
                          {miles(propertyMarker.coords, poi.coords).toFixed(1)} mi
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.85rem] leading-5 text-ink/58">{poi.blurb}</span>
                    </span>
                  </button>
                  <a
                    href={googleMapsUrl(poi)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-5 mt-2 inline-flex items-center gap-1 text-[0.6rem] font-medium uppercase tracking-widest3 text-ember/0 transition group-hover:text-ember"
                  >
                    Open in Maps →
                  </a>
                </div>
              ))}
            </div>
          </aside>

          <div className="relative h-[520px] overflow-hidden rounded-sm border border-line bg-bone lg:h-[680px]">
            <div ref={mapNode} className="absolute inset-0" />
            {mapState !== "ready" ? (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-bone/80 text-center backdrop-blur-[2px]">
                <div className="max-w-sm px-6">
                  <p className="eyebrow-plain text-ink/45">
                    {mapState === "error" ? "Map unavailable" : "Loading Mapbox"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-ink/62">{mapMessage}</p>
                </div>
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(19,17,14,.18)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4">
              <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-line bg-bone/95 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-widest3 text-ink/65 shadow-[0_18px_40px_-15px_rgba(19,17,14,0.4)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ember" />
                  The Property
                </span>
                {(Object.keys(categoryLabels) as PoiCategory[]).map((cat) => (
                  <span key={cat} className="hidden items-center gap-1.5 sm:flex">
                    <span className="h-2 w-2 rounded-full" style={{ background: categoryColors[cat] }} />
                    {categoryLabels[cat]}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() =>
                mapRef.current?.flyTo({ center: propertyMarker.coords, zoom: 12.7, pitch: 44, bearing: -14 })
              }
              className="absolute left-4 top-4 rounded-full border border-line bg-bone/95 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-widest3 text-ink/65 shadow-[0_18px_40px_-15px_rgba(19,17,14,0.4)] transition hover:text-ink"
            >
              Recenter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
