import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import PaymentMethod from "../Services/PaymentMethod";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgetPassword from "../pages/ForgetPassword";

function Frontend({ children, showFooter = true }) {
  return (
    <div className="w-full h-screen bg-linear-to-b from-slate-700 to-zinc-600  flex flex-col overflow-hidden relative ">
      <header className="w-ful min-h-10 backdrop-blur-lg shadow-2xl border border-slate-600/80  p-2 md:p-5 relative z-100">
        <Header />
      </header>
      <main className="flex-1 w-full min-h-0 flex gap-2 overflow-hidden ">
        <aside className="md:w-64 shrink h-[calc(100vh-64px)] border-slate-600/80 backdrop-blur-lg shadow-2xl overflow-hidden pl-2">
          <Sidebar />
        </aside>

        <section className="flex-1 overflow-y-auto min-h-0 hide-scrollbar p-5">
          {children}
          <PaymentMethod />
          <Login/>
          <Signup/>
          <ForgetPassword/>
          {showFooter && (
            <footer className="">
              <Footer />
            </footer>
          )}
        </section>
      </main>
    </div>
  );
}

export default Frontend;
