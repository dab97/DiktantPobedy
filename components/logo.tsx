import Image from "next/image"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image src="/images/logo.png" alt="Логотип" width={80} height={80} className="h-full w-auto" priority />
    </div>
  )
}
