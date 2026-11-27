# Trace kit

The event format for feeding an agent dashboard like this one. The sample app in the parent folder does not read these events; it shows fixed sample data.

| File | What it holds |
| --- | --- |
| `event.schema.json` | JSON Schema (draft 2020-12) of one event per agent step |
| `otel-mapping.md` | How an event maps to OpenTelemetry GenAI agent span attributes |
| `metrics-checklist.md` | What a multi-agent dashboard shows and which fields each item needs |

## The event

| Field | Type | Unit or format |
| --- | --- | --- |
| `trace_id` | string | one per run, the same on every event of the run |
| `id` | string | one per step, unique inside the run |
| `parent_id` | string or null | the `id` of the step that started this one |
| `agent` | string | stable agent name, such as `planner` |
| `status` | `ok`, `failed`, `retry` | one of three words |
| `cost` | number | one currency for the whole project, set by you |
| `latency` | integer | milliseconds |
| `ts` | string | UTC start time, ISO 8601 |

The first step of a run has `parent_id` null. A failed event may also hold a short `error` type, such as `timeout`; the schema allows extra fields.

An event holds ids, names, numbers and times. Never put a prompt, a key or a user's text in it.

Example:

```json
{
  "trace_id": "run-0042",
  "id": "step-3",
  "parent_id": "step-2",
  "agent": "writer",
  "status": "retry",
  "cost": 0.0031,
  "latency": 2840,
  "ts": "2026-01-15T09:30:12Z"
}
```

The values are made up for illustration.

More: https://madsalt.tech/kits/agent-trace-kit/
