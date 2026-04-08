import ercicon from "../../assets/erc-icon.png";

export default function AuthLoader() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">
            {/* Background skeleton */}
            <div className="absolute inset-0 flex">
                {/* Sidebar skeleton */}
                <div className="hidden md:flex w-72 h-full border-r border-slate-200 bg-slate-50 flex-col p-6">
                    <div className="h-14 w-36 rounded-xl bg-slate-200/70 animate-pulse mb-8" />
                    <div className="space-y-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-12 w-full rounded-xl bg-slate-200/60 animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* Main content skeleton */}
                <div className="flex-1 flex flex-col">
                    {/* Header skeleton */}
                    <div className="h-20 border-b border-slate-200 bg-white/70 px-8 flex items-center justify-between">
                        <div className="h-10 w-72 rounded-full bg-slate-200/70 animate-pulse" />
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-28 rounded-full bg-slate-200/70 animate-pulse" />
                            <div className="h-10 w-10 rounded-full bg-slate-200/70 animate-pulse" />
                        </div>
                    </div>

                    {/* Page content skeleton */}
                    <div className="p-8 md:p-10 space-y-8">
                        <div className="space-y-3">
                            <div className="h-4 w-36 rounded bg-slate-200/70 animate-pulse" />
                            <div className="h-10 w-72 rounded bg-slate-200/70 animate-pulse" />
                            <div className="h-4 w-64 rounded bg-slate-200/60 animate-pulse" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-28 rounded-2xl bg-white border border-slate-200 shadow-sm p-6"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-14 w-14 rounded-xl bg-slate-200/70 animate-pulse" />
                                        <div className="flex-1 space-y-3">
                                            <div className="h-6 w-20 rounded bg-slate-200/70 animate-pulse" />
                                            <div className="h-3 w-24 rounded bg-slate-200/60 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 space-y-3">
                                <div className="h-5 w-36 rounded bg-slate-200/70 animate-pulse" />
                                <div className="h-4 w-52 rounded bg-slate-200/60 animate-pulse" />
                            </div>

                            <div className="p-6 space-y-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="grid grid-cols-5 gap-4 items-center"
                                    >
                                        <div className="h-4 rounded bg-slate-200/70 animate-pulse col-span-1" />
                                        <div className="h-4 rounded bg-slate-200/60 animate-pulse col-span-1" />
                                        <div className="h-4 rounded bg-slate-200/60 animate-pulse col-span-1" />
                                        <div className="h-6 w-20 rounded-full bg-slate-200/70 animate-pulse col-span-1" />
                                        <div className="h-8 w-20 rounded-lg bg-slate-200/70 animate-pulse justify-self-end" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />

            {/* Center loader */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="flex flex-col items-center gap-6">
                    {/* Icon + dots */}
                    <div className="flex items-center gap-4">
                        <img
                            src={ercicon}
                            alt="ERC"
                            className="h-14 w-14 object-contain animate-[softWiggle_1.8s_ease-in-out_infinite]"
                        />

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500 animate-[dotBounce_1.2s_ease-in-out_infinite]" />
                            <span className="h-3 w-3 rounded-full bg-red-500 animate-[dotBounce_1.2s_ease-in-out_0.15s_infinite]" />
                            <span className="h-3 w-3 rounded-full bg-red-500 animate-[dotBounce_1.2s_ease-in-out_0.3s_infinite]" />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }

        @keyframes softWiggle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(-4deg) scale(1.02);
          }
          50% {
            transform: rotate(3deg) scale(1.04);
          }
          75% {
            transform: rotate(-2deg) scale(1.02);
          }
        }
      `}</style>
        </div>
    );
}
