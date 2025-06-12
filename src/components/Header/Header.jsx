import styles from './Header.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

export default function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}> <NavLink to="/"> MyShop</NavLink></div>

      <nav className={styles.desktopNav}>
        <NavLink to="/" className={styles.link}>Hjem</NavLink>
        <NavLink to="/products" className={styles.link}>Produkter</NavLink>
        <NavLink to="/About" className={styles.link}>om os</NavLink>
        
        <Link to="/cart" className={styles.cartIcon}>
          <FaShoppingCart size={24} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>
      </nav>

      <div className={styles.burgerIcon} onClick={() => setMenuOpen(true)}>
        <RxHamburgerMenu size={28} />
      </div>

      <div className={`${styles.overlay} ${menuOpen ? styles.show : ''}`}>
        <div className={styles.closeIcon} onClick={() => setMenuOpen(false)}>
          <IoClose size={28} />
        </div>
        <nav className={styles.mobileNav}>
          <NavLink to="/" className={styles.mobileLink} onClick={handleLinkClick}>Hjem</NavLink>
          <NavLink to="/products" className={styles.mobileLink} onClick={handleLinkClick}>produkter</NavLink>
          <NavLink to="/About" className={styles.mobileLink} onClick={handleLinkClick}>om os</NavLink>
          <Link to="/cart" className={styles.cartIcon} onClick={handleLinkClick}>
            <FaShoppingCart size={24} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}