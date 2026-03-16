import RegisterForm from "../../components/auth/RegisterForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-zinc-850 px-6">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-100/50 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-sky-100/50 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        <RegisterForm />
        <a href="/" className="mt-6 text-sm text-zinc-500 hover:text-zinc-800">
          ← Back to Home Page
        </a>
      </div>
    </main>
  );
}
