import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className='px-6 max-w-7xl mx-auto mt-6 mb-2'>
      <ol className='flex items-center gap-2 text-xs text-slate-400 flex-wrap'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className='flex items-center gap-2'>
              {isLast ? (
                <span className='text-slate-600 font-medium line-clamp-1 max-w-[200px]'>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className='text-slate-900 
                                hover:text-transparent 
                                hover:bg-clip-text 
                                hover:bg-gradient-to-r 
                                hover:from-red-400 
                                hover:via-orange-400 
                                hover:via-cyan-500 
                                hover:to-violet-400 
                                transition-all duration-300'
                  >
                    {item.label}
                  </Link>
                  <ChevronRightIcon size={12} className='text-slate-500' />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb