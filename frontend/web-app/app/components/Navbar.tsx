import DynamicAuth from "./DynamicAuth";

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between">
      <div className="text-2xl font-bold">* Nori</div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-900">Why Nori?</a>
        <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
        {/* <a href="#" className="text-gray-600 hover:text-gray-900">Solutions</a> */}
        <a href="#news" className="text-gray-600 hover:text-gray-900">Developers</a>
      </nav>
      {/* <Button className="bg-[#0A3622]"><Link href={'/dashboard'}>Login</Link></Button> */}
      <DynamicAuth />
    </header>
  )
}