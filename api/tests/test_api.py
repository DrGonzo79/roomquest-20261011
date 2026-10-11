from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def payload(**overrides):
    base = {"scene_id": "SCN-101", "recipient": "Alex", "template": "escape", "tier": "birthday"}
    return {**base, **overrides}


def test_health_marks_fixture_fictional():
    assert client.get("/health").json() == {"status": "ok", "fixture": "fictional"}


def test_builds_ready_brief_with_route_and_price():
    response = client.post("/brief", json=payload())
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ready"
    assert body["price"] == 149
    assert body["human_qa_required"] is True
    assert len(body["route"]) == 3


def test_low_quality_scene_requires_reshoot():
    response = client.post("/brief", json=payload(scene_id="SCN-103", tier="party"))
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "needs_reshoot"
    assert body["price"] == 249
    assert len(body["warnings"]) >= 3


def test_rejects_invalid_template_and_short_name():
    assert client.post("/brief", json=payload(template="shooter")).status_code == 422
    assert client.post("/brief", json=payload(recipient="A")).status_code == 422


def test_unknown_scene_is_visible_failure():
    response = client.post("/brief", json=payload(scene_id="missing"))
    assert response.status_code == 404
    assert response.json()["detail"] == "Demo scene not found"
