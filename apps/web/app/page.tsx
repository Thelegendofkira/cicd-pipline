import { prisma } from "@repo/db";
import { User, ShieldAlert } from "lucide-react"; // Optional: Icons for visual flair

export default async function Home() {
  // Fetch data
  const user = await prisma.user.findFirst();

  // 1. Handle the "Empty State" (Make it pretty too)
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-8 text-center ring-1 ring-white/10 backdrop-blur-md">
          <ShieldAlert className="h-10 w-10 text-red-400" />
          <p className="font-medium text-gray-300">No user found in database.</p>
        </div>
      </main>
    );
  }

  // 2. The Aesthetic "Success State"
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4">
      
      {/* Card Container */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white/10 p-8 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/15">
        
        {/* Decorative Background Blob */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/30 blur-3xl" />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-4 text-center">
          
          {/* Avatar / Icon Placeholder */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg">
            <User className="h-10 w-10 text-white" />
          </div>

          {/* Text Info */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-xl font-medium text-transparent">
              @{user.username || "Anonymous"}
            </p>
          </div>

          {/* Optional: ID or extra info */}
          <div className="mt-4 rounded-full bg-black/30 px-4 py-1 text-xs font-mono text-gray-400 border border-white/5">
            ID: {}
          </div>
        </div>
      </div>
    </main>
  );
}