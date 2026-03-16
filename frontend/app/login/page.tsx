import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-850 px-6">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(#8B4513 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* 柔和的土地色光暈 */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-stone-200/40 blur-[120px]" />
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        <LoginForm />
        <a href="/" className="mt-6 text-sm text-zinc-500 hover:text-zinc-800">
          ← Back to Home Page
        </a>
      </div>
    </main>
  );
}
