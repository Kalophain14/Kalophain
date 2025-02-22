import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Music", href: "/music" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-center">
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                      location === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}