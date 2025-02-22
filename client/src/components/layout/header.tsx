import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Safety Updates", href: "/updates" },
    { name: "Fire Drills", href: "/fire-drills" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <Link href="/">
              <a className="text-xl font-bold">Nuclear Safety Portal</a>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}