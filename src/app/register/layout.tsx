import Link from "next/link";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen bg-beige-normal">
            <nav className="bg-darkblue-normal h-20">
                <div className="flex items-center justify-between px-16 lg:px-32 h-20">
                    <Link href="/" className="cursor-pointer">
                        <img
                            src="../logo-login.svg"
                            alt=""
                            className="w-[75%]"
                        />
                    </Link>
                    <Link href="/login">
                        <p className="text-lighttext-normal text-md font-semibold">
                            Já possui conta?{" "}
                            <span className="text-lime-normal">Entrar</span>
                        </p>
                    </Link>
                </div>
            </nav>
            {children}
        </div>
    );
}
