export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="p-4 text-xs bg-[#f0eee6] border-t border-neutral-300">
        <div className="max-w-4xl mx-auto w-full text-neutral-600 justify-between flex items-center gap-2 flex-wrap">
          <p>© {currentYear} Panache · All rights reserved.</p>
          <p>Designed with ❤️ from 🇫🇷.</p>
        </div>
      </div>
    </footer>
  )
}
