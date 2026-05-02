import Link from "next/link";
import type { Author } from "@/lib/authors";

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="border border-[#dde5f0] rounded-xl p-5 bg-white flex gap-4 items-start mt-8">
      <Link href={`/author/${author.id}`} className="shrink-0">
        <div
          className={`w-14 h-14 rounded-full ${author.avatarColor} text-white flex items-center justify-center text-xl font-black shadow`}
        >
          {author.avatarInitials}
        </div>
      </Link>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 mb-0.5">この記事の著者</p>
        <Link href={`/author/${author.id}`} className="hover:text-brand-blue transition">
          <p className="font-bold text-gray-900">{author.name}</p>
        </Link>
        <p className="text-xs text-brand-blue font-medium mb-2">{author.role}</p>
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{author.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {author.credentials.map((c) => (
            <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-100 font-medium">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
