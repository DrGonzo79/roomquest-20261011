"use client";

import {useMemo, useState} from "react";
import fixture from "../data/demo_scenes.json";

type Template = "escape" | "platformer" | "party";
type Scene = (typeof fixture.scenes)[number];
type Plan = {
  readiness: number;
  status: "ready" | "needs_reshoot";
  warnings: string[];
  route: string[];
  price: number;
  deliveryDays: number;
};

const templateLabels: Record<Template, {name: string; description: string}> = {
  escape: {name: "Hidden-key escape", description: "Three clues lead through the room to a personal reveal."},
  platformer: {name: "Pet rescue run", description: "Collect keepsakes while guiding a pet avatar home."},
  party: {name: "Six-player scramble", description: "Short rounds built for a birthday group on one screen."},
};

function buildPlan(scene: Scene, template: Template, tier: "birthday" | "party"): Plan {
  const penalty = scene.blurry * 8 + scene.dark * 10 + scene.reflective * 6;
  const readiness = Math.max(18, Math.min(98, scene.photoCount * 7 - penalty));
  const warnings = [
    ...(scene.photoCount < 10 ? ["Add more wide-angle room photos (10 minimum)."] : []),
    ...(scene.dark > 1 ? ["Reshoot dark corners with room lights on."] : []),
    ...(scene.blurry > 1 ? ["Replace blurry photos before scene reconstruction."] : []),
    ...(scene.reflective > 1 ? ["Capture mirrors from an angle to reduce artifacts."] : []),
  ];
  const price = tier === "party" ? 249 : 149;
  return {
    readiness,
    status: readiness >= 70 && scene.photoCount >= 10 ? "ready" : "needs_reshoot",
    warnings,
    route: template === "escape"
      ? ["Entry clue by the bookcase", "Photo cipher at the sofa", "Final key beside the window"]
      : template === "platformer"
        ? ["Start at the rug", "Collect three memory tokens", "Pet-avatar finish at the doorway"]
        : ["Warm-up in the living room", "Two team clue rounds", "Birthday reveal at the window"],
    price,
    deliveryDays: 3,
  };
}

export default function Home() {
  const [recipient, setRecipient] = useState("Alex");
  const [sceneId, setSceneId] = useState(fixture.scenes[0].id);
  const [template, setTemplate] = useState<Template>("escape");
  const [tier, setTier] = useState<"birthday" | "party">("birthday");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const scene = fixture.scenes.find((item) => item.id === sceneId) ?? fixture.scenes[0];
  const preview = useMemo(() => buildPlan(scene, template, tier), [scene, template, tier]);

  function selectScene(id: string) {
    setSceneId(id);
    setPlan(null);
    setChecked([]);
    setError("");
  }

  function generate() {
    const cleanName = recipient.trim();
    if (cleanName.length < 2 || cleanName.length > 30) {
      setError("Enter a recipient name between 2 and 30 characters.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setPlan(buildPlan(scene, template, tier));
      setChecked([]);
      setLoading(false);
    }, 350);
  }

  function toggleCheck(item: string) {
    setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  }

  return (
    <main id="top">
      <header>
        <a className="brand" href="#top"><span>RQ</span>RoomQuest</a>
        <span className="demo-pill">Fictional rooms · simulated reconstruction</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">GIFT-GAME PREVIEW STUDIO</p>
          <h1>Turn their living room<br/><i>into the adventure.</i></h1>
          <p className="lede">Choose a photo set, shape a personalized game, and run a quality gate before a human builder touches the order.</p>
          <a className="hero-link" href="#studio">Build a demo route ↓</a>
        </div>
        <aside className="hero-card">
          <small>THE GIFT WEDGE</small>
          <strong>Real home.<br/>Real people.<br/>Playable memory.</strong>
          <p>Demo only. No photos upload, 3D generation, purchase, or hosted game occurs here.</p>
        </aside>
      </section>

      <section className="studio" id="studio">
        <aside className="scene-rail">
          <p className="eyebrow">1 · CHOOSE A PHOTO SET</p>
          {fixture.scenes.map((item) => (
            <button key={item.id} className={sceneId === item.id ? "scene active" : "scene"} onClick={() => selectScene(item.id)} aria-pressed={sceneId === item.id}>
              <span className="scene-art" style={{background: item.color}}>{item.symbol}</span>
              <span><b>{item.name}</b><small>{item.photoCount} photos · {item.note}</small></span>
              <em>{buildPlan(item, template, tier).readiness}%</em>
            </button>
          ))}
          <div className="privacy-note"><b>Privacy boundary</b><p>A production service must expire source photos, strip metadata, and offer one-click deletion. This static demo stores nothing.</p></div>
        </aside>

        <div className="builder">
          <div className="section-title"><div><p className="eyebrow">2 · SHAPE THE GIFT</p><h2>Build brief</h2></div><span>{scene.name}</span></div>
          <div className="form-grid">
            <label>Recipient name<input aria-label="Recipient name" value={recipient} maxLength={31} onChange={(event) => {setRecipient(event.target.value); setPlan(null);}}/></label>
            <fieldset><legend>Offer</legend><button onClick={() => {setTier("birthday"); setPlan(null);}} className={tier === "birthday" ? "active" : ""} aria-pressed={tier === "birthday"}>Birthday · $149</button><button onClick={() => {setTier("party"); setPlan(null);}} className={tier === "party" ? "active" : ""} aria-pressed={tier === "party"}>Party · $249</button></fieldset>
          </div>

          <div className="templates"><p className="eyebrow">GAME TEMPLATE</p>{(Object.keys(templateLabels) as Template[]).map((key) => (
            <button key={key} className={template === key ? "template active" : "template"} onClick={() => {setTemplate(key); setPlan(null);}} aria-pressed={template === key}>
              <span>{key === "escape" ? "⌁" : key === "platformer" ? "↗" : "✦"}</span><b>{templateLabels[key].name}</b><small>{templateLabels[key].description}</small>
            </button>
          ))}</div>

          <div className="readiness" aria-label="Photo readiness preview"><div><small>PHOTO READINESS</small><strong>{preview.readiness}%</strong></div><div className="meter"><span style={{width: `${preview.readiness}%`}}/></div><p>{preview.status === "ready" ? "Ready for a human QA pass." : "Reshoots required before a trustworthy preview."}</p></div>
          {error && <p role="alert" className="error">{error}</p>}
          <button className="primary" onClick={generate} disabled={loading}>{loading ? "Building the route…" : "Generate gift brief"}</button>

          {!plan && <div className="empty"><b>No finished brief yet.</b><p>Configure the scene and template. The deterministic demo engine will expose quality risks instead of pretending AI fixed them.</p></div>}
          {plan && <section className="result" aria-live="polite">
            <div className="result-head"><div><small>DEMO BRIEF FOR</small><h3>{recipient.trim()}’s {templateLabels[template].name}</h3></div><span className={plan.status}>{plan.status === "ready" ? "QA ready" : "Needs reshoot"}</span></div>
            <div className="route-map">{plan.route.map((stop, index) => <div key={stop}><span>{index + 1}</span><p>{stop}</p></div>)}</div>
            <div className="result-grid">
              <div><h4>Production truth</h4><p>${plan.price} demo offer · {plan.deliveryDays}-day target</p><p>Human QA required before buyer preview.</p>{plan.warnings.length ? plan.warnings.map((warning) => <p className="warning" key={warning}>! {warning}</p>) : <p className="good">✓ Source set clears the demo gate.</p>}</div>
              <div className="checklist"><div><h4>Gift-grade QA</h4><small>{checked.length}/3 checked</small></div>{["Faces and private screens are obscured", "Every clue is solvable without guidance", "Buyer approved the preview before delivery"].map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggleCheck(item)}/><span>{item}</span></label>)}</div>
            </div>
          </section>}
        </div>
      </section>

      <footer><b>RoomQuest prototype</b><span>Static frontend demo · FastAPI planning engine is tested source, not a live service</span></footer>
    </main>
  );
}
