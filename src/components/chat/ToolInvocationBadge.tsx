import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args?: Record<string, any>;
  state: string;
  result?: unknown;
}

function fileName(path?: string) {
  if (!path) return "";
  return path.split("/").pop() || path;
}

export function getToolMessage(tool: ToolInvocation): string {
  const args = tool.args || {};

  if (tool.toolName === "str_replace_editor") {
    const path = fileName(args.path);
    switch (args.command) {
      case "create":
        return `Creating ${path}`;
      case "str_replace":
      case "insert":
        return `Editing ${path}`;
      case "view":
        return `Viewing ${path}`;
      case "undo_edit":
        return `Undoing changes to ${path}`;
      default:
        return `Updating ${path}`;
    }
  }

  if (tool.toolName === "file_manager") {
    const path = fileName(args.path);
    switch (args.command) {
      case "rename":
        return `Renaming ${path} to ${fileName(args.new_path)}`;
      case "delete":
        return `Deleting ${path}`;
      default:
        return `Updating ${path}`;
    }
  }

  return tool.toolName;
}

export function ToolInvocationBadge({
  toolInvocation,
}: {
  toolInvocation: ToolInvocation;
}) {
  const message = getToolMessage(toolInvocation);
  const isDone = toolInvocation.state === "result" && !!toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}
