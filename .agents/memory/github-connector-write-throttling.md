---
name: GitHub connector write throttling
description: Environment-specific behavior when publishing a local repository through the attached GitHub connector.
---

The attached GitHub connection can create repositories and read GitHub data, but bursts of write requests or larger source payloads may be blocked by the Replit Cloudflare layer with an HTML 403. The native client remains authenticated for API calls but reports no direct Git transport credentials, so it cannot be used as a transparent `git push` replacement.

**Why:** A repository publish can leave a partially populated branch if many blob/file writes are attempted without validating each stage.

**How to apply:** Prefer the smallest supported API batches, insert cooldowns between write bursts, verify the branch tree after every batch, and never report a publish as complete while temporary staging paths or missing primary source files remain.