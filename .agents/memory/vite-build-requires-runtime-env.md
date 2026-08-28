---
name: Vite artifact build environment
description: The We Grow Kids Vite config validates runtime environment inputs during local production builds.
---

The We Grow Kids Vite build requires both `PORT` and `BASE_PATH` to be present, including for one-off production builds.

**Why:** The artifact config uses those values for the server and emitted asset base path instead of supplying development defaults.

**How to apply:** When validating a local build outside the managed workflow, provide a valid port and the artifact base path explicitly.