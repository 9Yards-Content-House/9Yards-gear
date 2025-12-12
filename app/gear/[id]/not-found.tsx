import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Equipment Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The equipment you&apos;re looking for doesn&apos;t exist or may have been removed from our inventory.
          </p>
          <Button asChild>
            <Link href="/inventory">Browse All Equipment</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
