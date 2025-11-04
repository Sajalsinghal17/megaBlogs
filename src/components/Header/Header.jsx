import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";
import { FiMenu, FiX, FiSearch, FiHome, FiUser, FiPlusCircle, FiBook, FiGrid } from "react-icons/fi";
import SearchModal from "../SearchModal/SearchModal";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", icon: <FiHome />, active: true },
    { name: "Blogs", slug: "/all-posts", icon: <FiBook />, active: true },
    { name: "Login", slug: "/login", icon: <FiUser />, active: !authStatus },
    { name: "Signup", slug: "/signup", icon: <FiUser />, active: !authStatus },
    { name: "Add Post", slug: "/add-post", icon: <FiPlusCircle />, active: authStatus },
    { name: "Dashboard", slug: "/dashboard", icon: <FiGrid />, active: authStatus },
    { name: "About", slug: "/about", icon: <FiUser />, active: true },
  ];

  const handleNav = (slug) => {
    navigate(slug);
    setMobileMenuOpen(false); // close menu on navigation
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 font-poppins">
      <Container>
        <nav className="flex justify-between items-center py-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.slug)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-gray-700 hover:bg-red-100 transition-all"
                  >
                    {item.icon}
                    {item.name}
                  </button>
                )
            )}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              <FiSearch />
              Search
            </button>
            {authStatus && <LogoutBtn />}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md py-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.slug)}
                    className="flex items-center w-full justify-start px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-red-100 transition-all"
                  >
                    {item.icon} <span className="ml-2">{item.name}</span>
                  </button>
                )
            )}
            {authStatus && (
              <div className="px-4 py-2">
                <LogoutBtn />
              </div>
            )}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              <FiSearch />
              <span className="ml-2">Search</span>
            </button>
          </div>
        )}
      </Container>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

export default Header;
