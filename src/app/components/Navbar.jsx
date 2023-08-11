import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="px-5 md:max-w-[90%] mx-auto flex justify-between items-center">
        <Link href="/">
          <h2 className="text-2xl font-bold">Next Mongo</h2>
        </Link>
        <ul>
          <li>
            <Link href="/tasks/new">New Task</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
