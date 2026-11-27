# Event to OpenTelemetry mapping

OpenTelemetry has GenAI conventions for agent spans. Map one event to one span like this:

| Event field | Span |
| --- | --- |
| `trace_id` | trace id |
| `id` | span id |
| `parent_id` | parent span id |
| `agent` | `gen_ai.agent.name` |
| (operation) | `gen_ai.operation.name` = `invoke_agent` |
| `status` = `failed` | span status error, with `error.type` set to the event's error type |
| `latency` | span duration |
| token counts | `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens` |
| `cost` | a custom attribute: the conventions define no cost attribute, so pick one name and keep it |

`ts` is the span start time.

The GenAI conventions are in Development status. Attribute names can change. Check the source before you rely on a name:
https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md
