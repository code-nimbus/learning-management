import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Terms of Service"].map((item) => (
          <Link key = {item} 
            href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Footer