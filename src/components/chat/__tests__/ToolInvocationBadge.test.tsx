import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import {
  ToolInvocationBadge,
  getToolMessage,
} from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

test("getToolMessage describes creating a file", () => {
  expect(
    getToolMessage({
      toolName: "str_replace_editor",
      args: { command: "create", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Creating Card.tsx");
});

test("getToolMessage describes str_replace as editing a file", () => {
  expect(
    getToolMessage({
      toolName: "str_replace_editor",
      args: { command: "str_replace", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Editing Card.tsx");
});

test("getToolMessage describes insert as editing a file", () => {
  expect(
    getToolMessage({
      toolName: "str_replace_editor",
      args: { command: "insert", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Editing Card.tsx");
});

test("getToolMessage describes viewing a file", () => {
  expect(
    getToolMessage({
      toolName: "str_replace_editor",
      args: { command: "view", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Viewing Card.tsx");
});

test("getToolMessage describes undo_edit", () => {
  expect(
    getToolMessage({
      toolName: "str_replace_editor",
      args: { command: "undo_edit", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Undoing changes to Card.tsx");
});

test("getToolMessage describes renaming a file", () => {
  expect(
    getToolMessage({
      toolName: "file_manager",
      args: {
        command: "rename",
        path: "src/components/Card.tsx",
        new_path: "src/components/Button.tsx",
      },
      state: "result",
    })
  ).toBe("Renaming Card.tsx to Button.tsx");
});

test("getToolMessage describes deleting a file", () => {
  expect(
    getToolMessage({
      toolName: "file_manager",
      args: { command: "delete", path: "src/components/Card.tsx" },
      state: "result",
    })
  ).toBe("Deleting Card.tsx");
});

test("getToolMessage falls back to the raw tool name for unknown tools", () => {
  expect(
    getToolMessage({
      toolName: "some_other_tool",
      args: {},
      state: "result",
    })
  ).toBe("some_other_tool");
});

test("ToolInvocationBadge shows a spinner while the tool call is pending", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/components/Card.tsx" },
        state: "call",
      }}
    />
  );

  expect(screen.getByText("Creating Card.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).not.toBeNull();
});

test("ToolInvocationBadge shows a completed indicator when the tool call has a result", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolInvocation={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "src/components/Card.tsx" },
        state: "result",
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Creating Card.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
  expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
});
