import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Логотип"
        width={80}
        height={80}
        blurDataURL="data:..."
        placeholder="blur"
        className="h-full w-auto"
        priority
      />
    </div>
  );
}
