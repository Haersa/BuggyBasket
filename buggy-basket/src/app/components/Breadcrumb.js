import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index < items.length - 1 ? (
            <>
              <Link href={item.href} className="breadcrumb-link">{item.label}</Link>
              <ChevronRight size={14} className="breadcrumb-separator" />
            </>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}