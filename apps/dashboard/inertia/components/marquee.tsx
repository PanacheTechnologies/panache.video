export default function Marquee() {
  return (
    <div className="py-3 overflow-hidden bg-blue-600 text-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <div key={`text-${i}`} className="flex items-center">
            <span className="text-3xl font-bold px-8 uppercase font-serif">
              Make Newsletters Great Again
            </span>
            <span>
              <span className="text-3xl font-bold uppercase font-serif">·</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
