import LloydAvatar from "./LloydAvatar";

type Props = {
  role: "user" | "lloyd";
  text: string;
  isLoading?: boolean;
};

export default function ChatBubble({ role, text, isLoading }: Props) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-sky-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start">
      <LloydAvatar size={36} className="shrink-0 mt-1" />
      <div className="max-w-[85%] bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-amber-600 mb-1">Lloyd</p>
        {isLoading ? (
          <div className="flex gap-1.5 py-2">
            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        ) : (
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
