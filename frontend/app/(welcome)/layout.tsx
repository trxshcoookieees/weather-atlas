export default function WelcomeLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="m-auto w-full max-w-125 px-8 text-center">{children}</main>
  );
}
