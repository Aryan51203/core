import SideBar from "./components/SideBar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      {children}
    </div>
  );
}
