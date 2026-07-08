---
name: pr-description
description: writes pull request descriptions. Use when create a PR, writing a PR, or when the user asks to summarize changes of a pull request.
---

when writing an PR description:

1. Run 'git diff main...HEAD' to see the changes on this branch.
2. Write a description following this format.

## what
one sentence explaining what this PR does.

## why
Brief context on why this change is needed.

## changes 
- Bullet points of specific changes made.
- Group related changes together.
- Mention any files deleted or renamed.

## Test
How to verify this works. Include specific commands if relevant.

Keep description concise. Focus on what a reviewer needs to know.