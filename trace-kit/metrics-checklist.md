# What a multi-agent dashboard must show

For each item, the event fields that feed it (see `event.schema.json`).

| Item | What it shows | Fields it needs |
| --- | --- | --- |
| Run trail by trace id | every step of one run, in order, as a tree | `trace_id`, `id`, `parent_id`, `ts` |
| Failed hand-off | which step failed and which agent called it | `status`, `parent_id`, `agent` |
| Retries and escalations | steps repeated, and steps passed to a human or a stronger agent | `status` `retry`, `parent_id`, `agent` |
| Latency per agent | slow agents, as a median and a worst case | `agent`, `latency` |
| Cost per agent and per run vs cap | spend by agent, by run, and runs over the cap you set | `agent`, `cost`, `trace_id` |
| Stuck runs | runs with a start and no end after a time you set | `trace_id`, `ts`, `status` |
| Human-review queue | runs waiting for a person to approve or fix | `trace_id`, `status`, `agent` |

Some items need more than events. Stuck runs need a clock that checks open runs. The human-review queue needs your code to mark a run as waiting.
