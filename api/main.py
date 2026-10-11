from pathlib import Path
import json

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

FIXTURE_PATH = Path(__file__).resolve().parents[1] / "data" / "demo_scenes.json"


class BriefRequest(BaseModel):
    scene_id: str = Field(min_length=1, max_length=30)
    recipient: str = Field(min_length=2, max_length=30)
    template: str = Field(pattern="^(escape|platformer|party)$")
    tier: str = Field(pattern="^(birthday|party)$")


def load_fixture() -> dict:
    if not FIXTURE_PATH.exists():
        raise FileNotFoundError("demo scene fixture is missing")
    return json.loads(FIXTURE_PATH.read_text())


def build_brief(scene: dict, request: BriefRequest) -> dict:
    penalty = scene["blurry"] * 8 + scene["dark"] * 10 + scene["reflective"] * 6
    readiness = max(18, min(98, scene["photoCount"] * 7 - penalty))
    warnings = []
    if scene["photoCount"] < 10:
        warnings.append("Add more wide-angle room photos (10 minimum).")
    if scene["dark"] > 1:
        warnings.append("Reshoot dark corners with room lights on.")
    if scene["blurry"] > 1:
        warnings.append("Replace blurry photos before scene reconstruction.")
    if scene["reflective"] > 1:
        warnings.append("Capture mirrors from an angle to reduce artifacts.")
    routes = {
        "escape": ["Entry clue by the bookcase", "Photo cipher at the sofa", "Final key beside the window"],
        "platformer": ["Start at the rug", "Collect three memory tokens", "Pet-avatar finish at the doorway"],
        "party": ["Warm-up in the living room", "Two team clue rounds", "Birthday reveal at the window"],
    }
    return {
        "fictional": True,
        "scene": scene,
        "recipient": request.recipient.strip(),
        "readiness": readiness,
        "status": "ready" if readiness >= 70 and scene["photoCount"] >= 10 else "needs_reshoot",
        "warnings": warnings,
        "route": routes[request.template],
        "price": 249 if request.tier == "party" else 149,
        "delivery_days": 3,
        "human_qa_required": True,
    }


app = FastAPI(title="RoomQuest API", version="0.1.0")


@app.get("/health")
def health():
    return {"status": "ok", "fixture": "fictional"}


@app.post("/brief")
def create_brief(request: BriefRequest):
    try:
        fixture = load_fixture()
    except (FileNotFoundError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=503, detail="Scene fixture is unavailable") from exc
    scene = next((item for item in fixture["scenes"] if item["id"] == request.scene_id), None)
    if scene is None:
        raise HTTPException(status_code=404, detail="Demo scene not found")
    return build_brief(scene, request)
