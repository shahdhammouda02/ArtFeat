import  { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis
} from "@/components/ui/pagination";

// بيانات وهمية — بدّليها من API أو من ملف data لاحقاً
const DATA = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  artist: "Rawan Ahmad",
  title: ["Think Different (Yellow)", "The Great Beyond", "Fly Over Wide Fields", "Art in Motion"][i % 4],
  price: 635,
  type: ["Painting", "Oil Painting", "Acrylic"][i % 3],
  img: `/placeholder.svg?height=300&width=400&text=Art+Feat+${i + 1}`,
}));

const TYPES = ["All Types", "Painting", "Oil Painting", "Acrylic"];

const PAGE_SIZE = 8;

export default function Section2() {
  const [artist] = useState<string>("All Artists"); // محجوز للتوسعة
  const [type, setType] = useState<string>("All Types");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DATA.filter(item => {
      const byType = type === "All Types" || item.type === type;
      const byQuery = !query || item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query);
      return byType && byQuery;
    });
  }, [q, type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const view = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const reset = () => { setType("All Types"); setQ(""); setPage(1); };

  return (
    <section id="artists-explore" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 space-y-6">
      {/* أدوات الفلترة */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={artist}
            onChange={() => {}}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
          >
            <option>All Artists</option>
          </select>

          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
          >
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What are you searching for?"
              className="pl-9"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setPage(1)}>Apply Filters</Button>
          <Button variant="outline" onClick={reset}>Reset Filters</Button>
        </div>
      </div>

      {/* قائمة فنان + شبكة أعمال */}
      <div className="space-y-6">
        {/* هيدر الفنان (ثابت في المثال) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/placeholder.svg?height=40&width=40" alt="avatar" className="h-10 w-10 rounded-full" />
            <div className="font-semibold">Rawan Ahmad</div>
            <Button variant="secondary" className="h-8 px-3">+ Follow</Button>
          </div>
          <div className="text-sm text-muted-foreground">All artworks</div>
        </div>

        {/* الشبكة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {view.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">Art Feat</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="text-xs">{item.type}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-between">
                <a className="text-sky-600 font-semibold" href="#!">${item.price}</a>
                <div className="text-muted-foreground text-xl">🛒</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* الترقيم */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(p => Math.max(1, p - 1)); }} />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => i + 1)
                .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                .reduce<number[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push(-1);
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) => p === -1 ? (
                  <PaginationItem key={`e-${idx}`}><PaginationEllipsis /></PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink href="#" isActive={p === page} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))
              }

              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
